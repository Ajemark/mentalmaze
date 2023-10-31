import { useContext, useEffect, useState } from 'react'
import ranking from "./../../assets/userProfile/ranking.png"
import Stars from "./../../assets/userProfile/Stars.png"
import edit from "./../../assets/userProfile/edit.png"
import Ball from "./../../assets/userProfile/Ball.png"
import StarsM from "./../../assets/userProfile/StarsMobile.svg"
import medalMaster from "./../../assets/Leadership/medalstarMaster.png"
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useModalContext } from '../../context/ModalContext'
import { useAccount } from 'wagmi'
// import medal from "./../../assets/Leadership/medal_star.png"



const data = [
    {
        name: "Math Puzzle",
        status: "Pending"
    },
    {
        name: "Math Puzzle",
        status: "View Result"
    },
    {
        name: "Math Puzzle",
        status: 25
    },
    {
        name: "Math Puzzle",
        status: 25
    },
    {
        name: "Math Puzzle",
        status: 25
    }
]

const RANK = ({ name, status }: { name: string, status: string | number }) => {
    return (
        <div className='flex justify-between font-droid text-[15px] md:text-[32px] font-normal px-[16px]  md:px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[16px] md:py-[24px]'>
            <div className='col-span-2 flex items-center gap-[16px] md:gap-[48px] '>
                <div className=' bg-blue-main w-[48px] h-[48px] md:w-[72px] md:h-[72px] rounded-[8px] '>

                </div>
                <div className='flex flex-col items-start text-white'> <p>{name}</p>
                </div>
            </div>
            <div className='text-white flex items-center'>
                {status == "Pending" ? "Pending" : status == "View Result" ? "View Result" : status == 25 ?
                    <div className='flex text-white text-[24px] leading-[26.11px] items-center gap-3'><img src={medalMaster} />{status.toString()}</div> : null}
            </div>
        </div>
    )
}


const RANKS = () => {
    return (
        <div className='flex-1 border-blue-80 py-4 border-4 rounded-3xl userProfileStat mt-[34px]'>
            <h2 className=" font-droidbold text-[32px] text-white py-4 text-center border-b-blue-80 border-b-4">RANK HISTORY</h2>
            <div className='md:px-[40px] px-[20px]'>
                {data.map((item) => <RANK {...item} />)}
            </div>
        </div>
    )
}


const UserProfile = () => {
    return (
        <div className='w-full  relative z-[999] px-[16px] md:px-[52px] mt-[96px] md:mt-[176px]'>
            <ProfileHeader />
            <Mode />
            <div className="flex mt-12 gap-[34px] flex-col md:flex-row w-full">
                <Stat />
                <div className='w-full'>
                    <Level />
                    <RANKS />
                </div>
            </div>
        </div>
    )
}

export default UserProfile




const ProfileHeader = () => {
    const { userDetails }: any = useContext(UserContext);
    const { switchModal, switchModalcontent, } = useModalContext()
    // const[editUser,setEditUser]=useState(false)
    const navigate = useNavigate()
    const { isConnected } = useAccount();

    console.log(isConnected)

    useEffect(() => {
        if (!userDetails.address || !isConnected) {
            navigate('/')
        }
    }, [isConnected])


    return (
        <div className="profile border-4 border-blue-80 w-full overflow-hidden rounded-3xl bg-blue-[#010C18] flex justify-between flex-col md:flex-row p-[24px] md:p-5 gap-[24px] md:gap-0 relative">
            <div className='absolute h-full w-full '>
                <img src={Stars} className='w-full h-full blur-sm hidden md:block' />
                <img src={StarsM} className='w-full h-full blur-sm block md:hidden' />

            </div>
            <div className='flex items-center  gap-[16px] md:gap-[50px] relative z-10'>
                <div className='rounded-[8px] md:rounded-2xl border-blue-90 border md:border-4'>
                    <div className='text-headerbg text-xl font-bold justify-center flex items-center bg-white rounded-[8px] w-[96px] h-[96px] md:w-[150px] md:h-[150px] overflow-hidden'>
                        {userDetails.profileImage?.length < 3 ? (
                            <p>
                                {userDetails.profileImage.toUpperCase()}
                            </p>
                        ) :
                            <img src={userDetails.profileImage && userDetails.profileImage.includes('http') ? userDetails.profileImage : "https://mentalmaze-game.infura-ipfs.io/ipfs/" + userDetails.profileImage} alt="" className='w-full h-full'
                            />
                        }
                    </div>


                </div>
                <div className='text-white flex flex-col items-center'>
                    <p className="md:text-[32px] text-white font-normal font-droid">{userDetails?.username}</p>

                    <div className="font-Archivo_Regular text-sm font-normal flex justify-center gap-2 items-center">
                        <div><img src={ranking} alt="" /></div>
                        <div className='text-wb-40 flex gap-2 items-center text-[11px] md:text-base'>Mode: <span className='text-white'>{userDetails?.role}</span></div>
                    </div>
                </div>
            </div>

            <button
                className='cursor-pointer flex gap-4 text-white font-Archivo_Regular border-blue-50 border-2 rounded-2xl py-[9.5px] px-[12px] md:py-4 md:px-6 h-fit mt-auto z-[10000000000000000]'
                onClick={() => {
                    switchModal()
                    switchModalcontent('editProfile')
                }}
            >
                <img
                    className='cursor-pointer'
                    src={edit} />
                <p>EDIT PROFILE</p>
            </button>

            {/* {editUser && } */}

        </div>
    )
}

