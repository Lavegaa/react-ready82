import mongoose from "mongoose";
import { getUserID, getUserDetails } from "./api";

const User = mongoose.model("User", {
  fullname: String,
  username: String,
  phone_number: String,
  city: String
});

const resolvers = {
  Query: {
    getUser: (_, { userid }) => getUserID(userid),
    getDetails: (_, { encryptedid }) => getUserDetails(encryptedid)
  }
};

export default resolvers;
