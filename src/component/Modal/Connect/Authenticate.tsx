import { useContext, useEffect, useState } from 'react'
import Animation from './Animation'
import { toast } from 'react-hot-toast'
import { UserContext, signInDetails } from '../../../context/UserContext'
import { useModalContext } from '../../../context/ModalContext'
import Loading from '../../ui/Loading'
import { useAccount, useSignMessage } from 'wagmi'

const Authenticate = () => {

  const [auth, setauth] = useState<any>()
  const { isConnected } = useAccount();
  const [errorMessage, setErrorMessage] = useState('')
  const { data: signMessageData, signMessage, variables } = useSignMessage()

  const { signInDetails, setSignInDetails, setLoading, loading }: any = useContext(UserContext)
  const { switchModalcontent } = useModalContext()

  const { address } = signInDetails

  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData && isConnected) {
      if (JSON.parse(userData).signature) {
        switchModalcontent('verify')
        return
      }
    }

    if (auth || !address) return
    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/authenticate/login?address=${address}`)
      .then(async response => {
        if (response.ok) {
          setauth(await response.json())
        }
        else {
          toast.error('An error occured')
        }
      })
  }, [address])

  useEffect(() => {
    (async () => {
      if (signMessageData) {

        setSignInDetails((prev: signInDetails) => ({ ...prev, signature: signMessageData }))
        localStorage.setItem('userData', JSON.stringify({ ...signInDetails, signature: signMessageData }))
        setLoading(false)
        switchModalcontent('verify')
      }
    })()
  }, [signMessageData, variables?.message])

  const signInMessage = async () => {
    setLoading(true)
    alert(address);
    alert(auth?.data.message);
    try {
      if (auth == undefined || !address) {
        setLoading(false)
        setErrorMessage('Please Try Again')
        return
      }

      const msg = auth?.data.message

      signMessage({ message: msg })
      setauth(undefined)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <>
      {loading && < Loading />}
      <div >
        <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
          Sign In
        </h1>
        {errorMessage != '' && <p className="text-red-500 text-center">{errorMessage}</p>}
      </div>
      <Animation className='pt-[48px] flex flex-col h-full gap-[100px]'>
        <button
          className='modalButton flex gap-[24px] items-center justify-center font-droid text-[1rem] md:text-[24px]  border-blue-80 mx-auto'
          onClick={
            signInMessage
          }
        >
          Sign In
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

export default Authenticate