import { useContext, useEffect } from 'react'
import { useModalContext } from '../../../context/ModalContext'
import Animation from './Animation'
import { UserContext } from '../../../context/UserContext'
import { toast } from 'react-hot-toast'

const Welcome = () => {
  const {username,  switchModal} = useModalContext()
  const {signInDetails,token}:any = useContext(UserContext)

  console.log(token)

  const{address}=signInDetails
  console.log(address)

  const addUser=()=>{
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  
  let raw = JSON.stringify({
    "address": address,
    "username": username,
    "role":'player'
  });
  
  let requestOptions:RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`https://mentalmaze-game.onrender.com/api/user/?address=${address}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if(result.message){
        toast.error('Error creating User')
      }
    })
    .catch(error => console.log('error', error));
    }
  
    useEffect(()=>{
      addUser()
    },[])

  return (
    <Animation className='w-full h-full flex flex-col items-center justify-center'>
        <h2 className='font-droid text-[20px] md:text-[32px] leading-[37px] '>WELCOME, {username?.toLocaleUpperCase()}</h2>
        <button className='modalButton w-[259px] text-[16px] md:text-[24px] leading-[28.34px] font-droid mt-[32px]' onClick={() => switchModal()}>
            BEGIN GAME 
        </button>
    </Animation>
  )
}
export default Welcome