import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';


const ChallengerGames = () => {

  const { userDetails, pendingGames, setPendingGames }: any = useContext(UserContext)

  const getPendingGames = () => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    // =${ address?.toLowerCase()
    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/game/get-all-pending-games?pageNumber=1&pageSize=20`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.data) {
          setPendingGames(result.data)
        }
        else {
          console.log(result)
        }
      })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    if (!userDetails.token) return
    getPendingGames()
  }, [userDetails])


  return (
    <div className='relative text-white px-[20px] mt-[96px] md:mt-[104px] md:pt-[96px] md:border-t-solid border-t-2 border-l-2 border-1 border-blue-50'>
      <h1 className='font-droid text-[16px] md:text-[32px]'>NEWLY UPLOADED GAME</h1>
      <div className="grid  grid-cols-2 md:grid-cols-3 gap-x-[15px] gap-y-[15px] md:gap-x-[45px] md:gap-y-[44px] py-12 w-full px-0 ">
        {
          pendingGames?.map((gam: any, index: number) => <Game {...gam} key={index} />
          )}
      </div>
    </div>
  )
}

export default ChallengerGames

const Game = ({ title, approve, image, id }: any) => {
  const navigate = useNavigate()
  return (
    <div className="w-full relative">
      <img src={image.includes('http') ? image : "https://mentalmaze-game.infura-ipfs.io/ipfs/" + image} className='w-full bg-center' alt="" />
      <div className='absolute bottom-0 bg-black backdrop-blur-[2.2068965435028076px] h-[68px] w-full opacity-80 flex justify-between px-[17.65px] items-center'>
        <p className='font-droid text-[20px] leading-[23.61px]'>{title}</p>
        <button
          onClick={() => {
            if (!approve)
              navigate('/challenger/singlegame?id=' + id)
          }}
          className='font-normal text-[14px] font-droid leading-[16.53px] bg-black px-[8px] py-[12px] rounded-[6px] border border-solid border-[#0D0D0D] opacity-80 backdrop-blur-[2.310344934463501px] w-[86px]  '>
          {approve ? "vetted" : "VET NOW"}
        </button>
      </div>
    </div>
  )
}