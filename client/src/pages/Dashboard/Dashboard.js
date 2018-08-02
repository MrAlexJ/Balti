import React, {Component} from "react";
import List from "../../components/List";
import Stats from "../../components/Stats";
import Menu from "../../components/Menu";
import DashHeader from "../../components/DashHeader";
import { Col, Row, Container } from "../../components/Grid";
import axios from "axios";

class Dashboard extends Component {

    state = {
        results: [],
        updateList: [],
        userstats: [],
        dashWishList: [],
        tooltipStyle: {
            display: "none"
        }
    };

    componentDidMount() {
        this.userStats();
        this.addToWish();
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
            this.addToWish();
        });
    }

    addToWish = (wish) => {
        console.log(wish)
        console.log("WOOHOOO..");

        axios.get('/api/wishlist', wish).then((response )=> {
            console.log("HOMIE WISH...", response.data);

            this.setState({
                dashWishList: response.data
            });

        });
    }

    tooltipEnter = () => {
        console.log("mouse enter");
        this.setState({
            tooltipStyle: {
                display: "block"
            }
        });
    }

    tooltipExit = () => {
        console.log("mouse leave");
        this.setState({
            tooltipStyle: {
                display: "none"
            }
        });
    }

    render(){
        return (
            <div className="site-wrapper clear-fix">
                <div className="dashboard-menu">
                    <Menu />
                </div>
                <div className="main-content">
                    <Container fluid>
                        <DashHeader />
                        <Row>
                        <Col size="sm-12">
                            <div className="page-title">
                                <h1>Dashboard</h1>
                            </div>
                        </Col>
                        </Row>
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
                                    <span className="more-info">
                                    <div className="info-box" style={this.state.tooltipStyle}>
                                        <p>
                                            <strong>Help</strong>
                                        </p>
                                        <p>
                                            <i className="fas fa-plus-circle"></i> Click to add item to your wish list.
                                        </p>
                                        <p>
                                            <i className="fas fa-star" ></i> Click just for fun!
                                        </p>
                                    </div>
                                    <i className="fas fa-info-circle" onMouseEnter={this.tooltipEnter} onMouseLeave={this.tooltipExit}
                                    ></i></span>
                                    <h4>Friends' List</h4>
                                    <List 
                                        data={this.state.results}
                                        list="random"
                                        addToList={this.addToList}
                                    />
                                </div>
                            </Col>
                            <Col size="sm-6">
                                <div className="list-wrapper">
                                    <h4>My Wish List</h4>
                                    <List 
                                        data={this.state.dashWishList}
                                        list="dashwish"
                                        addToWish={this.addToWish}
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