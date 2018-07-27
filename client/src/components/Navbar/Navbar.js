import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link
        to="/"
        className={
          window.location.pathname === "/" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/dashboard"
        className={
          window.location.pathname === "/dashboard" ? "nav-link active" : "nav-link"
        }
      >
        Dashboard
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/profile"
        className={
          window.location.pathname === "/profile" ? "nav-link active" : "nav-link"
        }
      >
        Profile
      </Link>
    </li>
  </ul>
);

export default Navbar;
