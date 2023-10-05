import { useContext, useState } from 'react'
import Logo from "./../../assets/header/Logo.png"
import { HeaderInput } from '../Ui'
import Boarder from "./../../assets/header/Boarder.png"
import { Link, useNavigate } from "react-router-dom"
import { useModalContext } from "../../context/ModalContext"
import { useEffect } from "react"
import { HiMenuAlt3 } from "react-icons/hi"
import { motion } from "framer-motion"
import useMode from '../../hooks/useMode'
import { UserContext } from '../../context/UserContext'
import { toast } from 'react-hot-toast'
import { Web3Button } from '@web3modal/react'
import Loading from './Loading'
// type fixedType = boolean 

const Header = () => {
  const { switchModal, switchSideMode } = useModalContext()
  const { signInDetails, setLoading, token, setUserDetails, userDetails, loading }: any = useContext(UserContext);
  const { address } = signInDetails;
  const { challenger } = useMode()
  // const{address}:any=useContext(UserContext)
  const navigate = useNavigate()
  // const {fixed, setFixed} = useState(false)
  const fixed = true
  const [show, setShow] = useState(false)


  const getUserDetails = () => {
    setLoading(true)
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    console.log(address.toLowerCase());


    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/?address=${address.toLowerCase()}`, requestOptions)
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
      .catch(error => console.log('error', error));
  }


  console.log(userDetails)


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
      return
    }
    else {
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
          <div className='flex items-center w-[50%]'>
            <div className="hidden items-center relative md:flex justify-center pl-[60%] min-[1230px]:pl-[80%] min-[1700px]:pl-[100%]">
              <img src={Boarder} alt="" className=''
                onClick={gotToProfile}
                onMouseEnter={() => setShow(!show)} onMouseLeave={() => setShow(!show)}
              />
              {show && <motion.div className="text-white w-28 right-[5vw] px-2 font-Archivo_Regular bg-hover text-center absolute"
                animate={{ y: [-100, 0], x: [20, 0] }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.2 }}
              >
                profile
              </motion.div>}
              <Web3Button />
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-white mr-[10px] capitalize'>{userDetails?.username}</p>
            {/* <ConnectWalletbtn clickHandler={() => { switchModal() }} /> */}



          </div>

        </div>
      </div>
    </>

  )
}

export default Header