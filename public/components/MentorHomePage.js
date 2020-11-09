// Dex last merged this code on 13th Oct 2020

import React, { Component } from 'react';

import MentorHomepageCTAContainer from './MentorHomepageCTAContainer.js';
import PageHeader from './PageHeader.js';
import "../css/HomePage.css";
import "../css/General.css";

const DUMMY_GROUP_LIST = [
  {
    gid: '20000',
    groupname: 'Villiers High School',
    status: 'active',
    groupavatarurl: '/vhs-avatar.png',
    groupavatarurl_20: '/vhs-avatar-20.png',
//    groupavatarurl_40: '/vhs-avatar-40.png',
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
  {gid: '20001', groupname: 'Into Games', status: 'active', groupavatarurl: '/intogames-avatar.png', groupavatarurl_20: '/intogames-avatar-20.png', groupavatarurl_40: '/intogames-avatar-40.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'leaderboard', chlid: '13347', type: 'leaderboard'},{name: 'social', chlid: '22347', type: 'social'},{name: 'other', chlid: '12348', type: 'other'}]},
  {gid: '20002', groupname: 'ACCESS:VFX', status: 'active', groupavatarurl: '/avfx-avatar.png', groupavatarurl_20: '/avfx-avatar-20.png', groupavatarurl_40: '/avfx-avatar-40.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
  {gid: '20003', groupname: 'BAME in Games', status: 'active', channels: [{name: 'hello-mentors', chatid: '12345',type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
  {gid: '20004', groupname: 'Animated Women UK', status: 'active', groupavatarurl: '/aw-avatar.png', groupavatarurl_20: '/aw-avatar-20.png', groupavatarurl_40: '/aw-avatar-40.png', channels: [{name: 'mentor-general', chlid: '12345', type: 'general'},{name: 'resources', chlid: '12346', type: 'resources'},{name: 'other', chlid: '12347', type: 'other'}]},
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
