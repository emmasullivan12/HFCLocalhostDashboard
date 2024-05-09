// Last merged this code on 28th mar 2024
/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";

import MenuNav from './MenuNav.js';
import {LoadingSpinner, checkMobile, isiOS, X} from './GeneralFunctions.js';


class FeedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuBtn: false,
    }
  }

  componentDidMount() {
    this.timerHandle = setTimeout(() => {
      this.showMenuBtn()
      this.timerHandle = 0;
    }, 2000);
  }

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  showMenuBtn = () => {
    this.setState({
      showMenuBtn: true
    })
  }

  render() {
    //const {text} = this.state;
    const {isLoggedIn, browser, lessonAccessStatus, isHomePage} = this.props;
    const {showMenuBtn} = this.state;
    const isMobile = checkMobile()
    const isIphone = isiOS()
    const isFirefox = browser == 'firefox'
    let buttonText, buttonHref

    switch(lessonAccessStatus) {
      case 'N-needsPremiumAccess':
        buttonText = 'Get Premium Access'
        buttonHref = 'www.stripe.com'
        break;
      case 'N-hasNotBoughtCourse':
        buttonText = 'Buy Course'
        buttonHref = 'www.stripe.com'
        break;
      case 'N-notLoggedInAndNotOpenLesson':
        buttonText = 'Buy Course'
        buttonHref = 'www.stripe.com'
        break;
      default:
        buttonText = 'Browse Courses'
        buttonHref = 'https://learning.theswiftexit.com/home'
    }

    return (
      <React.Fragment>
        <div className="tseBannerSmallLogoContainer marginTop20 horizontallyCenter marginBottom0">
          <a href="https://www.theswiftexit.com" target="_blank" rel="noopener" className="link">
            <img
              className="prLogoImg"
              alt="TheSwiftExit Logo"
              src="https://theswiftexit.com/wp-content/uploads/2017/02/Logo_ppt_header_accurate_small.png"
            />
          </a>
          {showMenuBtn == true && (
            <MenuNav />
          )}
          {showMenuBtn != true && isMobile == true && (
            <LoadingSpinner />
          )}
        </div>
        <div className={"feed-header" + (isIphone == true ? " isIphone" : "")} id="feedHeader">
          {(!isLoggedIn || (lessonAccessStatus != "Y" && !isHomePage)) && (
            <div className="signUpPrompt-header">
              {!isLoggedIn && (
                <a className="link fontSize16 black" href="https://learning.theswiftexit.com/login?origin=feedTopBtn"><strong>Login</strong></a>
              )}
              {!isHomePage && (
                <a className={"button link Submit-btn signUpPrompt" + (isFirefox == true ? " dispRubyBase" : "")} href={buttonHref}>
                  {buttonText}
                </a>
              )}
            </div>
          )}
        </div>
        {(!isLoggedIn || (lessonAccessStatus != "Y" && !isHomePage)) && (
          <div className="signUpPrompt-headerBanner marginTop10">
            {!isLoggedIn && (
              <a className="link fontSize16 black" href="https://learning.theswiftexit.com/login?origin=feedTopBtn"><strong>Login</strong></a>
            )}
            {!isHomePage && (
              <a className="button link Submit-btn signUpPrompt" href={buttonHref}>
                {buttonText}
              </a>
            )}
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default FeedHeader;
