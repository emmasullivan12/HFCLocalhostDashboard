// Dex last merged this code on 20th oct 2020

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

import Modal from './Modal.js';
import AddChatModalContent from './AddChatModalContent.js';
import "../css/Modal.css";

const AddChatModalProps = {
  ariaLabel: 'Start a new DM with a specific user',
  triggerText: 'Start a DM',
  usedFor: 'addPrDM',
  changeInitFocus: true
}

// This shows the content within an individual row in the ChatMenu
class ChatListItem extends Component {

  render() {
    const {chat, navlink, onClick} = this.props;
    const isOnline = false;
    const unread = false
    // <NavLink to={navlink} activeClassName="is-active" className="chatMenuItem link" onClick={closeMenu}>

    return(
      <NavLink to={navlink} activeClassName="is-active" className="chatMenuItem link" onClick={onClick}>
        <div className="presenceContainer">
          <i className={isOnline ? "fas fa-circle" : "far fa-circle"} />
        </div>
        <div className="chatItemFlexContainer">
          <span className={"chatMenuLink overflow-ellipsis"+(unread ? ' unread' : null)}>{chat.mentor}</span>
          <span className="notificationNum">xx</span>
        </div>
      </NavLink>
    )
  }
}

// This shows the logged in user's direct messages with Prospela, active mentors, and old mentors
class ChatMenu extends Component {
  render() {
    const {userRole, chatGroup, onClick} = this.props;
    const chats = [];

    if (this.props.chats.length == 0) {
      chats.push(
        <div className="chatMenuPlaceholder overflow-ellipsis">
          <div className="presenceContainer placeholder">
            <i className="fas fa-circle" />
          </div>
          Your DMs will appear here...
        </div>
      );
    } else {
      this.props.chats.forEach((chat) => {
        chats.push(
          <ChatListItem
            chat={chat}
            key={chat.chatid}
            navlink={`/messages/${chat.chatid}`}
            onClick={onClick}
          />
        );
      });
    }

    return (
      <React.Fragment>
        <div className="chatMenu">
          <div className="chatMenu-header overflow-ellipsis">
            {chatGroup}
            <span className="menuItemIconContainer chat">
              <i className="fas fa-comment-dots" />
            </span>
            {chatGroup === 'Prospela DMs' && (
              <Modal {...AddChatModalProps}>
                <AddChatModalContent />
              </Modal>
            )}
          </div>
          {chats}
        {/*  {userRole != 'prospela' && (
            <React.Fragment>
              <div className="chatMenuItem">
                <NavLink to="/prospelahomepage" className="chatMenuLink overflow-ellipsis" onClick={closeMenu}>Prospela Homepage</NavLink>
              </div>
            </React.Fragment>
          )}*/}
        </div>
      </React.Fragment>
    );
  }
}

export default ChatMenu;
