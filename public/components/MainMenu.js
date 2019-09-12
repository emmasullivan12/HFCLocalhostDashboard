// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";
import MenteeProfileContent from './MenteeProfileContent.js';
import FullPageModal from './FullPageModal.js';

import "../css/MainMenu.css";
import "../css/General.css";

const MenteeProfileModalProps = {
  ariaLabel: 'View Mentee Profile',
  triggerText: 'My Profile',
  usedFor: 'mentee-profile',
  backBtn: 'arrow'
}

// This is main menu (top left) on dashboard.
// Depending on whether user is Mentor or Student, will display different Main Menu
class MainMenu extends Component {

  render() {
  const userRole = 'mentee';
    if(userRole === 'mentor') {
      return (
          <div className="mainMenu">
            <NavLink to="/1" className="mainMenuItem">Menu Item 1</NavLink>
            <NavLink to="/2" className="mainMenuItem">Menu Item 2</NavLink>
            <NavLink to="/3" className="mainMenuItem">Menu Item 3</NavLink>
            <NavLink to="/4" className="mainMenuItem">Menu Item 4</NavLink>
          </div>
        );
      } else {
      return (
        <div className="mainMenu">
          <NavLink exact to="/" activeClassName="is-active" className="mainMenuItem overflow-ellipsis">Latest Advice</NavLink>
          <FullPageModal {...MenteeProfileModalProps}>
            <MenteeProfileContent />
          </FullPageModal>
          <NavLink to="/to-do-list" activeClassName="is-active" className="mainMenuItem overflow-ellipsis">To Do List</NavLink>
          <NavLink to="/teams" activeClassName="is-active" className="mainMenuItem overflow-ellipsis">Create a Team</NavLink>
        </div>
      );
    }
  }
}


export default MainMenu;
