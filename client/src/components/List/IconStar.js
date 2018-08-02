import React, { Component } from "react";

class IconStar extends Component {
    state = {
        style: {
            color:"#ECEDED"
        }
    }

    componentDidMount () {
    }

    randomColor = (event) => {
        console.log("random color");
        var colorSelector = Math.ceil(Math.random()*5);
        console.log(colorSelector);

        switch(colorSelector) {
            case 1:
            this.setState({
                style: {
                    color:"#0a1f54"
                }
            });
            break;
            case 2:
            this.setState({
                style: {
                    color:"#2aa9e0"
                }
            });
            break;
            case 3:
            this.setState({
                style: {
                    color:"#378576"
                }
            });
            break;
            case 4:
            this.setState({
                style: {
                    color:"#68BE43"
                }
            });
            break;
            case 5:
            this.setState({
                style: {
                    color:"#FFCC02"
                }
            });
            break;
            default:
            console.log("default");
        }

    }

    render() {
        return (
            <a className="btn-star" onClick={() => this.randomColor()}>
              <i className="fas fa-star" style={this.state.style}></i>
            </a>
        )
    }
}

export default IconStar;
            