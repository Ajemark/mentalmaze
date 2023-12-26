// import award from "./../../../../assets/modal/award.svg"
import chartSquare from "./../../../../assets/modal/chart-square.svg"
import Animation from '../Animation'
import { BarLoader } from "react-spinners"
import useQuery from "../../../../hooks/useQuery"
import { useModalContext } from "../../../../context/ModalContext"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../context/UserContext"

const Collating = () => {
  const { width } = useQuery()


  const { switchModalcontent } = useModalContext()
  const [data, setData]: any = useState()
  const [result, setResult]: any = useState()
  const { userDetails }: any = useContext(UserContext)

  useEffect(() => {

    const data = JSON.parse(localStorage.getItem('GameInfo') ?? '')
    if (data.game) setData(data)
  }, [])


  const submitGame = () => {

    setResult(undefined)
    console.log(data.dataToSubmit)
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);
    myHeaders.append("Content-Type", "application/json");

    let requestOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data.dataToSubmit),
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/player/submitGame`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.message == 'success' && result.gamePlayedResult) {
          setResult(result.gamePlayedResult)
          localStorage.setItem("GameInfo", JSON.stringify({
            ...result.gamePlayedResult,
            qLength: data.dataToSubmit.arrayofQuestion_answer.length
          }))
          return
        }
        else {
          console.log(result)
        }
      })
      .catch(error => {
        console.log('error', error)
      });
  }

  useEffect(() => {
    console.log(result)
    if (result?.status == 'pass')
      switchModalcontent('congratulations')
    if (result?.status == 'fail')
      switchModalcontent('nicetry')
    if (!data || result) return
    submitGame()
  }, [result, data])

  console.log(data)


  return (
    <div className="py-[64px]">
      <Animation className='justify-center text-center gap-[56px] max-w-[497px] mx-auto flex w-full items-center h-full px-[8px] flex-col'>
        <img src={chartSquare} className="w-[90px] h-[90px] md:w-[initial] md:h-[initial]" />
        <div className="font-droid text-[20px] w-[263px] md:w-[initial] md:text-[32px]  leading-[37.78px]">
          We are collating your answers.
        </div>
        <BarLoader color="#0B77F0" width={width > 768 ? 480 : 300} />
        <p className="font-normal leading-[21.76px] text-[16px] md:text-[20px] tracking-wide">
          Summing Your Score.....
        </p>
      </Animation>
    </div>
  )
}

export default Collating