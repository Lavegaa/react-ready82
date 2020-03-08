import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";
import { UserContextProvider } from "./contexts/UserContext";
ReactDOM.render(
  <UserContextProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
