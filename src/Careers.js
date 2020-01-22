import React from "react";
import "./Careers.css";
import validators from "./validators";
import formslogo from "./images/formslogo.jpg";
import axios from "axios";
import * as emailjs from "emailjs-com";
var salutationDecision = false;
export default class Careers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        firstName: "",
        lastName: "",
        userName: "",
        emailId: "",
        phoneNumber: "",
        zipCode: "",
        comments: ""
      },
      how: {
        google: false,
        facebook: false,
        yelp: false
      },
      fields: {},
      howArray: [],
      salutationArray: []
    };
    // Set of validators for Form
    this.validators = validators;
    // This resets our form when navigating between views
    this.resetValidators();
    // Correctly Bind class methods to reacts class instance
    this.handleInputChange = this.handleInputChange.bind(this);
    this.displayValidationErrors = this.displayValidationErrors.bind(this);
    this.updateValidators = this.updateValidators.bind(this);
    this.resetValidators = this.resetValidators.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  // This function is called whenever a form input is changed
  //  Which in turn updates the state of this component and validators
  handleInputChange(event, inputPropName) {
    var fields = this.state.fields;
    fields[inputPropName] = event.target.value;
    this.setState({ fields });
    const newState = Object.assign({}, this.state);
    newState.userInfo[inputPropName] = event.target.value;
    this.setState(newState);
    this.updateValidators(inputPropName, event.target.value);
  }
  //This function handles the logic when submiting the form.
  handleSubmit(e) {
    console.log(this.state.userInfo);
    console.log("Yepee! form submitted");
    e.preventDefault();
  }

  //  This function updates the state of the validator for the specified validator
  updateValidators(fieldName, value) {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    this.validators[fieldName].rules.forEach(rule => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      }
    });
  }

  // This function resets all validators for this form to the default state
  resetValidators() {
    Object.keys(this.validators).forEach(fieldName => {
      this.validators[fieldName].errors = [];
      this.validators[fieldName].state = "";
      this.validators[fieldName].valid = false;
    });
  }
  // This function displays the validation errors for a given input field
  displayValidationErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = "";
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return (
          <span className="error" key={index}>
            * {info}
          </span>
        );
      });
      return <div className="col s12 row">{errors}</div>;
    }
    return result;
  }
  // This method checks to see if the validity of all validators are true
  isFormValid() {
    let status = true;
    Object.keys(this.validators).forEach(field => {
      if (!this.validators[field].valid) {
        status = false;
      }
    });
    return status;
  }

  handleCheckClick = () => {
    //you can't setState on props
    //this.props.setState({ checked: !this.props.state.checked });
    this.setState({ checkBoxChecked: !this.state.checkBoxChecked });
    //now if you want do stuff on parent you can call the parent function
    this.props.handleCheckClick(this.state.checkBoxChecked);
  };
  // state = {
  //     firstName: '',
  //     lastName: '',
  //     userName: '',
  //     email: '',
  //     phoneNumber: '',
  //     zipCode: ''
  // }
  onHowChange(e) {
    const val = e.target.checked;
    if (val) {
      console.log("Entered if condition");
      this.state.howArray.push(val);
    } else {
      console.log("Entered else condition");
      this.state.howArray.pop(val);
    }
    const name = e.target.name;
    console.log("Name is: ", name);
    console.log("Value is: ", val);
    let updatedHow = Object.assign({}, this.state.how, { [name]: val });
    this.setState({
      how: updatedHow
    });
  }
  setSalutation(e) {
    console.log(e.target.name);
    console.log(e.target.value);
    if (e.target.value != "") {
      console.log("At least one is selected");
      salutationDecision = "true";
      console.log("Salutation decision: ", salutationDecision);
    } else {
      console.log("No radio button selected");
      salutationDecision = "false";
      console.log("Salutation decision: ", salutationDecision);
    }
  }
  onSubmit = async e => {
    e.preventDefault();
    console.log("Got to know from: ", this.state.how);

    console.log("State after submit: ", this.state);

    if (this.state.userInfo.firstName == "") {
      console.log("First name is blank");
      this.refs.firstNameRef.innerHTML = "Name cannot be blank";
    } else {
      this.refs.firstNameRef.innerHTML = "";
    }
    // if(this.state.userInfo.lastName == "") {
    //     this.refs.lastNameRef.innerHTML = "Name cannot be blank";
    // } else {
    //     this.refs.lastNameRef.innerHTML = "";
    // }
    if (this.state.userInfo.emailId == "") {
      this.refs.emailIdRef.innerHTML = "Email cannot be blank";
    } else {
      this.refs.emailIdRef.innerHTML = "";
    }
    if (this.state.userInfo.phoneNumber == "") {
      this.refs.phoneNumberRef.innerHTML = "Phone number cannot be blank";
    } else {
      this.refs.phoneNumberRef.innerHTML = "";
    }
    if (this.state.userInfo.zipCode == "") {
      this.refs.zipCodeRef.innerHTML = "Zip code cannot be blank";
    } else {
      this.refs.zipCodeRef.innerHTML = "";
    }
    if (this.state.userInfo.comments == "") {
      this.refs.commentsRef.innerHTML = "Please enter this field";
    } else {
      this.refs.commentsRef.innerHTML = "";
    }
    console.log("HowArray length: ", this.state.howArray.length);
    // if (this.state.howArray.length == 0) {
    //     console.log("No checkbox is selected")
    //     this.displayValidationErrors('source');
    //     this.refs.test.innerHTML = " Please select an option";
    // } else {
    //     console.log("At least one checkbox is selected")
    //     this.refs.test.innerHTML = "";
    // }
    // if (!salutationDecision) {
    //     console.log("No salutaion selected")
    //     this.refs.salutationRef.innerHTML ="Please select an option"
    // } else {
    //     console.log("Salutation selected")
    //     this.refs.salutationRef.innerHTML = ""
    // }
    if (
      this.refs.firstNameRef.innerHTML == "" &&
      this.refs.emailIdRef.innerHTML == "" &&
      this.refs.phoneNumberRef.innerHTML == "" &&
      this.refs.zipCodeRef.innerHTML == "" &&
      this.refs.commentsRef.innerHTML == ""
    ) {
      const {
        firstName,
        emailId,
        phoneNumber,
        zipCode,
        comments
      } = this.state.userInfo;

      let templateParams = {
        from_name: firstName,
        to_name: "vaibhavdhoke1@gmail.com",
        message_html: comments,
        phoneNumber: phoneNumber,
        zipCode: zipCode,
        emailId: emailId
      };
      emailjs.send(
        "gmail",
        "template_4bmed3jQ",
        templateParams,
        "user_O4KZOo531M8Lig8VAtJiY"
      );
      console.log("Inside Mail");
    }
    this.setState({
      userInfo: {
        firstName: "",
        lastName: "",
        userName: "",
        emailId: "",
        phoneNumber: "",
        zipCode: "",
        comments: ""
      },
      how: {
        google: false,
        facebook: false,
        yelp: false
      },
      fields: {},
      howArray: [],
      salutationArray: []
    });
  };
  render() {
    return (
      <div id="container">
        <main>
          <img
            className="card-img-top"
            src={formslogo}
            style={{ width: "500px", height: "200px" }}
            alt="neuZ"
          ></img>
          <br />
          <p>
            To apply for a position at neuZ, email your résumé and a few words
            about yourself to
            <a href="mailto:neuznews@gmail.com"> neuznews@gmail.com</a>. You can
            also apply directly here by filling out the form below.
          </p>
          <form onSubmit={this.onSubmit.bind(this)}>
            <label id="titleId"></label>
            {/* 
                    <div onChange={this.setSalutation.bind(this)}>
                        <input 
                            type="radio" 
                            name="title" 
                            id="a1" 
                            value="miss" 
                            required="required"
                        />Miss
                        <input 
                            type="radio" 
                            name="title" 
                            id="a2" 
                            value="mr" 
                            required="required"
                        />Mr.
                        
                        <input 
                            type="radio" 
                            name="title" 
                            id="a3" 
                            value="mrs" 
                            required="required"
                        />Mrs.
                        <span id="salutationError" ref="salutationRef"></span>                  
                        <br/><br/>
                      
                    </div>  */}

            <br />
            <label htmlFor="firstName"></label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Name *"
              size="70"
              value={this.state.userInfo.firstName}
              onChange={e => this.handleInputChange(e, "firstName")}
            />
            <br />
            <span ref="firstNameRef" id="errorName"></span>
            <span id="errorName">
              {this.displayValidationErrors("firstName")}
            </span>
            <br />
            <br />
            {/* <label htmlFor="lastName">Last Name*:</label>
                 <input type="text"
                        name="lastName" 
                        id="lastName" 
                        placeholder="Last Name"
                        value={this.state.userInfo.lastName}
                        onChange={e => this.handleInputChange(e, 'lastName')}
                        />
                        <br/>
                        <span id="errorName" ref="lastNameRef"></span>
                        <span id="errorName"> {this.displayValidationErrors('lastName')} </span>
                        
                    <br/><br/>
                     */}
            <label htmlFor="emailId"></label>
            <input
              type="text"
              name="emailId"
              id="emailId"
              size="70"
              placeholder="Email *"
              value={this.state.userInfo.emailId}
              onChange={e => this.handleInputChange(e, "emailId")}
            />
            <br />
            <span id="errorName" ref="emailIdRef"></span>
            <span id="errorEmail">
              {" "}
              {this.displayValidationErrors("emailId")}{" "}
            </span>
            <br />
            <br />
            <label htmlFor="phoneNumber"></label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              size="70"
              placeholder="Phone *"
              value={this.state.userInfo.phoneNumber}
              onChange={e => this.handleInputChange(e, "phoneNumber")}
            />
            <br />
            <span id="errorName" ref="phoneNumberRef"></span>
            <span id="errorNumber">
              {" "}
              {this.displayValidationErrors("phoneNumber")}{" "}
            </span>
            <br />
            <br />
            <label htmlFor="zipcode"></label>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              size="70"
              placeholder="Zip code *"
              value={this.state.userInfo.zipCode}
              onChange={e => this.handleInputChange(e, "zipCode")}
            />
            <br />
            <span id="errorName" ref="zipCodeRef"></span>
            <span id="errorZip">
              {" "}
              {this.displayValidationErrors("zipCode")}{" "}
            </span>
            <br />
            <br />
            <label id="howId" htmlFor="zipcode"></label>
            {/* <input 
                    id="cId" 
                    type='checkbox' 
                    name="source" 
                    value={this.state.how['facebook']}
                    checked = {this.state.checkBoxChecked}
                    onChange={this.onHowChange.bind(this)}
                    /> Facebook
                    
                    <input 
                    id="cId" 
                    type='checkbox' 
                    name="source" 
                    value={this.state.how['google']}
                    onChange={this.onHowChange.bind(this)}
                    /> Google
                    
                    <input 
                    id="cId" 
                    type='checkbox' 
                    name="source" 
                    value={this.state.how['yelp']}
                    onChange={this.onHowChange.bind(this)}
                    /> Yelp
                    <br/>
                    <span id="checkedError" ref='test'></span>
        
                    <br/><br/> */}

            <br />
            <label id="commentsId" htmlFor="comments"></label>
            <textarea
              name="text"
              id="comments"
              size="100"
              placeholder="Why do you want to work for neuZ?  *"
              rows="10"
              cols="70"
              value={this.state.userInfo.comments}
              onChange={e => this.handleInputChange(e, "comments")}
            ></textarea>
            <br />
            <span id="errorName" ref="commentsRef"></span>
            <span id="commentsError">
              {" "}
              {this.displayValidationErrors("comments")}{" "}
            </span>

            <br />
            <h5>Please select role that you are applying for:</h5>
            <select id="select1" name="cards">
              <option value="fries">Web Developer</option>
              <option value="coke">Network Architect</option>
              <option value="burger">Full Stack Developer</option>
            </select>
            <span id="errorSelect1"> {} </span>
            <br />
            <br />
            <br />
            <button onClick={e => this.onSubmit(e)}>Submit</button>

            <br />
            <br />
            <br />
          </form>
        </main>
      </div>
    );
  }
}
