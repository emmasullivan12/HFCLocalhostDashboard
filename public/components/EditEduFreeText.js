// Dex last merged this code on 26th April 2020
import React, { Component } from "react";
import "../css/General.css";

import Modal from './Modal.js';
import NoSuggestionsCTAContent from './NoSuggestionsCTAContent.js';

// This includes props and title to be passed to PassMentorModal
const noSuggestionsCTAModalProps = {
  ariaLabel: 'Edit school or uni',
  triggerText: 'Edit',
  usedFor: 'eduFreeTextBtn',
  changeInitFocus: true
}

// Content for MentorCards using props passed from database
class EditEduFreeText extends Component {

  render() {
    const { country, eetStatusLocal, handleSchChange, handleUniChange, maxLength } = this.props;
    return(
      <React.Fragment>
        <Modal {...noSuggestionsCTAModalProps}>
          <NoSuggestionsCTAContent
            country={country}
            eetStatusLocal={eetStatusLocal}
            handleSchChange={handleSchChange}
            handleUniChange={handleUniChange}
            maxLength={maxLength}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export default EditEduFreeText;
