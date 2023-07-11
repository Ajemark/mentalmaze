

const Verify = () => {
  return (
    <div>
      <div >
                <h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] mt-[24px] pt-[16px] pb-[32px] leading-[23.61px] md:leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-[full] mx-auto '>
                    Connect Wallet
                </h1>
      </div>
    <div className='pt-[48px] flex flex-col h-full gap-[100px]'>
        <button className='modalButton flex gap-[24px] items-center justify-center font-droid text-[1rem] md:text-[24px]  border-blue-80 mx-auto'>
                    Verify
                </button>
    
        <div className='flex flex-col gap-1 font-Archivo_Regular font-normal'>
            <p className='leading-[21.76px]  text-[15px] md:text-[20px] text-center'>
            Do you need help with connecting 
            </p>
            <p className='flex justify-center leading-[21.76px] gap-2  text-[15px] md:text-[20px] text-center'>
            your wallet? <p className='text-blue-80'>Chat us on discord</p>
            </p>
        </div>
        </div>
        </div>

  )
}

export default Verify