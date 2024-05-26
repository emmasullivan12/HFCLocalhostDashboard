// Dex last merged this code on 3rd nov 2020

import React, { Component } from "react";

import GroupAbout from './GroupAbout.js';
import GroupUsers from './GroupUsers.js';

import "../css/GroupFlexContent.css";

class GroupFlexContent extends Component {
  render() {
    const {group, groupUsers, updatePathName} = this.props
    return (
      <React.Fragment>
        <GroupAbout
          group={group}
          groupUsers={groupUsers}
          updatePathName={updatePathName}
        />
        <GroupUsers
          group={group}
          groupUsers={groupUsers}
          updatePathName={updatePathName}
        />
      </React.Fragment>
    );
  }
}

export default GroupFlexContent;
