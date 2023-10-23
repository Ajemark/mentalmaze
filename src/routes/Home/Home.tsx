// import { games } from "./GamesData";
import { VscUnlock } from "react-icons/vsc"
import { RiArrowDownSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import ReactLoading from 'react-loading';
import { useAccount } from "wagmi";


interface ItemType {
  id: number,
  text: string
}

const TitleBar = () => {
  const [dropDownItem] = useState<ItemType[]>([{ id: 0, text: "Select  creator" }, { id: 1, text: "Mental Maze" }, { id: 2, text: "Other Contributor" }])
  const [current, setCurrent] = useState<number>(0)
  const [showDropDown, setShowDropDown] = useState<boolean>(false)

  const DropDownComp: any = ({ text, current, id }: { text: string, current: boolean, id: number, }) => {

    return (
      <div className={`outline-none cursor-pointer  rounded-[16px]  flex items-center justify-between gap-6 w-full h-[66px]  px-[16px] ${!current ? "hover:headerdropDown-hover-effect hover:border-blue-main hover:border-[2px]" : ""}`}
        onClick={current ? () => setShowDropDown(!showDropDown) : () => setCurrent(id)}
        style={{

          background: current ? "var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))" : ""
        }}
      >
        <p className=" font-normal text-[15px] text-white bg-inherit font-droid ">{text}</p>
        {current ? <RiArrowDownSLine size={25} /> : null}
      </div>
    )
  }




  return (
    <div className="text-white font-Archivo_Regular  flex w-full justify-between flex-col md:flex-row md:items-center mt-[6px] md:mt-0 h-[99px] md:h-[66px] z-50 relative" >
      <div className="flex  md:items-center gap-6">
        <h2 className="font-normal text-[20px]    md:text-5xl">
          PUZZLE
        </h2>
        <p className="border-blue-50 h-[24px] w-[27px] md:h-[initial] md:w-[initial] text-center md:py-4 md:px-6 rounded-lg leading-[21.76px] text-[10px] md:text-xl border-2 ">
          12
        </p>
      </div>

      <div id="" className="w-full md:w-[initial] font-droid  outline-none bg-blue-50 border-blue-main border-[2px] block overflow-hidden rounded-[16px] absolute right-0 top-10 md:top-[0px]"
        style={{
          "background": "rgba(0, 0, 0, 0.80)",
          "boxShadow": "61.33333969116211px 61.33333969116211px 92.00000762939453px 0px rgba(1, 12, 24, 0.25)",
          "height": showDropDown ? "220px" : "66px",
          "transition": "all 0.2s"
        }}
      >
        <DropDownComp text={dropDownItem[current].text} current={true} id={current} />
        <div className="flex items-start flex-col mt-2 px-[16px]" >
          {/* {dropDownItem.filter(item => item.id !== current).map((item) => <DropDownComp {...item} current={false}  />)} */}
          {dropDownItem.filter(item => item.id !== current).map((item, i) => <DropDownComp key={i} {...item} current={false} />)}
        </div>
      </div>
    </div>
  );
}

const Game = ({ image, id, accountId }: { image: string, id: number, accountId: any }) => {
  const navigate = useNavigate()

  const data = window.btoa(JSON.stringify({ gameId: id, accountId })
  )
  return (
    <div className="relative flex justify-center items-center w-full border-blue-100 border-[4px] border-solid" >
      <img src={image.includes('http') ? image : "https://mentalmaze-game.infura-ipfs.io/ipfs/" + image} className="w-full" />
      <div className="absolute p-[2px rounded-[8px] p-[2px]" style={{
        "background": "linear-gradient(90deg, #032449, #0B77F0)"
      }} >
        <button className=" w-[143px] text-white py-[16px] rounded-[8px] font-droid tracking-[0.2px] left-0" style={{
          "background": "linear-gradient(130deg, #032449 0%, #0B77F0 100%)",
          "backdropFilter": "blur(4px)"
        }} onClick={() => navigate('/game?data=' + data)}>
          PLAY NOW
        </button>
      </div>
    </div>
  )
}


const Home = () => {

  const { userDetails, liveGames, setLiveGames }: any = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const { isConnected, address } = useAccount()
  // const [message, setMessage] = useState('Loading Games!')


  const getAllGames = () => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    // =${ address?.toLowerCase()
    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/game/fetch?pageNumber=1&pageSize=3&filter=All`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.data) {
          setLiveGames(result.data)
          setLoading(false)
        }
        else {
          console.log(result)
          setLoading(false)
        }
      })
      .catch(error => {
        console.log('error', error)
        // setMessage('An Error Occured!, Please Try Again')
        setLoading(false)
      });
  }

  useEffect(() => {
    setLoading(true)
    if (!userDetails.token) {
      setLiveGames()
      setLoading(false)
      return
    }
    getAllGames()
  }, [userDetails, address, isConnected])

  console.log(liveGames)
  console.log(userDetails)

  return (
    <div className=" w-full h-fit mt-[96px] md:mt-[176px]">
      <div className="relative z-[999]  px-[15px] md:px-14">
        <TitleBar />
        <div>
          <div className="level flex justify-between border-[2px] border-blue-main mt-[32px] md:mt-[96px] font-Archivo_thin text-wb-40 text-[12px] md:text-[20px] font-normal rounded-2xl leading-[21.76px] py-[16px] px-[24px]">
            <p className="flex gap-[8px] items-center justify-center font-Archivo_Regular font-normal leading-[21.76px]">Level: <span className=" font-droid text-white">Easy</span></p>
            <div className="text-[18px] md:text-[24px]"><VscUnlock color={"white"} /></div>
          </div>
          {
            userDetails.token && (
              <div>
                {
                  loading ? <div className="w-full h-[40vh] text-white flex-col flex items-center justify-center">
                    <ReactLoading type='spin' color='#0B77F0' height={60} width={37} />
                    Loading Games ...
                  </div>
                    : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[15px] gap-y-[15px] md:gap-x-[45px] md:gap-y-[44px] py-12 w-full px-0" >
                      {

                        liveGames?.map((gam: any, index: number) => <Game {...gam} key={index} />
                        )
                      }
                    </div>
                }
              </div>
            )
          }

          {!isConnected || !userDetails.token && (
            <div className="w-full h-[40vh] text-white flex-col flex items-center justify-center">
              <p className="text-white font-driod text-[30px]">Kindly Sign To View Live Games! Reload This Page</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
export default Home