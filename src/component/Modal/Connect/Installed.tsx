
import { useModalContext } from "../../../context/ModalContext"
import metalmask from "./../../../assets/metalmask.png"
import Animation from "./Animation"


const Installed = () => {
    const {switchModalcontent} = useModalContext()
    return (
        <>
            <div>
            <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
                    Connect Wallet
                </h1>
      </div>
        <Animation className='pt-[48px] flex flex-col gap-[24px] h-full '>
    
    <p className='font-Archivo_Regular text-[32px] leading-[40px] text-center max-w-md mx-auto'>
    Done Installing? Reconnect
    </p>
    
        <button className='metamask flex gap-[24px] items-center justify-center font-droid text-[16px] md:text-[24px]  border-blue-80 mx-auto' onClick={() => switchModalcontent('verify')}>
                    <div>
                    <img src={metalmask} />
                    </div>
                    MentalMask
                </button>
    
        <div className='flex flex-col gap-1 font-Archivo_Regular font-normal tracking-wider'>
            <p className='leading-[21.76px] text-[15px] md:text-[20px] text-center'>
            Do you need help with connecting 
            </p>
            <p className='flex justify-center leading-[21.76px] gap-2 text-[15px] md:text-[20px] text-center'>
            your wallet? <a className='text-blue-80' href="https://discord.gg/8STEwMEu">Chat us on discord</a>
            </p>
        </div>
        </Animation>
        </>
      )
    }

export default Installed