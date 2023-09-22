// import React from 'react'
import nav1 from "./../../assets/sidebar/nav1.svg"
import nav2 from "./../../assets/sidebar/nav2.svg"
import nav3 from "./../../assets/sidebar/nav3.svg"
import discord from "./../../assets/sidebar/discord.svg"
import telegram from "./../../assets/sidebar/telegram.svg"
import twitter from "./../../assets/sidebar/twitter.svg"
import { useLocation, useNavigate } from "react-router-dom"

import useQuery from "../../hooks/useQuery"
import {AiOutlineClose} from "react-icons/ai"
import {BsSearch} from "react-icons/bs"
import useroctagon from "./../../assets/sidebar/useroctagon.svg"
import cup from "./../../assets/sidebar/mobile/cup.svg"
import game from "./../../assets/sidebar/mobile/game.svg"
import notification from "./../../assets/sidebar/mobile/notification.svg"
import create from "./../../assets/sidebar/mobile/create.svg"
import {motion} from "framer-motion"
import { useModalContext } from "../../context/ModalContext"
import Discord from "./../../assets/sidebar/mobile/Discord.svg"
import Telegram from "./../../assets/sidebar/mobile/Telegram (2).svg"
import Twitter from "./../../assets/sidebar/mobile/Twitter.svg"
import { useContext, useEffect, useState } from "react"
import useMode from "../../hooks/useMode"
import { Web3Button } from "@web3modal/react"
import { useAccount } from "wagmi"
import { UserContext} from "../../context/UserContext"
import { toast } from "react-hot-toast"








interface CompType {
  showSideMobile: boolean,
  switchSideMode: () => void;
}



