// Dex last merged this code on 2nd nov 2020

import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

import Avatar from './Avatar.js';
import UserName from './UserName.js';

class UserListItem extends Component {
  render() {
    const {user, userName, isProspela} = this.props;
    const isOnline = false;

    return(
      <div className="groupMenuItem">
        <Avatar userID={user.uid} userName={userName} isProspela={isProspela}/>
        <UserName userName={userName} userUID={user.uid} isProspela={isProspela}/>
      </div>
    )
  }
}

class UserList extends Component {
  render() {
    const {userList, userGroup} = this.props
    /*userList={
      {userid: group.pm, userGroup: 'pm'},
      {userid: 'pr', userGroup: 'pm'},
      {userid: 'penny-pr', userGroup: 'pm'}
    }*/

    const users = [];

    if (userGroup != 'founder' && userGroup != 'pm') {
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

          // Look up userName
          const userName = 'fname'
          const isProspela = user.userid === 'pr'

          users.push(
            <UserListItem
              key={user.userid}
              user={user}
              userName={userName}
              isProspela={isProspela}
            />
          );
        });
      }
    }

    return (
      <React.Fragment>
        <div className="chatMenu">
          {(userList.length != 0 || (userGroup != 'founder' && userGroup != 'pm')) && (
            <div className="chatMenu-header overflow-ellipsis">
              {userGroup}
            </div>
          )}
          {users}
        </div>
      </React.Fragment>
    );
  }
}

export default UserList;
