import { ethers, AbiCoder, parseEther } from "ethers";

export class MMContract {
	address: string;
	signer: any;
	provider: any;
	contract: any;
	contractWithProvider;
	constructor(address: string, signer: any, provider: any) {
		this.address = address;
		this.signer = signer;
		this.provider = provider;
		this.contract = new ethers.Contract(this.address, MMAbi, this.signer);
		this.contractWithProvider = new ethers.Contract(
			this.address,
			MMAbi,
			this.provider
		);
	}

	// constructor(address: string, signer: any, provider: any) {
	// 	super(address, signer, provider, MMAbi);
	// }

	async createGame(data: any, value: BigInt) {
		let decode = new AbiCoder()
		const { amountDeposited, rewardDistribution, durationInHours, pass } = data

		console.log(rewardDistribution)

		let tx = await this.contract.createGame(amountDeposited, durationInHours, rewardDistribution, parseEther(pass), { value })
		tx = await tx.wait()
		return decode.decode(['address'], tx.logs[0].data)
	}
	async approveGame(gameAddress: string) {
		let tx = await this.contract.approveGames(gameAddress)
		tx = await tx.wait()
		return tx
	}
	async rejectGame(gameAddress: string) {
		let tx = await this.contract.rejectGames(gameAddress)
		tx = await tx.wait()
		return tx
	}

	async getJudgesCount() {
		const tx = await this.contract.getJudgesCount()
		return tx.toString();
	}

	async Games(address: String) {
		const tx = await this.contract.Games(address)
		return tx;
	}

	async getMinVote() {
		const tx = await this.contract.minimumVoteAllowedInPercentage()
		return tx.toString();
	}

	async getVotesForGames(address: String) {
		const tx = await this.contract.votesForGames(address)
		return tx.toString();
	}

	async claimReward(address: String) {
		const tx = await this.contract.claimReward(address, { value: 0 })
		await tx.wait()
		return tx.toString();
	}
	async gatePass(address: String, value: any) {
		const tx = await this.contract.gatePass(address, { value })
		await tx.wait()
		return tx.toString();
	}

	async playerGames(userAddress: String, address: String) {
		const tx = await this.contract.playerGames(userAddress, address)
		return tx;
	}

	async getGameVotes(address: String) {
		const tx = await this.contract.gamePendingApprovalVoteCount(address)
		return tx.toString();
	}

	async getJudges(id: number) {
		const tx = await this.contract.judges(id)
		return tx;
	}

}

const MMAbi = [
	{
		"inputs": [],
		"name": "InvalidInitialization",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotInitializing",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "version",
				"type": "uint64"
			}
		],
		"name": "Initialized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "gameAdress",
				"type": "address"
			}
		],
		"name": "gameCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Games",
		"outputs": [
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountDeposited",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "durationInHours",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "managerContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "points",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gatePass",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newJudgesAddres",
				"type": "address"
			}
		],
		"name": "addJudges",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "gameAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "position",
				"type": "uint256"
			}
		],
		"name": "addReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "gamesToVoteFor",
				"type": "address"
			}
		],
		"name": "approveGames",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "approvedGames",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "approvedGamesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "gameAddress",
				"type": "address"
			}
		],
		"name": "claimReward",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountDeposited",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "durationInHours",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "rewardDistribution",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "pass",
				"type": "uint256"
			}
		],
		"name": "createGame",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feePercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "gamePendingApprovalVoteCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "gamePendingRejectedVoteCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "gameAddress",
				"type": "address"
			}
		],
		"name": "gatePass",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getJudgesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "gameAddress",
				"type": "address"
			}
		],
		"name": "getRewardDistribution",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "judges",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "judgesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "judgesVotesForGames",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minimumVoteAllowedInPercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "payedGatePass",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pendingApproval",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pendingApprovalCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "playerGames",
		"outputs": [
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountDeposited",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "durationInHours",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "managerContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "points",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gatePass",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "gamesToVoteFor",
				"type": "address"
			}
		],
		"name": "rejectGames",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rejectedGames",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rejectedGamesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_judgeAddress",
				"type": "address"
			}
		],
		"name": "removeJudges",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votesForGames",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]