const NavItemMobile = (src: {link: string, title: string, image:string}) => {
  // const {address, isConnecting, isDisconnected, isConnected } = useAccount();
  // const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
  //   message: '',
  // })
  const navigate = useNavigate()
  const location = useLocation()
  const goto = (go:string) => {
    const locationContainsChallenger = () => {
      let answer = false;
      for(let i = 0; i < location.pathname.length - 1; i++) {
        if(location.pathname.slice(i, location.pathname.length) == "challenger") {
        answer = true
    }
      return answer
    }
    }


    
    if(locationContainsChallenger()) {
      navigate(`/challenger${go}`)
    }
    else{
      navigate(`${go}`)
    }
  }
  const [show, setShow] = useState(false)
  
  return(
  <div className={`pl-[8px]  md:pl-[15px] w-full relative items-center cursor-pointer flex overflow-visible`} onClick={() => goto(src.link)} onMouseEnter={() =>  setShow(!show)} onMouseLeave={() => setShow(!show)}>
  <span>  <img src={src.image} className=""/> </span>
  {show&&<motion.div className="absolute  text-white w-28 left-20  px-2 font-Archivo_Regular bg-hover text-center"
  animate={{y: [-100, 0], x:[20, 0]  }}
  transition={{type:"spring", bounce: 0.5, duration: 0.2}}
  >
    {src.title}
  </motion.div>
}
  </div>
  )
}
// things to take note of
// link settings page to create mode
// make the progress bar clickable
// chat us on discord 
// search box
// user cant create game if they add a certain amount
const Sidebar = ({showSideMobile, switchSideMode}:CompType) => {
  const { switchModal,switchModalcontent} = useModalContext()
  const {signInDetails,setSignInDetails,setLoading, token,setUserDetails}:any = useContext(UserContext)
  // const { switchModal, switchSideMode , } = useModalContext()
  // const {signInDetails,setLoading, token,setUserDetails}:any = useContext(UserContext);
  // const{address}=signInDetails;
  const {challenger} = useMode()
  const {address } = useAccount();
  // useEffect(()=>{
  //   if(!window.ethereum){
  //     window.location.assign('https://app.mentalmaze.io')
  //   }
  // },[])

  const [connectAddress,setConnectAddress] = useState<`0x${string}` | undefined>()


  useEffect(()=>{
    if(address){
      setConnectAddress(address)
    }
  },[address])

  console.log(useAccount())

  // const signInMessage=async()=>{  
  //   await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/authenticate/login?address=${address}`)
  //   .then(response =>{
  //     if(response.ok){
  //       return response.json()
  //     }
  //     else{
  //       toast.error('An error occured')
  //     }
  //    })
  //    .then((result)=>{
  //     console.log(result)
  //     if(result?.data?.message){
  //       setMessage(result.data.message)  
  //     }
  //    })
  // }

  console.log(connectAddress)

  const getUserDetails=()=>{
    setLoading(true)
    let myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${token}`);
    console.log(address?.toLowerCase());
  
  
    let requestOptions:RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/?address=${address?.toLowerCase()}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.data.address){
        console.log(result)
        setUserDetails(result.data)
        navigate('/profile')
        setLoading(false)
      }
      else{
        setLoading(false)
        toast.error('You need to connect your wallet and sign up with metamask')
      }
      })
      .catch(error => console.log('error', error));
  }
    



  useEffect(()=>{
    if(!window.ethereum){
      switchModal()
          switchModalcontent('install')
    }
    else if(connectAddress){
      setSignInDetails({...setSignInDetails,address:address})
      switchModal()
      switchModalcontent('authenticate')
    }
    else if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        window.open("https://metamask.app.link/dapp/app.mentalmaze.io")  
    }
  },[connectAddress])

  // useEffect(()=>{
  //   if(!window.ethereum){
  //     switchModal()
  //     switchModalcontent('install')   
  //   }
  //   // first detect if window.ethereum is there
  // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

  // // open the deeplink page 
  // window.open("https://metamask.app.link/dapp/app.mentalmaze.io")
  
  // } else {
  //   switchModal()
  //   switchModalcontent('install')
  // }
  // },[])

  console.log(signInDetails)

  const gotToProfile=()=>{
    if(!address){
      switchModal()
      return
    }
    else{
      getUserDetails()
    }
  }


  

//   const mobileAuth=async()=>{
//     if(address){
//       setSignInDetails({...signInDetails,address:address})
//     }

  
  const navigate = useNavigate()
  const {width} = useQuery()


  return (
    // sidebar for desktopview
    // it had to be seperated because it has different structure with that of the mobile
    width > 768 ?<div className={`w-[104px] h-[90vh] fixed md:flex flex-col justify-between py-[46px] left-0  z-20  opacity-[0.4000000059604645] items-center  mt-[104px] hidden ${challenger?"bg-black":"bg-blue-100"}`}>
        <div className='flex flex-col gap-6 w-full'>
          {[{image: nav1, link: "/create-game", title: "Create Game"}, {image: nav2, link: '/leaderboard', title: "leaderboard"},{image: nav3, link: "/", title: "Games"}].map((src) => {
            return <NavItemMobile {...src}/>
          })}
        </div>
        <div className='flex flex-col gap-8 w-full '>
          {[ {image: discord, link: "https://discord.gg/8STEwMEu"}, {image: telegram, link: "https://t.me/official_mentalmaze"}, {image : twitter, link: "https://twitter.com/mazemental?s=11&t=meAljIy1rKjh6LjNVYwIFQ"}].map((src, index) => {
            return <a className={`w-[72px] mx-auto flex relative justify-center ${index == 0&&"border-solid border-t-[2px] border-t-[#85BCF9] pt-[22px]"}`} href={src.link}>
            <img src={src.image} />
          </a>
          })}
        </div>
    </div>
    :<>
      <div className={`w-full fixed bg-black h-screen z-[9999999999999] ${showSideMobile?'block':'hidden'}`} onClick={switchSideMode}>
      </div>
    <div className="w-[80vw] bg-blue-100  h-full min-h-screen overflow-y-scroll text-white flex flex-col pt-[48px] gap-[34px] fixed z-[999999999999999] left-0"
    style={{
      transform: showSideMobile?"translateX(0)": "translateX(-1000px)",
      transition: "all 1s"
    }}
    >
      <div>
      {/* <div className="menu-btn">
                <div className=".menu-btn__burger">
                    
                </div>
      </div> */}
        <AiOutlineClose fontSize={24} className = "mx-auto mb-[10px]" onClick={switchSideMode}/>
            <div className="px-[12px] flex flex-col gap-[18px]">
              <div className="flex sidebarItem border-blue-50 border-solid border-[1px] rounded-lg h-[44px] gap-[8px]   items-center px-[16px] justify-center">
                <div> <BsSearch fontSize={24} /></div> <input type="text" className="bg-inherit outline-none flex-1 w-full placeholder:text-blue-70 font-Archivo_Regular leading-[24px] text-[16px]" placeholder="Search"  />
              </div>
            {[{image: game, path: "/", title: "Games"}, {image: cup, path: '/leaderboard', title: "Leaderboard"},{image: create, path: "/create-game", title: "Create game"},{image: notification, path: "/", title: "Notification"}].map((src, index) => {
            return <div className='w-full flex items-center gap-[8px] px-[12px] h-[46px] hover:sidebarItem cursor-pointer  rounded-lg' key={index} onClick={() => 
            {
              navigate(src.path)
              switchSideMode()
            }}>
            <img src={src.image} /> <p className="text-[16px] font-Archivo_Regular leading-[17.41px] font-medium">
              {src.title}
            </p>
          </div>
          })}
            </div>
            <div className='flex flex-col gap-3 px-[12px] mt-[60px]'>
          {[{image:Discord, title: "Discord", link: "https://discord.gg/8STEwMEu"}, {image: Telegram, title: "Telegram", link: "https://t.me/official_mentalmaze"}, {image: Twitter, title: "Twitter", link: "https://twitter.com/mazemental?s=11&t=meAljIy1rKjh6LjNVYwIFQ"}].map((src) => {
            return <div className='w-full flex items-center gap-[8px] px-[12px]  h-[46px] hover:sidebarItem cursor-pointer  rounded-lg hover:border-blue-50 hover:border-solid hover:border-[1px]'>
            <img src={src.image} className=""/>
            <p className="text-[16px] font-Archivo_Regular leading-[17.41px] font-medium">
              {src.title}
            </p>
          </div>
          })}
        </div>
            </div>
            <div className="flex flex-col gap-3 items-center px-[12px] py-[34px] border-solid border-t-blue-80 border-t-[2px]"
            >
            <div 
            onClick={()=>{
              gotToProfile()
              switchSideMode()
            }}
            className='w-full flex items-center gap-[8px]  h-[46px] hover:sidebarItem cursor-pointer px-[12px]  rounded-lg hover:border-blue-50 hover:border-solid hover:border-[1px]'>
            <img src={useroctagon} />
            <p 
            
            className="text-[16px] font-Archivo_Regular leading-[17.41px] font-medium">Profile</p>
          </div>
          <div 
          onClick={()=>{
            switchSideMode()
          }}
          className='w-full flex justify-start'>
          {
            !address && <Web3Button/>
          }
          </div>
            </div>
    </div>
    </>
  )
}

export default Sidebar;