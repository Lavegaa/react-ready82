import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Search from "../routes/Search";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Search} />
    </Router>
  );
}

export default App;
