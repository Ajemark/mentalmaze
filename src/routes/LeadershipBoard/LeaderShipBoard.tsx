
import { RiArrowDownSLine } from "react-icons/ri"
import { useContext, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { UserContext } from "../../context/UserContext"
import { AllGames } from "./AllGames"
import { GeneralBoard } from "./GeneralBoard"
interface ItemType {
	id: number,
	text: string
}

const LeaderShipBoard = () => {
	const [dropDownItem] = useState<ItemType[]>([{ id: 0, text: "All Games" }, { id: 1, text: "CLaimed Games" }, { id: 2, text: "General Leaderboard" }])
	const [current, setCurrent] = useState<number>(0)
	const [showDropDown, setShowDropDown] = useState<boolean>(false)







	const { userDetails }: any = useContext(UserContext)
	const [loading, setLoading] = useState(false)
	const [leaderBoards, setLeaderBoards]: any = useState()
	const { isConnected, address } = useAccount()
	// const [message, setMessage] = useState('Loading Games!')


	const getLeaderBoards = () => {

		let myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${userDetails.token}`);

		let requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		};
		// =${ address?.toLowerCase()
		fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/Leaderboard/get-leader-board-by-mp-point?pageNumber=1&pageSize=4`, requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result.data) {
					setLeaderBoards(result.data.fetchRes)
					setLoading(false)
				}
				else {
					console.log(result)
					setLoading(false)
				}
			})
			.catch(error => {
				console.log('error', error)
				// setMessage('An Error Occured!, Please Try Again')
				setLoading(false)
			});
	}

	useEffect(() => {
		setLoading(true)
		if (!userDetails.token) {
			setLeaderBoards()
			setLoading(false)
			return
		}
		getLeaderBoards()
		console.log(loading)
	}, [userDetails, address, isConnected])

	console.log(leaderBoards)
	// console.log(userDetails)







	const DropDownComp = ({ text, current, id }: any) => {
		return (
			<div className={`outline-none cursor-pointer   rounded-[16px] flex items-center justify-between gap-6 w-full h-[66px]  p-[16px] ${!current ? "hover:headerdropDown-hover-effect hover:border-blue-main hover:border-[2px]" : ""}`}
				onClick={() => {
					setShowDropDown(!showDropDown)
					setCurrent(id)
					setShowDropDown(!showDropDown)
				}}
				style={{
					background: current ? "var(--grad-glas, linear-gradient(130deg, rgba(3, 36, 73, 0.45) 0%, rgba(11, 119, 240, 0.10) 100%))" : ""
				}}
			>
				<p className=" font-normal text-[15px] text-white bg-inherit font-droid ">{text}</p>
				{current ? <RiArrowDownSLine size={25} /> : null}
			</div>
		)
	}

	// console.log(current)

	return (

		<div className="backdrop-blur-sm">
			<div className='backdrop-blur-sm w-full h-fit mt-[96px] mb-16 md:mt-[176px]'>

				<div className="relative z-[999]  px-[16px] md:px-14  text-white">
					<div className="flex justify-between md:items-center mb-[64px] flex-col md:flex-row gap-[16px] md:gap-0 relative h-[99px] md:h-[initial]">
						<h2 className='font-Archivo_Regular font-normal tracking-[0.5px] md:text-[40px] text-[20px] leading-[21px] md:leading-normal'>LEADERBOARD</h2>
						<div id="" className="font-droid  outline-none bg-blue-50 border-blue-main border-[2px] overflow-hidden rounded-[16px] absolute right-0 md:top-[0px] top-10 w-full md:w-fit"
							style={{
								"background": "rgba(0, 0, 0, 0.80)",
								"boxShadow": "61.33333969116211px 61.33333969116211px 92.00000762939453px 0px rgba(1, 12, 24, 0.25)",
								"height": showDropDown ? "220px" : "66px",
								"transition": "all 0.2s"
							}}
						>
							<DropDownComp text={dropDownItem[current].text} current={true} id={current} />
							<div className="flex items-start flex-col mt-2 px-[16px]" >
								{dropDownItem.filter(item => item.id !== current).map((item) => <DropDownComp {...item} current={false} />)}
							</div>
						</div>
					</div>
				</div>
				{
					current == 0 ?
						<AllGames data={leaderBoards} /> :
						current == 1 ? <AllGames data={leaderBoards} /> :
							<GeneralBoard data={leaderBoards} />
				}
			</div>
		</div>
	)
}

export default LeaderShipBoard






