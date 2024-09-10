import { FormEvent, useContext, useEffect, useState } from "react";
import "./Tournament.css";
import PlayerContext from "../context/PlayerContext";
import {
  getTournament,
  joinTournament,
  newTournament,
} from "../services/tournamentServices";
import { Tournament as T } from "../models/Tournament";
import { addAGame } from "../services/tournamentServices";
import { Link } from "react-router-dom";
import Player from "../models/Player";

const Tournament = () => {
  const [tourny, setTourny] = useState<T | null>(null);
  const [started, setStarted] = useState<boolean>(false);
  const [addGame, setAddGame] = useState<boolean>(false);

  const [selections, setSelections] = useState<any>([null]);

  const [game, setGame] = useState<string>("timbertoss");
  const { player } = useContext(PlayerContext);
  useEffect(() => {
    getTournament().then((res) => {
      if (res) {
        setTourny(res);
        setStarted(true);
      }
    });
  }, []);
  console.log(tourny);
  const handleGames = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (tourny) {
      let playersSet: Player[] = [];
      for (let i = 0; i < tourny.players.length; i++) {
        let p1 = tourny.players.find((player) => player.name === selections[i]);
        if (p1) {
          console.log(p1, selections[i]);
          playersSet.push(p1);
        }
      }
      await addAGame({
        players: playersSet,
        winner: null,
        name: game,
        date: new Date(),
        score: Array(tourny.players.length).fill(0),
      });
      getTournament().then((res) => {
        if (res) {
          setTourny(res);
          setStarted(true);
        }
      });
    }
    setAddGame(false);
    setSelections([null]);
  };

  const handleSelectionChange = (index: number, value: any) => {
    const newSelections = [...selections];
    newSelections[index] = value;
    setSelections(newSelections);

    // Only add a new dropdown if the current dropdown selection is made and it's the last one
    if (index === selections.length - 1 && value !== null) {
      setSelections([...newSelections, null]); // Add a new dropdown
    }
  };
  return (
    <div className="Tournament">
      {player && (
        <>
          {!started && (
            <button
              onClick={() =>
                newTournament({
                  year: new Date().getFullYear(),
                  games: [],
                  players: [],
                }).then(() => {
                  getTournament().then((res) => {
                    if (res) {
                      setTourny(res);
                      setStarted(true);
                    }
                  });
                })
              }
            >
              New Tournament!
            </button>
          )}
          <button
            onClick={() =>
              joinTournament(player).then(() => {
                getTournament().then((res) => {
                  if (res) {
                    setTourny(res);
                    setStarted(true);
                  }
                });
              })
            }
          >
            Join The Tournament!
          </button>
        </>
      )}
      <button onClick={() => setAddGame(true)}>Add Games</button>
      {addGame && (
        <form onSubmit={handleGames}>
          <label htmlFor="games">Game</label>
          <select
            name="games"
            id="games"
            value={game}
            onChange={(e) => setGame(e.target.value)}
          >
            <option value="Timber Toss">Timber-Toss</option>
            <option value="Bean Bags">Bean Bags</option>
            <option value="Kan Jam">Kan Jam</option>
            <option value="Beer Die">Beer Die</option>
            <option value="Bocce Ball">Bocce Ball</option>
            <option value="Shooting">Shooting</option>
            <option value="Ladder Golf">Ladder Golf</option>
          </select>
          {selections.map((selection: any, i: number) => (
            <>
              <label htmlFor={`player${i + 1}`}>Player {i + 1}</label>
              <select
                name={`player${i + 1}`}
                id={`player${i + 1}`}
                value={selection || ""}
                onChange={(e) => handleSelectionChange(i, e.target.value)}
              >
                <option value="" selected disabled>
                  Player {i + 1}
                </option>
                {tourny?.players.map((player) => (
                  <option value={`${player.name}`}>{player.name}</option>
                ))}
              </select>
            </>
          ))}
          {/* loop inputs here */}
          {/* <label htmlFor="player1">Player 1</label>
          <select
            name="player1"
            id="player1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          >
            <option value="" selected disabled>
              Player 1
            </option>
            {tourny?.players.map((player) => (
              <option value={`${player.name}`}>{player.name}</option>
            ))}
          </select>
          <label htmlFor="player2">Player 2</label>
          <select
            name="player2"
            id="player2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          >
            <option value="" selected disabled>
              Player 2
            </option>
            {tourny?.players.map((player) => (
              <option value={`${player.name}`}>{player.name}</option>
            ))}
          </select> */}
          <button>Add</button>
        </form>
      )}
      {tourny?.games.map((game) => {
        return (
          <Link to={`/tournament/${game._id}`}>
            <div className="game">
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
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Tournament;
