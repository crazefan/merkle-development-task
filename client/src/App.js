import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import LoginPage from "./components/LoginPage/LoginPage";
import { hasToken } from "./utils/utils";

function App() {
  const [isAuth, setIsAuth] = useState(hasToken);

  //on user logout delete cookie
  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  const handleIsAuth = async () => {
    setIsAuth(true);
  };

  let routes = (
    <Switch>
      <Route
        exact
        path="/login/"
        render={(props) => <LoginPage {...props} handleIsAuth={handleIsAuth} />}
      />
      <Redirect to="/login" />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
        <Route exact path="/" component={Search} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Router>
      <Navbar isAuth={isAuth} handleLogout={handleLogout} />
      {routes}
    </Router>
  );
}

export default App;
