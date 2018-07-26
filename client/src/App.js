import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import axios from "axios";
//import logo from "./logo.svg";
//import "./App.css";
import "./App.css";
import Profile from "./components/pages/Profile"

class App extends Component {
  state = {
    loaded: false,
    authenticated: false
  };

  componentDidMount(){
    axios.get("/auth").then((res) => {
      this.setState({
        loaded: true,
        authenticated: res.data
      });
    });
  }

  setLogin = () => {
    this.setState({
      authenticated: true
    });
  };
  render() {
    if (!this.state.loaded){
      return null;
    }
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" render={(props) => <Login {...props} setLogin={this.setLogin}/>}/>
            {!this.state.authenticated ? <Redirect to="/login"/>: null}

            <Route exact path="/" component={Home}/>
            

            <Redirect to="/"/>
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
