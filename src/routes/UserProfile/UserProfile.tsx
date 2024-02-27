import { useContext, useEffect, useState } from "react";
import ranking from "./../../assets/userProfile/ranking.png";
import Stars from "./../../assets/userProfile/Stars.png";
import edit from "./../../assets/userProfile/edit.png";
import copy from "./../../assets/userProfile/copy.svg";
import Ball from "./../../assets/userProfile/Ball.png";
import GameImage from "./../../assets/userProfile/3d-maze.png";
import CreatedGame from "./../../assets/userProfile/fotor.png";
import StarsM from "./../../assets/userProfile/StarsMobile.svg";
//import medalMaster from "./../../assets/Leadership/medalstarMaster.png";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../context/ModalContext";
import { useAccount } from "wagmi";
// import { Pagination } from "../../component/ui/Pagination";
// import { MM_ADDRESS, useEthersProvider, useEthersSigner } from "../../sdk";
// import { MMContract } from "../../sdk/MMContract";

// const RANK = ({
//   position,
//   image,
//   creatorMode,
//   title,
//   claimed,
//   processedWinners,
//   playersAddress,
//   gameAcctId,
//   accountId,
//   rewardEarned,
//   id,
//   paymentStatus,
//   gameId,
//   address,
//   userDetails,
// }: any) => {
//   const [scGame, setscGame]: any = useState();
//   const signer = useEthersSigner();
//   const provider = useEthersProvider();
//   const mmContract = new MMContract(MM_ADDRESS, signer, provider);

//   const [game, setGame]: any = useState();
//   const { switchModalcontent, switchModal } = useModalContext();

//   const getSingleGame = () => {
//     let myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

//     let requestOptions: RequestInit = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     fetch(
//       `${import.meta.env.VITE_REACT_APP_BASE_URL
//       }/api/game/fetch-single?gameid=${gameId}&accountId=${gameAcctId}`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.data) {
//           setGame(result.data);
//           // setLoading(false);
//         } else {
//           console.log(result);
//           // setLoading(false);
//         }
//       })
//       .catch((error) => {
//         // setLoading(false);
//         console.log("error", error);
//       });
//   };

//   useEffect(() => {
//     if (creatorMode) return;

//     getSingleGame();
//   }, []);

//   const getJudges = async () => {
//     if (!address) return;
//     const game = await mmContract.Games(address);

//     return game;
//   };

//   const stats = getJudges();

//   useEffect(() => {
//     if (!scGame)
//       (async () => {
//         setscGame(await stats);
//       })();
//   }, [stats]);

//   if (creatorMode) {
//     // console.log(scGame);

