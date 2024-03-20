"use client";
import { useNavigate } from "react-router-dom";
import Close from "./../../assets/Close.png";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Overlay from "../../component/ui/Overlay";

const AccessID = ({ setAccessApproved, setLoading, data }: any) => {
  const [accessCode, setAccessCode]: any = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { userDetails }: any = useContext(UserContext);

  const submitAccessCode = async () => {
    if (!accessCode || accessCode == "") {
      setErrorMessage("Please Enter Access Code");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

    let raw = JSON.stringify({
      accessCode: accessCode,
      gameId: data.gameId,
      accountId: data.accountId,
    });

    let requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/game/validate-pgc`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result?.message !== "success") {
          setErrorMessage(result?.message);
        } else {
          if (result.data) {
            setAccessApproved(true);
            return;
          }
          setErrorMessage("Wrong Access Code Entered, Please Try Again");
        }
      })
      .catch((_) => {
        setErrorMessage("An Error Occured, Please Try Again Later");
      });
  };

  return (
    <div>
      <Overlay />
      <div className=" w-screen h-screen bottom-0 fixed left-0 z-[999999999999] top-0 flex flex-row justify-center items-end md:items-center ">
        <div
          className="relative text-white max-w-[750px] w-[90vw] h-[85vh] z-[999999999] bg-center bg-cover bg-no-repeat flex flex-col  border-blue-80 rounded-b-none md:rounded-b-[60px] rounded-[60px] border-[8px]
        bg-blue-100"
        >
          <div className="mb-[30px] md:mb-0 h-full">
            <>
              <div>
                <h1 className="font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto">
                  Creator`s access code
                </h1>
              </div>
              <div className="pt-[48px] flex flex-col h-[90vh] w-[65%] mx-auto gap-[20px] px-[29.5px] md:px-0">
                <div className="gap-[20px] flex flex-col ">
                  <input
                    type="text"
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter Agent Access Code"
                    className="font-[400]  font-Archivo_Regular w-full text-[15px] md:text-[20px] leading-[23.61px] py-[30px] text-[#8C8C8C] rounded-[16px] md:rounded-t-[16px] bg-blue-90  mx-auto text-center"
                  />
                  <div className="flex flex-col  font-Archivo_Regular font-normal">
                    <button
                      className="flex items-center w-full justify-center font-droid text-[16px] modalButton border-blue-80 border-solid border-[2px]  rounded-[1rem] mx-auto"
                      onClick={() => {
                        submitAccessCode();
                      }}
                    >
                      Begin Game
                    </button>
                    {errorMessage != "" && (
                      <p className="text-center pt-3">{errorMessage}</p>
                    )}
                  </div>
                </div>
                <p className="flex mt-[50px] font-Archivo_Regular justify-center leading-[21.76px] gap-2 md:text-[22px] text-[15px] text-center">
                  This is the code provided by the agent to unlock this game.
                  Contact agent for code
                </p>
              </div>
            </>
          </div>
        </div>
        {
          <img
            src={Close}
            className="absolute top-0 lg:top-[initial] lg:right-[62px] z-[9999999999]"
            onClick={() => navigate("/")}
          />
        }
      </div>
    </div>
  );
};

export default AccessID;
