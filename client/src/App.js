import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [auth, setAuth] = useState(null);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/login/" component={Auth} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
