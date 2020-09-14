// Dex last merged this code on 14th sept 2020

import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";
import MenteeProfileContent from './MenteeProfileContent.js';
import MentorProfileContent from './MentorProfileContent.js';
import FullPageModal from './FullPageModal.js';

import "../css/MainMenu.css";
import "../css/General.css";

const MenteeProfileModalProps = {
  ariaLabel: 'View Mentee Profile',
  triggerText: 'My Profile',
  usedFor: 'mentee-profile',
  backBtn: 'arrow'
}

const MentorProfileModalProps = {
  ariaLabel: 'View Mentor Profile',
  triggerText: 'Profile',
  usedFor: 'mentor-profile',
  backBtn: 'arrow'
}

// This is main menu (top left) on dashboard.
// Depending on whether user is Mentor or Student, will display different Main Menu
class MainMenu extends Component {
  render() {
  const {userRole, closeMenu} = this.props;

    if(userRole === 'mentor') {
      return (
          <div className="mainMenu">
            <NavLink exact to="/mentor-homepage" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>Dashboard</NavLink>
            <FullPageModal {...MentorProfileModalProps}>
              <MentorProfileContent />
            </FullPageModal>
          </div>
        );
      } else {
      return (
        <div className="mainMenu">
          <NavLink exact to="/latest-advice" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>Get Started</NavLink>
          <FullPageModal {...MenteeProfileModalProps}>
            <MenteeProfileContent />
          </FullPageModal>
          <NavLink to="/to-do-list" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>To Do List</NavLink>
          <NavLink to="/teams" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>Create a Team</NavLink>
        </div>
      );
    }
  }
}


export default MainMenu;
