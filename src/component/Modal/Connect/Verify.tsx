import { useContext } from "react"
import { useModalContext } from "../../../context/ModalContext"
import { UserContext } from "../../../context/UserContext"
import Animation from "./Animation"
import Loading from "../../ui/Loading"
import { toast } from "react-hot-toast"

const Verify = () => {
  const {switchModalcontent} = useModalContext()
  const {signInDetails, setToken, loading,setLoading}:any = useContext(UserContext);
  const{address,signature}=signInDetails;
  // const {username,  switchModal} = useModalContext()



    //check if user exists
    const userExists=(address:string, webToken:string)=>{
      setLoading(true)
      let myHeaders = new Headers();
      myHeaders.append("Authorization",`Bearer ${webToken}`);
  
      let requestOptions:RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/?address=${address.toLowerCase()}`, requestOptions)
    .then(response => response.json())
    .then(result =>{ 
      setLoading(false)
      if(result.data.id){
        switchModalcontent('welcome')
        return
      }
      console.log(result)
      switchModalcontent('verify')
    })
    .catch(error => {
      toast.error('An error occurred')
      return error
    })
    }
  
  
    //add user after signature
    const addUserDetails=async()=>{
      setLoading(true)
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      let raw = JSON.stringify({
        "address": address,
        "signature":signature,
        "role":'player'
      });
      
      let requestOptions:RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/authenticate/verify`, requestOptions)
        .then(response =>{
          if (response.ok) {
          return response.json();
        }
        toast.error('Something went wrong')
      })
        .then(result => {
          console.log(result)
          if(!result.data.token){
            setLoading(false)
            toast.error('Error creating User')
          }
          else{
            setToken(result.data.token)
            setLoading(false)
            userExists(address,result.data.token)
          
          }
        })
        .catch(error => {
          if (error.response) {
            toast.error('An error occured');
            setLoading(false)
          } else if (error.request) {
            toast.error('An error occured');
            setLoading(false)
          } else {
            toast.error('An error occured');
            setLoading(false)
          }
        });
    }
      


 

  

  return (
    <>
    {loading && < Loading/>}
      <div >
      <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
                   Verify Wallet
                </h1>
      </div>
    <Animation className='pt-[48px] flex flex-col h-full gap-[100px]'>
        <button 
        className='modalButton flex gap-[24px] items-center justify-center font-droid text-[1rem] md:text-[24px]  border-blue-80 mx-auto'
        onClick={addUserDetails}
        >
                    Verify
        </button>
    
        <div className='flex flex-col gap-1 font-Archivo_Regular font-normal tracking-wider'>
            <p className='leading-[21.76px]  text-[15px] md:text-[20px] text-center'>
            Do you need help with connecting 
            </p>
            <p className='flex justify-center leading-[21.76px] gap-2  text-[15px] md:text-[20px] text-center'>
            your wallet? <a href="https://discord.gg/8STEwMEu" className='text-blue-80'>Chat us on discord</a>
            </p>
        </div>
        </Animation>
        </>
  )
}
export default Verify