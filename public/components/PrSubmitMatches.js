import React, { Component } from "react";
import "../css/MentorCard.css";
import Modal from './Modal.js';
import SubmitMatchContent from './SubmitMatchContent.js';

//This includes props and title to be passed to RequestChatModal
const SubmitMatchModalProps = {
  ariaLabel: 'Popup for Prospela to submit mentor matches',
  triggerText: 'Submit new match',
  usedFor: 'SubmitMatch'
}

// This includes all content to appear below Modal's title for the RequestChatModal
const SubmitMatchModalContent = (
  <SubmitMatchContent />
)

// Content for MentorCards using props passed from database
class SubmitMatch extends Component {
  render() {
    return(
      <div className="ModalButtons">
        <Modal {...SubmitMatchModalProps}>{SubmitMatchModalContent}</Modal>
      </div>
    )
  }
}

export default SubmitMatch;
