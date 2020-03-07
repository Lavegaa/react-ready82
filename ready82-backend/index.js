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
    type Details {
        tier: String!
        rank: String!
        summonerId: String!
        summonerName: String!
        leaguePoints: Int!
        wins: Int!
        losses: Int!
    }

    type Userid {
      name: String!
      id: String!
    }

    type User {
      email: String,
      userid: String,
      encryptedid: String
    }

    type Query {
        findUser(email:String!): [User]
        getUser(userid:String!): Userid!
        getDetails(encryptedid:String!): [Details]!
    }
`;

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

mongoose.connection.once("open", function() {
  server.start(() => console.log("Server is running on localhost:4000"));
});
