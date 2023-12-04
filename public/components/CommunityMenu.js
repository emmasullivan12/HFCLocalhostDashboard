// Dex last merged this code on 4th dec 2023

import React, { Component } from "react";
import "../css/ChatMenu.css";
import "../css/General.css";
import {
  Route,
  NavLink
} from "react-router-dom";

import Modal from './Modal.js';
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';
import {getIndustryDeets, getSkillDeets} from './UserDetail.js';
import "../css/Modal.css";

const JoinProgrammeModalProps = {
  ariaLabel: 'Join a live Group',
  triggerText: '+ Join a Huddle',
  usedFor: 'joinProg',
  changeInitFocus: true
}
const JoinProgrammePlusModalProps = {
  ariaLabel: 'Join a live Group',
  triggerText: 'Join a Group',
  usedFor: 'joinProgSml',
  changeInitFocus: true
}

// This shows the content within an individual row in the ChatMenu
class CommunityListItem extends Component {
  constructor () {
    super();
    this.state = {
      isOverflowing: false,
    }
  }

  componentDidMount() {
    const {group, type} = this.props;

    const element = this.groupItem;
    const isOverflowing = element.offsetWidth < element.scrollWidth
    this.setState({
      isOverflowing: isOverflowing
    })
  }

  render() {
    const {isOverflowing} = this.state;
    const {group, type, onClick} = this.props;
    let groupName, navlink, industryItem, groupIcon

    if (type == 'industry') {
      industryItem = getIndustryDeets(group.gid)
      groupIcon = industryItem.fa
      groupName = industryItem.label
      navlink = `/community/industry/${industryItem.urlText}`
    } else {
      let skillItem
      skillItem = getSkillDeets(group.gid)
      groupName = skillItem.label
      navlink = `/community/skills/${skillItem.urlText}`
    }

    return(
      <NavLink to={navlink} activeClassName="is-active" className="chatMenuItem huddle link" onClick={onClick}>
        <div className="groupMenuItemContainer">
          <div className="groupMenuItem">
            <div className={"groupsAvatarContainer" + (type == 'industry' ? ' industry' : '')}>
              {type == 'industry' && (
                <i className={groupIcon} alt="Industry Icon" />
              )}
              {type == 'skills' && (
                <div className="presenceContainer">
                  <i className="fas fa-circle" />
                </div>
              )}
            </div>
            <div className={"chatItemFlexContainer" + (isOverflowing ? " tooltip" : "")}>
              <span ref={n => this.groupItem = n} className="chatMenuLink huddle overflow-ellipsis">{groupName}</span>
              {isOverflowing && (
                <span className="tooltiptext chats">
                  {groupName}
                </span>
              )}
            </div>
          </div>
        </div>
      </NavLink>
    )
  }
}

// This shows the logged in user's direct messages with Prospela, active mentors, and old mentors
class CommunityMenu extends Component {
  render() {
    const {userRole, onClick, checkHasAccess, noAccessHandler, type, groups} = this.props;
    const groupsArr = [];

    if (groups.length == 0) {
      groupsArr.push(
        <div>
          <div className="chatMenuPlaceholder overflow-ellipsis">
            <div className="presenceContainer placeholder">
              <i className="fas fa-circle" />
            </div>
            Your {type} huddles will appear here...
          </div>
        </div>
      );
    } else {

      groups.sort((a,b) => {
        if(a.groupname < b.groupname) { return -1; }
        if(a.groupname > b.groupname) { return 1; }
        return 0;
      });

      groups.forEach((group) => {
        groupsArr.push(
          <CommunityListItem
            group={group}
            type={type}
            key={group.gid}
            onClick={onClick}
          />
        );
      });
    }

    return (
      <React.Fragment>
        <div className="chatMenu">
          <div className="chatMenu-header overflow-ellipsis">
            <div>
              {type == 'industry' ? 'Industry Huddles' : 'Skills Huddles'}
              <span className="menuItemIconContainer huddle">
                <i className="fas fa-user-friends" />
              </span>
              <div className="menuCTAContainer">
                <Modal {...JoinProgrammePlusModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
                  <div>Join a Huddle modal coming soon</div>
                </Modal>
              </div>
            </div>
          </div>
          {groupsArr}
        </div>
      </React.Fragment>
    );
  }
}

export default CommunityMenu;
