import mongoose from "mongoose";
import { getUserID } from "./api";

const User = mongoose.model("User", {
  fullname: String,
  username: String,
  phone_number: String,
  city: String
});

const resolvers = {
  Query: {
    getUser: (_, { userid }) => getUserID(userid)
  }
};

export default resolvers;
