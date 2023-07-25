import { Outlet } from 'react-router-dom';
import Header from '../component/ui/Header';
import Sidebar from '../component/ui/Sidebar';
import ConnectWalletModal from "../component/Modal/Connect/ConnectWalletModalWrapper";
import { ConnectModals } from './Modals';
import { useModalContext } from '../context/ModalContext';


export const Layout = () => {
  const {ModalMode, sideBarMode, switchSideMode, modal}  = useModalContext()


  return (
    <div className='home rounded-none min-h-screen h-full flex justify-center w-full items-center'>
            <div className='fixed h-screen bottom-0 bg-overlay w-screen mix-blend-multiply backdrop-blur-[4px] bg-cover'>
              
            </div>
      <div className='mx-auto fixed w-screen h-screen  left-0 top-0 bg-bg-sky bg-cover bg-center right-0 after  '>
      
      </div>

      <div className='mx-auto rounded-none flex flex-col w-full min-h-screen '>
        <Header challenger={false}/>
        <div className='flex flex-1 h-fit mx-auto w-full justify-center items-stretch'>
          <Sidebar showSideMobile={sideBarMode} switchSideMode={switchSideMode} challenger={false}/>
          <ConnectWalletModal show={ModalMode}>
          
          {ConnectModals[modal]}
            
            
            </ConnectWalletModal>
          <div className='  w-full  md:ml-[104px]'>
          <Outlet />
          </div>
        </div>
    </div>
    </div>
  )
}
