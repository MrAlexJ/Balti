import React, {Component} from "react";
import axios from "axios";

class Login extends Component{
    state = {
        username: "",
        password: "",
        error: null
    };

    handleInputChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post("/login", this.state).then((res) =>{
            if(res.data === true){
                this.props.setLogin();
                this.props.history.push("/");
            }
            else {
                this.setState({
                    error: "Failed to log in"
                })
            }
        });
    };

    render(){
        return(
            <form>
                <input
                value={this.state.username}
                name="username"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Username"
                />
                <input
                value={this.state.password}
                name="password"
                onChange={this.handleInputChange}
                type="password"
                placeholder="Password"
                />

                <button onClick={this.handleFormSubmit}>Submit</button>

                <span>{this.state.error}</span>
            </form>
        );
    }
}

export default Login;