import { useContext, useState } from "react"
import { useModalContext } from "../../../context/ModalContext"
import Animation from "./Animation"
import { UserContext } from "../../../context/UserContext"
import { toast } from "react-hot-toast"
import Loading from "../../ui/Loading"
// import { Web3Storage } from "web3.storage"
// import identicon from "identicon"

const ChooseANickname = () => {
  const { switchModalcontent } = useModalContext()
  const { signInDetails, token, loading, setLoading, setUserDetails }: any = useContext(UserContext)
  const [username, setusername] = useState('')

  const { address } = signInDetails

  // const generateIdenticon = async () => {
  //   const buffer = identicon.generateSync({ id: 'ajido', size: 40 })

  //   const client = new Web3Storage({ token: import.meta.env.IPFS_API_KEY })
  //   const rootCid = await client.put(buffer)
  //   const info = await client.status(rootCid)

  //   console.log(info)
  // }

  // generateIdenticon()


  const createUser = async () => {
    if (username == "") {
      toast.error('Please Enter Nickname')
      return;
    }
    setLoading(true)
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    let raw = JSON.stringify({
      "address": address,
      "username": username.toString(),
      "role": "player",
      'profileImage': username.slice(0, 2)
    });

    let requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/?address=${address}`, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        setLoading(false)
        if (result?.message !== 'success') {
          toast.error('Error creating user')
          console.log(result)
        }
        else {
          setUserDetails(result.data)
          localStorage.setItem("userData", JSON.stringify(result.data))
          console.log(result)
          switchModalcontent('welcome')
        }
      })
      .catch(error => console.log('error', error));
  }


  return (

    <>
      {loading && <Loading />}
      <div>
        <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
          Choose a nickname
        </h1>
      </div>
      <Animation className='pt-[48px] flex flex-col h-full gap-[100px] px-[29.5px] md:px-0'>
        <input type="text" onChange={e => setusername(e.target.value)} placeholder='ENTER YOUR NICKNAME' className='font-[400] mb-[-20px] text-[15px] md:text-[20px] font-droid leading-[23.61px] py-[24px] px-[40px] text-[#8C8C8C] rounded-[16px] md:rounded-t-[16px] w-full bg-blue-90 md:w-[416px] mx-auto text-center' />
        <div className='flex flex-col gap-1 font-Archivo_Regular font-normal'>
          <p className='flex justify-center leading-[21.76px] gap-2 md:text-[15px] text-center'>
            username for easy stat tracking.
          </p>
          <button className="flex items-center justify-center font-droid text-[16px] modalButton border-blue-80 border-solid border-[2px] w-[218px] h-[56px] rounded-[1rem] mx-auto" onClick={() => { createUser() }}>
            Submit
          </button>
        </div>
      </Animation>
    </>
  )
}
export default ChooseANickname