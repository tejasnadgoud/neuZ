import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../App.css";
import Search from "../Search.js";
import "../Search.css";
import Footer from "../Footer.js";
import "../Footer.css";
import Navbar from "../Navbar";
import Profile from "../profile";

import { history } from "../helpers/history";
import { alertActions } from "../actions";
import { PrivateRoute } from "../components";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 34.2,
      lon: -119.2,
      alt: 10e6,
      auth: true
    };
    this.globeRef = React.createRef();
    this.store = this.props.store;

    history.listen((location, action) => {
      // clear alert on location change
      //this.props.clearAlerts();
    });
    //this.props.setGlobalState({auth:false});
  }

  componentDidMount() {}
  render() {
    console.log("User city in dashboard: ", this.props.userCity);
    const { alert } = this.props;
    const layers = [
      "eox-sentinal2-labels",
      "coordinates",
      "view-controls",
      "stars",
      "atmosphere-day-night"
    ];
    return (
      
      <Router>
        <div className="app">
          {/* <div>Dashboard</div> */}
          {/* <Navbar loginStatus={this.props.loginStatus} data={this.props.Username}/> */}
          <Navbar
            loginStatus={this.props.loginStatus}
            data={this.props.Userdetails}
          />

          <Switch>
            <Route
              exact
              path="/search"
              component={() => (
                <Search
                  default={this.props.userCity}
                  loginstatus={this.props.loginStatus}
                />
              )}
            />
            {/* <Route exact path="/profile" component={Profile} /> */}
          </Switch>

          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}
//export default withGlobalState(App);

export default Dashboard;
