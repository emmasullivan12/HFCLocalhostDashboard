// Dex last merged this code on 5th feb 2021
import React, { Component } from "react";

import Avatar from './Avatar.js';
import Modal from './Modal.js';
import RequestChatContent from './RequestChatContent.js';
import PassMentorContent from './PassMentorContent.js';
import UserBadge from './UserBadge.js';
import UserName from './UserName.js';
import TextParser from './TextParser.js';
import {X, Check} from './GeneralFunctions.js';
import {usercdn, userAvatarsFolder} from './CDN.js';
import {userFlagEmoji} from './UserDetail.js';

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

const RequestChatModalProps = {
  ariaLabel: 'Popup to request chat with matched E-Mentor',
  triggerText: 'Accept',
  usedFor: 'RequestChat',
  changeInitFocus: true
}

// This includes props and title to be passed to PassMentorModal
const PassModalProps = {
  ariaLabel: 'Pass on matched E-Mentor',
  triggerText: 'Pass',
  usedFor: 'PassBtn',
  changeInitFocus: true
}

class PrModAuto extends Component {

  render() {
    const {message, isProspelaAuto, isProspelaTeam} = this.props;

    const matchid = message.prModAuto.matchid;
  //  const matchDetail = this.grabMatchDetail(matchid);
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
        mentor_replied_date: '',
        match_comments: 'Guy has really good Houdini skills - exactly what you wanted!',
        mentee_pass_comments: '',
        mentor_pass_comments: '',
      }
    ]
    const userToMatch = [
      {
        uid: '12343',
        fname: 'Boris',
        lname: 'Johnson',
        birthday: '1995-01-01T00:00:00.000Z',
        matchType: 'strong',
        role: 'mentor',
        city: 'London',
        country: 'GBR',
        timeZone: 'Europe/London',
        eetstatus: 'job',
        avail: 1,
        group: 'avfx',
        no_mentors: 2,
        no_mentees: 2,
        maxmentees: 5,
        pendingmatches: 0,
        mentorsustep: 'didFullSUIDtf',
        matchstatus: 2,
      }
    ]
    const potentialMatch = [
      {
        uid: '12343',
        fname: 'Guy',
        lname: 'De Rosa',
        birthday: '1995-01-01T00:00:00.000Z',
        matchType: 'strong',
        role: 'mentor',
        city: 'London',
        country: 'GBR',
        timeZone: 'Europe/London',
        eetstatus: 'job',
        avail: 1,
        group: 'avfx',
        profilepic: '/2020/10/20/d619ca2a-8ae3-4bb6-ae52-b28817d4e082_571d5702-6350-43cc-94cb-d862d8553b2a.png-o',
        no_mentors: 2,
        no_mentees: 2,
        maxmentees: 5,
        pendingmatches: 0,
        mentorsustep: 'didFullSUIDtf',
        lastActiveDate: '1556389526',
        matchstatus: 2,
        isavailable: {status: 1},
        profprofileurl: 'https://www.linkedin.com/profile',
        uni: 0,
        degree: 'BSc (Hons) Business Administration',
        schname: '',
        schnamefreetext: '', // If their school wasn't on the list
        uniname: '75',
        uninamefreetext: '', // If their school wasn't on the list
        subjects: 'Business, Art, English Literature & Language',
        currrole: 'Head of Marketing',
        currco: 'Pladis',
        currind: '#food&beverage',
        expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
        learning: 'leadership, negotiations, excel, programming, python, mySQL',
        hobbies: 'running, swimming, theatre, yoga, skiing, gabadee',
        certainty: 7,
        roles: ['12', '98'],
        rolesfreetext: ['role3', 'role4'],
        rolesexp: ['12', '98'],
        rolesexpfreetext: ['role3', 'role4'],
        lifestyle: 'I want to work a 9-5pm job and have no responsibilities and earn £1m a month',
        whyHelp: 'I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.',
        whyJoin: 'I need help getting into Animation and want advice on my reel and how to craft my CV and cover letter. Please help!',
        helpFocus: 'review CVs and job applications, feedback on reel, work-reality, general',
        roleDesc: 'In my role, I\'m in charge of XYZ and I travel regularly and work with lots of interesting people and projects include working with Excel, Powerpoint and managing 3 employees'
      }
    ]
    let sendMatchText;

    const menteeNotYetResponded = matchDetail[0].status_of_match == 1
    const menteeTimedOut = matchDetail[0].status_of_match == 2
    const menteeAcc = matchDetail[0].status_of_match == 3
    const menteeRej = matchDetail[0].status_of_match == 4

    const eetstatus = potentialMatch[0].eetstatus;
    const isPicSet = potentialMatch[0].profilepic != null && potentialMatch[0].profilepic != '';
    let profPicSrc;
    let profPicSrcLarger;
    let userInitial;

    function createProfPicURL(string, picSizeToShow) {
    //  let picSizeToShow = 40;
    //  return usercdn.concat('/',userAvatarsFolder,string,'-',picSizeToShow);
      return usercdn.concat('/',userAvatarsFolder,string);
    }

    if (isPicSet == true) {
      if (eetstatus == 'sch') {
        profPicSrc = createProfPicURL(potentialMatch[0].profilepic, '40');
      } else {
        profPicSrcLarger = createProfPicURL(potentialMatch[0].profilepic, '80');
      }
    } else {
      userInitial = potentialMatch[0].fname && potentialMatch[0].fname.charAt(0).toUpperCase();
    }

    const isOnline = false;
    let uniName;
    if (potentialMatch[0].eetstatus == 'uni') {
      uniName = (potentialMatch[0].uniname != '' ? potentialMatch[0].uniname : potentialMatch[0].uninamefreetext)
    }

    switch (message.prModAuto.type) {
      case 'sendMatch':

        sendMatchText = '~*Hi, @' + userToMatch[0].fname + '!*~ 👋 \n\nI\'ve shared a profile of ' + potentialMatch[0].fname + ' with you below, who I think could be a *great match for you...* ' + (matchDetail[0].match_comments != '' ? ('\n\n '+ matchDetail[0].match_comments) : '') + '\n\nIf you\'re happy, simply click *Accept* to get chatting :) \n\n _If you\'re unsure, feel free to ask me any questions before responding - happy to help!_ '

        return (
          <div className="block-container">
            <div className="message-container">
              <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
              <div className="message-content-box">
                <div className="sent-msg-info">
                  <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} />
                  {isProspelaTeam && (
                    <UserBadge badgeType='isPrTeam' />
                  )}
                  <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
                </div>
                <div className="message-content">
                  <TextParser text={sendMatchText}/>
                </div>
                <div className="messageCTA">

                  <div className="potentialMatch-profileCard">
                    {isPicSet == true ? (
                      <div className={"userDetail-img img-square" + (eetstatus == 'sch' ? ' showSml': '')} style={eetstatus == 'sch' ? {backgroundImage:"url(" + profPicSrc + ")"} : {backgroundImage:"url(" + profPicSrcLarger + ")"}}/>
                      )
                    : (
                      <div className="userDetail-img img-square noPic">
                        {userInitial}
                      </div>
                    )}
                    <div className="userDetail-txt">
                      <div className="userDetail-name sentMatch">{potentialMatch[0].fname}</div>
                        <div className="userDetail-inst sentMatch">
                          {eetstatus == 'sch' ? 'Student' : ''}
                          {eetstatus == 'uni' ? (potentialMatch[0].degree + ' @ ' + uniName) : ''}
                          {eetstatus == 'job' && (
                            <div><span className="roleText">{potentialMatch[0].currrole}</span> @ {potentialMatch[0].currco}</div>
                          )}
                          {eetstatus == 'train' ? (potentialMatch[0].currtraining + ' @ ' + potentialMatch[0].currtrainingprovider) : ''}
                          {eetstatus == 'none' ? 'Looking for opportunities' : ''}
                        </div>
                    </div>
                    <div className="userDetail-flag">
                      <span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji(potentialMatch[0].country)}/></span>
                    </div>
                  </div>
                  {menteeNotYetResponded == true && (
                    <div className="messageCTABtns">
                      <Modal {...RequestChatModalProps}>
                        <RequestChatContent mentorName={potentialMatch[0].fname}/>
                      </Modal>
                      <Modal {...PassModalProps}>
                        <PassMentorContent />
                      </Modal>
                    </div>
                  )}
                  {menteeTimedOut == true && (
                    <div className="negativeReply redText">
                      Sadly you didn&#39;t repspond in time, so it&#39;s likely this mentor is no longer available! Are you still interested in me finding somebody for you?
                    </div>
                  )}
                  {menteeAcc == true && (
                    <div className="positiveReply greenText"><Check /> User Accepted and sent request to mentor!</div>
                  )}
                  {menteeRej == true && (
                    <div className="negativeReply redText"><X /> User Rejected</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  }
}

export default PrModAuto;
