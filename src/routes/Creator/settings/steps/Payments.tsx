
import { useContext } from "react"
import Input from "../../../../component/ui/Input"
import { HiPlus } from "react-icons/hi"
import { UserContext } from "../../../../context/UserContext"

const Payments = ({handleClick}: {handleClick: () => void}) => {
    const {gameToken,setGameToken, priceShare,setPriceShare,comments,setComments}:any = useContext(UserContext)

    const updatePriceShare = (index:any, newValue:any) => {
        const updatedArray = [...priceShare]; // Create a copy of the current array
        updatedArray[index] = newValue; // Update the element at the specified index
        setPriceShare(updatedArray); // Update the state with the new array
      };

      console.log(priceShare)
    
    return (
        <div className='px-[16px] md:px-[48px]'>
            <div className=' text-white '>
                <Input 
                title='How much do you want to dedicate to  this project?' 
                placeholder='Please enter the terms of Aurora Token'
                setValue={setGameToken}
                value={gameToken}
                />
                <p className='font-[300] text-wb-40 font-Archivo_Regular mt-[8px] leading-[17.41px] text-[14px] md:text-[16px]'> e.g 3 Aurora Token</p>
                <div>
                    <div className='flex justify-between items-end md:items-center mt-[32px] flex-col md:flex-row'>
                        <p className='font-Archivo_Regular leading-[17.41px] text-white font-normal order-2 md:order-1'>How do you want the price shared amongst the runner-up?</p>
                        <button className='mb-[24px] md:mb-0 order-1 md:order-2 flex items-center text-white font-Inter_Regular font-medium text-[14px] gap-[8px] py-[10px] px-[16px] settingsFormbutton rounded-lg '>
                            <HiPlus />  Add more runner Up
                        </button>
                    </div>
                    <div className='flex w-full justify-between items-center gap-[16px] text-blue-50 mt-[30px]'>
                        <label 
                        className="flex-1"
                        htmlFor="
                        ">
                            <p>1st - Position</p>
                            <input
                             className='bg-[inherit] outline-none border-blue-main border-[2px] p-[10px] rounded-[8px] border-solid h-[64px] text-white w-full'
                             value={priceShare[0]}
                             onChange={(e)=>updatePriceShare(0, e.target.value)}
                        />
                        </label>
                        <label htmlFor=""
                        className="flex-1"
                        >
                            <p>2nd - Position</p>
                            <input
                            type="text"
                            value={priceShare[1]}
                            onChange={(e) => updatePriceShare(1, e.target.value)}
                             className='bg-[inherit] border-blue-main outline-none border-[2px] p-[10px] rounded-[8px] border-solid h-[64px] text-white w-full'

                        />
                        </label>
                        <label htmlFor=""
                        className="flex-1"
                        >
                            <p>3rd - Position</p>
                            <input
                            value={priceShare[2]}
                            onChange={(e) => updatePriceShare(2, e.target.value)}
                             className='bg-[inherit] border-blue-main border-[2px] outline-none p-[10px] rounded-[8px] border-solid h-[64px] text-white w-full'

                        />
                        </label>
                    </div>
                    <Input
                        value={comments}
                        setValue={setComments}
                        title='Any Comments?'
                        placeholder='Any comments that can help the players understand the game better?'
                    />
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