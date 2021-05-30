import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [auth, setAuth] = useState(true);

  return (
    <nav className="mb-4 shadow">
      <div className="container mx-auto px-6 py-3  flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-purple-500 hover:text-purple-800 text-xl"
          href="#main"
        >
          merkle-development-task
        </Link>
        <div className=" lg:block">
          <ul className="inline-flex">
            <li>
              <Link to="/login" className="px-4 hover:text-purple-800" href="/">
                Log in
              </Link>
            </li>
            <li>
              <a className="px-4 hover:text-purple-800" href="#">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
