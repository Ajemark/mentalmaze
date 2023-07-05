import { Outlet } from 'react-router-dom'
import Header from '../component/ui/Header'
import Sidebar from '../component/ui/Sidebar'
// import jointbg from "./../assets/jointbg.png"
import ConnectWalletModal from "../component/Modal/Connect/ConnectWalletModalWrapper"
// import Overlay from '../component/ui/Overlay'
import { ConnectModals } from './Modals'
import { useModalContext } from '../context/ModalContext'

export const Layout = () => {
  const {modal, ModalMode}  = useModalContext()


  return (
    <div className='gamehome rounded-none min-h-screen h-full flex justify-center w-full items-center'>
      <div className='mx-auto fixed w-full  left-0 top-0 '>
      {/* <img src={jointbg} className='w-full '/>  */}
      </div>
      <div className=' mx-auto rounded-none flex flex-col w-full'>
        <Header />
        <div className='flex flex-1 h-fit mx-auto w-full justify-center'>
          <Sidebar />
          <ConnectWalletModal show={ModalMode}>
            {ConnectModals[modal]}
            </ConnectWalletModal>
          <div className='  w-full'>
          <Outlet />
          </div>
        </div>
    </div>
    </div>
  )
}
