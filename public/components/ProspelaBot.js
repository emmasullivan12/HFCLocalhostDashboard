// Dex last merged this code on 11th nov 2020 

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
      founder: ["223456"],
      pm: ["223457"],
      website: 'https://www.access-vfx.com',
      twitter: '@accessvfx',
      isVerifiedGroup: '1',
      groupavatarurl: '/avfx-avatar.png',
      channels: [
        {name: 'mentor-general', type: 'general', about: '', chlid: '12345', allowed: ['pr', 'mentor', 'mentee']},
        {name: 'docs', type: 'resources', about: '', chlid: '12346', allowed: ['pr', 'mentor', 'mentee']}
      ]
    }

    const groupUsers = {
      users: {
        count: 104,
        usersList: [
          {uid: '223456', fname: 'simon', lname: 'Devereux', profilePic: '', founder: 1, mentor: 1},
          {uid: '223457', fname: 'emma', lname: 'Moonraker', profilePic: '', pm: 1, mentor: 1},
          {uid: '223458', fname: 'emma-prospela', lname: '', profilePic: '', pr: 1},
          {uid: '223459', fname: 'dexter-prospela', lname: '', profilePic: '', pr: 1},
          {uid: '223460', fname: 'penny-prospela', lname: '', profilePic: '', pr: 1},
          {uid: '223461', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '99999', fname: 'me mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223462', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223463', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223464', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223465', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223466', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223467', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223468', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223469', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223470', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223471', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223472', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223473', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223474', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223475', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223476', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223477', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223478', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223479', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223480', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223481', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223482', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223483', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223484', fname: 'mentor', lname: 'user', profilePic: '', mentor: 1},
          {uid: '223455', fname: 'mentee', lname: 'user', profilePic: '', mentee: 1},
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
          channelAllowed={group.channels[0].allowed}
          flexContent={isGroup ? (
            <GroupFlexContent
              group={group}
              groupUsers={groupUsers}
            />
          )
          //: <MtchdUsrProfile />
          : null
          }
          className="chatWindowContainer"
          isGroup={isGroup}
          founders={group.founder} // add group[0] when merge code
          pms={group.pm} // add group[0] when merge code
        />
      </React.Fragment>
    );
  }
}

export default ProspelaBot;
