import { useRef, useEffect } from 'react'

import Input from '../../../component/ui/Input'
import { HiPlus } from 'react-icons/hi'
import TestProgress  from '../TestProgress'
import { Instruction } from '../../../component/Ui'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { ModeType } from '../TestProgress'
// import {useFormik} from "formik"
import { FiUploadCloud } from "react-icons/fi"
export const GamedetailForm = () => {
    const [searchParams] = useSearchParams();
    const contRef = useRef<HTMLDivElement>(null)
    const [modes, setMode] = useState<ModeType[]>([{
        title: "Game Details",
        text: "Please provide your name and email",
        mode: "current",
        link: "game-details"
    },
    {
        title: "Payments",
        text: "A few details about your company",
        mode: "pending",
        link: "payments"
    }, {
        title: "Start Collaborating with your team",
        text: "Please provide your name and email",
        mode: "pending",
        link: "collaborate"
    },])

    const updateMode = (param: string): void => {
        const mode = [...modes]
        if (param == "Game Details") {
            mode[0]['mode'] = "completed"
            mode[1]['mode'] = "current"
        }
        else
            if (param == "Payments") {
                mode[1]['mode'] = "completed"
                mode[2]['mode'] = "current"
            }
        setMode(mode)
        return;
    }

    useEffect(() => {
        if (contRef) {
            contRef.current?.scrollIntoView()
        }
    }, [modes])

    return (
        <div className='' >
            <div className='mx-auto w-fit mt-[32px]' ref={contRef} >
                <TestProgress  modes={modes}/>
            </div>
            {searchParams.get('title') == "game-details"?<GameDetails next={updateMode} />:null}
            {searchParams.get('title') == "payments"?<Payments  />:null}
            {searchParams.get('title') == "collaborate"?<Submit  />:null}
            {modes[0]['mode'] == "current" ? <GameDetails next={updateMode} /> : null}
            {/* {modes[1]['mode'] == "current" ? <Payments next={updateMode} /> : null} */}
            {/* {modes[2]['mode'] == "current" ? <Submit /> : null} */}
        </div>
    )
}



const GameDetails = ({next}: {next: (value:string) => void}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get('title'))
    return (
        <div className=''>
            <div className='px-[16px] md:px-[48px]'>
                <div className='text-white '>
                    <Input title='Title of Game' placeholder='Please enter the title of your game' />
                    <Instruction />
                </div>
                <div className='w-full mt-[32px]'>
                    <p className='text-[14px] md:text-base font-Archivo_Regular leading-[15px] md:leading-[17.41px] text-white mb-[4px] md:mb-[8px]'>Upload Game Image</p>
                    <div className='w-full bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[198px] text-white flex justify-center items-center px-[48px] md:px-0'>
                        <label htmlFor="game-image">
                            <div className='flex flex-col items-center cursor-pointer text-[32px] md:text-[20px]'>
                                <FiUploadCloud color="#0B77F0" className="mb-[12.5px]" />
                                <p className='font-[300] text-[15px] md:text-[20px] font-Archivo_Regular text-white text-center '>
                                    <span className='text-blue-main'>Click to upload</span> or drag and drop<br />
                                    SVG, PNG, JPG or GIF (max. 800x400px)
                                </p>
                            </div>
                        </label>
                        <input type="file" name="game-image" id="game-image" className='hidden' accept="image/*" placeholder='Upload New' />
                    </div>
                    <Instruction />
                </div>


                <div className='border-solid border-blue-main border-[2px] rounded-[8px] px-[12px] md:px-[32px] mt-[32px] pb-[48px]'>
                    <div className='text-white '>
                        <Input title="Game's Question?" placeholder='Please enter the title of your game' />
                        <Instruction />
                    </div>
                    <div>
                        <p className='leading-[17.41px] font-Archivo_Regular  text-white text-inherit font-normal mt-[48px] mb-[8px]'>{"Available  Options"}</p>
                        <div className='flex gap-[16px]'>
                            {[3, 3, 3, 3].map((item) => <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'>
                                <input type="number" placeholder={item.toLocaleString()} className={`border-none outline-none bg-inherit px-[24px] w-full h-full placeholder:font-[300] placeholder:font-Archivo_Regular text-center`} />
                            </div>)}
                        </div>
                        <Instruction />
                    </div>
                    <div className='flex justify-end mt-[24px] md:mt-0'>
                        <button className='float-left bg-black text-white 
                font-Archivo-Bold font-semibold px-[16px] py-[10px] rounded-[8px] border-solid border-blue-main border-[1px] text-[14px] md:text-base'>Delete Question</button>
                    </div>
                </div>


                <div className='text-white '>
                    <Input title='What is the duration of the game?' placeholder='Please enter the title of your game' />
                    <Instruction />
                </div>
                <div className='mt-[48px]'>
                    <button className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px]" onClick={() => { 
                        setSearchParams({title:'payments'});
                        next("Game Details")
                }}>
                        GENERATE
                    </button>
                </div>
            </div>
        </div>
    )
}



