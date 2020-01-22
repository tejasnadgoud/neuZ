import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { history } from "./helpers/history";
import { alertActions, userActions } from "./actions";
import { PrivateRoute } from "./components";
import { connect } from "react-redux";
import Welcome from "./view/welcome";
import Dashboard from "./view/dashboard";
import axios from "axios";
const requestUrl = "http://ip-api.com/json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCity: "New York"
    };
    this.globeRef = React.createRef();
    this.store = this.props.store;

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      this.setState({ loginStatus: "1" });
      this.setState({ username: localStorage.getItem("user") });
    }
    axios.get(requestUrl).then(res => {
      console.log(
        "Before using user's location, default city is: ",
        this.state.userCity
      );
      console.log("User location data is: ", res);
      console.log(
        "User city after detecting their location is: ",
        res.data.city
      );

      this.setState({
        userCity: res.data.city
      });
    });

    if (localStorage.getItem("user")) {
      this.setState({ loginStatus: "1" });
      this.setState({ username: localStorage.getItem("user") });
    } else {
      this.setState({ loginStatus: "0" });
    }
  }
  render() {
    //const { user, users} = this.props;
    console.log("userCity in render is: ", this.state.userCity)
    const { user, loggingIn } = this.props;
    return (
      <div className="app">
        {(() => {
          if (this.state.loginStatus === "1") {
            return (
              // <Dashboard loginStatus={this.state.loginStatus} Username={this.state.username}/>
              <Dashboard
                loginStatus={this.state.loginStatus}
                Userdetails={user}
                userCity={this.state.userCity}
              />
            );
          } else {
            return <Welcome loginStatus={this.state.loginStatus} />;
          }
        })()}
      </div>
    );
  }
}
//export default withGlobalState(App);

// function mapState(state) {
//   const { alert } = state;
//   return { alert };
// }
function mapState(state) {
  //const { users, authentication } = state;
  //const { user } = authentication;
  //return { user, users };
  const { user, loggingIn } = state.authentication;
  return { user, loggingIn };
}

const actionCreators = {
  clearAlerts: alertActions.clear
  //getUsers: userActions.getAll
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
//export default App;
