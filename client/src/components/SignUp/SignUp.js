import React from "react";
import axios from "axios";
import Button from "../Button";
import "./SignUp.css";

class SignUp extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSignUp = (event) => {
        event.preventDefault();

        let newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        console.log("NEW USER: ", newUser);

        axios.post('/signup', newUser).then(response => {
            if (response.data.code === 304) {
                alert("An account already exists with that email address.");
                window.location.href='/';
            } else {
                alert("Account created. Welcome!");
                window.location.href = '/Dashboard';
            }
        }).catch(error => {
            console.log("POST ERROR: ", error);
        });
        
    };


    render() {
        return (
            <form className="form" onSubmit={this.handleSignUp}>
                <div className="form-group">
                    <input value={this.state.value} name="firstName" onChange={this.handleInputChange} type="text" className="form-control" id="firstName" placeholder="First Name"></input>
                </div>
                <div className="form-group">
                    <input value={this.state.value} name="lastName" onChange={this.handleInputChange} type="text" className="form-control" id="lastName" placeholder="Last Name"></input>
                </div>
                <div className="form-group">
                    <input value={this.state.value} name="email" onChange={this.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="E-Mail"></input>
                </div>
                <div className="form-group">
                    <input value={this.state.value} name="password" onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password"></input>
                </div>
                <div className="form-group">
                    <Button
                    buttonStyle="secondary"
                    type="cancel"
                    >
                        Cancel
                    </Button>
                    <Button
                    buttonStyle="primary"
                    type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        )
    }
}

export default SignUp;