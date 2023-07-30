import Column from "./../../assets/play/Column.svg"
import Modules from "./../../assets/play/Modules.svg"

const ChallengerGame = () => {
    const numbers = [];
  for (let i = 1; i < 11; i++) {
  numbers.push(i);
  }
  return (
    <div className='flex flex-col relative items-center mt-[96px] md:mt-[104px]  md:border-t-solid border-t-2 border-l-2 border-1 border-blue-50 px-[20px] '>
        <div className='flex gap-[2.76px] wb-100 w-full pl-[24px] md:px-[56px] h-[40px] md:h-[90px] items-center overflow-scroll md:overflow-hidden'>
        {
        numbers.map((item) => 
        <div className={`${item==1?"w-[46.22px] md:w-[104px] bg-black h-[40px] md:h-[90px] rounded-t-[7px] md:rounded-t-[8px] ":"bg-wb-90 h-[25.22px] md:h-[58px] w-[46.22px] md:w-[104px] rounded-[7px] md:rounded-[16px]"}
          text-center md:px-[44.5px] flex justify-center items-center leading-[17.41px] 
          text-[7.11px] md:text-[16px]
        text-[#595959] font-Archivo_Regular font-[900]`}>
          {item}
        </div>)
      }
        </div>
        <div className="w-full px-[16px] md:px-[52px] ">
        <h1 className='font-droid text-white text-[16px] md:text-[32px] text-left w-full mt-[40px]'>
            QUESTION OF THE GAME
        </h1>
        <div className="mt-[32px] md:mt-[72px] flex flex-col items-center gap-[32px]">
            <img src={Column} />
            <img src={Modules} alt="" />
        </div>
        <div className="mx-auto w-fit">
          <p className="text-white text-[16px] font-Archivo_Regular font-[400] leading-[17.41px] mt-[32px] mx-auto">Correct Answer</p>
          <button className=" border-blue-main mt-[8px] font-[900] text-[17px] md:text-[32px] font-Archivo-Bold text-white  mx-auto w-[157px] md:w-[472px] h-[59px] md:h-[84px] rounded-[8px] border-[2px] bg-blue-70]">
            3
          </button>
        </div>

        <div className="flex flex-col gap-[24px] w-full mt-[64px] font-Archivo_Regular text-[20px] ">
          <button className="bg-wb-100 text-white h-[96px] w-full rounded-[16px]">
          APPROVED GAME
          </button>
          <button className=" bg-disppaprove text-white h-[96px] w-full rounded-[16px] ">
          DISAPPROVED GAME
          </button>
        </div>
        </div>
        <div 
        className="h-fit w-fit mr-[16px] md:mr-[54px] ml-[16px] md:ml-[54px] mt-[80px] p-[4px] rounded-[27px]"
        style={{
          'background': "linear-gradient(#0B77F0, #85BCF9)"
        }}>
        <div className="text-white font-Archivo_Regular text-[20px]  bg-wb-100  rounded-[24px]  pb-[55px]">
          <p className="mx-auto text-center font-droid text-[20px] py-[16px] md:text-[32px] leading-[37.78px] pt-[16px] pb-[32px] border-b-[4px] border-b-[#0B77F0] w-full">MATH PUZZLE</p>
          <p className="px-[40px] md:px-[42px] pt-[52px] leading-[21.76px]]">
          Math Puzzle: Unleash your inner whiz, where speed and accuracy meld together harmoniously, paving the path to triump and unlocking thesecrets of mathematical mastery!
          </p>
        </div>
        </div>
    </div>
  )
}

export default ChallengerGame