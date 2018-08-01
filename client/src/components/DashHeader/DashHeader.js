import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import Button from "../../components/Button";
import panda from "../../images/default.jpg";
import "./DashHeader.css";

class DashHeader extends Component {
  state = {

  }

  render() {
    return (
      <div className="dash-header">
        <Row>
          <Col size="sm-6">
            <div className="user-info">
              <img src={panda} className="img-fluid profile-photo" />
              <span className="user-name">AJ Penalosa</span>
            </div>
          </Col>
          <Col className="text-right" size="sm-6">
            <div className="text-right">
              <Button
                buttonStyle="light"
                type="button"
              >
                Log Out
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default DashHeader;
