// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

import FullPageModal from './FullPageModal.js';
import SettingsContent from './SettingsContent.js';
import "../css/Modal.css";

const SettingsModalProps = {
  ariaLabel: 'Popup to manage your preferences and settings',
  triggerText: 'Preferences & Settings',
  usedFor: 'settings'
}

// This shows the content within an individual row in the ChatMenu
class ChatListItem extends Component {
  render() {
    const chat = this.props.chat;
    const isOnline = false;

    return(
      <NavLink to={this.props.navlink} activeClassName="is-active" className="chatMenuItem link">
        <div className="presenceContainer">
          <i className={isOnline ? "fas fa-circle" : "far fa-circle"} />
        </div>
        <div className="chatItemFlexContainer">
          <span className="chatMenuLink overflow-ellipsis">{chat.mentor}</span>
          <span className="notificationNum">xx</span>
        </div>
      </NavLink>
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
          <NavLink to="/messages/Prospela" activeClassName="is-active" className="chatMenuItem link">
            <div className="presenceContainer">
              <i className="fas fa-heart" />
            </div>
            <div className="chatItemFlexContainer">
              <span className="chatMenuLink overflow-ellipsis">Prospela Bot</span>
              <span className="notificationNum">xx</span>
            </div>
          </NavLink>
          {chats}
          <div className="chatMenuItem"><NavLink to="/prospelahomepage" className="chatMenuLink overflow-ellipsis">Prospela Homepage</NavLink></div>
          <FullPageModal {...SettingsModalProps}>
            <SettingsContent />
          </FullPageModal>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatMenu;
