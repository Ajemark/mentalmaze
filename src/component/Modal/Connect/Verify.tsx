import { useContext, useEffect, useState } from "react"
import { useModalContext } from "../../../context/ModalContext"
import { UserContext } from "../../../context/UserContext"
import Animation from "./Animation"
import Loading from "../../ui/Loading"
import { toast } from "react-hot-toast"

const Verify = () => {
  const { switchModalcontent } = useModalContext()
  const { signInDetails, setUserDetails, setToken, loading, setLoading }: any = useContext(UserContext);
  const { address } = signInDetails;
  const [response, setresponse] = useState<any>()

  // switchModalcontent('chooseNickname')


  //check if user exists
  const userExists = async (webToken: string) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${webToken}`);

    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/?address=${address.toLowerCase()}`, requestOptions)
      .then(response => {
        return response.json()
      })
      .then(result => {
        if (result.data && result.data.id) {
          setUserDetails(result.data)
          localStorage.setItem("userData", JSON.stringify({ ...result.data, token: webToken }))
          switchModalcontent('welcome')
          setLoading(false)
        }
        if (result.data === null) {
          setLoading(false)
          switchModalcontent('chooseNickname')
        }
      })
      .catch(error => {
        toast.error('An error occurred')
        setLoading(false)
        return error

      })
  }


  //add user after signature
  const addUserDetails = async () => {
    setLoading(true)
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = localStorage.getItem('userData')

    let requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/authenticate/verify`, requestOptions)
      .then(async response => {
        if (response.ok) {
          setresponse(await response.json());
          setLoading(false)
        }
        else {
          setLoading(false)
          const res = await response.json()
          toast.error(res.error.message)
        }
      }).catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (!response) return
    if (response.data.token) {
      setToken(response.data.token)
      userExists(response.data.token)
      return
    }
    if (response.error) {
      toast.error('An error occured');
      setLoading(false)
    } else {
      toast.error('An error occured');
      setLoading(false)
    }
  }, [response])

  return (
    <>
      {loading && < Loading />}
      <div >
        <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
          Verify Wallet
        </h1>
      </div>
      <Animation className='pt-[48px] flex flex-col h-full gap-[100px]'>
        <button
          className='modalButton flex gap-[24px] items-center justify-center font-droid text-[1rem] md:text-[24px]  border-blue-80 mx-auto'
          onClick={addUserDetails}
        >
          Verify
        </button>

        <div className='flex flex-col gap-1 font-Archivo_Regular font-normal tracking-wider'>
          <p className='leading-[21.76px]  text-[15px] md:text-[20px] text-center'>
            Do you need help with connecting
          </p>
          <p className='flex justify-center leading-[21.76px] gap-2  text-[15px] md:text-[20px] text-center'>
            your wallet? <a href="https://discord.gg/8STEwMEu" className='text-blue-80'>Chat us on discord</a>
          </p>
        </div>
      </Animation>
    </>
  )
}
export default Verify