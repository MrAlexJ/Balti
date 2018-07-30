import React from "react";
import "./Modal.css";

const Modal = (props) => (
  
  <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby={props.labelledBy} aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header bg-primary">
          <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
      </div>
    </div>
  </div>

);

export default Modal;
