import {AiOutlineDown} from "react-icons/ai"
import medal from "./../../assets/Leadership/medal_star.png"
import medalMaster from "./../../assets/Leadership/medalstarMaster.png"
import { Leadertype } from './Indextype'
import { leaders } from "./Dummydata"
import empty from "./../../assets/Leadership/empty.png"



const LeaderShipBoard = () => {
  return (
    
    <div> 
        <div className='w-full h-fit'>
        {leaders.length > 0 ?
        <div className="relative z-[999]  px-[16px] md:px-14  text-white">
            <h2 className='font-Archivo_Regular font-normal tracking-[0.5px] md:text-[40px] mb-[64px] text-[20px] leading-[21px] md:leading-normal'>LEADERBOARD</h2>
            <div className='rounded-3xl border-blue-80 border-solid border-[2px] pb-[55px]'>
                <div  className='flex grad-dar  justify-between items-center px-[32px] rounded-t-3xl py-[16px] '>
                    <p className='flex gap-[25px] font-droid text-[20px] leading-[23.61px]    items-center'><span className=' font-Archivo_thin text-wb-40 leading-[21.76px] font-normal'> Title: </span> Math Puzzle </p>
                    <div>
                        <AiOutlineDown color="white"/>
                    </div>
                </div>
                <div className='px-[16px] md:px-[40px]'>
                    <div className='hidden md:grid grid-cols-4 font-droid text-[32px] font-normal px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[24px]'>
                        <div>Rank</div>
                        <div className='col-span-2'>Solver</div>
                        <div>maze point</div>
                    </div>
                    <div>
                        {leaders.map(item => <Leaders {...item} /> )}
                    </div>
                </div>
            </div>
            <div className='py-[32px] flex flex-col gap-[32px]'>
            <div  className='flex grad-dar  justify-between items-center px-[32px] rounded-3xl py-[16px] '>
                    <p className='flex gap-[25px] font-droid md:text-[20px] text-[16px] leading-[16.32px] md:leading-[23.61px]    items-center'><span className=' font-Archivo_thin text-wb-40 leading-[21.76px] font-normal'> Title: </span> Math Puzzle </p>
                    <div>
                        <AiOutlineDown color="white"/>
                    </div>
                </div><div  className='flex grad-dar  justify-between items-center px-[32px] rounded-3xl py-[16px] '>
                    <p className='flex gap-[25px] font-droid md:text-[20px] text-[16px] leading-[16.32px] md:leading-[23.61px]    items-center'><span className=' font-Archivo_thin text-wb-40 leading-[21.76px] font-normal'> Title: </span> Math Puzzle </p>
                    <div>
                        <AiOutlineDown color="white"/>
                    </div>
                </div>
                </div>
            </div>:
            <div className="w-full h-full text-white flex flex-col items-center gap-[40px]">
               <div> <img src={empty} /> </div>
               <p className="text-center">
               Opps! You have no record to be displayed.<br/>
                    Please play a game to begin
               </p>
               <button className="modalButton text-[24px] font-droid tracking-[4.74px]">
                    Play Game
               </button>
            </div>
            }
        </div>
    </div>
  )
}

export default LeaderShipBoard 






const Leaders = ({rank, solver, point}:Leadertype) => {
    return (
        <div className='flex justify-between font-droid text-[15px] md:text-[32px] font-normal px-[16px]  md:px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[16px] md:py-[24px]'>
        <div className='col-span-2 flex items-center gap-[16px] md:gap-[48px] '>
            <div className=' bg-blue-main w-[48px] h-[48px] md:w-[72px] md:h-[72px] rounded-[8px] '>

            </div>
        <div className='flex flex-col items-start'> <p>{solver}</p>
        
       <div className=' text-right text-[13px] md:text-[24px] font-medium leading-[26.11px] font-Archivo_Regular flex-1 block md:hidden'>{point}MP</div>
        </div>

        </div>
       
       <div className="flex md:gap-[64px] items-center">
       <div className=' text-right text-[13px] md:text-[24px] font-medium leading-[26.11px] font-Archivo_Regular flex-1 hidden md:block'>{point}MP</div>
         <div>{rank == "ultimate"? <img src={medal}  className="h-[24px] w-[24px] md:w-[initial] md:h-[initial]" />:rank=='master'?<img src={medalMaster} className="h-[24px] w-[24px] md:w-[initial] md:h-[initial]"/>:rank}</div>
       </div>
       
       
    </div>
    )
}