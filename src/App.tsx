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
import jointbg from "./assets/jointbg.png"
import { Layout } from './Layout/Layout'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile",
          element: <UserProfile />
        }
      ]
    },
  ]);

  return (
          <RouterProvider router={router} />
          
  )
}

export default App