import "./TournamentGame.css";

import { useEffect, useState } from "react";
import Game from "../models/Game";
import {
  bust15,
  editPoints,
  exclaimWinner,
  getTournament,
} from "../services/tournamentServices";
import { useParams } from "react-router-dom";
import { Tournament } from "../models/Tournament";
import Player from "../models/Player";

const TournamentGame = () => {
  const [game, setGame] = useState<Game>();
  const [winner, setWinner] = useState<Player>();
  const [gameOn, setGameOn] = useState<boolean>(true);
  const gameId = useParams().game;
  const [tournament, setTournament] = useState<Tournament>();
  const update = () => {
    getTournament().then((res) => {
      if (res) {
        setTournament(res);
        let foundGameIndex = res.games.findIndex((game) => game._id === gameId);

        if (res && foundGameIndex !== -1) {
          setGame(res.games[foundGameIndex]);
          let wPlayer = checkAndSetWinner(
            res.games[foundGameIndex],
            res._id!,
            foundGameIndex
          );

          if (wPlayer) {
            setWinner(wPlayer);
            setGameOn(false);
          }
          if (
            res.games[foundGameIndex].name === "Shooting" ||
            res.games[foundGameIndex].name === "Bocce Ball"
          ) {
            setGameOn(true);
          }
        }
      }
    });
  };
  useEffect(() => {
    update();
  }, [gameId]);
  const handleClicker = (e: any) => {
    if (gameOn) {
      if (e.target.tagName === "DIV") {
        e.target.classList.add("clicked");
        setTimeout(() => {
          e.target.classList.remove("clicked");
        }, 1000);
      }
    }
  };

  const changePoints = async (score: number, index: number) => {
    if (gameOn) {
      if (game && tournament) {
        let gameIndex = tournament.games.findIndex(
          (aGame) => aGame._id === game._id
        );
        await editPoints(score, tournament._id!, game._id!, index, gameIndex);
        update();
      }
    }
  };
  const handleBUST = async (index: number) => {
    if (gameOn) {
      if (game && tournament) {
        let gameIndex = tournament.games.findIndex(
          (aGame) => aGame._id === game._id
        );
        await bust15(tournament._id!, game._id!, index, gameIndex);
      }
      update();
    }
  };
  const checkAndSetWinner = (
    foundGame: Game,
    Tid: string,
    gameIndex: number
  ): Player | undefined => {
    if (gameOn) {
      if (foundGame.winner !== null && foundGame.name !== "Shooting") {
        return foundGame.winner;
      }
      let wIndex = -1;
      if (foundGame.name === "Timber Toss") {
        wIndex = foundGame.score.findIndex((score) => {
          return score >= 30;
        });
      } else if (foundGame.name === "Beer Die") {
        wIndex = foundGame.score.findIndex((score) => {
          return score >= 11;
        });
      } else if (foundGame.name === "Kan Jam") {
        wIndex = foundGame.score.findIndex((score) => {
          return score >= 21;
        });
      } else if (foundGame.name === "Bean Bags") {
        wIndex = foundGame.score.findIndex((score) => {
          return score >= 21;
        });
      } else if (foundGame.name === "Ladder Golf") {
        wIndex = foundGame.score.findIndex((score) => {
          return score >= 21;
        });
      } else if (
        foundGame.name === "Shooting" ||
        foundGame.name === "Bocce Ball"
      ) {
        let highScore = foundGame.score.reduce((acc, cv) =>
          acc < cv ? cv : acc
        );
        wIndex = foundGame.score.findIndex((score) => {
          return score === highScore;
        });
      }
      if (wIndex !== -1) {
        exclaimWinner(foundGame.players[wIndex], Tid, gameIndex);
        return foundGame.players[wIndex];
      }
    }
  };

  return (
    <div className="TournamentGame universal">
      {winner && (
        <h2>
          {winner.name}
          {game?.name === "Shooting" || game?.name === "Bocce Ball"
            ? " is winning!!!"
            : " wins!!!"}
        </h2>
      )}

      <ul>
        {game &&
          game.players.map((player, i) => {
            return (
              <li>
                <p>
                  {player.name} : {game.score[i]}
                </p>
                <section onClick={handleClicker} className="points-section">
                  <div
                    onClick={() => {
                      changePoints(1, i);
                    }}
                  >
                    +1
                  </div>
                  <div
                    onClick={() => {
                      changePoints(2, i);
                    }}
                  >
                    +2
                  </div>
                  <div
                    onClick={() => {
                      changePoints(3, i);
                    }}
                  >
                    +3
                  </div>
                  <div
                    onClick={() => {
                      changePoints(4, i);
                    }}
                  >
                    +4
                  </div>
                  <div
                    onClick={() => {
                      changePoints(5, i);
                    }}
                  >
                    +5
                  </div>
                  <div
                    onClick={() => {
                      changePoints(6, i);
                    }}
                  >
                    +6
                  </div>
                  <div
                    onClick={() => {
                      changePoints(7, i);
                    }}
                  >
                    +7
                  </div>
                  <div
                    onClick={() => {
                      changePoints(8, i);
                    }}
                  >
                    +8
                  </div>
                  <div
                    onClick={() => {
                      changePoints(9, i);
                    }}
                  >
                    +9
                  </div>
                  <div
                    onClick={() => {
                      handleBUST(i);
                    }}
                  >
                    BUST
                  </div>
                </section>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TournamentGame;
