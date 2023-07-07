// import React from 'react'
import nav1 from "./../../assets/sidebar/nav1.png"
import nav2 from "./../../assets/sidebar/nav2.png"
import nav3 from "./../../assets/sidebar/nav3.png"
import discord from "./../../assets/sidebar/discord.svg"
import telegram from "./../../assets/sidebar/telegram.svg"
import twitter from "./../../assets/sidebar/twitter.svg"
import { useNavigate } from "react-router-dom"




const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <div className='w-[104px] flex flex-col justify-start gap-56 py-[46px] relative bg-[#010C18] z-20  opacity-[0.4000000059604645] items-center  mt-[104px]'>
        <div className='flex flex-col gap-8'>
          {[{image: nav1, title: "/"}, {image: nav2, title: '/leadership'},{image: nav3, title: "/"}].map((src) => {
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
  )
}

export default Sidebar