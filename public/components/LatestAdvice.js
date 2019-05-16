// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import MentorMatches from './MentorMatches';
import TypeformFullSignUp from './TypeformFullSignUp.js';

// Depending on whether user has completed Full Sign Up, will display option to complete full sign up or Mentor Matches
const didFullSignUp = true;

// Will prompt user to complete full sign up (if not completed), otherwise  shows MentorMatch status (i.e. waiting or matches made)
class LatestAdvice extends Component {
  render() {
    if(this.props.didFullSignUp === false) {
      return (
        <div>
          <p>Complete Full Sign up</p>
          <TypeformFullSignUp userRole="mentor"/>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <MentorMatches />
          <TypeformFullSignUp userRole="mentor"/>
        </React.Fragment>
      );
    }
  }
}

export default LatestAdvice;
