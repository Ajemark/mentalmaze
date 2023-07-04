import React from 'react'
import metalmask from "./../../../assets/metalmask.png"


const Connect = () => {
  return (
    <div className='pt-[48px] flex flex-col justify-between h-full '>
                <div className='flex justify-center '>
                <button className='metamask flex gap-[24px] items-center justify-center font-droid text-[24px]  border-blue-80 '>
                    <div>
                    <img src={metalmask} />
                    </div>
                    MentalMask
                </button>
                </div>

                <div className='flex flex-col gap-1 font-Archivo_Regular font-normal'>
                    <p className='leading-[21.76px]  text-[20px] text-center'>
                    Do you need help with connecting 
                    </p>
                    <p className='flex justify-center leading-[21.76px]  text-[20px] text-center'>
                    your wallet? <p className='text-blue-80'>Chat us on discord</p>
                    </p>
                </div>
                </div>
  )
}

export default Connect