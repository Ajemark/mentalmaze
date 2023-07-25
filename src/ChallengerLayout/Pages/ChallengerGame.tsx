import Column from "./../../assets/play/Column.svg"


const ChallengerGame = () => {
    const numbers = [];
  for (let i = 1; i < 11; i++) {
  numbers.push(i);
  }
  return (
    <div className='flex flex-col items-center'>
        <div className='flex gap-2'>
        {
        numbers.map((item) => <div className='bg-[#262626] w-[104px] md:h-[58px] h-fit md:w-fit text-center md:px-[44.5px] rounded-[16px] flex justify-center items-center leading-[17.41px] text-[16px] text-[#595959] font-Archivo_Regular font-[900] '>
          {item}
        </div>)
      }
        </div>
        <h1 className='font-droid text-white text-[32px] text-left w-full'>
            QUESTION OF THE GAME
        </h1>
        <div>
            <img src={Column} />
        </div>
    </div>
  )
}

export default ChallengerGame