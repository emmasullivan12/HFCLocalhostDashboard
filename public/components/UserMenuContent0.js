// Last merged this code on 28th mar 2024

import React, { Component } from "react";
import {
  Link
} from "react-router-dom";

import "../css/UserMenuContent.css";


class UserMenuContent extends Component {
  render() {
    const {onMenuClose, onKeyDown, fname, lname} = this.props;

    const userInitial = fname.charAt(0).toUpperCase();
    return (
      <React.Fragment>
        <div className="userMenuContainer">
          <section className="userMenu-you">
            <h2 className="userMenu-header">
              <div className="userMenu-thumb-container">
                <div className="userMenu-thumb noPic isMe">
                  <div className="userInitial userMenu-thumb">
                    {userInitial}
                  </div>
                </div>
              </div>
              <span className="userMenu-name overflow-ellipsis">{fname} {lname}</span>
              <span className="userMenu-preferred-name overflow-ellipsis">{fname}</span>
            </h2>
          </section>
          <section className="userMenu-settings sectionBorder">
            <ul className="userMenu-list">
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <Link to="/logout" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Sign out</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default UserMenuContent;
