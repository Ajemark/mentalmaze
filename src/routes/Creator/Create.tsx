import { games } from '../Home/GamesData'
import create from "./../../assets/create/create.svg"
import createmobile from "./../../assets/create/createmobile.svg"
import { useNavigate } from 'react-router-dom'
const Create = () => {
  const navigate = useNavigate()
  return (
    games.length > 0?
    <div className="grid  grid-cols-2 md:grid-cols-3 gap-x-[45px] gap-y-[44px] py-[72px] mt-[104px] px-[16px] mt-[96px] md:mt-[176px]">
        <div className= 'relative bg-blue-100 border-[4px] border-solid border-blue-100 flex flex-col items-center justify-center w-full py-[32px]'>
        <img src={createmobile} className=' '/>
        <button className='font-droid text-[12px] md:text-[24px] md:leading-[28.34px] text-white py-[16px] level px-[24px] rounded-[8px] border-[2px]  border-[#063C7A]' onClick={() => navigate('/settings?title=game-details')}>
            CREATE GAME
        </button>
        </div>
        
        {games.slice(0, 3).map((gam, index) => <div className="relative w-full h-full " key={index}><img src={gam?.image}  className="w-full" alt="" /></div>
        )}
    </div>
    :
    <div className='w-full flex flex-col  items-center justify-center h-full text-white mt-[96px] md:mt-[176px]'>
        <div>
        <img src={create} />
        </div>
        <p className='font-Archivo_Regular text-[20px] leading-[21.76px] flex flex-col gap-2 text-center mb-[48px]'>
        You know what’s better than playing games created by <div> others? Creating your own game for others to play.</div>
        </p>
        <button className='font-droid text-[24px] leading-[28.34px] modalButton'>
            CREATE GAME
        </button>
    </div>
  )
}

export default Create