import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";

class LoginContent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="prLogoArea row">
          <div className="prLogoContainer col-12">
            <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" />
          </div>
        </div>
        <div className="row">
          <div className="col-7 col-s-12 centerContainer">
            <div className="loginContainer">
              <div>
                <h1>Log in</h1>
                <div className="header-descriptor">Need a Prospela account? <a href="https://test.prospela.com/signup">Create an account</a></div>
              </div>
              <form method="POST" action="/login">
                <div className="form-group">
                  <div className="descriptor">Email</div>
                  <input type="text" name="email" className="form-control"/>
                </div>
                <div className="form-group">
                  <div>
                    <div className="alignLeft descriptor">Password</div>
                    <div><a className="alignRight descriptor" href="https://test.prospela.com/login/forgotpassword">Forgot Password?</a></div>
                  </div>
                  <input type="password" name="password" className="form-control"/>
                </div>
                <button type="submit" className="btn-general button-unstyled">Log in</button>
              </form>
              <div className="login-error-msg">The email and/or password entered were not recognised. Please try again</div>
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

export default LoginContent;
