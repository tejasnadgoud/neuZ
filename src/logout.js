import React, { Component } from 'react';
import {userActions} from './actions';
import { connect } from 'react-redux';

class Logout extends Component {
    constructor(props) {
		super(props);

		this.state = {
			user_name: '',
			password: '',
			error: false,
			loginSuccess: false
		}
        this.store = this.props.store;
        this.handlelogout();
	}
    handlelogout = () =>  {
        this.props.logout()
    }
}



function mapState(state) {
    const { loggingIn } = 0;
    return { loggingIn };
}

const actionCreators = {
    logout: userActions.logout,
    //logout: userActions.logout
};

const connectedLogoutPage = connect(mapState, actionCreators)(Logout);
export { connectedLogoutPage as Logout };