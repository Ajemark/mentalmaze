import { AiOutlineClockCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../../component/ui/Loading";
import { useModalContext } from "../../context/ModalContext";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";
import { ERC20, MM_ADDRESS, useEthersProvider, useEthersSigner } from "../../sdk";
import { MMContract } from "../../sdk/MMContract";
import { formatEther } from "viem";
import { ERC20Contract } from "../../sdk/ERC20";
import { AbiCoder } from "ethers";



const Game = () => {
  const [loading, setLoading] = useState(false)
  const [gatePass, setGatePass] = useState(false)
  const [game, setGame]: any = useState()
  const [scGame, setScGame]: any = useState()
  const [curQuestion, setCurQuestion]: any = useState(0)
  const [selected, setSelected]: any = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const [answers, setAnswers]: any = useState([])
  const [playerData, setPlayerData]: any = useState()
  const [timeRemaining, setTimeRemaining]: any = useState()

  const [submitting, setSubmitting] = useState(false)
  const [questions, setQuestions]: any = useState()
  const [gameAddress, setGameAddress]: any = useState()

  const { switchModalcontent, switchModal } = useModalContext();

  const { address } = useAccount();
  const navigate = useNavigate();
  const { userDetails }: any = useContext(UserContext);


  const getSingleGame = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const data = JSON.parse(window.atob(location.search.split("?data=")[1]));

    fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL
      }/api/game/fetch-single?gameid=${data.gameId}&accountId=${data.accountId
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        if (result.data) {
          setGame(result.data);
        } else {
          // console.log(result);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  const getPlayerDetails = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const data = JSON.parse(window.atob(location.search.split('?data=')[1]))

    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/player/getPlayerDetails?gameId=${data.gameId}&playersAddress=${userDetails.address}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.gamePlayerDetails?.length > 0 || result.gamePlayerDetails.id) {
          setPlayerData(result.gamePlayerDetails[0])
          getSingleGame()
        } else {
          createPlayer()
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }

  const createPlayer = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.parse(window.atob(location.search.split("?data=")[1]));
    console.log(data)
    const raw = JSON.stringify({
      accountId: data.accountId,
      playersAddress: userDetails.address,
      gameId: data.gameId,
    });
    let requestOptions: RequestInit = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/player/createGamePlayer`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.gamePlayerData?.length > 0 || result.gamePlayerData.id) {
          setPlayerData(result.gamePlayerData)
          getSingleGame()
        }
        else {
          // console.log(result)
          setLoading(false)
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const mmContract = new MMContract(MM_ADDRESS, signer, provider)
  const erc20Contract = new ERC20Contract(ERC20, signer, provider)


  const fetchSCGame = async () => {
    console.log(gameAddress)
    const tx = await mmContract.Games(gameAddress)
    return (tx);
  }

  const _scGames = fetchSCGame()

  useEffect(() => {
    if (!scGame)
      (async () => {
        setScGame(await _scGames)
        fetchPlayerGame()
      })()
  }, [_scGames])


  const fetchPlayerGame = async () => {
    const tx = await mmContract.playerGames(address as String, gameAddress)
    if (tx[0]) {
      getPlayerDetails()
    } else {
      setLoading(false)
    }
  }


  const payForPass = async (gatePassFee: any) => {

    const tx = await mmContract.playerGames(address as String, gameAddress)
    console.log(tx)
    if (tx[0]) {
      getPlayerDetails()
      return
    }

    if (scGame[1].toLowerCase() == address?.toLowerCase()) {
      setErrorMessage('Owners can`t play thier game!')
      return
    }

    try {

      console.log(scGame)
      console.log(scGame[5])
      // return

      setLoading(true)


      const allowance = await erc20Contract.allowance(address as string, MM_ADDRESS)

      if (Number(allowance) >= (Number(gatePassFee))) {

        const tx = await mmContract.gatePass(gameAddress, scGame[5])
        if (tx) {
          console.log(tx)
          setErrorMessage('Gate Pass Payed for, click `PLAY NOW` to play game')
          fetchPlayerGame()
        }
        return
      }

      const approved = await erc20Contract.approve(MM_ADDRESS, ((gatePassFee)).toString())
      if (approved) {
        const tx = await mmContract.gatePass(gameAddress, scGame[5])
        if (tx) {
          console.log(tx)
          setErrorMessage('Gate Pass Payed for, click `PLAY NOW` to play game')
          fetchPlayerGame()
        }
        return
      }









      const tx = await mmContract.gatePass(gameAddress, gatePassFee)






      if (tx) {
        console.log(tx)
        setErrorMessage('Gate Pass Payed for, click `PLAY NOW` to play game')
        fetchPlayerGame()
      }




    } catch (error: any) {
      console.log(error)
      if (JSON.parse(JSON.stringify(error)).info.error.data.message.includes('insufficient funds')) {
        setErrorMessage('You Do Not Have Enough ETH To Process This Transaction!')
        return
      }
      setErrorMessage('An Error Occured, Please Try Again!')
    }
  }

  useEffect(() => {
    setLoading(true)
    if (!gameAddress) {
      const data = JSON.parse(window.atob(location.search.split("?data=")[1]));
      setGameAddress(data.gameAddress)
    }

    if (!game) return;
    let played = false;
    for (const count in game.finishers) {
      played =
        game.finishers[count]?.toLowerCase() == address?.toLowerCase();
      if (played) break;
    }
    if (played) navigate('/')

  }, [game])


  console.log(timeRemaining)

  useEffect(() => {
    if (!game) return;
    if (!playerData) return;

    const levelQuestions = game.question.filter((g: any) => g.difficultyLevel.toLowerCase() == playerData.unlockLevel.toLowerCase())

    setQuestions(levelQuestions)

  }, [game, playerData])


  useEffect(() => {
    if (!questions || questions.length < 1) return;
    getQuestionTime(questions[curQuestion].id)
  }, [curQuestion, questions])


  const handleAnswers = (clicked = false) => {


    if (submitting) return;
    setErrorMessage("");
    if (!selected && clicked) {
      setErrorMessage("Please Select An Option");
      return;
    }

    if (curQuestion + 1 >= questions.length) {
      const d = {
        questionId: questions[curQuestion].id,
        questionAnswer: selected ?? "null",
      };
      const data = [...answers];
      data.push(d);

      setAnswers(data);

      const dataToSubmit = {
        gameId: game.id,
        playerAddress: userDetails.address,
        level: questions[curQuestion].difficultyLevel.toUpperCase(),
        playerId: playerData.id,
        arrayofQuestion_answer: data,
      };

      localStorage.setItem(`GameInfo`, JSON.stringify({
        dataToSubmit, game: {
          id: game.id,
          title: game.title
        }
      }))

      setSubmitting(true)
      setTimeRemaining(1)
      updateTimer(questions[curQuestion].id, 1)
      switchModal();
      switchModalcontent("hurray");
      return;
    }

    const d = {
      questionId: questions[curQuestion].id,
      questionAnswer: selected ?? "null",
    };
    const data = [...answers];
    data.push(d);

    setAnswers(data);

    const dataToSubmit = {
      gameId: game.id,
      playerAddress: userDetails.address,
      level: questions[curQuestion].difficultyLevel,
      playerId: playerData.id,
      arrayofQuestion_answer: data,
    };

    localStorage.setItem(`GameInfo`, JSON.stringify({
      dataToSubmit, game: {
        id: game.id,
        title: game.title
      }
    }))

    setTimeRemaining(1)
    updateTimer(questions[curQuestion].id, 1)
    setCurQuestion(curQuestion + 1);
    setSelected();
  };

  const updateTimer = (qId: number, tRm: number) => {

    if (timeRemaining < 1) return
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    const raw = JSON.stringify({
      "gameId": game.id,
      "questionId": qId,
      "timeRemaining": tRm,
      "accountId": playerData.accountId
    })

    console.log(raw)

    let requestOptions: RequestInit = {
      method: 'PUT',
      body: raw,
      headers: myHeaders,
      redirect: 'follow'
    };


    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/time/update-time`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          console.log(result)

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

  const getQuestionTime = (qId: number) => {
    setLoading(true)

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    console.log(playerData)

    fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL
      }/api/time/fetch-time?gameId=${game.id}&accountId=${playerData.accountId
      }&questionId=${qId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          console.log(result)
          setTimeRemaining(Number(result.data.timeRemaining))
          setErrorMessage('')
          setGatePass(true)
          setLoading(false)
        } else {
          // console.log(result);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  // console.log(curQuestion)
  // console.log(playerData)
  // console.log(questions)

  console.log(game, loading, timeRemaining, scGame)

  return (
    <div>
      {(loading || !scGame ? <Loading /> :

        !gatePass ?

          <div className="relative  md:mr-[52px] h-fit rounded-[24px] mt-[96px] md:mt-[130px] px-[20px] ">

            <div className="w-full h-[78vh] flex justify-center items-center">
              <div className="w-[350px] p-[24px] rounded-[8px] flex justify-center items-center flex-col h-[240px] bg-gradient-to-r from-[#032449] to-[#0B77F0]">

                <div className="w-[300px] text-white h-[130px] rounded-[8px] bg-[rgba(0,0,0,0.52)]">
                  <p className="p-2">Gate Pass : {scGame && (formatEther(scGame[7].toString()))}</p>
                  <p className="p-2">Total Reward  : {scGame && formatEther(scGame[2].toString())}</p>
                  <p className="p-2">Game Duration  : {scGame && scGame[3].toString()} hours</p>
                </div>
                <button onClick={() => {
                  payForPass(scGame[6]);
                }}
                  className="text-white mt-5 font-droid bg-[rgba(1,12,24,1)]  rounded-[8px] border border-[rgba(132,188,249,1)] p-2 px-5 ">Play Now</button>
                {errorMessage != '' && <p className="text-white text-center">{errorMessage}</p>}
              </div>
            </div>
          </div>

          : (

            <div className="relative  md:mr-[52px] h-fit rounded-[24px] mt-[96px] md:mt-[130px] px-[20px] ">
              <div className="bg-black md:pl-[52px] mb-[40px] rounded-t-[24px] md:rounded-r-[24px] flex flex-col md:flex-row">
                <div className="border-[4px] border-blue-80 border-solid rounded-[24px] flex-1 ">
                  <GameHeader
                    updateTimer={updateTimer}
                    questionId={questions[curQuestion].id}
                    handleAnswers={handleAnswers}
                    timer={timeRemaining}
                  />
                  <div className="flex flex-col items-center gap-[36px] py-[67px]">
                    {game && Object.keys(game).length > 1 && (
                      <div className="w-full px-[16px] md:px-[52px] ">
                        <h1 className="font-droid text-center text-white text-[16px] md:text-[32px] text-left w-full  ">
                          {questions[curQuestion].title}
                        </h1>
                        <div className="mt-[32px] flex flex-col items-center ">
                          {
                            questions[curQuestion].image.includes("http") ? <img
                              src={questions[curQuestion].image}
                            /> :
                              <p className='font-droid text-center text-white text-center text-[16px] md:text-[22px] text-left w-full mt-[40px]'>{questions[curQuestion].image}</p>
                          }

                        </div>
                        <div className="flex w-full mt-10 justify-center gap-[16px]">
                          {questions[curQuestion].options.map(
                            (option: any, index: any) => {
                              return (
                                <div
                                  key={index}
                                  onClick={() => setSelected(option)}
                                  className={`${selected == option
                                    ? "bg-blue-70"
                                    : "bg-[inherit]"
                                    } items-center flex justify-center border-blue-main border-[3px] cursor-pointer rounded-[8px] border-solid h-[60px] w-[60px] text-white`}
                                >
                                  {option.toUpperCase()}
                                </div>
                              );
                            }
                          )}
                        </div>

                        <div className="mt-[48px] w-full flex">
                          <button
                            className="w-full mx-auto bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px]  w-[60%]  border-blue-main py-[16px]"
                            onClick={() => handleAnswers(true)}
                          >
                            PROCEED
                          </button>
                        </div>
                        {errorMessage != "" && (
                          <p className="text-red-500 mt-2 text-center">
                            {errorMessage}
                          </p>
                        )}
                      </div>
                    )}

                    {/* <div>
                  <div className="flex items-center md:hidden">
                    <div className="flex flex-col items-center gap-[8px] text-white font-droid text-[15px] md:text-[32px]">
                      <div
                        className="w-[32px] h-[32px] text-center"
                        style={{
                          background:
                            "linear-gradient(180deg, #0B77F0 0%, #85BCF9 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          borderColor: "blue",
                          borderRadius: "8px",
                        }}
                      >
                        {" "}
                        3{" "}
                      </div>
                      <div
                        className="next rounded-[16px] p-[1px] text-white bg-blue-200"
                        style={{
                          background:
                            "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)",
                        }}
                      >
                        <div className="rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[6px] md:text-[16px] flex items-center gap-[8px] w-fit justify-center">
                          POPS
                        </div>
                      </div>
                    </div>
                    <img src={moduleMobile} className="block md:hidden" />
                    <div className="flex flex-col items-center gap-[8px] text-white font-droid text-[15px] md:text-[32px]">
                      <div
                        className="w-[32px] h-[32px] text-center"
                        style={{
                          background:
                            "linear-gradient(180deg, #0B77F0 0%, #85BCF9 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          borderColor: "blue",
                          borderRadius: "8px",
                        }}
                      >
                        {" "}
                        3{" "}
                      </div>
                      <div
                        className="next rounded-[16px] p-[1px] text-white bg-blue-200"
                        style={{
                          background:
                            "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)",
                        }}
                      >
                        <div className="rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[6px] md:text-[16px] flex items-center gap-[8px] w-fit justify-center">
                          REVEAL
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                  </div>
                </div>
                <Sidebar questions={questions} curQuestion={curQuestion + 1} />
              </div>
              <div className="flex gap-[38px] flex-col md:flex-row md:pl-[52px]">
                <Rating game={game} />
                <About game={game} />
              </div>
            </div>
          )


      )}
    </div>
  );
};

const Sidebar = ({ questions, curQuestion }: any) => {
  // console.log(questions)
  return (
    <div className="mt-[32px] md:mt-0 grid grid-cols-3 gap-y-[8px] gap-x-[8px]  md:flex flex-col gap-[8px] bg-wb-100 px-[16px] md:px-[32px] py-[20px] rounded-r-[24px] h-full  rounded-[16px]">
      {questions &&
        questions.map((_: any, i: number) => (
          <div
            key={i}
            className={` ${i + 1 == curQuestion ? "bg-blue-50" : "bg-wb-90"
              } w-[93px] md:w-fit text-center md:px-[44.5px] rounded-[16px] py-[16px] leading-[17.41px] text-[16px] text-white font-Archivo_Regular font-[900] border-[2px]  border-blue-50 border-solid`}
          >
            {i + 1}
          </div>
        ))}
    </div>
  );
};


const GameHeader = ({ questionId, updateTimer, timer, handleAnswers }: any) => {

  return (
    <div className="flex justify-between py-[18px] bg-wb-100 rounded-t-[24px]  md:rounded-tl-[24px] px-[18px]">
      <div className="flex gap-[32px] w-full md:w-fit justify-between">
        <div className="flex items-center gap-[8px]">
          <AiOutlineClockCircle color="#0B77F0" fontSize={24} />
          <div className='next rounded-[16px] p-[1px] text-white'>
            <div className='rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[20px] flex items-center gap-[8px] w-fit justify-center'>
              {

                <Timer updateTimer={updateTimer} questionId={questionId} targetDate={timer} handleAnswers={handleAnswers} />
              }
            </div>
          </div>
        </div>
        {/* <div className="flex items-center gap-[8px]">
          <IoDiamondSharp color="#0B77F0" fontSize={24} />
          <div className="next rounded-[16px] p-[1px] text-white">
            <div
              style={
                {
                  // background: "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)"
                }
              }
              className="rounded-[16px] bg-blue-80 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-[80px] justify-center"
            >
              1000
            </div>
          </div>
        </div> */}
      </div>

      {/* <div className="hidden md:flex gap-[32px]">
        <div className="flex items-center gap-[8px] text-white font-droid text-[32px]">
          <div
            style={{
              background: "linear-gradient(180deg, #0B77F0 0%, #85BCF9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {" "}
            3{" "}
          </div>
          <div
            className="next rounded-[16px] p-[1px] text-white bg-blue-200"
            style={{
              background:
                "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)",
            }}
          >
            <div className="rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-fit justify-center">
              POPS
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[8px] ">
          <img src={messagequestion} alt="" />
          <div className="next rounded-[16px] p-[2px] text-white bg-blue-200 ">
            <div
              style={{
                background:
                  "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)",
              }}
              className="rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-fit justify-center"
            >
              REVEAL
            </div>
          </div>
        </div>
      </div> */}
    </div >
  );
};

const Rating: any = ({ game }: any) => {
  const d = new Date(game?.createdAt);
  // const endDate = new Date(game?.endAt);
  // console.log(endDate)
  // console.log(game)
  return (
    <div className="py-[24px] w-full md:w-[266px] border-blue-80 border-solid border-[4px] rounded-[24px]">
      <p className="h-[86px] w-full border-b-[4px] border-b-blue-80 mb-[32px]"></p>

      <div className="">
        <div className="font-semibold text-[20px] font-Archivo_Regular text-center px-[37px] flex flex-col gap-[16px] ">

          <div>
            <p className="text-wb-40  leading-[21.76px]">Developed by</p>
            <p className="text-white  leading-[21.76px] font-[900]">
              Mental Maze
            </p>
          </div>
          <div>
            <p className="text-wb-40  leading-[21.76px]">Released:</p>
            <p className="text-white  leading-[21.76px] font-[900]">
              {d.toDateString()}
            </p>
          </div>
          <div>
            <p className="text-wb-40  leading-[21.76px]">Ends At:</p>
            <p className="text-white  leading-[21.76px] font-[900]">
              {/* {endDate.toDateString()} */}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button className="sponsorbtn ">SPONSOR GAME</button>
      </div>
    </div>
  );
};

const About = ({ game }: any) => {
  // console.log(game)

  return (
    <div className=" rounded-[24px] border-[4px] border-blue-80 w-full md:w-fit md:flex-1">
      <p className="text-[32px] font-droid text-white text-center pt-[16px] pb-[32px] border-b-[4px] border-b-blue-80">
        {game?.title}
      </p>
      <div className="px-[40px] pt-[32px]">
        <p className="text-white  text-[20px] leading-[31.76px] font-Archivo_Regular ">
          Math Puzzle: Unleash your inner whiz, where speed and accuracy meld
          together harmoniously, paving the path to triump and unlocking
          thesecrets of mathematical mastery!
        </p>
      </div>
    </div>
  );
};

export default Game;
