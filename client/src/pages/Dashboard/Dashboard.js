import React, {Component} from "react";
import List from "../../components/List";
import Stats from "../../components/Stats";
import Menu from "../../components/Menu";
import DashHeader from "../../components/DashHeader"
import { Col, Row, Container } from "../../components/Grid";
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
            <div className="site-wrapper">
                <div className="dashboard-menu">
                    <Menu />
                </div>
                <div className="main-content">
                    <Container fluid>
                        <DashHeader />
                        <Row>
                            <Col size="sm-12">
                                <Stats 
                                    data={this.state.userstats}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col size="sm-6">
                                <div className="list-wrapper">
                                    <h4>What My Homies Do</h4>
                                    <List 
                                        data={this.state.results}
                                        list="random"
                                        addToList={this.addToList}
                                    />
                                </div>
                            </Col>
                            <Col size="sm-6">
                                <div className="list-wrapper">
                                    <h4>Wish List</h4>
                                    <List 
                                        data={this.state.results}
                                        list="random"
                                        addToList={this.addToList}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Dashboard;