import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./components/LoginPage/LoginPage";
import Search from "./components/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import { authReadCookie, authDeleteCookie } from "./api/api";

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [username, setUsername] = useState("");

  //check if client has cookie and call in useEffect on mount
  const readCookie = async () => {
    const res = await authReadCookie();
    console.log(res);
    if (res.username) {
      setUsername(res.username);
      setIsAuth(true);
    }
  };

  //on user logout delete cookie
  const handleLogout = async () => {
    const res = await authDeleteCookie();
    setIsAuth(false);
  };

  const handleIsAuth = async () => {
    setIsAuth(true);
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <Router>
      <Navbar username={username} isAuth={isAuth} handleLogout={handleLogout} />
      <Switch>
        <Route exact path="/" component={Search} />
        {!isAuth ? (
          <Route
            exact
            path="/login/"
            render={(props) => <LoginPage {...props} handleIsAuth={handleIsAuth} />}
          />
        ) : null}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
