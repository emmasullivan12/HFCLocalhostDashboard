// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import MentorMatches from './MentorMatches';
import TypeformFullSignUp from './TypeformFullSignUp.js';

// Will prompt user to complete full sign up (if not completed), otherwise  shows MentorMatch status (i.e. waiting or matches made)
class LatestAdvice extends Component {
  render() {
    const fullsustep = 2;
    switch (fullsustep) {
      case 1:
        return (
          <React.Fragment>
            <div className="page-header">
              <div className="page-detail-container">
                <div className="page-title overflow-ellipsis">
                  Latest Advice
                </div>
                <div className="page-detail overflow-ellipsis">
                  Explore the latest from your Prospela network, based on your skills & interests
                </div>
              </div>
            </div>
            <div className="page-panel">
              <TypeformFullSignUp />
            </div>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <div className="page-header">
              <div className="page-detail-container">
                <div className="page-title overflow-ellipsis">
                  Latest Advice
                </div>
                <div className="page-detail overflow-ellipsis">
                  Explore the latest from your Prospela network, based on your skills & interests
                </div>
              </div>
            </div>
            <div className="page-panel">
              <MentorMatches />
            </div>
          </React.Fragment>
        );
      default:
        return <div> Loading </div>
    }
  }
}

export default LatestAdvice;
