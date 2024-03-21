import { createContext } from "react";
import Game from "../models/Game";

interface GameContextModel {
  game: Game | null;
  setGame: (game: Game) => void;
  startNewGame: (nav: any) => void;
  handleJoinGame: () => void;
  changePoints: (points: number, index: number) => void;
  updateGame: () => void;
  Bust: (game: Game) => void;
}

const defaultValues: GameContextModel = {
  game: null,
  setGame: () => {},
  startNewGame: () => {},
  handleJoinGame: () => {},
  changePoints: () => {},
  updateGame: () => {},
  Bust: () => {},
};

const GameContext = createContext(defaultValues);

export default GameContext;
