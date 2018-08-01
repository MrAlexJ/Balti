import React, {Component} from "react";
import List from "../../components/List";
import Stats from "../../components/Stats"
import './Dashboard.css';
import axios from "axios";

class Dashboard extends Component {

    state = {
        results: [],
        updateList: [],
        userstats: []
    };

    componentDidMount() {
        this.userStats();
        console.log("component mount");
        axios.get("/api/dashboard").then((response) => {
            console.log("HEYYYY", response.data);
            this.setState({
                results: response.data
            });
        });
    }

    userStats = (stats) => {
        console.log("STATS");
        axios.get("/api/userstats", stats).then((response) => {
            console.log("WINNER...", response.data)
            this.setState({
                userstats: response.data
            });
        });
    }

    addToList = (item) => {
        console.log(item)
        console.log("YAYYY");
        axios.post('/api/addlist',item).then((response) => {
            console.log("YESSSS", response.data);
            this.setState({
                updateList: response.data
            });
        });
    }


    render(){
        return (
            <div>
                <h1>Dashboard</h1>
                <Stats 
                data={this.state.userstats}
                
                />
                <List 
                
                data={this.state.results}
                list="random"
                addToList={this.addToList}
                />
            </div>
        );
    }
}

export default Dashboard;