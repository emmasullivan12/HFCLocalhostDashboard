// Dex last merged this code on 10th August 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

class VerifyEmail extends React.Component {
  constructor () {
    super();
    this.state = {
      isContainerOpen: false,
      verificationCode: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleContainer = this.toggleContainer.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { verificationCode } = this.state;
    const submission = {
      token: verificationCode
    };
    console.log(submission);
//    this.props.verifyEmail(submission);
//    window.location.assign('https://test.prospela.com');
  }

  handleResendSubmit(e) {
    e.preventDefault();
    console.log("requesting to resend email verification code");
//    this.props.resendVerifyEmail();
  }

  canBeSubmitted() {
    const { verificationCode } = this.state;
    return (
      verificationCode.length > 0
    );
  }

  toggleContainer() {
    const currentState = this.state.isContainerOpen;
    this.setState({ isContainerOpen: !currentState });
  }

  render() {
  const isEnabled = this.canBeSubmitted();
  const {isContainerOpen, verificationCode} = this.state;

    return (
      <React.Fragment>
        <div className="mainContainer">
          <div className="prLogoArea col-12">
            <div className="prLogoContainer col-12">
              <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" />
            </div>
          </div>
          <div className="row">
            <div className="col-7 col-s-12 centerContainer">
              <div className="loginContainer">
                <div>
                  <h1>Hey USER NAME!</h1>
                  <div className="header-descriptor">We&#39;ve sent an email verification code to USER EMAIL. Please enter it below. Note: code only <span className="bold">valid for the next 24 hours.</span></div>
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="descriptor">Enter email verification code</div>
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
                    />
                  </div>
                  <button type="submit" disabled={!isEnabled} className="btn-general button-unstyled" id="emailverif-btn">
                    Verify Email
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
                      <li>Check your junk email folder</li>
                      <li>Did you enter your email address correctly (USER EMAIL)? If not, go back and <a href="https://test.prospela.com/signup">enter it again</a></li>
                      <li>Wait a few minutes or alternatively click to resend below</li>
                      <button type="submit" className="btn-general button-unstyled alignLeft" onClick={this.handleResendSubmit}>
                        <span >Resend code</span>
                      </button>
                      <div> Something went wrong. Looks like this user has already been verified. Please try and log in</div>
                      <div> Successfully resent. Please also check your junk mail.</div>
                    </ol>
                  </div>
                )}
                <div className="legalSection">Copyright 2019 All Rights Reserved. Made with ♥ by Prospela Group Ltd <a className="legal-href" href="https://prospela.com/privacy-policy/">Privacy</a> | <a className="legal-href" href="https://prospela.com/terms-of-use-safeguarding-policy/">Terms and Safeguarding</a></div>
              </div>
            </div>
            <div className="col-5 login-pic">
              <div className="login-picContainer">
                <img className="prPlatformImg" alt="Prospela Platform Cartoon" src="https://prospela.com/wp-content/uploads/2019/05/Platform-picture.png" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VerifyEmail;
