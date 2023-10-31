import { useContext, useState } from 'react'
import Logo from "./../../assets/header/Logo.png"
import { HeaderInput } from '../Ui'
import { Link, useNavigate } from "react-router-dom"
import { useModalContext } from "../../context/ModalContext"
import { useEffect } from "react"
import { HiMenuAlt3 } from "react-icons/hi"
import useMode from '../../hooks/useMode'
import { UserContext } from '../../context/UserContext'
import { toast } from 'react-hot-toast'
import Loading from './Loading'
import { CustomButton } from './CustomConnectButton'
import { useAccount } from 'wagmi'
// type fixedType = boolean 

const Header = () => {
  const { switchModal, switchModalcontent, switchSideMode } = useModalContext()
  const { setLoading, token, setUserDetails, userDetails, loading }: any = useContext(UserContext);
  const { address, isConnected } = useAccount();
  const { challenger } = useMode()
  const navigate = useNavigate()
  const fixed = true
  const [show, setShow] = useState(false)

  const getUserDetails = () => {
    setLoading(true)
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/?address=${address?.toLowerCase()}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.data.address) {
          console.log(result)
          setUserDetails(result.data)
          navigate('/profile')
          setLoading(false)
        }
        else {
          setLoading(false)
          toast.error('You need to connect your wallet and sign up with metamask')
        }
      })
      .catch(error => {
        setLoading(false)
        console.log('error', error)
      }
      );
  }

  useEffect(() => {
    if (!userDetails) switchModalcontent('authenticate')
    if (!isConnected) switchModalcontent('connect')
    else {
      const d: any = localStorage.getItem('userData')
      if (d && JSON.parse(d).token && JSON.parse(d).address == address?.toLowerCase()) {
        setUserDetails(JSON.parse(d))
      } else {
        localStorage.removeItem('userData')
        setUserDetails({})
        switchModalcontent('authenticate')
      }
    }
  }, [isConnected, address])

  // console.log(userDetails)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 104) {
        // setFixed(!true)
      }
      else {
        // setFixed(false)
      }
    })
  }, [])

  const gotToProfile = () => {
    if (!address) {
      switchModal()
      switchModalcontent('connect')
      return
    }
    else {
      const userData = localStorage.getItem('userData')
      if (userData && JSON.parse(userData).username) {
        navigate('/profile')
        return
      }
      getUserDetails()
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className={`${challenger ? "bg-black" : "headerbg"} px-[16px] md:px-[34px] fixed z-[1000] h-[64px]  md:h-[104px] w-full ${fixed ? "shadow-lg" : "shadow-none"}`}>
        <div className='flex justify-between items-center h-full w-full'>
          <div className='flex items-center gap-[16px] md:gap-8 justify-between w-full md:w-fit md:justify-center'>
            <Link to={'/'} className=" flex gap-[8px] md:gap-4 text-white font-Archivo_Regular items-center text-[1rem] md:text-[22px]">
              <img src={Logo} className=" h-5 md:h-full" />
              Mental Maze
            </Link>
            <div className="text-white text-[36px] absolute top-[2vh] right-[10vw]" onClick={switchSideMode}>
              <HiMenuAlt3 className="block md:hidden h-[32px] mr-[-30px]" />
            </div>
            <div className="hidden md:block">
              <HeaderInput />
            </div>
          </div>
          <div className='flex items-center '>
            <div className="hidden items-center relative md:flex justify-center  ">
              {
                isConnected && <div
                  className='cursor-pointer'
                  onClick={gotToProfile}
                  onMouseEnter={() => setShow(!show)} onMouseLeave={() => setShow(!show)}>

                  <div className='text-headerbg text-xl mr-3 font-bold justify-center flex items-center bg-white rounded-full w-[38px] h-[38px] overflow-hidden'>
                    {userDetails.profileImage?.length < 3 ? (
                      <p>
                        {userDetails.profileImage.toUpperCase()}
                      </p>
                    ) :
                      <img src={userDetails.profileImage && userDetails.profileImage.includes('http') ? userDetails.profileImage : "https://mentalmaze-game.infura-ipfs.io/ipfs/" + userDetails.profileImage} alt="" className='w-full h-full'
                      />
                    }
                  </div>
                </div>
              }
              <CustomButton />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Header