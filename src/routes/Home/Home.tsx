import arrow_bottom from "./../../assets/header/arrow_bottom.png"
import { games } from "./GamesData";
import {VscUnlock} from "react-icons/vsc"

const TitleBar = () => { 
  return( 
  <div className="text-white font-Archivo_Regular  flex w-full justify-between items-center mt-[16px] md:mt-0 py-[15px]" >
    <div className="flex  items-center gap-6">
      <h2 className="font-normal text-[20px]   md:text-5xl">
    MATH PUZZLE
    </h2>
    <p className="border-blue-50 h-[24px] w-[27px] md:h-0 md:w-0 text-center md:py-4 md:px-6 rounded-lg leading-[21.76px] text-[10px] md:text-xl border-2 ">
      12
    </p>
    </div>

    {/* <div className="px-6 py-[12.5px] outline-none border-blue-main border-[2px] rounded-lg hidden md:flex items-center justify-center gap-6">
      <p className="font-Archivo_Regular font-normal text-2xl text-white bg-inherit">Select preferred creator</p> 
      <img src={arrow_bottom} />
      </div> */}
  </div>
  );
}


const Home = () => {
    return (
      <div className=" w-full h-fit ">
      <div className="relative z-[999]  px-[15px] md:px-14">
        <TitleBar />
        <div>
          <div className="level flex justify-between border-[2px] border-blue-main mt-[32px] md:mt-[96px] font-Archivo_thin text-wb-40 text-[12px] md:text-[20px] font-normal rounded-2xl leading-[21.76px] py-[16px] px-[24px]">
            <p className="flex gap-[8px] items-center justify-center">Level: <span className=" font-droid text-white">Easy</span></p>
          <div className="text-[18px] md:text-[24px]"><VscUnlock color={"white"} /></div>  
          </div>
        <div className="grid  grid-cols-2 md:grid-cols-3 gap-x-[15px] gap-y-[15px] md:gap-x-[45px] md:gap-y-[44px] py-12 w-full px-0 ">
        {games.map((gam, index) => <div className="relative" key={index}><img src={gam?.image} alt="" className="w-full"/></div>
        )}
        </div>
        </div>
        </div>
      </div>
    )
  }

export default Home