import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const SUMMONER_URL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`;

export const getUserID = async userid => {
  const url = SUMMONER_URL.concat(userid);
  console.log(url);
  const user = await axios(url, {
    params: {
      api_key: process.env.RIOT_API_KEY
    }
  });
  return user.data;
};
