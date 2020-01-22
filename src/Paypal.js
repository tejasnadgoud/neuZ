import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import axios from "axios";
import { userService } from "./services/UserService";

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      donationAmount: "",
      id: "",
      username: this.props.username
    };
    window.React = React;
    window.ReactDOM = ReactDOM;
  }
  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
    this.getuserdetail();
  }
  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;
    const isLoadedButWasntLoadedBefore =
      !this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;
    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
    this.getuserdetail();
  }

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
            donationAmount: u.data.donationAmount,
            id: u.data._id
          });
        }
      });
  }

  savepayment() {
    userService.updatepayment(this.state.id, "100");
  }

  render() {
    const paypal = window.PAYPAL;
    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel
    } = this.props;
    const { showButton } = this.state;
    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency
            }
          }
        ]
      });
    const onAuthorize = (data, actions) =>
      actions.payment.execute().then(() => {
        const payment = {
          paid: true,
          cancelled: false,
          payerID: data.payerID,
          paymentID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl
        };
        this.savepayment();
        //onSuccess(payment);
      });
    return (
      <div>
        {showButton && (
          <paypal.Button.react
            env={env}
            client={client}
            commit={commit}
            payment={payment}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
          />
        )}
      </div>
    );
  }
}
export default scriptLoader("https://www.paypalobjects.com/api/checkout.js")(
  PaypalButton
);
