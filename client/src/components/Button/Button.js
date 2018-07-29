import React from "react";
import "./Button.css";

const Button = (props) => (

  <button className={`btn btn-${props.type || "primary"}`} data-toggle="modal"  data-target={`#${props.modalTarget || " "}`}>
      {props.children}
  </button>
);

export default Button;
