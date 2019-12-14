import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../App.css";
import Search from "../Search.js";
import "../Search.css";
import Footer from "../Footer.js";
import "../Footer.css";
import Navbar from "../Navbar";
import { history } from '../helpers/history';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components';
import { connect } from 'react-redux';
import First from '../First.js';


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 34.2,
      lon: -119.2,
      alt: 10e6,
      auth : true
    };
    this.globeRef = React.createRef();
    this.store = this.props.store;

    //    history.listen((location, action) => {
    //     // clear alert on location change
    //      //this.props.clearAlerts();
    //  });
  }
  
  componentDidMount(){
    
}
  render() {
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
      
        
        <Navbar loginStatus={this.props.loginStatus}/>
        {/* <Search default="bbc-news" /> */}
        <Switch>
        <Route exact path="/" children={props => <First default="bbc-news" loginstatus={this.props.loginStatus}/>}/>
        {/* <Route exact path="/" children={props => <Search default="bbc-news" loginstatus={this.props.loginStatus}/>}/> */}
        </Switch>
        <Footer />
        
      </div>
      </Router>

    );
  }
}


export default Welcome;