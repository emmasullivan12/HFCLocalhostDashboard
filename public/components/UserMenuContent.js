// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";
import "../css/UserMenuContent.css";

class UserMenuContent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="userMenuContainer">
          <section className="userMenu-you">
            <h2 className="userMenu-header">
              <div className="userMenu-thumb" />
              <span className="userMenu-name overflow-ellipsis">fname lname</span>
              <span className="userMenu-preferred-name overflow-ellipsis">fname</span>
            </h2>
            <ul className="userMenu-list">
              <li className="userMenu-list-item">
                <NavLink to="/profile/set-status" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Edit status...</span>
                </NavLink>
              </li>
              <li className="userMenu-list-item">
                <NavLink to="/profile" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Profile</span>
                </NavLink>
              </li>
              <li className="userMenu-list-item">
                <NavLink to="/profile/saved-highlights" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">My Highlights</span>
                </NavLink>
              </li>
              <li className="userMenu-list-item">
                <NavLink to="/profile/influencer-stats" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Influencer Stats</span>
                </NavLink>
              </li>
              <li className="userMenu-list-item">
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
              <li className="userMenu-list-item-nohover">
                <span className="userMenu-eduInstDetail overflow-ellipsis">
                  Sign up your school to access real employee e-mentors. <NavLink to="/invite" className="userMenu-inline-link">Learn more</NavLink>
                </span>
              </li>
            </ul>
          </section>
          <section className="userMenu-settings">
            <ul className="userMenu-list">
              <li className="userMenu-list-item">
                <NavLink to="/preferences-settings" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Preferences & Settings</span>
                </NavLink>
              </li>
              <li className="userMenu-list-item">
                <NavLink to="/help-and-feedback" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Help & Feedback</span>
                </NavLink>
              </li>
              <li className="userMenu-list-item">
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
