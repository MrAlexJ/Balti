import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
    state = {
        fullName: "",
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
            fullName: this.state.fullName,
            email: this.state.email,
            password: this.state.password
        }

        console.log("NEW USER: ", newUser);

        axios.post('/signup', newUser).then(response => {
            if (response.data.code === 304) {
                alert("An account already exists with that email address.");
                window.location.href='/signup';
            } else {
                alert("Account created. Welcome!");
                window.location.href = '/';
            }
        }).catch(error => {
            console.log("POST ERROR: ", error);
        });
        
    };


    render() {
        return (
            <form className="form" onSubmit={this.handleSignUp}>
                <div className="form-group">
                    <input value={this.state.value} name="fullName" onChange={this.handleInputChange} type="text" className="form-control" id="fullName" placeholder="Full name"></input>
                </div>
                <div className="form-group">
                    <input value={this.state.value} name="email" onChange={this.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <input value={this.state.value} name="password" onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password"></input>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}

export default Signup;