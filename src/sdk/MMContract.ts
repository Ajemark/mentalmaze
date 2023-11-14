import { ethers, AbiCoder } from "ethers";

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

	async createGame(data: {}, value: BigInt) {
		let decode = new AbiCoder()
		let tx = await this.contract.createGame(data, { value })
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
		const tx = await this.contractWithProvider.judgesCount()
		return tx.toString();
	}

	async getMinVote() {
		const tx = await this.contractWithProvider.minimumVoteAllowedInPercentage()
		return tx.toString();
	}

	async getVotesForGames(address: String) {
		const tx = await this.contractWithProvider.votesForGames(address)
		return tx.toString();
	}

	async getGameVotes(address: String) {
		const tx = await this.contractWithProvider.gamePendingApprovalVoteCount(address)
		return tx.toString();
	}
	async getJudges(id: number) {
		const tx = await this.contractWithProvider.judges(id)
		return tx;
	}

}

const MMAbi = [
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
				"name": "playersAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "mentalmazePointEarned",
				"type": "uint256"
			}
		],
		"name": "addMentalMazePoint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "image",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "paymentStatus",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "comments",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "approve",
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
						"internalType": "uint256[]",
						"name": "rewardDistribution",
						"type": "uint256[]"
					},
					{
						"internalType": "address",
						"name": "managerContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "playersCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalQuestion",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "image",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string[]",
								"name": "options",
								"type": "string[]"
							},
							{
								"internalType": "string",
								"name": "difficultyLevel",
								"type": "string"
							}
						],
						"internalType": "struct mentalmazeGame.Question[]",
						"name": "gameQuestion",
						"type": "tuple[]"
					}
				],
				"internalType": "struct MentaMazeGameFactoryContract.createGameData",
				"name": "gameInfo",
				"type": "tuple"
			}
		],
		"name": "createGame",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_judges",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "gamesAddress",
				"type": "address"
			}
		],
		"name": "approvedGamesEvent",
		"type": "event"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "gameAdress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			}
		],
		"name": "gameCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "playersAddress",
				"type": "address"
			}
		],
		"name": "getmentslMazePoint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "mentamazePlayersPoint",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "players",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "mentalmazePoint",
				"type": "uint256"
			}
		],
		"name": "mentalmazePointAddedEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "withdrawnAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "usersAddress",
				"type": "address"
			}
		],
		"name": "reduceUserMentalmazePoint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "gamesAddress",
				"type": "address"
			}
		],
		"name": "rejectedGamesEvent",
		"type": "event"
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
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "gamesVotedFor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
			}
		],
		"name": "mentalmazePoint",
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
		"inputs": [],
		"name": "reviewGamesCount",
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
	}
]
