import award from "./../../assets/modal/award.svg"
import Animation from "./Connect/Animation"
// import { useModalContext } from "../../context/ModalContext"

import { ERC20, MM_ADDRESS, useEthersProvider, useEthersSigner } from '../../sdk'
import { MMContract } from '../../sdk/MMContract'
import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"

const Claim = () => {
  // const { switchModal } = useModalContext()


  const { userDetails }: any = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('')
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const mmContract = new MMContract(MM_ADDRESS, signer, provider)
  const data = localStorage.getItem('claimGameAddr')
  const gameAddr = JSON.parse(data ?? '')


  const updatePlayer = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userDetails.token}`);
    myHeaders.append("Content-Type", "application/json");

    let requestOptions: RequestInit = {
      method: "PUT",
      body: data,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/player/update-claim`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.message == 'success') {
          setErrorMessage('Reward Claimed Successfully!!')
          setTimeout(() => {
            location.reload()
          }, 3000);
        }

      })
      .catch((error) => {
        console.log("error", error);
      });
  };



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

                  const tx = await mmContract.claimReward(gameAddr.game, ERC20)
                  console.log(tx)

                  if (tx) {
                    updatePlayer()
                  }

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