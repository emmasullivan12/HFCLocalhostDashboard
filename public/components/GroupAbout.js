// Dex last merged this code on 5th nov 2020

import React, { Component } from "react";

import cdn from './CDN.js';
import Avatar from './Avatar.js';
import {DateCalc} from './GeneralFunctions.js';
import UserBadge from './UserBadge.js';
import UserName from './UserName.js';
import VerifiedBadge from "./VerifiedBadge";

class GroupAbout extends Component {

  render() {
    const {group, groupUsers} = this.props;
    const groupAvatarURL = group.groupavatarurl_40 //40 px wide image
    const isGroupAvatarURL = groupAvatarURL != null
    const userRole = 'mentee'

    let progLogo
    let groupInitial
    const founders = []
    const pms = []

    if (group.founder.length != 0) {
      const foundersList = groupUsers.users.usersList
        .filter(user => user['founder'] === 1)

      foundersList.forEach((founder) => {
        founders.push(
          <div className="group-detail-item bright" key={founder.uid}>
            <Avatar userID={founder.uid} userName={founder.fname} isGroupFlex smallIdle />
            <UserName userUID={founder.uid} fname={founder.fname} lname={founder.lname} smallIdle/>
            <UserBadge badgeType='founder' />
          </div>
        );
      })
    }

    if (userRole != 'mentee') {
      if (group.pm.length != 0) {
        const pmList = groupUsers.users.usersList
          .filter(user => user['pm'] === 1)

        pmList.forEach((pm) => {
          pms.push(
            <div className="userItem-FlexContainer" key={pm.uid}>
              <Avatar userID={pm.uid} userName={pm.fname} showOnline isGroupFlex />
              <UserName userUID={pm.uid} fname={pm.fname} lname={pm.lname} />
              <UserBadge badgeType='pm' />
            </div>
          );
        })
      }
    }

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
          <div className="group-detail-item bright">
            <span className="presenceContainer group">
              <i className="fas fa-user-friends" />
            </span>
            {groupUsers.users.count} members
          </div>
          <div className="group-detail-item bright">
            <span className="presenceContainer group">
              <i className="fas fa-birthday-cake" />
            </span>
            since <DateCalc time={group.datecreated} showPureDate />
          </div>
          {founders}
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
        <div>
          <div className="groupFlexContent-title">
            Admin
          </div>
          {group.pm.length > 0 && userRole != 'mentee' && (
            <React.Fragment>
              {pms}
            </React.Fragment>
          )}
          <div className="userItem-FlexContainer">
            <Avatar isProspelaAuto isGroupFlex showOnline/>
            <UserName isProspelaAuto showOnline/>
            <UserBadge badgeType='isPrBot' />
          </div>
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
