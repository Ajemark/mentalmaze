import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './routes/Home/Home'
// import ErrorPage from './error-page'

import UserProfile from './routes/UserProfile/UserProfile'

import { MainLayout } from './Layout/Layout'
import LeaderShipBoard from './routes/LeadershipBoard/LeaderShipBoard'
import Create from './routes/Creator/Create'
import GameRequirement from './routes/Creator/GameRequirement'
import Settings from './routes/Creator/settings'
import Game from './routes/Game/Game'
import ChallengerHome from './ChallengerLayout/Pages/ChallengerHome'
import ChallengerGames from './ChallengerLayout/Pages/ChallengerGames'
import ChallengerGame from './ChallengerLayout/Pages/ChallengerGame'
import Dashboard from './ChallengerLayout/Pages/Dashboard/Dashboard'






function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile",
          element: <UserProfile />
        },
        {
          path: '/leaderboard',
          element: <LeaderShipBoard />
        },
        {
          path: "/create-game",
          element: <Create />
        },
        {
          path: "/settings",
          element: <Settings />
        },
        {
          path: "/game-Requirement",
          element: <GameRequirement />
        },
        {
          path: "/game",
          element: <Game />
        },
        {
          path: "/challenger",
          element: <ChallengerHome />
        },
        {
          path: "/challenger/uploadedgames",
          element: <ChallengerGames />
        },
        {
          path: "/challenger/singlegame",
          element: <ChallengerGame />
        },
        {
          path: "/challenger/dashboard",
          element: <Dashboard />
        }
        
      ],
    },
    // {
    //   path: "/challenger",
    //   element: <ChallengerLayout />,
    //   children: [
    //     {
    //       path: "/challenger",
    //       element: <ChallengerHome />
    //     },
    //     {
    //       path: "/challenger/uploadedgames",
    //       element: <ChallengerGames />
    //     },
    //     {
    //       path: "/challenger/singlegame",
    //       element: <ChallengerGame />
    //     },
    //     {
    //       path: "/challenger/dashboard",
    //       element: <Dashboard />
    //     }
    //   ]
    // },
  ]);

  return (
          <RouterProvider router={router} />
          
  )
}

export default App