// Dex last merged this code on 29th jan 2021

import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

// import Modal from './Modal.js';
// import {getUnreadIndicator} from './GeneralFunctions.js';

class MatchMenu extends Component {
  render() {
    const {matchTabs, onClick} = this.props;
    const tabs = [];
    const unread = false;

    this.props.matchTabs.forEach((matchTab) => {
      tabs.push(
        <NavLink to={matchTab.navlink} key={matchTab.tabName} activeClassName="is-active" className="chatMenuItem link group" onClick={onClick}>
          <div className="chatItemFlexContainer">
            <div className={"chatMenuLink overflow-ellipsis "+(unread == true ? 'unread' : null)}>
              {matchTab.tabName}
            </div>
          {/*  {unreadCount != 0 && (
              getUnreadIndicator(unreadCount, false, isOverflowing)
            )}*/}
          </div>
        </NavLink>
      );
    });

    return (
      <React.Fragment>
        <div className="chatMenu">
          <div className="chatMenu-header overflow-ellipsis">
            Matches
            <span className="menuItemIconContainer chat">
              <i className="fas fa-link" />
            </span>
          </div>
          <div className="channelsContainer">
            {tabs}
          </div>

        {/*  {userRole != 'prospela' && (
            <React.Fragment>
              <div className="chatMenuItem">
                <NavLink to="/prospelahomepage" className="chatMenuLink overflow-ellipsis" onClick={closeMenu}>Prospela Homepage</NavLink>
              </div>
            </React.Fragment>
          )}*/}
        </div>
      </React.Fragment>
    );
  }
}

export default MatchMenu;
