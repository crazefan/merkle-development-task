import React, { useState } from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [auth, setAuth] = useState(true);

  return (
    <nav className={styles.navbar}>
      <section>
        <div className="navContent">
          <div className={styles.navLinks}></div>
        </div>
        <a href="#main">Main</a>
        <a href="#main">{auth ? "Log out" : "Log in"}</a>
      </section>
    </nav>
  );
};

export default Navbar;
