import challenger from "./../../assets/modal/Challenger.svg"


const ChallengerModal = () => {
  return (
    <div className=' text-white font-droid flex flex-col  items-center text-center justify-evenly md:justify-start h-full'>
        <div>
        <img src={challenger} alt=""  className='relative md:-mb-10 w-[121px] h-[127px] md:w-[initial] md:h-[initial]'/>
        </div>
        <h2 className='text-[24px] md:text-[32px] font-droid leading-[28.34px]  md:leading-[37.78px] md:w-[497px] md:mb-[24px]'>
        Hello challenger, you’ve unlocked a secret passage. 
        </h2>
        <button
        className='p-[2px] rounded-[16px]'
        style={{
            background: "linear-gradient(90deg, rgba(3, 36, 73, 1), rgba(11, 119, 240, 1))"
        }}
        >
        <button className='bg-wb-100 rounded-[16px] w-[226px] h-[67px] md:w-[315px] md:h-[80px] text-[16px] md:text-[24px]'>
        Tell me more!
        </button>
        </button>
    </div>
  )
}

export default ChallengerModal