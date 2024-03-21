import { ObjectId } from "mongodb";
import Player from "./Player";

export default interface Game {
  _id?: ObjectId;
  players: Player[];
  winner: Player | null;
  name: string;
  date: Date;
  score: number[];
}
