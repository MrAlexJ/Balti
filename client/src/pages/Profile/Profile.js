import React, { Component } from "react";
import Menu from "../../components/Menu";
import DashHeader from "../../components/DashHeader";
import { Col, Row, Container } from "../../components/Grid";
import Form from "../../components/Form";
import List from "../../components/List";
import axios from "axios";

class Profile extends Component {
  // initial form state
  state = {
    results:[],
    bucket_items:"",
    public:false,
    wish:[],
    list_type: "bucket"
    // completed:true,
  };

  componentDidMount() {
    axios.get("/api/items").then((response)=> {
      console.log("bla",response.data);
      this.setState({
        results:response.data
      });
    });
    axios.get("/api/wishlist").then((response) => {
      console.log("woooo", response.data);
      this.setState({
          wish: response.data
      });
  });
  }

handleInputChange = (event) => {
  // console.log(event.target)
    // update any state property with the input value of the same name
    this.setState({
      bucket_items: event.target.value,

    });
  };

handleFormSubmit = (event) => {
    // event.preventDefault();
    console.log(this.state);
    axios.post("/api/profile", this.state).then((response) => {
        this.setState({
          bucket_items: "",
          list_type: ""
        });
  });
}


toggleCheckComplete = (event) => {
  this.handleInputChange(event);
  console.log("this is the checkmark event ",event.target)
  axios.put(`/api/completed/${event.target.id}`, {completed: true}).then((response) => {    
    this.setState({
      // id : event.target.id,
      // completed: !this.state.completed,
    });
});
  console.log(this.state);

}

toggleIsChecked = (event) => {
  console.log(this.state);
  console.log("toggling isChecked value!");
  this.setState({
    public: !this.state.public,
    id:this.state.id
  });
}

disableCheck = (event) => {
  axios.get("/api/done").then((response)=> {
    this.setState({
      results:response.data
    });
  });
}

//select list type function
listType = (type) => {
    console.log(type)

    axios.post("/api/wishlist", type).then((response) => {
      console.log("WISSHHHH", response.data);

      this.setState({
        list_type: response.data
      });
    });
}

addToRealList = (item) => {
  console.log(item)
  console.log("YAYYY");
  // axios.post('/api/addlist',item).then((response) => {
  //     console.log("YESSSS", response.data);
  //     this.setState({
  //         updateList: response.data
  //     });
  // });
  axios.put(`/api/movelist/${item.id}`, {list_type: "bucket"}).then((response) => {    
    this.setState({
      list_type: this.state.list_type,
  });
    console.log("now you gotta do it")
});
}


  render() {
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
                  <h1>Welcome to your Bucket List!</h1>
                </div>
              </Col>
            </Row>
            <Row>
              <Col size="sm-12">
                <h5>Before I Kick the Bucket, I Gotta...</h5>
                <List
                  // item={this.state.item}
                  data={this.state.results}
                  toggleCheckComplete={this.toggleCheckComplete}
                  completed={this.state.completed}
                  disableCheck={this.disableCheck}
                  handleInputChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row>
              <Col size="sm-12">
                <Form
                  bucket_items={this.state.bucket_items}
                  public={this.state.public}
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  toggleIsChecked={this.toggleIsChecked}
                />
              </Col>
            </Row>
            <Row>
              <Col size="sm-12">
                <h5>Wishlist</h5>
                <List 
                    data={this.state.wish}
                    list="wish"
                    addToRealList={this.addToRealList}
                    />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Profile;

