import { useModalContext } from '../../../context/ModalContext'
import Animation from './Animation'

const Welcome = () => {
  const {username,  switchModalcontent} = useModalContext()


  return (
    <Animation className='w-full h-full flex flex-col items-center justify-center'>
        <h2 className='font-droid text-[20px] md:text-[32px] leading-[37px] '>WELCOME, {username?.toLocaleUpperCase()}</h2>
        <button className='modalButton w-[259px] text-[16px] md:text-[24px] leading-[28.34px] font-droid mt-[32px]' onClick={() => switchModalcontent('example')}>
            BEGIN GAME 
        </button>
    </Animation>
  )
}
export default Welcome