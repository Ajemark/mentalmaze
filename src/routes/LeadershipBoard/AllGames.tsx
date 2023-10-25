import { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { leaders } from './dummydata'
import medal from "./../../assets/Leadership/medal_star.png"
import medalMaster from "./../../assets/Leadership/medalstarMaster.png"
import third from "./../../assets/Leadership/third.svg"

import empty from "./../../assets/Leadership/empty.png"

export const AllGames = ({ data }: any) => {

  const [showGameDropDown, setShowGameDropDown] = useState<boolean>(false)

  console.log(data)
  return (
    <div>
      {leaders.length > 0 ?
        <div className="relative px-[16px] md:px-14  text-white">

          <div className='rounded-3xl border-blue-80 border-solid border-[2px] '>
            <div onClick={() => {
              setShowGameDropDown(!showGameDropDown)
            }} className='flex cursor-pointer grad-dar justify-between items-center px-[32px] rounded-t-3xl py-[20px] '>
              <p className='flex gap-[25px] font-droid text-[20px] leading-[23.61px]    items-center'><span className=' font-Archivo_thin text-wb-40 leading-[21.76px] font-normal'> Title: </span> Math Puzzle </p>
              <div >
                <AiOutlineDown color="white" />
              </div>
            </div>
            {
              showGameDropDown && (
                <div className='p-[16px] md:p-[40px]  md:pt-0 pt-0'>
                  <div className='hidden md:grid grid-cols-4 font-droid text-[32px] font-normal px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[24px]'>
                    <div>Rank</div>
                    <div className='col-span-2'>Solver</div>
                    <div>maze point</div>
                  </div>
                  <div>
                    {data?.map((item: any, i: number) => <Leaders key={i} {...item} />)}
                  </div>
                </div>
              )
            }
          </div>

        </div>
        :
        <div className="w-full h-full text-white flex flex-col items-center gap-[40px]">
          <div> <img src={empty} /> </div>
          <p className="text-center">
            Opps! You have no record to be displayed.<br />
            Please play a game to begin
          </p>
          <button className="modalButton text-[24px] font-droid tracking-[4.74px]">
            Play Game
          </button>
        </div>
      }
    </div>
  )
}


const Leaders = (data: any) => {
  // console.log(data)
  return (
    <div className='flex justify-between font-droid text-[15px] md:text-[32px] font-normal px-[16px]  md:px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[16px] md:py-[24px]'>
      <div className='col-span-2 flex items-center gap-[16px] md:gap-[48px] '>
        <div className=' bg-blue-main w-[48px] h-[48px] md:w-[72px] md:h-[72px] rounded-[8px] '>

        </div>
        <div className='flex flex-col items-start'> <p>{'solver'}</p>

          <div className=' text-right text-[13px] md:text-[24px] font-medium leading-[26.11px] font-Archivo_Regular flex-1 block md:hidden'>{data?.point} MP</div>
        </div>

      </div>

      <div className="flex md:gap-[64px] items-center">
        <div className=' text-right text-[13px] md:text-[24px] font-medium leading-[26.11px] font-Archivo_Regular flex-1 hidden md:block'>{data?.point} MP</div>
        <div>
          {data?.unlockLevel.toLowerCase() == "diffcult" ? <img src={medal} className="h-[24px] w-[24px] md:w-[initial] md:h-[initial]" /> : data.unlockLevel.toLowerCase() == 'medium' ? <img src={medalMaster} className="h-[24px] w-[24px] md:w-[initial] md:h-[initial]" /> :
            <img src={third} className="h-[24px] w-[24px] md:w-[initial] md:h-[initial]" />}
        </div>
      </div>


    </div>
  )
}