// Dex last merged this code on 9th Sept 2020

import React, { Component } from "react";

import AutoEnrollPrompt from "./AutoEnrollPrompt";
import GroupCircle from "./GroupCircle";
import JoinProgPrompt from "./JoinProgPrompt";
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';
import MentorFullSignUp from './MentorFullSignUp.js';
import MentorU18Picture from './MentorU18Picture.js';
import MentorU18Doc from './MentorU18Doc.js';
import MentorTraining from './MentorTraining.js';
import Modal from './Modal';

import "../css/General.css";
import "../css/HomepageCTAContainer.css";

const JoinProgrammePlusModalProps = {
  ariaLabel: 'Join a live Programme',
  triggerText: 'Join a Programme',
  usedFor: 'joinProgSmlHome',
  changeInitFocus: true
}

class MentorHomepageCTAContainer extends Component {
  render() {
    const step = 'didShortSUtf'; // THIS IS THE SAME AS STEP IN APP.JS 'didShortSU', 'autoEnroll','joinedProg', 'didFullSUtf', 'didTrain'
    const hasInvite = true;
    const groups = [];

    this.props.groups.forEach((group) => {
      groups.push(
        <GroupCircle
          group={group}
          key={group.groupID}
          navlink={`/community/${group.name}`}
        />
      );
    });

    return (
      // <div className={className}>
      <div className="landingCTA-container">
        <div className="membershipsContainer">
          <div className="memberships-title">My Memberships</div>
          <div className="groupsContainer">
            {groups}
            <Modal {...JoinProgrammePlusModalProps}>
              <JoinProgrammeModalContent />
            </Modal>
          </div>
        </div>
        {step === 'didShortSUtf' && (
          <MentorFullSignUp />
        )}
        {step === 'didU18tf' && (
          <MentorU18Picture />
        )}
        {step === 'didIDUpload' && (
          <MentorU18Doc />
        )}
        {step === 'didFullSUtf' && (
          <MentorTraining /> // If completed this but didnt want to do U18 then update to 'fullSUTrain', otherwise 'fullSUidTrain'
        )}
        {(step === 'fullSUTrain' || step === 'fullSUidTrain') && hasInvite===true && (
          <AutoEnrollPrompt /> // to do
        )}
        {(step === 'fullSUTrain' || step === 'fullSUidTrain') && hasInvite===false && (
          <JoinProgPrompt userRole='mentor' /> // to do
        )}
      </div>
    );
  }
}

export default MentorHomepageCTAContainer;
