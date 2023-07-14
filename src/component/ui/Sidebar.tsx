// import React from 'react'
import nav1 from "./../../assets/sidebar/nav1.png"
import nav2 from "./../../assets/sidebar/nav2.png"
import nav3 from "./../../assets/sidebar/nav3.png"
import discord from "./../../assets/sidebar/discord.png"
import telegram from "./../../assets/sidebar/telegram.svg"
import twitter from "./../../assets/sidebar/twitter.svg"
import { useNavigate } from "react-router-dom"
import useQuery from "../../hooks/useQuery"
import {AiOutlineClose} from "react-icons/ai"
import {BsSearch} from "react-icons/bs"
import emptywallet from "./../../assets/sidebar/emptywallet.svg"
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

interface CompType {
  showSideMobile: boolean,
  switchSideMode: () => void;
}


const Sidebar = ({showSideMobile, switchSideMode}:CompType) => {
  const { switchModal,  } = useModalContext()

  const openModal = (value: string) => {
      if(value == "Connect wallet"){
        switchSideMode()
        switchModal()
      }
  }
  const navigate = useNavigate()
  const {width} = useQuery()
  return (
    width > 768 ?<div className='w-[104px] h-[90vh] fixed md:flex flex-col justify-between py-[46px] left-0 bg-[#010C18] z-20  opacity-[0.4000000059604645] items-center  mt-[104px] hidden'>
        <div className='flex flex-col gap-6 w-full'>
          {[{image: nav1, link: "/create-game", title: "Create Game"}, {image: nav2, link: '/leadership', title: "Leadership"},{image: nav3, link: "/", title: "Games"}].map((src) => {
            return <div className={`sideBartitle pl-[16px]  md:pl-[34px] w-full relative items-center    cursor-pointer flex overflow-visible`} onClick={() => navigate(src.link)}>
             
          <span>  <img src={src.image} className=""/> </span>
          <motion.div className="absolute hidden  text-white w-28 left-20 bg-black px-2 font-Archivo_Regular"
          animate={{x: 100}}
          transition={{delay: 1, type:"spring"}}
          
          >
            {src.title}
          </motion.div>
          </div>
          })}
        </div>
        <div className='flex flex-col '>
          {[ discord, telegram, twitter].map((src) => {
            return <div className='w-fit'>
            <img src={src} />
          </div>
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
        <AiOutlineClose fontSize={24} className = "mx-auto mb-[48px]" onClick={switchSideMode}/>
            <div className="px-[12px] flex flex-col gap-[18px]">
              <div className="flex sidebarItem border-blue-50 border-solid border-[1px] rounded-lg h-[44px] gap-[8px]   items-center px-[16px] justify-center">
                <div> <BsSearch fontSize={24} /></div> <input type="text" className="bg-inherit flex-1 w-full placeholder:text-blue-70 font-Archivo_Regular leading-[24px] text-[16px]" placeholder="Search"  />
              </div>
            {[{image: game, path: "/", title: "Games"}, {image: cup, path: '/leadership', title: "Leaderboard"},{image: create, path: "/create-game", title: "Create game"},{image: notification, path: "/", title: "Notification"}].map((src, index) => {
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
          {[{image:Discord, title: "Discord"}, {image: Telegram, title: "Telegram"}, {image: Twitter, title: "Twitter"}].map((src) => {
            return <div className='w-full flex items-center gap-[8px] px-[12px]  h-[46px] hover:sidebarItem cursor-pointer  rounded-lg hover:border-blue-50 hover:border-solid hover:border-[1px]'>
            <img src={src.image} className=""/>
            <p className="text-[16px] font-Archivo_Regular leading-[17.41px] font-medium">
              {src.title}
            </p>
          </div>
          })}
        </div>
            </div>
            <div className="flex flex-col gap-3 items-center px-[12px] py-[34px] border-solid border-t-blue-80 border-t-[2px]">
            {[ {image: useroctagon, title: "Create game"}, {image: emptywallet, title: "Connect wallet"} ].map((src, index) => {
  
            return <div className='w-full flex items-center gap-[8px]  h-[46px] hover:sidebarItem cursor-pointer px-[12px]  rounded-lg hover:border-blue-50 hover:border-solid hover:border-[1px]' key={index} onClick={() => openModal(src.title)}>
            <img src={src.image} />
            <p className="text-[16px] font-Archivo_Regular leading-[17.41px] font-medium">{src.title}</p>
          </div>
          })}
            </div>
    </div>
    </>
  )
}

export default Sidebar