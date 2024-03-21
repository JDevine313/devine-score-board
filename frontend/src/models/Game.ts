import Player from "./Player";

export default interface Game {
  _id?: string;
  players: Player[];
  winner: Player | null;
  name: string;
  date: Date;
  score: number[];
}
