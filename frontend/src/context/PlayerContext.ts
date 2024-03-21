import { createContext } from "react";
import Player from "../models/Player";

interface PlayerContextModel {
  player: Player | null;
  setPlayer: (player: Player | null) => void;
}

const defaultValues: PlayerContextModel = {
  player: null,
  setPlayer() {},
};

const PlayerContext = createContext(defaultValues);

export default PlayerContext;
