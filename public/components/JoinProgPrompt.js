// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";
import Modal from './Modal.js';
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';

import "../css/General.css";

const JoinProgrammeModalProps = {
  ariaLabel: 'Join a live Programme',
  triggerText: 'Join a Programme',
  usedFor: 'joinProgLrg',
}

class JoinProgPrompt extends Component {
  render() {
    const nonPartnerSch = true; /// check school email (or prog code if signed up with personal email) for school partnership
    return (
      <section>
        <div className="landingCTABtnContainer">
          {nonPartnerSch && (
            <button type="button" className="Submit-btn landingCTA hollow">
              Invite a teacher
            </button>
          )}
          <Modal {...JoinProgrammeModalProps}>
            <JoinProgrammeModalContent />
          </Modal>
        </div>
        <div className="contentBox landingCTA">
          <div className="placeholderPic mentorMatches"/>
          <h2 className="landingCTATitle">
            Join a live programme to see your mentor matches here!
          </h2>
          <p className="landingCTADesc">
            It looks like you aren&#39;t part of any live programmes yet. Get a programme code or invite link from your teacher or Prospela Partner to get access to personalised mentoring
          </p>
          <div className="neutralText alignCenter">
            Don&#39;t have a code? Click to get your school to pay ;)
          </div>
        </div>
      </section>
    );
  }
}

export default JoinProgPrompt;
