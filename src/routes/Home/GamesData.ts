import Game from "./../../assets/challengerGames/game.png"
type gameType = {
  image: string,
  title: string
}


export const games: Array<gameType> = [
  {
    image: Game,
    title: "Math puzzle"
  },
]


export type challengergametype = {
  image: string,
  title: string,
  approve: boolean
}
export const challengergames: Array<challengergametype> = [
  {
    image: Game,
    title: "Math puzzle",
    approve: true
  },
  {
    image: Game,
    title: "Math puzzle",
    approve: true
  }, {
    image: Game,
    title: "Math puzzle",
    approve: true
  },
]