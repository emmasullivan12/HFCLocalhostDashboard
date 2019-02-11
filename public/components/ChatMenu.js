import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";

// This shows the content within an individual row in the ChatMenu
class ChatListItem extends Component {
  render() {
    const chat = this.props.chat;

    return(
      <li><NavLink to={this.props.navlink}>{chat.mentor}</NavLink></li>
    )
  }
}

// This shows the logged in user's direct messages with Prospela, active mentors, and old mentors
class ChatMenu extends Component {
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
        <ul className="chatMenu">
          <li><NavLink to="/messages/Prospela">Prospela Bot</NavLink></li>
          <li><NavLink to="/messages/chat1">Chat with Mentor 1</NavLink></li>
          <li><NavLink to="/messages/chat2">Chat with Mentor 2</NavLink></li>
        </ul>
        <ul className="chatMenu">
          {chats}
        </ul>
      </div>
    );
  }
}

export default ChatMenu;
