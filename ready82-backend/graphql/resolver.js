import mongoose from "mongoose";
import { getUserID, getUserDetails } from "./api";

const User = mongoose.model("User", {
  email: String,
  userid: String,
  encryptedid: String
});

const post = mongoose.model("post", {
  email: String,
  post: String
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
    }
  }
};

export default resolvers;
