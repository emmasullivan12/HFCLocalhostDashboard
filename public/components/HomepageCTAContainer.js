// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";

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
    const fullsustep = 'joinedProg'; // 'shortSUonly', 'joinedProg', 'fullSUtf', 'fullSUTrain'
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
        {fullsustep === 'shortSUonly' && (
          <JoinProgPrompt />
        )}
        {fullsustep === 'joinedProg' && (
          <MenteeFullSignUp />
        )}
        {fullsustep === 'fullSUtf' && (
          <MenteeTraining />
        )}
        {fullsustep === 'fullSUTrain' && (
          <MentorMatches />
        )}


        <div className="choose-match-title-container">
          <div className="exclamation-icon-container">
            <i className="fas fa-exclamation-circle" />
          </div>
          <div className="choose-match-title">
            Choose your real employee match
          </div>
          <div className="choose-match-detail">
            Build your network & get personalised insider insights for 3 months (& beyond!)
          </div>
        </div>
        <div className="cards-container">
            blahhh
        </div>
      </div>
    );
  }
}

export default HomepageCTAContainer;