//     return (
//       <div className="flex justify-between font-droid text-[15px] lg:text-[32px] font-normal px-[16px]  lg:px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[16px] md:py-[24px]">
//         <div className="col-span-2 flex items-center gap-[16px]   ">
//           <img
//             className="w-[48px] h-[48px] md:w-[72px] md:h-[72px] rounded-[8px]"
//             src={image}
//             alt="game image"
//           />
//           <div className="flex flex-col items-start text-white">
//             {" "}
//             <p>{title}</p>
//           </div>
//         </div>
//         <div className="text-white flex items-center">
//           {scGame && scGame[7].toString() == "0" ? (
//             "0 gate Pass"
//           ) : !processedWinners ? (
//             "Pending"
//           ) : (
//             <div className="flex text-white text-[15px] lg:text-[32px] leading-[26.11px] items-center gap-3">
//               <img className="hidden lg:flex" src={medalMaster} />
//               <button
//                 disabled={paymentStatus}
//                 onClick={async () => {
//                   localStorage.setItem(
//                     "claimGameAddr",
//                     JSON.stringify({
//                       game: id,
//                       accountId,
//                       address,
//                       gameId,
//                       playersAddress,
//                       creator: true,
//                     })
//                   );
//                   switchModal();
//                   switchModalcontent("claim");
//                 }}
//                 className="bg-blue-70 p-[5px] px-[10px] rounded-[5px] "
//                 style={{
//                   backgroundColor: `${paymentStatus ? "#010C18" : ""}`,
//                   opacity: `${paymentStatus ? "70%" : ""}`,
//                 }}
//               >
//                 {paymentStatus ? "claimed" : "Claim"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-between font-droid text-[15px] lg:text-[32px] font-normal px-[16px]  lg:px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[16px] md:py-[24px]">
//       <div className="col-span-2 flex items-center gap-[16px]   ">
//         <img
//           className="w-[48px] h-[48px] md:w-[72px] md:h-[72px] rounded-[8px]"
//           src={game?.image}
//           alt="game image"
//         />
//         <div className="flex flex-col items-start text-white">
//           {" "}
//           <p>{game?.title}</p>
//         </div>
//       </div>
//       <div className="text-white flex items-center">
//         {!processedWinners ? (
//           "Pending"
//         ) : rewardEarned != 2 ? (
//           "View Result"
//         ) : (
//           <div className="flex text-white text-[15px] lg:text-[32px] leading-[26.11px] items-center gap-3">
//             <img className="hidden lg:flex" src={medalMaster} />
//             {position?.toString()}
//             <button
//               disabled={claimed}
//               onClick={async () => {
//                 localStorage.setItem(
//                   "claimGameAddr",
//                   JSON.stringify({
//                     game: game.address,
//                     accountId,
//                     gameId,
//                     playersAddress,
//                   })
//                 );
//                 switchModal();
//                 switchModalcontent("claim");
//               }}
//               className="bg-blue-70 p-[5px] px-[10px] rounded-[5px] "
//               style={{
//                 backgroundColor: `${claimed ? "#010C18" : ""}`,
//                 opacity: `${claimed ? "70%" : ""}`,
//               }}
//             >
//               {claimed ? "claimed" : "Claim"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const RANKS = ({ userDetails, setUserData, creatorMode }: any) => {
//   // const [loading, setLoading] = useState(false)
//   const [pgNum, setPgNum]: any = useState(1);
//   const [dynamicData, setDynamicData]: any = useState();
//   const [rank, setRank]: any = useState();
//   const [loading, setLoading] = useState(true);
//   const [myGames, setMyGames]: any = useState();

//   const getRank = () => {
//     let myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

//     let requestOptions: RequestInit = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     fetch(
//       `${import.meta.env.VITE_REACT_APP_BASE_URL
//       }/api/rank?pageNumber=${pgNum}&pageSize=1005&userAddress=${userDetails.address
//       }`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.data) {
//           setRank(result.data);
//           // setLoading(false)
//         } else {
//           console.log(result);
//           // setLoading(false)
//         }
//       })
//       .catch((error) => {
//         // setLoading(false)
//         console.log("error", error);
//       });
//   };

//   useEffect(() => {
//     // setLoading(true)
//     if (!userDetails?.token) {
//       // setLoading(false)
//       return;
//     }
//     getRank();
//     getAllGames();
//   }, [userDetails]);

//   console.log(loading);

//   // console.log(pgNum);
//   const handlePagination = (info: any) => {
//     console.log(pgNum);
//     console.log(info);
//     if (info == "next" || info == "prev") {
//       if (info == "next") {
//         setPgNum(pgNum + 1);
//         return;
//       } else {
//         if (pgNum == 1) return;
//         setPgNum(pgNum - 1);
//         return;
//       }
//     }
//     setPgNum(Number(info));
//   };

//   const getAllGames = () => {
//     let myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

