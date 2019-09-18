// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";
import Modal from './Modal.js';
import AutoEnrollProgModalContent from './AutoEnrollProgModalContent.js';

import "../css/General.css";

const AutoEnrollModalProps = {
  ariaLabel: 'Join programme from invite',
  triggerText: 'Join',
  usedFor: 'joinProgAuto',
}

class AutoEnrollPrompt extends Component {
  render() {
    const autoEnrollProgName = 'Villiers';
    const nonPartnerSch = true; /// check school email (or prog code if signed up with personal email) for school partnership
    return (
      <section>
        <div className="landingCTABtnContainer">
          {nonPartnerSch && (
            <button type="button" className="Submit-btn landingCTA hollow">
              Invite a teacher
            </button>
          )}
        </div>
        <div className="contentBox landingCTA">
          <div className="placeholderPic mentorMatches"/>
          <h2 className="landingCTATitle">
            You&#39;ve been invited to join the {autoEnrollProgName} programme
          </h2>
          <p className="landingCTADesc">
            Click below to get access
          </p>
          <Modal {...AutoEnrollModalProps}>
            <AutoEnrollProgModalContent autoEnrollProgName={autoEnrollProgName}/>
          </Modal>
        </div>
      </section>
    );
  }
}

export default AutoEnrollPrompt;
