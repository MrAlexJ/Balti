import React, {Component} from "react";
import API from "../../utils/API.js";
import Menu from "../../components/Menu";
import DashHeader from "../../components/DashHeader"
import { Col, Row, Container } from "../../components/Grid";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";

class Search extends Component {

state = {
    search: "",
    results: []
}

componentDidMount() {

}

searchLocation = (query) => {
    API.searchByLocation(query).then(res => this.setState({ results: res.data }))
};

handleInputChange = (event) => {
    // const value = event.target.value;
    // const name = event.target.name;
    this.setState({ search: event.target.value });
};

handleSearchSubmit = (event) => {
    event.preventDefault();
    this.searchLocation(this.state.search);
  
};


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
                                    <h1>Search</h1>
                                    <SearchForm 
                                    handleInputChange={this.handleInputChange}
                                    handleSearchSubmit={this.handleSearchSubmit}
                                    />
                                    <SearchResults 
                                    results={this.state.results}
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

export default Search;