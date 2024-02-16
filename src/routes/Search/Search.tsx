import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";


const SearchScreen = () => {

    const [searchedGames, setSearchedGames]: any = useState()
    const [searchText, setSearchText] = useState()

    useEffect(() => {
        const { data, text } = JSON.parse(window.atob(location.search.split('?d=')[1]))
        console.log(data)
        setSearchedGames(data)
        setSearchText(text)
    }, [])

    return (
        <div className="backdrop-blur-sm w-[100%] h-full pt-[102px] px-[16px] md:px-[34px]">
            <div className="flex sticky md:items-center text-white mt-10 ">
                <h2 className="font-normal text-[20px]  uppercase mr-3  md:text-5xl">
                    {searchText == '' ? 'Enter Search Term' : searchText}
                </h2>
                <p className="border-blue-50 h-[20px] w-[22px] md:h-[initial] md:w-[initial] text-center md:py-2 md:px-4 rounded-lg leading-[21.76px] text-[10px] md:text-xl border-2 ">
                    {searchedGames?.length ?? 0}
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[15px] gap-y-[15px] md:gap-x-[45px] md:gap-y-[44px] py-12 w-full px-0" >
                {
                    searchedGames?.map((gam: any, index: number) => <Game {...gam} key={index} />
                    )
                }
            </div>
        </div>
    )
}

export default SearchScreen

const Game = ({ image, id, players, title, approve }: any) => {
    const navigate = useNavigate()
    const { address } = useAccount()

    let played = false;
    for (const count in players) {
        played = players[count]?.playersAddress?.toLowerCase() == address?.toLowerCase()
        if (played) break
    }

    // const data = window.btoa(JSON.stringify({ gameId: id, accountId }))


    return (
        <div className="w-full relative rounded-[12px] overflow-hidden">
            <img src={image.includes('http') ? image : "https://mentalmaze-game.infura-ipfs.io/ipfs/" + image} className='w-full bg-center' alt="" />
            <div className='absolute bottom-0 bg-black backdrop-blur-[2.2068965435028076px] h-[68px] w-full opacity-80 flex justify-between px-[17.65px] items-center'>
                <p className='font-droid truncate text-[20px] text-white leading-[23.61px]'>{title}</p>
                <button disabled={played}
                    onClick={() => {
                        if (!approve)
                            navigate('/challenger/singlegame?id=' + id)
                    }}
                    className='font-normal text-[14px] bg-blue-50 font-droid leading-[16.53px] bg-black px-[8px] py-[12px] rounded-[6px] border border-solid border-[#0D0D0D] opacity-80 backdrop-blur-[2.310344934463501px]    '>
                    {played ? "Played" : "Play NOW"}
                </button>
            </div>
        </div>
    )
}
