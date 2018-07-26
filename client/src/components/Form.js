import React from "react";

const Form = props => (
  <form>
    <div className="form-group">
      <label htmlFor="name">
        <h6>Add your next bucket list item!</h6>
      </label>
      <input
        className="form-control"
        id="item"
        type="text"
        value={props.item}
        placeholder=""
        name="name"
        onChange={props.handleInputChange}
        required
      />
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
