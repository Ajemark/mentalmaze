import { useModalContext } from '../../../../context/ModalContext'

const Hurray = () => {
    const {switchModalcontent} = useModalContext()

    // const onSubmitHandler = () => {
    //     switchModalcontent('collate')
    //     setTimeout(() => switchModalcontent('congratulations'), 2000)
    // }

  return (
    <div>
         {/* <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
                Hurray You're DOne
            </h1>
            <button  className='flex items-center justify-center font-droid text-[16px] md:text-[24px] modalButton border-blue-80 border-solid border-[2px] mt-[48px] w-[218px] md:w-[368px] h-[56px] md:h-[80px] rounded-[1rem] mx-auto' onClick={onSubmitHandler}>
                SUBMIT
            </button>
            <div className='flex flex-col gap-1 font-Archivo_Regular font-normal text-[15px] md:text-[20px] mt-[126px]'>
            <p className='flex justify-center leading-[21.76px]  text-center tracking-wider'>
                    <p className='flex gap-[8px]'>Scoring More Than <p className='text-blue-80'>50%</p>
                    </p>, Unlocks</p>
                    <p className='flex justify-center leading-[21.76px]  text-center gap-[8px]'>
                    <p className='text-blue-80'>Math Puzzle</p> in the next level
                    your wallet? 
            </p>
            </div> */}
    </div>
  )
}
export default Hurray