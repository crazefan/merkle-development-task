import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./components/LoginPage/LoginPage";
import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import { authVerifyToken } from "./api/api";

function App() {
  const [isAuth, setIsAuth] = useState(null);

  //check if client has token and call in useEffect on mount
  const verifyToken = async () => {
    const [data, error] = await authVerifyToken();
    if (data && data === "valid") {
      setIsAuth(true);
    }
    if (error) {
      localStorage.removeItem("token");
      setIsAuth(false);
    }
  };

  //on user logout delete cookie
  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  const handleIsAuth = async () => {
    setIsAuth(true);
  };

  useEffect(() => {
    verifyToken();
  }, []);

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
