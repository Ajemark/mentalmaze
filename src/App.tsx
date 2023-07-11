import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './routes/Home/Home'
// import ErrorPage from './error-page'

import UserProfile from './routes/UserProfile/UserProfile'

import { Layout } from './Layout/Layout'
import LeaderShipBoard from './routes/LeadershipBoard/LeaderShipBoard'





function App() {
  const router = createBrowserRouter([
    {
      path: "/solver",
      element: <Layout/>,
      children: [
        {
          path: "/solver",
          element: <Home />
        },
        {
          path: "/solver/profile",
          element: <UserProfile />
        },
        {
          path: '/solver/leadership',
          element: <LeaderShipBoard />
        }
      ],
    },
    {
      path: "/creator",
      // element: 
    }
  ]);

  return (
          <RouterProvider router={router} />
          
  )
}

export default App