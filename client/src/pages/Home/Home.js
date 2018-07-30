import React, {Component} from "react";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import Modal from "../../components/Modal";
import SignUp from "../../components/SignUp";
import Login from "../../components/Login";
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
                    <SignUp />
                </Modal>
                <Modal
                    id="logIn"
                    labelledBy="signUpLabel"
                    title="Log In"
                >
                    <Login />
                </Modal>
            </div>
        );
    }
}

export default Home;