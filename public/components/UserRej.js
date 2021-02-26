// Dex last merged this code on 26th feb 2021
import React, { Component } from "react";

import Avatar from './Avatar.js';
import Modal from './Modal.js';
import AddNotesOnUserContent from './AddNotesOnUserContent.js';
import UserBadge from './UserBadge.js';
import UserName from './UserName.js';
import TextParser from './TextParser.js';
import {usercdn, userAvatarsFolder} from './CDN.js';

function TimeCalc(props) {
  var ts = new Date(props.time);
  var hour = ts.getHours();
  var min = ts.getMinutes();
  var ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  min = min >= 0 && min < 10 ? '0'+min : min;
  var timeTxt = hour + ':' + min + ' ' + ampm;
  return timeTxt;
}

// This includes props and title to be passed to PassMentorModal
const AddNotesProps = {
  ariaLabel: 'Add notes on user',
  triggerText: 'Add Notes on User',
  usedFor: 'addNotesBtn',
  changeInitFocus: true
}

class UserRej extends Component {

  render() {
    const {message, isProspelaAuto, isProspelaTeam} = this.props;

    const matchDetail = [
      {
        matchid: '12343',
        menteeuid: '123',
        mentoruid: '234',
        matchedby: 'pennyid',
        status_of_match: '1', // will be numbers i.e. 1 = 'profile sent', 2 = 'mentee timed out', 3 = 'mentee accepted', 4 = 'mentee rejected', 5 = 'mentor timed out', 6 = 'mentor accepted', 7 = 'mentor rejected'
        chasers: {
          type: 1, dateSent: '' // to be completed
        },
        date_matched: '1995-01-01T00:00:00.000Z',
        mentee_to_reply_by: '1995-01-04T00:00:00.000Z',
        mentee_replied_date: '1995-01-03T00:00:00.000Z',
        mentee_request_message: '',
        mentor_reply_by: '',
        mentor_replied_date: '1995-01-05T00:00:00.000Z',
        match_comments: 'Guy has really good Houdini skills - exactly what you wanted!',
        mentee_pass_comments: 'Sorry I really want someone with Football skills',
        mentor_pass_comments: 'Sorry I dont think this mentee is appropriate',
      }
    ]
    const matchid = matchDetail[0].matchid;
    const userToMatch = [
      {
        uid: '12343',
        fname: 'Boris',
        lname: 'Johnson',
        notesOnUser: 'these are existing notes on Boris (Mentee)'
      }
    ]
    const potentialMatch = [
      {
        uid: '12343',
        fname: 'Guy',
        lname: 'De Rosa',
        notesOnUser: 'these are existing notes on GUY (Mentor)'
      }
    ]
    let userProfileToShow;

    // If mentee is rejecting mentor
    if (message.subtype == 'menteeRej') {

      // Bring back mentee deets
      userProfileToShow = userToMatch[0]

    // If mentor is rejecting mentee
    } else if (message.subtype == 'mentorRej') {

      // Bring back mentor deets
      userProfileToShow = potentialMatch[0]
    }

    const notesOnUser = userProfileToShow.notesOnUser;
    const username = userProfileToShow.fname + ' ' + userProfileToShow.lname;
    const rejReason = message.subtype == 'menteeRej' ? matchDetail[0].mentee_pass_comments : matchDetail[0].mentor_pass_comments
    const rejReasonText = '~*REJECTED MATCH*~ \n\nReason: _"' + rejReason + '"_ ';
    const loggedInUserIsPr = true;

    return (
      <div className="block-container">
        <div className="message-container">
          <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} />
              <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
            </div>
            <div className="message-content">
              <TextParser text={rejReasonText}/>
            </div>
            {loggedInUserIsPr == true && (
              <div className="messageCTA">
                <div className="messageCTABtns">
                  <Modal {...AddNotesProps}>
                    <AddNotesOnUserContent uid={message.uid} notesOnUser={notesOnUser} username={username}/>
                  </Modal>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserRej;
