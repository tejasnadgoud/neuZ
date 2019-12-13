import React, { Component } from "react";
import "./Navbar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import login from "./login";
import Registration from "./Registration";
import App from "./App";
import { Login } from "./login";
import { Logout } from "./logout";
import Search from "./Search.js";
import About from "./About";
import "./Search.css";
import PaypalButton from "./Paypal";
import { Updateprofile } from "./updateprofile";

//import {userlogin,userlogout} from './actions';
//import { withGlobalState } from 'react-globally'

const CLIENT = {
  sandbox:
    "Adte5-SItgmpSukZQWLmATtBA0bK3bupDgZmQx2oGq_tBt5fff0iZ_h2pKRP6cZMR3_syoGdnh0Ej8iS",
  production: process.env.PAYPAL_CLIENT_ID_PRODUCTION
};
const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

class Navbar extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      count: 0,
      isLoggedIn: this.props.loginStatus,
      // value:'bbc-news'
      value: this.props.default,
      auth: this.props.auth,
      userdetails: this.props.data //localStorage.getItem('user')
      // username : (JSON.parse(JSON.stringify(this.props.data), (key, value) => {
      //             return value[0]}))
    };
    //this.toggle = this.toggle.bind(this);
    this.store = this.props.store;
    //this.name = this.props.data.user_name;
    // if(this.state.data){
    //   const userStr = JSON.stringify(this.state.data);
    //   this.name = JSON.parse(userStr, (key, value) => {
    //     if (typeof key === 'user_name') {
    //       return value;
    //     }})
    // }

    //this.checkAuthState();
    //this.props.setGlobalState({auth:this.state.auth});
  }

  componentDidMount() {
    this.checkAuthState();
  }

  // componentWillMount() {
  //   this.checkAuthState();

  // }
  // toggle() {
  //   this.setState({
  //     modal: !this.state.modal
  //   });
  // }

  checkAuthState() {
    if (!this.props.loginStatus) {
      //(!this.state.auth){
      // If user is logged out
      this.state.user_actions = (
        <ul className="nav navbar-nav navbar-right ml-auto">
          <li className="nav-item dropdown">
            <a
              href="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle user-action"
            >
              <i className="fa fa-user"></i>
              Sign up
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="/login" className="dropdown-item">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="dropdown-item">
                  Register
                </a>
              </li>
            </ul>
          </li>
        </ul>
      );

      this.setState({
        user_actions: this.state.user_actions
      });
    }

    if (this.props.loginStatus) {
      //(this.state.auth){
      // If user is logged in
      this.state.user_actions = (
        <ul className="nav navbar-nav navbar-right ml-auto">
          <li className="nav-item dropdown">
            <a
              href="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle user-action"
            >
              <i className="fa fa-user"></i>
              User : {this.state.userdetails}
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="/logout" className="dropdown-item">
                  Logout
                </a>
              </li>
              <li>
                <a href="/updateprofile" className="dropdown-item">
                  Profile
                </a>
              </li>
            </ul>
          </li>
        </ul>
      );
      this.setState({
        user_actions: this.state.user_actions
      });
    }
  }

  render() {
    //const { authenticate } = this.state.auth;
    //this.checkAuthState();
    return (
      <Router>
        <div>
          <nav className="navbar navbar-inverse navbar-expand-xl navbar-dark">
            <div className="navbar-header d-flex col">
              <a className="nav-link navbar-brand" href="/AllChannel">
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
              <ul className="nav navbar-nav navbar-left ml-auto">
                <li className="nav-item active">
                  <a href="/AllChannel" className="nav-link">
                    <i className="fa fa-home"></i>
                    <span>Home</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/About" className="nav-link">
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
                      <a href="/AllChannel" className="dropdown-item">
                        All Channel
                      </a>
                    </li>
                    {/* <li>
                      <a href="#" className="dropdown-item">
                        Sports
                      </a>
                    </li> */}
                    <li>
                      <a href="#" className="dropdown-item">
                        Weather
                      </a>
                    </li>
                    {/* <li>
                      <a href="#" className="dropdown-item">
                        Politics
                      </a>
                    </li> */}
                  </ul>
                </li>
                {this.state.isLoggedIn && (
                  <li className="nav-item dropdown">
                    <a
                      href="#"
                      data-toggle="dropdown"
                      className="nav-link dropdown-toggle user-action"
                    >
                      <i className="fa fa-money"></i>
                      <span>Support Us</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item">
                          <PaypalButton
                            client={CLIENT}
                            env={ENV}
                            commit={true}
                            currency={"USD"}
                            total={100}
                          />
                        </a>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
              {this.state.user_actions}
            </div>
          </nav>
          <hr />
          <Switch>
            {/* <Route exact path="/" component={App} />
            <Route path="/contact" component={App} />
            <Route path="/about" component={App} /> */}
            {/* <Route path="/login" component={() => <Login auth={this.state.auth} />} /> */}
            <Route
              path="/login"
              children={props => <Login store={this.store} />}
            />
            <Route path="/logout" children={props => <Logout />} />
            <Route path="/register" component={Registration} />
            <Route
              exact
              path="/AllChannel"
              component={() => (
                <Search
                  default="bbc-news"
                  loginstatus={this.props.loginStatus}
                />
              )}
            />
            <Route exact path="/About" component={() => <About />} />
            <Route
              exact
              path="/updateprofile"
              children={props => (
                <Updateprofile username={this.state.userdetails} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

//export default withGlobalState(Navbar);
export default Navbar;
