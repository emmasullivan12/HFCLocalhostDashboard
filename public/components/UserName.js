// Dex last merged this code on 19th sept 2020

import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";
import MenteeProfileContent from './MenteeProfileContent.js';
import MentorProfileContent from './MentorProfileContent.js';
import FullPageModal from './FullPageModal.js';

import "../css/General.css";
import "../css/Modal.css";


const MenteeProfileUsrNameModalProps = {
  ariaLabel: 'View Mentee Profile',
//  triggerText: 'View Mentee Profile',
  usedFor: 'mentee-usrName-profile',
  backBtn: 'arrow'
}

const MentorProfileUsrNameModalProps = {
  ariaLabel: 'View Mentor Profile',
//  triggerText: 'Profile',
  usedFor: 'mentor-usrName-profile',
  backBtn: 'arrow'
}

class UserName extends Component {
  render() {
    const {msgAuthor, senderUID, subtype} = this.props;
    const senderRole = 'mentor';
    const myUid = '12345';
    const prospelaID = '55555';
    const isProspela = (subtype === 'welcome' || subtype === 'prAuto' || senderUID === prospelaID)
    const isMe = senderUID === myUid ? 'isMe' : 'isntMe';

    return (
      <React.Fragment>
        <span className={"sender-name " + (isProspela ? ' isProspela' : null)}>{msgAuthor}</span>
      {/*  {isMe === 'isMe' ? (
          <span className="sender-name">{msgAuthor}</span>
          )
          : null
        }
*/}
  {  /*      : senderRole === 'mentee' ? (
            <FullPageModal {...MenteeProfileUsrNameModalProps} triggerText={msgAuthor}>
              <MenteeProfileContent />
            </FullPageModal>
            )
          : (
            <FullPageModal {...MentorProfileUsrNameModalProps} triggerText={msgAuthor}>
              <MentorProfileContent />
            </FullPageModal>
          )
*/}   </React.Fragment>
    );
  }
}

export default UserName;
