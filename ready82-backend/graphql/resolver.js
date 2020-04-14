import mongoose from "mongoose";
import { getUserID, getUserDetails } from "./api";

const User = mongoose.model("user", {
  email: String,
  userid: String,
  encryptedid: String,
  tier: String,
  rank: String,
  leaguePoints: Number,
  wins: Number,
  losses: Number,
});

const LineObject = {
  userid: String,
  tier: String,
  rank: String,
  leaguePoints: Number,
  wins: Number,
  losses: Number,
};

const Room_5P = mongoose.model("room", {
  id: String,
  title: String,
  host: String,
  time: String,
  target_time: String,
  top: LineObject,
  jungle: LineObject,
  mid: LineObject,
  ad: LineObject,
  sup: LineObject,
});
const resolvers = {
  Query: {
    findUser: (_, { email }) => User.findOne({ email: email }),
    getUser: (_, { userid }) => getUserID(userid),
    getDetails: (_, { encryptedid }) => getUserDetails(encryptedid),
  },
  Mutation: {
    addUser: async (
      _,
      { email, userid, encryptedid, tier, rank, leaguePoints, wins, losses }
    ) => {
      const user = new User({
        email,
        userid,
        encryptedid,
        tier,
        rank,
        leaguePoints,
        wins,
        losses,
      });
      await user.save();
      return user;
    },
    updateUser: async (
      _,
      { email, userid, tier, rank, leaguePoints, wins, losses }
    ) => {
      await User.updateOne(
        { email: email },
        {
          $set: {
            userid: userid,
            tier: tier,
            rank: rank,
            leaguePoints: leaguePoints,
            wins: wins,
            losses: losses,
          },
        }
      );
      return User.findOne({ email: email });
    },

    addRoom: async (_, { id, title, host, time, target_time }) => {
      const line_default = {
        userid: "default",
        tier: "default",
        rank: "default",
        leaguePoints: -1,
        wins: -1,
        losses: -1,
      };
      const room = new Room_5P({
        id,
        title,
        host,
        time,
        target_time,
        top: line_default,
        jungle: line_default,
        mid: line_default,
        ad: line_default,
        sup: line_default,
      });
      await room.save();
      return room;
    },

    joinRoom: async (_, { id, userid, line }) => {
      await User.findOne({ userid: userid }).then(async (res) => {
        await Room_5P.updateOne(
          { id: id },
          {
            $set: {
              [`${line}`]: {
                userid: res.userid,
                tier: res.tier,
                rank: res.rank,
                leaguePoints: res.leaguePoints,
                wins: res.wins,
                losses: res.losses,
              },
            },
          }
        );
      });
      return Room_5P.findOne({ id: id });
    },
  },
};

export default resolvers;
