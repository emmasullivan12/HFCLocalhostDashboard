// Last merged this code on 28th mar 2024

import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

import "../css/MainMenu.css";

class MainMenu extends Component {

  render() {
    const {onClick, pathName, isLoggedIn} = this.props;

    return (
      <div className="mainMenu">
        <NavLink exact to="/home" isActive={() => ['/', '/home'].includes(pathName)} activeClassName="is-active" className="mainMenuItem overflow-ellipsis" onClick={onClick}>{isLoggedIn == true ? 'Dashboard' : 'Browse Courses'}</NavLink>
      </div>
    );
  }
}


export default MainMenu;
