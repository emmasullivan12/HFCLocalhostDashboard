// Dex last merged this code on 26th mar 2021

import React, { Component } from "react";

import Avatar from './Avatar.js';
import UserBadge from './UserBadge.js';
import UserName from './UserName.js';
import {LoadingSpinner} from './GeneralFunctions.js';

class UserListItem extends Component {
  render() {
    const {user, founders, pms} = this.props;
    const isProspelaTeam = user.pr && user.pr == 1
    const isFounder = founders.includes(user.uid)
    const isPM = pms.includes(user.uid)
  //  const usersBadges = ['isPrTeam', 'founder', 'topuser', '500 messages'] // And cycle through UserBade for each and prioritize so Founder shows first etc

    return(
      <div className="userItem-FlexContainer">
        <Avatar userID={user.uid} userName={user.fname} isGroupFlex showOnline picSize={40}/>
        <UserName fname={user.fname} lname={user.lname} isProspelaTeam={isProspelaTeam} isFounder={isFounder} isPM={isPM} userUID={user.uid} />
        {isProspelaTeam && (
          <UserBadge badgeType='isPrTeam' />
        )}
        {isFounder && (
          <UserBadge badgeType='founder' />
        )}
        {isPM && (
          <UserBadge badgeType='pm' />
        )}
      </div>
    )
  }
}

class GroupUsers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showOnly20Users: true,
      isLoading: false,
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.group.gid != this.props.group.gid) {
      this.setState({
        showOnly20Users: true,
        isLoading: false,
      })
    }
  }

  showAllUsers = () => {
    this.setState({
      showOnly20Users: false,
      isLoading: true,
    })
  }

  /*const group = {
    groupname: "Access:VFX",
    about: "this is about text here about avfx and what our mission is!",
    datecreated: '2020-09-01T13:30:50.667Z',
    founder: ["123456"],
    pm: ["234567"],
    website: 'https://www.access-vfx.com',
    twitter: '@accessvfx',
    isVerifiedGroup: '1',
    groupavatarurl: '/avfx-avatar-20.png',
    channels: [
      {name: 'mentor-general', type: 'general', about: 'A great place to chit chat with other E-Mentors', chlid: '12345', allowed: ["pr", "mentor"]}
    ]
  }
  const groupUsers = {
    users: {
      count: 104,
      usersList: [
        {uid: '12345', fname: 'simon', profilePic: '', founder: 1, mentor: 1, mentee: 1}
      ]
    }
  }*/
  render() {
    const {group, groupUsers} = this.props;
    const {showOnly20Users, isLoading} = this.state;

    const userList = showOnly20Users ? groupUsers.users.usersList.slice(0,20) : groupUsers.users.usersList;
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
      userList.forEach((user) => {
        users.push(
          <UserListItem
            key={user.uid}
            user={user}
            founders={group.founder}
            pms={group.pm}
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
          {(showOnly20Users || (!showOnly20Users && (users.length != userList.length))) && (
            <button className="showMore" type="button" onClick={this.showAllUsers} disabled={isLoading === true ? true : false}>
              {isLoading === true && (
                <LoadingSpinner />
              )}
              {isLoading != true && (
                <span>Show all {groupUsers.users.count} users</span>
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default GroupUsers;
