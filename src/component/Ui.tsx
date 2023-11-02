import { useContext, useEffect } from "react"
import Search from "./../assets/header/Search.png"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

export const HeaderInput = () => {
    const navigate = useNavigate()

    const { userDetails, setSearchText, searchText, searchedGames, setSearchedGames }: any = useContext(UserContext)

    const searchGames = () => {
        if (!userDetails || !userDetails.token) {
            alert('Kindly Sign in to search for games')
            return
        }

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

        let requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/game/search?q=${searchText} `, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.data) {
                    setSearchedGames(result.data)
                }
                else {
                    console.log(result)
                }
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    useEffect(() => {
        if (searchedGames != undefined && !location.href.includes('search')) {
            navigate('/search')
        }
    }, [searchGames])



    return (
        <>
            <div className="border-blue-50 rounded-2xl   border-2 flex items-center justify-center gap-6 px-5 font-normal text-sm  font-Archivo_Regular w-full">
                <img src={Search} />
                <input onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                        searchGames()
                    }
                }} type="text" onChange={(e) => setSearchText(e.target.value)} placeholder="Search Games Or Collections..." className="bg-[inherit] py-4  outline-none border-0 text-white -ml-2" />
            </div>
        </>
    )
}


type ConnectTyype = {
    clickHandler: () => void
}

export const ConnectWalletbtn = ({ clickHandler }: ConnectTyype) => {
    const { signInDetails }: any = useContext(UserContext);

    const { address } = signInDetails

    let hiddenAddress;
    const hideStringInAddress = (walletAddress: string, stringToHide: string) => {
        hiddenAddress = walletAddress.replace(stringToHide, '....');
        return hiddenAddress;
    }

    let splitAdress = address.slice(4, 35);
    hideStringInAddress(address, splitAdress);

    return (
        <div className='flex'>
            <button className="hidden md:block rounded-2xl border-2 md:py-4 px-[2px] py-[8px] shrink-0 lg:px-6 font-normal font-Archivo_Regular text-[10px] md:text-[12px] lg:text-[15px] leading-[10px] md:leading-[16.32px] header-button text-[#ffffff]" onClick={clickHandler}>
                {address === '' ? 'CONNECT WALLET' : `${hiddenAddress}`}
            </button>

        </div>

    )
}

export const Instruction = () => {
    return <p className='font-[300] text-wb-40 font-Archivo_Regular mt-[4px] md:mt-[8px] leading-[17.41px] text-[14px] md:text-[16px]'></p>
}