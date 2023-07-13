
const Input = ({placeholder, title, center}:{placeholder: string, title?:string, center?:boolean}) => {
  return (
    <div className=' w-full  flex flex-col'>
        <p className='leading-[17.41px] font-Archivo_Regular mb-[8px] mt-[48px] text-inherit font-normal'>{title}</p>
        <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[64px] text-white'>
        <input type="text" placeholder={placeholder} className={`border-none outline-none bg-inherit px-[24px] w-full h-full placeholder:font-[300] placeholder:font-Archivo_Regular ${center?"text-center":"text-left"}`}/>
        </div>
    </div>
  )
}

export default Input