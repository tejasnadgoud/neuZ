import React, { Component } from "react";
import "./First.css";
import politics from "./images/tech.gif";
import sports from "./images/news1.gif";
//import technology from "./images/technology.jpg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Search from "./Search";
import { Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

class First extends Component {
  render() {
    return (
      <Router>
        <div>
          <div
            id="feature-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              <div className="item">
                {/* <a href="#"> */}
                <img className="img-responsive it" src={sports} alt=""></img>
                {/* </a> */}
              </div>
              <div className="item active">
                {/* <a href="#"> */}
                <img className="img-responsive it" src={sports} alt=""></img>
                {/* </a> */}
              </div>
              <div className="item">
                {/* <a href="#"> */}
                <img className="img-responsive it" src={sports} alt=""></img>
                {/* </a> */}
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="carButton">
          <a href="/AllChannel">
            <Button
              style={{ height: 70, width: 300, marginTop: 10 }}
              className="btn1"
              variant="info"
              size="lg"
            >
              neuZ
            </Button>
          </a>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Carousel.Caption>
            <h3 style={{ fontFamily: "Courier New" }}>
              Global perspective. Local coverage.
            </h3>
            <h4 style={{ fontFamily: "Courier New" }}>
              another look at your day.
            </h4>
          </Carousel.Caption>
          <br />
          <br />
        </div>

        <Switch>
          <Route
            exact
            path="/AllChannel"
            component={() => (
              <Search default="bbc-news" loginstatus={this.props.loginStatus} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
export default First;
