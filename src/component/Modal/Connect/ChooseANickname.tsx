import { useRef, KeyboardEvent, useContext } from "react"
import { useModalContext } from "../../../context/ModalContext"
import Animation from "./Animation"
import { UserContext } from "../../../context/UserContext"
const ChooseANickname = () => {
  const {usernameHandler, switchModalcontent} = useModalContext()
  const inputRef = useRef<HTMLInputElement>(null);



  const onSubmit = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      if(inputRef.current?.value){
        console.log('welcome')
        usernameHandler(inputRef.current.value)
        switchModalcontent('welcome')
      }
    }
  }

  return (

    <>
      <div>
      <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
                    Choose a nickname
                </h1>
    </div>
    <Animation className='pt-[48px] flex flex-col h-full gap-[100px] px-[29.5px] md:px-0'>
          <input type="text" ref={inputRef} onKeyDown={onSubmit} placeholder='ENTER YOUR NICKNAME' className='font-[400] mb-[-20px] text-[15px] md:text-[20px] font-droid leading-[23.61px] py-[24px] px-[40px] text-[#8C8C8C] rounded-[16px] md:rounded-t-[16px] w-full bg-blue-90 md:w-[416px] mx-auto text-center' />  
    <div className='flex flex-col gap-1 font-Archivo_Regular font-normal'>
        <p className='flex justify-center leading-[21.76px] gap-2 md:text-[15px] text-center'>
        username for easy stat tracking.
        </p>
        <button className="flex items-center justify-center font-droid text-[16px] modalButton border-blue-80 border-solid border-[2px] w-[218px] h-[56px] rounded-[1rem] mx-auto" onClick={() => {
          inputRef.current && usernameHandler(inputRef.current.value)
          switchModalcontent('welcome')
        }}>
          Submit
        </button>
    </div>
    </Animation>
    </>
  )
}
export default ChooseANickname