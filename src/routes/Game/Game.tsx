
import { AiOutlineClockCircle } from "react-icons/ai"
import { IoDiamondSharp } from "react-icons/io5"
import messagequestion from "./../../assets/play/messagequestion.svg"
import Column from "./../../assets/play/Column.svg"
import Modules from "./../../assets/play/Modules.svg"
// import useQuery from "../../hooks/useQuery"
import ColoumMobile from "./../../assets/play/ColoumMobile.svg"
import moduleMobile from "./../../assets/play/moduleMobile.svg"
// import { useEffect } from "react"
// import { useModalContext } from "../../context/ModalContext"
const Game = () => {
  // const { switchModalcontent, switchModal } = useModalContext()
  // useEffect(() => {
  //   const timeout = setTimeout(() => {switchModalcontent('hurray'); switchModal()}, 10000)
  //   return () => clearTimeout(timeout)
  // }, [])


  return (
    <div>
      <div className='relative  md:mr-[52px] h-fit rounded-[24px] mt-[96px] md:mt-[130px] px-[20px] '>

        <div className='bg-black md:pl-[52px] mb-[40px] rounded-t-[24px] md:rounded-r-[24px] flex flex-col md:flex-row'>
          <div className='border-[4px] border-blue-80 border-solid rounded-[24px] flex-1 '>
            <GameHeader />
            <div className='flex flex-col items-center gap-[36px] py-[67px]'>
              <div>
                <img src={Column} className="hidden md:block" />
                <img src={ColoumMobile} className="block md:hidden" />
              </div>
              <div >
                <img src={Modules} className="hidden md:block" />
                <div className="flex items-center md:hidden">
                  <div className='flex flex-col items-center gap-[8px] text-white font-droid text-[15px] md:text-[32px]'>
                    <div
                      className="w-[32px] h-[32px] text-center"
                      style={{
                        'background': "linear-gradient(180deg, #0B77F0 0%, #85BCF9 100%)",
                        "WebkitBackgroundClip": "text",
                        "WebkitTextFillColor": "transparent",
                        "borderStyle": "solid",
                        "borderWidth": "2px",
                        "borderColor": "blue",
                        "borderRadius": "8px",
                      }}
                    >  3 </div>
                    <div className='next rounded-[16px] p-[1px] text-white bg-blue-200'
                      style={
                        {
                          background: "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)"
                        }
                      }
                    >
                      <div className='rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[6px] md:text-[16px] flex items-center gap-[8px] w-fit justify-center'>
                        POPS
                      </div>
                    </div>
                  </div>
                  <img src={moduleMobile} className="block md:hidden" />
                  <div className='flex flex-col items-center gap-[8px] text-white font-droid text-[15px] md:text-[32px]'>
                    <div
                      className="w-[32px] h-[32px] text-center"
                      style={{
                        'background': "linear-gradient(180deg, #0B77F0 0%, #85BCF9 100%)",
                        "WebkitBackgroundClip": "text",
                        "WebkitTextFillColor": "transparent",
                        "borderStyle": "solid",
                        "borderWidth": "2px",
                        "borderColor": "blue",
                        "borderRadius": "8px",
                      }}
                    >  3 </div>
                    <div className='next rounded-[16px] p-[1px] text-white bg-blue-200'
                      style={
                        {
                          background: "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)"
                        }
                      }
                    >
                      <div className='rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[6px] md:text-[16px] flex items-center gap-[8px] w-fit justify-center'>
                        REVEAL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
        <div className='flex gap-[38px] flex-col md:flex-row md:pl-[52px]'>
          <Rating />
          <About />
        </div>
      </div>
    </div>
  )
}



const Sidebar = () => {
  const numbers = [];
  for (let i = 1; i < 11; i++) {
    numbers.push(i);
  }

  return (
    <div className='mt-[32px] md:mt-0 grid grid-cols-3 gap-y-[8px] gap-x-[8px]  md:flex flex-col gap-[8px] bg-wb-100 px-[16px] md:px-[32px] py-[20px] rounded-r-[24px] h-full  rounded-[16px]'>
      {
        numbers.map((item) => <div className='bg-wb-90 w-[93px] md:w-fit text-center md:px-[44.5px] rounded-[16px] py-[16px] leading-[17.41px] text-[16px] text-[#595959] font-Archivo_Regular font-[900] border-[2px]  border-blue-50 border-solid'>
          {item}
        </div>)
      }

    </div>
  )
}

const GameHeader = () => {
  return (
    <div className='flex justify-between py-[18px] bg-wb-100 rounded-t-[24px]  md:rounded-tl-[24px] px-[18px]'>
      <div className='flex gap-[32px] w-full md:w-fit justify-between'>
        <div className='flex items-center gap-[8px]'>
          <AiOutlineClockCircle color="#0B77F0" fontSize={24} />
          <div className='next rounded-[16px] p-[1px] text-white'>
            <div className='rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-fit justify-center'>
              00:59
            </div>
          </div>
        </div>
        <div className='flex items-center gap-[8px]'>
          <IoDiamondSharp color="#0B77F0" fontSize={24} />
          <div className='next rounded-[16px] p-[1px] text-white'>
            <div style={
              {
                // background: "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)"
              }
            } className='rounded-[16px] bg-blue-80 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-[80px] justify-center'>
              1000
            </div>
          </div>
        </div>
      </div>

      <div className='hidden md:flex gap-[32px]'>
        <div className='flex items-center gap-[8px] text-white font-droid text-[32px]'>
          <div
            style={{
              'background': "linear-gradient(180deg, #0B77F0 0%, #85BCF9 100%)",
              "WebkitBackgroundClip": "text",
              "WebkitTextFillColor": "transparent"
            }}
          >  3 </div>
          <div className='next rounded-[16px] p-[1px] text-white bg-blue-200'
            style={
              {
                background: "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)"
              }
            }
          >
            <div className='rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-fit justify-center'>
              POPS
            </div>
          </div>
        </div>
        <div className='flex items-center gap-[8px] '>
          <img src={messagequestion} alt="" />
          <div className='next rounded-[16px] p-[2px] text-white bg-blue-200 '>
            <div style={
              {
                background: "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)"
              }
            } className='rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-fit justify-center'>
              REVEAL
            </div>
          </div>
        </div>
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