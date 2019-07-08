// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/TypeformTemplate.css";

// Typeform Sign Up pages template for use with both mentors / student
class TypeformTemplate extends React.Component {

  render() {
    const {children, subheader, title} = this.props;
    return (
      <div className="mainContainer">
        <div className="prLogoArea col-12">
          <div className="prLogoContainer col-12">
            <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" />
          </div>
        </div>
        <div className="row">
          <div className="col-7 col-s-12 centerContainer">
            <div className="typeformContainer">
              <div>
                <h1>{title}</h1>
                <div className="header-descriptor">{subheader}</div>
              </div>
              <div className="typeform-content">
                {children}
              </div>
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
    );
  }
}

export default TypeformTemplate;
