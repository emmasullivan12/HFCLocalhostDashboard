// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import "../css/MainMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

// This state to come from global authenticated user / Redux / RBAC
const isMentor = true;

// This is main menu (top left) on dashboard.
// Depending on whether user is Mentor or Student, will display different Main Menu
class MainMenu extends Component {
  render() {
    if(this.props.isMentor === true) {
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
          <NavLink to="/" className="mainMenuItem overflow-ellipsis">Latest Advice</NavLink>
          <NavLink to="/mentee-profile" className="mainMenuItem overflow-ellipsis">My Profile</NavLink>
          <NavLink to="/to-do-list" className="mainMenuItem overflow-ellipsis">To Do List</NavLink>
          <NavLink to="/teams" className="mainMenuItem overflow-ellipsis">Create a Team</NavLink>
        </div>
      );
    }
  }
}

export default MainMenu;
