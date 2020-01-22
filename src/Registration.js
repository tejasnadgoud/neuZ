import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  UserRegistration,
  UsernameValidation
} from "./services/RegistrationService";
import Message from "./Message";
import Error from "./Error";
import {
  REGISTRATION_FIELDS,
  REGISTRATION_MESSAGE,
  COMMON_FIELDS,
  ERROR_IN_REGISTRATION
} from "./MessageBundle";
import "./login.css";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      user_name: "",
      password: "",
      email: "",
      phoneNumber: "",
      register: false,
      error: false
    };
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
    if (typeof e.target.value !== "undefined") {
      var pattern = new RegExp(
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      );
      if (!pattern.test(e.target.value)) {
        this.setState({
          phone_error: "*Please enter valid phoneNumber",
          phoneNumber: e.target.value
        });
      } else {
        this.setState({
          phone_error: "",
          phoneNumber: e.target.value
        });
      }
    }

    this.setState({
      //phone_error : '',
      phoneNumber: e.target.value
    });
  };

  handleOnBlur = async e => {
    this.setState({
      user_name: e.target.value
    });
    const data = {
      user_name: this.state.user_name
    };
    const isUsernameTaken = await UsernameValidation(data);

    isUsernameTaken === 204
      ? this.setState({ user_name_taken: true })
      : this.setState({ user_name_taken: false });
  };

  onSubmit = async e => {
    e.preventDefault();
    if (
      this.state.email_error === "" &&
      this.state.password_error === "" &&
      this.state.phone_error === ""
    ) {
      const data = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        user_name: this.state.user_name,
        password: this.state.password,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        donationAmount: "0"
      };

      const registerStatus = await UserRegistration(data);
      if (registerStatus === 200) {
        this.setState({
          first_name: "",
          last_name: "",
          user_name: "",
          password: "",
          email: "",
          phoneNumber: "",
          register: true,
          error: false
        });
      } else
        this.setState({
          error: true,
          register: false
        });

      this.setState({
        regexerror: 0
      });
    } else {
      this.setState({
        regexerror: 1
      });
    }
  };

  render() {
    const { register, error, user_name_taken, regexerror } = this.state;

    return (
      <div id="logreg-forms">
        <h1>{REGISTRATION_FIELDS.REGISTRATION_HEADING}</h1>
        <form className="form-signin" onSubmit={this.onSubmit}>
          <div>
            <div className="fields">
              <p>{REGISTRATION_FIELDS.FIRST_NAME}</p>
              <input
                type="text"
                value={this.state.first_name}
                name="FirstName"
                onChange={this.handleOnChangeFirstName}
                required
              />
            </div>
            <div className="fields">
              <p>{REGISTRATION_FIELDS.LAST_NAME}</p>
              <input
                type="text"
                value={this.state.last_name}
                name="LastName"
                onChange={this.handleOnChangeLastName}
                required
              />
            </div>
            <div className="fields">
              <p>{REGISTRATION_FIELDS.EMAIL}</p>
              <input
                type="text"
                value={this.state.email}
                name="Email"
                onChange={this.handleOnChangeEmail}
                required
              />
              <p>
                <div style={{ color: "red" }}>{this.state.email_error}</div>
              </p>
              {/* <p>{this.state.email_error}</p> */}
            </div>
            <div className="fields">
              <p>{REGISTRATION_FIELDS.PHONE}</p>
              <input
                type="text"
                value={this.state.phoneNumber}
                name="PhoneNumber"
                onChange={this.handleOnChangePhone}
                required
              />
              <p>
                <div style={{ color: "red" }}>{this.state.phone_error}</div>
              </p>
              {/* <p>{this.state.phone_error}</p> */}
            </div>
            <div className="fields">
              <p>{COMMON_FIELDS.USER_NAME}</p>
              <input
                type="text"
                className={classNames({ error: user_name_taken })}
                value={this.state.user_name}
                name="Username"
                onBlur={this.handleOnBlur}
                onChange={this.handleOnChangeUserName}
                autoComplete="Username"
                required
              />
            </div>
            <div className="fields">
              <p>{COMMON_FIELDS.PASSWORD}</p>
              <input
                type="password"
                value={this.state.password}
                name="Password"
                onChange={this.handleOnChangePassword}
                autoComplete="password"
                required
              />
              <p>
                <div style={{ color: "red" }}>{this.state.password_error}</div>
              </p>
              {/* <p>{this.state.password_error}</p> */}
            </div>
            <div className="buttons">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={user_name_taken}
              >
                {REGISTRATION_FIELDS.REGISTER}
              </button>
              <Link to="/login">{REGISTRATION_FIELDS.CANCEL}</Link>
            </div>
          </div>
        </form>
        {error && <Error message={ERROR_IN_REGISTRATION} />}
        {register && <Message message={REGISTRATION_MESSAGE} />}
        {user_name_taken && <Error message="User Name is not avilable" />}
        {regexerror == 1 && <Error message="Please fix error before submit" />}
      </div>
    );
  }
}
