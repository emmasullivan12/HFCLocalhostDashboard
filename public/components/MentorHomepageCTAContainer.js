// Dex last merged this code on 17th nov 2021

import React, { Component } from "react";

import AddHighlightModalContent from "./AddHighlightModalContent";
import AutoEnrollPrompt from "./AutoEnrollPrompt";
import GroupCircle from "./GroupCircle";
import JoinProgPrompt from "./JoinProgPrompt";
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';
import MentorFullSignUp from './MentorFullSignUp.js';
import MentorMatches from './MentorMatches';
import MentorU18Picture from './MentorU18Picture.js';
import MentorU18Doc from './MentorU18Doc.js';
import MentorTraining from './MentorTraining.js';
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
  ariaLabel: 'Add a Highlight',
  triggerText: 'Highlight',
  usedFor: 'addHighlight',
  changeInitFocus: true,
  wider: true
}

const AddHighlightSmlModalProps = {
  ariaLabel: 'Add a Highlight',
  triggerText: '+ Highlight',
  usedFor: 'addHighlightSml',
  changeInitFocus: true,
  wider: true
}

class MentorHomepageCTAContainer extends Component {
  render() {
    const step = 'fullSUTrain'; // THIS IS THE SAME AS STEP IN APP.JS 'didShortSU', 'autoEnroll','joinedProg', 'didFullSUtf', 'didTrain'
    const hasInvite = false;
    const groups = [];
    const source = 'vhs'

    this.props.groups.forEach((group) => {

      const generalChannel = group.channels
        .filter(channel => channel.type == 'general')

      groups.push(
        <GroupCircle
          showAsLink
          group={group}
          key={group.gid}
          navlink={`/community/${group.gid}/${generalChannel.chlid}`}
        />
      );
    });

    return (
      // <div className={className}>
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
        {(step === 'didEduEmailVerif' || step === 'didReviewVerif') && (
          <JoinProgPrompt userRole='mentor' /> // to do
        )}
        {step === 'autoEnroll' && (
          <AutoEnrollPrompt userRole='mentor' source={source}/>
        )}
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
        {(step === 'fullSUTrain' || step === 'fullSUidTrain') && (
          <MentorMatches /> // to do
        )}
        <Modal {...AddHighlightModalProps}>
          <AddHighlightModalContent modalID="modal-addHighlight"/>
        </Modal>
        <Modal {...AddHighlightSmlModalProps}>
          <AddHighlightModalContent modalID="modal-addHighlightSml"/>
        </Modal>
      </div>
    );
  }
}

export default MentorHomepageCTAContainer;
