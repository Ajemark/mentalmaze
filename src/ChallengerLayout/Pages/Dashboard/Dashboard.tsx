import React from 'react'
import Title from "./../../../assets/challengerGames/dashboard/Title.png"
import Paginationbuttongroup from "./../../../assets/challengerGames/dashboard//Paginationbuttongroup.svg"


const games = [
    {
        image: Title,
        title: "math puzzle",
        status: "approved"
    },
    {
        image: Title,
        title: "math puzzle",
        status: "approved"
    },
    {
        image: Title,
        title: "math puzzle",
        status: "approved"
    },
    {
        image: Title,
        title: "math puzzle",

    }
]

const Dashboard = () => {
  return (
    <div className='relative text-white mt-[96px] md:mt-[176px] px-[20px]'>
        <div>
            <div className='flex justify-between mb-[72px] flex-col md:flex-row md:items-center'>
                <h2 className='font-droid text-[32px] hidden md:block'>DASHBOARD </h2>
                <h2 className='font-droid text-[16px] md:text-[32px] md:hidden'>QUESTION OF THE GAME </h2>

                <button className='bg-wb-100 px-[40px] h-[43px] md:h-[96px] font-Archivo_Regular text-[12px] mt-[24px] md:text-[20px] rounded-[16px] w-fit'>
                    VIEW PENDING GAMES
                </button>
            </div>

            <div className='grid md:grid-cols-3 gap-[24px]'>
            <div className='w-full p-[4px] rounded-[5px]' style={{
                background: "linear-gradient(90deg, #032449, #0B77F0)"
            }}>
                <div className='font-Inter_Regular w-full bg-black  py-[24px] px-[24px] ' style={{"boxShadow": "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)"}}>
                    <p className='text-blue-80 text-[14px] '>Total solved cases</p>
                    <p className='text-[36px] text-blue-main'>
                    2,420
                    </p>
                </div>
            </div>
            <div className='w-full p-[4px] rounded-[5px]' style={{
                background: "linear-gradient(90deg, #032449, #0B77F0)"
            }}>
                <div className='font-Inter_Regular w-full bg-black  py-[24px] px-[24px] ' style={{"boxShadow": "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)"}}>
                    <p className='text-blue-80 text-[14px] '>Disapproved</p>
                    <p className='text-[36px] text-blue-main'>
                    2,420
                    </p>
                </div>
            </div>
            <div className='w-full p-[4px] rounded-[5px]' style={{
                background: "linear-gradient(90deg, #032449, #0B77F0)"
            }}>
                <div className='font-Inter_Regular w-full bg-black  py-[24px] px-[24px] ' style={{"boxShadow": "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)"}}>
                    <p className='text-blue-80 text-[14px] '>Total Approved</p>
                    <p className='text-[36px] text-blue-main'>
                    2,420
                    </p>
                </div>
            </div>
            </div>
            <Games/>
        </div>
    </div>
  )
}
export default Dashboard




const Games = () => {
    return (
        <div style={{
            background: "linear-gradient(90deg, #032449, #0B77F0)"
        }} className='p-[4px] mt-[32px]'>
            <div className='bg-black'>
            <div className='grid grid-cols-2 md:grid-cols-custom  font-droid text-[20px] md:text-[36px] leading-[36px] text-blue-80'>
            <div style={{
                background: "linear-gradient(90deg, #032449, #0B77F0)"
            }} className='pb-[4px] '
            >
             <p className='bg-black py-[32px] md:px-[24px] text-center md:text-left'>   Game</p>
            </div>
            <div style={{
                background: "linear-gradient(90deg, #032449, #0B77F0)"
            }} className='pb-[4px] '
            >
             <p className='bg-black py-[32px] nd:px-[24px] text-center md:text-left'>   Voting</p>
            </div><div style={{
                background: "linear-gradient(90deg, #032449, #0B77F0)"
            }} className='pb-[4px] '
            >
             <p className='bg-black py-[32px] md:px-[24px] hidden md:block'>   STATUS</p>
            </div>
            </div>
            <div>
                {games.map((item) => <Game {...item}/> )}
            </div>
            <div style={{
                background: "linear-gradient(90deg, #032449, #0B77F0)"
            }} className='pt-[4px] '
            >
             <p className='bg-black py-[32px] px-[24px] h-[96px] w-full flex justify-end'>
                <img src={Paginationbuttongroup} />
             </p>
            </div>
            </div>
        </div>
    )
}




const Game = ({image, title, status}) => {
    return (
        <div className='grid md:grid-cols-custom grid-cols-2 p-[24px]'>
            <div className='flex gap-[8px] md:gap-6 items-center '>
                <div><img src={image} className='w-[36px] h-[36px]  md:w-[initial] md:h-[initial]' alt="" /></div>
                <p className='font-droid text-[16px] md:text-[24px] leading-[20px]'>
                {title}
                </p>
            </div>
            <div className=' md:gap-[16px] md:px-[24px]'>
                <div className='flex justify-between '>
                <p className='text-blue-main'>
                    360
                </p>
                <p className='text-[#D92D20]'>
                    120
                </p>
                </div>
                <div className='bg-[#D92D20] h-[8px] w-full rounded-[20px]'>
                    <div className="bg-blue-main h-[8px] w-[30%] rounded-[20px]">

                    </div>
                </div>
            </div>
            <div className='text-left px-[24px] text-blue-main font-Archivo_Regular hidden md:block'>
                {status =="approved"?"Live":"Disapproved"}
            </div>
        </div>
    )
}