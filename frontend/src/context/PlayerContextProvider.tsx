import { ReactNode, useState } from "react";
import Player from "../models/Player";
import PlayerContext from "./PlayerContext";

interface Props {
  children: ReactNode;
}

const PlayerContextProvider = ({ children }: Props) => {
  const [player, setPlayer] = useState<Player | null>(null);

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;
