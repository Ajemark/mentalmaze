import React from 'react'
import nav1 from "./../../assets/sidebar/nav1.png"
import nav2 from "./../../assets/sidebar/nav2.png"
import nav3 from "./../../assets/sidebar/nav3.png"
import discord from "./../../assets/sidebar/discord.svg"
import telegram from "./../../assets/sidebar/telegram.svg"
import twitter from "./../../assets/sidebar/twitter.svg"



const Sidebar = () => {
  return (
    <div className='w-[104px] flex flex-col justify-start gap-56 py-[46px] bg-[#010C18] items-center z-10 mt-[104px]'>
        <div className='flex flex-col gap-8'>
          {[nav1, nav2, nav3].map((src) => {
            return <div className='w-fit'>
            <img src={src} /> 
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