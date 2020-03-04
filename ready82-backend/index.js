import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import resolvers from "./graphql/resolver";

mongoose.connect(
  "mongodb+srv://user_01:qlqjs9515@cudy-lllg6.gcp.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const typeDefs = `
type User {
    id: ID!
    fullname: String!
    username: String!
    phone_number: String!
    city: String!
    }

    type Query {
    getUsers: [User]
    }

    type Mutation {
    addUser(
        fullname: String!
        username: String!
        phone_number: String!
        city: String!
    ): User!
    deleteUser(id: ID!): String
    }
`;

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

mongoose.connection.once("open", function() {
  server.start(() => console.log("Server is running on localhost:4000"));
});
