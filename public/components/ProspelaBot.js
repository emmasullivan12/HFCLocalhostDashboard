// Dex last merged this code on 25th oct 2020

import React, { Component } from "react";
import ChatWindow from './ChatWindow.js';
import GroupFlexContent from './GroupFlexContent.js';
import MtchdUsrProfile from './MtchdUsrProfile.js';
import "../css/ProspelaBot.css";

class ProspelaBot extends Component {
  render() {
    const {isGroup} = this.props
    const groupName = 'Access:VFX'
    const channelName = 'mentor-general'
    const channelType = 'general' // Find from Redux ... will also use to decide what to show in flex container for different channels if we decide they are different
    const channelAbout = 'A great place to chit chat with other E-Mentors'

    return (
      <React.Fragment>
        <ChatWindow
          groupName={groupName}
          channelName={channelName}
          channelType={channelType}
          channelAbout={channelAbout}
          flexContent={isGroup ?
            <GroupFlexContent />
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
