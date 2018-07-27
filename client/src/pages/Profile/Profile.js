import React, { Component } from "react";
import Form from "../Form";
import List from "../List";

class Profile extends Component {
  // initial form state
  state = {
    items: [],
    dateCreated:"",
    dateCompleted:"",
    completed: false
  };

  handleInputChange = (event) => {
    // update any state property with the input value of the same name
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitItem = (event) => {
    event.preventDefault();
    // axios.post("/api/item", this.state).then((response) => {
    //   if (response.data === true) {
    //     // clear state/input values
    //     this.setState({
    //         item: "",
    //         dateCreated:"",
    //         dateCompleted:"",
    //         completed: false
    //     });
    //   }
    //   // mongoose validation failed
    //   else {
    //     alert("Error. Product was not created.");
    // //   }
    // });
  };

  componentDidMount() {
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

