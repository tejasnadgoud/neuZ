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
      user_name: this.props.username,
      password: "",
      email: "",
      phoneNumber: "",
      conf_password: "",
      id: "",
      username: this.props.username,
      password_match: "",
      email_error: "",
      password_error: "",
      phone_error: "",
      server_error: "",
      newpassword: "",
      ispasswordchangd: 0,
      donatedamount: "",
      ispasswordchangd: 0,
      conf_password_error: ""
    };
    this.store = this.props.store;
  }

  componentWillMount() {
    this.getuserdetail(this.props.username);
  }

  componentDidMount() {
    this.getuserdetail(this.props.username);
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
          newpassword: ""
        });
      } else {
        this.setState({
          password_error: "",
          newpassword: e.target.value
        });
      }
    }
    this.setState({
      newpassword: e.target.value
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
    if (!(this.state.conf_password === this.state.newpassword)) {
      this.setState({
        password_match: "password is not matching"
      });
    } else {
      this.setState({
        password_match: ""
      });
    }
    //  const password = this.state.password;
    //  const conf_password = this.state.conf_password;
    //  const salt = await bcrypt.genSaltSync(10);
    //  const hash_password = await bcrypt.hashSync(password, salt);
    //  const hash_conf_password = await bcrypt.hashSync(conf_password, salt);

    //  bcrypt.compare(password, conf_password, function(err, res) {
    //   if (err) {
    //       this.setState({
    //         password_match: err,
    //       });
    //   }
    //   if(res) {

    //    } else {

    //    }
    //  });
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

  handleReset = ({ fields, form }) => {
    this.getuserdetail(this.props.username);
  };

  getuserdetail(user_name) {
    axios
      .get(
        "http://localhost:4000/registration/getUserByUserName/" + user_name,
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
            id: u.data._id,
            server_error: "",
            donatedamount: u.data.donationAmount
          });
        } else {
          this.setState({
            server_error: "Server Error !!! "
          });
        }
      });
  }

  handleCheckboxChild = e => {
    this.setState({
      isChecked: e.target.checked,
      ispasswordchangd: 1
    });
  };

  onSubmit = async e => {
    e.preventDefault();

    if (
      this.state.email_error === "" &&
      this.state.password_error === "" &&
      this.state.conf_password_error === "" &&
      this.state.phone_error === ""
    ) {
      const first_name = this.state.first_name;
      const last_name = this.state.last_name;
      const user_name = this.state.user_name;
      const password = this.state.password;
      const ispasswordchangd = this.state.ispasswordchangd;

      // if(!(this.state.newpassword === "")){
      //    password = this.state.newpassword;
      // }
      const salt = bcrypt.genSaltSync(10);
      const Newpassword = bcrypt.hashSync(this.state.newpassword, salt);

      const email = this.state.email;
      const phoneNumber = this.state.phoneNumber;
      const id = this.state.id;

      await this.props.update(
        id,
        first_name,
        last_name,
        email,
        phoneNumber,
        password,
        Newpassword,
        ispasswordchangd
      );
    }
  };

  render() {
    const { alert, username } = this.props;
    return (
      <div className="container">
        <br />
        <br />
        <br />

        <h1>
          <b>Edit Profile</b>
        </h1>
        <hr></hr>
        <form
          className="form-signin"
          onSubmit={this.onSubmit}
          onReset={this.handleReset}
        >
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
              {this.state.password_error && (
                <Error message={this.state.password_error} />
              )}
              {this.state.conf_password_error && (
                <Error message={this.state.conf_password_error} />
              )}

              {/* { this.state.server_error && <Error message={this.state.server_error}/>} */}
              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
              {/* <form className="form-horizontal" role="form"> */}
              <div className="form-group text-left">
                <label className="col-lg-5 control-label text-right">
                  First name:
                </label>
                <div className="col-lg-5 ">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={this.state.first_name}
                    onChange={this.handleOnChangeFirstName}
                    required
                  />
                  <br />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-5 control-label text-right">
                  Last name:
                </label>
                <div className="col-lg-5">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={this.state.last_name}
                    onChange={this.handleOnChangeLastName}
                    required
                  />
                  <br />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-5 control-label text-right">
                  Email:
                </label>
                <div className="col-lg-5">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={this.state.email}
                    onChange={this.handleOnChangeEmail}
                    required
                  />
                  <br />
                </div>
                {/* <p>{this.state.email_error}</p> */}
              </div>
              <div className="form-group">
                <label className="col-lg-5 control-label text-right">
                  Phone Number:
                </label>
                <div className="col-lg-5">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={this.state.phoneNumber}
                    onChange={this.handleOnChangePhone}
                    required
                  />
                  <br />
                </div>
              </div>
              {/* <p>{this.state.email_error}</p> */}
              <div className="form-group">
                <label className="col-lg-5 control-label text-right">
                  Donated Amount:
                </label>
                <div className="col-lg-5">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={this.state.donatedamount}
                    disabled
                  />
                  <br />
                </div>
              </div>
              <div className="form-group ">
                <label className="col-md-5 control-label text-right">
                  Username:
                </label>
                <div className="col-md-5">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.user_name}
                    disabled
                  ></input>
                </div>
                <br />
                <br />
              </div>
              <div className="form-group">
                <label className="col-md-5 control-label text-right">
                  Change Password:
                </label>
                <div className="col-md-1">
                  <input
                    type="checkbox"
                    onChange={this.handleCheckboxChild}
                    defaultChecked={this.state.isChecked}
                  />
                  <br />
                  <br />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-5 control-label"></label>
                <div className="col-md-5">
                  <br />
                  <br />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-5 control-label text-right">
                  New Password:
                </label>
                <div className="col-md-5">
                  <input
                    className="form-control"
                    type="password"
                    defaultValue={this.state.newpassword}
                    disabled={!this.state.isChecked}
                    onChange={this.handleOnChangePassword}
                    required
                  />
                  <br />
                  {/* </input> */}
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-5 control-label text-right">
                  Re-enter password:
                </label>
                <div className="col-md-5">
                  <input
                    className="form-control"
                    type="password"
                    defaultValue={this.state.conf_password}
                    disabled={!this.state.isChecked}
                    onBlur={this.handleOnBlur}
                    onChange={this.handleOnChangeConfPassword}
                    required
                  />

                  {/*</input>*/}
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-3 control-label"></label>
                <div className="col-md-8">
                  {/* <input type="button" onClick={this.onSubmit} className="btn btn-primary" value="Save Changes"></input> */}
                  <br></br>
                  <button type="submit" className="btn btn-primary">
                    {" "}
                    Save{" "}
                  </button>{" "}
                  <span></span>
                  <button type="reset" className="btn btn-primary">
                    {"  "}
                    Reset{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
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
