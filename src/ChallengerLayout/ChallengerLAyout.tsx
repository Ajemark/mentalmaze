import { Outlet } from 'react-router-dom'
import Header from '../component/ui/Header'
import Sidebar from '../component/ui/Sidebar'
// import Background from "./../assets/Background.png"
// import ConnectWalletModal from "../component/Modal/Connect/ConnectWalletModalWrapper"
// import Overlay from '../component/ui/Overlay'
// // import { ConnectModals } from './Modals'
import { useModalContext } from '../context/ModalContext'
// import { AnimatePresence } from 'framer-motion'

export const ChallengerLayout = () => {
  const {ModalMode, sideBarMode, switchSideMode, modal}  = useModalContext()
  return (
    <div className='bg-[#000000] rounded-none min-h-screen h-full flex justify-center w-full items-center'>
      {/* <div className='mx-auto fixed w-screen h-screen  left-0 top-0 image bg-bg-sky bg-cover bg-center right-0 '>
      
      </div> */}
      <div className='mx-auto rounded-none flex flex-col w-full min-h-screen '>
        <Header challenger/>
        <div className='flex flex-1 h-fit mx-auto w-full justify-center '>
          <Sidebar showSideMobile={sideBarMode} switchSideMode={switchSideMode} challenger={true}/>
          <div className='  w-full  md:ml-[104px] mt-[96px] md:mt-[176px]'>
          <Outlet />
          </div>
        </div>
    </div>
    </div>
  )
}