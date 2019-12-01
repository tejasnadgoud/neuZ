import React, { Component } from "react";
import "./Navbar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";

class Navbar extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      count: 0,
      // value:'bbc-news'
      value: this.props.default
    };
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-inverse navbar-expand-xl navbar-dark">
            <div className="navbar-header d-flex col">
              {/* <a className="navbar-brand" href="#">
                <i className="fa fa-cube"></i>Brand<b>Name</b>
              </a> */}
              <a className="nav-link navbar-brand" href="#">
                neuZ <i className="fa glyphicon glyphicon-send fa-1x"></i>
              </a>
              <button
                type="button"
                data-target="#navbarCollapse"
                data-toggle="collapse"
                className="navbar-toggle navbar-toggler ml-auto"
              >
                <span className="navbar-toggler-icon"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div
              id="navbarCollapse"
              className="collapse navbar-collapse justify-content-start"
            >
              {/* <form className="navbar-form form-inline">
                <div className="input-group search-box">
                  <input
                    type="text"
                    id="search"
                    className="form-control"
                    placeholder="Search here..."
                  ></input>
                  <span className="input-group-addon">
                    <i className="material-icons">&#xE8B6;</i>
                  </span>
                </div>
              </form> */}
              <ul className="nav navbar-nav navbar-left ml-auto">
                <li className="nav-item active">
                  <a href="#" className="nav-link">
                    <i className="fa fa-home"></i>
                    <span>Home</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fa fa-gears"></i>
                    <span>About</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fa fa-users"></i>
                    <span>ContactUs</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fa fa-pie-chart"></i>
                    <span>Reports</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fa fa-briefcase"></i>
                    <span>Careers</span>
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fa fa-envelope"></i>
                    <span>Messages</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="fa fa-bell"></i>
                    <span>Notifications</span>
                  </a>
                </li> */}
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    data-toggle="dropdown"
                    className="nav-link dropdown-toggle user-action"
                  >
                    <i className="fa fa-users"></i>
                    <span>Category</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#" className="dropdown-item">
                        News Channel
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Sports
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item">
                        Weather
                      </a>
                    </li>

                    <li>
                      <a href="#" className="dropdown-item">
                        Politics
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right ml-auto">
                <li className="nav-item active">
                  <a href="#" className="nav-link">
                    <i className="fa fa-user"></i>
                    <span>User</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <hr />
          <Switch>
            {/* <Route exact path="/" component={App} />
            <Route path="/contact" component={App} />
            <Route path="/about" component={App} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navbar;
