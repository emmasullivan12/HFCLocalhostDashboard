// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
import "../css/General.css";

import Modal from './Modal.js';
import NoSuggestionsCTAContent from './NoSuggestionsCTAContent.js';

// This includes props and title to be passed to PassMentorModal
const noSuggestionsCTAModalProps = {
  ariaLabel: 'School or Uni not on list',
  triggerText: 'School or Uni not on list?',
  usedFor: 'noSuggestionsCTABtn'
}

// Content for MentorCards using props passed from database
class EduNotOnListCTA extends Component {

  render() {
    const { country, eetStatusLocal } = this.props;
    return(
      <React.Fragment>
        <Modal {...noSuggestionsCTAModalProps}>
          <NoSuggestionsCTAContent country={country} eetStatusLocal={eetStatusLocal}/>
        </Modal>
      </React.Fragment>
    )
  }
}

export default EduNotOnListCTA;
