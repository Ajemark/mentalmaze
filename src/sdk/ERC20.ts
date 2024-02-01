
import { ethers } from "ethers";
import { erc20ABI } from "wagmi";

export class ERC20Contract {

	address: string;
	signer: any;
	provider: any;
	contract: any;
	contractWithProvider;
	constructor(address: string, signer: any, provider: any) {
		this.address = address;
		this.signer = signer;
		this.provider = provider;
		this.contract = new ethers.Contract(this.address, erc20ABI, this.signer);
		this.contractWithProvider = new ethers.Contract(
			this.address,
			erc20ABI,
			this.provider
		);
	}



	async transfer(to: string, amount: string) {
		const tx = await this.contract.transfer(to, amount);
		const receipt = await tx.wait();
		return receipt;
	}

	async approve(spender: string, amount: string) {
		const tx = await this.contract.approve(spender, amount);
		const receipt = await tx.wait();
		return receipt;
	}
	async allowance(owner: string, spender: string) {
		const tx = await this.contractWithProvider.allowance(owner, spender);
		return tx;
	}

	async balanceOf(address: string) {
		const result = await this.contractWithProvider.balanceOf(address);
		return result;
	}
}
