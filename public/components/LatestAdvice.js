// Dex last merged this code on 13th oct 2020

import React, { Component } from "react";

import HomepageCTAContainer from './HomepageCTAContainer.js';
import PageHeader from './PageHeader.js';
import "../css/HomePage.css";

const DUMMY_GROUP_LIST = [
  {gid: '20000', groupname: 'Villiers', status: 'active'},
  {gid: '20001', groupname: 'AVFX', status: 'active'},
  {gid: '20002', groupname: 'EY', status: 'active'},
  {gid: '20003', groupname: 'GE', status: 'active'},
  {gid: '20004', groupname: 'Pladis', status: 'active'},
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
