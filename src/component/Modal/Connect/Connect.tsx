import { useModalContext } from "../../../context/ModalContext";
import Animation from "./Animation";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const Connect = () => {
  const { switchModalcontent, switchModal } = useModalContext();
  const { isConnected } = useAccount();

  const { open } = useWeb3Modal();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (isConnected) {
      if (userData && JSON.parse(userData).username) {
        return;
      }
      switchModalcontent("authenticate");
    }
  }, []);

  const openWidget = (onComplete: any) => {
    let myWindow: any = window;
    if (myWindow.openPromo) {
      switchModal();
      myWindow.openPromo({
        onComplete: onComplete,
        config: { hideUpdateAppBlock: true },
      });
    } else onComplete();
  };

  const onComplete = () => {
    open();
  };

  async function connectWallet() {
    try {
      open();
      switchModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <h1 className="font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto">
          Connect Wallet
        </h1>
      </div>
      <Animation className="pt-[16px] pb-[32px] flex flex-col justify-start h-full ">
        <div className="flex justify-center ">
          <button
            className=" metamask flex gap-[24px] items-center justify-center font-droid text-[16px] md:text-[24px]  border-blue-80 "
            onClick={connectWallet}
          >
            <div>
              <img src={"Metamask.png"} />
            </div>
          </button>
        </div>

        <div className="flex mt-8 justify-center ">
          <button
            className=" metamask flex gap-[24px] items-center justify-center font-droid text-[16px] md:text-[24px]  border-blue-80 "
            onClick={() => openWidget(onComplete)}
          >
            <div className="pl-6 mr-auto md:mr-0">
              <img src="Aurora.png" className="h-10 md:h-14" />
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-1 mt-[80px] font-Archivo_Regular font-normal text-[15px] md:text-[20px]">
          <p className="leading-[21.76px]   text-center">
            Do you need help with connecting
          </p>
          <p className="flex justify-center leading-[21.76px]  text-center">
            your wallet?{" "}
            <a className="text-blue-80" href="https://discord.gg/8STEwMEu">
              Chat us on discord
            </a>
          </p>
        </div>
      </Animation>
    </>
  );
};

export default Connect;
