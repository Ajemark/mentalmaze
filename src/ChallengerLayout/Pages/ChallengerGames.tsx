import { games } from '../../routes/Home/GamesData'

const ChallengerGames = () => {
  return (
    <div className='relative text-white px-[20px] md:px-0'>
        <h1 className='font-droid text-[16px] md:text-[32px]'>NEWLY UPLOADED GAME</h1>
        <div className="grid  grid-cols-2 md:grid-cols-3 gap-x-[15px] gap-y-[15px] md:gap-x-[45px] md:gap-y-[44px] py-12 w-full px-0 ">
        {games.map((gam, index) => <div className="relative" key={index}><img src={gam?.image} alt="" className="w-full"/></div>
        )}
        </div>
    </div>
  )
}

export default ChallengerGames