// Dex last merged this code on 16th May 2019

import React, { Component } from "react";

import HomepageCTAContainer from './HomepageCTAContainer.js';

const DUMMY_GROUP_LIST = [
  {groupID: '10000', name: 'Villiers', status: 'active'},
  {groupID: '10001', name: 'AVFX', status: 'active'},
  {groupID: '10002', name: 'EY', status: 'active'},
  {groupID: '10003', name: 'GE', status: 'active'},
  {groupID: '10004', name: 'Pladis', status: 'active'},
];

// Will prompt user to complete full sign up (if not completed), otherwise  shows MentorMatch status (i.e. waiting or matches made)
class LatestAdvice extends Component {
  render() {

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
          <HomepageCTAContainer groups={DUMMY_GROUP_LIST}/>
        </div>
      </React.Fragment>
    )
  }
}

export default LatestAdvice;
