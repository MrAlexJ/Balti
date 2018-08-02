import React, {Component} from "react";
import Menu from "../../components/Menu";
import DashHeader from "../../components/DashHeader"
import { Col, Row, Container } from "../../components/Grid";
import axios from "axios";


class Settings extends Component {
    state = {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      profileImg: "",
      totalCompleted: "",
      selectedFile: ""
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
          userId: userId,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          profileImg: response.data.profile_img,
          totalCompleted: response.data.total_completed
        })
        console.log("state!!!", this.state)
      });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleNameChange = (event)  => {
        // event.preventDefault();
        axios.put(`/namechange`, this.state).then((response) => {    
            this.setState({
              firstName: this.state.firstName,
              lastName: this.state.lastName
          });
          console.log("name changed to ", this.state.firstName, " ", this.state.lastName)
        });
    }

    handleEmailChange = (event) => {
        // event.preventDefault();
        this.setState({
            email: this.state.email,
        });
        axios.put(`/emailchange`, this.state).then((response) => {    
            this.setState({
              email: this.state.email,
          });
        });
        console.log("email changed to ", this.state)
    }

    handleImagechange = (event) => {
        console.log(event.target.files[0]);
        this.setState({
          selectedFile: event.target.files[0]
        });
    }

    handleSubmit = (event) => {
      event.preventDefault();
  
      const { selectedFile } = this.state;
      let formData = new FormData();
  
      formData.append('selectedFile', selectedFile);
      
      axios.put('/upload/profile/' + this.state.userId, formData)
        .then((result) => {
          this.getUserInfo(this.state.userId);
        });
    };

    render(){
        return (
            <div className="site-wrapper">
                <div className="dashboard-menu">
                    <Menu />
                </div>
                <div className="main-content">
                    <Container fluid>
                        <DashHeader />
                        <Row>
                            <Col size="sm-12">
                                <div className="page-title">
                                    <h1>Settings</h1>
                                </div>
                            </Col>
                        </Row>
                        <section>
                            <Row>
                                <Col size="sm-12">
                                    <h5>Change your name below!</h5>

                                    <form className="settings-form">
                                        <Row>
                                            <Col size="sm-5">
                                                <input 
                                                    type="text"
                                                    name="firstName"
                                                    value={this.state.firstName}
                                                    placeholder="Enter New First Name"
                                                    onChange={this.handleInputChange}
                                                    className="form-control"
                                                />
                                            </Col>
                                            <Col size="sm-5">
                                                <input 
                                                    type="text"
                                                    name="lastName"
                                                    value={this.state.lastName}
                                                    placeholder="Enter New Last Name"
                                                    onChange={this.handleInputChange}
                                                    className="form-control"
                                                />
                                            </Col>
                                            <Col size="sm-2">
                                                <button
                                                onClick={this.handleNameChange}
                                                className="btn btn-block btn-primary"
                                                >
                                                Update
                                                </button>
                                            </Col>
                                        </Row>
                                    </form>
                                    
                                </Col>
                            </Row>
                        </section>
                        <section>
                            <Row>
                                <Col size="sm-12">

                                    <h5>Change your email below!</h5>

                                    <form className="settings-form">
                                        <Row>
                                            <Col size="sm-10">
                                                <input 
                                                    type="text"
                                                    name="email"
                                                    value={this.state.email}
                                                    placeholder="Enter New Email"
                                                    onChange={this.handleInputChange}
                                                    className="form-control"
                                                />
                                            </Col>
                                            <Col size="sm-2">
                                                <button
                                                onClick={this.handleEmailChange}
                                                className="btn btn-block btn-primary"
                                                >
                                                Update
                                                </button>
                                            </Col>
                                        </Row>
                                    </form>
                                </Col>
                            </Row>
                        </section>
                        <section>
                            <Row>
                            <Col size="sm-12">
                                <div className="page-title">
                                    <h1>Update Profile Photo</h1>
                                </div>
                            </Col>
                            </Row>
                            <Row>
                            <Col size="sm-4">
                                <img src={`/assets/uploads/${this.state.profileImg}`} alt="default" className="img-fluid" />
                            </Col>
                            <Col size="sm-8">
                    
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">

                                    <label htmlFor="exampleFormControlFile1">Please select a file to upload</label>

                                    <input
                                        type="file"
                                        name="selectedFile"
                                        onChange={this.handleImagechange}
                                        className="form-control-file"
                                        id="exampleFormControlFile1" 
                                        />
                                    </div>
                                    
                                    <button type="submit" className="btn btn-secondary">Submit</button>

                                </form>

                            </Col>
                            </Row>
                        </section>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Settings;