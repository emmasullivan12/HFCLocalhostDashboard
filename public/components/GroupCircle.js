// Dex last merged this code on 9th nov 2020

import React, { Component } from "react";
import {Link} from "react-router-dom";

import {cdn, groupImgFolder} from './CDN.js';

import "../css/General.css";
import "../css/GroupCircle.css";

// This is main menu (top left) on dashboard.
// Depending on whether user is Mentor or Student, will display different Main Menu
class GroupCircle extends Component {
  render() {
    const {group, navlink} = this.props;
    const groupAvatarURL = group.groupavatarurl
    const isGroupAvatarURL = groupAvatarURL != null
    var string = group.groupname;

    let progLogo
    let groupInitial

    if (isGroupAvatarURL) {
      progLogo = cdn + '/' + groupImgFolder + groupAvatarURL + '-40' //40px wide image
    } else {
      groupInitial = string.charAt(0).toUpperCase();
    }


//<span>{string.charAt(0)}</span>
//<span className={"groupsAvatarContainer "+(isGroupAvatarURL ? "" : "noImg")}>
    return (
      <Link to={navlink} className={isGroupAvatarURL ? '' : 'noAvatar'}>
        <button type="button" className="groupBtn tooltip">
            {isGroupAvatarURL === true ? (
              <React.Fragment>
                <img alt="Initiative Logo" src={progLogo}/>
                <span className="overlay"/>
              </React.Fragment>
              )
            : <span className="initial">{groupInitial}</span>
            }
          <span className="tooltiptext groups">{string}</span>
        </button>
      </Link>
    );
  }
}

export default GroupCircle;
