
import slices from "./../../../assets/slices.png"
import Close from "./../../../assets/Close.png"
import  {ReactNode} from "react"
import Overlay from '../../ui/Overlay'
import { useModalContext } from "../../../context/ModalContext"



type LayoutProps = {children?: ReactNode, show: boolean}


const ConnectWalletModal =  ({ children, show }:LayoutProps) => {

  const {switchModal} = useModalContext()

  const Handler = () => {
    console.log("closing")
    switchModal()
  }

  return (
    <div className='w-screen h-screen fixed left-0 z-[99999999] top-0 flex justify-center items-center' 
    style={{  
        transform: show?"translate(0)":"translate(-100%)"
    }}
    
    >
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
                    {children}

                <img src={slices} alt="" className='w-[240px] h-[24px] absolute bottom-0' />
        </div>
        <img src={Close}  className='absolute right-[62px] z-[9999999999]' onClick = {Handler} />
        </div>
  )
}

export default ConnectWalletModal