import { createContext, useState } from "react";

export type UserContextProviderProps = {
    children : React.ReactNode
}

export type userDetails={
    id: string,
    username: string,
    address: string,
    role: string
}


export interface signInDetails{
    address:string,
    signature:string,
    role:string
}



export interface UserContextType {
    signInDetails: signInDetails 
    setSignInDetails: React.Dispatch<React.SetStateAction<signInDetails>>
    token:string
    setToken: React.Dispatch<React.SetStateAction<string>>
    loading:boolean
    setLoading:React.Dispatch<React.SetStateAction<boolean>>
    userDetails:userDetails | {}
    setUserDetails:React.Dispatch<React.SetStateAction<userDetails>>
}


export const UserContext = createContext<UserContextType | null>(null)


export const UserContextProvider = ({children}:UserContextProviderProps)=>{
    const [signInDetails,setSignInDetails] = useState<signInDetails>({
        address:'',
        signature:'',
        role:''
    })
    const[token,setToken] = useState('')
    const[loading, setLoading] = useState(false)
    const[userDetails,setUserDetails]=useState<userDetails|{}>({})

    console.log(signInDetails)

    return <UserContext.Provider value={{setSignInDetails,signInDetails,token,setToken,loading,setLoading, userDetails,setUserDetails}}>
        {children}
    </UserContext.Provider>
}