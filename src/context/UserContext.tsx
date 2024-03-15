import { createContext, useState } from "react";

export type UserContextProviderProps = {
  children: React.ReactNode;
};

export type userDetails = {
  username: string;
  address: string;
  role: string;
};

export interface signInDetails {
  address: string;
  signature: string;
  role: string;
}

export interface UserContextType {
  signInDetails: signInDetails;
  setSignInDetails: React.Dispatch<React.SetStateAction<signInDetails>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: userDetails | {};
  setUserDetails: React.Dispatch<React.SetStateAction<userDetails>>;
  mobileSignInDetails: signInDetails;
  setmobileSignInDetails: React.Dispatch<React.SetStateAction<signInDetails>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  questionTitle: string;
  setQuestionTitle: React.Dispatch<React.SetStateAction<string>>;
  typeQuestion: boolean;
  setTypeQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  setPendingGames: React.Dispatch<React.SetStateAction<any>>;
  setLiveGames: React.Dispatch<React.SetStateAction<any>>;
  setSearchedGames: React.Dispatch<React.SetStateAction<any>>;
  searchedGames: any;
  searchText: any;
  setSearchText: React.Dispatch<React.SetStateAction<any>>;
  questionObj: {};
  setQuestionObj: any;
  questions: any;
  setQuestions: any;
  coverImage: any;
  setCoverImage: any;
  images: any;
  pendingGames: any;
  liveGames: any;
  setImages: any;
  gameToken: any;
  priceShare: any;
  comments: any;
  setGameToken: any;
  setPriceShare: any;
  setComments: any;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [questions, setQuestions] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [typeQuestion, setTypeQuestion] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [questionObj, setQuestionObj] = useState<any>({
    image: "",
    cover: "",
    options: ["", "", "", ""],
    answer: "",
    difficultyLevel: "",
    title: "",
  });
  const [gameToken, setGameToken] = useState("");
  const [priceShare, setPriceShare] = useState(["", "", ""]);
  const [comments, setComments] = useState("");
  const [pendingGames, setPendingGames] = useState([]);
  const [liveGames, setLiveGames] = useState([]);
  const [searchedGames, setSearchedGames]: any = useState();
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState("");

  const [signInDetails, setSignInDetails] = useState<signInDetails>({
    address: "",
    signature: "",
    role: "",
  });
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<userDetails>({
    address: "",
    username: "",
    role: "",
  });

  //abandoned
  const [mobileSignInDetails, setmobileSignInDetails] = useState<signInDetails>(
    {
      address: "",
      signature: "",
      role: "",
    }
  );

  return (
    <UserContext.Provider
      value={{
        setSignInDetails,
        signInDetails,
        token,
        setToken,
        loading,
        setLoading,
        userDetails,
        setUserDetails,
        mobileSignInDetails,
        setmobileSignInDetails,
        title,
        setTitle,
        typeQuestion,
        setTypeQuestion,
        questionTitle,
        setQuestionTitle,
        duration,
        setDuration,
        questionObj,
        setQuestionObj,
        questions,
        setQuestions,
        coverImage,
        setCoverImage,
        images,
        setImages,
        gameToken,
        setGameToken,
        priceShare,
        setPriceShare,
        comments,
        setComments,
        pendingGames,
        setPendingGames,
        liveGames,
        setLiveGames,
        searchedGames,
        setSearchedGames,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
