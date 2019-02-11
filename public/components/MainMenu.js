import React, { Component } from "react";
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
          <ul className="mainMenu-mentor">
            <li><NavLink to="/1">Menu Item 1</NavLink></li>
            <li><NavLink to="/2">Menu Item 2</NavLink></li>
            <li><NavLink to="/3">Menu Item 3</NavLink></li>
            <li><NavLink to="/4">Menu Item 4</NavLink></li>
          </ul>
        );
      } else {
      return (
        <ul className="mainMenu-student">
          <li><NavLink to="/">Latest Advice</NavLink></li>
          <li><NavLink to="/mentee-profile">My Profile</NavLink></li>
          <li><NavLink to="/to-do-list">To Do List</NavLink></li>
          <li><NavLink to="/teams">Create a Team</NavLink></li>
        </ul>
      );
    }
  }
}

export default MainMenu;
