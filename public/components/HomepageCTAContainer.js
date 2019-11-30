// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";

import AutoEnrollPrompt from "./AutoEnrollPrompt";
import GroupCircle from "./GroupCircle";
import JoinProgPrompt from "./JoinProgPrompt";
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';
import MentorMatches from './MentorMatches';
import MenteeFullSignUp from './MenteeFullSignUp.js';
import MenteeTraining from './MenteeTraining.js';
import Modal from './Modal';

import "../css/General.css";
import "../css/HomepageCTAContainer.css";

const JoinProgrammePlusModalProps = {
  ariaLabel: 'Join a live Programme',
  triggerText: 'Join a Programme',
  usedFor: 'joinProgSmlHome',
}

class HomepageCTAContainer extends Component {
  render() {
    const step = 'fullSUTrain'; // THIS IS THE SAME AS STEP IN APP.JS 'didShortSU', 'autoEnroll','joinedProg', 'didFullSUtf', 'didTrain'
    const hasInvite = true;
    const is18plus = 1;
    const matchstatus = 'isMatched';
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
        {step === 'didEduEmailVerif' || step === 'didReviewVerif' && (
          <JoinProgPrompt userRole='mentee'/>
        )}
        {step === 'autoEnroll' && (
          <AutoEnrollPrompt />
        )}
        {step === 'joinedProg' && (
          <MenteeFullSignUp />
        )}
        {is18plus != 1 && step === 'didFullSUtf' && (
          <MenteeTraining />
        )}
        {is18plus === 1 && step === 'didFullSUtf' && (
          <MentorMatches />
        )}
        {step === 'didSafeG' && (
          <MentorMatches />
        )}
        {(is18plus != 1 && step === 'didSafeG') || (is18plus === 1 && step === 'didFullSUtf') && hasInvite === true (
          <AutoEnrollPrompt />
        )}
      </div>
    );
  }
}

export default HomepageCTAContainer;
