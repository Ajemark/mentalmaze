
const Input = ({ placeholder, title, type, center, setValue, value }: { placeholder: string, title?: string, center?: boolean, type: string, value?: string, setValue?: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <div className=' w-full  flex flex-col'>
      <p className='leading-[17.41px] text-white font-Archivo_Regular mb-[8px] mt-[48px] text-inherit font-normal text-[14px] md:text-base'>{title}</p>
      <div className='bg-[inherit] border-blue-main border-[2px] rounded-[8px] border-solid h-[56px] md:h-[64px] text-white'>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          className={`border-none outline-none bg-inherit ${!center && 'px-[24px]'} w-full h-full placeholder:font-[300] placeholder:text-[15px] md:placeholder:text-base placeholder:font-Archivo_Regular ${center ? "text-center" : "text-left"}`}
          onChange={(e) => setValue && setValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Input


export const InputTextBox = ({ placeholder, title, center, setValue, value }: { placeholder: string, title?: string, center?: boolean, value?: string, setValue?: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <div className=' w-full h-auto flex flex-col'>
      <p className='leading-[17.41px] text-white font-Archivo_Regular mb-[8px] mt-[48px] text-inherit font-normal text-[14px] md:text-base'>{title}</p>
      <div className='bg-[inherit] h-auto border-blue-main border-[2px] rounded-[8px] border-solid h-[56px]   text-white'>
        <textarea
          rows={4}
          placeholder={placeholder}
          value={value}
          className={`border-none outline-none bg-inherit ${!center && 'p-[14px]'} w-full h-full placeholder:font-[300] placeholder:text-[15px] md:placeholder:text-base placeholder:font-Archivo_Regular ${center ? "text-center" : "text-left"}`}
          onChange={(e) => setValue && setValue(e.target.value)}
        ></textarea>
      </div>
    </div>
  )
}
