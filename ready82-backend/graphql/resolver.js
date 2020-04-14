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

const Room_5P = mongoose.model("room", {
  id: String,
  title: String,
  host: String,
  time: String,
  target_time: String,
  top_id: String,
  jungle_id: String,
  mid_id: String,
  ad_id: String,
  sup_id: String,
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
      const line_default = "";
      const room = new Room_5P({
        id,
        title,
        host,
        time,
        target_time,
        line_default,
        line_default,
        line_default,
        line_default,
        line_default,
      });
      await room.save();
      return room;
    },
  },
};

export default resolvers;
