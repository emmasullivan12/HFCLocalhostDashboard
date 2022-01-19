// Dex last merged this code on 10th jan 2022

import React, { Component } from "react";

import AddHighlightTextBox from './AddHighlightTextBox.js';
import Modal from './Modal';

const AddHighlightModalProps = {
  ariaLabel: 'Post a Question',
  triggerText: 'Post Question',
  usedFor: 'askQuestionDashboard',
  changeInitFocus: true,
  wider: true
}

class AskAQPrompt extends Component {
  render() {

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic askAQ" />
          <h2 className="landingCTATitle">
            Get your burning questions answered by real employees
          </h2>
          <p className="landingCTADesc">
            Click below to get started
          </p>
          <Modal {...AddHighlightModalProps}>
            <AddHighlightTextBox modalID="modal-askQuestionDashboard" isMenteeQ />
          </Modal>
        </div>
      </section>
    );
  }
}

export default AskAQPrompt;
