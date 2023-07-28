import { IoDiamondSharp } from 'react-icons/io5'

const Reveal = () => {
  return (
    <div className='mb-[105px] pb-[105px]'>
    <h1 className='font-droid  pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
         REVEAL CORRECT ANSWER
     </h1>
     <div className='flex flex-col justify-between h-full md: mx-auto md:w-fit w-[273px] md:justify-start border-t-blue-80 border-t-[4px] md:border-t-[8px] '>
     <p className='font-Archivo_Regular text-[20px] md:text-[32px] leading-[40px] max-w-[480px] mx-auto text-center tracking-widest mt-[63px]'>
     Use Maze Points To Reveal The Correct Answer To This Question
       </p>
     <div className='mb-[105px] flex justify-between gap-[28px] md:gap-0    mx-auto max-w-[461px] h-[80px] px-[24px] md:px-[32px] items-center border-blue-50 border-[2px] rounded-[16px] mt-[18px]'>
       <p className='font-droid text-[20px] md:text-[24px] '>
         Reveal <span className='hidden md:block'>Answer</span>
       </p>
      
       <div className='flex gap-[8px] items-center '>
         <IoDiamondSharp color="#0B77F0" fontSize={24}/>
         <button className='next rounded-[16px] p-[1px]'>
         <button className='rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-[57px] justify-center'>
             30
         </button>
         </button>
       </div>
     </div>
     </div>
</div>
  )
}

export default Reveal