import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import Upload from "./pages/Upload";

const App = () => (
  <Router>
    <div className="route-wrapper">
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/upload/:id" component={Upload} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/settings" component={Settings} />
    </div>
  </Router>
);

export default App;