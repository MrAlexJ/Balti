import React from "react";
import "./Header.css";
import Button from "../Button/Button";
import logo from "./images/logo@2x.png";

const Header = () => (
  <header>
    <div className="main-header text-center">
      <img src={logo} alt="Balti" className="logo" />
      <h1>Welcome to Balti</h1>
      <h2>Live your dreams. Share your memories.</h2>
      <div className="buttons">
        <Button
          buttonType="primary"
        >
          Sign Up
        </Button>
        <Button
          buttonType="primary">
          Log In
        </Button>
      </div>
    </div>
  </header>
);

export default Header;
