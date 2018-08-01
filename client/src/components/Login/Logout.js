
import React from 'react';
import axios from 'axios';

class Logout extends React.Component {

    handleLogOut = () => {
        axios.get('/logout').then(response => {
            console.log(response);
            if (response.data.code === 707) {
                alert("You are logged in.");
                window.location.href = '/';
            } else if (response.data === "") {
                alert("You are not logged in!");
                window.location.href = '/login';
            } else {
                alert("You have been logged out.");
                window.location.href = '/login';
            };
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.handleLogOut} className="btn btn-danger btn-lg">Log out</button>
            </div>
        )
    }
}

export default Logout;