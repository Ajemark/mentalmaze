import {IoDiamondSharp} from "react-icons/io5"
const Getmore = () => {
  return (
    <div className=''>
           <h1 className='font-droid  border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-[80%] md:w-full mx-auto'>
                Get More POPS
            </h1>
            <p className='text--[20px] w-[273px] md:w-fit md:text-[32px] font-[400] leading-[32px] md:leading-[40px] font-Archivo_Regular max-w-[480px] mx-auto text-center tracking-widest md:tracking-widest mt-[48px]'>
                Use Maze Points To Get More Pops
            </p>
            <div className='hidden md:flex justify-between mx-auto max-w-[461px] h-[80px] px-[32px] items-center border-blue-50 border-[2px] rounded-[16px] mt-[18px]'>
              <p className='font-droid text-[20px] md:text-[24px] '>
                GET 1 POPS
              </p>
              <div className='flex gap-[8px] items-center'>
                <IoDiamondSharp color="#0B77F0" fontSize={24}/>
                <button className='next rounded-[16px] p-[1px]'>
                <button className='rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-[57px] justify-center'>
                    10
                </button>
                </button>
              </div>
            </div>
            <div
            style={{
              "background": "var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))"
            }}
            className='flex justify-between gap-[28px] md:gap-0 mx-auto mt-[24px] w-[258px] md:w-[461px] h-[80px] px-[32px] items-center border-blue-50 border-[2px] rounded-[16px]'>
              <p className='font-droid text-[16px] md:text-[24px]  '>
                REFILL <span className='hidden md:block'>POPS</span>
              </p>
              <div className='flex gap-[8px] items-center '>
                <IoDiamondSharp color="#0B77F0" fontSize={24}/>
                <button className='next rounded-[16px] p-[1px]' >
                <button className='rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-[57px] justify-center'>
                    25
                </button>
                </button>
              </div>
            </div>
    </div>
  )
}

export default Getmore