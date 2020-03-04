import mongoose from "mongoose";

const User = mongoose.model("User", {
  fullname: String,
  username: String,
  phone_number: String,
  city: String
});

const resolvers = {
  Query: {
    getUsers: () => User.find()
  },
  Mutation: {
    addUser: async (_, { fullname, username, phone_number, city }) => {
      const user = new User({ fullname, username, phone_number, city });
      await user.save();
      return user;
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndRemove(id);
      return "User deleted";
    }
  }
};

export default resolvers;
