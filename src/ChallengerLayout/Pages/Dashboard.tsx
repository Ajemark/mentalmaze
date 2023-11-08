
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { UserContext } from "../../context/UserContext"
import { MM_ADDRESS, useEthersProvider, useEthersSigner } from "../../sdk"
import { MMContract } from "../../sdk/MMContract"
import { Pagination } from "../../component/ui/Pagination"
import ReactLoading from 'react-loading';



const Dashboard = () => {

    const navigate = useNavigate()

    const { userDetails }: any = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [data, setData]: any = useState()
    const [pgNum, setPgNum]: any = useState(1)
    const { isConnected, address } = useAccount()

    const [totalJudges, setTotalJudges] = useState(0)
    const signer = useEthersSigner();
    const provider = useEthersProvider();
    const mmContract = new MMContract(MM_ADDRESS, signer, provider)


    const getAllGames = () => {

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

        let requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        // =${ address?.toLowerCase()
        fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/judge?pageNumber=${pgNum}&pageSize=10`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.data) {

                    setData(result.data)
                    setLoading(false)
                }
                else {
                    console.log(result)
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log('error', error)
                // setMessage('An Error Occured!, Please Try Again')
                setLoading(false)
            });
    }

    useEffect(() => {
        setLoading(true)
        if (userDetails && !userDetails?.token) {
            setData()
            setLoading(false)
            return
        }
        getAllGames()
    }, [userDetails, address, isConnected, pgNum])

    const handlePagination = (info: any) => {
        console.log(pgNum)
        console.log(info)
        if (info == 'next' || info == 'prev') {
            if (info == 'next') {
                setPgNum(pgNum + 1)
                return
            } else {
                if (pgNum == 1) return
                setPgNum(pgNum - 1)
                return
            }
        }
        setPgNum(Number(info))
    }


    useEffect(() => {
        (async () => {
            const totalJudges = await mmContract.getJudgesCount()
            setTotalJudges(totalJudges)
        })()
    }, [])


    console.log(data?.judgesData[0])
    return (
        <div className="mt-[96px]  md:mt-[104px] md:border-t-solid border-t-2 border-l-2 border-1 border-blue-50 px-[20px] relative ">
            <div className='relative text-white '>
                <div>
                    <div className='flex justify-between mb-[72px] flex-col md:flex-row md:items-center'>
                        <h2 className='font-droid text-[32px] hidden md:block'>DASHBOARD </h2>
                        <h2 className='font-droid text-[16px] md:text-[32px] md:hidden'>DASHBOARD </h2>

                        <button onClick={() => navigate('/challenger/uploadedgames')} className='bg-wb-100 px-[40px] h-[43px] md:h-[96px] font-Archivo_Regular text-[12px] mt-[24px] md:text-[20px] rounded-[16px] w-fit'>
                            VIEW PENDING GAMES
                        </button>
                    </div>

                    <div className='grid md:grid-cols-3 gap-[24px]'>
                        <div className='w-full p-[4px] rounded-[5px]' style={{
                            background: "linear-gradient(90deg, #032449, #0B77F0)"
                        }}>
                            <div className='font-Inter_Regular w-full bg-black  py-[24px] px-[24px] ' style={{ "boxShadow": "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)" }}>
                                <p className='text-blue-80 text-[14px] '>Total solved cases</p>
                                <p className='text-[36px] text-blue-main'>
                                    {data?.judgesData[0].totalSolved}
                                </p>
                            </div>
                        </div>
                        <div className='w-full p-[4px] rounded-[5px]' style={{
                            background: "linear-gradient(90deg, #032449, #0B77F0)"
                        }}>
                            <div className='font-Inter_Regular w-full bg-black  py-[24px] px-[24px] ' style={{ "boxShadow": "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)" }}>
                                <p className='text-blue-80 text-[14px] '>Disapproved</p>
                                <p className='text-[36px] text-blue-main'>
                                    {data?.judgesData[0].totalDisapproved}
                                </p>
                            </div>
                        </div>
                        <div className='w-full p-[4px] rounded-[5px]' style={{
                            background: "linear-gradient(90deg, #032449, #0B77F0)"
                        }}>
                            <div className='font-Inter_Regular w-full bg-black  py-[24px] px-[24px] ' style={{ "boxShadow": "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)" }}>
                                <p className='text-blue-80 text-[14px] '>Total Approved</p>
                                <p className='text-[36px] text-blue-main'>
                                    {data?.judgesData[0].totalApproved}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Games data={data} loading={loading} totalJudges={totalJudges} handler={handlePagination} />
                </div>
            </div>
        </div>
    )
}
export default Dashboard




const Games = ({ data, handler, totalJudges, loading }: any) => {
    // console.log(handler)
    console.log(data?.gamesCreated.fetchRes)

    return (
        <div style={{
            background: "linear-gradient(90deg, #032449, #0B77F0)"
        }} className='p-[4px] mt-[32px]'>
            <div className='bg-black'>

                <table className="w- max-w-[100vw]">
                    <thead>
                        <tr className="font-droid t w-[30%] text-[20px] md:text-[36px] leading-[36px] text-blue-80">
                            <th>
                                <div style={{
                                    background: "linear-gradient(90deg, #032449, #0B77F0)"
                                }} className='pb-[4px] '
                                >
                                    <p className='bg-black py-[32px] md:px-[24px] text-center md:text-left'>   Game</p>
                                </div>
                            </th>
                            <th className="w-[40vw]">
                                <div style={{
                                    background: "linear-gradient(90deg, #032449, #0B77F0)"
                                }} className='pb-[4px] '
                                >
                                    <p className='bg-black py-[32px] nd:px-[24px] text-center md:text-left'>   Voting</p>
                                </div>
                            </th>
                            <th>
                                <div style={{
                                    background: "linear-gradient(90deg, #032449, #0B77F0)"
                                }} className='pb-[4px] '
                                >
                                    <p className='bg-black py-[32px] md:px-[24px] hidden md:block'>   STATUS</p>
                                </div>
                            </th>
                        </tr>
                    </thead>


                    <tbody>
                        {loading ? (
                            <tr  >
                                <td colSpan={3}>

                                    <div className="w-full h-[40vh] w-full text-white flex-col flex items-center justify-center">
                                        <ReactLoading type='spin' color='#0B77F0' height={60} width={37} />
                                        Loading ...
                                    </div>
                                </td>
                            </tr>
                        ) : data && data?.gamesCreated.fetchRes?.map((item: any, i: number) => (
                            <tr key={i}>
                                <Game  {...item} totalJudges={totalJudges} />
                            </tr>
                        ))}
                    </tbody>



                </table>

                <div style={{
                    background: "linear-gradient(90deg, #032449, #0B77F0)"
                }} className='py-[4px] '
                >
                    <div className='bg-black py-[32px] px-[24px] h-[96px] w-full flex justify-end'>

                        <Pagination handler={handler} />
                    </div>
                </div>
            </div>
        </div>
    )
}




const Game = ({ image, title, approve, rejectCount, approveCount, rejectionMessage, totalJudges }: any) => {

    return (
        <>
            <td className="flex p-2">
                <div className="rounded-full overflow-hidden border mr-2 w-[50px] h-[50px] ">

                    <img src={image.includes('http') ? image : "https://mentalmaze-game.infura-ipfs.io/ipfs/" + image} className='object-fill ' alt="" />
                </div>
                <div className='flex max-w-[30vw] p-2 gap-[8px] md:gap-6 items-center '>
                    <p className='font-droid text-[16px] truncate md:text-[24px] leading-[20px]'>
                        {title}
                    </p>
                </div>
            </td>
            <td>
                <div className='flex justify-between '>
                    <p className='text-blue-main'>
                        {approveCount}
                    </p>
                    <p className=' text-disppaprove'>
                        {rejectCount}
                    </p>
                </div>
                <div className='bg-disppaprove h-[8px] w-full rounded-[20px]'>
                    <div style={
                        {
                            width: `${totalJudges > 0 ? approveCount < 1 ? 50 : (approveCount / totalJudges * 100) : 0}%`
                        }
                    } className={`bg-blue-main h-[8px]  rounded-[20px]`}>

                    </div>
                </div>
            </td>
            <td>
                <div className='text-left px-[24px] text-blue-main font-Archivo_Regular hidden md:block'>
                    {approve ? "Live" :
                        rejectionMessage == null ? 'Voting' :
                            <p className="text-disppaprove">Disapproved</p>
                    }
                </div>
            </td>

        </>

    )
}