const Submit = () => {
    return (
        <div className='px-[16px] md:px-[48px]'>
            <div className='text-[16px] md:text-[20px] font-Archivo_Regular  text-white  flex flex-col gap-6 mt-[48px] font-[200]'>
                <p className=' md:leading-[31.76px]'> Hi there!</p>
                <p className=' md:leading-[31.76px]'> I’m sure you can’t wait to have your game published. So are we, congratulations creator.</p>

                <p className=' md:leading-[31.76px]'> To be sure, your game meets all of our requirements, we will have the judges go through the game. Once they have verified the authenticity of your game guess what? It will be live.</p>

                <p className=' md:leading-[31.76px]'> And if otherwise, you have nothing to worry about, your deposit of 3 Aurora Token, will be refunded to your wallet.</p>

                <p className=' md:leading-[31.76px]'> If you need further assistance, do not hesitate to reach us on discord. Our response team, will be happy to answer any question you might have.</p>

                <p className=' md:leading-[31.76px]'> Thank you, Creator! Goodluck on your application.</p>
            </div>
            <div className=" flex flex-col gap-[24px] mt-[48px] w-full ">
                <button className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px] ">
                    SUBMIT APPLICATION
                </button>
            </div>
        </div>
    )
}


















const Payments = () => {
    return (
        <div className='px-[16px] md:px-[48px]'>
            <div className=' text-white '>
                <Input title='How much do you want to dedicate to  this project?' placeholder='Please enter the title of your game' />
                <p className='font-[300] text-wb-40 font-Archivo_Regular mt-[8px] leading-[17.41px] text-[14px] md:text-[16px]'> e.g 3 Aurora Token</p>
                <div>
                    <div className='flex justify-between items-end md:items-center mt-[32px] flex-col md:flex-row'>
                        <p className='font-Archivo_Regular leading-[17.41px] text-white font-normal order-2 md:order-1'>How do you want the price shared amongst the runner-up?</p>
                        <button className='mb-[24px] md:mb-0 order-1 md:order-2 flex items-center text-white font-Inter_Regular font-medium text-[14px] gap-[8px] py-[10px] px-[16px] settingsFormbutton rounded-lg '>
                            <HiPlus />  Add more runner Up
                        </button>
                    </div>
                    <div className='flex gap-[16px] text-blue-50'>
                        <Input center title='Ist - Position' placeholder='' />
                        <Input center title='Ist - Position' placeholder='' />
                        <Input center title='Ist - Position' placeholder='' />
                    </div>
                    <div>
                        <p className='font-Archivo_Regular text-[16px] text-white mt-[32px]'>Any comments?</p>
                        <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px]  w-full px-[24px]'>
                            <select className='w-full h-full bg-inherit text-white font-Archivo_Regular font-[300] leading-[17.41px]  outline-none border-none'>
                                <option value="Select Prefered Creator" className='w-full '>Select Prefered Creator</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-[24px] mt-[48px] w-full ">
                <button className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px]">
                    Proceed To make Deposit
                </button>
            </div>
        </div>
    )
}