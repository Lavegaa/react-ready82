import ApolloClient from "apollo-boost";
import dotenv from "dotenv";
dotenv.config();

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

export default client;