//     let requestOptions: RequestInit = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };
//     // =${ address?.toLowerCase()
//     fetch(
//       `${import.meta.env.VITE_REACT_APP_BASE_URL
//       }/api/game/get-product-created-by-me?pageNumber=1&pageSize=10&accountId=${userDetails?.id
//       }`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.data) {
//           setMyGames(result.data);
//           setLoading(false);
//         } else {
//           console.log(result);
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         console.log("error", error);
//         // setMessage('An Error Occured!, Please Try Again')
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     if (creatorMode) {
//       setDynamicData(myGames?.fetchRes);

//       setUserData(myGames?.fetchRes);
//       return;
//     }
//     setDynamicData(rank);
//     setUserData(rank);
//   }, [creatorMode, rank, myGames]);

//   // console.log(dynamicData);

//   return (
//     <div className="flex-1 border-blue-80 py-4 border-4 rounded-3xl userProfileStat mt-[34px]">
//       <h2 className=" font-droidbold text-[32px] text-white py-4 text-center border-b-blue-80 border-b-4">
//         RANK HISTORY
//       </h2>
//       <div className="md:px-[40px] px-[20px]">
//         {dynamicData?.map((item: any, i: number) => (
//           <div key={i}>
//             <RANK
//               creatorMode={creatorMode}
//               userDetails={userDetails}
//               {...item}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="  py-[32px] px-[24px] h-[96px] w-full flex justify-end">
//         <Pagination num={2} handler={handlePagination} />
//       </div>
//     </div>
//   );
// };

const UserProfile = () => {
  const { userDetails }: any = useContext(UserContext);
  const [creatorMode] = useState(false);
  const [userData] = useState();
  // const [userData, setUserData] = useState();

  return (
    <div className="backdrop-blur-sm w-full  relative px-[16px] md:px-[52px] mt-[96px] md:mt-[176px]">
      <ProfileHeader userDetails={userDetails} />
      <Link />
      <Stat
        creatorMode={creatorMode}
        userData={userData}
        stat={userDetails.stat}
      />
      <div className="flex mt-12 gap-[34px] flex-col md:flex-row w-full">

        <div className="w-full">
          <Level />
          <CreatedGames />
          {/* <RANKS
            setUserData={setUserData}
            creatorMode={creatorMode}
            userDetails={userDetails}
          /> */}
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
        background: 'linear-gradient(92.69deg, rgba(207, 22, 22, 0.5) 8.15%, rgba(210, 30, 30, 0.1) 99.96%)',
      }}
      className="profile border-4 border-blue-80 w-full overflow-hidden rounded-3xl bg-blue-[#010C18] flex justify-between flex-col md:flex-row p-[24px] md:p-5 gap-[24px] md:gap-0 relative">
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

// const Mode = ({ creatorMode, setCreatorMode }: any) => {
//   return (
//     <div className="flex w-36 h-[70px] md:h-24 border-blue-80 border-4 rounded-3xl items-center px-6 creatorsModebuttonbg text-white py-[10px] justify-between mt-12 relative z-[999] home">
//       <p className="font-Archivo_Regular md:text-[14px] leading-[17.41px] md:leading-normal font-normal ">
//         {creatorMode ? "CREATOR’S" : "PLAYER’S"} MODE
//       </p>
//       <button
//         className="h-full w-[15px] md:w-[28px] border-blue-80 rounded-[80px] p-2 border-2 creatorsModebutton"
//         onClick={() => {
//           setCreatorMode(!creatorMode);
//         }}
//         style={{
//           background: !creatorMode
//             ? "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)"
//             : "linear-gradient(130deg, #063C7A, rgba(6, 60, 122, 1))",
//         }}
//       >
//         <div
//           className={` w-[24px] md:w-[48px] h-full rounded-[100%] ${creatorMode ? "bg-blue-50" : "bg-black"
//             }`}
//           style={{
//             marginLeft: !creatorMode ? 0 : "35%",

//             transition: "all 0.5s",
//           }}
//         ></div>
//       </button>
//     </div>
//   );
// };

const Link = () => {
  return (
    <div
      style={{
        backgroundColor: "#010c18"
      }}
      className=" h-fit flex flex-col md:flex-row justify-between align-middle w-full md:h-fit border-blue-80 border-4 rounded-3xl items-center md:px-6 creatorsModebuttonbg text-white py-[10px] mt-12 relative z-[999] home">
      <h2
        className=" md:0 m-5 w-full md:w-fit flex flex-row justify-center align-middle font-400 font-droidbold
             text-white py-4 px-[20px] text-[25px] md:text-[25px] text-center md:border-r-blue-80 md:border-r-4 md:border-b-0 border-b-blue-80 border-b-2"
      >
        INVITE LINK
      </h2>
      <p className=" text-[14px] md:text-sm font-400 font-Archivo_Regular max-w-xs text-gray-400 ">https://mentalmaze.vercel.app/profile/gweche</p>
      <button
        style={{
          background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) 99.96%)',
        }}
        className=" bg-blue-900 opacity-90 cursor-pointer flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[9.5px] px-[12px] h-fit z-[10000000000000000]">
        <p>COPY</p>
        <img className="cursor-pointer" src={copy} />
      </button>
    </div >
  );
};

