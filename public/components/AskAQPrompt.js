// Dex last merged this code on 22nd mar 2023

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
    const {userRole, hasNoContentYet, noResultsFound, updatePathName, isLoggedIn, checkHasAccess, noAccessHandler} = this.props

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic askAQ" />
          <h2 className="landingCTATitle">
            {userRole == "mentee" && hasNoContentYet == true && (
              <div>You haven&#39;t asked anything yet. </div>
            )}
            {(!isLoggedIn || (userRole == "mentee" && noResultsFound == true)) && (
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
            {(!isLoggedIn || userRole == "mentee") && (
              <span>Get your burning questions answered by real employees</span>
            )}
            {userRole == "mentor" && (
              <span>Share a general highlight or answer mentees Q&A</span>
            )}
          </p>
          {userRole == 'mentee' && (
            <Modal {...AddHighlightModalProps}>
              <AddHighlightTextBox modalID="modal-askQuestionDashboard" isMenteeQ />
            </Modal>
          )}
          {userRole == 'mentor' && (
            <Modal {...AddHighlightMentorModalProps}>
              <AddHighlightModalContent modalID="modal-addHighlightDashboard" userRole={userRole} updatePathName={updatePathName}/>
            </Modal>
          )}
          {!isLoggedIn && (
            <Modal {...AddHighlightModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
              <AddHighlightTextBox modalID="modal-askQuestionDashboard" isMenteeQ />
            </Modal>
          )}
        </div>
      </section>
    );
  }
}

export default AskAQPrompt;
