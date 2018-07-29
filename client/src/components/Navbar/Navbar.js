import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (

  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Balti</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
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
      </div>
    </div>
  </nav>
);

export default Navbar;
