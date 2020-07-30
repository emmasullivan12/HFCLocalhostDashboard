// Dex last merged this code on 3rd july 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";
import {LoadingSpinner} from './GeneralFunctions.js';

class VerifyEmail extends React.Component {
  constructor () {
    super();
    this.state = {
      isContainerOpen: false,
      verificationCode: '',
      resentCode: false,
      isSubmitting: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResendSubmit = this.handleResendSubmit.bind(this);
    this.toggleContainer = this.toggleContainer.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      document.getElementById("emailverif-btn").focus()
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { verificationCode } = this.state;
    const {updateStep, country, step} = this.props;
    const needsRev = step === "didEduEmailNeedsRev"
    const submission = {
      token: verificationCode
    };
    this.setState({
      isSubmitting: true
    })
    if (needsRev === true) {
      updateStep('didEmailVerifNeedsRev')
    } else {
      updateStep('didEmailVerif')
    }

  }

  handleUpdateEmail() {
    const {updateStep, userRole} = this.props;
    const newStep = userRole === 'mentee' ? 'didDiversity' : 'updatingEmail'

    updateStep(newStep) // Send them back to update their email
  }

  handleResendSubmit(e) {
    this.setState({ resentCode: true });
//    this.props.resendVerifyEmail();
  }

  canBeSubmitted() {
    const { verificationCode } = this.state;
    return (
      verificationCode.length === 6
    );
  }

  toggleContainer() {
    const currentState = this.state.isContainerOpen;
    this.setState({ isContainerOpen: !currentState });
  }

  render() {
  const isEnabled = this.canBeSubmitted();
  const {isContainerOpen, verificationCode, resentCode, isSubmitting} = this.state;
  const {emailToVerify} = this.props;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="emailverifcode">Enter email verification code</label>
            <input
              type="password"
              name="verificationCode"
              className="form-control-pwd"
              id="emailverifcode"
              value={this.state.verificationCode}
              onChange={this.handleChange}
              required
              autoFocus
              minLength="6"
              maxLength="6"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
            />
          </div>
          <button type="submit" disabled={isSubmitting === true ? true : !isEnabled} className="Submit-btn emailVerif" id="emailverif-btn">
            {isSubmitting === true && (
              <LoadingSpinner />
            )}
            {isSubmitting != true && (
              <span>Verify Email</span>
            )}
          </button>
        </form>
        <div className="login-error-msg">The email verification code does not exist. Please check and try again</div>
        <button type="button" className="btnDescriptor button-unstyled alignLeft" onClick={this.toggleContainer}>
          <span >Can&#39;t see the email? </span>
          <span className="exclamation-icon-container">
            <i className="fas fa-question-circle" />
          </span>
        </button>
        {isContainerOpen && (
          <div className="descriptor subheader">
            <ol>
              <li className="descListItem">Check your junk email folder</li>
              <li className="descListItem">
                Did you enter your email address correctly ({emailToVerify})? If not, go back and
                <button type="button" disabled={isSubmitting === true ? true : false} onClick={this.handleUpdateEmail} className="Submit-btn BlankBtn Inline">
                  enter it again
                </button>
              </li>
              <li className="descListItem">Wait a few minutes or alternatively click to resend below</li>
              <button type="button" disabled={isSubmitting === true ? true : false} className="Submit-btn alignLeft resendCode" onClick={this.handleResendSubmit}>
                <span >Resend code</span>
              </button>
              <div className="redText"> Something went wrong. Looks like this user has already been verified. Please try and log in</div>
              {resentCode === true && (
                <div className="greenText"> Successfully resent. Please also check your junk mail.</div>
              )}
            </ol>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default VerifyEmail;
