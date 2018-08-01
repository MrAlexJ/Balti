import React, { Component } from "react";
import axios from 'axios';
import { Col, Row, Container } from "../../components/Grid";
import Button from "../../components/Button";
import panda from "../../images/default.jpg";
import "./DashHeader.css";

class DashHeader extends Component {
  state = {

  }

  handleLogOut = () => {
      axios.get('/logout').then(response => {
          console.log(response);
          if (response.data.code === 707) {
              console.log("You are logged in.");
              window.location.href = '/';
          } else if (response.data === "") {
            console.log("You are not logged in!");
              window.location.href = '/';
          } else {
              console.log("You have been logged out.");
              window.location.href = '/';
          };
      });
  };

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
                onClick={this.handleLogOut}
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
