import { ObjectId } from "mongodb";
import Game from "./Game";
import Player from "./Player";

export interface Tournament {
  _id?: ObjectId;
  year: number;
  games: Game[];
  players: Player[];
}
