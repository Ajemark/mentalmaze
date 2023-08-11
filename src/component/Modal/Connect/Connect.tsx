import { useModalContext } from "../../../context/ModalContext"
import metalmask from "./../../../assets/metalmask.png"
import Animation from "./Animation";
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import {CoinbaseWalletSDK} from '@coinbase/wallet-sdk'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";



// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

const Connect = () => {
  const {switchModalcontent} =  useModalContext()
  const {address,setAddress}:any = useContext(UserContext)
  const [signedMessage, setSignedMessage] = useState('')



  const [web3Provider , setWeb3Provider] = useState<any>(null)

  // const[address,setAddress]=useState('')

  useEffect(()=>{
    if(!window.ethereum){
      switchModalcontent('install')   
    }
  },[])


  async function connectWallet(){
    try{
      let web3Modal = new Web3Modal({
        cacheProvider:false,
      })

      const web3ModalInstance = await web3Modal.connect()
      const web3ModalProvider = new ethers.BrowserProvider(web3ModalInstance);
      const walletAddress = await (await web3ModalProvider.getSigner()).getAddress()
      await fetch(`https://mentalmaze-game.onrender.com/api/authenticate/login?address=${walletAddress}`)
      .then(response =>{
       return response.json()
      })
      .then(async result => {
        console.log(result)
        if(result.message === 'success'){
          const signer = web3ModalProvider.getSigner();
        let signature = (await signer).signMessage(result.data.message);
        console.log(signature)
        }
      })
      .catch(error => console.log('error', error));
      // const signedMessage = await (await web3ModalProvider.getSigner()).signMessage()
      // console.log(signedMessage)
      setAddress(walletAddress)
      // web3ModalProvider._getAddress()
      if(web3ModalProvider){
        setWeb3Provider(web3ModalProvider)
        
      }
    }
    catch(error){
      console.error(error);
    }
  }


  useEffect(()=>{
    if(address){
      switchModalcontent('verify')
    }
  },[address])



  console.log(address);

  return (
    <>
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