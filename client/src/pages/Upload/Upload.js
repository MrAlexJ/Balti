import React, { Component } from "react";
import axios from "axios";

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
      user: []
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    // grab the id (upc) from the url
    // because this is a stateful component, we must use "this.props"
    axios.get(`/upload/profile/${this.props.match.params.id}`).then((response) => {
      this.setState({
        user: response.data[0]
      });
      console.log("user info", this.state.user);
      console.log("file name", this.state.user.profile_img);
    });
  }

  handleInputChange = (event) => {
    console.log(event.target.files[0]);
    console.log(event.target.value);
    console.log(event.target.name);

    console.log("updated img", this.state.user)

    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submit");
    console.log(this.state.user);
    

    const { selectedFile } = this.state;
    let formData = new FormData();

    formData.append('selectedFile', selectedFile);
    
    axios.put('/upload/profile/' + this.state.user.id, formData)
      .then((result) => {
        console.log("it put");
        console.log(result);
        this.getUserInfo();
      });
  };

  render() {
    return (
      <div className="container">
          <h1>Update User</h1>

          <img src={`/assets/uploads/${this.state.user.profile_img}`} alt="default" />
          
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">

              <label htmlFor="exampleFormControlFile1">Example file input</label>

              <input
                type="file"
                name="selectedFile"
                onChange={this.handleInputChange}
                className="form-control-file"
                id="exampleFormControlFile1" 
                />

              <button type="submit" className="btn btn-secondary">Submit</button>
          </div>
        </form>

      </div>
    );
  }
}

export default Upload;

