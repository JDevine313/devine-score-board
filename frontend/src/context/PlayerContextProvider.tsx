import { ReactNode, useEffect, useState } from "react";
import Player from "../models/Player";
import PlayerContext from "./PlayerContext";
import { getPlayerByPhone } from "../services/playerServices";
import secureLocalStorage from "react-secure-storage";

interface Props {
  children: ReactNode;
}

const PlayerContextProvider = ({ children }: Props) => {
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (secureLocalStorage.getItem("xijs")) {
      getPlayerByPhone(String(secureLocalStorage.getItem("xijs")).slice(1, 11))
        .then((res) => {
          setPlayer(res);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;
