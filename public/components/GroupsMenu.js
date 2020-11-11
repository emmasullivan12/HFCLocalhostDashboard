// Dex last merged this code on 11th nov 2020

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

import {cdn, groupImgFolder} from './CDN.js';
import Modal from './Modal.js';
import AddChatModalContent from './AddChatModalContent.js';
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';
import {getIcon, getUnreadIndicator} from './GeneralFunctions.js';
import "../css/Modal.css";

/*const JoinProgrammeModalProps = {
  ariaLabel: 'Join a live Group',
  triggerText: 'Join a Group',
  usedFor: 'joinProg',
  changeInitFocus: true
}*/

const JoinProgrammePlusModalProps = {
  ariaLabel: 'Join a live Group',
  triggerText: 'Join a Group',
  usedFor: 'joinProgSml',
  changeInitFocus: true
}

// This shows the content within an individual row in the ChatMenu
class GroupListItem extends Component {
  constructor () {
    super();
    this.state = {
      showChannels: true,
    }
  }

  componentDidMount() {
    const {group} = this.props;
    // Set height of channelsContainer for click animation to work properly
    const numChannels = this.props.channels.length
    const channelContainerHeight = (numChannels * 25) + 12 /* 25px oer chatMenuItem + 12px margin on last item */
    document.getElementById(group.groupname + "-channels").style.height = channelContainerHeight + "px"
  }

  toggleGroupChannels = (e) => {
    this.setState(prevState => ({
      showChannels: !prevState.showChannels
    }));
  }

  render() {
    const {showChannels} = this.state;
    const {group, onClick} = this.props;
    const groupAvatarURL = group.groupavatarurl_20
    const isGroupAvatarURL = groupAvatarURL != null
    const unreadCount = 10;

    let navlink
    let progLogo
    let groupInitial

    const channels = []

    if (isGroupAvatarURL) {
      progLogo = cdn + '/' + groupImgFolder + groupAvatarURL
    } else {
      groupInitial = group.groupname.charAt(0).toUpperCase();
    }

    this.props.channels.forEach((channel) => {
      navlink = `/community/${group.gid}/${channel.chlid}`

      const icon = getIcon(channel.type)

      channels.push(
        <NavLink to={navlink} activeClassName="is-active" className="chatMenuItem link group" onClick={onClick}>
          <div className="presenceContainer group">
            {icon}
          </div>
          <div className="chatItemFlexContainer">
            <span className="chatMenuLink channel overflow-ellipsis">{channel.name}</span>
            {unreadCount != 0 && (
              getUnreadIndicator(unreadCount, true)
            )}
          </div>
        </NavLink>
      );
    });

    return(
      <div className="groupMenuItemContainer">
        <div className="groupMenuItem">
          <div className={"groupsAvatarContainer "+(isGroupAvatarURL ? "" : "noImg")}>
            {isGroupAvatarURL === true ?
              <img className="logoImg" alt="Initiative Logo" src={progLogo}/>
            : groupInitial
            }
          </div>
          <div className="chatItemFlexContainer">
            <span className="chatMenuLink overflow-ellipsis">{group.groupname}</span>
        {/*    <span className="notificationNum announcement">COMING SOON!</span> */}
            <span className="menuNavCTA" onClick={this.toggleGroupChannels}>
              {showChannels == true ?
                'Hide'
              : 'Show'
              }
            </span>
          </div>
        </div>
        <div className="channelsContainer">
          <div className={"showChannels" + (showChannels == true ? '' : ' hidden')} id={group.groupname + "-channels"}>
            {channels}
          </div>
        </div>
      </div>
    )
  }
}

// This shows the logged in user's direct messages with Prospela, active mentors, and old mentors
class GroupsMenu extends Component {
  render() {
    const {userRole, onClick} = this.props;
    const groups = [];

    if (this.props.groups.length == 0) {
      groups.push(
        <div className="chatMenuPlaceholder overflow-ellipsis">
          <div className="presenceContainer placeholder">
            <i className="fas fa-circle" />
          </div>
          Your Groups will appear here...
        </div>
      );
    } else {
      this.props.groups.forEach((group) => {
        groups.push(
          <GroupListItem
            group={group}
            key={group.gid}
            channels={group.channels}
            onClick={onClick}
          />
        );
      });
    }

    return (
      <React.Fragment>
        <div className="chatMenu">
          <div className="chatMenu-header overflow-ellipsis">
            My Groups
            <span className="menuItemIconContainer">
              <i className="fas fa-plug" />
            </span>
            <div className="menuCTAContainer">
              <Modal {...JoinProgrammePlusModalProps}>
                <JoinProgrammeModalContent />
              </Modal>
            </div>
          </div>
          {groups}
        </div>
      </React.Fragment>
    );
  }
}

export default GroupsMenu;
