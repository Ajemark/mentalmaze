import { createContext, useState } from "react";
import { CID } from 'ipfs-http-client'

export type UserContextProviderProps = {
    children: React.ReactNode
}

export type userDetails = {
    username: string,
    address: string,
    role: string,

}

export interface signInDetails {
    address: string,
    signature: string,
    role: string
}

export interface UserContextType {
    signInDetails: signInDetails
    setSignInDetails: React.Dispatch<React.SetStateAction<signInDetails>>
    token: string
    setToken: React.Dispatch<React.SetStateAction<string>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    userDetails: userDetails | {}
    setUserDetails: React.Dispatch<React.SetStateAction<userDetails>>
    mobileSignInDetails: signInDetails
    setmobileSignInDetails: React.Dispatch<React.SetStateAction<signInDetails>>
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    questionTitle: string
    setQuestionTitle: React.Dispatch<React.SetStateAction<string>>
    typeQuestion: boolean
    setTypeQuestion: React.Dispatch<React.SetStateAction<boolean>>
    duration: string
    setDuration: React.Dispatch<React.SetStateAction<string>>
    questionObj: {}
    setQuestionObj: any
    questions: any
    setQuestions: any
    coverImage: any
    setCoverImage: any
    images: any
    setImages: any
    gameToken: any
    priceShare: any
    comments: any
    setGameToken: any
    setPriceShare: any
    setComments: any
}


export const UserContext = createContext<UserContextType | null>(null)


export const UserContextProvider = ({ children }: UserContextProviderProps) => {

    const [questions, setQuestions] = useState<any>([])
    const [title, setTitle] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [typeQuestion, setTypeQuestion] = useState(false)
    const [questionTitle, setQuestionTitle] = useState('')
    const [duration, setDuration] = useState('')
    const [questionObj, setQuestionObj] = useState<any>({
        image: '',
        options: ['', '', '', ''],
        answer: '',
        difficultyLevel: '',
        title: ''
    })
    const [gameToken, setGameToken] = useState('')
    const [priceShare, setPriceShare] = useState(['', '', ''])
    const [comments, setComments] = useState('')
    // const[,set]= useState('')
    const [images, setImages] = useState<{ cid: CID, path: string }>()
    // const []

    //payments

    const [signInDetails, setSignInDetails] = useState<signInDetails>({
        address: '',
        signature: '',
        role: ''
    })
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [userDetails, setUserDetails] = useState<userDetails>({
        address: '',
        username: '',
        role: ''
    })

    //abandoned
    const [mobileSignInDetails, setmobileSignInDetails] = useState<signInDetails>({
        address: '',
        signature: '',
        role: ''
    })


    // if(userDetails?.address){
    //     const {address} = userDetails
    // }





    // const { open, close } = useWeb3Modal()
    // console.log(userDetails)
    // console.log(questions)

    // console.log(signInDetails)

    return <UserContext.Provider value={{ setSignInDetails, signInDetails, token, setToken, loading, setLoading, userDetails, setUserDetails, mobileSignInDetails, setmobileSignInDetails, title, setTitle, typeQuestion, setTypeQuestion, questionTitle, setQuestionTitle, duration, setDuration, questionObj, setQuestionObj, questions, setQuestions, coverImage, setCoverImage, images, setImages, gameToken, setGameToken, priceShare, setPriceShare, comments, setComments }}>
        {children}
    </UserContext.Provider>
}