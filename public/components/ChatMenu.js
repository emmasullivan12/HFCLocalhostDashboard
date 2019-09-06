// Dex last merged this code on 27th Aug 2019

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

import FullPageModal from './FullPageModal.js';
import Modal from './Modal.js';
import MentorProfileContent from './MentorProfileContent.js';
import MenteeProfileContent from './MenteeProfileContent.js';
import AddChatModalContent from './AddChatModalContent.js';
import "../css/Modal.css";

const MentorProfileModalProps = {
  ariaLabel: 'View Mentor Profile',
  triggerText: 'View Mentor Profile',
  usedFor: 'mentor-profile',
  backBtn: 'arrow'
}

const MenteeProfileModalProps = {
  ariaLabel: 'View Mentee Profile',
  triggerText: 'View Mentee Profile',
  usedFor: 'mentee-profile',
  backBtn: 'arrow'
}

const AddChatModalProps = {
  ariaLabel: 'Start a new DM with a specific user',
  triggerText: 'Start a DM',
  usedFor: 'addPrDM',
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
    const {userRole, chatGroup} = this.props;
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
          <div className="chatMenu-header overflow-ellipsis">
            {chatGroup}
            {chatGroup === 'Prospela DMs' && (
              <Modal {...AddChatModalProps}>
                <AddChatModalContent />
              </Modal>
            )}
          </div>
          {chats}
          {userRole != 'prospela' && (
            <React.Fragment>
              <div className="chatMenuItem">
                <NavLink to="/prospelahomepage" className="chatMenuLink overflow-ellipsis">Prospela Homepage</NavLink>
              </div>
              <FullPageModal {...MentorProfileModalProps}>
                <MentorProfileContent />
              </FullPageModal>
              <FullPageModal {...MenteeProfileModalProps}>
                <MenteeProfileContent />
              </FullPageModal>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ChatMenu;
