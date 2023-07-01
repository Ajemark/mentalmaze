import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './routes/Home/Home'
// import ErrorPage from './error-page'
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