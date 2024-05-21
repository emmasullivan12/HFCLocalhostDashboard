// Last merged this code on 21st may 2024

import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";
import Checkbox from './Checkbox.js';
import {LoadingSpinner} from './GeneralFunctions.js';

import "../css/AddHighlight.css";

class BuyCoProfileModalContent extends Component {
  constructor() {
    super();
    this.state = {
      hasClicked: '',
      linkToRedirectTo: '',
      isAuthorised: false,
      profileTypeClicked: '',
      showContactSalesPrompt: '',
      isRedirecting: false,
    }
  }

  handleClick = (e, link) => {
    const profileType = e.currentTarget.name
    this.setState({
      hasClicked: true,
      linkToRedirectTo: link,
      showContactSalesPrompt: false,
      profileTypeClicked: profileType
    })
  }

  toggleIsAuthorisedCheckbox = (userInput) => {
    const currentState = this.state.isAuthorised;
    this.setState({
      isAuthorised: !currentState,
    });
  }

  handleSubmit = () => {
    const {formToShow} = this.props
    const {linkToRedirectTo, isAuthorised, profileTypeClicked} = this.state

    if (!isAuthorised) {
      return
    }

    if (profileTypeClicked == 'std') { // is free option, send staight to Form.js
      formToShow('Free') // launch Form.js
    } else if (profileTypeClicked == 'superPrem') {
      this.setState({
        showContactSalesPrompt: true
      })
    } else {
      this.setState({ isRedirecting: true });
      window.location.href = linkToRedirectTo
    }
  }

  canBeSubmitted() {
    const {isAuthorised} = this.state;
    return (
      isAuthorised == true
    );
  }

  render() {
    const {hasClicked, showContactSalesPrompt, isRedirecting} = this.state
    const {modalTitle, modalSubTitle, stdCourseLink, premCourseLink, superPremCourseLink, showStd, showPrem, showSuperPrem, stdDesc, premDesc, superPremDesc, stdPrice, premPrice, superPremPrice, showBottomTxt} = this.props
    const cardCount = (showStd ? 1 : 0) + (showPrem ? 1 : 0) + (showSuperPrem ? 1 : 0)
    const isEnabled = this.canBeSubmitted();

    return (
      <div className="selectPostTypeContainer">
        {showContactSalesPrompt == '' && (
          <React.Fragment>
            <div className="modal-title">
              {modalTitle}
            </div>
            <div className="modal-subtitleSml fontSize12">
              {modalSubTitle}
            </div>
          </React.Fragment>
        )}
        {hasClicked != true && (
          <React.Fragment>
            <div className="postTypeContainer">
              {showStd && (
                <React.Fragment>
                  <button type="button" name="std" className={"postTypeButton coProfile" + (cardCount == 1 ? " marginAuto": "")} onClick={(e) => this.handleClick(e, stdCourseLink)}>
                    <div className="postTypeIcon fontSize30">
                      <i className="far fa-check-circle" />
                    </div>
                    <div className="postType-title"><strong>Free</strong></div>
                    <div className="postType-desc coProfile">{stdDesc}</div>
                    <div className="bold">{stdPrice}</div>
                  </button>
                </React.Fragment>
              )}
              {showPrem && (
                <React.Fragment>
                  <button type="button" name="prem" className={"postTypeButton coProfile" + (cardCount == 1 ? " marginAuto": "")} autoFocus onClick={(e) => this.handleClick(e, premCourseLink)}>
                    <div className="postTypeIcon fontSize30">
                      <i className="far fa-star" />
                    </div>
                    <div className="postType-title"><strong>Premium</strong></div>
                    <div className="postType-desc coProfile">{premDesc}</div>
                    <div className="bold">{premPrice}</div>
                  </button>
                </React.Fragment>
              )}
              {showSuperPrem && (
                <React.Fragment>
                  <button type="button" name="superPrem" className={"postTypeButton coProfile" + (cardCount == 1 ? " marginAuto": "")} autoFocus={!showPrem} onClick={(e) => this.handleClick(e, superPremCourseLink)}>
                    <div className="postTypeIcon fontSize30">
                      <i className="fas fa-crown" />
                    </div>
                    <div className="postType-title"><strong>Enterprise</strong></div>
                    <div className="postType-desc coProfile">{superPremDesc}</div>
                    <div className="bold">{superPremPrice}</div>
                  </button>
                </React.Fragment>
              )}
            </div>
            {showBottomTxt && (
              <div className="marginTop10 fontSize13 mediumGreyText">Your Subscription helps us reach more students in need! <span role="img" aria-label="pray emoji">🙏</span> You can upgrade later, and cancel at anytime</div>
            )}
          </React.Fragment>
        )}
        {hasClicked == true && showContactSalesPrompt != true && (
          <div className="postTypeContainer">
            <div>
              <Checkbox
                labelId="isAuthorised"
                labelClassName="checkbox-container textLeft formatLeft"
                label="I confirm I represent *HR/Personnel, Recruiting, Marketing, PR* or am an *executive* at my company and I agree to Prospela&#39;s Terms and Safeguarding (https://prospela.com/terms-of-use-safeguarding-policy/) and acknowledge its Privacy Policy (https://prospela.com/privacy-policy/) on behalf of my company."
                id="isAuthorisedCheckbox"
                name="isauthorised"
                value="1"
                onChange={this.toggleIsAuthorisedCheckbox}
                spanClassName="checkmark left"
                required
              />
            </div>
            {isRedirecting == true && (
              <LoadingSpinner />
            )}
            {isRedirecting != true && (
              <button className="Submit-btn marginAuto" type="button" disabled={isRedirecting == true ? true : !isEnabled} onClick={this.handleSubmit}>Get Started</button>
            )}
          </div>
        )}
        {hasClicked == true && showContactSalesPrompt == true && (
          <div className="postTypeContainer marginAuto">
            <div>Please contact our friendly Sales team by emailing <strong className="electricPurpleText">talktous@prospela.com</strong></div>
          </div>
        )}
      </div>
    );
  }
}

export default BuyCoProfileModalContent;
