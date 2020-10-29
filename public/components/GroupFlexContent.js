// Dex last merged this code on 25th oct 2020

import React, { Component } from "react";
import GroupAbout from './GroupAbout.js';
//import GroupUsers from './GroupUsers.js';

import "../css/GroupFlexContent.css";

class GroupFlexContent extends Component {
  render() {
  const group = {
    groupname: "Access:VFX",
    about: "this is about text here about avfx and what our mission is!",
    datecreated: '2020-09-01T13:30:50.667Z',
    founder: "123456",
    pm: "234567",
    website: 'https://www.access-vfx.com',
    twitter: '@accessvfx',
    isVerifiedGroup: '1',
    memberCount: 104,
    groupavatarurl: 'avfx-avatar-20.png'
  }
    return (
      <React.Fragment>
        <GroupAbout
          group={group}
        />
        {/*<GroupUsers
          group={group}
        />*/}
      </React.Fragment>
    );
  }
}

export default GroupFlexContent;
