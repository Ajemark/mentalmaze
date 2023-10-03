import { useModalContext } from "../../../context/ModalContext"
import metalmask from "./../../../assets/metalmask.png"
import Animation from "./Animation";
import Web3Modal from 'web3modal'
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import Loading from "../../ui/Loading";
import { useAccount } from "wagmi";
import useQuery from "../../../hooks/useQuery";

const Connect = () => {
  const { switchModalcontent } = useModalContext()
  const { loading, setLoading }: any = useContext(UserContext)
  const { isConnected } = useAccount();
  const { width } = useQuery()

  useEffect(() => {
    if (!window.ethereum) {
      switchModalcontent('install')
    }
  }, [])

  useEffect(() => {
    if (isConnected) {
      if (width < 768) {
        switchModalcontent('authenticate')
      }
    }
  }, [])

  async function connectWallet() {
    setLoading(true)
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
      })

      await web3Modal.connect()
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div>
        <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
          Connect Wallet
        </h1>
      </div>
      <Animation className='pt-[16px] pb-[32px] flex flex-col justify-start h-full '>
        <div className='flex justify-center '>
          <button

            className=' metamask flex gap-[24px] items-center justify-center font-droid text-[16px] md:text-[24px]  border-blue-80 '
            onClick={connectWallet}

          >
            <div>
              <img src={metalmask} />
            </div>
            MetaMask
          </button>
        </div>

        <div className='flex flex-col gap-1 mt-[80px] font-Archivo_Regular font-normal text-[15px] md:text-[20px]'>
          <p className='leading-[21.76px]   text-center'>
            Do you need help with connecting
          </p>
          <p className='flex justify-center leading-[21.76px]  text-center'>
            your wallet? <a className='text-blue-80' href="https://discord.gg/8STEwMEu">Chat us on discord</a>
          </p>
        </div>
      </Animation>
    </>
  )
}

export default Connect