import { Outlet } from 'react-router-dom'
import Header from '../component/ui/Header'
import Sidebar from '../component/ui/Sidebar'
// import jointbg from "./../assets/jointbg.png"
import ConnectWalletModal from "../component/Modal/Connect/ConnectWalletModalWrapper"
// import Overlay from '../component/ui/Overlay'
// import Connect from '../component/Modal/Connect/Connect'
// import Install from '../component/Modal/Connect/Install'
// import Installed from '../component/Modal/Connect/Installed'
// import Verify from '../component/Modal/Connect/Verify'
import ChooseANickname from '../component/Modal/Connect/ChooseANickname'


export const Layout = () => {
  return (
    <div className='gamehome rounded-none min-h-screen h-full flex justify-center w-full items-center'>
      <div className='mx-auto fixed w-full  left-0 top-0 '>
      {/* <img src={jointbg} className='w-full '/>  */}
      </div>
      <div className=' mx-auto rounded-none flex flex-col w-full'>
        <Header />
        <div className='flex flex-1 h-fit mx-auto w-full justify-center'>
          <Sidebar />
          <ConnectWalletModal>
            <ChooseANickname />
            </ConnectWalletModal>
          
          <div className='  w-full'>
          <Outlet />
          </div>
        </div>
    </div>
    </div>
  )
}
