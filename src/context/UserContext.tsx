import { createContext, useState } from "react";

export type UserContextProviderProps = {
    children : React.ReactNode
}




export interface UserContextType {
    address:string,
    setAddress:React.Dispatch<React.SetStateAction<string>>
}


export const UserContext = createContext<UserContextType | null>(null)







export const UserContextProvider = ({children}:UserContextProviderProps)=>{
    const [address,setAddress] = useState('')


    return <UserContext.Provider value={{address,setAddress}}>
        {children}
    </UserContext.Provider>
}