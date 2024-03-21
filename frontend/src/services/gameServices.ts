import axios from "axios";
import Game from "../models/Game";
import Player from "../models/Player";

const baseUrl: string = import.meta.env.VITE_BASE_URL || "";

export const getAllGames = async (): Promise<Game[]> => {
  return (await axios.get(`${baseUrl}/games`)).data;
};

export const getGameById = async (_id: string): Promise<Game> => {
  return (await axios.get(`${baseUrl}/games/${encodeURIComponent(_id)}`)).data;
};

export const newGame = async (
  players: Player[],
  winner: Player | null,
  name: string
): Promise<Game> => {
  return (
    await axios.post(`${baseUrl}/games`, {
      players,
      winner,
      name,
      date: new Date(),
      score: [0],
    })
  ).data;
};

export const joinGame = async (player: Player, _id: string): Promise<Game> => {
  return (
    await axios.patch(
      `${baseUrl}/games/add-player/${encodeURIComponent(_id)}`,
      player
    )
  ).data;
};

export const changePoints = async (
  _id: string,
  index: number,
  points: number
): Promise<Game> => {
  return (
    await axios.patch(
      `${baseUrl}/games/change-points/${encodeURIComponent(_id)}/${index}`,
      { points }
    )
  ).data;
};

export const BUST = async (game: Game): Promise<Game> => {
  return (
    await axios.put(`${baseUrl}/games/${encodeURIComponent(game._id!)}`, game)
  ).data;
};
