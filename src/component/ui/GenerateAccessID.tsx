"use client";
import { useNavigate } from "react-router-dom";
import Close from "./../../assets/Close.png";
import { useState } from "react";
import Overlay from "../../component/ui/Overlay";
import { useModalContext } from "../../context/ModalContext";

const GenerateAccessID = ({ setshowAccessCodeScreen }: any) => {
  const [accessCode, setAccessCode]: any = useState("");
  const { switchModal } = useModalContext();
  const navigate = useNavigate();

  function randomString(length: any) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

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
                    disabled
                    value={accessCode}
                    placeholder="Enter Agent Access Code"
                    className="font-[400]  font-Archivo_Regular w-full text-[15px] md:text-[20px] leading-[23.61px] py-[30px] text-[#8C8C8C] rounded-[16px] md:rounded-t-[16px] bg-blue-90  mx-auto text-center"
                  />
                  <div className="flex flex-col  font-Archivo_Regular font-normal">
                    <div className="flex gap-[15px]">
                      <button
                        className="flex items-center w-full justify-center font-droid text-[16px] modalButton border-blue-80 border-solid border-[2px]  rounded-[1rem] mx-auto"
                        onClick={() => {
                          setAccessCode(randomString(8));
                        }}
                      >
                        Generate Code
                      </button>
                      <button
                        className="flex items-center w-full justify-center font-droid text-[16px] modalButton border-blue-80 border-solid border-[2px]  rounded-[1rem] mx-auto"
                        onClick={() => {
                          localStorage.setItem("accessCode", accessCode);
                          setshowAccessCodeScreen(false);
                          switchModal();
                          navigate("/settings");
                        }}
                        style={{ opacity: `${accessCode ? "1" : "0.6"}` }}
                        disabled={!accessCode}
                      >
                        Continue
                      </button>
                    </div>
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

export default GenerateAccessID;
