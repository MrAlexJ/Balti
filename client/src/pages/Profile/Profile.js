import React, { Component } from "react";
import Form from "../../components/Form";
import List from "../../components/List";
import axios from "axios";

class Profile extends Component {
  // initial form state
  state = {
    bucket_items:"",
    public:false,
    };

  componentDidMount() {
  }

handleInputChange = (event) => {
    // update any state property with the input value of the same name
    this.setState({
      bucket_items: event.target.value,
    });
  };

handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios.post("/api/profile", this.state).then((response) => {
        this.setState({
          bucket_items: ""
        });
  });
}

// handleCheckboxChange = (event)=> {
//   console.log("checkbox changed!", event);
//   this.setState({isChecked: event.target.checked});
// }t

toggleIsChecked = (event) => {
  console.log(this.state);
  console.log("toggling isChecked value!");
  this.setState({
    public: !this.state.public,
  });
}


  render() {
    return (
      <div>
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
                bucket_items={this.state.bucket_items}
                public={this.state.public}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                toggleIsChecked={this.toggleIsChecked}
                handleCheckboxChange={this.handleCheckboxChange}
              />
            </div>
        </div>
      </div>
    );
  }
}

export default Profile;

