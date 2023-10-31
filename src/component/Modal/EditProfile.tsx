import { KeyboardEvent, useContext, useState } from "react"
import { useModalContext } from "../../context/ModalContext";
import Animation from "./Connect/Animation";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-hot-toast";
import Loading from "../ui/Loading";
import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { FiUploadCloud } from "react-icons/fi";
import ReactLoading from 'react-loading';


const projectId = import.meta.env.VITE_REACT_APP_INFURA_IPFS_KEY
const projectSecretKey = import.meta.env.VITE_REACT_APP_INFURA_IPFS_SECRET_KEY

const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
let ipfs: IPFSHTTPClient | undefined;
try {
  ipfs = create({
    url: "https://ipfs.infura.io:5001",
    headers: {
      authorization,
    },
  });
} catch (error) {
  console.error("IPFS error ", error);
  ipfs = undefined;
}


const EditProfile = () => {

  const { switchModal } = useModalContext()
  const { userDetails, setUserDetails }: any = useContext(UserContext)

  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [image, setImage]: any = useState()
  const [username, setUsername]: any = useState()
  const [imageText, setImageText]: any = useState()

  const { address, token } = userDetails


  const onSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      // const value ;
      if (username) {
        console.log(username)
        // usernameHandler(inputRef.current.value)
        // switchModalcontent('welcome')
      }
    }
  }


  const editUser = async () => {
    setErrorMessage('')
    if (!image) {
      setErrorMessage('No Image Selected!')
      return
    }
    if (!username || username == '') {
      setErrorMessage('No Username Entered!')
      return
    }

    // setLoading(true)
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    console.log(token)
    console.log(username)

    let raw = JSON.stringify({
      "updatetype": "username",
      "newValue": username,
      "userAddress": address
    });

    console.log(raw)

    let requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/`, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log(result)
        setLoading(false)
        if (result?.message !== 'success') {
          toast.error('Error creating user')
        }
        else {
          editUserImg()
        }
      })
      .catch(error => console.log('error', error));
  }

  const editUserImg = async () => {

    // setLoading(true)
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    console.log(token)
    console.log(username)

    let raw = JSON.stringify({
      "updatetype": "profileImage",
      "newValue": image.toString(),
      "userAddress": address
    });

    console.log(raw)

    let requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/`, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log(result)
        setLoading(false)
        if (result?.message !== 'success') {
          toast.error('Error creating user')
        }
        else {
          // setUserDetails(result)
          console.log(result)

          setUserDetails({ ...result.data, token })
          localStorage.setItem("userData", JSON.stringify({ ...result.data, token }))
          // s('welcome')
          setLoading(false)
          switchModal()
          // switchModalcontent('welcome')
        }
      })
      .catch(error => console.log('error', error));
  }

  const uploadImage = async (event: any) => {

    event.preventDefault();
    setErrorMessage('')


    const form = event.target as HTMLFormElement;
    const files = (form[0] as HTMLInputElement).files;

    if (!files || files.length === 0) {
      setErrorMessage('Please Select An Image')
      return
    }

    setIsUploading(true)
    const file = files[0];
    try {
      const result = await (ipfs as IPFSHTTPClient).add(file);
      setImage(result.cid)
      setIsUploading(false)

      form.reset();

    } catch (error) {
      console.log(error)
      setIsUploading(false)
    }

  };


  console.log(image?.toString())

  return (
    <>
      {loading && <Loading />}
      <div>
        <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[16px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
          Edit Profile
        </h1>
      </div>
      {!ipfs ?
        <p>Not connected to IPFS, which is needed for image Upload</p> :
        (
          <form className="flex mt-5 items-center flex-col" onSubmit={e => uploadImage(e)}>
            <div className='w-[50%] bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[168px] text-white flex justify-center items-center px-[48px] md:px-0 relative'>
              <div className='absolute w-full h-full bottom-0'>
                {image ?
                  <div className="absolute w-full h-full bottom-0">
                    <img
                      alt={`Game cover`}
                      src={`https://mentalmaze-game.infura-ipfs.io/ipfs/${image && image.toString()}`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                    {/* <p className="absolute t-5 b-0">Select New Image</p> */}
                  </div>
                  : isUploading ? (
                    <div className="flex items-center h-full justify-center w-full ">
                      <ReactLoading
                        type='spin' color='#0B77F0' height={60} width={37} />
                    </div>
                  ) : (
                    <div className="flex items-center h-full justify-center w-full ">
                      <label htmlFor="game-image">
                        <div className='flex flex-col items-center cursor-pointer text-[32px] md:text-[20px]'>
                          <FiUploadCloud color="#0B77F0" className="mb-[12.5px]" />
                          <p className='font-[300] text-[15px] md:text-[20px] font-Archivo_Regular text-white text-center '>
                            <span className='text-blue-main'>Click to upload</span> or drag and drop<br />
                            SVG, PNG, JPG or GIF (max. 800x400px) <br />
                            <span className="text-yellow-500">
                              {imageText}
                            </span>
                          </p>
                        </div>
                      </label>
                      <input
                        type="file"
                        name="game-image"
                        id="game-image"
                        className='hidden'
                        accept="image/*"
                        onChange={() => {
                          setImageText('Please Click "Upload Image" Next')
                        }}
                        placeholder='Upload New' />
                    </div>
                  )
                }

              </div>
            </div>
            <button
              type="submit"
              style={{
                background: 'var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))'
              }}
              className="mx-auto mt-[10px] text-white py-[10px] text-[14px] md:text-base px-[16px] rounded-[8px] border-[1px] border-blue-main shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] block"
            >Upload Image</button>

          </form>
        )
      }
      <Animation className='pt-[18px] flex flex-col h-full gap-[100px] px-[29.5px] md:px-0'>
        <input type="text" onChange={(e) => setUsername(e.target.value)} onKeyDown={onSubmit} placeholder='ENTER YOUR USERNAME' className='font-[400] mb-[-50px] text-[15px] md:text-[20px] font-droid leading-[23.61px] py-[14px] px-[40px] text-[#8C8C8C] rounded-[16px] md:rounded-t-[16px] w-full bg-blue-90 md:w-[416px] mx-auto text-center' />
        <div className='flex flex-col gap-1 font-Archivo_Regular font-normal'>
          <button
            className="flex items-center justify-center font-droid text-[16px] modalButton border-blue-80 border-solid border-[2px] w-[218px] h-[56px] rounded-[1rem] mx-auto"
            onClick={() => editUser()}>
            Submit
          </button>
          <div className="flex justify-center w-full mt-4">
            {errorMessage != '' && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </div>
      </Animation>
    </>
  )
}
export default EditProfile