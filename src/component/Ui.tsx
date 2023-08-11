import { useContext } from "react"
import Search from "./../assets/header/Search.png"
import { UserContext } from "../context/UserContext"

export const HeaderInput = () => {
    return(
        <div className="border-blue-50 rounded-2xl   border-2 flex items-center justify-center gap-6 px-10 font-normal text-sm  font-Archivo_Regular w-full">
            <img src={Search} />
            <input type="text" placeholder="Search Games Or Collections..." className="bg-[inherit] py-4  outline-none border-0 text-white"/>
        </div>
    )
}
type ConnectTyype = {
    clickHandler: () => void
}




export const ConnectWalletbtn = ({clickHandler}:ConnectTyype) => {
    const{address}:any=useContext(UserContext);

    let hiddenAddress;
    const hideStringInAddress = (walletAddress:string, stringToHide:string) => {
        hiddenAddress = walletAddress.replace(stringToHide, '....');
        return hiddenAddress;
   }

   let splitAdress = address.slice(4,35);
   hideStringInAddress(address,splitAdress);

    return(
        <div className='flex'>
        <button className="hidden md:block rounded-2xl border-2 md:py-4 px-[8px]  py-[8px] shrink-0 lg:px-10 font-normal font-Archivo_Regular text-[10px] md:text-[12px] lg:text-[15px] leading-[10px] md:leading-[16.32px] header-button text-[#ffffff]" onClick={clickHandler}>
           {address===''?'CONNECT WALLET':`Connected to : ${hiddenAddress}`}
        </button>
       
        </div>
        
    )
}

export const Instruction = () => {
    return  <p className='font-[300] text-wb-40 font-Archivo_Regular mt-[4px] md:mt-[8px] leading-[17.41px] text-[14px] md:text-[16px]'></p>
}