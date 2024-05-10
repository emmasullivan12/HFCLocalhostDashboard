// Last merged this code on 5th apr 2024

import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

import "../css/AddHighlight.css";

class BuyCoProfileModalContent extends Component {

  handleClick = (link) => {
    this.props.onClose()
    window.location.href = link
  }

  render() {
    const {modalTitle, modalSubTitle, stdCourseLink, premCourseLink, superPremCourseLink, showStd, showPrem, showSuperPrem, stdDesc, premDesc, superPremDesc, stdPrice, premPrice, superPremPrice, showBottomTxt} = this.props
    const cardCount = (showStd ? 1 : 0) + (showPrem ? 1 : 0) + (showSuperPrem ? 1 : 0)
    return (
      <div className="selectPostTypeContainer">
        <div className="modal-title">
          {modalTitle}
        </div>
        <div className="modal-subtitleSml fontSize12">
          {modalSubTitle}
        </div>
        <div className="postTypeContainer">
          {showStd && (
            <React.Fragment>
              <button type="button" className={"postTypeButton coProfile" + (cardCount == 1 ? " marginAuto": "")} onClick={() => this.handleClick(stdCourseLink)}>
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
              <button type="button" className={"postTypeButton coProfile" + (cardCount == 1 ? " marginAuto": "")} autoFocus onClick={() => this.handleClick(premCourseLink)}>
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
              <button type="button" className={"postTypeButton coProfile" + (cardCount == 1 ? " marginAuto": "")} autoFocus={!showPrem} onClick={() => this.handleClick(superPremCourseLink)}>
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
          <div className="marginTop10 fontSize13 mediumGreyText">You can upgrade later, and cancel at anytime</div>
        )}
      </div>
    );
  }
}

export default BuyCoProfileModalContent;
