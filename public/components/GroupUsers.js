// Dex last merged this code on 3rd nov 2020

import React, { Component } from "react";

import Avatar from './Avatar.js';
import UserBadge from './UserBadge.js';
import UserName from './UserName.js';

class UserListItem extends Component {
  render() {
    const {user} = this.props;
    const isOnline = false;

    return(
      <div className="userItem-FlexContainer">
        <Avatar userID={user.uid} userName={user.fname} isGroupFlex showOnline/>
        <UserName fname={user.fname} lname={user.lname} userUID={user.uid} />
        {user.userRole === 'pr' && (
          <UserBadge badgeType='isPrTeam' />
        )}
      </div>
    )
  }
}

class GroupUsers extends Component {

  /*const group = {
    groupname: "Access:VFX",
    about: "this is about text here about avfx and what our mission is!",
    datecreated: '2020-09-01T13:30:50.667Z',
    founder: ["123456"],
    pm: ["234567"],
    website: 'https://www.access-vfx.com',
    twitter: '@accessvfx',
    isVerifiedGroup: '1',
    groupavatarurl: 'avfx-avatar-20.png',
    channels: [
      {name: 'mentor-general', type: 'general', about: 'A great place to chit chat with other E-Mentors', chlid: '12345',}
    ]
  }
  const groupUsers = {
    users: {
      count: 104,
      usersList: [
        {uid: '12345', fname: 'simon', profilePic: '', founder: 1}
      ]
    }
  }*/
  render() {
    const {group, groupUsers} = this.props;

    const userList = groupUsers.users.userList
    const allowed = ["pr", "mentee"];
    const users = [];

    if (userList.length == 0) {
      users.push(
        <div className="chatMenuPlaceholder overflow-ellipsis">
          <div className="presenceContainer placeholder">
            <i className="fas fa-circle" />
          </div>
          Users in this group will appear here...
        </div>
      );
    } else {
      const userListFiltered = userList
        .filter(user => allowed.indexOf(user['userRole']) != -1)

      userListFiltered.forEach((user) => {
        users.push(
          <UserListItem
            key={user.uid}
            user={user}
          />
        );
      })
    }

    return (
      <div className="group-users-container">
        <div className="groupName-flexContainer">
          <div className="groupFlexContent-title">
            Channel Users - {groupUsers.users.count}
          </div>
          <div className="chatMenu">
            {users}
          </div>
        </div>
      </div>
    );
  }
}

export default GroupUsers;