const Mode = () => {
    const [creatorMode, setCreatorMode] = useState(false)

    return (
        <div className='flex w-full h-[70px] md:h-24 border-blue-80 border-4 rounded-3xl items-center px-6 creatorsModebuttonbg text-white py-[10px] justify-between mt-12 relative z-[999] home'>
            <p className="font-Archivo_Regular md:text-[40px] leading-[17.41px] md:leading-normal font-normal ">CREATOR’S MODE</p>
            <button className='h-full w-[64px] md:w-[128px] border-blue-80 rounded-[80px] p-2 border-2 creatorsModebutton' onClick={() => {
                setCreatorMode(!creatorMode)
            }}
                style={{
                    background: !creatorMode ? "linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%)" : "linear-gradient(130deg, #063C7A, rgba(6, 60, 122, 1))"
                }}
            >
                <div className={` w-[24px] md:w-[48px] h-full rounded-[100%] ${creatorMode ? "bg-blue-50" : "bg-black"}`}
                    style={{
                        marginLeft: !creatorMode ? 0 : "55%",

                        transition: 'all 0.5s'
                    }}
                >
                </div>
            </button>
        </div>)
}

const Stat = () => {
    return (
        <div className='border-4 rounded-3xl py-4 flex flex-col gap-8 border-blue-80 userProfileStat h-fit'>
            <h2 className='px-[75px] font-400 font-droidbold
            text-[2rem] text-white py-4 text-center border-b-blue-80 border-b-4'>
                STATS
            </h2>
            <div className='flex flex-col gap-8'>
                <p className='flex flex-col items-center px-[63px] py-4'>
                    <h2 className='font-400 font-Archivo-Bold text-[2rem] text-white'>4</h2>
                    <p className='font-semibold font-Archivo_Regular text-[20px] text-wb-40'>Games played</p>
                </p>
                <p className='flex flex-col items-center px-[63px] py-4'>
                    <h2 className='font-400 font-Archivo-Bold text-[2rem] text-white'>4</h2>
                    <p className='font-semibold font-Archivo_Regular text-[20px] text-wb-40'>Mission Completed</p>
                </p>
            </div>
        </div>
    )
}


const Level = () => {
    return (
        <div className='flex-1 border-blue-80 py-4 border-4 rounded-3xl userProfileStat '>
            <h2 className=" font-droidbold text-[32px] text-white py-4 text-center border-b-blue-80 border-b-4">ACHIEVEMENTS</h2>
            <div>
                <div className='flex justify-between px-[40px] mt-8'>
                    <div className='flex text-wb-40 text-xl gap-2 items-center'>
                        <div><img src={ranking} /></div>
                        <p className='font-Archivo_Regular'>Level 2</p>
                    </div>
                    <div className='flex text-white font-Archivo_Regular text-xl'>
                        200/400 MP
                    </div>
                </div>
                <div className='w-full px-[40px]'>
                    <div className='w-full h-2 level mt-3  rounded-xl flex'>
                        <div className='h-full w-1/2 bg-blue-50 rounded-xl'></div>
                        <div className='h-full flex-1 flex items-center relative right-1'>
                            <img src={Ball} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}