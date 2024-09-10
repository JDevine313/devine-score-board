import Game from "./Game";
import Player from "./Player";

export interface Tournament {
  _id?: string;
  year: number;
  games: Game[];
  players: Player[];
}
