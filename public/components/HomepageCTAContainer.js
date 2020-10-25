// Dex last merged this code on 19th oct 2020

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
  ariaLabel: 'Join a live Group',
  triggerText: 'Join a Group',
  usedFor: 'joinProgSmlHome',
  changeInitFocus: true
}

/*  case 'didEmailVerif':
    case 'didReviewVerif':
    case 'autoEnroll':
    case 'joinedProg':
    case 'didFullSUtf':
    case 'didSafeG': // only required for under 18s */

class HomepageCTAContainer extends Component {
  render() {
    const step = 'didSafeG'; // THIS IS THE SAME AS STEP IN APP.JS 'didShortSU', 'autoEnroll','joinedProg', 'didFullSUtf', 'didTrain'
    const hasInvite = false;
    const is18plus = 1;
    const matchstatus = 'didSafeG';
    const groups = [];
    const source = 'vhs' // i.e. from URL ?source=villiers

    this.props.groups.forEach((group) => {
      groups.push(
        <GroupCircle
          group={group}
          key={group.gid}
    //      navlink={`/community/${group.groupname}`}
        />
      );
    });

    return (
      <div className="landingCTA-container">
        <div className="membershipsContainer">
          <div className="memberships-title">My Groups</div>
          <div className="groupsContainer">
            {groups}
            <Modal {...JoinProgrammePlusModalProps}>
              <JoinProgrammeModalContent />
            </Modal>
          </div>
        </div>
        {(step === 'didEmailVerif' || step === 'didReviewVerif') && (
          <JoinProgPrompt userRole='mentee'/>
        )}
        {step === 'autoEnroll' && (
          <AutoEnrollPrompt source={source}/>
        )}
        {step === 'joinedProg' && (
          <MenteeFullSignUp />
        )}
        {step === 'didFullSUtf' && (
          <MenteeTraining />
        )}
    {/*    {is18plus != 1 && step === 'didFullSUtf' && (
          <MenteeTraining />
        )}
        {is18plus === 1 && step === 'didFullSUtf' && hasInvite === false && (
          <MentorMatches />
        )}*/}
        {step === 'didSafeG' && hasInvite === false && (
          <MentorMatches />
        )}
        {(is18plus != 1 && step === 'didSafeG') || (is18plus === 1 && step === 'didFullSUtf') && hasInvite === true && (
          <AutoEnrollPrompt />
        )}
      </div>
    );
  }
}

export default HomepageCTAContainer;
