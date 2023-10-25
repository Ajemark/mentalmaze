


export const GeneralBoard = (data: any) => {

	console.log(data)
	return (
		<div className='relative text-white'>
			<div className='w-full h-fit '>
				<div className='px-[16px] md:px-[40px]'>
					<div className='flex font-droid text-[32px] font-normal px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[28px]'>
						<div className='flex-1'>top-Solvers</div>
						<div>Total maze point</div>
					</div>

					{
						data && data?.data?.map((d: any, i: any) => {
							return (
								<div key={i} className='flex font-droid text-[32px] font-normal px-[48px] mt-[32px] grad-dar rounded-[16px] border-blue-50 border-solid border-[2px] py-[28px]'>

									<div className='flex w-full items-center'>
										<div className='flex items-center flex-1'>
											<div className='mr-8 bg-blue-main w-[48px] h-[48px] md:w-[72px] md:h-[72px] rounded-[8px] '>
											</div>
											<p>{'solver'}</p>
										</div>

										<div className=' text-right text-[13px] md:text-[24px] font-medium leading-[26.11px] font-Archivo_Regular flex-1 block '>{d?.point ?? 0} MP
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
