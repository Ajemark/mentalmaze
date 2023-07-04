
const ChooseANickname = () => {
  return (
    <div className='pt-[48px] flex flex-col h-full gap-[100px]'>
          <input type="text" placeholder='ENTER YOUR NICKNAME' className='font-[400] text-[20px] font-droid leading-[23.61px] py-[24px] px-[40px] text-[#8C8C8C] rounded-t-[16px] bg-[#032449] md:w-[416px] mx-auto text-center' />  
    <div className='flex flex-col gap-1 font-Archivo_Regular font-normal'>
        <p className='leading-[21.76px]  text-[20px] text-center'>
        You are adviced to use the same discord
        </p>
        <p className='flex justify-center leading-[21.76px] gap-2 text-[20px] text-center'>
        username for easy stat tracking.
        </p>
    </div>
    </div>
  )
}

export default ChooseANickname