// Dex last merged this code on 13th Oct 2020

import React, { Component } from "react";
import "../css/General.css";
import "../css/GroupCircle.css";
import {
  Route,
  NavLink
} from "react-router-dom";



// This is main menu (top left) on dashboard.
// Depending on whether user is Mentor or Student, will display different Main Menu
class GroupCircle extends Component {
  render() {
    const {group} = this.props;
    var string = group.groupname;
    return (
      <button type="button" className="groupBtn tooltip">
        <span>{string.charAt(0)}</span>
        <span className="tooltiptext groups">{group.groupname}</span>
      </button>
    );
  }
}

export default GroupCircle;
