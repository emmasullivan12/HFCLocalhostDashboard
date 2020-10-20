// Dex last merged this code on 20th oct 2020

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

/*const JoinProgrammeModalProps = {
  ariaLabel: 'Join a live Programme',
  triggerText: 'Join a Programme',
  usedFor: 'joinProg',
  changeInitFocus: true
}*/

const JoinProgrammePlusModalProps = {
  ariaLabel: 'Join a live Programme',
  triggerText: 'Join a Programme',
  usedFor: 'joinProgSml',
  changeInitFocus: true
}

// This shows the content within an individual row in the ChatMenu
class GroupListItem extends Component {

  render() {
    const {group, navlink, onClick} = this.props;
    const groupAvatarURL = group.groupavatarurl
    const isGroupAvatarURL = groupAvatarURL != null

    let progLogo
    let groupInitial

    if (isGroupAvatarURL) {
      progLogo = cdn + '/progImages/' + groupAvatarURL
    } else {
      groupInitial = group.groupname.charAt(0).toUpperCase();
    }

    return(
      <NavLink to={navlink} activeClassName="is-active" className="chatMenuItem link" onClick={onClick}>
    {/*  <div id={group.gid} className={"chatMenuItem link" + (menuItemActive === group.gid ? ' is-active' : "")} onClick={updateActiveMenu}>
       <div className="chatMenuItem link" onClick={closeMenu}> */}
        <div className={"groupsAvatarContainer "+(isGroupAvatarURL ? "" : "noImg")}>
          {isGroupAvatarURL === true ?
            <img className="logoImg" alt="Initiative Logo" src={progLogo}/>
          : groupInitial
          }
        </div>
        <div className="chatItemFlexContainer">
          <span className="chatMenuLink overflow-ellipsis">{group.groupname}</span>
    {/*      <span className="notificationNum">xx</span> */}
          <span className="notificationNum announcement">COMING SOON!</span>
        </div>
      {/*    </NavLink>*/}
      </NavLink>
    )
  }
}

// This shows the logged in user's direct messages with Prospela, active mentors, and old mentors
class GroupsMenu extends Component {
  render() {
    const {userRole, onClick} = this.props;
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
            key={group.gid}
            navlink={`/community/${group.groupname}`}
            onClick={onClick}
          />
        );
      });
    }

    return (
      <React.Fragment>
        <div className="chatMenu">
          <div className="chatMenu-header overflow-ellipsis">
            My Groups
            <span className="menuItemIconContainer">
              <i className="fas fa-plug" />
            </span>
            <div className="menuCTAContainer">
              <Modal {...JoinProgrammePlusModalProps}>
                <JoinProgrammeModalContent />
              </Modal>
            </div>
          </div>
          {groups}
        {/*  {this.props.groups.length === 0 && (
            <Modal {...JoinProgrammeModalProps}>
              <JoinProgrammeModalContent />
            </Modal>
          )} */}
        </div>
      </React.Fragment>
    );
  }
}

export default GroupsMenu;
