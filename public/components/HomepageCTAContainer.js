// Dex last merged this code on 7th mar 2022 

import React, { Component } from "react";

import AddHighlightModalContent from "./AddHighlightModalContent";
import AutoEnrollPrompt from "./AutoEnrollPrompt";
import AskAQPrompt from "./AskAQPrompt";
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

const AddHighlightModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: 'Post Question',
  usedFor: 'addHighlight',
  changeInitFocus: true,
  wider: true
}

const AddHighlightSmlModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: '+ Question',
  usedFor: 'addHighlightSml',
  changeInitFocus: true,
  wider: true
}

/*  case 'didEmailVerif':
    case 'didReviewVerif':
    case 'autoEnroll':
    case 'joinedProg':
    case 'didFullSUtf':
    case 'didSafeG': // only required for under 18s */

class HomepageCTAContainer extends Component {
  render() {
    const step = 'joinedProg'; // THIS IS THE SAME AS STEP IN APP.JS 'didShortSU', 'autoEnroll','joinedProg', 'didFullSUtf', 'didTrain'
    const hasInvite = false;
    const is18plus = 1;
    const matchstatus = 'didSafeG';
    const groups = [];
    const groupsList = [
      {gid: 1234, isclass: true},
      {gid: 1235, isclass: false},
    ]
    const numClasses = groupsList.filter(group => group.isclass == true).length
    const isClass = numClasses > 0
    const qidsArr = []
//    const qidsArr = [1,2,3] // questions asked
    const source = 'vhs' // i.e. from URL ?source=villiers

    this.props.groups.forEach((group) => {

      const generalChannel = group.channels
        .filter(channel => channel.type == 'general')

      groups.push(
        <GroupCircle
          showAsLink
          group={group}
          key={group.gid}
          navlink={`/community/${group.gid}/${generalChannel[0].chlid}`}
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
        {step === 'joinedProg' && isClass == false && (
          <MenteeFullSignUp />
        )}
        {step === 'joinedProg' && isClass == true && qidsArr.length == 0 && (
          <AskAQPrompt userRole="mentee"/>
        )}
        {step === 'joinedProg' && isClass == true && qidsArr.length > 0 && (
          <MenteeFullSignUp />
        )}
        {step === 'didFullSUtf' && (
          <MenteeTraining />
        )}
    {/*    {is18plus != 1 && step === 'didFullSUtf' && (
          <MenteeTraining />
        )}
        {is18plus === 1 && step === 'didFullSUtf' && hasInvite === false && (
          <MentorMatches userRole='mentee'/>
        )}*/}
        {step === 'didSafeG' && hasInvite === false && (
          <MentorMatches userRole='mentee'/>
        )}
        {(is18plus != 1 && step === 'didSafeG') || (is18plus === 1 && step === 'didFullSUtf') && hasInvite === true && (
          <AutoEnrollPrompt />
        )}
        {isClass == true && (
          <React.Fragment>
            <Modal {...AddHighlightModalProps}>
              <AddHighlightModalContent modalID="modal-addHighlight" userRole='mentee'/>
            </Modal>
            <Modal {...AddHighlightSmlModalProps}>
              <AddHighlightModalContent modalID="modal-addHighlightSml" userRole='mentee'/>
            </Modal>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default HomepageCTAContainer;
