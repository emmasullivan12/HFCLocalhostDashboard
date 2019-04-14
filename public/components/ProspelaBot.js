import React, { Component } from "react";
import ChatWindow from './ChatWindow.js';
import MtchdUsrProfile from './MtchdUsrProfile.js';
import "../css/ProspelaBot.css";

const matchesProfile = (
  <MtchdUsrProfile/>
)

class ProspelaBot extends Component {
  render() {
    return (
      <React.Fragment>
        <ChatWindow flexContent={matchesProfile} className="chatWindowContainer" />
      </React.Fragment>
    );
  }
}


export default ProspelaBot;
