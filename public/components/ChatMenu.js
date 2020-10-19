// Dex last merged this code on 15th oct 2020

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  Link
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
    const {chat, navlink, updateActiveMenu, menuItemActive} = this.props;
    const isOnline = false;
    const unread = false
    // <NavLink to={navlink} activeClassName="is-active" className="chatMenuItem link" onClick={closeMenu}>

    return(
      <Link to={navlink} id={chat.chatid} className={"chatMenuItem link" + (menuItemActive === chat.chatid ? ' is-active' : "")} onClick={updateActiveMenu}>
        <div className="presenceContainer">
          <i className={isOnline ? "fas fa-circle" : "far fa-circle"} />
        </div>
        <div className="chatItemFlexContainer">
          <span className={"chatMenuLink overflow-ellipsis"+(unread ? ' unread' : null)}>{chat.mentor}</span>
          <span className="notificationNum">xx</span>
        </div>
      </Link>
    )
  }
}

// This shows the logged in user's direct messages with Prospela, active mentors, and old mentors
class ChatMenu extends Component {
  render() {
    const {userRole, chatGroup, updateActiveMenu, menuItemActive} = this.props;
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
            updateActiveMenu={updateActiveMenu}
            menuItemActive={menuItemActive}
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
