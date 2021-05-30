import React, { useState } from "react";

const Navbar = () => {
  const [auth, setAuth] = useState(true);

  return (
    <nav class="mb-2">
      <div class="container mx-auto px-6 py-2 flex justify-between items-center">
        <a class="font-bold text-xl" href="#main">
          merkle-development-task
        </a>
        <div class=" lg:block">
          <ul class="inline-flex">
            <li>
              <a class="px-4 hover:text-purple-800" href="/">
                Log in
              </a>
            </li>
            <li>
              <a class="px-4 hover:text-purple-800" href="#">
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
