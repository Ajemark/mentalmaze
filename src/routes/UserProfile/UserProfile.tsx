import { useContext, useEffect, useState } from "react";
import ranking from "./../../assets/userProfile/ranking.png";
import Stars from "./../../assets/userProfile/Stars.png";
import edit from "./../../assets/userProfile/edit.png";
import copy from "./../../assets/userProfile/copy.svg";
import Ball from "./../../assets/userProfile/Ball.png";
import StarsM from "./../../assets/userProfile/StarsMobile.svg";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../context/ModalContext";
import { useAccount } from "wagmi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  MINER_ADDRESS,
  MM_ADDRESS,
  useEthersProvider,
  useEthersSigner,
} from "../../sdk";
import { MMContract, MinerContract } from "../../sdk/MMContract";

const UserProfile = () => {
  const { userDetails }: any = useContext(UserContext);

  const [myGames, setMyGames]: any = useState();
  const [ranks, setRanks]: any = useState();

  const getRank = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/api/rank?pageNumber=${1}&pageSize=1005&userAddress=${
        userDetails.address
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setRanks(result.data);
        } else {
          console.log(result);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getAllGames = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/api/game/get-product-created-by-me?pageNumber=1&pageSize=10000&accountId=${
        userDetails?.id
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setMyGames(result.data.fetchRes);
        } else {
          console.log(result);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (!userDetails?.token) {
      return;
    }
    getRank();
    getAllGames();
  }, [userDetails]);

  return (
    <div className="backdrop-blur-sm w-full  relative px-[16px] md:px-[52px] mt-[96px] md:mt-[176px]">
      <ProfileHeader userDetails={userDetails} />
      <Link userDetails={userDetails} />
      <Stat userData={{ ranks, myGames }} userDetails={userDetails} />
      <div className="flex mt-12 gap-[34px] flex-col md:flex-row w-full">
        <div className="w-full">
          <Level userDetails={userDetails} ranks={ranks} />
          <CreatedGames userDetails={userDetails} myGames={myGames} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

const ProfileHeader = ({ userDetails }: any) => {
  const { switchModal, switchModalcontent } = useModalContext();
  // const[editUser,setEditUser]=useState(false)
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  // const [creatorMode, setCreatorMode] = useState(false);

  useEffect(() => {
    if (!userDetails.address || !isConnected) {
      navigate("/");
    }
  }, [isConnected]);

  return (
    <div
      style={{
        background:
          "linear-gradient(92.69deg, rgba(207, 22, 22, 0.5) 8.15%, rgba(210, 30, 30, 0.1) 99.96%)",
      }}
      className="profile border-4 border-blue-80 w-full overflow-hidden rounded-3xl bg-blue-[#010C18] flex justify-between flex-col md:flex-row p-[24px] md:p-5 gap-[24px] md:gap-0 relative"
    >
      <div className="absolute h-full w-full ">
        <img src={Stars} className="w-full h-full blur-sm hidden md:block" />
        <img src={StarsM} className="w-full h-full blur-sm block md:hidden" />
      </div>
      <div className="flex items-center  gap-[16px] md:gap-[50px] relative z-10">
        <div className="rounded-[8px] md:rounded-2xl border-blue-90 border md:border-4">
          <div className="text-headerbg text-xl font-bold justify-center flex items-center bg-white rounded-[8px] w-[96px] h-[96px] md:w-[150px] md:h-[150px] overflow-hidden">
            {userDetails.profileImage?.length < 3 ? (
              <p>{userDetails.profileImage.toUpperCase()}</p>
            ) : (
              <img
                src={
                  userDetails.profileImage &&
                  userDetails.profileImage.includes("http")
                    ? userDetails.profileImage
                    : "https://mentalmaze-game.infura-ipfs.io/ipfs/" +
                      userDetails.profileImage
                }
                alt=""
                className="w-full h-full rounded-xl"
              />
            )}
          </div>
        </div>
        <div className="font-Archivo_Regular text-sm font-normal flex flex-col gap-4 items-center text-white justify-between">
          <p className="md:text-[32px] text-red-400 font-normal font-droid">
            {userDetails?.username}
          </p>

          <div className="text-wb-40 flex gap-2 items-center text-[11px] md:text-base">
            <img src={ranking} alt="" />
            Mode: <span className="text-white">{userDetails?.role}</span>
          </div>

          <button
            className="cursor-pointer flex gap-4 text-white font-Archivo_Regular border-blue-50 border-2 rounded-2xl py-[9.5px] px-[12px] md:py-4 md:px-6 h-fit mt-5 z-[10000000000000000]"
            onClick={() => {
              switchModal();
              switchModalcontent("editProfile");
            }}
          >
            <img className="cursor-pointer" src={edit} />
            <p>EDIT PROFILE</p>
          </button>

          {/* {editUser && } */}
        </div>
      </div>
      {/* <Mode creatorMode={creatorMode} setCreatorMode={setCreatorMode} /> */}
    </div>
  );
};

const Link = ({ userDetails }: any) => {
  const [copyState, setCopyState] = useState("Copy");
  return (
    <div
      style={{
        backgroundColor: "#010c18",
      }}
      className=" h-fit flex flex-col md:flex-row justify-between align-middle w-full md:h-fit border-blue-80 border-4 rounded-3xl items-center md:pr-6 creatorsModebuttonbg text-white py-[10px] mt-12 relative z-[999] home"
    >
      <h2
        className=" md:0 m-5 w-full md:w-fit flex flex-row justify-center align-middle font-400 font-droidbold
             text-white py-4 px-[14px] text-[25px] md:text-[25px] text-center md:border-r-blue-80 md:border-r-4 md:border-b-0 border-b-blue-80 border-b-2"
      >
        INVITE LINK
      </h2>
      <p className=" text-[14px] md:text-sm font-400 font-Archivo_Regular max-w-xs text-gray-400 ">{`${location.origin}?ref=${userDetails?.username}`}</p>
      <button
        style={{
          background:
            "linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) 99.96%)",
        }}
        className=" bg-blue-900 opacity-90 cursor-pointer flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[9.5px] px-[12px] h-fit z-[10000000000000000]"
      >
        <CopyToClipboard
          text={`${location.origin}?ref=${userDetails?.username}`}
          onCopy={() => setCopyState("Copied")}
        >
          <div className="flex">
            <p className="mr-2">{copyState}</p>
            <img className="cursor-pointer" src={copy} />
          </div>
        </CopyToClipboard>
      </button>
    </div>
  );
};

const Stat = ({ userData, userDetails }: any) => {
  const [data, setData]: any = useState();
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const mmContract = new MinerContract(MINER_ADDRESS, signer, provider);

  // useEffect(() => {
  //   if (!userDetails.address) {
  //     return;
  //   }
  //   (async () => {
  //     let d = await getSCGames();
  //     console.log(d);
  //   })();
  // }, [userDetails]);

  const getSCGames = async () => {
    const invites = await mmContract.getInvitesCount(userDetails.address);
    const gamesCreated = await mmContract.getGamesCreated(userDetails.address);
    const gamesPlayed = await mmContract.getGamesPlayed(userDetails.address);
    const calculateRewards = await mmContract.getCalculateRewards(
      userDetails.address
    );
    const claimableAmount = await mmContract.getClaimableAmount(
      userDetails.address
    );

    return {
      invites,
      gamesCreated,
      gamesPlayed,
      claimableAmount,
      calculateRewards,
    };
  };

  const stats = getSCGames();

  useEffect(() => {
    if (!data)
      (async () => {
        setData(await stats);
      })();
  }, [stats]);

  console.log(data);

  console.log(data?.calculateRewards);
  console.log(data?.claimableAmount);
  console.log(data?.calculateRewards * 0.8 < data?.claimableAmount);

  return (
    <div className="flex flex-col 2xl:flex-row md:justify-between md:items-center md:align-middle w-full">
      <div className="w-full border-4 rounded-3xl mt-12  py-4 md:mx-2 flex flex-col md:flex-row gap-8 border-blue-80 userProfileStat h-fit">
        <h2
          className=" flex flex-row justify-center items-center align-middle font-400 font-droidbold
             text-white px-[20px] text-[25px] text-center md:border-r-blue-80 md:border-r-4 md:border-b-0 border-b-blue-80 border-b-2"
        >
          STATS
        </h2>
        <div className="flex flex-col md:flex-row px-[30px] gap-8">
          <p className="flex flex-col items-center text-center  py-4">
            <h2 className="font-400 font-Archivo-Bold text-[30px] text-white">
              {data?.gamesPlayed}
            </h2>
            <p className="font-semibold font-Archivo_Regular text-wb-40">
              {"Games played"}
            </p>
          </p>
          <p className="flex flex-col items-center text-center py-4">
            <h2 className="font-400 font-Archivo-Bold text-[30px] text-white">
              {data?.gamesCreated}
            </h2>
            <p className="font-semibold font-Archivo_Regular text-wb-40">
              Games Created
            </p>
          </p>
          {/* <p className="flex flex-col items-center text-center py-4">
            <h2 className="font-400 font-Archivo-Bold text-[30px] text-white">
              4
            </h2>
            <p className="font-semibold font-Archivo_Regular text-wb-40">
              Live Games
            </p>
          </p>
          <p className="flex flex-col items-center text-center py-4">
            <h2 className="font-400 font-Archivo-Bold text-[30px] text-white">
              4
            </h2>
            <p className="font-semibold font-Archivo_Regular text-wb-40">
              Pending Games
            </p>
          </p> */}
          <p className="flex flex-col items-center text-center py-4">
            <h2 className="font-400 font-Archivo-Bold text-[30px] text-white">
              {data?.invites}
            </h2>
            <p className="font-semibold font-Archivo_Regular text-wb-40">
              No of Invites
            </p>
          </p>
        </div>
      </div>

      <div className="w-full border-4 rounded-3xl mt-12  py-4 md:mx-2 flex flex-col md:flex-row justify-between align-middle items-center gap-8 border-blue-80 userProfileStat md:h-40">
        <h2
          className="w-full md:w-auto font-400 font-droidbold
             text-white py-4 px-[20px] text-[25px] text-center md:border-r-blue-80 md:border-r-4 md:border-b-0 border-b-blue-80 border-b-2"
        >
          mzr
        </h2>
        <div className=" w-full flex flex-col md:flex-row justify-between align-middle items-center px-[30px] gap-8">
          <div className="flex flex-col justify-between align-middle items-center text-center">
            <h2 className="font-Archivo_Regular text-[18px] text-gray-400">
              Mining: {data?.claimableAmount}
            </h2>
            <div className="w-full px-[40px]">
              <div className="w-full h-2 level mt-3  rounded-xl flex">
                <div className="h-full w-full bg-blue-50 rounded-xl"></div>
                <div className="h-full flex-1 flex items-center relative right-1">
                  <img src={Ball} />
                </div>
              </div>
            </div>
          </div>
          <button
            disabled={data?.calculateRewards * 0.8 <= data?.claimableAmount}
            onClick={async () => {
              await mmContract.claimRewards();
            }}
            style={{
              backgroundColor: `${
                data?.calculateRewards * 0.8 <= data?.claimableAmount
                  ? "#010C18"
                  : ""
              }`,
              opacity: `${
                data?.calculateRewards * 0.8 <= data?.claimableAmount
                  ? "70%"
                  : ""
              }`,
            }}
            className="  flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[9px] px-[10px] md:py-4 md:px-6 h-fit mt-auto z-[10000000000000000]"
          >
            CLAIM
          </button>
        </div>
      </div>
    </div>
  );
};

const Level = ({ userDetails, ranks }: any) => {
  const [games, setGames]: any = useState();
  const { switchModalcontent, switchModal } = useModalContext();

  const getSingleGame = async (gameId: any, gameAcctId: any) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      let res = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/api/game/fetch-single?gameid=${gameId}&accountId=${gameAcctId}`,
        requestOptions
      );
      return res.json();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!ranks) return;
    (async () => {
      const d = Promise.all(
        ranks.map(async (rank: any) => {
          let res = getSingleGame(rank.gameId, rank.gameAcctId);
          return (await res).data;
        })
      );
      setGames(await d);
    })();
  }, [ranks]);

  return (
    <div className="flex-1 border-blue-80 py-4 border-4 rounded-3xl userProfileStat ">
      <h2 className=" font-droidbold text-[32px] text-white py-4 text-center border-b-blue-80 border-b-4">
        ACHIEVEMENTS
      </h2>
      <div className="2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 grid  p-5">
        {ranks &&
          games &&
          ranks.map((rank: any, i: number) => {
            const game = games?.filter(
              (game: any) => game?.id == rank?.gameId
            )[0];

            return (
              <div key={i} className="flex flex-row justify-between mb-3">
                <div
                  style={{
                    backgroundImage: `url(${game.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  className=" border-blue-80 border-4 rounded-3xl    flex items-center justify-center"
                >
                  <div
                    className="flex flex-row justify-between align-middle items-center font-bold text-white text-2xl  w-[300px] lg:w-[380px]   p-5 z-50 bg-blue-800"
                    style={{
                      // background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) )',
                      backgroundColor: "#021b38",
                      marginTop: "155px",
                      borderRadius: "0px 0px 17px 17px",
                    }}
                  >
                    <div className=" w-[60%]  justify-between items-center font-black">
                      <p className="z-50 truncate text-base text-gray-400">
                        {game?.title}
                      </p>
                      <p className="text-gray-400 text-base flex flex-row">
                        <p className="font-400 text-white mr-2">
                          {rank?.position}th{" "}
                        </p>
                        Position
                      </p>
                    </div>

                    {!rank.processedWinners ? (
                      <button
                        disabled={rank.claimed}
                        className="cursor-pointer text-sm flex gap-4 text-white font-Archivo-Bold uppercase border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]"
                        style={{
                          backgroundColor: `${rank.claimed ? "#010C18" : ""}`,
                          opacity: `${rank.claimed ? "70%" : ""}`,
                        }}
                      >
                        Pending
                      </button>
                    ) : rank.rewardEarned != 2 ? (
                      <button
                        disabled={true}
                        className="cursor-pointer text-sm flex gap-4 text-white font-Archivo-Bold uppercase border-blue-50 border rounded-xl py-[5px] px-[5px] md:py-3 md:px-4 h-fit mt-auto z-[10000000000000000]"
                        style={{
                          backgroundColor: `${rank.claimed ? "#010C18" : ""}`,
                          opacity: `${rank.claimed ? "70%" : ""}`,
                        }}
                      >
                        View Result
                      </button>
                    ) : (
                      <button
                        disabled={rank.claimed}
                        onClick={async () => {
                          localStorage.setItem(
                            "claimGameAddr",
                            JSON.stringify({
                              game: game.address,
                              accountId: rank.accountId,
                              gameId: rank.gameAcctId,
                              playersAddress: rank.playersAddress,
                            })
                          );
                          switchModal();
                          switchModalcontent("claim");
                        }}
                        className="cursor-pointer text-sm flex gap-4 text-white font-Archivo-Bold uppercase border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]"
                        style={{
                          backgroundColor: `${rank.claimed ? "#010C18" : ""}`,
                          opacity: `${rank.claimed ? "70%" : ""}`,
                        }}
                      >
                        {rank.claimed ? "claimed" : "Claim"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        <div className=" border-blue-80 border-4 rounded-3xl  w-72 h-64 flex flex-col justify-center mb-3">
          <div className="flex  flex-col justify-between px-[40px] mb-10">
            <div className="flex text-wb-40 text-xl gap-2 items-center">
              <div>
                <img src={ranking} />
              </div>
              <p className="font-Archivo_Regular">Level 1</p>
            </div>
            <div className="flex text-white font-Archivo_Regular text-xl">
              100/400 MP
            </div>
          </div>
          <div className="w-full px-[40px]">
            <div className="w-full h-2 level mt-3  rounded-xl flex">
              <div className="h-full w-1/4 bg-blue-50 rounded-xl"></div>
              <div className="h-full flex-1 flex items-center relative right-1">
                <img src={Ball} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreatedGames = ({ userDetails, myGames }: any) => {
  const [loading, setLoading] = useState(true);
  const { switchModalcontent, switchModal } = useModalContext();

  const [scGames, setscGames]: any = useState();
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const mmContract = new MMContract(MM_ADDRESS, signer, provider);

  useEffect(() => {
    if (!myGames) {
      return;
      console.log(loading);
    }
    getSCGames();
  }, [myGames]);

  const getSCGames = async () => {
    const d = Promise.all(
      myGames.map(async (myGame: any) => {
        return {
          game: await mmContract.Games(myGame.address),
          address: myGame.address,
        };
      })
    );

    setscGames(await d);
    setLoading(false);
  };

  return (
    <div className="flex-1 mt-12 border-blue-80 py-4 border-4 rounded-3xl userProfileStat ">
      <h2 className=" font-droidbold text-[32px] text-white py-4 text-center border-b-blue-80 border-b-4">
        GAMES CREATED
      </h2>
      <div className="2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 grid  p-5">
        {myGames &&
          myGames?.map((myGame: any, i: any) => {
            const scGame = scGames?.filter(
              (scGame: any) => scGame.address == myGame.address
            )[0];

            return (
              <div key={i} className="flex flex-row justify-between mb-3">
                <div
                  style={{
                    backgroundImage: `url(${myGame?.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  className=" border-blue-80 border-4 rounded-3xl     flex items-center justify-center"
                >
                  <div
                    className="flex flex-row justify-between align-middle items-center font-bold text-white text-2xl w-[300px] lg:w-[380px]  p-5 z-50 bg-blue-800  "
                    style={{
                      backgroundColor: "#021b38",
                      marginTop: "155px",
                      borderRadius: "0px 0px 17px 17px",
                    }}
                  >
                    <div className="flex flex-col w-[60%]  font-black">
                      <p className="z-50 truncate text-base   text-left text-gray-400">
                        {myGame.title}
                      </p>
                      <p className="text-gray-400 text-left text-base flex flex-row">
                        <p className="font-400 text-white  mr-2">
                          {myGame.finishers.length}
                        </p>
                        Players
                      </p>
                    </div>

                    <div className="text-white flex items-center">
                      {scGame?.game && scGame?.game[7].toString() == "0" ? (
                        <button
                          disabled={true}
                          className="  text-sm flex  text-white font-Archivo-Bold uppercase border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]"
                          style={{
                            backgroundColor: `${
                              myGame.paymentStatus ? "#010C18" : ""
                            }`,
                            opacity: ` "70%`,
                          }}
                        >
                          0 gate Pass
                        </button>
                      ) : !myGame.processedWinners ? (
                        "Pending"
                      ) : (
                        <div className="flex text-white text-[15px] lg:text-[32px] leading-[26.11px] items-center gap-3">
                          <button
                            disabled={myGame.paymentStatus}
                            onClick={async () => {
                              localStorage.setItem(
                                "claimGameAddr",
                                JSON.stringify({
                                  game: myGame.id,
                                  accountId: myGame.accountId,
                                  address: myGame.address,
                                  gameId: myGame.gameId,
                                  playersAddress: userDetails.address,
                                  creator: true,
                                })
                              );
                              switchModal();
                              switchModalcontent("claim");
                            }}
                            className="cursor-pointer text-sm flex  text-white font-Archivo-Bold uppercase border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]"
                            style={{
                              backgroundColor: `${
                                myGame.paymentStatus ? "#010C18" : ""
                              }`,
                              opacity: `${myGame.paymentStatus ? "70%" : ""}`,
                            }}
                          >
                            {myGame.paymentStatus ? "claimed" : "Claim"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
