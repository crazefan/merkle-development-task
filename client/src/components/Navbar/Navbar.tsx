import React from "react";
import { Link } from "react-router-dom";

import { NavbarProps } from "../../types";

const Navbar = ({ isAuth, handleLogout }: NavbarProps) => {
  return (
    <nav className="mb-4 shadow">
      <div className="container mx-auto px-6 py-3  flex justify-between items-center">
        <Link to="/" className="font-bold text-purple-500 hover:text-purple-800 text-xl">
          merkle-development-task
        </Link>
        <div className=" lg:block">
          <ul className="inline-flex">
            <li>
              {!isAuth ? (
                <Link to="/login" className="px-4 hover:text-purple-800">
                  Log in
                </Link>
              ) : (
                <button className="px-4 hover:text-purple-800" onClick={handleLogout}>
                  Log out
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
