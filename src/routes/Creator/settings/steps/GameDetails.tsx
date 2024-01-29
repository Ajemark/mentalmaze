import { Instruction } from "../../../../component/Ui";
import Input, { InputTextBox } from "../../../../component/ui/Input";
import { FiUploadCloud } from "react-icons/fi";
import ReactLoading from 'react-loading';
import { useContext, useState } from "react";
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



const GameDetails = ({ handleClick }: { handleClick: (int: number) => void }) => {
  const [imageText, setImageText] = useState('')
  const [imageQText, setImageQText] = useState('')
  const [errorMessage, setErrorMessage] = useState({
    message: '',
    where: ''
  })
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingQ, setIsUploadingQ] = useState(false)
  const [numbers, setNumbers] = useState([1])
  const [questions, setQuestions]: any = useState({})
  const [curquestion, setCurQuestion]: any = useState({})
  const [curIndex, setCurIndex]: any = useState()
  const [description, setDescription]: any = useState('')
  const [questionsArray, setQuestionsArray]: any = useState([])


  const { title, setTitle, typeQuestion, setTypeQuestion, questionObj, setQuestionObj, duration, setDuration, images, setImages }: any = useContext(UserContext)

  const uploadImage = async (event: any, type: any) => {
    event.preventDefault();
    setErrorMessage({ message: '', where: "image2" })
    setErrorMessage({ message: '', where: "image1" })


    const form = event.target as HTMLFormElement;
    const files = (form[0] as HTMLInputElement).files;

    if (!files || files.length === 0) {
      if (type == 'question') {
        setErrorMessage({ message: 'Please Select An Image', where: "image2" })
        return
      }
      setErrorMessage({ message: 'Please Select An Image', where: "image1" })
      return
    }
    if (type == 'question')
      setIsUploadingQ(true)
    if (type != 'question')
      setIsUploading(true)

    const file = files[0];
    const result = await (ipfs as IPFSHTTPClient).add(file);
    if (type == 'question') {
      setQuestions((prev: any) => ({ ...prev, question: 'https://mentalmaze-game.infura-ipfs.io/ipfs/' + result.cid.toString() }))
      setCurQuestion((prev: any) => ({ ...prev, image: 'https://mentalmaze-game.infura-ipfs.io/ipfs/' + result.cid.toString() }))
      setIsUploadingQ(false)
      form.reset();
      return
    }
    setImages('https://mentalmaze-game.infura-ipfs.io/ipfs/' + result.cid.toString());
    setIsUploading(false)
    form.reset();
  };

  const handleOptionsChange = (index: number, newValue: string) => {
    const updatedOptions = curquestion.options ? [...curquestion.options] : ['', '', '', ''];
    updatedOptions[index] = newValue;
    setQuestions({ ...questions, options: updatedOptions });
    setCurQuestion((prev: any) => ({ ...prev, options: updatedOptions }));
  };

  const data = {
    gameTitle: title,
    gameCover: images,
    difficultyLevel: questionObj.difficultyLevel,
    questions: questionsArray,
    gameDuration: duration,
    description
  }


  console.log(questionsArray)
  console.log(curquestion)

  console.log(curIndex)

  return (
    <div className=''>
      <div className='px-[16px] md:px-[48px]'>
        <div className='text-white '>
          <Input
            type="text"
            title='Title of Game'
            value={questionObj.gameTitle}
            setValue={setTitle}
            placeholder='Please enter the game title' />
          <Instruction />
        </div>
        <div className='w-full mt-[32px]'>

          <p className='text-[14px] md:text-base font-Archivo_Regular leading-[15px] md:leading-[17.41px] text-white mb-[4px] md:mb-[8px]'>Game's Cover</p>
          {!ipfs ?
            <p>Not connected to IPFS, which is needed for image Upload</p> :
            (
              <form onSubmit={e => uploadImage(e, '')}>
                <div className='w-full bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[198px] text-white flex justify-center items-center px-[48px] md:px-0 relative'>
                  <div className='absolute w-full h-full bottom-0'>
                    {images ?
                      <div className="absolute w-full h-full bottom-0">
                        <img
                          alt={`Game cover`}
                          src={images}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                        {/* <p className="absolute t-5 b-0">Select New Image</p> */}
                      </div>
                      : isUploading ? (
                        <div className="flex items-center h-full justify-center w-full ">
                          <ReactLoading
                            type='spin' color='#0B77F0' height={60} width={37} />
                        </div>
                      ) : (
                        <div className="flex items-center h-full justify-center w-full ">
                          <label htmlFor="game-image">
                            <div className='flex flex-col items-center cursor-pointer text-[32px] md:text-[20px]'>
                              <FiUploadCloud color="#0B77F0" className="mb-[12.5px]" />
                              <p className='font-[300] text-[15px] md:text-[20px] font-Archivo_Regular text-white text-center '>
                                <span className='text-blue-main'>Click to upload</span> or drag and drop<br />
                                SVG, PNG, JPG or GIF (max. 800x400px) <br />
                                <span className="text-yellow-500">
                                  {imageText}
                                </span>
                              </p>
                            </div>
                          </label>
                          <input
                            type="file"
                            name="game-image"
                            id="game-image"
                            className='hidden'
                            accept="image/*"
                            onChange={() => {
                              setImageText('Please Click "Upload Image" Next')
                            }}
                            placeholder='Upload New' />
                        </div>
                      )
                    }

                  </div>
                </div>
                <button
                  type="submit"
                  style={{
                    background: 'var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))'
                  }}
                  className="mx-auto mt-[10px] text-white py-[10px] text-[14px] md:text-base px-[16px] rounded-[8px] border-[1px] border-blue-main shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] block"
                >Upload Image</button>
                {errorMessage.message != '' && errorMessage.where == "image1" && <p className="text-red-500">{errorMessage.message}</p>}
              </form>
            )
          }

          <Instruction />
        </div>

        <p className='mt-[50px] text-white mb-[10px]'>What level do you want to set up?</p>
        <div className='text-white flex w-full justify-between items-center gap-6'>
          <button
            style={{
              backgroundColor: `#${curquestion?.difficultyLevel == 'Easy' ? "0855AB" : '0D0D0D'}`
            }}
            onClick={() => {
              setQuestions({})
              setCurQuestion((prev: any) => ({ ...prev, difficultyLevel: 'Easy' }))
              setQuestionObj((prev: any) => ({ ...prev, difficultyLevel: 'Easy' }))
            }}
            className={`hover:bg-[#0855AB] border-2 border-blue-main rounded-xl h-[70px] px-[30px] flex-1`}>
            Easy
          </button>
          <button
            style={{
              backgroundColor: `#${curquestion?.difficultyLevel == 'Medium' ? "0855AB" : '0D0D0D'}`
            }}
            onClick={() => {
              setQuestions({})
              setCurQuestion((prev: any) => ({ ...prev, difficultyLevel: 'Medium' }))
              setQuestionObj({ ...questionObj, difficultyLevel: 'Medium' })
            }}
            className={`border-2 border-blue-main hover:bg-[#0855AB] rounded-xl h-[70px] px-[30px] flex-1`}
          >
            Medium
          </button>
          <button style={{
            backgroundColor: `#${curquestion?.difficultyLevel == 'Difficult' ? "0855AB" : '0D0D0D'}`
          }}
            onClick={() => {
              setQuestions({})
              setCurQuestion((prev: any) => ({ ...prev, difficultyLevel: 'Difficult' }))
              setQuestionObj({ ...questionObj, difficultyLevel: 'Difficult' })
            }}
            className={`border-2 border-blue-main rounded-xl hover:bg-[#0855AB] h-[70px] px-[30px] flex-1`}
          >
            Difficult
          </button>
        </div>

        <div className='border-solid border-blue-main border-[2px] rounded-[8px] px-[12px] md:px-[32px] mt-[32px] pb-[48px]'>

          <div className="">
            <div className="flex  items-center justify-end mt-[32px] font-Archivo_Regular w-full ">

              <div className={`relative flex  `} >
                {numbers.map((num, i) =>
                  <div key={i} className={`relative text-white rounded-[8px] w-[27px] h-[30px] text-[12px] md:text-base md:w-[48px] md:h-[40px] p-[2px] -ml-[15px] border-solid shadow-lg`}
                    style={{
                      background: "linear-gradient( rgba(3, 36, 73, 1), rgba(11, 119, 240, 1))",
                    }}
                  >
                    <button
                      onClick={() => {
                        setCurIndex(num - 1)
                        setCurQuestion(questionsArray[num - 1])
                      }} className={` w-full h-full rounded-[10px] ${num == ((curIndex + 1) || numbers.length) ? "bg-blue-100" : "bg-blue-70"}`}>
                      {num}</button>
                  </div>)}
              </div>


              <button
                onClick={() => {
                  setErrorMessage({ message: '', where: 'add' })
                  let updateQuestion = true;


                  if (curIndex != undefined) {
                    console.log('first')
                    console.log(curIndex)
                    const update = questionsArray
                    update[curIndex] = curquestion
                    setQuestionsArray(update)
                    setCurIndex()
                    setCurQuestion({})
                    return
                  }

                  if (Object.entries(questions).length != 4) {
                    setErrorMessage({ message: 'Please Enter All Question Details', where: 'add' })
                    return
                  }
                  for (const object in Object.entries(questions)) {
                    const curObject: any = Object.entries(Object.entries(questions)[object])[1][1]
                    if (curObject == '') {
                      updateQuestion = false
                      return
                    }
                    if (typeof curObject == 'object' && curObject.length > 2) {
                      curObject.map((cur: any) => {
                        if (cur == '') {
                          updateQuestion = false
                          return
                        }
                      })
                    }
                  }

                  if (!updateQuestion) {
                    setErrorMessage({ message: 'Please Enter All Question Details', where: 'add' })
                    return
                  }


                  setQuestionsArray((prev: any) => [...prev, {
                    answer: questions.answer,
                    image: questions.question.toString(),
                    title: questions.gameInstruction,
                    options: questions.options,
                    difficultyLevel: questionObj.difficultyLevel
                  }])

                  setQuestions({})
                  setCurQuestion({})
                  setNumbers((prev: any) => {
                    return [...prev, ((prev[prev.length - 1]) + 1)]
                  })
                }}
                style={{
                  background: 'var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))'
                }}
                className="z-[1000000] ml-3 cursor-pointer text-white py-[10px] text-[14px] md:text-base px-[16px] rounded-[8px] border-[1px] border-blue-main shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] block"
              >
                +  Add question
              </button>

            </div>
            {errorMessage.message != '' && errorMessage.where == 'add' && <p className="text-red-500 mt-2 text-right">{errorMessage.message}</p>}
          </div>


          <div className='text-white'>
            <label htmlFor="">
              <p>Game Instruction</p>
              <input
                type="text"
                className="mt-[10px] bg-[inherit] border-blue-main border-[2px] w-full p-[10px] rounded-[8px] border-solid h-[56px] md:h-[64px] text-white outline-none"
                value={curquestion?.title ?? ''}
                onChange={(e) => {
                  setQuestions((prev: any) => ({ ...prev, gameInstruction: e.target.value }))
                  setCurQuestion((prev: any) => ({ ...prev, title: e.target.value }))
                }}
                placeholder='Please enter the Instruction of your game' />
            </label>
            <Instruction />
          </div>

          <div className='w-full mt-[32px]'>
            <div className="flex justify-between text-white font-Archivo_Regular mb-2">
              <p className='text-[14px] md:text-base font-Archivo_Regular leading-[15px] md:leading-[17.41px] text-white mb-[4px] md:mb-[8px]'>Game Question</p>
              <button
                onClick={() => setTypeQuestion(!typeQuestion)}
                style={{
                  background: 'var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))'
                }}
                className="py-[10px] px-[16px] rounded-[8px] border-[1px] border-blue-main shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)]"
              >
                + {typeQuestion ? "Upload Image Instaed" : 'Type question instead'}
              </button>
            </div>

            {typeQuestion && <input
              className="mt-[10px] bg-[inherit] border-blue-main border-[2px] w-full p-[10px] rounded-[8px] border-solid h-[56px] md:h-[64px] text-white outline-none"
              value={curquestion?.image ?? ''}
              onChange={(e) => {
                setQuestions((prev: any) => ({ ...prev, question: e.target.value }))
                setCurQuestion((prev: any) => ({ ...prev, image: e.target.value }))
              }}
              title="Type Question"
              placeholder="Type your question"
            />}

            {!typeQuestion &&
              <form onSubmit={e => uploadImage(e, 'question')}>
                <div className='w-full bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[198px] text-white flex justify-center items-center px-[48px] md:px-0 relative'>
                  <div className='absolute w-full h-full bottom-0'>
                    {questions.question ?
                      <div className="absolute w-full h-full bottom-0">
                        <img
                          alt={`Game cover`}
                          src={curquestion?.image}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                        {/* <p className="absolute t-5 b-0">Select New Image</p> */}
                      </div>
                      : isUploadingQ ? (
                        <div className="flex items-center h-full justify-center w-full ">
                          <ReactLoading
                            type='spin' color='#0B77F0' height={60} width={37} />
                        </div>
                      ) : (
                        <div className="flex items-center h-full justify-center w-full ">
                          <label htmlFor="questionCover">
                            <div className='flex flex-col items-center cursor-pointer text-[32px] md:text-[20px]'>
                              <FiUploadCloud color="#0B77F0" className="mb-[12.5px]" />
                              <p className='font-[300] text-[15px] md:text-[20px] font-Archivo_Regular text-white text-center '>
                                <span className='text-blue-main'>Click to upload</span> or drag and drop<br />
                                SVG, PNG, JPG or GIF (max. 800x400px) <br />
                                <span className="text-yellow-200">
                                  {imageQText}
                                </span>
                              </p>
                            </div>
                          </label>
                          <input
                            type="file"
                            name="questionCover"
                            id="questionCover"
                            className='hidden'
                            accept="image/*"
                            onChange={() => {
                              setImageQText('Please Click "Upload Image" Next')
                            }}
                            placeholder='Upload New' />
                        </div>
                      )
                    }

                  </div>
                </div>
                <button
                  type="submit"
                  style={{
                    background: 'var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))'
                  }}
                  className="mx-auto mt-[10px] text-white py-[10px] text-[14px] md:text-base px-[16px] rounded-[8px] border-[1px] border-blue-main shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] block"
                >Upload Image</button>
                {errorMessage.message != '' && errorMessage.where == "image2" && <p className="text-red-500">{errorMessage.message}</p>}
              </form>
            }
            <Instruction />
          </div>

          <div>
            <p className='leading-[17.41px] font-Archivo_Regular  text-white text-inherit font-normal mt-[48px] mb-[8px]'>{"Available  Options"}</p>
            <div className='flex gap-[16px]'>
              {['', '', '', ''].map((_, index: any) => {
                return (
                  <div key={index} className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'>
                    <input
                      key={index}
                      type="text"
                      value={curquestion?.options ? curquestion?.options[index] : ''}
                      placeholder={`option ${index + 1}`}
                      className={`border-none outline-none bg-inherit px-[24px] w-full h-full placeholder:font-[300] placeholder:font-Archivo_Regular text-center`}
                      onChange={(e) => handleOptionsChange(index, e.target.value)}
                    />
                  </div>
                )
              })}
            </div>
            <Instruction />
          </div>
          <div className='text-white mt-[30px]'>
            <p className='font-Archivo_Regular'>Answer to the game</p>
            <input
              className="mt-[10px] bg-[inherit] border-blue-main border-[2px] w-full p-[10px] rounded-[8px] border-solid h-[56px] md:h-[64px] text-white outline-none"
              onChange={(e) => {
                setQuestions((prev: any) => ({ ...prev, answer: e.target.value }))
                setCurQuestion((prev: any) => ({ ...prev, answer: e.target.value }))
              }}
              value={curquestion?.answer ?? ''}
              placeholder='Please enter the answer to this question' />
            <Instruction />
          </div>
          <div className='flex justify-end mt-[24px] md:mt-0'>
            <button onClick={() => {
              setQuestionsArray((prev: any) => prev.slice(0, prev.length - 1))
              setNumbers(prev => prev.length > 1 ? prev.slice(0, prev.length - 1) : [1])
            }} className='float-left bg-black text-white 
                font-Archivo-Bold font-semibold px-[16px] py-[10px] rounded-[8px] border-solid border-blue-main border-[1px] text-[14px] md:text-base'>Delete Question</button>
          </div>
        </div>

        <div className='text-white '>
          <Input
            type="number"
            title='What is the duration of the game?'
            placeholder='Game duration in hours'
            value={duration}
            setValue={setDuration}
          />
          <Instruction />
        </div>

        <div className='text-white '>
          <InputTextBox
            title='Briefly Describe Your Game'
            placeholder='Game Description '
            value={description}
            setValue={setDescription}
          />
          <Instruction />
        </div>

        <div className='mt-[48px]'>
          <button className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px]"
            onClick={() => {
              setErrorMessage({ message: '', where: 'proceed' })
              console.log(data)
              if (Object.entries(data).length == 6) {
                for (const index in Object.entries(data)) {
                  let object = Object.entries(data)[index]
                  if (object[1] == '' || !object[1]) {
                    setErrorMessage({ message: 'Enter all Details. Did You Add A Question Already?', where: 'proceed' })
                    return
                  }
                }
                setImages({})
                setQuestionObj(data)
                handleClick(2)
              } else
                setErrorMessage({ message: 'Enter all Details. Did You Add A Question Already?', where: 'proceed' })
            }}
          >
            PROCEED
          </button>
          {errorMessage.message != '' && errorMessage.where != 'add' && <p className="text-red-500 mt-2 text-center">{errorMessage.message}</p>}

        </div>
      </div>
    </div>
  )
}

export default GameDetails

