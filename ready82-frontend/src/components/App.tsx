import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { SearchPage, LoginPage } from "../routes";

function App() {
  return (
    <Router>
      <Route exact path="/" component={SearchPage} />
      <Route path="/login" component={LoginPage} />
    </Router>
  );
}

export default App;
