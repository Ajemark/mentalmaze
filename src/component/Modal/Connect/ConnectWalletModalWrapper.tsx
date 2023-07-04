
import slices from "./../../../assets/slices.png"
import Close from "./../../../assets/Close.png"
import  {ReactNode} from "react"
import Overlay from '../../ui/Overlay'


type LayoutProps = {children?: ReactNode}


const ConnectWalletModal =  ({ children }:LayoutProps) => {
  return (
    <div className='w-screen h-screen fixed left-0 z-[99999999] top-0 flex justify-center items-center'>
                <Overlay />

        <div className=' 
        relative

        text-white
        w-[80vw]
        h-[80vh]
        z-[999999999]
        bg-center bg-cover bg-no-repeat
        flex flex-col
        max-w-[700px]
        border-blue-80 rounded-[60px] border-[8px]
        '>

            <img src={slices} alt="" className='w-[240px] h-[24px] absolute right-0 ' />
            <div>
            <div>
                <h1 className='font-droid border-b-blue-80 border-b-[8px] mt-[24px] pt-[16px] pb-[32px] leading-[37.78px] text-[32px] text-center'>
                    Connect Wallet
                </h1>
                </div>
                    {children}
                </div>

                <img src={slices} alt="" className='w-[240px] h-[24px] absolute bottom-0' />
        </div>
        <img src={Close}  className='absolute right-[62px] z-[9999999999]'/>
        </div>
  )
}

export default ConnectWalletModal