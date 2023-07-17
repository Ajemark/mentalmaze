
const ChooseANickname = () => {
  return (
    <div>
      <div>
      <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit mx-auto'>
                    Connect Wallet
                </h1>
    </div>
    <div className='pt-[48px] flex flex-col h-full gap-[100px] px-[29.5px] md:px-0'>
          <input type="text" placeholder='ENTER YOUR NICKNAME' className='font-[400] text-[15px] md:text-[20px] font-droid leading-[23.61px] py-[24px] px-[40px] text-[#8C8C8C] rounded-[16px] md:rounded-t-[16px] w-full bg-[#032449] md:w-[416px] mx-auto text-center' />  
    <div className='flex flex-col gap-1 font-Archivo_Regular font-normal'>
        <p className='leading-[21.76px]  text-[20px] text-center'>
        You are adviced to use the same discord
        </p>
        <p className='flex justify-center leading-[21.76px] gap-2 text-[20px] text-center'>
        username for easy stat tracking.
        </p>
    </div>
    </div>
    </div>
  )
}

export default ChooseANickname