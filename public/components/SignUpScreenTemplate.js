// Dex last merged this code on 4th June 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/SignUpScreenTemplate.css";

// Typeform Sign Up pages template for use with both mentors / student
class SignUpScreenTemplate extends React.Component {

  render() {
    const {children, subheader, title, fullWidth} = this.props;

    //Converts any HTML tags that were passed as string to HTMl tags
    /*var parsedSubheader = new DOMParser().parseFromString(subheader, "text/xml");*/
    return (
      <div className="mainContainer">
        <div className="prLogoArea col-12">
          <div className="prLogoLoginContainer col-12">
            <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" />
          </div>
        </div>
        <div className="row">
          <div className={"col-s-12 centerContainer "+ (fullWidth === true ? "col-12" : "col-7")}>
            <div className={"typeformContainer "+ (fullWidth === true ? "fullWidth" : "")}>
              <div>
                <h1>{title}</h1>
                <div className="header-descriptor">{subheader}</div>
              </div>
              <div className="typeform-content">
                {children}
              </div>
            </div>
            <div className="col-5 legalSection">Copyright 2019 All Rights Reserved. Made with ♥ by Prospela Group Ltd <a className="legal-href" href="https://prospela.com/privacy-policy/">Privacy</a> | <a className="legal-href" href="https://prospela.com/terms-of-use-safeguarding-policy/">Terms and Safeguarding</a></div>
          </div>
          {!fullWidth && (
            <div className="col-5 login-pic">
              <div className="login-picContainer">
                <img className="prPlatformImg" alt="Prospela Platform Cartoon" src="https://prospela.com/wp-content/uploads/2019/05/Platform-picture.png" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SignUpScreenTemplate;
