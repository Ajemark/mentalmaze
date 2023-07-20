import { useModalContext } from "../../../context/ModalContext"
import metalmask from "./../../../assets/metalmask.png"
import Animation from "./Animation";
declare global {
  interface Window {
    ethereum?: object;
  }
}

const Connect = () => {
  const {switchModalcontent} =  useModalContext()

  const connectWallet = () => {
    console.log("Connectin")
    if(window.ethereum){
      console.log("detected")
      return ;
    }
    switchModalcontent('install')
  }
  
  return (
    <>
      <div>
      <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
                    Connect Wallet
                </h1>
      </div>
    <Animation className='pt-[16px] pb-[32px] flex flex-col justify-between h-full '>
                <div className='flex justify-center '>
                <button className=' metamask flex gap-[24px] items-center justify-center font-droid text-[16px] md:text-[24px]  border-blue-80 ' onClick={connectWallet}>
                    <div>
                    <img src={metalmask} />
                    </div>
                    MentalMask
                </button>
                </div>

                <div className='flex flex-col gap-1 font-Archivo_Regular font-normal text-[15px] md:text-[20px]'>
                    <p className='leading-[21.76px]   text-center'>
                    Do you need help with connecting 
                    </p>
                    <p className='flex justify-center leading-[21.76px]  text-center'>
                    your wallet? <p className='text-blue-80'>Chat us on discord</p>
                    </p>
                </div>
      </Animation>
      </>
  )
}

export default Connect