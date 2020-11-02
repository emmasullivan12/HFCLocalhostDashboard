// Dex last merged this code on 2nd nov 2020

import React, { Component } from "react";

import cdn from './CDN.js';
import UserList from './UserList.js';

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
    const {group} = this.props;

    return (
      <div className="group-about-container">
        <div className="groupName-flexContainer">

          {group.pm && (
            <React.Fragment>
              <div>
                Admin
              </div>
              <UserList
                userGroup='pm'
                userList={
                  {userid: group.pm},
                  {userid: 'pr'},
                  {userid: 'penny-pr'}
                }
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default GroupUsers;
