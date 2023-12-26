import nicetry from "./../../../../assets/modal/nicetry.svg"
import Animation from '../Animation'
// import clipboardText from "./../../../../assets/modal/clipboardText.svg"
import { useModalContext } from '../../../../context/ModalContext'
import { useEffect, useState } from "react"

const NiceTry = () => {
  const { switchModalcontent } = useModalContext()
  const [data, setData]: any = useState()


  useEffect(() => {

    const data = JSON.parse(localStorage.getItem('GameInfo') ?? '')
    if (data) setData(data)
  }, [])

  console.log(data)

  return (
    <div className='flex flex-col h-full '>
      <Animation className='justify-center text-center gap-[56px] max-w-[497px] mx-auto flex w-full items-center h-full px-[8px] flex-col'>
        <img src={nicetry} className="w-[88px] h-[88px] md:w-[initial] md:h-[initial]" />
        <div className="font-droid text-[15px] md:text-[32px]  leading-[17.71px] md:leading-[37.78px] w-[284px] md:w-[initial]">
          <p className="">
            Nice try you scored,<span className="text-blue-main leading-[17.71px] md:leading-[37.78px]"> {Math.round((data?.scores / data?.qLength) * 100) + '%'}. </span>
          </p>
          <p className="font-Archivo_thin text-[24px] font-[400] ">Play more modules in the easy level and score more than 50% percent to unlock the next level.</p>
        </div>
        <div>
          <button className="rounded-[16px] font-droid w-[218px] h-[56px] md:w-[251px] md:h-[80px] text-[16px] md:text-[24px] settingsFormbutton" onClick={() => switchModalcontent('getmore')}>
            VIEW Modules
          </button>
        </div>
      </Animation>
    </div>
  )
}

export default NiceTry