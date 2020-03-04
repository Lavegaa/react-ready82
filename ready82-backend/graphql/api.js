import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const SUMMONER_URL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/Dlookx2?api_key=RGAPI-29c12f78-3f08-4b1d-b303-0623a629cefd`;

export const getUserID = async userid => {
  const user = await axios(SUMMONER_URL);
  return user.data;
};
