import { useState } from 'react'
import Title from "./../../assets/userProfile/Title.png"
import ranking from "./../../assets/userProfile/ranking.png"
import Stars from "./../../assets/userProfile/Stars.png"
import edit from "./../../assets/userProfile/edit.png"
import Ball from "./../../assets/userProfile/Ball.png"


const UserProfile = () => {
  return (
    <div className='w-full py-[72px] home relative px-[52px] mt-[104px]'>
        <ProfileHeader />
        <Mode />
        <div className="flex mt-12 gap-[34px]">
            <Stat/><Level />
        </div>
    </div>
  )
}

export default UserProfile




const ProfileHeader = () => {
    return (
        <div className=" border-4 border-blue-80 w-full rounded-3xl bg-blue-[#010C18] flex justify-between p-5">
            <div className='absolute'>
                <img src={Stars} className='w-full h-full blur-sm'/>
            </div>
            <div className='flex items-center  gap-[50px] relative z-10'>
            <div className='rounded-2xl border-blue-90 border-4'><img src={Title} alt="" /></div>
            <div className='text-white flex flex-col items-center'>
                <p className="text-[32px] text-white font-normal font-droid">GRACE J.</p>
                <div className="font-Archivo_Regular text-sm font-normal flex justify-center gap-2 items-center">
            <div><img src={ranking} alt="" /></div>
                <div className='text-wb-40 flex gap-2 items-center'>Mode: <span className='text-white'>Solver</span></div>
                </div>
            </div>
            </div>

            <button className='flex gap-4 text-white font-Archivo_Regular border-blue-50 border-2 rounded-2xl py-4 px-6 h-fit mt-auto'>
                  <img src={edit} />
                  <p>EDIT PROFILE</p>
            </button>

        </div>
    )
}

const Mode = () => {
    const [creatorMode, setCreatorMode] = useState(false)

    return(
    <div className='flex w-full h-24 border-blue-80 border-4 rounded-3xl items-center px-6 text-white py-[10px] justify-between mt-12 relative z-[999] home'>
        <p className="font-Archivo_Regular text-[40px] font-normal">CREATOR’S MODE</p>
        <button className='h-full w-[128px] border-blue-80 rounded-[80px] p-2 border-2' onClick={() => {
            setCreatorMode(!creatorMode)
        }}>
                <div className="bg-black w-[48px] h-full rounded-[100%]" 
                style={{
                    marginLeft: !creatorMode?0:"55%",
                    
                    transition: 'all 0.5s'
                }}
                >
                </div>
        </button>
    </div>)
}

const Stat = () => {
    return (
        <div className='border-4 rounded-3xl py-4 flex flex-col gap-8 border-blue-80'>
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
        <div className='flex-1 border-blue-80 py-4 border-4 rounded-3xl '>
            <h2  className="font-Archivo-Bold text-[32px] text-white py-4 text-center border-b-blue-80 border-b-4">MY LEVEL</h2>
            <div>
            <div className='flex justify-between px-6 mt-8'>
                <div className='flex text-wb-40 text-xl gap-2 items-center'>
                    <div><img src={ranking} /></div>
                    <p className='font-Archivo_Regular'>Level 2</p>
                </div>
                <div className='flex text-white font-Archivo_Regular text-xl'>
                    200/400 MP
                </div>
            </div>
            <div className='w-full px-6'>
            <div className='w-full h-2 load mt-3  rounded-xl flex'>
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