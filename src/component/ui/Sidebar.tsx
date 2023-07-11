// import React from 'react'
import nav1 from "./../../assets/sidebar/nav1.png"
import nav2 from "./../../assets/sidebar/nav2.png"
import nav3 from "./../../assets/sidebar/nav3.png"
import discord from "./../../assets/sidebar/discord.svg"
import telegram from "./../../assets/sidebar/telegram.svg"
import twitter from "./../../assets/sidebar/twitter.svg"
import { useNavigate } from "react-router-dom"
import useQuery from "../../hooks/useQuery"
import {AiOutlineClose} from "react-icons/ai"

interface CompType {
  showSideMobile: boolean,
  switchSideMode: () => void;
}


const Sidebar = ({showSideMobile, switchSideMode}:CompType) => {
  const navigate = useNavigate()
  const {width} = useQuery()
  return (
    width > 768 ?<div className='w-[104px] md:flex flex-col justify-start gap-56 py-[46px] relative bg-[#010C18] z-20  opacity-[0.4000000059604645] items-center  mt-[104px] hidden'>
        <div className='flex flex-col gap-8'>
          {[{image: nav1, title: "/solver"}, {image: nav2, title: '/solver/leadership'},{image: nav3, title: "/"}].map((src) => {
            return <div className='w-fit' onClick={() => navigate(src.title)}>
            <img src={src.image} /> 
          </div>
          })}
        </div>
        <div className='flex flex-col gap-3'>
          {[discord, telegram, twitter].map((src) => {
            return <div className='w-fit'>
            <img src={src} />
          </div>
          })}
        </div>
    </div>
    :<>
      <div className={`w-full fixed bg-black h-screen z-[9999999999999] ${showSideMobile?'block':'hidden'}`} onClick={switchSideMode}>
      </div>
    <div className="w-[60vw] bg-blue-100  h-full  text-white flex flex-col pt-[48px] justify-between fixed z-[999999999999999] left-0"
    style={{
      transform: showSideMobile?"translateX(0)": "translateX(-1000px)",
      transition: "all 1s"
    }}
    >
      <div>
        <AiOutlineClose fontSize={36} className = "mx-auto mb-[48px]" onClick={switchSideMode}/>
            <div>
            {[{image: nav3, path: "/solver", title: "Games"}, {image: nav2, path: '/solver/leadership', title: "Leaderboard"},{image: nav1, path: "/solver", title: "Create game"}].map((src, index) => {
            return <div className='w-full flex items-center gap-[8px] px-[12px] h-[72px]' key={index} onClick={() => navigate(src.path)}>
            <img src={src.image} /> <p className="text-[16px] font-Archivo_Regular leading-[17.41px] font-medium">
              {src.title}
            </p>
          </div>
          })}
            </div>
            </div>
            <div className="flex items-center py-[25px] border-solid border-t-blue-80 border-t-[2px]">
            {[ telegram, discord, twitter].map((src, index) => {
            return <div className='w-fit' key={index}>
            <img src={src} />
          </div>
          })}
            </div>
    </div>
    </>
  )
}

export default Sidebar