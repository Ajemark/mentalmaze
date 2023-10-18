import { Outlet } from 'react-router-dom';
import Header from '../component/ui/Header';
import Sidebar from '../component/ui/Sidebar';
import ConnectWalletModal from "../component/Modal/Connect/ConnectWalletModalWrapper";
import { ConnectModals } from './Modals';
import { useModalContext } from '../context/ModalContext';
import useMode from '../hooks/useMode';
import { Toaster } from 'react-hot-toast';

import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi'
import { auroraTestnet } from 'wagmi/chains'


import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient } = configureChains(
  [sepolia, auroraTestnet],
  [publicProvider()]
);

const projectId = import.meta.env.VITE_REACT_APP_WALLET_CONNECT_PROJECT_ID

const { connectors } = getDefaultWallets({
  appName: 'MentalMaze App',
  projectId: projectId,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})





export const MainLayout = () => {
  const { ModalMode, sideBarMode, switchSideMode, modal } = useModalContext()
  const { challenger } = useMode()
  // console.log(challenger)

  return (
    <>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            marginTop: '100px',
            border: '1px solid #0B77F0',
            backgroundColor: '#0B77F0',
            padding: '16px',
            color: 'white',
            zIndex: '1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
          },
        }}
      />
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <div className={`${challenger ? "bg-black" : "home"} rounded-none min-h-screen h-full flex justify-center w-full items-center`}>
            <div className='fixed h-screen bottom-0 bg-overlay w-screen mix-blend-multiply backdrop-blur-[4px] bg-cover '>

            </div>
            <div className='mx-auto fixed w-screen h-screen  left-0 top-0 bg-bg-sky bg-cover bg-center right-0 after  bg-fixed'>

            </div>

            <div className='mx-auto rounded-none flex flex-col w-full min-h-screen '>
              <Header />

              <div className='flex flex-1 h-fit mx-auto w-full justify-center items-stretch'>
                <Sidebar showSideMobile={sideBarMode} switchSideMode={switchSideMode} />
                <ConnectWalletModal show={ModalMode}>
                  {ConnectModals[modal]}
                </ConnectWalletModal>
                <div className='  w-full  md:ml-[104px]'>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>

    </>

  )
}
