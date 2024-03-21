import { ReactNode, useContext, useState } from "react";
import GameContext from "./GameContext";
import Game from "../models/Game";
import PlayerContext from "./PlayerContext";
import { BUST, getGameById, joinGame, newGame } from "../services/gameServices";
import { changePoints as change } from "../services/gameServices";

interface Props {
  children: ReactNode;
}

const GameContextProvider = ({ children }: Props) => {
  const [game, setGame] = useState<Game | null>(null);
  const { player } = useContext(PlayerContext);

  const updateGame = () => {
    if (window.location.href.split("/")[4]) {
      getGameById(window.location.href.split("/")[4]).then((res) =>
        setGame(res)
      );
    }
  };

  const startNewGame = (nav: any) => {
    if (player) {
      newGame([player], null, window.location.href.split("/")[3]).then(
        (res: Game) => {
          if (res) {
            nav(
              `/${window.location.href.split("/")[3]}/${encodeURIComponent(
                res._id!
              )}`
            );
            setGame(res);
          }
        }
      );
    }
  };

  const handleJoinGame = () => {
    if (player) {
      joinGame(player, window.location.href.split("/")[4]).then(() => {
        getGameById(window.location.href.split("/")[4]).then((res) => {
          setGame(res);
        });
      });
    }
  };

  const changePoints = (points: number, index: number) => {
    change(game?._id!, index, points);
  };

  const Bust = (game: Game) => {
    BUST(game).then(() => {
      getGameById(window.location.href.split("/")[4]).then((res) => {
        setGame(res);
      });
    });
  };

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        startNewGame,
        handleJoinGame,
        changePoints,
        updateGame,
        Bust,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameContextProvider;
