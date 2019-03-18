import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";
import "../css/UserMenuContent.css";

class UserMenuContent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="menuModal-scrollArea">
          <div className="userMenuContainer">
            <section className="userMenu-you">
              <h2 className="userMenu-header">
                <div className="userMenu-thumb" />
                <span className="userMenu-name overflow-ellipsis">fname lname</span>
                <span className="userMenu-preferred-name overflow-ellipsis">fname</span>
              </h2>
              <ul className="userMenu-list">
                <li className="userMenu-list-item">
                  <NavLink to="/setStatus" className="userMenu-link">
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserMenuContent;
