// Dex last merged this code on 15th Oct 2020

import React, { Component } from "react";

import cdn from './CDN.js';
import {DateCalc} from './GeneralFunctions.js';
import VerifiedBadge from "./VerifiedBadge";

class GroupAbout extends Component {
  render() {
    const {group} = this.props;
    const groupAvatarURL = group.groupavatarurl
    const isGroupAvatarURL = groupAvatarURL != null
    let progLogo
    let groupInitial

    console.log(group)
    console.log(group.groupname)

    if (isGroupAvatarURL) {
      progLogo = cdn + '/progImages/' + groupAvatarURL
    } else {
      groupInitial = group.groupname.charAt(0).toUpperCase();
    }

    return (
      <div className="group-about-container">
        <div className="groupName-flexContainer">
          <div className={"groupsAvatarContainer flexContainer img-circle "+(isGroupAvatarURL ? "" : "noImg")}>
            {isGroupAvatarURL === true ?
              <img className="logoImg" alt="Initiative Logo" src={progLogo}/>
            : groupInitial
            }
          </div>
          <span className="chat-title flexContainer">
            {group.groupname}
          </span>
          {group.isVerifiedGroup && (
            <VerifiedBadge />
          )}
        </div>
        <div>
          {group.about && (
            <div className="group-detail-item">
              {group.about}
            </div>
          )}
          <div className="group-detail-item">
            <span className="presenceContainer group">
              <i className="fas fa-user-friends" />
            </span>
            {group.memberCount} members
          </div>
          <div className="group-detail-item">
            <span className="presenceContainer group">
              <i className="fas fa-birthday-cake" />
            </span>
            since <DateCalc time={group.datecreated} showPureDate />
          </div>
          {group.website && (
            <a className="group-detail-item link" href={group.website} target="_blank" rel="noopener noreferrer">
              {group.website}
            </a>
          )}
          {group.twitter && (
            <a className="group-detail-item link" href={"https://twitter.com/"+group.twitter} target="_blank" rel="noopener noreferrer">
              {group.twitter}
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default GroupAbout;
/*
groupname: "I'm a group!",
about: "12345",
datecreated: '12312312312323',
founder: "123456",
pm: "234567",
website: 'https://www.access-vfx.com',
twitter: '@accessvfx',
isVerifiedGroup: '1',
groupavatarurl: 'avfx-avatar-20.png'
*/
