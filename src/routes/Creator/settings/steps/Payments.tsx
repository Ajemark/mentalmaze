
import Input from "../../../../component/ui/Input"
import { HiPlus } from "react-icons/hi"

const Payments = ({handleClick}: {handleClick: () => void}) => {
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
                <button className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px]" onClick={() => handleClick()}>
                    Proceed To make Deposit
                </button>
            </div>
        </div>
    )
}

export default Payments