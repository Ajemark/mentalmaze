import { Instruction } from "../../../../component/Ui";
import Input from "../../../../component/ui/Input";
import { FiUploadCloud } from "react-icons/fi";
// import { useSearchParams } from "react-router-dom";
import useQuery from "../../../../hooks/useQuery";
import { useContext, useEffect } from "react";
import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { UserContext } from "../../../../context/UserContext";

const projectId = import.meta.env.VITE_REACT_APP_INFURA_IPFS_KEY
const projectSecretKey = import.meta.env.VITE_REACT_APP_INFURA_IPFS_SECRET_KEY

const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);


let ipfs: IPFSHTTPClient | undefined;

try {
    ipfs = create({
        url: "https://ipfs.infura.io:5001",
        headers: {
            authorization,
        },
    });
} catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
}

const GameDetails = ({ handleClick }: { handleClick: () => void }) => {
    // const [image,setImage] = useState<File | null>(null)
    // const [images, setImages] = useState<{ cid: CID, path: string }>()


const {title, setTitle, typeQuestion, setTypeQuestion, questionObj,setQuestionObj, duration, setDuration, questions,images,setImages,setQuestions}:any = useContext(UserContext)

    const onSubmitHandler = async (event: any) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const files = (form[0] as HTMLInputElement).files;

        if (!files || files.length === 0) {
            return alert("No files selected");
        }

        const file = files[0];
        console.log(file)
        // upload files
        const result = await (ipfs as IPFSHTTPClient).add(file);

        setImages(
            {
                cid: result.cid,
                path: result.path,
            },
        );

        form.reset();
    };
    
    console.log(`https://mentalmaze-game.infura-ipfs.io/ipfs/${images && images.cid.toString()}`)

    const { width } = useQuery()

    useEffect(()=>{
        if(questions.length !== 0){
            setQuestionObj({
                image:'',
                options:['','','',''],
                answer:'',
                difficultyLevel:'',
                title:''
            })
        }
    },[questions])

    

    
    const numbers = [];
    for (let i = 1; i < 11; i++) {
        numbers.push(i);
    }
    console.log(numbers)
    console.log(title)

    console.log("displaying")
    console.log(questionObj)
    console.log(questions)

    const handleOptionsChange = (index: number, newValue: string) => {
        const updatedOptions = [...questionObj.options]; // Create a copy of the options array
        updatedOptions[index] = newValue; // Update the value at the specified index
        setQuestionObj({ ...questionObj, options: updatedOptions }); // Update the state
      };

    return (
        <div className=''>
            <div className='px-[16px] md:px-[48px]'>
                <div className='text-white '>
                    <Input
                        title='Title of Game'
                        value={title}
                        setValue={setTitle}
                        placeholder='Please enter the game title' />
                    <Instruction />
                </div>
                <div className='w-full mt-[32px]'>

                    <p className='text-[14px] md:text-base font-Archivo_Regular leading-[15px] md:leading-[17.41px] text-white mb-[4px] md:mb-[8px]'>Game's Cover</p>
                    {!ipfs ? <p>Not connected to IPFS, which is needed for image Upload</p> : (
                        <form onSubmit={onSubmitHandler}>
                            <div className='w-full bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[198px] text-white flex justify-center items-center px-[48px] md:px-0 relative'>
                                <div className='absolute w-[130px] h-[30px] bottom-0'>
                                       {images && <img
                                            alt={`Game cover`}
                                            src={`https://mentalmaze-game.infura-ipfs.io/ipfs/${images && images.cid.toString()}`}
                                            style={{width:'100%',height:'100%', objectFit:'contain'}}
                                        />
                                       } 
                                    
                                </div>
                                <label htmlFor="game-image">
                                    <div className='flex flex-col items-center cursor-pointer text-[32px] md:text-[20px]'>
                                        <FiUploadCloud color="#0B77F0" className="mb-[12.5px]" />
                                        <p className='font-[300] text-[15px] md:text-[20px] font-Archivo_Regular text-white text-center '>
                                            <span className='text-blue-main'>Click to upload</span> or drag and drop<br />
                                            SVG, PNG, JPG or GIF (max. 800x400px)
                                        </p>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    name="game-image"
                                    id="game-image"
                                    className='hidden'
                                    accept="image/*"
                                    // onChange={handleImageChange} 
                                    placeholder='Upload New' />


                            </div>
                            <button
                               type="submit"
                                style={{
                                    background: 'var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))'
                                }}
                                className="mx-auto mt-[10px] text-white py-[10px] text-[14px] md:text-base px-[16px] rounded-[8px] border-[1px] border-blue-main shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] block"
                            >Upload Image</button>
                        </form>
                    )
                    }

                    <Instruction />
                </div>

                <p className='mt-[50px] text-white mb-[10px]'>What level do you want to set up?</p>
                <div className='text-white flex w-full justify-between items-center gap-6'>
                    <button 
                    onClick={()=>setQuestionObj((prev:any)=>({...prev,difficultyLevel:'Easy'}))}
                    className='hover:bg-[#0D0D0D] border-2 border-blue-main rounded-xl bg-[#0855AB] h-[70px] px-[30px] flex-1 '>
                        Easy
                    </button>
                    <button
                    onClick={()=>setQuestionObj({...questionObj,difficultyLevel:'Normal'})}
                    className='border-2 border-blue-main hover:bg-[#0D0D0D] rounded-xl bg-[#0855AB] h-[70px] px-[30px] flex-1'
                    >
                        Normal
                    </button>
                    <button
                    onClick={()=>setQuestionObj({...questionObj,difficultyLevel:'Difficult'})}
                    className='border-2 border-blue-main rounded-xl hover:bg-[#0D0D0D] bg-[#0855AB] h-[70px] px-[30px] flex-1'
                    >
                        Difficult
                    </button>
                </div>

                <div className='border-solid border-blue-main border-[2px] rounded-[8px] px-[12px] md:px-[32px] mt-[32px] pb-[48px]'>

                    <div className="flex justify-end mt-[32px] font-Archivo_Regular w-full ">
                        <div className={`relative  ${width > 730 ? "left-[105px]" : ""} `} >
                            {numbers.slice(0, width > 730 ? 10 : 4).map((num) =>

                                <button className={`relative text-white rounded-[8px] w-[27px] h-[30px] text-[12px] md:text-base md:w-[48px] md:h-[40px] p-[2px] border-solid shadow-lg`}

                                    style={{
                                        // transform: `translateX(${num * -15}px)`,
                                        right: `${num * 15}px`,
                                        background: "linear-gradient( rgba(3, 36, 73, 1), rgba(11, 119, 240, 1))",

                                    }}
                                >
                                    <button className={` w-full h-full rounded-[10px] ${num == (width > 730 ? numbers.length : 4) ? "bg-blue-100" : "bg-blue-70"}`}>
                                        {num}</button>
                                </button>)}
                        </div>
                        <button
                         
                        onClick={()=>setQuestions((prev:any)=>[...prev,questionObj])}
                        style={{
                            background: 'var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))'
                        }}
                            className="z-[1000000] cursor-pointer text-white py-[10px] text-[14px] md:text-base px-[16px] rounded-[8px] border-[1px] border-blue-main shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] block"
                        >
                            +  Add question
                        </button>
                    </div>

                    <div className='text-white'>
                        <label htmlFor="">
                        <p>Game Instruction</p>
                        <input 
                        className="mt-[10px] bg-[inherit] border-blue-main border-[2px] w-full p-[10px] rounded-[8px] border-solid h-[56px] md:h-[64px] text-white outline-none" 
                        value={questionObj.title}
                        onChange={(e)=>setQuestionObj((prev:any)=>({...prev,title:e.target.value}))}
                        placeholder='Please enter the Instruction of your game' />
                        </label>
                        <Instruction />
                    </div>


                    <div className='w-full mt-[32px]'>
                        <div className="flex justify-between text-white font-Archivo_Regular mb-2">
                            <p className='text-[14px] md:text-base font-Archivo_Regular leading-[15px] md:leading-[17.41px] text-white mb-[4px] md:mb-[8px]'>Game Question</p>
                            <button
                                onClick={() => setTypeQuestion(true)}
                                style={{
                                    background: 'var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))'
                                }}
                                className="py-[10px] px-[16px] rounded-[8px] border-[1px] border-blue-main shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)]"
                            >
                                + Type question instead
                            </button>
                        </div>

                        {typeQuestion && <input
                              className="mt-[10px] bg-[inherit] border-blue-main border-[2px] w-full p-[10px] rounded-[8px] border-solid h-[56px] md:h-[64px] text-white outline-none"
                            value={questionObj.image}
                            onChange={(e)=>setQuestionObj((prev:any)=>({...prev,image:e.target.value}))}
                            title="Type Question"
                            placeholder="Type your question"
                        />}

                        {!typeQuestion && <div className='w-full bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[198px] text-white flex justify-center items-center px-[48px] md:px-0'>
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
                        </div>}
                        <Instruction />
                    </div>

                    <div>
                        <p className='leading-[17.41px] font-Archivo_Regular  text-white text-inherit font-normal mt-[48px] mb-[8px]'>{"Available  Options"}</p>
                        <div className='flex gap-[16px]'>
                            {/* <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'> */}
                            {questionObj.options.map((option:any, index:any) => (
                                <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'>
                                <input
                                    key={index}
                                    type="text"
                                    placeholder={`option ${index+1}`}
                                    className={`border-none outline-none bg-inherit px-[24px] w-full h-full placeholder:font-[300] placeholder:font-Archivo_Regular text-center`}
                                    value={option}
                                    onChange={(e) => handleOptionsChange(index, e.target.value)}
                                />    
                                </div>
                                ))}
                            {/* </div> */}
                            
                            {/* {[3, 3, 3, 3].map((item) => <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'>
                                <input type="number" placeholder={item.toLocaleString()} className={`border-none outline-none bg-inherit px-[24px] w-full h-full placeholder:font-[300] placeholder:font-Archivo_Regular text-center`} />
                            </div>)} */}
                            {/* <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'>
                            <input 
                            type="text" 
                            max={4} 
                            placeholder='option 1' 
                            className={`border-none outline-none bg-inherit px-[24px] w-full h-full placeholder:font-[300] placeholder:font-Archivo_Regular text-center`}
                            value={questionObj.options[0]}
                            onChange={(e)=>setQuestionObj({...questionObj, 
                                options:[
                                e.target.value,
                                questionObj.options[1],
                                ...questionObj.options.slice(1)
                            ]})}
                            />
                            </div>
                            <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'>
                            <input 
                            type="text" 
                            max={4} 
                            placeholder='option 2' 
                            className={`border-none outline-none bg-inherit px-[24px] w-full h-full placeholder:font-[300] placeholder:font-Archivo_Regular text-center`} 
                            value={questionObj.options[1]}
                            onChange={(e)=>setQuestionObj({...questionObj, 
                                options:[
                                questionObj.options[0],
                                e.target.value,
                                questionObj.options[2],
                                ...questionObj.options.slice(2)
                            ]})}
                            />
                            </div>
                            <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'>
                            <input 
                            type="text" 
                            max={4} 
                            placeholder='option 3' 
                            className={`border-none outline-none bg-inherit px-[24px] w-full h-full placeholder:font-[300] placeholder:font-Archivo_Regular text-center`} 
                            value={questionObj.options[2]}
                            onChange={(e)=>setQuestionObj({
                                ...questionObj,options:[
                                    questionObj.options[0],
                                    questionObj.options[1],
                                    e.target.value,
                                    questionObj.options[3],
                                    ...questionObj.options.slice(3)
                                ]
                            })}
                            />
                            </div>
                            <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'>
                            <input 
                            type="text" 
                            max={4} 
                            placeholder='option 4' 
                            className={`border-none outline-none bg-inherit px-[24px] w-full h-full placeholder:font-[300] placeholder:font-Archivo_Regular text-center`} 
                            value={questionObj.options[3]}
                            onChange={(e)=>setQuestionObj({
                                ...questionObj,options:[
                                questionObj.options[0],
                                questionObj.options[1],
                                questionObj.options[2],
                                e.target.value,
                                questionObj.options[4]
                                ]
                            })}
                            />
                            </div>*/}
                        </div> 
                        <Instruction />
                    </div>
                    <div className='text-white mt-[30px]'>
                    <p className='font-Archivo_Regular'>Answer to the game</p>
                    <input 
                        className="mt-[10px] bg-[inherit] border-blue-main border-[2px] w-full p-[10px] rounded-[8px] border-solid h-[56px] md:h-[64px] text-white outline-none" 
                        value={questionObj.answer}
                        onChange={(e)=>setQuestionObj((prev:any)=>({...prev,answer:e.target.value}))}
                        placeholder='Please enter the answer to this question' />    
                        <Instruction />
                    </div>
                    <div className='flex justify-end mt-[24px] md:mt-0'>
                        <button className='float-left bg-black text-white 
                font-Archivo-Bold font-semibold px-[16px] py-[10px] rounded-[8px] border-solid border-blue-main border-[1px] text-[14px] md:text-base'>Delete Question</button>
                    </div>
                </div>


                <div className='text-white '>
                    <Input 
                    title='What is the duration of the game?' 
                    placeholder='Game duration in hours'
                    value={duration}
                    setValue={setDuration}
                    />
                    <Instruction />
                </div>
                {/* <div className='mt-[48px]'>
                    <button className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px]"
                        onClick={() => handleClick()}
                    >
                        YES, ADD EXAMPLES
                    </button>
                </div> */}
                <div className='mt-[48px]'>
                    <button className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px]"
                        onClick={() => handleClick()}
                    >
                        PROCEED
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameDetails

