// Dex last merged this code on 27th August 2019

import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";
import MenteeProfileContent from './MenteeProfileContent.js';
import FullPageModal from './FullPageModal.js';
import SettingsContent from './SettingsContent.js';
import "../css/UserMenuContent.css";
import "../css/General.css";
import "../css/Modal.css";

const SettingsModalProps = {
  ariaLabel: 'Popup to manage your preferences and settings',
  triggerText: 'Preferences & Settings',
  usedFor: 'settings',
  backBtn: 'bk2Pr'
}

const MenteeProfileModalProps = {
  ariaLabel: 'View Mentee Profile',
  triggerText: 'Profile',
  usedFor: 'menu-mentee-profile',
  backBtn: 'arrow'
}

class UserMenuContent extends Component {
  render() {
    const {onMenuClose, onKeyDown} = this.props;
    const userRole = mentee;
    const mentee = {
      fname: 'Dexter',
    };
    const isPicSet = true;
    return (
      <React.Fragment>
        <div className="userMenuContainer">
          <section className="userMenu-you">
            <h2 className="userMenu-header">
              <div className="userMenu-thumb-container">
                {isPicSet ? (
                  <img
                    className="userMenu-thumb"
                    src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
                    alt="User profile pic"
                  />
                  )
                : (
                  <div className={"userMenu-thumb noPic "+userRole}>{mentee.fname.charAt(0).toUpperCase()}</div>
                )}
              </div>
              <span className="userMenu-name overflow-ellipsis">fname lname</span>
              <span className="userMenu-preferred-name overflow-ellipsis">fname</span>
            </h2>
            <ul className="userMenu-list">
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <NavLink to="/profile/set-status" className="userMenu-link" >
                  <span className="userMenuLabel overflow-ellipsis">Edit status...</span>
                </NavLink>
              </li>
              <FullPageModal {...MenteeProfileModalProps} role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <MenteeProfileContent />
              </FullPageModal>
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <NavLink to="/profile/saved-highlights" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">My Highlights</span>
                </NavLink>
              </li>
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <NavLink to="/profile/influencer-stats" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Influencer Stats</span>
                </NavLink>
              </li>
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <NavLink to="/invite" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Invite Codes</span>
                </NavLink>
              </li>
            </ul>
          </section>
          <section className="userMenu-eduInst">
            <h2 className="userMenu-header">
              <div className="userMenu-eduInstThumb" />
              <span className="userMenu-name overflow-ellipsis">Villiers High School</span>
              <span className="userMenu-preferred-name overflow-ellipsis">Not yet signed up</span>
            </h2>
            <ul className="userMenu-list">
              <li className="userMenu-list-item-nohover" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <span className="userMenu-eduInstDetail overflow-ellipsis">
                  Sign up your school to access real employee e-mentors. <NavLink to="/invite" className="inline-link">Learn more</NavLink>
                </span>
              </li>
            </ul>
          </section>
          <section className="userMenu-settings">
            <ul className="userMenu-list">
              <li className="userMenu-list-item">
    {/*            <NavLink to="/settings" className="userMenu-link"> */}
                  <span className="userMenuLabel overflow-ellipsis">
                    <FullPageModal {...SettingsModalProps}>
                      <SettingsContent />
                    </FullPageModal>
                  </span>
      {/*          </NavLink>*/}
              </li>
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <NavLink to="/help-and-feedback" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Help & Feedback</span>
                </NavLink>
              </li>
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <NavLink to="/logout" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Sign out</span>
                </NavLink>
              </li>
            </ul>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default UserMenuContent;
