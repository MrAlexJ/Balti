import React, {Component} from "react";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import './Home.css';

class Home extends Component {
    render(){
        return (
            <div>
                <Header />
                <Carousel />
            </div>
        );
    }
}

export default Home;