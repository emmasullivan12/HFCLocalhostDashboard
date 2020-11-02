// Dex last merged this code on 2nd nov 2020

import React, { Component } from "react";
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
    const {userName, userUID, isProspela, showOnline} = this.props;
    const senderRole = 'mentor';
    const myUid = '12345';
    const isMe = userUID === myUid ? 'isMe' : 'isntMe';

    return (
      <React.Fragment>
        <span className={"sender-name" + (isProspela ? ' isProspela' : '') + (showOnline == true ? ' showOnline' : '')}>{userName}</span>
      {/*  {isMe === 'isMe' ? (
          <span className="sender-name">{userName}</span>
          )
          : null
        }
*/}
  {  /*      : senderRole === 'mentee' ? (
            <FullPageModal {...MenteeProfileUsrNameModalProps} triggerText={userName}>
              <MenteeProfileContent />
            </FullPageModal>
            )
          : (
            <FullPageModal {...MentorProfileUsrNameModalProps} triggerText={userName}>
              <MentorProfileContent />
            </FullPageModal>
          )
*/}   </React.Fragment>
    );
  }
}

export default UserName;
