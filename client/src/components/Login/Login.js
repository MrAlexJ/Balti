import React from 'react';
import axios from 'axios';
import Button from "../Button";
import "./Login.css";

class Login extends React.Component {
    state = {
        email: "",
        password: ""
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleLogIn = (event) => {
        event.preventDefault();

        let existingUser = {
            email: this.state.email,
            password: this.state.password
        };

        console.log("CURRENT USER: ", existingUser);

        axios.post('/login', existingUser).then(response => {
            if (response.data.code === 504) {
                alert("Invalid login.");;
                window.location.href='/'
            } else {
                alert("You have been logged in!");
                window.location.href='/Dashboard';
            }
        });
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleLogIn}>
                <div className="form-group">
                    <input value={this.state.value} name="email" onChange={this.handleInputChange} type="email" className="form-control" id="email_login" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <input value={this.state.value} name="password" onChange={this.handleInputChange} type="password" className="form-control" id="password_login" placeholder="Password"></input>
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
                        Log In
                    </Button>
                </div>
            </form>
        )
    }
}

export default Login;