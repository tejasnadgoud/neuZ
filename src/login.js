import React, { Component } from 'react';
import { Link , Redirect} from "react-router-dom";
import LoginService from './services/LoginService';
import Message from './Message';
import Error from './Error';
import { COMMON_FIELDS, REGISTRATION_FIELDS, LOGIN_FIELDS, LOGIN_MESSAGE, ERROR_IN_LOGIN } from './MessageBundle';
import './login.css';
import Profile from './profile';
import {userActions} from './actions';
import { connect } from 'react-redux';
import { userConstants } from './constants';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user_name: '',
			password: '',
			error: false,
			loginSuccess: false
		}
		this.store = this.props.store;
	}

	handleOnChangeUserName = (e) =>  {
		this.setState({
			user_name: e.target.value
		});
	}

	handleOnChangePassword = (e) => {
		this.setState({
			password: e.target.value
		});
	}

	 handleuserlogin = (UN) => {
		 console.log(UN);
	 	//this.store.dispatch(userlogin({user_name: UN}));
	 }
	onSubmit = async e => {
		const { history } = this.props;
		const data = {
			user_name: this.state.user_name,
			password: this.state.password
		};
		const user_name = this.state.user_name;
		const password = this.state.password;

		console.log(this.state.user_name);
		//const loginResult = await this.props.login(data); //await LoginService.login(data); //
		const loginResult = await this.props.login(user_name,password);
		 if(loginResult !== userConstants.LOGIN_SUCCESS) { //200
		 	this.setState({
		 		error: true,
				loginSuccess: false,
				loginResult : loginResult
		 	});
		 	//console.log(this.state.user_name);
		 	//this.props.history.push('/profile');
		 }
		 else{
		 	this.setState({
		 		loginSuccess: true,
				error: false,
				loginResult: loginResult
		 		//auth: true
				
		 	});
		 	//console.log(this.state.user_name);
		 	//this.handleuserlogin(this.state.user_name);
		 	//history.push('/users')
			
		 		// return (
		 		//   <Redirect to= '/Profile'/>
		 		// )
		 }
			
			  
				//alert("Login Success")
				//history.push('/Profile')
			  
	}

	

	render() {
		const { loginSuccess, error, loginResult } = this.state;
		 

		return (
			<div id="logreg-forms">
				<h1 className="h3 mb-3 font-weight-normal">{ LOGIN_FIELDS.LOGIN_HEADING }</h1>
				<form className="form-signin" onSubmit={this.onSubmit}>
					{/* <div className="social-login">
						<button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
						<button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g"></i> Sign in with Google+</span> </button>
					</div>
					<p> OR  </p> */}
					<div>
						<div className="fields">
							<p>{ COMMON_FIELDS.USER_NAME }</p>
							<input type="text" name="Username" onChange={this.handleOnChangeUserName} autoComplete="Username" required/>
						</div>
						<div className="fields">
							<p>{ COMMON_FIELDS.PASSWORD }</p>
							<input type="password" name="Password" onChange={this.handleOnChangePassword} autoComplete="Password" required/></div>
						<br></br>
						<div className="buttons">
							<button type="button" onClick={this.onSubmit} className="btn btn-primary">{ LOGIN_FIELDS.LOGIN }</button>
							<Link to="/register">{ REGISTRATION_FIELDS.REGISTER }</Link>
						</div>
					</div>
				</form>
				{ loginSuccess && <Message message={LOGIN_MESSAGE} /> }
				{ error && <Error message={ERROR_IN_LOGIN} />}
				
				
				</div>
			);
		}
}


function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    //logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };