// Dex last merged this code on 28th Oct 2019

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
    const {msgAuthor, senderUID} = this.props;
    const senderRole = 'mentor';
    const myUid = '12345';
    const isMe = senderUID === myUid ? 'isMe' : 'isntMe';

    return (
      <React.Fragment>
        <span className="sender-name">{msgAuthor}</span>
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
