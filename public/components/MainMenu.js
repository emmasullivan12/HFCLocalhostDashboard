// Dex last merged this code on 15th oct 2020

import React, { Component } from "react";
import {
  Route,
  Link
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
  const {userRole, updateActiveMenu, menuItemActive} = this.props;

    if(userRole === 'mentor' || userRole === 'pr') {
      return (
          <div className="mainMenu">
        {/*    <NavLink exact to="/mentor-homepage" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>Dashboard</NavLink> */}
            <Link exact to="/mentor-homepage" id="dashboard" className={"mainMenuItem overflow-ellipsis" + ((menuItemActive === 'dashboard') ? ' is-active' : "")} onClick={updateActiveMenu}>Dashboard</Link>
    {/*        <FullPageModal {...MentorProfileModalProps}>
              <MentorProfileContent />
            </FullPageModal>*/}
          </div>
        );
    } else {
      return (
        <div className="mainMenu">
          <Link exact to="/latest-advice" id="dashboard" className={"mainMenuItem overflow-ellipsis" + ((menuItemActive === 'dashboard') ? ' is-active' : "")} onClick={updateActiveMenu}>Get Started</Link>
        {/* <NavLink exact to="/latest-advice" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>Get Started</NavLink>  */}
      {/*    <FullPageModal {...MenteeProfileModalProps}>
            <MenteeProfileContent />
          </FullPageModal>
          <NavLink to="/to-do-list" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>To Do List</NavLink>
          <NavLink to="/teams" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>Create a Team</NavLink> */}
        </div>
      );
    }
  }
}


export default MainMenu;
