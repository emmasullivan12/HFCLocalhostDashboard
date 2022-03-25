// Dex last merged this code on 7th mar 2022

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
    const {userRole, hasNoContentYet, noResultsFound} = this.props

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic askAQ" />
          <h2 className="landingCTATitle">
            {userRole == "mentee" && hasNoContentYet == true && (
              <div>You haven&#39;t asked anything yet. </div>
            )}
            {userRole == "mentee" && noResultsFound == true && (
              <div>No results found. </div>
            )}
            {userRole == "mentor" && hasNoContentYet == true && (
              <div>You haven&#39;t created any content yet. </div>
            )}
            {userRole == "mentor" && noResultsFound == true && (
              <div>No results found. </div>
            )}
          </h2>
          <p className="landingCTADesc">
            {userRole == "mentee" && (
              <div>Get your burning questions answered by real employees</div>
            )}
            {userRole == "mentor" && (
              <div>Share a general highlight or answer mentees Q&A</div>
            )}
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
