// Dex last merged this code on 10th August 2019

import React, { Component } from "react";
import ChatWindow from './ChatWindow.js';
import GroupFlexContent from './GroupFlexContent.js';
import MtchdUsrProfile from './MtchdUsrProfile.js';
import "../css/ProspelaBot.css";

class ProspelaBot extends Component {
  render() {
    const {isGroup} = this.props

    return (
      <React.Fragment>
        <ChatWindow flexContent={isGroup ? GroupFlexContent : MtchdUsrProfile} className="chatWindowContainer" isGroup={isGroup}/>
      </React.Fragment>
    );
  }
}

export default ProspelaBot;
