// Dex last merged this code on 10th Aug 2019

import React, { Component } from 'react';
import MenteeMatches from './MenteeMatches';
import "../css/HomePage.css";
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
          <MenteeMatches />
        </div>
      </React.Fragment>
    );
  }
}

export default MentorHomePage;
