import award from "./../../assets/modal/award.svg"
import Animation from "./Connect/Animation"
// import { useModalContext } from "../../context/ModalContext"

import { MM_ADDRESS, useEthersProvider, useEthersSigner } from '../../sdk'
import { MMContract } from '../../sdk/MMContract'
import { useState } from "react"

const Claim = () => {
  // const { switchModal } = useModalContext()



  const [errorMessage, setErrorMessage] = useState('')
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const mmContract = new MMContract(MM_ADDRESS, signer, provider)
  const gameAddr = localStorage.getItem('claimGameAddr')


  return (
    <div className='flex flex-col h-full '>
      <Animation className='justify-center text-center gap-[56px] max-w-[497px] mx-auto flex w-full items-center h-full px-[8px] flex-col'>
        <img src={award} className="w-[88px] h-[88px] md:w-[initial] md:h-[initial]" />

        <div className="font-droid text-[15px] md:text-[32px]  leading-[17.71px] md:leading-[37.78px] w-[284px] md:w-[initial]">
          Hurray!! you won
        </div>

        <div>
          <button className="rounded-[16px] font-droid w-[218px] h-[56px] md:w-[251px] md:h-[80px] text-[16px] md:text-[24px] settingsFormbutton"
            onClick={async () => {
              setErrorMessage('')
              if (gameAddr) {
                try {
                  const tx = await mmContract.claimReward(gameAddr)
                  console.log(tx)

                } catch (error) {
                  console.log(error)
                  let err = JSON.parse(JSON.stringify(error))
                  setErrorMessage(err.reason)
                }
              }
              // switchModal()
            }}
          >
            {"Claim Reward"}
          </button>
          {errorMessage != '' && <p className="text-red-600 font-bold pt-5 uppercase text-center">{errorMessage}</p>}
        </div>
      </Animation>
    </div>
  )
}

export default Claim