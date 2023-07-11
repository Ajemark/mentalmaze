
import slices from "./../../../assets/slices.png"
import sliceMobile from "./../../../assets/sliceMobile.png"
import Close from "./../../../assets/Close.png"
import { ReactNode } from "react"
import Overlay from '../../ui/Overlay'
import { useModalContext } from "../../../context/ModalContext"
import useQuery from "../../../hooks/useQuery"



type LayoutProps = { children?: ReactNode, show: boolean }


const ConnectWalletModal = ({ children, show }: LayoutProps) => {

  const { switchModal } = useModalContext()
  const {width} = useQuery()

  const HandlerAnimation = (): string => {
    if(show) {
      if(width > 768) {
        return "scale(1)"
      }
      else {
        return "translateY(0)"
      }
    }
    else {
      if(width > 768) {
        return "scale(0)"
      }
      else {
        return "translateY(10000px)"
      }
    }
  }


  const Handler = () => {
    console.log("closing")
    switchModal()
  }

  return (
    <div className='w-screen h-screen fixed left-0 z-[999999999999] top-0 flex flex-row justify-center items-end md:items-center'
      style={{
        transform: HandlerAnimation(),
        transition: "all 0.5s"
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
        border-blue-80 rounded-b-none md:rounded-b-[60px] rounded-[60px] border-[8px]
        '>
        <img src={slices} alt="" className='w-[230px] md:w-[240px] md:h-[24px] absolute right-0 ' />
        {children}

        <img src={slices} alt="" className='w-[230px] h-[24px] md:w-[240px] md:h-[24px] absolute bottom-0 left-0 hidden md:block' />
        <img src={sliceMobile} alt="" className='w-[230px] h-[24px] md:w-[240px] md:h-[24px] absolute bottom-0 left-0 block md:hidden' />

      </div>
      <img src={Close} className='absolute top-0 md:top-[initial] md:right-[62px] z-[9999999999]' onClick={Handler} />
    </div>
  )
}

export default ConnectWalletModal