import { useNavigate } from "react-router-dom"


const ChallengerHome = () => {
  const navigate = useNavigate()
  return (
    <div className='relative  text-white px-[20px] md:px-[52px] max-w-[1368px] mx-auto tracking-normal md:tracking-widest text-[14px] md:text-[28px] mt-[96px] md:mt-[104px] md:pt-[96px] md:border-t-solid border-t-2 border-l-2 border-1 border-blue-50'>
      <div>
        <h2 className='font-droid leading-[37.78px]'>Hello UNDERCOVER SOLVER</h2>
        <p className='flex flex-col gap-10 mt-[48px]'>
          <h2 className=' font-droid leading-[37.78px]'>  You have unlocked a secret & Sacred path in the game. You are qualified to be called a challenger.</h2>
          <h2 className=' font-droid leading-[37.78px]'> You amongst other undercover challengers, will be the first to see and test any game before it goes live. Infact you decide if it goes live or not.</h2>
        </p>
      </div>
      <div>
        <h2 className=' font-droid leading-[37.78px] mt-[64px] text-blue-main'>How it works</h2>
        <p className='flex flex-col gap-10 mt-[48px]'>
          <h2 className=' font-droid leading-[37.78px]'>After a creator uploads a game, it will appear on your dashboard, you get to be the first to solve it, you vote (approve) if the question is correct and has no problem. then you dissapprove if you find a problem with the question. </h2>
          <h2 className=' font-droid leading-[37.78px]'> We implore that you take your time to verify each questions before you cast your vote. </h2>
          <h2 className=' font-droid leading-[37.78px]'>
            PS: Regardless of what you vote, you’d get 30mp.
          </h2>
        </p>
      </div>
      <div className='flex flex-col gap-[24px]'>
        <button className=' bg-wb-100 py-[24px] md:py-[32px] mt-[80px] rounded-[16px] text-[16px] md:text-[20px] font-Archivo_Regular' onClick={() => navigate('/challenger/uploadedgames')}>
          JOIN THE CHALLENGERS
        </button>
        <button className='bg-wb-100 py-[24px] md:py-[32px] rounded-[16px] text-[16px] md:text-[20px] font-Archivo_Regular' onClick={() => navigate('/')}>
          I'D RATHER BE THE SOLVER
        </button>
      </div>
    </div>
  )
}

export default ChallengerHome