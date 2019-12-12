// Dex last merged this code on 12th Dec 2019 

import React, { Component } from 'react';

import MentorHomepageCTAContainer from './MentorHomepageCTAContainer.js';
import PageHeader from './PageHeader.js';
import "../css/HomePage.css";
import "../css/General.css";

const DUMMY_GROUP_LIST = [
  {groupID: '10001', name: 'AVFX', status: 'active'},
  {groupID: '10002', name: 'EY', status: 'active'},
  {groupID: '10004', name: 'Pladis', status: 'active'},
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
