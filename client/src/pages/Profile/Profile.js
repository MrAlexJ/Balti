import React, { Component } from "react";
import Form from "../../components/Form";
import List from "../../components/List";
import axios from "axios";

class Profile extends Component {
  // initial form state
  state = {
    items: [],
    dateCreated:"",
    dateCompleted:"",
    completed: false
  };

  componentDidMount() {
  }

  handleInputChange = (event) => {
    // update any state property with the input value of the same name
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitItem = (event) => {
    event.preventDefault();
    axios.post("/api/profile", this.state).then((response) => {
      if (response.data === true) {
        // clear state/input values
        this.setState({
          bucket_items: "",
          list_type: "",
          public: "",
          date_complete: "",
          image: "",
        });
      }
      else {
        alert("Error. Item was not posted.");
      }
  });
}


  render() {
    return (
      <container>
          <h1> Welcome to your Bucket List! </h1>
        <div>
            <div>
                <h5>Before I Kick the Bucket, I Gotta...</h5>
              <List
                item={this.state.item}
              />
            </div>
            <div>
              <Form
                item={this.state.item}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                dateCreated={this.state.dateCreated}
                dateCompleted={this.state.dateCompleted}
                completed={this.state.completed}
              />
            </div>
        </div>
      </container>
    );
  }
}

export default Profile;

