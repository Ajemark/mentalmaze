
import metalmask from "./../../../assets/metalmask.png"


const Installed = () => {
    return (
        <div className='pt-[48px] flex flex-col gap-[24px] h-full '>
    
    <p className='font-Archivo_Regular text-[32px] leading-[40px] text-center max-w-md mx-auto'>
    Done Installing? Reconnect
    </p>
    
        <button className='metamask flex gap-[24px] items-center justify-center font-droid text-[24px]  border-blue-80 mx-auto'>
                    <div>
                    <img src={metalmask} />
                    </div>
                    MentalMask
                </button>
    
        <div className='flex flex-col gap-1 font-Archivo_Regular font-normal'>
            <p className='leading-[21.76px]  text-[20px] text-center'>
            Do you need help with connecting 
            </p>
            <p className='flex justify-center leading-[21.76px] gap-2  text-[20px] text-center'>
            your wallet? <p className='text-blue-80'>Chat us on discord</p>
            </p>
        </div>
        </div>
      )
    }

export default Installed