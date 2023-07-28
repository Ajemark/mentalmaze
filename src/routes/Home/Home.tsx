import { games } from "./GamesData";
import {VscUnlock} from "react-icons/vsc"
import {RiArrowDownSLine} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const TitleBar = () => { 
  return( 
  <div className="text-white font-Archivo_Regular  flex w-full justify-between items-center mt-[16px] md:mt-0 py-[15px]" >
    <div className="flex  items-center gap-6">
      <h2 className="font-normal text-[20px]   md:text-5xl">
    PUZZLE
    </h2>
    <p className="border-blue-50 h-[24px] w-[27px] md:h-[initial] md:w-[initial] text-center md:py-4 md:px-6 rounded-lg leading-[21.76px] text-[10px] md:text-xl border-2 ">
      12
    </p>
    </div>
    <div className="">
    <select name="" id="" style={{
      background: "var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))",
    }} className="font-droid p-[16px]">
    <option className="px-6 py-[24.5px] outline-none border-blue-main border-[2px] rounded-lg hidden md:flex items-center justify-center gap-6 ">
      <p className=" font-normal text-[15px] text-white bg-inherit font-droid ">Select  creator</p> 
      <select name="" id=""></select>
      <RiArrowDownSLine size={25} />
      </option>
      <option className="px-6 py-[24.5px] outline-none border-blue-main border-[2px] rounded-lg hidden md:flex items-center justify-center gap-6 ">
      <p className=" font-normal text-[15px] text-white bg-inherit font-droid ">Mental Maze</p> 
      <select name="" id=""></select>
      <RiArrowDownSLine size={25} />
      </option> <option className="px-6 py-[24.5px] outline-none border-blue-main border-[2px] rounded-lg hidden md:flex items-center justify-center gap-6 ">
      <p className=" font-normal text-[15px] text-white bg-inherit font-droid ">Other Contributor</p> 
      <select name="" id=""></select>
      <RiArrowDownSLine size={25} />
      </option>
      </select>
      </div>
  </div>
  );
}

const Game = ({image}:{image: string}) => {
  return (
    <div className="relative flex justify-center items-center w-full border-blue-100 border-[4px] border-solid">
      <img src={image}  className="w-full" />
      <div className="absolute p-[2px rounded-[8px] p-[2px]" style={{
        "background" : "linear-gradient(90deg, #032449, #0B77F0)"
      }} >
      <button className=" w-[143px] text-white py-[16px] rounded-[8px] font-droid tracking-[0.2px] left-0" style={{
        "background": "linear-gradient(130deg, #032449 0%, #0B77F0 100%)",
        "backdropFilter": "blur(4px)"
      }}>
        PLAY NOW
      </button>
      </div>
    </div>
  )
}


const Home = () => {
    const navigate = useNavigate()

    return (
      <div className=" w-full h-fit mt-[96px] md:mt-[176px]">
      <div className="relative z-[999]  px-[15px] md:px-14">
        <TitleBar />
        <div>
          <div className="level flex justify-between border-[2px] border-blue-main mt-[32px] md:mt-[96px] font-Archivo_thin text-wb-40 text-[12px] md:text-[20px] font-normal rounded-2xl leading-[21.76px] py-[16px] px-[24px]">
            <p className="flex gap-[8px] items-center justify-center">Level: <span className=" font-droid text-white">Easy</span></p>
          <div className="text-[18px] md:text-[24px]"><VscUnlock color={"white"} /></div>  
          </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[15px] gap-y-[15px] md:gap-x-[45px] md:gap-y-[44px] py-12 w-full px-0" onClick={() => navigate('/game')}>
        {games.map((gam, index) => <Game {...gam} key={index}/>
        )}
        </div>
        </div>
        </div>
      </div>
    )
  }
export default Home