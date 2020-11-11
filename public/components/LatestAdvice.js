// Dex last merged this code on 9th nov 2020

import React, { Component } from "react";

import HomepageCTAContainer from './HomepageCTAContainer.js';
import PageHeader from './PageHeader.js';
import "../css/HomePage.css";

const DUMMY_GROUP_LIST = [
  {
    gid: '20000',
    groupname: 'Villiers High School',
    status: 'active',
    groupavatarurl: '/vhs-avatar.png',
    channels: [
      {
        name: 'mentor-general',
        chlid: '12345',
        type: 'general'
      },
      {
        name: 'hello-intros',
        chlid: '12347',
        type: 'intros'
      },
      {
        name: 'resources',
        chlid: '12346',
        type: 'resources'
      }
    ]
  },
  {gid: '20001', groupname: 'Into Games', status: 'active', groupavatarurl: '/intogames-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'leaderboard', chlid: '13347', type: 'leaderboard'},{name: 'social', chlid: '22347', type: 'social'},{name: 'other', chlid: '12348', type: 'other'}]},
  {gid: '20002', groupname: 'ACCESS:VFX', status: 'active', groupavatarurl: '/avfx-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
  {gid: '20003', groupname: 'BAME in Games', status: 'active', channels: [{name: 'hello-mentors', chatid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
  {gid: '20004', groupname: 'Animated Women UK', status: 'active', groupavatarurl: '/aw-avatar.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
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
