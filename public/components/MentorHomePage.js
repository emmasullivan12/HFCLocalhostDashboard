// Dex last merged this code on 13th Oct 2020

import React, { Component } from 'react';

import MentorHomepageCTAContainer from './MentorHomepageCTAContainer.js';
import PageHeader from './PageHeader.js';
import "../css/HomePage.css";
import "../css/General.css";

const DUMMY_GROUP_LIST = [
  {gid: '20001', groupname: 'AVFX', status: 'active'},
  {gid: '20002', groupname: 'EY', status: 'active'},
  {gid: '20004', groupname: 'Pladis', status: 'active'},
];

const PageHeaderProps = {
  ariaLabel: 'Page Header',
  title: 'Dashboard',
  subHeader: 'Visualise your impact and explore the latest from your Prospela network'
}

class MentorHomePage extends Component {
  render(){
    return (
      <React.Fragment>
        <PageHeader {...PageHeaderProps} />
        <div className="page-panel">
          <MentorHomepageCTAContainer groups={DUMMY_GROUP_LIST}/>
        </div>
      </React.Fragment>
    );
  }
}

export default MentorHomePage;
