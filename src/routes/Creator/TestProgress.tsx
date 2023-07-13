import React, { useState } from 'react'
import Dot from "./../../assets/settings/Dot.svg"
import Tick from "./../../assets/settings/Tick.svg"
export interface ModeType {
    title: string,
    text: string,
    mode: string
}
const TestProgress = ({modes}: {modes: ModeType[]}) => {
    


    const Progress = ({title, text, mode}: ModeType) => {
        return (
            <div className='flex flex-col items-center steps w-full'>
            <div className='bullet bg-white w-[32px] h-[32px] rounded-full flex justify-center items-center relative 
            before:block before:absolute before:content-[""] before:h-[4px] before:w-[325px] before:bg-blue-50 before:-right-[325px]
            after:block after:absolute after:content-[""]  after:h-[4px] after:w-[325px] after  after:bg-blue-50 after:-right-[325px]'>
                <img src={mode=="completed"?Tick:mode=="current"?Dot:""} />
            </div>
            <h2 className='text-[#737373]'>
                {title}
            </h2>
            <p>
                {text}
            </p>
            </div>
        )
    }

  return (
    <div className='relative flex justify-center gap-[16px] progrssBar ' >
        {modes.map((mode) => <Progress {...mode}/>)}
    </div>
  )
}




export default TestProgress