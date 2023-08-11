import { Instruction } from "../../../../component/Ui";
import Input from "../../../../component/ui/Input";
import { FiUploadCloud } from "react-icons/fi";
// import { useSearchParams } from "react-router-dom";
import useQuery from "../../../../hooks/useQuery";


const GameDetails = ({handleClick}: {handleClick: () => void}) => {
    // const [searchParams] = useSearchParams();
    const {width} = useQuery()

    const numbers = [];
    for (let i = 1; i < 11; i++) {
  numbers.push(i);
  }
  console.log(numbers)

    console.log("displaying")
    return (
        <div className=''>
            <div className='px-[16px] md:px-[48px]'>
                <div className='text-white '>
                    <Input title='Title of Game' placeholder='Please enter the game title' />
                    <Instruction />
                </div>
                <div className='w-full mt-[32px]'>
                    <p className='text-[14px] md:text-base font-Archivo_Regular leading-[15px] md:leading-[17.41px] text-white mb-[4px] md:mb-[8px]'>Game's Cover</p>
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

                    <div className="flex justify-end mt-[32px] font-Archivo_Regular w-full ">
                    <div className={`relative  ${width > 730?"left-[105px]":""} `} >
                    {numbers.slice(0, width>730?10:4).map((num) =>
                    
                    <button className={`relative text-white rounded-[8px] w-[27px] h-[30px] text-[12px] md:text-base md:w-[48px] md:h-[40px] p-[2px] border-solid shadow-lg`}

                    style={{
                        // transform: `translateX(${num * -15}px)`,
                        right: `${num * 15}px`,
                        background: "linear-gradient( rgba(3, 36, 73, 1), rgba(11, 119, 240, 1))",
                        
                    }}
                    >
                    <button  className={` w-full h-full rounded-[10px] ${num == (width > 730 ?numbers.length:4)?"bg-blue-100":"bg-blue-70"}`}>
                        {num}</button>
                        </button>)}
                    </div>
                    <button style={{
                        background: 'var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))'
                    }}
                    className="text-white py-[10px] text-[14px] md:text-base px-[16px] rounded-[8px] border-[1px] border-blue-main shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] block"
                    >
                     +  Add question
                    </button>
                    </div>

                    <div className='text-white '>
                        <Input title="Game's Instruction?" placeholder='Please enter the Instruction of your game' />
                        <Instruction />
                    </div>


                    <div className='w-full mt-[32px]'>
                        <div className="flex justify-between text-white font-Archivo_Regular mb-2">
                    <p className='text-[14px] md:text-base font-Archivo_Regular leading-[15px] md:leading-[17.41px] text-white mb-[4px] md:mb-[8px]'>Game Question</p>
                    <button style={{
                        background: 'var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))'
                    }}
                    className="py-[10px] px-[16px] rounded-[8px] border-[1px] border-blue-main shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)]"
                    >
                        + Type question instead
                    </button>
                    </div>
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
                    
                    <div>
                        <p className='leading-[17.41px] font-Archivo_Regular  text-white text-inherit font-normal mt-[48px] mb-[8px]'>{"Available  Options"}</p>
                        <div className='flex gap-[16px]'>
                            {[3, 3, 3, 3].map((item) => <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'>
                                <input type="number" placeholder={item.toLocaleString()} className={`border-none outline-none bg-inherit px-[24px] w-full h-full placeholder:font-[300] placeholder:font-Archivo_Regular text-center`} />
                            </div>)}
                        </div>
                        <Instruction />
                    </div>
                    <div className='text-white '>
                    <Input title='Answer to the game' placeholder='' />
                    <Instruction />
                </div>
                    <div className='flex justify-end mt-[24px] md:mt-0'>
                        <button className='float-left bg-black text-white 
                font-Archivo-Bold font-semibold px-[16px] py-[10px] rounded-[8px] border-solid border-blue-main border-[1px] text-[14px] md:text-base'>Delete Question</button>
                    </div>
                </div>


                <div className='text-white '>
                    <Input title='What is the duration of the game?' placeholder='' />
                    <Instruction />
                </div>
                <div className='mt-[48px]'>
                    <button className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px]" 
                    onClick={() => handleClick()}
                    >
                        YES, ADD EXAMPLES
                    </button>
                </div>
                <div className='mt-[48px]'>
                    <button className="w-full  text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px]" 
                    onClick={() => handleClick()}
                    >
                        NO, PROCEED
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameDetails

