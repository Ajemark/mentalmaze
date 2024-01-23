import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../../component/ui/Loading";
import { MMContract } from "../../sdk/MMContract";
import { MM_ADDRESS, useEthersProvider, useEthersSigner } from "../../sdk";
import { useNavigate } from "react-router-dom";

const ChallengerGame = () => {

  const navigate = useNavigate()

  const [curGame, setCurGame]: any = useState()
  const [curQuestion, setCurQuestion]: any = useState(0)
  const { userDetails }: any = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const mmContract = new MMContract(MM_ADDRESS, signer, provider)

  const numbers = [];
  for (let i = 1; i < 11; i++) {
    numbers.push(i);
  }

  const getPendingGame = () => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/game/get-all-pending-games?pageNumber=1&pageSize=20`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.data) {
          const id = location.search.split('id=')[1]
          console.log(result.data)
          const data = result.data.response.filter((game: any) => game.id == id)[0]
          setCurGame(data)
          if (!data) navigate("/challenger")
          setLoading(false)
        }
        else {
          console.log(result)
          setLoading(false)
        }
      })
      .catch(error => {
        setLoading(false)
        console.log('error', error)
      });
  }

  const approveGameOnDB = () => {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    const raw = JSON.stringify({
      "gamesId": curGame.id,
      "judgeAccountId": userDetails.id
    })

    console.log(raw)

    let requestOptions: RequestInit = {
      method: 'PUT',
      body: raw,
      headers: myHeaders,
      redirect: 'follow'
    };


    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/game/approve-pending-games`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setLoading(false)
          console.log(result)
          navigate("/challenger")
        }
        else {
          console.log(result)
          setLoading(false)
        }
      })
      .catch(error => {
        setLoading(false)
        console.log('error', error)
      });
  }

  // const rejectGameOnDB = () => {

  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

  //   const raw = JSON.stringify({
  //     "gamesId": curGame.id,
  //     "judgeAccountId": userDetails.id
  //   })
  //   let requestOptions: RequestInit = {
  //     method: 'PUT',
  //     body: raw,
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };

  //   fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/game/reject-pending-games`, requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       if (result) {
  //         setLoading(false)
  //         navigate("/challenger/uploadedgames")
  //         console.log(result)
  //       }
  //       else {
  //         console.log(result)
  //         setLoading(false)
  //       }
  //     })
  //     .catch(error => {
  //       setLoading(false)
  //       console.log('error', error)
  //     });
  // }

  const approveGame = async () => {
    setLoading(true)
    setErrorMessage('')
    sendTx('')
  }

  const rejectGame = async () => {
    setLoading(true)
    setErrorMessage('')
    sendTx('reject')
  }



  const sendTx = async (type: String) => {

    const gameData = (await mmContract.Games(curGame.address))

    if (gameData[0]) {
      approveGameOnDB()
      return
    }

    try {
      let tx;
      if (type == 'reject') {
        tx = await mmContract.rejectGame(curGame.address)
      }
      tx = await mmContract.approveGame(curGame.address)

      if (tx) {
        console.log(JSON.parse(JSON.stringify(tx)))


        const gameData = (await mmContract.Games(curGame.address))

        if (gameData[0]) {
          approveGameOnDB()
          return
        }
        setLoading(false)
      }
    } catch (error: any) {
      setLoading(false)
      let msg = JSON.parse(JSON.stringify(error)).reason
      if (msg.includes('you are only allowed to vote ones')) msg = 'You Are Only Allowed To Vote Once!'
      setErrorMessage(msg)
      console.log(error)
    }
  }

  useEffect(() => {
    if (!userDetails.token) return
    setLoading(true)
    getPendingGame()
  }, [userDetails])

  // console.log(curGame)

  return (
    <div>
      {
        loading ? <Loading /> :
          (
            <div className='flex flex-col relative items-center mt-[96px] md:mt-[104px]  md:border-t-solid border-t-2 border-l-2 border-1 border-blue-50 px-[20px] '>
              <div className='flex gap-[2.76px] wb-100 w-full pl-[24px] md:px-[56px] h-[40px] md:h-[90px] items-center overflow-scroll md:overflow-hidden'>
                <div className={`relative flex  `} >
                  {curGame?.question?.map((_: any, i: number) =>

                    <div key={i}>
                      <div key={i} className={`relative text-white rounded-[8px] w-[27px] h-[30px] text-[12px] md:text-base md:w-[48px] md:h-[40px]   border-solid shadow-lg`}
                        style={{
                          background: "linear-gradient( rgba(3, 36, 73, 1), rgba(11, 119, 240, 1))",
                        }}
                      >
                        <button onClick={() => setCurQuestion(i)} className={` w-full h-full rounded-[10px] ${i == curQuestion ? "bg-blue-70" : "bg-blue-100"}`}>
                          {i + 1}</button>
                      </div>


                    </div>

                  )}
                </div>
              </div>
              {
                curGame && Object.keys(curGame).length > 1 && (

                  <div className="w-full px-[16px] md:px-[52px] ">
                    <h1 className='font-droid text-white text-center text-[16px] md:text-[32px] text-left w-full mt-[40px]'>
                      {curGame?.question[curQuestion].title}
                    </h1>
                    <div className="mt-[32px] md:mt-[72px] flex flex-col items-center gap-[32px]">
                      {
                        curGame?.question[curQuestion].image.includes('http') ?
                          <img src={curGame?.question[curQuestion].image} /> :
                          <p className='font-droid text-white text-center text-[16px] md:text-[22px] text-left w-full mt-[40px]'>{curGame?.question[curQuestion].image}</p>
                      }

                    </div>
                    <div className='flex w-full mt-10 justify-center gap-[16px]'>
                      {curGame?.question[curQuestion].options.map((option: any, index: any) => {
                        return (
                          <div key={index} className='bg-[inherit]  items-center flex justify-center border-blue-main border-[3px] rounded-[8px] border-solid h-[60px] w-[60px] text-white'>
                            {option.toUpperCase()}
                          </div>
                        )
                      })}
                    </div>
                    <div className="mx-auto w-fit">
                      <p className="text-white text-[16px] font-Archivo_Regular font-[400] leading-[17.41px] mt-[32px] mx-auto">Correct Answer</p>
                      <button className=" border-blue-main mt-[8px] font-[900] text-[17px] md:text-[32px] font-Archivo-Bold text-white  mx-auto w-[157px] md:w-[472px] h-[59px] md:h-[84px] rounded-[8px] border-[2px] bg-blue-70]">
                        {curGame?.question[curQuestion].answer.toUpperCase()}
                      </button>
                    </div>

                    <div className="flex flex-col gap-[24px] w-full mt-[64px] font-Archivo_Regular text-[20px] ">
                      <button onClick={() => {
                        approveGame()
                      }} className="bg-blue-50 text-white h-[96px] w-full rounded-[16px]">
                        APPROVED GAME
                      </button>
                      <button onClick={() => {
                        rejectGame()
                      }} className=" bg-disppaprove text-white h-[96px] w-full rounded-[16px] ">
                        DISAPPROVED GAME
                      </button>
                    </div>
                    {errorMessage != '' && <p className="text-red-500 font-bold text-[16px] text-center">{errorMessage}</p>}
                  </div>
                )
              }
              <div
                className="h-fit w-fit mr-[16px] md:mr-[54px] ml-[16px] md:ml-[54px] mt-[80px] p-[4px] rounded-[27px]"
                style={{
                  'background': "linear-gradient(#0B77F0, #85BCF9)"
                }}>
                <div className="text-white font-Archivo_Regular text-[20px]  bg-wb-100  rounded-[24px]  pb-[55px]">
                  <p className="mx-auto text-center font-droid text-[20px] py-[16px] md:text-[32px] leading-[37.78px] pt-[16px] pb-[32px] border-b-[4px] border-b-[#0B77F0] w-full">{curGame?.title}</p>
                  <p className="px-[40px] md:px-[42px] pt-[52px] leading-[21.76px]]">
                    Math Puzzle: Unleash your inner whiz, where speed and accuracy meld together harmoniously, paving the path to triump and unlocking thesecrets of mathematical mastery!
                  </p>
                </div>
              </div>
            </div>
          )
      }
    </div>
  )
}

export default ChallengerGame