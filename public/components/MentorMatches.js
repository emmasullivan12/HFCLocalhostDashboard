import React, { Component } from "react";
import { MentorCardWaiting, MentorCardMatches } from "./MentorCard";

const matchedToMentor = true;

// If Prospela has matched user with 3 mentors, mentor profile cards will be displayed, otherwise a placeholder.
class MentorMatches extends Component {
  render() {
    if(this.props.matchedToMentor === false) {
      return (
        <div className="waitingForMatches-container">
          <p className="waitingForMatches-title">We&#39;ll message you when you&#39;re matched!</p>
          <MentorCardWaiting />
          <MentorCardWaiting />
          <MentorCardWaiting />
        </div>
      );
    } else {
      return (
        <div>
          <h3>Your Mentor Matches</h3>
          <p>Click to launch chat</p>
          <div>
            <MentorCardMatches />
          </div>
        </div>
      );
    }
  }
}

export default MentorMatches;
