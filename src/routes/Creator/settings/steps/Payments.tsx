
import { useContext, useEffect, useState } from "react"
import Input from "../../../../component/ui/Input"
import { HiMinus, HiPlus } from "react-icons/hi"
import { UserContext } from "../../../../context/UserContext"
import { MMContract } from "../../../../sdk/MMContract"
import { ERC20, MM_ADDRESS, useEthersProvider, useEthersSigner } from "../../../../sdk"
import { useAccount } from "wagmi"
import { parseEther } from "viem"
import ReactLoading from 'react-loading';
import { ERC20Contract } from "../../../../sdk/ERC20"


const Payments = ({ handleClick }: { handleClick: (int: number) => void }) => {
	const { gameToken, setGameToken, priceShare, setPriceShare, setQuestionObj, comments, setComments }: any = useContext(UserContext)
	const { address } = useAccount()

	const signer = useEthersSigner();
	const provider = useEthersProvider();


	const updatePriceShare = (index: any, newValue: any) => {
		const updatedArray = [...priceShare];
		updatedArray[index] = Number(newValue);
		setPriceShare(updatedArray);
	};



	// useEffect(() => {
	// 	setSendinTx(false)
	// }, [])


	const [errorMessage, setErrorMessage] = useState('')
	const [sendinTx, setSendinTx] = useState(false)
	const { questionObj }: any = useContext(UserContext)
	const [pass, setpass] = useState('0')

	const prices = (priceShare: any) => {
		let nprice: any = []
		priceShare.length > 0 && priceShare.map((price: any) => {
			nprice.push(parseEther(price.toString()))
		})
		return nprice
	}

	const checkAmount = (priceShare: any, gameToken: any) => {
		let totalShare = 0
		if (priceShare.length > 1) {
			priceShare.map((price: number) => {
				totalShare += Number(price)
			})
		} else totalShare = priceShare[0]
		return (totalShare == gameToken)
	}


	const sendTx = async (data: any) => {

		setSendinTx(true)
		const mmContract = new MMContract(MM_ADDRESS, signer, provider)
		const erc20Contract = new ERC20Contract(ERC20, signer, provider)
		try {
			const amount = parseEther(gameToken)

			const allowance = await erc20Contract.allowance(address as string, MM_ADDRESS)

			console.log(allowance)

			if (Number(allowance) >= (Number(amount) * 1.2)) {

				const tx = await mmContract.createGame(data, ERC20)
				if (tx) {
					setQuestionObj({ ...data, amountDeposited: gameToken, rewardDistribution: priceShare, address: tx[0] })
					setSendinTx(false)
					handleClick(3)
				}
				return
			}

			const approved = await erc20Contract.approve(MM_ADDRESS, (Number(amount) * 1.2).toString())
			if (approved) {
				const tx = await mmContract.createGame(data, ERC20)
				if (tx) {
					setQuestionObj({ ...data, amountDeposited: gameToken, rewardDistribution: priceShare, address: tx[0] })
					setSendinTx(false)
					handleClick(3)
				}
				return
			}

		} catch (error: any) {
			setSendinTx(false)
			console.log(error)
			if (JSON.parse(JSON.stringify(error)).info.error.data.message.includes('insufficient funds')) {
				setErrorMessage('You Do Not Have Enough ETH To Process This Transaction!')
				return
			}
			setErrorMessage('An Error Occured, Please Try Again!')
		}
	}

	return (
		<div className='px-[16px] md:px-[48px]'>
			{
				sendinTx ? <div className="w-full h-[40vh] flex justify-center items-center">
					<ReactLoading
						type='spin' color='#0B77F0' height={60} width={37} />
				</div> : (

					<div>
						<div className=' text-white '>

							<div>
								<div>
									<Input
										title='How much do you want to dedicate to  this project?'
										placeholder='Please enter the terms of Aurora Token'
										setValue={setGameToken}
										value={gameToken}
										type='number'
									/>
									<p className='font-[300] text-wb-40 font-Archivo_Regular mt-[8px] leading-[17.41px] text-[14px] md:text-[16px]'> e.g 3.5 Aurora Token</p>

								</div>

								<div>

									<Input
										title='Set Gate Pass'
										placeholder='Please enter the terms of Aurora Token'
										setValue={setpass}
										value={pass}
										type='number'
									/>
									<p className='font-[300] text-wb-40 font-Archivo_Regular mt-[8px] leading-[17.41px] text-[14px] md:text-[16px]'> e.g 3.5 Aurora Token</p>
								</div>

							</div>


							<div>
								<div className='flex justify-between items-end md:items-center mt-[32px] flex-col md:flex-row'>
									<p className='font-Archivo_Regular leading-[17.41px] text-white font-normal order-2 md:order-1'>How do you want the price shared amongst the runner-up?</p>
									<button onClick={() => setPriceShare((prev: any) => [...prev, ''])} className='mb-[24px] md:mb-0 order-1 md:order-2 flex items-center text-white font-Inter_Regular font-medium text-[14px] gap-[8px] py-[10px] px-[16px] settingsFormbutton rounded-lg '>
										<HiPlus />  Add more runner Up
									</button>
								</div>
								<div className='flex w-full justify-between items-center gap-[16px] text-blue-50 mt-[30px]'>
									{
										priceShare.map((ele: any, i: number) => {
											return <label key={i}
												className="flex-1"
												htmlFor="">
												<p>{(i + 1).toString() + (i + 1 == 1 ? 'st' : (i + 1 == 1 ? 'nd' : (i + 1 == 1 ? 'rd' : 'th')))} - Position</p>
												<input
													className='bg-[inherit] outline-none border-blue-main border-[2px] p-[10px] rounded-[8px] border-solid h-[64px] text-white w-full'
													value={ele}
													type="number"
													onChange={(e) => updatePriceShare(i, e.target.value)}
												/>
											</label>
										})
									}
								</div>
								<div className="w-full mt-5">
									<button onClick={() => setPriceShare((prev: any) => prev.length > 1 ? prev.slice(0, prev.length - 1) : [''])} className='mb-[24px] md:mb-0 order-1 ml-auto md:order-2 flex items-center text-white font-Inter_Regular font-medium text-[14px] gap-[8px] py-[10px] px-[16px] settingsFormbutton rounded-lg '>
										<HiMinus />  Remove runner Up
									</button>
								</div>
								<Input
									type="text"
									value={comments}
									setValue={setComments}
									title='Any Comments?'
									placeholder='Any comments that can help the players understand the game better?'
								/>
							</div>
						</div>
						<div className=" flex flex-col gap-[24px] mt-[48px] w-full ">
							<button className="w-full bg-blue-50 text-white text-[15px] font-Archivo_Regular rounded-[16px] border-[2px] border-blue-main py-[16px]" onClick={() => {

								//	handleClick(1)

								let data = {
									amountDeposited: parseEther(gameToken.toString()),
									rewardDistribution: (priceShare),
									comments,
								}

								checkAmount(priceShare, gameToken)

								setErrorMessage('')
								let proceed = true
								if (Object.entries(data).length == 3) {
									for (const index in Object.entries(data)) {
										let object = Object.entries(data)[index]
										if (object[1] == '' || !object[1]) {
											setErrorMessage('Enter all Details')
											proceed = false
											return
										}
										if (typeof (object[1]) == 'object' && object[1].length > 1) {
											object[1].map((cur: any) => {
												if (cur == '') {
													setErrorMessage('Enter all Details')
													proceed = false
													return
												}
											})
										}
									}
								} else {
									proceed = false
									setErrorMessage('Enter all Details')
								}

								if (!proceed) {
									setErrorMessage('Enter all Details')
									return
								}

								if (!checkAmount(priceShare, gameToken)) {
									setErrorMessage('Amount to deposit not equal to amount to share!')
									return
								}
								const get = async () => {

									const data2 = {
										...data,
										rewardDistribution: prices(priceShare),
										title: questionObj.gameTitle,
										image: questionObj.gameCover,
										description: questionObj.description,
										gameQuestion: questionObj.questions,
										durationInHours: Math.abs(questionObj.gameDuration),
										managerContract: MM_ADDRESS,
										playersCount: 0,
										totalQuestion: questionObj.questions.length,
										paymentStatus: true,
										approve: false,
										creator: address,
										pass
									}

									// console.log(data2)

									// return
									sendTx(data2)
								}

								get()
							}}>
								Proceed To make Deposit
							</button>
							{errorMessage != '' && <p className="text-red-500 text-center">{errorMessage}</p>}
						</div>
					</div>
				)
			}
		</div>
	)
}

export default Payments