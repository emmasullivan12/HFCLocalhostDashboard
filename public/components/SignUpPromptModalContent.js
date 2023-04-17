// Dex last merged this code on 29th mar 2023

import React, { Component } from "react";
import {cdn} from './CDN.js';

class SignUpPromptModalContent extends Component {
  render() {
    const {clickOrigin, isIphone} = this.props

    return (
      <div className="signUpPromptBanner">
        <div className={"bannerTextContainer" + (isIphone == true ? " iPhoneBannerText" : "")}>
          <div className="prBannerLogoContainer marginBottom20">
            <img
              className="prLogoImg"
              alt="Prospela Logo"
              srcSet={cdn+"/images/Prospela%20Logo_Dark.png 213w, "+cdn+"/images/Prospela%20Logo_Dark.png 314w, "+cdn+"/images/Prospela%20Logo_Dark.png 640w"}
              sizes="(max-width: 1440px) 69px, 69px"
              src={cdn+"/images/Prospela%20Logo_Dark.png"}
            />
          </div>
          <div className="signUpBannerTopText fontSize13">CREATE A FREE ACCOUNT FOR UNLIMITED ACCESS</div>
          <div className="signUpPromptTitle isInModal fontSize30 marginBottom20"><strong>Unlimited access to insider insights from real employees</strong></div>
          <div className="marginBottom20 dispInlineBlock">
            <a className="button link Submit-btn signUpPrompt marginBottom5 dispInlineBlock" href={"https://app.prospela.com/signup" + (clickOrigin ? ("?origin=" + clickOrigin) : '')}>
              Sign up (free)
            </a>
            <a className="dispBlock alignCenter fontSize13 electricPurpleText" href={"https://app.prospela.com/login" + (clickOrigin ? ("?origin=" + clickOrigin) : '')}>or Login</a>
          </div>
          <div className="signUpBannerExtraText fontSize13">Career Q&A with industry experts, 1:1 mentoring & a lasting professional network at your fingertips</div>
        </div>
      </div>
    );
  }
}

export default SignUpPromptModalContent;
