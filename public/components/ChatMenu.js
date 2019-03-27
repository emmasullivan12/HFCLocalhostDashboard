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
    const isOnline = false;

    return(
      <div className="chatMenuItem">
        <NavLink to={this.props.navlink} className="link">
          <div className="presenceContainer">
            <i className={isOnline ? "fas fa-circle" : "far fa-circle"} />
          </div>
          <div className="chatItemFlexContainer">
            <span className="chatMenuLink overflow-ellipsis">{chat.mentor}</span>
            <span className="notificationNum">xx</span>
          </div>
        </NavLink>
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
          <div className="chatMenu-header overflow-ellipsis">Direct Messages</div>
          <div className="chatMenuItem">
            <NavLink to="/messages/Prospela" className="link">
              <div className="presenceContainer">
                <i className="fas fa-heart" />
              </div>
              <div className="chatItemFlexContainer">
                <span className="chatMenuLink overflow-ellipsis">Prospela Bot</span>
                <span className="notificationNum">xx</span>
              </div>
            </NavLink>
          </div>
          {chats}
          <div className="chatMenuItem"><NavLink to="/prospelahomepage" className="chatMenuLink overflow-ellipsis">Prospela Homepage</NavLink></div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatMenu;
