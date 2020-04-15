import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import resolvers from "./graphql/resolver";

mongoose.connect(
  "mongodb+srv://user_01:qlqjs9515@cudy-lllg6.gcp.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
      encryptedid: String,
      tier: String,
      rank: String,
      leaguePoints: Int,
      wins: Int,
      losses: Int,
    }

    type LineInfo {
      userid: String,
      tier: String,
      rank: String,
      leaguePoints: Int,
      wins: Int,
      losses: Int
    }

    type Room {
      id: String,
      title: String,
      host: String,
      time: String,
      target_time: String,
      top: LineInfo
      jungle: LineInfo
      mid: LineInfo
      ad: LineInfo
      sup: LineInfo    
    }

    type Query {
        findUser(email:String!): User
        getUser(userid:String!): Userid!
        getDetails(encryptedid:String!): [Details]
    }

    type Mutation {
      addUser(
        email: String,
        userid: String,
        encryptedid: String,
        tier: String,
        rank: String,
        leaguePoints: Int,
        wins: Int,
        losses: Int,
      ): User!

      updateUser(
        email: String,
        userid: String,
        tier: String,
        rank: String,
        leaguePoints: Int,
        wins: Int,
        losses: Int,
      ): User!
      

      addRoom(
        id: String
        title: String
        host: String
        time: String
        target_time: String
      ): Room

      joinRoom(
        id: String
        userid: String
        line: String
        mode: String
      ): Room
    }
`;

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

mongoose.connection.once("open", function () {
  server.start(() => console.log("Server is running on localhost:4000"));
});
