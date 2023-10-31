import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"



export const GeneralBoard = (data: any) => {

	const { userDetails }: any = useContext(UserContext)

	const [users, setUsers]: any = useState()

	const { token } = userDetails


	const getUser = async (data: any) => {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);


		let requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		};

		return await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/?address=${data.playersAddress}`, requestOptions)
			.then(response => {
				return response.json();
			})
			.then(result => {
				if (result?.message != 'success') {
				}
				else {
					return ({
						playerInfo: result.data,
						...data
					})
				}
			})
			.catch(error => console.log('error', error));
	}


	const getUsers = async () => {
		const d = Promise.all(data.data.map((data: any) => {
			return (getUser(data))
		}))

		setUsers(await d)
	}


	useEffect(() => {
		if (!data) return
		getUsers()
	}, [data])


	return (
		<div className='relative text-white'>
			<div className='w-full h-fit '>
				<div className='px-[16px] md:px-[40px]'>
					<div className='flex font-droid text-[32px] font-normal px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[28px]'>
						<div className='flex-1'>top-Solvers</div>
						<div>Total maze point</div>
					</div>

					{
						users && users?.map((d: any, i: any) => {
							return (
								<div key={i} className='flex font-droid text-[32px] font-normal px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[28px]'>

									<div className='flex w-full items-center'>
										<div className='flex items-center flex-1'>


											<div className='text-headerbg text-xl font-bold justify-center flex items-center mr-8 bg-blue-main w-[48px] h-[48px] md:w-[72px] md:h-[72px] rounded-[8px]  overflow-hidden'>
												{d.playerInfo.profileImage?.length < 3 ? (
													<p>
														{d.playerInfo.profileImage.toUpperCase()}
													</p>
												) :
													<img src={d.playerInfo.profileImage.includes('http') ? d.playerInfo.profileImage : "https://mentalmaze-game.infura-ipfs.io/ipfs/" + d.playerInfo.profileImage} alt="" className='w-full h-full'
													/>
												}
											</div>
											<p>{d.playerInfo.username}</p>
										</div>

										<div className=' text-right text-[13px] md:text-[24px] font-medium leading-[26.11px] font-Archivo_Regular flex-1 block '>{d.total_points} MP
										</div>
									</div>
								</div>
							)
						})
					}

				</div>
			</div>
		</div>
	)
}
