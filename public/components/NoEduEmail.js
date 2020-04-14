// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
import "../css/General.css";

import Modal from './Modal.js';
import NoEduEmailContent from './NoEduEmailContent.js';

// This includes props and title to be passed to PassMentorModal
const noEduEmailModalProps = {
  ariaLabel: 'No student email?',
  triggerText: 'No student email?',
  usedFor: 'noEduEmailBtn'
}

// Content for MentorCards using props passed from database
class NoEduEmail extends Component {

  render() {
    const { country, eetStatus, handleNoEduEmail, currCo, currTrainingProvider } = this.props;
    return(
      <React.Fragment>
        <Modal {...noEduEmailModalProps}>
          <NoEduEmailContent
            country={country}
            eetStatus={eetStatus}
            handleNoEduEmail={handleNoEduEmail}
            currCo={currCo}
            currTrainingProvider={currTrainingProvider}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export default NoEduEmail;
