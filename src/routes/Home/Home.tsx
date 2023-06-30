import arrow_bottom from "./../../assets/header/arrow_bottom.png"
import { games } from "./GamesData";


const TitleBar = () => { 
  return( 
  <div className="text-white font-Archivo_Regular  flex w-full justify-between items-center" >
    <div className="flex  items-center gap-6">
      <h2 className="font-normal   text-5xl">
    All GAMES
    </h2>
    <p className="border-blue-50 py-4 px-6 rounded-lg leading-[21.76px] text-xl border-2">
      1
    </p>
    </div>

    <div className="px-6 py-[12.5px] outline-none border-blue-main border-[2px] rounded-lg flex items-center justify-center gap-6">
      <p className="font-Archivo_Regular font-normal text-2xl text-white bg-inherit">Select preferred creator</p> 
      <img src={arrow_bottom} />
      </div>
  </div>
  );
}


const Home = () => {
    return (
      <div className=" w-full h-fit relative mt-[104px]">
      <div className="relative  z-10 py-[72px] px-14">
        <TitleBar />
        <div className="grid grid-cols-3 gap-x-[45px] gap-y-[44px] py-12">
        {games.map((gam) => <div><img src={gam?.image} alt="" /></div>
        )}
        </div>
        </div>
      </div>
    )
  }

export default Home