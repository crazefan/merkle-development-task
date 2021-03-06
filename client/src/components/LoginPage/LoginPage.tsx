import React, { useState } from "react";

import { authRequest } from "../../api/api";

import { LoginPageProps } from "../../types";

const LoginPage = ({ handleIsAuth }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authmessage, setAuthmessage] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleLogin = async () => {
    setAuthmessage(false);

    const [data, error] = await authRequest(username, password);

    if (error) {
      setAuthmessage(true);
      return;
    }

    if (data) {
      handleIsAuth();
      localStorage.setItem("token", data);
    }
  };

  return (
    <div className="flex justify-center pt-10">
      <div className="max-w-md bg-white rounded px-8 py-6 mx-10 flex flex-col">
        <div className="mb-4">
          <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            onChange={handleUsernameChange}
            className="shadow appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            onChange={handlePasswordChange}
            className="shadow appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>

        <button
          className="bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <div>
          <p className="text-xs text-red-500 py-2" hidden={!authmessage}>
            Authentication failed, wrong credentials
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
