import React, {Component} from "react";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import Modal from "../../components/Modal";
import './Home.css';

class Home extends Component {
    render(){
        return (
            <div>
                <Header />
                <Carousel />
                <Modal
                    id="signUp"
                    labelledBy="signUpLabel"
                    title="Create Account"
                >
                    Sign up modal
                </Modal>
                <Modal
                    id="logIn"
                    labelledBy="signUpLabel"
                    title="Log In"
                >
                    Log in modal
                </Modal>
            </div>
        );
    }
}

export default Home;