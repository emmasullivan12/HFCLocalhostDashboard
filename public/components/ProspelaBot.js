// Dex last merged this code on 25th oct 2020

import React, { Component } from "react";
import ChatWindow from './ChatWindow.js';
import GroupFlexContent from './GroupFlexContent.js';
import MtchdUsrProfile from './MtchdUsrProfile.js';
import "../css/ProspelaBot.css";

class ProspelaBot extends Component {
  render() {
    const {isGroup} = this.props
    const group = {
      groupname: "Access:VFX",
      about: "this is about text here about avfx and what our mission is! I will explain a bit more about what we do and why, but similar length to a twitter bio",
      datecreated: '2020-09-01T13:30:50.667Z',
      founder: ["123456"],
      pm: ["223457"],
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
          {uid: '123456', fname: 'simon', profilePic: '', founder: 1},
          {uid: '223457', fname: 'emma', profilePic: '', pm: 1},
        ]
      }
    }

    return (
      <React.Fragment>
        <ChatWindow
          groupName={group.groupname}
          channelName={group.channels[0].name} // Cant use foreach here ...Find from Redux ... will also use to decide what to show in flex container for different channels if we decide they are different
          channelType={group.channels[0].type} // Find from Redux ... will also use to decide what to show in flex container for different channels if we decide they are different
          channelAbout={group.channels[0].about} // Find from Redux ... will also use to decide what to show in flex container for different channels if we decide they are different
          flexContent={isGroup ? (
            <GroupFlexContent
              group={group}
              groupUsers={groupUsers}
            />
          )
          : <MtchdUsrProfile />
          }
          className="chatWindowContainer"
          isGroup={isGroup}
        />
      </React.Fragment>
    );
  }
}

export default ProspelaBot;
