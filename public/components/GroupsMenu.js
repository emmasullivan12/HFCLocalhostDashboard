// Dex last merged this code on 12th oct 2020

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

import cdn from './CDN.js';
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
    const {group, closeMenu, groupAvatarURL} = this.props;
    var progLogoURL = cdn + '/progImages/' + groupAvatarURL

    return(
      <div activeClassName="is-active" className="chatMenuItem link" onClick={closeMenu}>
    {/*  <NavLink to={this.props.navlink} activeClassName="is-active" className="chatMenuItem link" onClick={closeMenu}> */}
        <div className="groupsAvatarContainer">
          <img className="logoImg" alt="Initiative Logo" src={progLogoURL}/>
        </div>
        <div className="chatItemFlexContainer">
          <span className="chatMenuLink overflow-ellipsis">{group.name}</span>
    {/*      <span className="notificationNum">xx</span> */}
          <span className="notificationNum announcement">COMING SOON!</span>
        </div>
      {/*    </NavLink>*/}
      </div>
    )
  }
}

// This shows the logged in user's direct messages with Prospela, active mentors, and old mentors
class GroupsMenu extends Component {
  render() {
    const {userRole, closeMenu} = this.props;
    const groups = [];

    if (this.props.groups.length == 0) {
      groups.push(
        <div className="chatMenuPlaceholder overflow-ellipsis">
          <div className="presenceContainer placeholder">
            <i className="fas fa-circle" />
          </div>
          Your Groups will appear here...
        </div>
      );
    } else {
      this.props.groups.forEach((group) => {
        groups.push(
          <GroupListItem
            group={group}
            key={group.groupID}
      //      navlink={`/community/${group.name}`}
            closeMenu={closeMenu}
            groupAvatarURL={group.groupAvatarURL}
          />
        );
      });
    }

    return (
      <React.Fragment>
        <div className="chatMenu">
          <div className="chatMenu-header overflow-ellipsis">
            My Groups
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
