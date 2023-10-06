import { ConnectButton } from '@rainbow-me/rainbowkit';

export const CustomButton = () => {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted,
			}) => {
				// Note: If your app doesn't use authentication, you
				// can remove all 'authenticationStatus' checks
				const ready = mounted && authenticationStatus !== 'loading';
				const connected =
					ready &&
					account &&
					chain &&
					(!authenticationStatus ||
						authenticationStatus === 'authenticated');
				return (
					<div
						{...(!ready && {
							'aria-hidden': true,
							'style': {
								opacity: 0,
								pointerEvents: 'none',
								userSelect: 'none',
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<button onClick={openConnectModal} type="button" className='flex text-white bg-blue-50  w-fit h-[38px] items-center rounded-[8px] gap-[8px] px-[12px] '>
										Connect Wallet
									</button>
								);
							}
							if (chain.unsupported) {
								return (
									<button className='flex text-white bg-blue-50 h-[38px] items-center rounded-[8px] px-[8px] ' onClick={openChainModal} type="button">
										Wrong network
									</button>
								);
							}
							return (
								<div style={{ display: 'flex', gap: 4 }}>
									<button
										onClick={openChainModal}
										type="button"
										className='flex text-white bg-blue-50 h-[38px] items-center rounded-[8px] px-[8px] '
									>
										{chain.hasIcon ? (
											<div
												style={{
													background: chain.iconBackground,
													width: '28px',
													height: '28px',
													borderRadius: 999,
													overflow: 'hidden',
												}}
											>
												{chain.iconUrl && (
													<img
														alt={chain.name ?? 'Chain icon'}
														src={chain.iconUrl}
														style={{ width: 28, height: 28 }}
													/>
												)}
											</div>
										) : chain.name}
									</button>
									<button onClick={openAccountModal} className='flex text-white bg-blue-50  w-fit h-[38px] items-center whitespace-nowrap rounded-[8px] gap-[8px] px-[12px] overflow-hidden' type="button">
										{account.displayName}
									</button>
								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};