// Dex last merged this code on 4th June 2020

import React, { Component } from "react";

import Modal from './Modal.js';
import ReportModalContent from './ReportModalContent.js';
import "../css/MessageActions.css";

const ReportModalProps = {
  ariaLabel: 'Report message to Prospela',
  triggerText: 'Report',
  usedFor: 'ReportMsg',
  changeInitFocus: true
}

class MessageActions extends Component {
  constructor () {
    super();
    this.state = {
      starClicked: false,
      showMoreActions: false
    }
    this.toggleStarClicked = this.toggleStarClicked.bind(this);
    this.toggleMoreActions = this.toggleMoreActions.bind(this);
    this.closeMoreActions = this.closeMoreActions.bind(this);
  }

  toggleStarClicked(e) {
    const currentState = this.state.starClicked;
    this.setState({ starClicked: !currentState });
  }

  toggleMoreActions(e) {
    this.moreActions.classList.toggle('active');
  }

  closeMoreActions(e) {
    if (this.moreActions !== null && !this.moreActions.contains(e.target)) {
      this.moreActions.classList.remove('active');
    }
  }

  render() {
    const {starClicked,showMoreActions} = this.state;
    return (
      <React.Fragment>
        <div className="msgActions-container">
          <button type="button" className="msgActions-btn tooltip" onMouseDown={this.toggleStarClicked}>
            {starClicked ? (
              <React.Fragment>
                <div className="msgAction-icon clicked" id="msgAction-star">
                  <i className="fas fa-star" />
                </div>
                <span className="tooltiptext groups">Unstar message</span>
              </React.Fragment>
              )
            : (
              <React.Fragment>
                <div className="msgAction-icon" id="msgAction-star">
                  <i className="far fa-star" />
                </div>
                <span className="tooltiptext groups">Star message</span>
              </React.Fragment>
            )}
          </button>
          <button type="button" className="msgActions-btn tooltip">
            <div className="msgAction-icon">
              <i className="fas fa-share-alt" />
            </div>
            <span className="tooltiptext last groups">Share post</span>
          </button>
          <button type="button" className="msgActions-btn tooltip moreActions" onMouseDown={this.toggleMoreActions}>
            <div className="msgAction-icon">
              <i className="fas fa-ellipsis-h" />
            </div>
            <span className="tooltiptext last groups">More actions</span>
          </button>
          <div className="moreActionsContainer" ref={el => (this.moreActions = el)} onClick={this.closeMoreActions}>
            <div className="moreActions-scrollArea">
              <ul className="moreActionsList">
                <li className="moreActionsListItem" >
                  <span className="moreActionsLabel overflow-ellipsis">
                    <Modal {...ReportModalProps} tabIndex="0">
                      <ReportModalContent />
                    </Modal>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default MessageActions;
