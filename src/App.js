import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { history } from './helpers/history';
import { alertActions, userActions } from './actions';
import { PrivateRoute } from './components';
import { connect } from 'react-redux';
import Welcome from './view/welcome';
import Dashboard from './view/dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    this.globeRef = React.createRef();
    this.store = this.props.store;

       history.listen((location, action) => {
        // clear alert on location change
         this.props.clearAlerts();
     });
    
  }
  
  componentDidMount(){
    if(localStorage.getItem("user")){
        //cont userobject = getAll()
        this.setState({ loginStatus: "1" });
        this.setState({username : localStorage.getItem("user") })
        //this.setState({data : JSON.parse(localStorage.getItem("user")) })
    } else {
      this.setState({ loginStatus: "0" });
      //this.setState({data : localStorage.getItem("user") })
    }
    
//    this.props.getUsers();
}
  render() {
    const { user, users} = this.props;

    return (
      
      <div className="app">
        
       {(() => {
          if(this.state.loginStatus === "1") {
            return (
              <Dashboard loginStatus={this.state.loginStatus} Username={this.state.username}/>
            )
          } else {
            return (
              <Welcome loginStatus={this.state.loginStatus}/>
            )
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
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
  getUsers: userActions.getAll
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
//export default App;