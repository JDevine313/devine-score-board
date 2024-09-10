import "./TournamentGame.css";

import { useEffect, useState } from "react";
import Game from "../models/Game";
import {
  bust15,
  editPoints,
  getTournament,
} from "../services/tournamentServices";
import { useParams } from "react-router-dom";
import { Tournament } from "../models/Tournament";

const TournamentGame = () => {
  const [game, setGame] = useState<Game>();
  const gameId = useParams().game;
  const [tournament, setTournament] = useState<Tournament>();
  const update = () => {
    getTournament().then((res) => {
      if (res) {
        setTournament(res);
        let foundGame = res.games.find((game) => game._id === gameId);
        if (foundGame) {
          setGame(foundGame);
        }
      }
    });
  };
  useEffect(() => {
    update();
  }, [gameId]);
  const handleClicker = (e: any) => {
    if (e.target.tagName === "DIV") {
      e.target.classList.add("clicked");
      setTimeout(() => {
        e.target.classList.remove("clicked");
      }, 1000);
    }
  };

  const changePoints = async (score: number, index: number) => {
    if (game && tournament) {
      let gameIndex = tournament.games.findIndex(
        (aGame) => aGame._id === game._id
      );
      await editPoints(score, tournament._id!, game._id!, index, gameIndex);
      update();
    }
  };
  const handleBUST = async (index: number) => {
    if (game && tournament) {
      let gameIndex = tournament.games.findIndex(
        (aGame) => aGame._id === game._id
      );
      await bust15(tournament._id!, game._id!, index, gameIndex);
      update();
    }
  };

  return (
    <div className="TournamentGame universal">
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
                      update();
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
