// Dex last merged this code on 10th Aug 2019

import React, { Component } from 'react';
import TypeformFullSignUp from './TypeformFullSignUp';
import MentorMatches from './MentorMatches';
import "../css/MentorHomePage.css";
import "../css/General.css";

class MentorHomePage extends Component {
  render(){
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
          <TypeformFullSignUp />
        </div>
      </React.Fragment>
    );
  }
}

export default MentorHomePage;
