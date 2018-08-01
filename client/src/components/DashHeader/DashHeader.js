import React, { Component } from "react";
import axios from 'axios';
import { Col, Row } from "../../components/Grid";
import Button from "../../components/Button";
import "./DashHeader.css";

class DashHeader extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    profileImg: "",
    totalCompleted: ""
  }

  componentDidMount() {
    this.grabUserId();
  }

  grabUserId = () => {
    axios.get("/api/getid/").then((response) => {
      var userId = response.data.user;
      console.log("This is the user ID: ", response);
      this.getUserInfo(userId);
    });
  }

  getUserInfo = (userId) => {
    console.log("Logged In User ID: " + userId);
    axios.get("/api/users/" + userId).then((response) => {
      this.setState({
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        email: response.data.email,
        profileImg: response.data.profile_img,
        totalCompleted: response.data.total_completed
      })
    });
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

              <img src={`/assets/uploads/${this.state.profileImg}`} className="img-fluid profile-photo" alt="default" />
              <span className="user-name">{this.state.firstName} {this.state.lastName}</span>
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
