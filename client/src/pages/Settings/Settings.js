import React, {Component} from "react";
import Menu from "../../components/Menu";
import DashHeader from "../../components/DashHeader"
import { Col, Row, Container } from "../../components/Grid";

class Settings extends Component {

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
                                <div className="page-title">
                                    <h1>Settings</h1>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Settings;