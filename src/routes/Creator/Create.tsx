import { games } from '../Home/GamesData'
import create from "./../../assets/create/create.svg"
import createmobile from "./../../assets/create/createmobile.svg"
import { useNavigate } from 'react-router-dom'


const Game = ({title, image}: {title: string, image: string}) => {
  return (
    <div className='relative'>
      <img src={image} alt="" />
      <div className='absolute bottom-[32px] left-[32px] p-[2px] rounded-[8px]' style={{
        background: "linear-gradient( #032449, #0B77F0)"
      }}>
      <button className='  
      font-droid text-[12px] md:text-[24px]
      md:leading-[28.34px] text-white py-[16px]
      px-[24px] rounded-[5px] border-[2px]border-[#063C7A]' style={{
        "background": "black",
        "opacity": "0.8",
        "backdropFilter": "blur(4px)"
      }}>
        {title}
      </button>
      </div>
    </div>
  )
}

const Create = () => {
  const navigate = useNavigate()
  return (
    games.length > 0?
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-x-[45px] gap-y-[44px] py-[72px]  px-[16px] mt-[96px] md:mt-[176px]">
        <div className='relative bg-[#010C18] flex flex-col items-center py-[41.8px] h-[232px] md:h-full'>
      <div ><img src={createmobile} alt="" /></div>
      <div className='absolute bottom-[32px]  p-[1px] rounded-[8px]' style={{
        background: "linear-gradient( #032449, #0B77F0)"
      }}>
      <button className=' 
      font-droid text-[12px] md:text-[24px]
      md:leading-[28.34px] text-white py-[16px]
      px-[24px] rounded-[8px] border-[2px]border-[#063C7A]' 
      style={{
        "background": "#010C18",
        "backdropFilter": "blur(4px)"
      }} onClick={() => navigate('/settings')}>
        Create Game
      </button>
      </div>
    </div>
        
        {games.slice(0, 3).map((gam, index) => <Game key={index}  {...gam} />)}
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