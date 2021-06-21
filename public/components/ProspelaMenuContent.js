// Dex last merged this code on 15th oct 2020

import React, { Component } from "react";
import {
  Link
} from "react-router-dom";
//import FullPageModal from './FullPageModal.js';
import SettingsContent from './SettingsContent.js';
import "../css/UserMenuContent.css";
import "../css/General.css";
import "../css/Modal.css";

const PrSettingsModalProps = {
  ariaLabel: 'Popup to manage Prospela preferences and settings',
  triggerText: 'Prospela Preferences & Settings',
  usedFor: 'PrSettings',
  backBtn: 'bk2Pr'
}

class ProspelaMenuContent extends Component {
  render() {
    const userRole = 'prospela';
    const {onMenuClose, onKeyDown} = this.props;
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
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <Link to="/profile/set-status" className="userMenu-link" >
                  <span className="userMenuLabel overflow-ellipsis">Edit status...</span>
                </Link>
              </li>
              <li className="userMenu-list-item" role="menuitem" onClick={onMenuClose} onKeyDown={onKeyDown}>
                <Link to="/profile" className="userMenu-link">
                  <span className="userMenuLabel overflow-ellipsis">Profile</span>
                </Link>
              </li>
            </ul>
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

export default ProspelaMenuContent;
