import React, { Component } from "react";
import Menu from "../../components/Menu";
import DashHeader from "../../components/DashHeader";
import { Col, Row, Container } from "../../components/Grid";
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
    console.log(selectedFile)
    let formData = new FormData();

    formData.append('selectedFile', selectedFile);

    console.log("selected file", selectedFile)
    
    axios.put('/upload/profile/' + this.state.user.id, formData)
      .then((result) => {
        console.log("it put");
        console.log(result);
        this.getUserInfo();
      });
  };

  render() {
    return (
      <div className="site-wrapper clear-fix">
          <div className="dashboard-menu">
              <Menu />
          </div>
          <div className="main-content">
            <Container fluid>
                <DashHeader />
                <Row>
                  <Col size="sm-12">
                      <div className="page-title">
                          <h1>Update Profile Photo</h1>
                      </div>
                  </Col>
                </Row>
                <Row>
                  <Col size="sm-6">
                    <img src={`/assets/uploads/${this.state.user.profile_img}`} alt="default" className="img-fluid" />
                  </Col>
                  <Col size="sm-6">
          
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">

                          <label htmlFor="exampleFormControlFile1">Please select a file to upload</label>

                          <input
                            type="file"
                            name="selectedFile"
                            onChange={this.handleInputChange}
                            className="form-control-file"
                            id="exampleFormControlFile1" 
                            />
                        </div>
                        
                        <button type="submit" className="btn btn-secondary">Submit</button>

                    </form>

                  </Col>
                </Row>
            </Container>
          </div>
      </div>
    );
  }
}

export default Upload;

