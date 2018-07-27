
import React from 'react';
import axios from 'axios';

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
                window.location.href='/login'
            } else {
                alert("You have been logged in!");
                window.location.href='/';
            }
        });
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleLogIn}>
                <div className="form-group">
                    <input value={this.state.value} name="email" onChange={this.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <input value={this.state.value} name="password" onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password"></input>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Log in</button>
                </div>
            </form>
        )
    }
}

export default Login;