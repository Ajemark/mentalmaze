import { GamedetailForm } from './settings/SettingsInner'

const Settings = () => {

  return (
    <div className="relative px-[16px] md:px-10 mb-[96px] mt-[96px] md:mt-[176px]">
      <h1 className='font-Archivo_Regular py-[16px] md:py-0 text-[20px] md:text-[48px] leading-[21px] md:leading-[52px] font-normal text-white mb-[32px] md:mb-[57px]'>
        CREATE GAME
      </h1>

      <div className="border-blue-80 border-[4px] border-solid rounded-[24px] w-full  mx-auto pb-[72px] bg-blue-100 ">
        <h1 className="font-droid text-[20px] md:text-[32px] text-white text-center border-blue-80 border-b-[4px] border-solid  leading-[23.61px] md:leading-[37px] py-[32px] md:pt-[24px] md:pb-[32px]">SETTING</h1>
        <div>
          <GamedetailForm />
        </div>
      </div>
    </div>
  )
}

export default Settings