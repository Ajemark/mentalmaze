import { useModalContext } from "../../../context/ModalContext"
import { useNavigate } from "react-router-dom";


const GameType = () => {
	const navigate = useNavigate()
	const { switchModal } = useModalContext()

	return (
		<>
			<div>
				<h1 className='font-droid border-b-blue-80 border-b-[4px] md:border-b-[8px] pt-[20px] mt-[24px] md:pt-[16px] pb-[32px] leading-[37.78px] text-[20px] md:text-[32px] text-center w-fit md:w-full mx-auto'>
					Choose type of game
				</h1>
			</div>
			{/* <Animation > */}
			<div className='pt-[16px] pb-[32px] flex flex-col justify-start w-[50%] mx-auto h-full '>

				<div className='flex mt-10 justify-center w-full '>
					<div className=" p-[2px rounded-[8px] w-full p-[2px]" style={{
						"background": "linear-gradient(90deg, #032449, #0B77F0)"
					}} >
						<button className=" w-full text-white py-[16px] rounded-[8px] font-droid tracking-[0.2px] left-0" style={{
							"background": "linear-gradient(130deg, #032449 0%, #0B77F0 100%)",
							"backdropFilter": "blur(4px)"
						}} onClick={() => {
							switchModal()
							navigate('/settings')
						}}>
							f`all game
						</button>
					</div>


				</div>

				<div className='flex mt-5 justify-center w-full opacity-[0.2]'>
					<div className=" p-[2px rounded-[8px] w-full p-[2px]" style={{
						"background": "linear-gradient(90deg, #032449, #0B77F0)"
					}} >
						<button disabled className=" w-full text-white py-[16px] rounded-[8px] font-droid tracking-[0.2px] left-0" style={{
							"background": "linear-gradient(130deg, #032449 0%, #0B77F0 100%)",
							"backdropFilter": "blur(4px)"
						}} onClick={() => {
							switchModal()
							navigate('/settings')
						}}>
							private game
						</button>
					</div>


				</div>

				<div className='flex flex-col gap-1 mt-[80px] font-Archivo_Regular font-normal text-[15px] md:text-[20px]'>
					<p className='leading-[21.76px]   text-center'>
						“Private game” is a premium feature. to create a game for free, click “Fall game”
					</p>
				</div>
			</div>
			{/* </Animation> */}
		</>
	)
}

export default GameType