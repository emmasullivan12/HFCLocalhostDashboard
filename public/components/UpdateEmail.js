// Dex last merged this code on 24th may 2024

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import ProgressCircles from './ProgressCircles.js';
import Checkbox from './Checkbox.js';
import {LoadingSpinner} from './GeneralFunctions.js';

class UpdateEmail extends React.Component {
  constructor () {
    super();
    this.state = {
      isGeneralError: '',
      isSubmitting: false,
      userInput: '',
      emailIsValid: '',
      containsDotAndAt: '',
      hasTextBeforeAt: '',
      hasTextAfterAt: '',
      endsWithSymbol: '',
      isHtmlValid: '',
      submitted: ''
    }
    this.onBlur = this.onBlur.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {

    this.mounted = false;

    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  onBlur(e) {
    const {emailIsValid} = this.state;
    if(e.target.checkValidity() && emailIsValid) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  onChange = (e) => {
    this.setState({
      userInput: e.currentTarget.value
    })
  }

  toggleCheckbox = (e) => {
    const currentState = this.state[e.target.name];

    if (currentState === false) {
      this.setState({
        [e.target.name]: true,
      }, () => {
        document.getElementById("Submit-btn-eduEmail").focus()
      });

    } else {
      this.setState({
        [e.target.name]: false
      });
    }
  }

  onKeyDown = (e) => {
    var key = e.key || e.keyCode

    // User pressed the enter key
    if (key === 'Enter' || key === 13) {
      e.stopPropagation();
      e.preventDefault();

    }
  }

  handleKeyUp = (e) => {
    clearTimeout(this.timerHandle);

    this.timerHandle = setTimeout(() => {
      this.checkEmail()
      this.timerHandle = 0;
    }, 800);
  }

  handleSubmit() {
    const {userInput} = this.state;
    const {updateEmail, updateStep} = this.props

    this.setState({
      isSubmitting: true,
      submitted: true
    })
    updateEmail(userInput, () => {
      updateStep('updatedEmail')
    })
  }

  checkEmail() {
    const {userInput} = this.state;

    var emailSplit = userInput.split('@')
    var freeEmail = emailSplit[emailSplit.length-1].toLowerCase();
    const emailFormInput = document.getElementById("eduEmailInput")

    if (userInput.includes(".") != true || userInput.includes("@") != true) {
      this.setState({
        emailIsValid: false,
        containsDotAndAt: false,
      });
    } else if (userInput.indexOf("@") === 0) {
      this.setState({
        emailIsValid: false,
        containsDotAndAt: true,
        hasTextBeforeAt: false,
      });
    } else if (emailFormInput.checkValidity() != true) {
      this.setState({
        emailIsValid: false,
        containsDotAndAt: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: false,
        isHtmlValid: false,
      });
    } else {
      this.setState({
        emailIsValid: true,
        containsDotAndAt: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: false,
        isHtmlValid: true,
      }, () => {
        if (this.state.submitted != true) {
          document.getElementById("Submit-btn-eduEmail").focus()
        }
      });
    }
  }

  canBeSubmitted() {
    const {userInput, emailIsValid, hasTextBeforeAt, hasTextAfterAt, endsWithSymbol} = this.state;

    if (emailIsValid && hasTextBeforeAt && hasTextAfterAt && !endsWithSymbol) {
      const form = document.getElementById("form-ConfirmStudentSU");

      if (form.checkValidity()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  render() {
    const { onChange, onKeyDown, toggleCheckbox, handleKeyUp } = this;
    const { updateEmail, updateStep } = this.props;
    const { isGeneralError, containsDotAndAt, emailIsValid, userInput, hasTextBeforeAt, hasTextAfterAt, endsWithSymbol, isHtmlValid, isSubmitting } = this.state;
    const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div>
          <div className='embedded-typeform'>
            {isGeneralError === true && (
              <div>
                Oops! Something went wrong. Please try reloading the page.
              </div>
            )}
            {isGeneralError != true && (
              <form autoComplete="off" id="form-ConfirmStudentSU">
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="eduEmailInput">Your Email Address</label>
                  <input
                    type="email"
                    name="eduEmail"
                    id="eduEmailInput"
                    onBlur={this.onBlur}
                    onChange={onChange}
                    onKeyUp={handleKeyUp}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    className={"form-control-std verifyForm " + (emailIsValid === true || emailIsValid === "" ? "" : "error")}
                    placeholder="Your email address"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    maxLength="100"
                    autoFocus
                    required
                  />
                </div>
                {emailIsValid === false && (
                  <React.Fragment>
                    <div className="descriptor prompt error verifyForm otherOption alignLeft">
                      This must be a valid email
                    </div>
                  </React.Fragment>
                )}
                <button type="button" onClick={this.handleSubmit} disabled={isSubmitting === true ? true : !isEnabled} className="Submit-btn fullWidth" id="Submit-btn-eduEmail">
                  {isSubmitting === true && (
                    <LoadingSpinner />
                  )}
                  {isSubmitting != true && (
                    <span>Next</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UpdateEmail;