const Stat = ({ stat, creatorMode, userData }: any) => {
  console.log(stat);
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center md:align-middle w-full">
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
              {userData && userData.length}
            </h2>
            <p className="font-semibold font-Archivo_Regular text-wb-40">
              {creatorMode ? "Games Created" : "Games played"}
            </p>
          </p>
          <p className="flex flex-col items-center text-center py-4">
            <h2 className="font-400 font-Archivo-Bold text-[30px] text-white">
              4
            </h2>
            <p className="font-semibold font-Archivo_Regular text-wb-40">
              Games Created
            </p>
          </p>
          <p className="flex flex-col items-center text-center py-4">
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
          </p>
          <p className="flex flex-col items-center text-center py-4">
            <h2 className="font-400 font-Archivo-Bold text-[30px] text-white">
              0
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
              Mining: 0.0
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
            style={{
              background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) 99.96%)',
            }}
            className="cursor-pointer flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[9px] px-[10px] md:py-4 md:px-6 h-fit mt-auto z-[10000000000000000]">
            CLAIM
          </button>
        </div>
      </div>
    </div>
  );
};

const Level = () => {
  return (
    <div className="flex-1 border-blue-80 py-4 border-4 rounded-3xl userProfileStat ">
      <h2 className=" font-droidbold text-[32px] text-white py-4 text-center border-b-blue-80 border-b-4">
        ACHIEVEMENTS
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center  p-5">


        <div className="flex flex-row justify-between mb-3">
          <div
            className=" border-blue-80 border-4 rounded-3xl w-72 h-64 relative flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center z-0 rounded-3xl"
              style={{ backgroundImage: `url(${CreatedGame})` }}
            ></div>
            <div className="flex flex-row justify-between align-middle items-center font-bold text-white text-2xl  w-[280px] p-5 z-50 bg-blue-800"
              style={{
                // background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) )',
                backgroundColor: '#021b38',
                marginTop: "160px",
                borderRadius: "0px 0px 17px 17px"

              }}
            >
              <div className="flex flex-col align-middle justify-between items-center font-black">
                <p className="z-50 text-base text-gray-400">Math Puzzle</p>
                <p className="text-gray-400 text-base flex flex-row"><p className="font-400 text-white mx-2">10th </p> Position</p>
              </div>
              {/* <button
                style={{
                  background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) 99.96%)',
                }}
                className="cursor-pointer text-sm flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]">
                CLAIM
              </button> */}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between mb-3">
          <div
            className=" border-blue-80 border-4 rounded-3xl w-72 h-64 relative flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center z-0 rounded-3xl"
              style={{ backgroundImage: `url(${GameImage})` }}
            ></div>
            <div className="flex flex-row justify-between align-middle items-center font-bold text-white text-2xl  w-[280px] p-5 z-50 bg-blue-800"
              style={{
                // background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) )',
                backgroundColor: '#021b38',
                marginTop: "155px",
                borderRadius: "0px 0px 17px 17px"

              }}
            >
              <div className="flex flex-col align-middle justify-between items-center font-black">
                <p className="z-50 text-base text-gray-400">Math Puzzle</p>
                <p className="text-gray-400 text-base flex flex-row"><p className="font-400 text-white mx-2">4th </p> Position</p>
              </div>
              <button
                style={{
                  background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) 99.96%)',
                }}
                className="cursor-pointer text-sm flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]">
                CLAIM
              </button>
            </div>
          </div>
        </div>

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

        <div className="flex flex-row justify-between mb-3">
          <div
            className=" border-blue-80 border-4 rounded-3xl w-72 h-64 relative flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center z-0 rounded-3xl"
              style={{ backgroundImage: `url(${GameImage})` }}
            ></div>
            <div className="flex flex-row justify-between align-middle items-center font-bold text-white text-2xl  w-[280px] p-5 z-50 bg-blue-800"
              style={{
                // background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) )',
                backgroundColor: '#021b38',
                marginTop: "155px",
                borderRadius: "0px 0px 17px 17px"

              }}
            >
              <div className="flex flex-col align-middle justify-between items-center font-black">
                <p className="z-50 text-base text-gray-400">Math Puzzle</p>
                <p className="text-gray-400 text-base flex flex-row"><p className="font-400 text-white mx-2">4th </p> Position</p>
              </div>
              <button
                style={{
                  background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) 99.96%)',
                }}
                className="cursor-pointer text-sm flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]">
                CLAIM
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


