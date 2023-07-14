import Dot from "./../../assets/settings/Dot.svg"
import Tick from "./../../assets/settings/Tick.svg"
export interface ModeType {
    title: string,
    text: string,
    mode: string,

}
const TestProgress = ({modes}: {modes: ModeType[]}) => {
    


    const Progress = ({title, text, mode}: ModeType) => {
        return (
            <div className='flex flex-col items-center steps w-full'>
            <div className='bullet bg-white w-[32px] h-[32px] rounded-full flex justify-center items-center relative 
            before:block before:absolute before:content-[""] before:h-[4px] before:w-[120px] sm:before:w-[160px] md:before:w-[220px] lg:before:w-[265px] before:bg-blue-50 before:-right-[120px] sm:before:-right-[160px] md:before:-right-[220px] lg:before:-right-[265px]
            after:block after:absolute after:content-[""]  after:h-[4px] after:w-[120px] sm:after:w-[160px] md:after:w-[220px] lg:after:w-[265px] after  after:bg-blue-50 after:-right-[120px] sm:after:-right-[160px] md:after:-right-[220px] lg:after:-right-[265px]'>
                <img src={mode=="completed"?Tick:mode=="current"?Dot:""} />
            </div>
            <h2 className='text-[#737373] text-center hidden sm:block'>
                {title}
            </h2>
            <p className="text-center hidden sm:block">
                {text}
            </p>
            </div>
        )
    }

  return (
    <div className='relative flex justify-center gap-[16px] progrssBar w-[343px] sm:w-[550px]   md:w-[650px] lg:w-full lg:max-w-[1200px] ' >
        {modes.map((mode) => <Progress {...mode}/>)}
    </div>
  )
}




export default TestProgress