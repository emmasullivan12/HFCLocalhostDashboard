// Dex last merged this code on 10th Aug 2019

import React, { Component } from 'react';

import MentorHomepageCTAContainer from './MentorHomepageCTAContainer.js';
import MenuNav from './MenuNav.js';
import "../css/HomePage.css";
import "../css/General.css";

const DUMMY_GROUP_LIST = [
  {groupID: '10001', name: 'AVFX', status: 'active'},
  {groupID: '10002', name: 'EY', status: 'active'},
  {groupID: '10004', name: 'Pladis', status: 'active'},
];

class MentorHomePage extends Component {
  render(){
    return (
      <React.Fragment>
        <div className="page-header">
          <MenuNav />
          <div className="page-detail-container">
            <div className="page-title overflow-ellipsis">
              Dashboard
            </div>
            <div className="page-detail overflow-ellipsis">
              Visualise your impact and explore the latest from your Prospela network
            </div>
          </div>
        </div>
        <div className="page-panel">
          <MentorHomepageCTAContainer groups={DUMMY_GROUP_LIST}/>
        </div>
      </React.Fragment>
    );
  }
}

export default MentorHomePage;
