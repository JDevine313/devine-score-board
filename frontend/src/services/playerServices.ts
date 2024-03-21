import axios from "axios";
import Player from "../models/Player";

const baseUrl: string = import.meta.env.VITE_BASE_URL || "";

export const getPlayerByPhone = async (
  phoneNumber: string
): Promise<Player> => {
  return (
    await axios.get(`${baseUrl}/players/${encodeURIComponent(phoneNumber)}`)
  ).data;
};

export const addPlayer = async (player: Player): Promise<Player> => {
  return (await axios.post(`${baseUrl}/players`, player)).data;
};
