// import award from "./../../../../assets/modal/award.svg"
import chartSquare from "./../../../../assets/modal/chart-square.svg"
import Animation from '../Animation'
import {BarLoader} from "react-spinners"
import useQuery from "../../../../hooks/useQuery"

const Collating = () => {
    const {width} = useQuery()
  return (
    <div className="py-[64px]">
        <Animation className='justify-center text-center gap-[56px] max-w-[497px] mx-auto flex w-full items-center h-full px-[8px] flex-col'>
                <img src={chartSquare} className="w-[90px] h-[90px] md:w-[initial] md:h-[initial]"/>
                <div className="font-droid text-[20px] w-[263px] md:w-[initial] md:text-[32px]  leading-[37.78px]">
                We are collating your answers.
                </div>
                    <BarLoader color="#0B77F0" width={width > 768?480:300} />
               <p className="font-normal leading-[21.76px] text-[16px] md:text-[20px] tracking-wide">
                Summing Your Score.....
               </p>
            </Animation>
    </div>
  )
}

export default Collating