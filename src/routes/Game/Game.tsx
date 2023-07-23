import React from 'react'

const Game = () => {
  return (
    <div className='relative px-[52px]'>
        <div></div>
        <div className='flex gap-[38px] flex-col md:flex-row'>
          <Rating />
          <About />
        </div>
    </div>
  )
}



const Rating = () => {
  return (
    <div className='py-[24px] w-full md:w-[266px] border-blue-80 border-solid border-[4px] rounded-[24px]'>
       <p className='h-[86px] w-full border-b-[4px] border-b-blue-80 mb-[32px]'></p>
      
        <div className=''>
        <div className='font-semibold text-[20px] font-Archivo_Regular text-center px-[37px] flex flex-col gap-[16px] '>
          <p className=''>
            <p className='text-wb-40  leading-[21.76px]'>Rating</p>
            <p className='text-white  leading-[21.76px]'>4</p>
          </p>
          <p>
            <p className='text-wb-40  leading-[21.76px]'>Developed by</p>
            <p className='text-white  leading-[21.76px] font-[900]'>Mental Maze</p>
          </p>
          <p>
            <p className='text-wb-40  leading-[21.76px]'>Released:</p>
            <p className='text-white  leading-[21.76px] font-[900]'>July 2023</p>
          </p>
          </div>
        </div>
        <div className='w-full flex justify-center'>
        <button className='sponsorbtn '> 
          SPONSOR GAME
        </button>
        </div>
    </div>
  )
}


const About = () => {
  return (
    <div className=' rounded-[24px] border-[4px] border-blue-80 w-full md:w-fit md:flex-1'>
      <p className='text-[32px] font-droid text-white text-center pt-[16px] pb-[32px] border-b-[4px] border-b-blue-80'>MATH PUZZLE</p>
      <div className='px-[40px] pt-[32px]'>
      <p className='text-white  text-[20px] leading-[31.76px] font-Archivo_Regular '>
      Math Puzzle: Unleash your inner whiz, where speed and accuracy meld together harmoniously, paving the path to triump and unlocking thesecrets of mathematical mastery!
      </p>
      </div>
    </div>
  )
}

export default Game