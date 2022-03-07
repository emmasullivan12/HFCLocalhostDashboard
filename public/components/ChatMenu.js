// Dex last merged this code on 7th mar 2022

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

import Modal from './Modal.js';
import {getUnreadIndicator} from './GeneralFunctions.js';
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
  constructor(props) {
    super(props);
    this.state= {
      isOverflowing: false,
      chatname: '',
    }
  }

  componentDidMount() {
    const {chat} = this.props;
    const mentorFName = chat.mentor;
    const menteeFName = chat.mentee;
    this.setState({
      chatname: mentorFName[0].toLowerCase() + mentorFName.substring(1) + '-and-' + menteeFName[0].toLowerCase() + menteeFName.substring(1),
    }, () => {
      const element = this.chatItem;
      const isOverflowing = element.offsetWidth < element.scrollWidth
      this.setState({
        isOverflowing: isOverflowing
      })
    })
  }

  render() {
    const {navlink, onClick} = this.props;
    const {chatname, isOverflowing} = this.state;
    const isOnline = false;
    const unread = false;
    const unreadCount = null;

    return(
      <NavLink to={navlink} activeClassName="is-active" className="chatMenuItem link" onClick={onClick}>
        <div className="presenceContainer">
          <i className={isOnline ? "fas fa-circle" : "far fa-circle"} />
        </div>
        <div className={"chatItemFlexContainer" + (isOverflowing ? " tooltip" : "")}>
          <div ref={n => this.chatItem = n} className={"chatMenuLink overflow-ellipsis "+(unread ? 'unread' : null)}>
            {chatname}
          </div>
          {isOverflowing && (
            <span className="tooltiptext chats">
              {chatname}
            </span>
          )}
          {unreadCount != 0 && (
            getUnreadIndicator(unreadCount, false, isOverflowing)
          )}
        </div>
      </NavLink>
    )
  }
}

// This shows the logged in user's direct messages with Prospela, active mentors, and old mentors
class ChatMenu extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showAddChatModal: true,
    }
  }

  closeAddChatModal = () => {
    this.setState({
      showAddChatModal: false
    });
  }

  resetAddChatModal = () => {
    this.setState({
      showAddChatModal: true
    });
  }

  render() {
    const {userRole, chatGroup, isProspelaTeam, onClick} = this.props;
    const {showAddChatModal} = this.state;
    const chats = [];

  /*  if (this.props.chats.length == 0) {
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
    }*/

    return (
      <React.Fragment>
        <div className="chatMenu">
          <div className="chatMenu-header overflow-ellipsis">
            {chatGroup}
            <span className="menuItemIconContainer chat">
              <i className="fas fa-comment-dots" />
            </span>
            {isProspelaTeam == true && showAddChatModal == true && (
              <div className="menuCTAContainer">
                <Modal {...AddChatModalProps} manualCloseModalNotTrigger handleLocalStateOnClose={this.resetAddChatModal}>
                  <AddChatModalContent
                    closeModal={this.closeAddChatModal}
                  />
                </Modal>
              </div>
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
