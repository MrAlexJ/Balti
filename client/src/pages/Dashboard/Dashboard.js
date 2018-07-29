import React, {Component} from "react";
import './Dashboard.css';
import axios from "axios";

class Dashboard extends Component {

    state = {
        results: []
    };

    componentDidMount() {

        axios.get("api/dashboard")
    }


    render(){
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        );
    }
}

export default Dashboard;