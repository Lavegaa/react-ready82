import axois from "axois";
import dotenv from "dotenv";
dotenv.config();
let userid = "";
const SUMMONER_URL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${useid}?api_key=${process.env.RIOT_API_KEY}`;
