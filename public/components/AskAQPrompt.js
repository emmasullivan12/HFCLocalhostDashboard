// Dex last merged this code on 8th feb 2022

import React, { Component } from "react";

import AddHighlightModalContent from "./AddHighlightModalContent";
import AddHighlightTextBox from './AddHighlightTextBox.js';
import Modal from './Modal';

const AddHighlightModalProps = {
  ariaLabel: 'Post a Question',
  triggerText: 'Post Question',
  usedFor: 'askQuestionDashboard',
  changeInitFocus: true,
  wider: true
}

const AddHighlightMentorModalProps = {
  ariaLabel: 'Add a Highlight',
  triggerText: 'Highlight',
  usedFor: 'addHighlightDashboard',
  changeInitFocus: true,
  wider: true
}

class AskAQPrompt extends Component {
  render() {
    const {userRole, hasNoContentYet} = this.props

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic askAQ" />
          <h2 className="landingCTATitle">
            {userRole == 'mentee' ? ((hasNoContentYet == true ? "You haven't asked anything yet. " : "") + 'Get your burning questions answered by real employees') : (hasNoContentYet == true ? "You haven't created any content yet." : "Share a highlight or answer mentees Q&A")}
          </h2>
          <p className="landingCTADesc">
            {(userRole == 'mentor' && hasNoContentYet == true) ? 'Share a highlight or answer mentees Q&A' : 'Click below to get started'}
          </p>
          {userRole == 'mentee' && (
            <Modal {...AddHighlightModalProps}>
              <AddHighlightTextBox modalID="modal-askQuestionDashboard" isMenteeQ />
            </Modal>
          )}
          {userRole == 'mentor' && (
            <Modal {...AddHighlightMentorModalProps}>
              <AddHighlightModalContent modalID="modal-addHighlightDashboard" userRole={userRole}/>
            </Modal>
          )}
        </div>
      </section>
    );
  }
}

export default AskAQPrompt;
