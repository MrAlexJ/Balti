import React from "react";

const Button = (props) => (

  <button className={`btn btn-${props.type || "primary"}`}>
      {props.children}
  </button>
);

export default Button;
