import { useEffect, useState } from "react";
import { Tournament } from "../models/Tournament";
import "./PastTournaments.css";
import { getAllTournaments } from "../services/tournamentServices";

const PastTournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  useEffect(() => {
    getAllTournaments().then((res) => setTournaments(res));
  }, []);
  return (
    <div className="PastTournaments">
      <ul>
        {tournaments &&
          tournaments.map((item) => (
            <li>
              <h2>year: {item.year}</h2>
              <div>
                <h3>Players:</h3>
                {item.players.map((player) => (
                  <p>{player.name}</p>
                ))}
              </div>
              <div>
                <h3>Games:</h3>
                {item.games.map((game) => (
                  <div>
                    <p>
                      Game: {game.name} <br /> Winner(s):{" "}
                      {game.winner?.name || ""} <br />
                      Scores: {game.score.map((score) => `${score} `)}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PastTournaments;
