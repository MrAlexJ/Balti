import React from "react";
import "./Button.css";

const Button = (props) => {

  switch(props.type) {
    case "modal":
      return (
        <button
          className={`btn btn-${props.buttonStyle || "primary"}`}
          data-toggle="modal" 
          data-target={`#${props.modalTarget}`}
        >
            {props.children}
        </button>
      );
    case "cancel":
      return (
        <button
          type="reset"
          className={`btn btn-${props.buttonStyle || "primary"}`}
          data-dismiss="modal"
        >
            {props.children}
        </button>
      );
    case "submit":
    return (
      <button
        type={`${props.type || "button"}`}
        className={`btn btn-${props.buttonStyle || "primary"}`}
      >
          {props.children}
      </button>
    );
    default:
    return (
      <button
        type="button"
        className={`btn btn-${props.buttonStyle || "primary"}`}
        onClick={props.onClick}
      >
          {props.children}
      </button>
    );
  }
}

export default Button;
