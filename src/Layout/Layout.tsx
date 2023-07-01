import { Outlet } from 'react-router-dom'
import Header from '../component/ui/Header'
import Sidebar from '../component/ui/Sidebar'
import jointbg from "./../assets/jointbg.png"

export const Layout = () => {
  return (
    <div className='gamehome rounded-none min-h-screen h-full'>
      <div className='mx-auto fixed w-full  left-0 top-0'>
      <img src={jointbg} className='w-full  '/> 
      </div>
      {/* <div className='mx-auto fixed w-full  left-0 top-0'>
      <img src={Background} className='w-full  '/> 
      </div>
      <div className='mx-auto fixed w-full  left-0 top-0'>
      <img src={Overlay} className='w-full '/> 
      </div> */}
      <div className=' mx-auto rounded-none flex flex-col'>
        <Header />
        <div className='flex flex-1 h-fit mx-auto w-full '>
          <Sidebar />
          <div className='  w-full'>
          <Outlet />
          </div>
        </div>
    </div>
    </div>
  )
}
