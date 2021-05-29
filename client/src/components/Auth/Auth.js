import React, { useState } from "react";
import { authRequest } from "../../utils/api";

const Auth = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [authmessage, setAuthmessage] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleLogin = async () => {
    const [data, error] = await authRequest(username, password);
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
  };

  const authError = () => {
    <p>Authentication failed, wrong credentials</p>;
  };

  return (
    <div>
      <label htmlFor="login" />
      <input id="login" type="text" onChange={handleUsernameChange} />
      <label htmlFor="password" />
      <input id="password" type="password" onChange={handlePasswordChange} />
      <button onClick={handleLogin}>Log in</button>
      {authmessage ? authError : null}
    </div>
  );
};

export default Auth;
