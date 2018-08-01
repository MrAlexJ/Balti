import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo@2x.png";
import "./Menu.css";

const Menu = () => (

  <div className="menu">
    <a className="dashboard-brand" href="/dashboard">
      <img src={logo} alt="Balti" className="logo" />
      <span className="logo-text">Balti</span>
    </a>

    <div className="menu-wrapper">
      <ul className="menu-list">
        <li className="menu-item">
          <Link
            to="/dashboard"
            className={
              window.location.pathname === "/dashboard" ? "menu-link active" : "menu-link"
            }
          >
            <span className="arrow-left"></span>
            <span className="link-content">
              <i className="fas fa-table"></i>
              <span className="menu-link-text">Dashboard</span>
            </span>
          </Link>
        </li>
        <li className="menu-item">
          <Link
            to="/profile"
            className={
              window.location.pathname === "/profile" ? "menu-link active" : "menu-link"
            }
          >
            <span className="arrow-left"></span>
            <span className="link-content">
              <i className="fas fa-user"></i>
              <span className="menu-link-text">Profile</span>
            </span>
          </Link>
        </li>
        <li className="menu-item">
          <Link
            to="/search"
            className={
              window.location.pathname === "/search" ? "menu-link active" : "menu-link"
            }
          >
            <span className="arrow-left"></span>
            <span className="link-content">
              <i className="fas fa-search"></i>
              <span className="menu-link-text">Search</span>
            </span>
          </Link>
        </li>
      </ul>
    </div>
    
    <Link
      to="/settings"
      className="btn-block btn-settings text-center"
    >
      <i className="fas fa-cog"></i> Settings
    </Link>

  </div>
);

export default Menu;
