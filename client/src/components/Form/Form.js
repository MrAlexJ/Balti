import React from "react";
import { Col, Row } from "../../components/Grid";
import "./Form.css";

const Form = props => (
  <form className="add-item">
      <h6>Add your next bucket list item!</h6>
      <Row>
        <Col size="sm-2">
          <select onChange={props.handleDropChange} className="form-control" value={props.listType}>
            <option value="select">List Type</option>
            <option value="wish" >Wish List</option>
            <option value="bucket" >Bucket List</option>
          </select>
        </Col>
        <Col size="sm-6">
          <input
            className="form-control"
            id="bucket_items"
            type="text"
            value={props.bucket_items}
            placeholder=""
            name="bucket_items"
            onChange={props.handleInputChange}
          />
        </Col>
        <Col size="sm-2">
          <div className="allow-public text-center">
            <span className="check-box-content">
              Allow Public
              <input 
                type="checkbox" 
                aria-label="Checkbox for following text input" 
                id="public"
                // value={props.public}
                // defaultChecked={false}
                onChange={props.toggleIsChecked} 
                checked={props.isChecked}
              />
            </span>
          </div>
        </Col>
        <Col size="sm-2">
          <button
            onClick={props.handleFormSubmit}
            type="submit"
            className="btn btn-block btn-primary"
          >
            Submit
          </button>
        </Col>
      </Row>
  </form>
);

export default Form;
