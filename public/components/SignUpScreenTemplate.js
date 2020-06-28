// Dex last merged this code on 27th June 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";
import cdn from './CDN.js';
import "../css/SignUpScreenTemplate.css";

// Typeform Sign Up pages template for use with both mentors / student
class SignUpScreenTemplate extends React.Component {

  render() {
    const {children, subheader, title, fullWidth} = this.props;

    //Converts any HTML tags that were passed as string to HTMl tags
    /*var parsedSubheader = new DOMParser().parseFromString(subheader, "text/xml");*/
    return (
      <div className="mainContainer">
        <div className="prLogoArea signUp col-12">
          <div className="prLogoLoginContainer col-12">
            {/*<img
              className="prLogoImg"
              alt="Prospela Logo"
              srcSet={cdn+"/images/Prospela-New-Logo_Colour_213.png 213w, "+cdn+"/images/Prospela-New-Logo_Colour_341.png 314w, "+cdn+"/images/Prospela-New-Logo_Colour_640.png 640w"}
              sizes="(max-width: 1440px) 69px, 69px"
              src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png"
            />*/}
            <img
              className="prLogoImg"
              alt="Prospela Logo"
              srcSet="https://prospela.com/wp-content/uploads/2020/06/Prospela-New-Logo_Colour_213.png 213w, https://prospela.com/wp-content/uploads/2020/06/Prospela-New-Logo_Colour_341.png 314w, https://prospela.com/wp-content/uploads/2020/06/Prospela-New-Logo_Colour_640.png 640w"
              sizes="(max-width: 1440px) 69px, 69px"
              src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png"
            />
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
            <div className="col-5 col-s-12 legalSection">Copyright 2019 All Rights Reserved. Made with ♥ by Prospela Group Ltd <a className="legal-href" href="https://prospela.com/privacy-policy/">Privacy</a> | <a className="legal-href" href="https://prospela.com/terms-of-use-safeguarding-policy/">Terms and Safeguarding</a></div>
          </div>
          {!fullWidth && (
            <div className="col-5 login-pic">
              <div className="login-picContainer">
              {/*<img
                  className="prPlatformImg"
                  alt="Prospela Platform Cartoon"
                  srcSet={cdn+"/images/Platform-picture_150.png 150w, "+cdn+"/images/Platform-picture_340.png 340w, "+cdn+"/images/Platform-picture_450.png 450w"}
                  sizes="(min-width: 759px) 340px, 150px"
                  src="https://prospela.com/wp-content/uploads/2019/05/Platform-picture.png"
                />*/}
                <img
                  className="prPlatformImg"
                  alt="Prospela Platform Cartoon"
                  srcSet="https://prospela.com/wp-content/uploads/2020/06/Platform-picture_150.png 150w, https://prospela.com/wp-content/uploads/2020/06/Platform-picture_340.png 340w, https://prospela.com/wp-content/uploads/2020/06/Platform-picture_450.png 450w"
                  sizes="(min-width: 759px) 340px, 150px"
                  src="https://prospela.com/wp-content/uploads/2019/05/Platform-picture.png"
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
