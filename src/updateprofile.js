import axios from "axios";
import React, { Component } from "react";
import { userActions, alertActions } from "./actions";
import { connect } from "react-redux";
import Error from "./Error";
import bcrypt from "bcryptjs";

class Updateprofile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      user_name: "",
      password: "",
      email: "",
      phoneNumber: "",
      conf_password: "",
      id: "",
      username: this.props.username,
      password_match: ""
    };
    this.store = this.props.store;
  }

  componentWillMount() {
    this.getuserdetail();
  }

  componentDidMount() {
    this.getuserdetail();
  }

  handleOnChangeFirstName = e => {
    this.setState({
      first_name: e.target.value
    });
  };

  handleOnChangeLastName = e => {
    this.setState({
      last_name: e.target.value
    });
  };

  handleOnChangeUserName = e => {
    this.setState({
      user_name: e.target.value
    });
  };

  handleOnChangePassword = e => {
    if (typeof e.target.value !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      if (!pattern.test(e.target.value)) {
        //formIsValid = false;
        this.setState({
          password_error: "*Please enter valid password",
          password: ""
        });
      } else {
        this.setState({
          password_error: "",
          password: e.target.value
        });
      }
    }
    this.setState({
      password: e.target.value
    });
  };

  handleOnChangeConfPassword = e => {
    if (typeof e.target.value !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      if (!pattern.test(e.target.value)) {
        //formIsValid = false;
        this.setState({
          conf_password_error: "*Please enter valid password",
          conf_password: ""
        });
      } else {
        this.setState({
          conf_password_error: "",
          conf_password: e.target.value
        });
      }
    }
    this.setState({
      conf_password: e.target.value
    });
  };

  handleOnBlur = async e => {
    const password = this.props.password;
    const conf_password = this.props.conf_password;
    const salt = await bcrypt.genSaltSync(10);
    const hash_password = await bcrypt.hashSync(password, salt);
    const hash_conf_password = await bcrypt.hashSync(conf_password, salt);

    bcrypt.compare(hash_password, hash_conf_password, function(err, res) {
      if (res) {
        this.setState({
          password_match: ""
        });
      } else {
        this.setState({
          password_match: "Password Does not match. Please reneter"
        });
      }
    });
  };

  handleOnChangeEmail = e => {
    if (typeof e.target.value !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(e.target.value)) {
        //formIsValid = false;
        this.setState({
          email_error: "*Please enter valid email-ID.",
          email: ""
        });
      } else {
        this.setState({
          email_error: "",
          email: e.target.value
        });
      }
    }
    this.setState({
      email: e.target.value
    });
  };

  handleOnChangePhone = e => {
    var pattern = new RegExp(
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    );
    if (typeof e.target.value !== "undefined") {
      if (!pattern.test(e.target.value)) {
        this.setState({
          phone_error: "*Please enter valid phoneNumber",
          phoneNumber: e.target.value
        });
      }
    } else {
      this.setState({
        phone_error: "",
        phoneNumber: e.target.value
      });
    }
    this.setState({
      //phone_error : '',
      phoneNumber: e.target.value
    });
  };

  getuserdetail() {
    axios
      .get(
        "http://localhost:4000/registration/getUserByUserName/" +
          this.state.username,
        {
          //params: {"user_name": this.props.username}
        }
      )
      .then(u => {
        if (u.data) {
          this.setState({
            first_name: u.data.first_name,
            last_name: u.data.last_name,
            user_name: u.data.user_name,
            password: u.data.password,
            email: u.data.email,
            phoneNumber: u.data.phoneNumber,
            id: u.data._id
          });
        }
      });
  }

  onSubmit = async e => {
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const user_name = this.state.user_name;
    const password = this.state.password;
    const email = this.state.email;
    const phoneNumber = this.state.phoneNumber;
    const id = this.state.id;

    const loginResult = await this.props.update(
      id,
      first_name,
      last_name,
      email,
      phoneNumber,
      password
    );
  };

  render() {
    return (
      <div className="container">
        <h1>Edit Profile</h1>
        <hr></hr>
        <div className="row">
          {/* <!-- left column --> */}
          {/* <div className="col-md-3">
                    <div className="text-center">
                    <img src="//placehold.it/100" className="avatar img-circle" alt="avatar"></img>
                    <h6>Upload a different photo...</h6>
                    <input type="file" className="form-control"></input>
                    </div>
                </div> */}

          {/* <!-- edit form column --> */}
          <div className="col-md-9 personal-info">
            {/* <div className="alert alert-info alert-dismissable">
                        <a className="panel-close close" data-dismiss="alert">×</a> 
                        {this.state.email_error}
                    
                    </div>
                    <h3>Personal info</h3> */}
            {this.state.email_error && (
              <Error message={this.state.email_error} />
            )}
            {this.state.phone_error && (
              <Error message={this.state.phone_error} />
            )}
            {this.state.password_match && (
              <Error message={this.state.password_match} />
            )}
            {/* <form className="form-horizontal" role="form"> */}
            <div className="form-group">
              <label className="col-lg-3 control-label">First name:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  defaultValue={this.state.first_name}
                  onChange={this.handleOnChangeFirstName}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Last name:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  defaultValue={this.state.last_name}
                  onChange={this.handleOnChangeLastName}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Email:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleOnChangeEmail}
                ></input>
              </div>
              {/* <p>{this.state.email_error}</p> */}
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Phone Number:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.phoneNumber}
                  onChange={this.handleOnChangePhone}
                ></input>
              </div>
              {/* <p>{this.state.email_error}</p> */}
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Username:</label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.user_name}
                  disabled
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Password:</label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleOnChangePassword}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">
                Confirm password:
              </label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="password"
                  value={this.state.conf_password}
                  onBlur={this.handleOnBlur}
                  onChange={this.handleOnChangeConfPassword}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label"></label>
              <div className="col-md-8">
                <input
                  type="button"
                  onClick={this.onSubmit}
                  className="btn btn-primary"
                  value="Save Changes"
                ></input>
                <span></span>
                <input
                  type="reset"
                  className="btn btn-default"
                  value="Cancel"
                ></input>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  // change new
  const { loggingIn } = state.authentication;
  const { alert } = state;
  return { alert, loggingIn };
}

const actionCreators = {
  update: userActions.update,
  clearAlerts: alertActions.clear
};

const connectedUserprofile = connect(mapState, actionCreators)(Updateprofile);
export { connectedUserprofile as Updateprofile };
