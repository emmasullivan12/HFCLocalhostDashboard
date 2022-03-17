// Dex last merged this code on 7th mar 2022

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
  triggerText: 'Profile',
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
  const {userRole, onClick} = this.props;

    if(userRole === 'mentor' || userRole === 'pr') {
    //  const hasUnreadMentorActivity = true
      const pathName = window.location.pathname

      return (
          <div className="mainMenu">
        {/*    <NavLink exact to="/mentor-homepage" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>Dashboard</NavLink> */}
            <NavLink exact to="/home" isActive={() => ['/home', '/questions'].includes(pathName) || pathName.includes('/questions/')} activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={onClick}>Home</NavLink>
        {/*    <NavLink exact to="/questions/1234" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={onClick}>Q&A SEO page</NavLink> */}
            <FullPageModal {...MentorProfileModalProps}>
              <MentorProfileContent />
            </FullPageModal>
            <NavLink exact to="/my-activity" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={onClick} onMouseDown={this.props.onMouseDown}>
              My Activity
          {/*    {hasUnreadMentorActivity && (
                <span className="notificationNum">New</span>
              )}*/}
            </NavLink>
          </div>
        );
    } else {
      const hasUnreadAnswers = true
      return (
        <div className="mainMenu">
          <NavLink exact to="/latest-advice" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={onClick} onMouseDown={this.props.onMouseDown}>Get Started</NavLink>
        {/* <NavLink exact to="/latest-advice" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>Get Started</NavLink>  */}
          <FullPageModal {...MenteeProfileModalProps}>
            <MenteeProfileContent />
          </FullPageModal>
          <NavLink exact to="/my-activity" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={onClick} onMouseDown={this.props.onMouseDown}>
            My Activity
            {hasUnreadAnswers && (
              <span className="notificationNum">New</span>
            )}
          </NavLink>
        {/*}  <NavLink to="/to-do-list" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>To Do List</NavLink>
          <NavLink to="/teams" activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={closeMenu}>Create a Team</NavLink> */}
        </div>
      );
    }
  }
}


export default MainMenu;
