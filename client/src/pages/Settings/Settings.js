import React, {Component} from "react";
import Menu from "../../components/Menu";
import DashHeader from "../../components/DashHeader"
import { Col, Row, Container } from "../../components/Grid";
import axios from "axios";


class Settings extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
    };

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
                        <div>
                            <h6>Change your email below!</h6>
                            <form>
                                <input 
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    placeholder="Enter New Email"
                                    onChange={this.handleInputChange}
                                />
                                <button
                                onClick={this.handleEmailChange}
                                >
                                Change Email
                                </button>
                            </form>
                        </div>
                        <br/>
                        <div>
                            <h6>Change your name below!</h6>
                            <form>
                                <input 
                                    type="text"
                                    name="firstName"
                                    value={this.state.firstName}
                                    placeholder="Enter New First Name"
                                    onChange={this.handleInputChange}
                                />
                                <input 
                                    type="text"
                                    name="lastName"
                                    value={this.state.lastNAme}
                                    placeholder="Enter New Last Name"
                                    onChange={this.handleInputChange}
                                />
                                <button
                                onClick={this.handleNameChange}
                                >
                                Change Name
                                </button>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Settings;