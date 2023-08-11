import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ModalProvider } from './context/ModalContext.tsx'
import { UserContextProvider } from './context/UserContext.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
    <ModalProvider >
    <App />
    </ModalProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
