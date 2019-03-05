import React, { Component } from "react";
import "../css/MainMenu.css";
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
            <div className="mainMenuItem"><NavLink to="/1" className="mainMenuLink">Menu Item 1</NavLink></div>
            <div className="mainMenuItem"><NavLink to="/2" className="mainMenuLink">Menu Item 2</NavLink></div>
            <div className="mainMenuItem"><NavLink to="/3" className="mainMenuLink">Menu Item 3</NavLink></div>
            <div className="mainMenuItem"><NavLink to="/4" className="mainMenuLink">Menu Item 4</NavLink></div>
          </div>
        );
      } else {
      return (
        <div className="mainMenu">
          <div className="mainMenuItem"><NavLink to="/" className="mainMenuLink overflow-ellipsis">Latest Advice</NavLink></div>
          <div className="mainMenuItem"><NavLink to="/mentee-profile" className="mainMenuLink overflow-ellipsis">My Profile</NavLink></div>
          <div className="mainMenuItem"><NavLink to="/to-do-list" className="mainMenuLink overflow-ellipsis">To Do List</NavLink></div>
          <div className="mainMenuItem"><NavLink to="/teams" className="mainMenuLink overflow-ellipsis">Create a Team</NavLink></div>
        </div>
      );
    }
  }
}

export default MainMenu;
