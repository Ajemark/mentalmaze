import { ethers } from 'ethers'
export class BaseContract {
	address: string;
	signer: any;
	provider: any;
	contract: any;
	contractWithProvider;
	constructor(address: string, signer: any, provider: any, abi: any) {
		this.address = address;
		this.signer = signer;
		this.provider = provider;
		this.contract = new ethers.Contract(this.address, abi.abi, this.signer);
		this.contractWithProvider = new ethers.Contract(
			this.address,
			abi.abi,
			this.provider
		);
	}
}
