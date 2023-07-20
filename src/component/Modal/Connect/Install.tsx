import { useModalContext } from "../../../context/ModalContext"
import Animation from "./Animation"

const Install = () => {
  const {switchModalcontent} = useModalContext()


  return (
    <>
      <div>
      <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
                    Connect Wallet
                </h1>
      </div>
    <Animation className='pt-[48px] flex flex-col gap-[24px] h-full '>

    <p className='font-Archivo_Regular md:text-[20px] md:leading-[40px] text-center max-w-md mx-auto'>
    MetaMask extension is not installed in your browser
    </p>

    <button className='flex items-center justify-center font-droid text-[24px] modalButton border-blue-80 border-solid border-[2px] w-[256px] h-[80px] rounded-[1rem] mx-auto' onClick={() => switchModalcontent('installed')}>
        Install
    </button>

    <div className='flex flex-col gap-1 font-Archivo_Regular font-normal text-[15px] md:text-[20px]'>
        <p className='leading-[21.76px]  text-center'>
        Do you need help with connecting 
        </p>
        <p className='flex justify-center leading-[21.76px] gap-2   text-center'>
        your wallet? <p className='text-blue-80'>Chat us on discord</p>
        </p>
    </div>
    </Animation>
    </>
  )
}

export default Install