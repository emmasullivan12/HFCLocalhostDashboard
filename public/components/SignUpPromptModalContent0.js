// Last merged this code on 28th mar 2024

import React, { Component } from "react";

class SignUpPromptModalContent extends Component {
  render() {
    const {isIphone, lessonAccessStatus} = this.props
    let topText, mainText, buttonText, descText

    switch(lessonAccessStatus) {
      case 'N-needsPremiumAccess':
        topText = 'UPGRADE TO THE PREMIUM COURSE FOR UNLIMITED ACCESS'
        mainText = 'Unlimited access to our Commercial Finance / FP&A Case Study Bootcamp'
        buttonText = 'Get Premium Access'
        descText = 'Unlock key modules about financial modelling best practice, specifically for aspiring (and current) Commercial Finance & FP&A professionals'
        break;
      case 'N-lessonNotPartOfCourse':
      case 'N-hasNotBoughtCourse':
      case 'N-notLoggedInAndNotOpenLesson':
        topText = 'ENROLL NOW FOR ACCESS'
        mainText = 'Get insider insights in our Commercial Finance / FP&A Case Study Bootcamp'
        buttonText = 'Buy Course'
        descText = 'A guided walk-through of Case Study best-practices & financial modelling, including key frameworks to use, how to make commercially-sound assumptions & forecasts, and tips & tricks to stand out from the competition.'
        break;
      default:
        topText = 'ENROLL NOW FOR ACCESS'
        mainText = 'Get insider insights in our Commercial Finance / FP&A Case Study Bootcamp'
        buttonText = 'Buy Course'
        descText = 'A guided walk-through of Case Study best-practices & financial modelling, including key frameworks to use, how to make commercially-sound assumptions & forecasts, and tips & tricks to stand out from the competition.'
    }

    return (
      <div className="signUpPromptBanner tse">
        <div className={"bannerTextContainer" + (isIphone == true ? " iPhoneBannerText" : "")}>
          <div className="tseBannerSmallLogoContainer marginBottom20">
            <img
              className="prLogoImg"
              alt="TheSwiftExit Logo"
              src="https://theswiftexit.com/wp-content/uploads/2017/02/Logo_ppt_header_accurate_small.png"
            />
          </div>
          <div className="signUpBannerTopText fontSize13">{topText}</div>
          <div className="signUpPromptTitle isInModal fontSize30 marginBottom20"><strong>{mainText}</strong></div>
          <div className="marginBottom20 dispInlineBlock">
            <a className="button link Submit-btn signUpPrompt marginBottom5 dispInlineBlock" href="www.stripe.com">
              {buttonText}
            </a>
            <a className="dispBlock alignCenter fontSize13 electricPurpleText" href="https://learning.theswiftexit.com/login">or Login</a>
          </div>
          <div className="signUpBannerExtraText fontSize13">{descText}</div>
        </div>
      </div>
    );
  }
}

export default SignUpPromptModalContent;
