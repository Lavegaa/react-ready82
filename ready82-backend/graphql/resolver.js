import mongoose from "mongoose";
import { getUserID, getUserDetails } from "./api";

const User = mongoose.model("User", {
  email: String,
  userid: String,
  encryptedid: String
});

const Post_5p = mongoose.model("post", {
  id: String,
  title: String,
  host: String,
  time: String,
  target_time: String,
  top_id: String,
  jungle_id: String,
  mid_id: String,
  ad_id: String,
  sup_id: String
});
const resolvers = {
  Query: {
    findUser: (_, { email }) => User.find({ email: email }),
    getUser: (_, { userid }) => getUserID(userid),
    getDetails: (_, { encryptedid }) => getUserDetails(encryptedid)
  },
  Mutation: {
    addUser: async (_, { email, userid, encryptedid }) => {
      const user = new User({ email, userid, encryptedid });
      await user.save();
      return user;
    },
    addPost: async (_, { id, title, host, time, target_time }) => {
      const post = new User({ id, title, host, time, target_time });
      await post.save();
      return post;
    }
  }
};

export default resolvers;
