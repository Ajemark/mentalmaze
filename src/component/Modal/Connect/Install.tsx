import React from 'react'

const Install = () => {
  return (
    <div className='pt-[48px] flex flex-col gap-[24px] h-full '>

    <p className='font-Archivo_Regular text-[20px] leading-[40px] text-center max-w-md mx-auto'>
    MetaMask extension is not installed in your browser
    </p>

    <button className='flex items-center justify-center font-droid text-[24px] install border-blue-80 border-solid border-[2px] w-[256px] h-[80px] rounded-[1rem] mx-auto'>
        Install
    </button>

    <div className='flex flex-col gap-1 font-Archivo_Regular font-normal'>
        <p className='leading-[21.76px]  text-[20px] text-center'>
        Do you need help with connecting 
        </p>
        <p className='flex justify-center leading-[21.76px] gap-2  text-[20px] text-center'>
        your wallet? <p className='text-blue-80'>Chat us on discord</p>
        </p>
    </div>
    </div>
  )
}

export default Install