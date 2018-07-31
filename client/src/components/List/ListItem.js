import React, { Component } from "react";

class ListItem extends Component {
    state = {
        strike:false,
        style: {
            textDecoration:"none"
        }
    }

    handleStrike = (event) => {
          console.log("hello?")
          console.log(this.state.strike)
          if (this.state.strike === false){
            console.log("hey " , this.state.strike)
              this.setState({
                  strike: true,
                  style: {
                      textDecoration:"line-through"
                  }
              })
          }
          else {
              this.setState ({
                  strike:false,
                  style: {
                    textDecoration:"none"
                    }
              })
          }
        }
      

    render() {
        return (
            <li className="list-group-item" key={this.props.id}><h6 style={this.state.style}>
                {this.props.items}</h6>
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        mission accomplished?
                        <input
                            type={this.props.type}
                            key={this.props.id}
                            id={this.props.id}
                            onChange={this.props.onChange}
                            onClick={()=>this.handleStrike()}
                            checked={this.state.strike}
                            // checked={true}
                            // onClick={this.handleStrike}
                        />
                    </div>
                </div>
            </li>
        )
    }
}

export default ListItem;
            