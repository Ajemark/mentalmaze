import { useAccount } from "wagmi";
import create from "./../../assets/create/create.svg";
import createmobile from "./../../assets/create/createmobile.svg";
import { useModalContext } from "../../context/ModalContext";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../../component/ui/Loading";
import CopyToClipboard from "react-copy-to-clipboard";
import copy from "./../../assets/userProfile/copy.svg";

const Game = ({
  title,
  image,
  isPrivate,
  accountId,
  rewardDistribution,
  id,
  address,
  endAt,
}: any) => {
  const [copyState, setCopyState] = useState("Copy");

  const currentDate = new Date();
  const futureDate = new Date(endAt);
  const differenceInMilliseconds = Number(futureDate) - Number(currentDate);
  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / (1000 * 60)
  );
  const data = window.btoa(
    JSON.stringify({
      gameId: id,
      accountId,
      endAt: differenceInMinutes,
      gameAddress: address,
      rewardDistribution,
      isPrivate,
    })
  );

  console.log(endAt, isPrivate);

  const gameUrl = "/game?data=" + data;

  return (
    <div className="  flex items-center justify-center">
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className=" p-[5px] rounded-[8px]  flex items-end w-[320px] h-[120px]"
      >
        <div className="w-fit flex items-end">
          <div
            className="w-fit h-fit p-[2px] rounded-[8px]"
            style={{
              background: "linear-gradient(#032449, #0B77F0)",
            }}
          >
            <button
              className="font-droid text-[20px] md:text-[10px] md:leading-[28.34px] text-white py-[10px] px-[16px] rounded-[5px] border-[2px]border-[#063C7A]"
              style={{
                background: "black",
                opacity: "0.8",
                backdropFilter: "blur(4px)",
              }}
            >
              {title}
            </button>
          </div>
          <div
            className="w-fit h-fit p-[2px] rounded-[8px]"
            style={{
              background: "linear-gradient(#032449, #0B77F0)",
            }}
          >
            <button
              className="font-droid text-[20px] md:text-[10px] md:leading-[28.34px] text-white py-[10px] px-[16px] rounded-[5px] border-[2px]border-[#063C7A]"
              style={{
                background: "black",
                opacity: "0.8",
                backdropFilter: "blur(4px)",
              }}
            >
              <CopyToClipboard
                text={`${location.origin}${gameUrl}`}
                onCopy={() => setCopyState("Copied")}
              >
                <div className="flex">
                  <p className="mr-2 font-droid text-white">{copyState}</p>
                  <img className="cursor-pointer" src={copy} />
                </div>
              </CopyToClipboard>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Create = () => {
  // const { chain } = useNetwork()
  const { userDetails }: any = useContext(UserContext);
  const { switchModal, switchModalcontent } = useModalContext();

  const [loading, setLoading] = useState(true);
  const [games, setGames]: any = useState();
  const { isConnected, address } = useAccount();

  const getAllGames = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    // =${ address?.toLowerCase()
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/api/game/get-product-created-by-me?pageNumber=1&pageSize=10&accountId=${
        userDetails?.id
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setGames(result.data);
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        // setMessage('An Error Occured!, Please Try Again')
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (userDetails && !userDetails.token) {
      setGames();
      setLoading(false);
      return;
    }
    getAllGames();
  }, [userDetails, address, isConnected]);

  console.log(games);
  console.log(userDetails);

  return loading ? (
    <Loading />
  ) : games?.fetchRes?.length > 0 ? (
    <div className="backdrop-blur-sm grid  grid-cols-1 md:grid-cols-3 gap-x-[45px] gap-y-[44px] py-[72px]  px-[16px] mt-[96px] md:mt-[176px]">
      <div className="relative bg-blue-100 flex flex-col items-center py-[41.8px] h-[232px] md:h-full">
        <div>
          <img src={createmobile} alt="" />
        </div>
        <div
          className="absolute bottom-[32px]  p-[1px] rounded-[8px]"
          style={{
            background: "linear-gradient( #032449, #0B77F0)",
          }}
        >
          <button
            className="font-droid text-[12px] md:text-[24px] md:leading-[28.34px] text-white py-[16px] px-[24px] rounded-[8px] border-[2px]border-[#063C7A] bg-blue-100"
            style={{
              backdropFilter: "blur(4px)",
            }}
            onClick={() => {
              if (!isConnected) {
                switchModal();
                switchModalcontent("connect");
                return;
              }
              // if (chain?.unsupported) {
              //   switchModalcontent('wrongnetwork')
              //   return
              // }
              switchModalcontent("gametype");
            }}
          >
            Create Game
          </button>
        </div>
      </div>

      {games?.fetchRes.map((gam: any, index: number) => {
        console.log(gam);
        return <Game key={index} {...gam} />;
      })}
    </div>
  ) : (
    <div className="backdrop-blur-sm relative h-full items-center justify-center flex w-full ">
      <div className=" absolute  flex flex-col  items-center justify-center   text-white mt-[56px] md:mt-[16px]">
        <div>
          <img src={create} />
        </div>
        <p className="font-Archivo_Regular text-[20px] leading-[21.76px] flex flex-col gap-2 text-center mb-[48px]">
          You know what’s better than playing games created by{" "}
          <span> others? Creating your own game for others to play.</span>
        </p>
        <button
          onClick={() => {
            if (!isConnected) {
              switchModal();
              switchModalcontent("connect");
              return;
            }
            // if (chain?.unsupported) {
            //   switchModalcontent('wrongnetwork')
            //   return
            // }
            switchModalcontent("gametype");
          }}
          className="font-droid text-[24px] leading-[28.34px] modalButton"
        >
          CREATE GAME
        </button>
      </div>
    </div>
  );
};

export default Create;
