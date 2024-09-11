import axios from "axios";
import { Tournament } from "../models/Tournament";
import Player from "../models/Player";
import Game from "../models/Game";
import { newGame } from "./gameServices";

const baseUrl: string = import.meta.env.VITE_BASE_URL || "";

export const getTournament = async (): Promise<Tournament> => {
  return (await axios.get(`${baseUrl}/tournaments`)).data;
};
export const getAllTournaments = async (): Promise<Tournament[]> => {
  return (await axios.get(`${baseUrl}/tournaments/all`)).data;
};

export const newTournament = async (
  tournament: Tournament
): Promise<Tournament> => {
  return (await axios.post(`${baseUrl}/tournaments`, tournament)).data;
};

export const joinTournament = async (player: Player): Promise<any> => {
  let id = await getTournament();
  return (await axios.patch(`${baseUrl}/tournaments/${id._id}`, player)).data;
};

export const addAGame = async (game: Game): Promise<void> => {
  let id = await getTournament();
  let gameWId = await newGame(game.players, null, game.name);
  return (await axios.patch(`${baseUrl}/tournaments/${id._id}/game`, gameWId))
    .data;
};

export const editPoints = async (
  points: number,
  tournamentId: string,
  gameId: string,
  playerIndex: number,
  gameIndex: number
): Promise<Tournament> => {
  return (
    await axios.patch(
      `${baseUrl}/tournaments/${tournamentId}/points/${gameId}/${playerIndex}/${gameIndex}`,
      { points }
    )
  ).data;
};
export const bust15 = async (
  tournamentId: string,
  gameId: string,
  playerIndex: number,
  gameIndex: number
): Promise<Tournament> => {
  return (
    await axios.patch(
      `${baseUrl}/tournaments/${tournamentId}/points/${gameId}/${playerIndex}/${gameIndex}/bust`,
      { points: 15 }
    )
  ).data;
};

export const exclaimWinner = async (
  winner: Player,
  Tid: string,
  gameIndex: number
): Promise<void> => {
  return (
    await axios.patch(`${baseUrl}/tournaments/${Tid}/winner/${gameIndex}`, {
      winner,
    })
  ).data;
};
