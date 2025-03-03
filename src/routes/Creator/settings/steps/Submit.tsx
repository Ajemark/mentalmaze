import { useContext, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const Submit = () => {
  const navigate = useNavigate();
  const { questionObj, userDetails }: any = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitGameApplication = async () => {
    setLoading(true);
    setErrorMessage("");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    console.log(questionObj);
    let raw = JSON.stringify({
      title: questionObj.title,
      image: questionObj.image,
      question: questionObj.gameQuestion,
      durationInHours: questionObj.durationInHours,
      comments: questionObj.comments,
      accountId: userDetails.id,
      amountDeposited: questionObj.amountDeposited,
      rewardDistribution: questionObj.rewardDistribution,
      address: questionObj.address[0],
      description: questionObj.description,
      txHash: questionObj.txHash,
      isTestnet: questionObj.isTestnet,
      isPrivate: questionObj.isPrivate.toString(),
      accessCode: questionObj.accessCode.toString()
    });


    console.log(raw)
    setLoading(false);
    // return
    let requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/game/${questionObj.isPrivate ? "create-private" : 'create'}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.message == "success") {
          localStorage.removeItem("gameType")
          navigate("/game-Requirement");
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        setErrorMessage("An Error Occured, Try Again!");
      });
  };

  return (
    <div className="px-[16px] md:px-[48px]">
      {loading ? (
        <div className="flex items-center h-[35vh] justify-center w-full ">
          <ReactLoading type="spin" color="#0B77F0" height={60} width={37} />
        </div>
      ) : (
        <div>
          <div className="text-[16px] md:text-[20px] font-Archivo_Regular  text-white  flex flex-col gap-6 mt-[48px] font-[200]">
            <p className=" md:leading-[31.76px]"> Hi there!</p>
            <p className=" md:leading-[31.76px]">
              {" "}
              I’m sure you can’t wait to have your game published. So are we,
              congratulations creator.
            </p>

            <p className=" md:leading-[31.76px]">
              {" "}
              To be sure, your game meets all of our requirements, we will have
              the judges go through the game. Once they have verified the
              authenticity of your game guess what? It will be live.
            </p>

            <p className=" md:leading-[31.76px]">
              {" "}
              And if otherwise, you have nothing to worry about, your deposit
              will be refunded to your wallet.
            </p>

            <p className=" md:leading-[31.76px]">
              {" "}
              If you need further assistance, do not hesitate to reach us on
              discord. Our response team, will be happy to answer any question
              you might have.
            </p>

            <p className=" md:leading-[31.76px]">
              {" "}
              Thank you, Creator! Goodluck on your application.
            </p>
          </div>
          <div className=" flex flex-col gap-[24px] mt-[48px] w-full ">
            <button
              onClick={submitGameApplication}
              className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px] "
            >
              SUBMIT APPLICATION
            </button>
          </div>
          {errorMessage != "" && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Submit;
