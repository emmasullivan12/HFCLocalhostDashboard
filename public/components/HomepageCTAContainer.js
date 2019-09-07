// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";

import MentorMatches from './MentorMatches';
import TypeformFullSignUp from './TypeformFullSignUp.js';
import GroupCircle from "./GroupCircle";

import "../css/General.css";
import "../css/HomepageCTAContainer.css";

class HomepageCTAContainer extends Component {
  render() {
    const fullsustep = 'shortSUonly'; // 'shortSUonly', 'joinedProg', 'fullSUtf', 'fullSUTrain'
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
            <button type="button" className="groupBtn">
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
        {fullsustep === 'shortSUonly' && (
          <section>
            <div className="landingCTABtnContainer">
              <button type="button" className="Submit-btn landingCTA hollow">
                Invite a teacher
              </button>
              <button type="button" className="Submit-btn landingCTA">
                Join a live Programme +
              </button>
            </div>
            <div className="contentBox">
              box goes here
            </div>
          </section>
        )}
        {fullsustep === 'joinedProg' && (
          <TypeformFullSignUp />
        )}
        {fullsustep === 'fullSUtf' && (
          'Training CTA goes here'
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
