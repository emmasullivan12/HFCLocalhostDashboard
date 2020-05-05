// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";

import AcceptMenteeContent from './AcceptMenteeContent.js';
import Modal from './Modal.js';
import PassMenteeContent from './PassMenteeContent.js';

import "../css/General.css";

const AcceptMenteeModalProps = {
  ariaLabel: 'Popup to accept chat with matched Mentee',
  triggerText: 'Accept Mentee',
  usedFor: 'msgExtras-accept',
  changeInitFocus: true
}

const PassMenteeModalProps = {
  ariaLabel: 'Pass on Mentee',
  triggerText: 'Pass',
  usedFor: 'msgExtras-pass'
}

class AcceptCTA extends Component {
  constructor () {
    super();
    this.state = {
      CTAcompleted: false,
      accepted: false
    }
  }

  render() {
    const {CTAcompleted, accepted} = this.state;
    switch (CTAcompleted) {
      case true:
        return (
          <div className="msg-extras-btns">
            {accepted ? (
              <div className="greenText">&#10004; You Accepted</div>
            ) : (
              <div className="redText">&#10008; You Passed</div>
            )}
          </div>
        );
      case false:
        return (
          <div className="msg-extras-btns">
            <Modal {...AcceptMenteeModalProps}>
              <AcceptMenteeContent />
            </Modal>
            <Modal {...PassMenteeModalProps}>
              <PassMenteeContent />
            </Modal>
          </div>
        );
    }
  }
}

export default AcceptCTA;
