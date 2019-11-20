// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";

import HomepageCTAContainer from './HomepageCTAContainer.js';
import PageHeader from './PageHeader.js';
import "../css/HomePage.css";

const DUMMY_GROUP_LIST = [
  {groupID: '10000', name: 'Villiers', status: 'active'},
  {groupID: '10001', name: 'AVFX', status: 'active'},
  {groupID: '10002', name: 'EY', status: 'active'},
  {groupID: '10003', name: 'GE', status: 'active'},
  {groupID: '10004', name: 'Pladis', status: 'active'},
];

const PageHeaderProps = {
  ariaLabel: 'Page Header',
  title: 'Latest Advice',
  subHeader: 'Explore the latest from your Prospela network, based on your skills & interests'
}

// Will prompt user to complete full sign up (if not completed), otherwise  shows MentorMatch status (i.e. waiting or matches made)
class LatestAdvice extends Component {
  render() {

    return (
      <div className="contentContainer">
        <PageHeader {...PageHeaderProps} />
        <div className="page-panel">
          <HomepageCTAContainer groups={DUMMY_GROUP_LIST}/>
        </div>
      </div>
    )
  }
}

export default LatestAdvice;
