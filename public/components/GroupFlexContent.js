// Dex last merged this code on 2nd nov 2020

import React, { Component } from "react";

import GroupAbout from './GroupAbout.js';
import GroupUsers from './GroupUsers.js';

import "../css/GroupFlexContent.css";

class GroupFlexContent extends Component {
  render() {
    const {group, groupUsers} = this.props
    return (
      <React.Fragment>
        <GroupAbout
          group={group}
          groupUsers={groupUsers}
        />
        {/*<GroupUsers
          group={group}
          groupUsers={groupUsers}
        />*/}
      </React.Fragment>
    );
  }
}

export default GroupFlexContent;
