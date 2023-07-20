// import React from 'react'
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"
import Coloum from "./../../../../assets/modal/Coloum.svg"
import Animation from '../Animation'

const Example = () => {
  return (
    <div className='flex flex-col h-full '>
          <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
                    EXAMPLE
            </h1>
            <Animation className='justify-between flex w-full items-center h-full px-[8px]'>
                <button className='next rounded-[8px] p-[1px]'>
                <button className='rounded-[8px] bg-[#010C18] p-[8px] font-Archivo_Regular leading-normal text-[16px] flex items-center gap-[8px] w-[131px] justify-center'>
                    <AiOutlineLeft />
                    {"previous".toLocaleUpperCase()}
                </button>
                </button>
                <>
                <img src={Coloum} />
                </>
                <button className='next rounded-[8px] p-[1px]'>
                <button className='rounded-[8px] bg-[#010C18] p-[8px] font-Archivo_Regular leading-normal text-[16px] flex items-center gap-[8px] w-[131px] justify-center'>
                    {"next".toLocaleUpperCase()}
                    <AiOutlineRight />
                </button>
                </button>
            </Animation>
    </div>
  )
}

export default Example