const CreatedGames = () => {
  return (
    <div className="flex-1 mt-12 border-blue-80 py-4 border-4 rounded-3xl userProfileStat ">
      <h2 className=" font-droidbold text-[32px] text-white py-4 text-center border-b-blue-80 border-b-4">
        GAMES CREATED
      </h2>
      <div className="flex flex-col md:flex-row justify-between p-5">
        <div className="flex flex-row justify-between mb-3">
          <div
            className=" border-blue-80 border-4 rounded-3xl w-72 h-64 relative flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center z-0 rounded-3xl"
              style={{ backgroundImage: `url(${CreatedGame})` }}
            ></div>
            <div className="flex flex-row justify-between align-middle items-center font-bold text-white text-2xl  w-[280px] p-5 z-50 bg-blue-800"
              style={{
                // background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) )',
                backgroundColor: '#021b38',
                marginTop: "155px",
                borderRadius: "0px 0px 17px 17px"

              }}
            >
              <div className="flex flex-col align-middle justify-between items-center font-black">
                <p className="z-50 text-base text-gray-400">Math Puzzle</p>
                <p className="text-gray-400 text-base flex flex-row"><p className="font-400 text-white mx-2">250K </p> Players</p>
              </div>
              <button
                style={{
                  background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) 99.96%)',
                }}
                className="cursor-pointer text-sm flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]">
                CLAIM
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mb-3">
          <div
            className=" border-blue-80 border-4 rounded-3xl w-72 h-64 relative flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center z-0 rounded-3xl"
              style={{ backgroundImage: `url(${CreatedGame})` }}
            ></div>
            <div className="flex flex-row justify-between align-middle items-center font-bold text-white text-2xl  w-[280px] p-5 z-50 bg-blue-800"
              style={{
                // background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) )',
                backgroundColor: '#021b38',
                marginTop: "155px",
                borderRadius: "0px 0px 17px 17px"

              }}
            >
              <div className="flex flex-col align-middle justify-between items-center font-black">
                <p className="z-50 text-base text-gray-400">Math Puzzle</p>
                <p className="text-gray-400 text-base flex flex-row"><p className="font-400 text-white mx-2">250K </p> Players</p>
              </div>
              <button
                style={{
                  background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) 99.96%)',
                }}
                className="cursor-pointer text-sm flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]">
                CLAIM
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mb-3">
          <div
            className=" border-blue-80 border-4 rounded-3xl w-72 h-64 relative flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center z-0 rounded-3xl"
              style={{ backgroundImage: `url(${CreatedGame})` }}
            ></div>
            <div className="flex flex-row justify-between align-middle items-center font-bold text-white text-2xl  w-[280px] p-5 z-50 bg-blue-800"
              style={{
                // background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) )',
                backgroundColor: '#021b38',
                marginTop: "155px",
                borderRadius: "0px 0px 17px 17px"

              }}
            >
              <div className="flex flex-col align-middle justify-between items-center font-black">
                <p className="z-50 text-base text-gray-400">Math Puzzle</p>
                <p className="text-gray-400 text-base flex flex-row"><p className="font-400 text-white mx-2">250K </p> Players</p>
              </div>
              <button
                style={{
                  background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) 99.96%)',
                }}
                className="cursor-pointer text-sm flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]">
                CLAIM
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mb-3">
          <div
            className=" border-blue-80 border-4 rounded-3xl w-72 h-64 relative flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center z-0 rounded-3xl"
              style={{ backgroundImage: `url(${CreatedGame})` }}
            ></div>
            <div className="flex flex-row justify-between align-middle items-center font-bold text-white text-2xl  w-[280px] p-5 z-50 bg-blue-800"
              style={{
                // background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) )',
                backgroundColor: '#021b38',
                marginTop: "155px",
                borderRadius: "0px 0px 17px 17px"

              }}
            >
              <div className="flex flex-col align-middle justify-between items-center font-black">
                <p className="z-50 text-base text-gray-400">Math Puzzle</p>
                <p className="text-gray-400 text-base flex flex-row"><p className="font-400 text-white mx-2">250K </p> Players</p>
              </div>
              <button
                style={{
                  background: 'linear-gradient(92.69deg, rgba(3, 36, 73, 0.45) 8.15%, rgba(11, 119, 240, 0.1) 99.96%)',
                }}
                className="cursor-pointer text-sm flex gap-4 text-white font-Archivo-Bold border-blue-50 border rounded-xl py-[8px] px-[8px] md:py-4 md:px-4 h-fit mt-auto z-[10000000000000000]">
                CLAIM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
