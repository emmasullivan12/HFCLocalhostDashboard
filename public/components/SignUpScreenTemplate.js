// Dex last merged this code on 9th nov 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";
import {cdn} from './CDN.js';
import "../css/SignUpScreenTemplate.css";

// Typeform Sign Up pages template for use with both mentors / student
class SignUpScreenTemplate extends React.Component {

  render() {
    const {children, subheader, title, fullWidth, containerClassName, isTripwire} = this.props;
    const currYear = new Date().getFullYear()

    //Converts any HTML tags that were passed as string to HTMl tags
    /*var parsedSubheader = new DOMParser().parseFromString(subheader, "text/xml");*/
    return (
      <div className="mainContainer">
        <div className="prLogoArea signUp col-12">
          <div className="crop-headerLogo col-12">
            <img
              alt="TheHumanFinanceClub Logo"
              src={cdn+"/Website/HFC%20Logo%20Pink_Beige%20Transparent%20background.png"}
            />
          </div>
        </div>
        <div className="row">
          <div className={"col-s-12 centerContainer "+ (fullWidth === true ? "col-12" : "col-7")}>
            <div className={"typeformContainer "+ containerClassName + ((fullWidth === true && !isTripwire) ? " fullWidth" : "")}>
              <div>
                <h1>{title}</h1>
                <div className="header-descriptor">{subheader}</div>
              </div>
              <div className="typeform-content">
                {children}
              </div>
            </div>
            <div className="col-5 col-s-12 legalSection">Copyright {currYear} All Rights Reserved. Made with ♥ by The Human Finance Club <a className="legal-href" href="https://prospela.com/privacy-policy/">Privacy</a> | <a className="legal-href" href="https://prospela.com/terms-of-use-safeguarding-policy/">Terms and Safeguarding</a></div>
          </div>
          {!fullWidth && (
            <div className="col-5 login-pic">
              <div className="login-picContainer ">
                <img
                  className="prPlatformImg"
                  alt="Prospela Platform Cartoon"
                  srcSet={cdn+"/images/Platform-picture_150.png 150w, "+cdn+"/images/Platform-picture_340.png 340w, "+cdn+"/images/Platform-picture_450.png 450w"}
                  sizes="(min-width: 759px) 340px, 150px"
                  src={cdn+"/images/Platform-picture.png"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SignUpScreenTemplate;
