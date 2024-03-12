// import React from 'react'

import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

// import { useState } from "react"

const GameRequirement = () => {
  const { questionObj }: any = useContext(UserContext);
  const navigate = useNavigate()
  const no = false
  // const dummy = () => {
  //   setNo(!no)
  // }

  let pageContent = <>
    <div className="text-[20px] leading-[21.76px] font-Archivo_Regular font-normal text-white flex flex-col gap-10  py-[32px] px-[48px] ">
      <p>Hi there!</p>
      <p>I’m sure you can’t wait to have your game published. So are we, congratulations creator.</p>
      <p>
        To be sure, your game meets all of our <span className="text-blue-main">requirements</span>, we will have the judges go through the game. Once they have verified the authenticity of your game guess what? It will be live.
      </p>
      <p>
        And if otherwise, you have nothing to worry about, your deposit of {questionObj.amountDeposited} Aurora Token, will be refunded to your wallet.
      </p>
      <p>
        If you need further assistance, do not hesitate to reach us on discord. Our response team, will be happy to answer any question you might have.
      </p>
      <p>
        Thank you, Creator! Goodluck on your application.
      </p>
    </div>
    <div className="px-[48px]">
      <button onClick={() => {
        navigate('/create-game')
      }} className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px] ">
        CONTINUE TO GAMES
      </button>
    </div>
  </>

  if (no) {
    pageContent = <>
      <div className="text-[20px] leading-[21.76px] font-Archivo_Regular text-white flex flex-col gap-10  py-[32px] px-[48px] ">
        <p>Hi Creator,</p>
        <p>We understand how disappointed you may be about this but the judges identified a fault and it is crucial that we address this matter promptly to ensure fair play and accuracy.</p>
        <p>
          The judges thoroughly crossed checked the answers and discovered an inconsistency, that needs to be rectified. Please review your questions and verify the correct options.
        </p>
        <p>
          Thank you for your time. We can’t wait to have your rectified game live. We look forward to a fair and enjoyable continuation of the game.
        </p>
      </div>
      <div className="px-[48px] flex flex-col gap-[24px]">
        <button className="w-full hover:bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px] ">
          CONTINUE TO GAMES
        </button>
        <button className="w-full hover:bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px] ">
          RETRIEVE TOKEN
        </button>
      </div>
    </>
  }
  return (
    <div className="backdrop-blur-sm relative px-[16px] md:px-10 mt-[96px] md:mt-[176px]">
      <div className="border-blue-80 border-[4px] border-solid rounded-[24px] w-full max-w-[1000px] mx-auto pb-[72px] bg-blue-100">
        <h1 className="font-droid text-[32px] text-white text-center border-blue-80 border-b-[4px] border-solid pt-[8px] pb-[16px] leading-[37px]">GAME REQUIREMENT</h1>
        {pageContent}
      </div>
    </div>
  )
}

export default GameRequirement












