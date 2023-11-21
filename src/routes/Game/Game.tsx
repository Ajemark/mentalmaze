import { AiOutlineClockCircle } from "react-icons/ai";
// import { IoDiamondSharp } from "react-icons/io5";
// import messagequestion from "./../../assets/play/messagequestion.svg";
// import moduleMobile from "./../../assets/play/moduleMobile.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../../component/ui/Loading";
import { useModalContext } from "../../context/ModalContext";
import { io as webSocketClient } from "socket.io-client";

const webSocketUrl = import.meta.env.VITE_REACT_APP_BASE_URL
const socket = webSocketClient(webSocketUrl);

const Game = () => {
  const [loading, setLoading] = useState(false)
  const [game, setGame]: any = useState()
  const [curQuestion, setCurQuestion]: any = useState(0)
  const [selected, setSelected]: any = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const [answers, setAnswers]: any = useState([])
  const [playerData, setPlayerData]: any = useState()
  const [localData, setLocalData]: any = useState()
  const [again, setagain] = useState(0)
  const [creating, setcreating] = useState(false)
  const [timeRemaing, setTimeRemaing] = useState<any>();

  const { switchModalcontent, switchModal } = useModalContext();
  // console.log("_timeRemaining---", timeRemaing);

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
        if (result.data) {
          setGame(result.data);
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  useEffect(() => {
    // use to end game when player decide to force close game
    // socket.emit("force_end_timer", { playersAddress: userDetails.address });
    socket.emit("start_timer", { playersAddress: userDetails.address });
    socket.on("updateTimer", (_timeRemaining) => {
      setTimeRemaing(() => _timeRemaining);
      console.log("yeah");
    });

    socket.on("updateTimer", (_timeRemaining) => {
      setTimeRemaing(() => _timeRemaining);
      console.log("yeah");
    });

    socket.on("timerEnd", () => {

    });
  }, []);

  const getPlayerDetails = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const data = JSON.parse(window.atob(location.search.split('?data=')[1]))
    if (!data) {
      setagain(prev => prev + 1)
      return
    }

    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/player/getPlayerDetails?gameId=${data.gameId}&playersAddress=${userDetails.address}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.gamePlayerDetails?.length > 0 || result.gamePlayerDetails.id) {
          setPlayerData(result.gamePlayerDetails[0])

          getSingleGame()
          setLoading(false)
        } else {

          if (creating) return
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

    setcreating(true)
    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/player/createGamePlayer`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result, '                109')
        console.log(result.gamePlayerData?.length)
        if (result.gamePlayerData?.length > 0 || result.gamePlayerData.id) {
          getSingleGame()
          setPlayerData(result.gamePlayerData)
          setLoading(false)
        }
        else {
          console.log(result)
          setLoading(false)
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  useEffect(() => {
    setLoading(true)
    if (!userDetails?.token) {
      setLoading(false)
      return
    }
    getPlayerDetails()
  }, [userDetails, again])


  useEffect(() => {
    const localData: any = localStorage.getItem(`GameInfo-${game?.id}`)
    if (localData) {
      setLocalData(JSON.parse(localData))
      setCurQuestion(JSON.parse(localData).dataToSubmit.arrayofQuestion_answer.length)
    }
  }, [game])


  const handleAnswers = (clicked = false) => {
    setErrorMessage("");
    if (!selected && clicked) {
      setErrorMessage("Please Select An Option");
      return;
    }

    if (curQuestion + 1 >= game?.question.length) {
      const d = {
        questionId: game?.question[curQuestion].id,
        questionAnswer: selected ?? "null",
      };
      const data = [...answers];
      data.push(d);

      setAnswers(data);

      const dataToSubmit = {
        gameId: game.id,
        playerAddress: userDetails.address,
        level: game?.question[curQuestion].difficultyLevel,
        playerId: playerData.id,
        arrayofQuestion_answer: data,
      };

      localStorage.setItem(`GameInfo-${game.id}`, JSON.stringify({
        dataToSubmit, game: {
          id: game.id,
          title: game.title
        }
      }))
      localStorage.setItem("gameId", game.id)


      socket.emit("force_end_timer", { playersAddress: userDetails.address });
      switchModal();
      switchModalcontent("hurray");
      return;
    }

    const d = {
      questionId: game?.question[curQuestion].id,
      questionAnswer: selected,
    };
    const data = [...answers];
    data.push(d);

    setAnswers(data);
    console.log(game);
    console.log(playerData);

    const dataToSubmit = {
      gameId: game.id,
      playerAddress: userDetails.address,
      level: game?.question[curQuestion].difficultyLevel,
      playerId: playerData.id,
      arrayofQuestion_answer: data,
    };

    localStorage.setItem(`GameInfo-${game.id}`, JSON.stringify({
      dataToSubmit, game: {
        id: game.id,
        title: game.title
      }
    }))

    setCurQuestion((prev: number) => prev + 1);
    setSelected("");
  };

  console.log(localData)

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative  md:mr-[52px] h-fit rounded-[24px] mt-[96px] md:mt-[130px] px-[20px] ">
          <div className="bg-black md:pl-[52px] mb-[40px] rounded-t-[24px] md:rounded-r-[24px] flex flex-col md:flex-row">
            <div className="border-[4px] border-blue-80 border-solid rounded-[24px] flex-1 ">
              <GameHeader
                handleAnswers={handleAnswers}
                timeRemaing={timeRemaing}
              />
              <div className="flex flex-col items-center gap-[36px] py-[67px]">
                {game && Object.keys(game).length > 1 && (
                  <div className="w-full px-[16px] md:px-[52px] ">
                    <h1 className="font-droid text-center text-white text-[16px] md:text-[32px] text-left w-full  ">
                      {game?.question[curQuestion].title}
                    </h1>
                    <div className="mt-[32px] flex flex-col items-center ">
                      {
                        game?.question[curQuestion].image.includes("http") ? <img
                          src={game?.question[curQuestion].image}
                        /> :
                          <p className='font-droid text-center text-white text-center text-[16px] md:text-[22px] text-left w-full mt-[40px]'>{game?.question[curQuestion].image}</p>
                      }

                    </div>
                    <div className="flex w-full mt-10 justify-center gap-[16px]">
                      {game?.question[curQuestion].options.map(
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
            <Sidebar game={game} curQuestion={curQuestion + 1} />
          </div>
          <div className="flex gap-[38px] flex-col md:flex-row md:pl-[52px]">
            <Rating game={game} />
            <About game={game} />
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ game, curQuestion }: any) => {
  return (
    <div className="mt-[32px] md:mt-0 grid grid-cols-3 gap-y-[8px] gap-x-[8px]  md:flex flex-col gap-[8px] bg-wb-100 px-[16px] md:px-[32px] py-[20px] rounded-r-[24px] h-full  rounded-[16px]">
      {game &&
        game?.question.map((_: any, i: number) => (
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


const GameHeader = ({ timeRemaing }: any) => {

  return (
    <div className="flex justify-between py-[18px] bg-wb-100 rounded-t-[24px]  md:rounded-tl-[24px] px-[18px]">
      <div className="flex gap-[32px] w-full md:w-fit justify-between">
        <div className="flex items-center gap-[8px]">
          <AiOutlineClockCircle color="#0B77F0" fontSize={24} />
          <div className='next rounded-[16px] p-[1px] text-white'>
            <div className='rounded-[16px] bg-blue-100 p-[8px] font-droid leading-normal text-[16px] flex items-center gap-[8px] w-fit justify-center'>
              <p>
                {(timeRemaing / 1000) ?? 0}
              </p>
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
  const endDate = new Date(game?.endAt);
  console.log(endDate)
  console.log(game)
  return (
    <div className="py-[24px] w-full md:w-[266px] border-blue-80 border-solid border-[4px] rounded-[24px]">
      <p className="h-[86px] w-full border-b-[4px] border-b-blue-80 mb-[32px]"></p>

      <div className="">
        <div className="font-semibold text-[20px] font-Archivo_Regular text-center px-[37px] flex flex-col gap-[16px] ">

          <p>
            <p className="text-wb-40  leading-[21.76px]">Developed by</p>
            <p className="text-white  leading-[21.76px] font-[900]">
              Mental Maze
            </p>
          </p>
          <p>
            <p className="text-wb-40  leading-[21.76px]">Released:</p>
            <p className="text-white  leading-[21.76px] font-[900]">
              {d.toDateString()}
            </p>
          </p>
          <p>
            <p className="text-wb-40  leading-[21.76px]">Ends At:</p>
            <p className="text-white  leading-[21.76px] font-[900]">
              {/* {endDate.toDateString()} */}
            </p>
          </p>
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
