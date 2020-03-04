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
        tier: String!
        rank: String!
        summonerId: String!
        summonerName: String!
        leaguePoints: Int!
        wins: Int!
        losses: Int!
    }

    type My {
      name: String!
      id: String!
    }

    type Query {
        getUser(userid:String!): [My]!
    }
`;

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

mongoose.connection.once("open", function() {
  server.start(() => console.log("Server is running on localhost:4000"));
});
