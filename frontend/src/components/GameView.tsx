import { useEffect, useState } from "react";
import "./GameView.css";
import { getAllGames } from "../services/gameServices";
import Game from "../models/Game";
import { Link } from "react-router-dom";

const GameView = () => {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    getAllGames().then((res) => setGames(res));
  }, []);

  const formatDateTime = (date: Date) => {
    let x = date.toString();
    let month = x.slice(5, 7);
    let day = x.slice(8, 10);
    let year = x.slice(0, 4);
    return `${month}-${day}-${year}`;
  };
  return (
    <div className="GameView">
      <h2>All Games</h2>
      {games && (
        <ul>
          {games.map((game) => (
            <Link to={`/${game.name}/${game._id}`} key={game._id}>
              <li className="game">
                <p>Date: {formatDateTime(game.date)}</p>
                <p>Game: {game.name}</p>
                <p>
                  Players:{" "}
                  {game.players.map((player) => (
                    <span>{player.name},</span>
                  ))}
                </p>
                <p>
                  Score:{" "}
                  {game.score.map((score) => (
                    <span>{score},</span>
                  ))}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameView;
