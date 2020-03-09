import { getUserID, getUserDetails, User, post } from "./api";

const resolvers = {
  Query: {
    findUser: (_, { email }) => User.find({ email: email }),
    getUser: (_, { userid }) => getUserID(userid),
    getDetails: (_, { encryptedid }) => getUserDetails(encryptedid)
  }
};

export default resolvers;
