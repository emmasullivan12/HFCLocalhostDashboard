// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";

class VerifyEmail extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="prLogoArea col-12">
          <div className="prLogoContainer col-12">
            <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" />
          </div>
        </div>
        <div className="row">
          <div className="col-7 col-s-12 centerContainer">
            <div className="loginContainer">
              <div>
                <h1>Enter your code</h1>
                <div className="header-descriptor">We&#39;ve sent an email verification code to your email. Please enter it below. Note: code only <span className="bold">valid for the next 24 hours.</span></div>
              </div>
              <form method="POST" action="/login">
                <div className="form-group">
                  <div className="descriptor">Enter email verification code</div>
                  <input type="password" name="emailverfcode" className="form-control-pwd" required id="emailverifcode"/>
                </div>
                <button type="submit" className="btn-general button-unstyled" id="emailverif-btn">Verify Email</button>
              </form>
              <div className="descriptor">Can&#39;t see the email?</div>
              <div className="login-error-msg">The email verification code does not exist. Please check and try again, or <a className="error-href" href="https://test.prospela.com/resendemailverificationcode">resend code</a></div>
              <div className="legalSection">Copyright 2019 All Rights Reserved. Made with ♥ by Prospela Group Ltd <a className="legal-href" href="https://prospela.com/privacy-policy/">Privacy</a> | <a className="legal-href" href="https://prospela.com/terms-of-use-safeguarding-policy/">Terms and Safeguarding</a></div>
            </div>
          </div>
          <div className="col-5 login-pic">
            <div className="login-picContainer">
              <img className="prPlatformImg" alt="Prospela Platform Cartoon" src="https://prospela.com/wp-content/uploads/2019/05/Platform-picture.png" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VerifyEmail;
