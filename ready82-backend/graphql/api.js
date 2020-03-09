import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const SUMMONER_URL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/`;
const USERID_URL = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/`;

export const User = mongoose.model("User", {
  email: String,
  userid: String,
  encryptedid: String
});

export const post = mongoose.model("post", {
  email: String,
  post: String
});

export const getUserID = async userid => {
  const url = SUMMONER_URL.concat(userid);
  const user = await axios(url, {
    params: {
      api_key: process.env.RIOT_API_KEY
    }
  });
  return user.data;
};

export const getUserDetails = async encryptedid => {
  const url = USERID_URL.concat(encryptedid);
  const details = await axios(url, {
    params: {
      api_key: process.env.RIOT_API_KEY
    }
  });
  console.log(details.data);
  return details.data;
};
