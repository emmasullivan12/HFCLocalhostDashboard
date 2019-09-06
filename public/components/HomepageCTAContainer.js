// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";
import { MentorCardWaiting, MentorCardMatches } from "./MentorCard";
import GroupCircle from "./GroupCircle";

class HomepageCTAContainer extends Component {
  render() {
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
      <div className="mentor-matches-container">
        <div className="membershipsContainer">
          <div>My Memberships</div>
          <div className="groupsContainer">
            {groups}
            <button type="button" className="groupBtn">
              <i className="fas fa-plus" />
            </button>
          </div>
        </div>
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
