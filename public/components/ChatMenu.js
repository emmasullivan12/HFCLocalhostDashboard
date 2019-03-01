import React, { Component } from "react";
import "../css/ChatMenu.css";
import {
  Route,
  NavLink
} from "react-router-dom";

// This shows the content within an individual row in the ChatMenu
class ChatListItem extends Component {
  render() {
    const chat = this.props.chat;

    return(
      <div className="chatMenuItem">
        <div className="presenceContainer">
          <i className="fa fa-circle" />
        </div>
        <NavLink to={this.props.navlink} className="chatMenuLink overflow-ellipsis">{chat.mentor}</NavLink>
      </div>
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
      <React.Fragment>
        <div className="chatMenu">
          <div className="chatMenu-header">Direct Messages</div>
          <div className="chatMenuItem">
            <div className="presenceContainer">
              <i className="fa fa-heart" />
            </div>
            <NavLink to="/messages/Prospela" className="chatMenuLink">Prospela Bot</NavLink>
          </div>
          {chats}
          <div className="chatMenuItem"><NavLink to="/messages/chat1" className="chatMenuLink">Chat with Mentor 1</NavLink></div>
          <div className="chatMenuItem"><NavLink to="/messages/chat2" className="chatMenuLink">Chat with Mentor 2</NavLink></div>
          <div className="chatMenuItem"><NavLink to="/prospelahomepage" className="chatMenuLink">Prospela Homepage</NavLink></div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatMenu;
