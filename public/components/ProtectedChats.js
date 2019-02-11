import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProspelaBot from "./ProspelaBot";

// This shows the content within an individual row in the ChatMenu
class ChatListItem extends Component {
  render() {
    const chat = this.props.chat;

    return(
      <ProtectedRoute path={this.props.navlink} roleAllowed="mentor" userRole="mentor" component={ProspelaBot} />
    );
  }
}

// This shows the logged in user's direct messages with Prospela, active mentors, and old mentors
class ProtectedChats extends Component {
  render() {
    const chats = [];

    this.props.chats.forEach((chat) => {
      chats.push(
        <ChatListItem
          chat={chat}
          key={chat.chatID}
          navlink={`/messages/${chat.chatID}`}
        />
      );
    });

    return (
      <div>
        {chats}
      </div>
    );
  }
}

export default ProtectedChats;
