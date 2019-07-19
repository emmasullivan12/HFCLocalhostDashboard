// Dex last merged this code on 16th May 2019

import React, { Component } from "react";

import ChatEndFeedbkContent from './ChatEndFeedbkContent.js';
import Modal from './Modal.js';

import "../css/General.css";

const ChatEndFeedbkModalProps = {
  ariaLabel: 'Popup to send your feedback',
  triggerText: 'Send Feedback',
  usedFor: 'msgExtras-accept'
}

class FeedbkCTA extends Component {
  constructor () {
    super();
    this.state = {
      feedbkSent: false
    }
  }

  render() {
    const {feedbkSent} = this.state;
    switch (feedbkSent) {
      case true:
        return (
          <div className="msg-extras-btns">
            <div className="greenText">&#10004; Feedback Sent</div>
          </div>
        );
      case false:
        return (
          <div className="msg-extras-btns">
            <Modal {...ChatEndFeedbkModalProps}>
              <ChatEndFeedbkContent />
            </Modal>
          </div>
        );
    }
  }
}

export default FeedbkCTA;
