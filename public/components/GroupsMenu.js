// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

import Modal from './Modal.js';
import AddChatModalContent from './AddChatModalContent.js';
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';
import "../css/Modal.css";

const JoinProgrammeModalProps = {
  ariaLabel: 'Join a live Programme',
  triggerText: 'Join a Programme',
  usedFor: 'joinProg',
  changeInitFocus: true
}

const JoinProgrammePlusModalProps = {
  ariaLabel: 'Join a live Programme',
  triggerText: 'Join a Programme',
  usedFor: 'joinProgSml',
  changeInitFocus: true
}

// This shows the content within an individual row in the ChatMenu
class GroupListItem extends Component {
  render() {
    const group = this.props.group;

    return(
      <NavLink to={this.props.navlink} activeClassName="is-active" className="chatMenuItem link">
        <div className="chatItemFlexContainer">
          <span className="chatMenuLink overflow-ellipsis">{group.name}</span>
          <span className="notificationNum">xx</span>
        </div>
      </NavLink>
    )
  }
}

// This shows the logged in user's direct messages with Prospela, active mentors, and old mentors
class GroupsMenu extends Component {
  render() {
    const {userRole} = this.props;
    const groups = [];

    this.props.groups.forEach((group) => {
      groups.push(
        <GroupListItem
          group={group}
          key={group.groupID}
          navlink={`/community/${group.name}`}
        />
      );
    });

    return (
      <React.Fragment>
        <div className="chatMenu">
          <div className="chatMenu-header overflow-ellipsis">
            My Memberships
            <div className="menuCTAContainer">
              <Modal {...JoinProgrammePlusModalProps}>
                <JoinProgrammeModalContent />
              </Modal>
            </div>
          </div>
          {groups}
          {this.props.groups.length === 0 && (
            <Modal {...JoinProgrammeModalProps}>
              <JoinProgrammeModalContent />
            </Modal>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default GroupsMenu;
