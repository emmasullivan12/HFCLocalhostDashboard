// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import ProgressCircles from './ProgressCircles.js';
import TypeformEmbedded from './TypeformEmbedded.js';
import Autocomplete from './Autocomplete.js';
import {lookupUKSchUnis} from './UserDetail.js';

class ConfirmStudent extends React.Component {
/*  static defaultProperty={
    eduNameText: ''
  };*/

  constructor () {
    super();
    this.state = {
      userInput: '',
      eduEmailIsValid: '',
      isPersonalEmail: '',
      emailFormat: '',
      sentForReview: ''
    }
    this.onBlur = this.onBlur.bind(this);
    this.checkEduEmail = this.checkEduEmail.bind(this);
  }

  componentDidMount() {
    const {country, schName, uniName, eetStatus} = this.props;
    if (country === 'GBR') {
      if (eetStatus === 'sch' && schName != '') {
        return Promise.all([lookupUKSchUnis(schName, 'emailFormat', eetStatus)]).then(email => {
          console.log("schemail: "+email);
          this.setState({
            emailFormat: email
          })
        });
      } else if (eetStatus === 'uni' && uniName != '') {
        return Promise.all([lookupUKSchUnis(uniName, 'emailFormat', eetStatus)]).then(email => {
          console.log("uniemail: "+email);
          this.setState({
            emailFormat: email
          })
        });
      }
    }
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  onChange = (e) => {
    this.setState({
      userInput: e.currentTarget.value
    }, () => {
      if (this.state.userInput.includes("@") && this.state.userInput.includes(".")) {
        this.checkEduEmail();
      }
    })
  }

  checkEduEmail() {
    const {userInput, emailFormat} = this.state;
    const {country, eetStatus, schName, uniName} = this.props;

    const freeEmailDomains = ["gmail.com", "hotmail.com"];
    var emailSplit = userInput.split('@')
    var freeEmail = emailSplit[emailSplit.length-1].toLowerCase();

    if (freeEmailDomains.includes(freeEmail)) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: true
      });
    } else if (country === 'GBR') {
      if (eetStatus === 'sch') {

        // first check if user selected sch from our list and whether
        // that school has defined a specific email format
        if (schName != '' && emailFormat != "") {

          // This sch does not have .sch.uk format
          if (schName === '6000') {
            const isValid = emailFormat[0] === freeEmail;
            this.setState({
              eduEmailIsValid: isValid,
              isPersonalEmail: false
            });
          } else {
            const isValid = (freeEmail === emailFormat + ".sch.uk");
            this.setState({
              eduEmailIsValid: isValid,
              isPersonalEmail: false
            });
          }

        // if sch doesnt have specific format or user freetyped in sch name then do general check
        } else {
          const isValid = freeEmail.includes(".sch.uk") || freeEmail.includes(".gov.uk");
          this.setState({
            eduEmailIsValid: isValid,
            isPersonalEmail: false
          });
        }

      } else if (eetStatus === 'uni') {

        // first check if user selected uni from our list and whether that university has defined a specific email format
        if (uniName != '' && emailFormat != "") {

          // This University does not have .ac.uk format
          if (uniName === '69') {
            const isValid = emailFormat[0] === freeEmail;
            this.setState({
              eduEmailIsValid: isValid,
              isPersonalEmail: false
            });
          } else {
            const isValid = freeEmail === emailFormat + ".ac.uk";
            this.setState({
              eduEmailIsValid: isValid,
              isPersonalEmail: false
            });
          }

        // if uni doesnt have specific format or user freetyped in uni name then do general check .ac.uk
        } else {
          const isValid = freeEmail.includes(".ac.uk");
          this.setState({
            eduEmailIsValid: isValid,
            isPersonalEmail: false
          });
        }
      }
    } else if (country === 'USA') {
      //will be freetext
      //check against USA format e.g. .edu
    } else if (country === 'CAN') {
      console.log("canada email format check goes here")
      //will be freetext
      //check against CAN format e.g. .edu
    } else if (country === 'IRE') {
      //will be freetext
      //check against IRE format e.g. .edu
    } else {
      //don't do a check (as dont know format for every country) just get them to verify
      //and then come to prospela for approval
    }
  }

  canBeSubmitted() {
    const {userInput, eduEmailIsValid, isPersonalEmail, sentForReview} = this.state;
    const {eetStatus} = this.props;

    if (eetStatus === 'sch' || eetStatus === 'uni') {
      if (userInput != '' && eduEmailIsValid && !isPersonalEmail) {
        return true;
      } else {
        return false;
      }

    } else if (eetStatus === 'job' || eetStatus === 'train' || eetStatus === 'none') {
      if (sentForReview) {
        return true;
      } else {
        return false;
      }
    }

  }

  render() {
    const { onChange } = this;
    const { tflink, step, country, currentStep, eetStatus, totalMenteeSteps, userEduName } = this.props;
    const { eduEmailIsValid, userInput, isPersonalEmail } = this.state;
    const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div>
          <ProgressCircles
            totalSteps={totalMenteeSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            <form autoComplete="off">
              <div className="form-group">
                <label className="descriptor alignLeft">Your {userEduName} Email Address</label>
                <input
                  type="email"
                  name="schEmail"
                  onBlur={this.onBlur}
                  onChange={onChange}
                  value={userInput}
                  className="form-control-std verifyForm"
                  placeholder={"Your " + userEduName + " email address"}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                  autoFocus
                  required
                />
              </div>
              {eduEmailIsValid === false && isPersonalEmail === false && (
                <div className="descriptor prompt error verifyForm alignLeft">This must be a valid {userEduName} email address</div>
              )}
              {isPersonalEmail === true && (
                <div className="descriptor prompt error verifyForm alignLeft">This can&#39;t be a personal email address</div>
              )}
              <button type="submit" disabled={!isEnabled} className="Submit-btn fullWidth">
                Next
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConfirmStudent;
