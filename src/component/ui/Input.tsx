
const Input = ({placeholder, title, center}:{placeholder: string, title?:string, center?:boolean}) => {
  return (
    <div className=' w-full  flex flex-col'>
        <p className='leading-[17.41px] font-Archivo_Regular mb-[8px] mt-[48px] text-inherit font-normal text-[14px] md:text-base'>{title}</p>
        <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[56px] md:h-[64px] text-white'>
        <input type="text" placeholder={placeholder} className={`border-none outline-none bg-inherit ${!center&&'px-[24px]'} w-full h-full placeholder:font-[300] placeholder:text-[15px] md:placeholder:text-base placeholder:font-Archivo_Regular ${center?"text-center":"text-left"}`}/>
        </div>
    </div>
  )
}

export default Input