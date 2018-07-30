import React from "react";

const Form = props => (
  <form>
    <div className="form-group">
      <label htmlFor="name">
        <h6>Add your next bucket list item!</h6>
      </label>
      <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">
        Check to Make Public
          <input 
          type="checkbox" 
          aria-label="Checkbox for following text input" 
          id="public"
          // value={props.public}
          // defaultChecked={false}
          onChange={props.toggleIsChecked} 
          checked={props.isChecked}
          />
        </div>
      </div>
      <input
        className="form-control"
        id="bucket_items"
        type="text"
        value={props.bucket_items}
        placeholder=""
        name="bucket_items"
        onChange={props.handleInputChange}
      />
      </div>
    </div>
    <div className="pull-right">
      <button
        onClick={props.handleFormSubmit}
        type="submit"
        className="btn btn-lg btn-danger"
      >
        Submit
      </button>
    </div>
  </form>
);

export default Form;
