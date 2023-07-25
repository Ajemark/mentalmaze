import award from "./../../../../assets/modal/award.svg"
import Animation from '../Animation'
// import clipboardText from "./../../../../assets/modal/clipboardText.svg"
import { useModalContext } from '../../../../context/ModalContext'

const Congratulations = () => {
  const {switchModalcontent} = useModalContext()

  
  
  return (
    <div className='flex flex-col h-full '>
            <Animation className='justify-center text-center gap-[56px] max-w-[497px] mx-auto flex w-full items-center h-full px-[8px] flex-col'>
                <img src={award} className="w-[88px] h-[88px] md:w-[initial] md:h-[initial]"/>
                <div className="font-droid text-[15px] md:text-[32px]  leading-[17.71px] md:leading-[37.78px] w-[284px] md:w-[initial]">
                Hurray!! you scored,<span className="text-blue-main leading-[17.71px] md:leading-[37.78px]"> 56%</span>, And have unlocked module 1 in <span className="text-blue-main leading-[37.78px]">eASY level.</span> 
                </div>
                <div>
                    <button className="rounded-[16px] font-droid w-[218px] h-[56px] md:w-[251px] md:h-[80px] text-[16px] md:text-[24px] settingsFormbutton" onClick={() => switchModalcontent('getmore')}>
                        VIEW LEVEL
                    </button>
                </div>
            </Animation>
    </div>
  )
}

export default Congratulations