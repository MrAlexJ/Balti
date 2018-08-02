import React, { Component } from "react";

class ListItem extends Component {
    state = {
        strike:false,
        style: {
            textDecoration:"none"
        },
        // completed:false
    }

    componentDidMount () {
        if (this.props.completed===true) {
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

    handleStrike = (event) => {
          console.log("hello?")
          console.log(this.props.completed)
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
            <li className="list-group-item" key={this.props.id}><span style={this.state.style}>
                {this.props.items}</span>
                    <span className="check-box">
                        <input
                            type={this.props.type}
                            key={this.props.id}
                            id={this.props.id}
                            onChange={this.props.onChange}
                            onClick={()=>this.handleStrike()}
                            checked={this.state.strike}
                            disabled={this.props.completed}
                        />
                    </span>
            </li>
        )
    }
}

export default ListItem;
            