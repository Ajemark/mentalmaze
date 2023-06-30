import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './routes/Home/Home'
// import ErrorPage from './error-page'
import Header from './component/ui/Header'
import Sidebar from './component/ui/Sidebar'
import UserProfile from './routes/UserProfile/UserProfile'
import Background from "./assets/Background.png"
import Overlay from "./assets/Overlay.png"



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      // errorElement: <ErrorPage/>
    },
    {
      path: "/profile",
      element: <UserProfile/>,
      // errorElement: <ErrorPage/>
    },
  ]);

  return (
    <div className='gamehome rounded-none min-h-screen h-full'>
      <div className='mx-auto fixed w-full  left-0 top-0'>
      <img src={Background} className='w-full  '/> 
      </div>
      <div className='mx-auto fixed w-full  left-0 top-0'>
      <img src={Overlay} className='w-full '/> 
      </div>
      <div className=' mx-auto rounded-none flex flex-col'>
        <Header />
        <div className='flex flex-1 h-fit mx-auto w-full '>
          <Sidebar />
          <div className=' ml-[104px]'>
          <RouterProvider router={router} />
          </div>
        </div>
    </div>
    </div>
  )
}

export default App