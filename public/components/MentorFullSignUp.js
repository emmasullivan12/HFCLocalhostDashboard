// Dex last merged this code on 21st Aug 2020

import React, { Component } from "react";
import * as typeformEmbed from '@typeform/embed';

import Modal from './Modal.js';
import MentorFullSUContent from './MentorFullSUContent.js';

const MentorFullSUModalProps = {
  ariaLabel: 'Complete Full Sign Up',
  triggerText: 'Complete Full Sign Up >>',
  usedFor: 'underOrOver18',
  changeInitFocus: true,
}

class MentorFullSignUp extends Component {
  render() {

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic completeFullSUMentor"/>
          <h2 className="landingCTATitle">
            Complete your full sign up
          </h2>
          <p className="landingCTADesc">
            We need to know a few more quick details, including whether you want to support under-18 students
          </p>
          <div>
            <Modal {...MentorFullSUModalProps}>
              <MentorFullSUContent />
            </Modal>
          </div>
        </div>
      </section>
    );
  }
}

export default MentorFullSignUp;
