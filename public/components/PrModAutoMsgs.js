// Dex last merged this code on 25th may 2024

import React, { Component } from "react";

import Avatar from './Avatar.js';
import AcceptMenteeContent from './AcceptMenteeContent.js';
import FullPageModal from './FullPageModal.js';
import MenteeProfileContent from './MenteeProfileContent.js';
import MentorProfileContent from './MentorProfileContent.js';
import Modal from './Modal.js';
import RequestChatContent from './RequestChatContent.js';
import PassMenteeContent from './PassMenteeContent.js';
import PassMentorContent from './PassMentorContent.js';
import UserBadge from './UserBadge.js';
import UserName from './UserName.js';
import TextParser from './TextParser.js';
import {LoadingSpinner, X, Check, TimeCalc} from './GeneralFunctions.js';
import {usercdn, userAvatarsFolder} from './CDN.js';
import {getCompanyDeets, userFlagEmoji, convertHobbies, convertRole} from './UserDetail.js';

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

const AcceptMenteeModalProps = {
  ariaLabel: 'Popup to accept chat with matched Mentee',
  triggerText: 'Accept Mentee',
  usedFor: 'msgExtras-accept',
  changeInitFocus: true
}

const PassMenteeModalProps = {
  ariaLabel: 'Pass on Mentee',
  triggerText: 'Pass',
  usedFor: 'msgExtras-pass',
  changeInitFocus: true
}

const AddNotesProps = {
  ariaLabel: 'Add notes on user',
  triggerText: 'Add Notes on User',
  usedFor: 'addNotesBtn',
  changeInitFocus: true
}

const MenteeProfileModalProps = {
  ariaLabel: 'View Mentee Profile',
  triggerText: 'View full profile',
  usedFor: 'mentee-profile-prModAuto',
  backBtn: 'arrow'
}

const MentorProfileModalProps = {
  ariaLabel: 'View Mentor Profile',
  triggerText: 'View full profile',
  usedFor: 'mentor-profile-prModAuto',
  backBtn: 'arrow'
}

class PrModAuto extends Component {

  resendMatch = (toWhichUser, matchid) => {
    if (toWhichUser == 'mentee') {
      // resend to mentee
    } else if (toWhichUser == 'mentor') {
      // resend to mentor
    }
  }

  render() {
    const {message, isProspelaAuto, isProspelaTeam, updatePathName} = this.props;

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
        date_matched: '2021-03-21T00:00:00.000Z',
        mentee_to_reply_by: '1995-01-04T00:00:00.000Z',
        mentee_replied_date: '2021-03-22T00:00:00.000Z',
        mentee_request_message: 'Hi Im Emma *studying Business*, Maths and English. I’m _interested in learning_ more about marketing and hear more about your work at Pladis. I think the company looks very interesting. I also like tennis!',
        mentor_reply_by: '',
        mentor_replied_date: '',
        match_comments: 'Guy has really good Houdini skills - exactly what you wanted!',
        mentee_pass_comments: 'no thansk i want houdini',
        mentor_pass_comments: 'are you crazy? this person is crap',
        chaser_status: {
          menteeResent: '2021-03-17T13:07:05.000Z',
          mentorResent: '2021-03-23T00:00:00.000Z'
        },
      }
    ]
    const mentorFname = '[ MENTOR FNAME ]'
    const userToMatch = [
      {
        uid: '12343',
        fname: 'Boris',
        lname: 'Johnson',
        birthday: '2010-01-01T00:00:00.000Z',
        matchType: 'strong',
        role: 'mentor',
        city: 'London',
        country: 'GBR',
        timeZone: 'Europe/London',
        eetstatus: 'uni',
        avail: 1,
        group: 'avfx',
        no_mentors: 2,
        no_mentees: 2,
        maxmentees: 5,
        pendingmatches: 0,
        mentorsustep: 'didFullSUIDtf',
        matchstatus: 2,
        degree: 'BSc (Hons) Business Administration',
        schname: '',
        schnamefreetext: '', // If their school wasn't on the list
        uniname: '75',
        roles: ['12', '98'],
        rolesfreetext: ['role3', 'role4'],
        hobbies: ['1', '4', '67', '111'],
        hobbiesfreetext: ['Beer', 'Pubs', 'Bad jokes'],
        expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
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
        currco: '5',
        currcofreetext: '',
        currind: '#food&beverage',
        expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
        learning: 'leadership, negotiations, excel, programming, python, mySQL',
        hobbies: ['1', '4', '67', '111'],
        hobbiesfreetext: ['Beer', 'Pubs', 'Bad jokes'],
        certainty: 7,
        roles: [],
        rolesfreetext: [],
        rolesexp: ['12', '98'],
        rolesexpfreetext: ['role3', 'role4'],
        lifestyle: 'I want to work a 9-5pm job and have no responsibilities and earn £1m a month',
        whyHelp: 'I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.',
        whyJoin: 'I need help getting into Animation and want advice on my reel and how to craft my CV and cover letter. Please help!',
        helpFocus: 'review CVs and job applications, feedback on reel, work-reality, general',
        roleDesc: 'In my role, I\'m in charge of XYZ and I travel regularly and work with lots of interesting people and projects include working with Excel, Powerpoint and managing 3 employees'
      }
    ]
    let userNotYetResponded;
    let userTimedOut;
    let userAcc;
    let userRej;
    let text;
    let profPicSrc;
    let profPicSrcLarger;
    let userInitial;
    let userProfileToShow;
    let uniName;
    let sentDate;
    let timeoutDate;
    let timerText;
    let dateDiff;
    const userIs18 = false
    const isU18 = !userIs18 // dex's mapstatetotprops userIs18: state.userIs18,

    var today = new Date();
    var x;

    function grabSchOrUni (schOrUni, schUniNum) {
      //const {ukSchsList, ukUnisList} = this.state;
      return 'Fake School or Uni'
      /*if (schOrUni == 'sch') {
        const sch = ukSchsList && ukSchsList.filter(sch => {
          return sch.value == schUniNum;
        })
        const schName = sch[0].label;
        return schName;

      } else if (schOrUni == 'uni') {
        let uni;
        uni = ukUnisList && ukUnisList.filter(uni => {
          return uni.value == schUniNum;
        })
        const uniName = uni[0].label;
        return uniName;
      }*/
    }

    // If sending profile of mentor
    if (message.prModAuto.type == 'sendMatch') {

      // Bring back mentor deets
      userProfileToShow = potentialMatch[0]

    // If sending profile of mentee
    } else if (message.prModAuto.type == 'sendMenteeReq' || message.prModAuto.type == 'tellMenteeMentorRej' || message.prModAuto.type == 'tellMenteeMentorAcc') {

      // Bring back mentee deets
      userProfileToShow = userToMatch[0]
    }

    function createProfPicURL(string, picSizeToShow) {
    //  let picSizeToShow = 40;
    //  return usercdn.concat('/',userAvatarsFolder,string,'-',picSizeToShow);
      return usercdn.concat('/',userAvatarsFolder,string);
    }

    // Grab prof pic if set, otherwise show users initial
    const eetstatus = userProfileToShow.eetstatus;
    const isPicSet = userProfileToShow.profilepic != null && userProfileToShow.profilepic != '';

    if (isPicSet == true) {
      if (eetstatus == 'sch') {
        // Show only small pixelated picture
        profPicSrc = createProfPicURL(userProfileToShow.profilepic, '40');
      } else {
        profPicSrcLarger = createProfPicURL(userProfileToShow.profilepic, '270');
      }
    } else {
      userInitial = userProfileToShow.fname && userProfileToShow.fname.charAt(0).toUpperCase();
    }

    // Grab uni name
    if (userProfileToShow.eetstatus == 'uni') {
      uniName = (userProfileToShow.uniname != '' ? grabSchOrUni('uni', userProfileToShow.uniname) : userProfileToShow.uninamefreetext)
    }

    const isLoading = true;

    switch (message.prModAuto.type) {
      // Sending a potential Mentor to mentee for approval
      case 'sendMatch':

        text = 'Hi @' + userToMatch[0].fname + '! 👋 \n\n~*🎉 NEW E-MENTOR MATCH*~ \n\nI\'ve shared a profile of ' + potentialMatch[0].fname + ' with you below, who I think could be a *great match for you...* ' + (matchDetail[0].match_comments != '' ? ('\n\n '+ matchDetail[0].match_comments) : '') + '\n\nIf you\'re happy, simply click *Accept* to get chatting :) \n\n _If you\'re unsure, feel free to ask me any questions before responding - I\'ll be your Relationship Manager, and I\'d be happy to help!_ '
        userNotYetResponded = matchDetail[0].status_of_match == 1
        userTimedOut = matchDetail[0].status_of_match == 2
        userAcc = matchDetail[0].status_of_match == 3 || matchDetail[0].status_of_match > 4
        userRej = matchDetail[0].status_of_match == 4

        if (matchDetail[0].status_of_match != 2) { // not a timed out match

          // If is a resend
          if (matchDetail[0].chaser_status.menteeResent != null) {
            sentDate = new Date(matchDetail[0].chaser_status.menteeResent);
            timeoutDate = new Date()
            timeoutDate.setTime(sentDate.getTime() + (7*(1000*60*60*24))) // plus 7 days from resent
          } else {
            sentDate = new Date(matchDetail[0].date_matched);
            timeoutDate = new Date()
            timeoutDate.setTime(sentDate.getTime() + (9*(1000*60*60*24))) // plus 9 days from initial send
          }

          dateDiff = (timeoutDate.getTime() - today.getTime())/(1000*60*60*24)

          // Calculate time left
          if (dateDiff < 1) { // is today

            // calculate hours left
            if (dateDiff < 0) { // if in the past
              timerText = 'Timed out'
            } else if (dateDiff <= (1/24)) { // if less than 1 hour left
              timerText = '< 1 hour left to reply'
            } else {
              x = Math.round(dateDiff*24)
              timerText = x + ' hours left to reply'
            }

          } else { // is in future
            x = Math.ceil(dateDiff)
            timerText = x + ' days left to reply'
          }

        } else {
          timerText = 'Timed out'
        }


/*  } else {
    var yestDate = new Date((today.setDate(today.getDate()-1))).toDateString()
    var isToday = tsDate == todayDate
    if (isToday) {
      return "Today"
    } else if(tsDate == yestDate) {
      return "Yesterday"
    } else {
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var day = days[ts.getDay()];
      var nth = nthCalc(date);
      year = ((ts.getFullYear()===new Date().getFullYear()) ? '' : ' '+ts.getFullYear());
      time = day + ', ' + month + ' ' + date + nth + year
      return time;
    }
  }*/

        return (
          <div className="block-container">
            <div className="message-container">
              <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
              <div className="message-content-box">
                <div className="sent-msg-info">
                  <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} updatePathName={updatePathName} />
                  {isProspelaTeam && (
                    <UserBadge badgeType='isPrTeam' />
                  )}
                  <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
                </div>
                <div className="message-content">
                  <TextParser text={text}/>
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
                      <div className="userDetail-name sentMatch">{userProfileToShow.fname}</div>
                      <div className="userDetail-inst sentMatch">
                        {eetstatus == 'sch' && (
                          <div><span className="roleText">Student</span></div>
                        )}
                        {eetstatus == 'uni' && (
                          <div><span className="roleText">{userProfileToShow.degree}</span><div>@ {uniName}</div></div>
                        )}
                        {eetstatus == 'job' && (
                          <div><span className="roleText">{userProfileToShow.currrole}</span><div>@ {getCompanyDeets(userProfileToShow.currco, userProfileToShow.currcofreetext, 'name')}</div></div>
                        )}
                        {eetstatus == 'train' && (
                          <div><span className="roleText">{userProfileToShow.currtraining}</span><div>@ {userProfileToShow.currtrainingprovider}</div></div>
                        )}
                        {eetstatus == 'none' && (
                          <div><span className="roleText">Looking for opportunities</span></div>
                        )}
                      </div>
                      <div className="userDetail-flag">
                        <span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji(userProfileToShow.country)}/></span>
                      </div>
                    </div>
                    <div className="userDetail-scrollSection">
                      {isLoading === true ? (
                        <LoadingSpinner />
                        )
                      : (
                        <React.Fragment>
                          <div className="userDetail-profileCard">
                            <div className="lightPurpleText"><strong>I&#39;m pretty good at:</strong></div>
                            <div>{userProfileToShow.expertise}</div>
                          </div>
                          <div className="userDetail-profileCard">
                            <div className="lightPurpleText"><strong>Examples of Roles I can talk about:</strong></div>
                            <div>{ convertRole(userProfileToShow.rolesexp, userProfileToShow.rolesexpfreetext) }</div>
                          </div>
                          <div className="userDetail-profileCard">
                            <div className="lightPurpleText"><strong>Careers evolve over time. I&#39;m learning:</strong></div>
                            <div>{userProfileToShow.learning}</div>
                          </div>
                          <div className="userDetail-profileCard">
                            <div className="lightPurpleText"><strong>Outside of work I love:</strong></div>
                            <div>{ convertHobbies(userProfileToShow.hobbies, userProfileToShow.hobbiesfreetext) }</div>
                          </div>
                          <FullPageModal {...MentorProfileModalProps}>
                            <MentorProfileContent updatePathName={updatePathName}/>
                          </FullPageModal>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                  {userNotYetResponded == true && (
                    <React.Fragment>
                      <div className="messageCTABtns">
                        <Modal {...RequestChatModalProps}>
                          <RequestChatContent mentorName={userProfileToShow.fname} matchid={matchid} isU18={isU18}/>
                        </Modal>
                        <Modal {...PassModalProps}>
                          <PassMentorContent matchid={matchid}/>
                        </Modal>
                      </div>
                      <div className={"timeoutText" + (timerText == 'Timed out' ? ' timedOut' : '')}><strong>{timerText}</strong></div>
                    </React.Fragment>
                  )}
                  {userTimedOut == true && (
                    <div className="negativeReply redText">
                      Sadly you didn&#39;t repspond in time, so it&#39;s likely this mentor is no longer available! Are you still interested in me finding somebody for you?
                    </div>
                  )}
                  {userAcc == true && (
                    <div className="positiveReply greenText"><Check /> I&#39;ve Accepted: Request sent to mentor! We&#39;ll let you know as soon as they respond.</div>
                  )}
                  {userRej == true && (
                    <React.Fragment>
                      <div className="negativeReply redText"><X /> Sorry, I Rejected</div>
                      <div className="redText">Pass reason: <i>{matchDetail[0].mentee_pass_comments}</i></div>
                    {/*}  {userRole == 'pr' ? (
                        <div className="messageCTA">
                          <div className="messageCTABtns">
                            <Modal {...AddNotesProps}>
                              <AddNotesOnUserContent userName={userToMatch[0].fname} />
                            </Modal>
                          </div>
                        </div>
                      )
                      : (*/}
                        <div className="negativeReply purpleText"><strong>Thanks! I&#39;ll try to find someone better for you based on your feedback! </strong><span role="img" aria-label="smileEmoji">😊</span></div>
                    </React.Fragment>
                  )}
                  {(userTimedOut == true || userRej == true) && ( // && userRole == 'pr' &&
                    <div className="messageCTABtns">
                      <button type="button" className="ModalOpenBtn" onClick={() => this.resendMatch('mentee', matchid)}>
                        Resend Match to Mentee
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      // 1st Reminder to mentee that we've sent a potential Mentor to them for approval
      case 'sendMatch-chaser1':

        text = 'Hey, @' + userToMatch[0].fname + ', \n\nJust wondering if you had forgotten to respond above about your Mentor match, ' + potentialMatch[0].fname + '? The match will time out automatically in 6 days. \n\nLet me know what you think!'

        return (
          <div className="block-container">
            <div className="message-container">
              <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
              <div className="message-content-box">
                <div className="sent-msg-info">
                  <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} updatePathName={updatePathName}/>
                  {isProspelaTeam && (
                    <UserBadge badgeType='isPrTeam' />
                  )}
                  <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
                </div>
                <div className="message-content">
                  <TextParser text={text}/>
                </div>
              </div>
            </div>
          </div>
        );

      // 2nd Reminder to mentee that we've sent a potential Mentor to them for approval
      case 'sendMatch-chaser2':

        text = 'Hi again, @' + userToMatch[0].fname + '! 👋 \n\nWere you happy with the Mentor match I sent you? Thought I\'d try one last time to chase you before they get released for somebody else (2 days left!). Hopefully you catch this message! \n\nAny questions or reservations, just let me know =)'

        return (
          <div className="block-container">
            <div className="message-container">
              <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
              <div className="message-content-box">
                <div className="sent-msg-info">
                  <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} updatePathName={updatePathName}/>
                  {isProspelaTeam && (
                    <UserBadge badgeType='isPrTeam' />
                  )}
                  <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
                </div>
                <div className="message-content">
                  <TextParser text={text}/>
                </div>
              </div>
            </div>
          </div>
        );

      // Sending mentee's intro message and profile to mentor for approval
      case 'sendMenteeReq':

        text = 'Hi @' + mentorFname + '! 👋 \n\n~*🎉 NEW MENTEE MATCH*~ \n\nI have a mentee (' + userToMatch[0].fname + ') who is *excited to be matched with you.* They wanted to say a few words to introduce themselves and I\'ve also shared a little bit about them below. \n\nIf you\'re happy, simply click *Accept* to get chatting :) \n\n _If you\'re unsure, feel free to ask me any questions before responding - I\'ll be your Relationship Manager and I\'d be happy to help!_ '
        userNotYetResponded = matchDetail[0].status_of_match == 3
        userTimedOut = matchDetail[0].status_of_match == 5
        userAcc = matchDetail[0].status_of_match == 6
        userRej = matchDetail[0].status_of_match == 7

          if (matchDetail[0].status_of_match != 5) { // not a timed out match

            // If is a resend
            if (matchDetail[0].chaser_status.mentorResent != null) {
              sentDate = new Date(matchDetail[0].chaser_status.mentorResent);
              timeoutDate = new Date()
              timeoutDate.setTime(sentDate.getTime() + (7*(1000*60*60*24))) // plus 7 days from resent
            } else {
              sentDate = new Date(matchDetail[0].mentee_replied_date);
              timeoutDate = new Date()
              timeoutDate.setTime(sentDate.getTime() + (9*(1000*60*60*24))) // plus 9 days from initial send
            }

            dateDiff = (timeoutDate.getTime() - today.getTime())/(1000*60*60*24)

            // Calculate time left
            if (dateDiff < 1) { // is today

              // calculate hours left
              if (dateDiff < 0) { // if in the past
                timerText = 'Timed out'
              } else if (dateDiff <= (1/24)) { // if less than 1 hour left
                timerText = '< 1 hour left to reply'
              } else {
                x = Math.round(dateDiff*24)
                timerText = x + ' hours left to reply'
              }

            } else { // is in future
              x = Math.ceil(dateDiff)
              timerText = x + ' days left to reply'
            }

          } else {
            timerText = 'Timed out'
          }

        return (
          <div className="block-container">
            <div className="message-container">
              <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
              <div className="message-content-box">
                <div className="sent-msg-info">
                  <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} updatePathName={updatePathName}/>
                  {isProspelaTeam && (
                    <UserBadge badgeType='isPrTeam' />
                  )}
                  <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
                </div>
                <div className="message-content">
                  <TextParser text={text}/>
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
                      <div className="userDetail-name sentMatch">{userProfileToShow.fname}</div>
                        <div className="userDetail-inst sentMatch">
                          {eetstatus == 'sch' && (
                            <div><span className="roleText">Student</span></div>
                          )}
                          {eetstatus == 'uni' && (
                            <div><span className="roleText">{userProfileToShow.degree}</span><div>@ {uniName}</div></div>
                          )}
                          {eetstatus == 'job' && (
                            <div><span className="roleText">{userProfileToShow.currrole}</span><div>@ {userProfileToShow.currco}</div></div>
                          )}
                          {eetstatus == 'train' && (
                            <div><span className="roleText">{userProfileToShow.currtraining}</span><div>@ {userProfileToShow.currtrainingprovider}</div></div>
                          )}
                          {eetstatus == 'none' && (
                            <div><span className="roleText">Looking for opportunities</span></div>
                          )}
                        </div>
                        <div className="userDetail-flag">
                          <span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji(userProfileToShow.country)}/></span>
                        </div>
                    </div>
                    <div className="userDetail-scrollSection">
                      <div className="userDetail-profileCard">
                        <div className="lightPurpleText"><strong>I&#39;m pretty good at:</strong></div>
                        <div>{userProfileToShow.expertise}</div>
                      </div>
                      {/*}
                      <div className="userDetail-profileCard">
                        <div className="lightPurpleText"><strong>Careers evolve over time. I&#39;m learning:</strong></div>
                        <div>{userProfileToShow.learning}</div>
                      </div>
                      */}
                      <div className="userDetail-profileCard">
                        <div className="lightPurpleText"><strong>Roles I&#39;m interested in:</strong></div>
                        <div>{ convertRole(userProfileToShow.roles, userProfileToShow.rolesfreetext) }</div>
                      </div>
                      <div className="userDetail-profileCard">
                        <div className="lightPurpleText"><strong>Outside {(eetstatus == 'uni' || eetstatus == 'sch') ? 'the classroom': 'of work'} I love:</strong></div>
                        <div>{ convertHobbies(userProfileToShow.hobbies, userProfileToShow.hobbiesfreetext) }</div>
                      </div>
                      <FullPageModal {...MenteeProfileModalProps}>
                        <MenteeProfileContent updatePathName={updatePathName}/>
                      </FullPageModal>
                    </div>
                  </div>
              {/*}    <div className="potentialMatch-menteeIntroMsg"> */}
                  <div className="potentialMatch-menteeIntroMsg">
                    <div className="message-extras-border" />
                    <div>
                      <span className="highlight-titleText">A mesage to you from {userProfileToShow.fname}:</span>
                      <div>
                        <i className="fas fa-quote-left"/>
                        <TextParser text={matchDetail[0].mentee_request_message} />
                      </div>
                    </div>
                  </div>
                  {userNotYetResponded == true && (
                    <div className="messageCTABtns">
                      <Modal {...AcceptMenteeModalProps}>
                        <AcceptMenteeContent menteeName={userToMatch[0].fname} matchid={matchid}/>
                      </Modal>
                      <Modal {...PassMenteeModalProps}>
                        <PassMenteeContent matchid={matchid}/>
                      </Modal>
                      <div className={"timeoutText" + (timerText == 'Timed out' ? ' timedOut' : '')}><strong>{timerText}</strong></div>
                    </div>
                  )}
                  {userTimedOut == true && (
                    <div className="negativeReply redText">
                      Sadly you didn&#39;t repspond in time, so it&#39;s likely we&#39;ve had to rematch this mentee with someone else! Are you still interested in being a mentor?
                    </div>
                  )}
                  {userAcc == true && (
                    <div className="positiveReply greenText"><Check /> I&#39;ve Accepted: Conversation started! You&#39;ll find your new chat in your Direct Messages (over there <span role="img" aria-label="eyes-emoji">👀</span>)</div>
                  )}
                  {userRej == true && (
                    <React.Fragment>
                      <div className="negativeReply redText"><X /> Sorry, I Rejected</div>
                      <div className="redText">Pass reason: <i>{matchDetail[0].mentor_pass_comments}</i></div>
                {/*     {userRole == 'pr' ? (
                        <div className="messageCTA">
                          <div className="messageCTABtns">
                            <Modal {...AddNotesProps}>
                              <AddNotesOnUserContent userName={mentorFname} />
                            </Modal>
                          </div>
                        </div>
                      )
                      : (*/}
                        <div className="negativeReply purpleText"><strong>Thanks! I&#39;ll try to find a better match (or update your availability) based on your feedback </strong><span role="img" aria-label="smileEmoji">😊</span></div>
                    </React.Fragment>
                  )}
                  {(userTimedOut == true || userRej == true) && ( // && userRole == 'pr' &&
                    <div className="messageCTABtns">
                      <button type="button" className="ModalOpenBtn" onClick={() => this.resendMatch('mentor', matchid)}>
                        Resend Match to Mentor
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      // 1st Reminder to Mentor that we've sent a potential Mentee to them for approval
      case 'sendMenteeReq-chaser1':

        text = 'Hey, @' + mentorFname + ', \n\nJust wondering if you had forgotten to respond above about your Mentee match, ' + userToMatch[0].fname + '? The match will time out automatically in 6 days.\n\nLet me know what you think!'

        return (
          <div className="block-container">
            <div className="message-container">
              <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
              <div className="message-content-box">
                <div className="sent-msg-info">
                  <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} updatePathName={updatePathName}/>
                  {isProspelaTeam && (
                    <UserBadge badgeType='isPrTeam' />
                  )}
                  <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
                </div>
                <div className="message-content">
                  <TextParser text={text}/>
                </div>
              </div>
            </div>
          </div>
        );

      // 2nd Reminder to mentor that we've sent a potential Mentee to them for approval
      case 'sendMenteeReq-chaser2':

        text = 'Hi again, @' + mentorFname + '! 👋 \n\nWere you happy with the Mentee match I sent through to you? Thought I\'d try one last time to chase you before they get released (2 days left!) and we try to find them somebody else as their Mentor. Hopefully you catch this message! \n\nAny questions or reservations, just let me know =)'

        return (
          <div className="block-container">
            <div className="message-container">
              <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
              <div className="message-content-box">
                <div className="sent-msg-info">
                  <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} updatePathName={updatePathName}/>
                  {isProspelaTeam && (
                    <UserBadge badgeType='isPrTeam' />
                  )}
                  <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
                </div>
                <div className="message-content">
                  <TextParser text={text}/>
                </div>
              </div>
            </div>
          </div>
        );

      // Let Mentee know mentor rejected their chat request
      case 'tellMenteeMentorRej':

      text = 'Hey again, ' + userToMatch[0].fname + ' \n\nUnfortunately ' + potentialMatch[0].fname + ' couldn\'t accept your request to be your mentor at this time. \n\nBut no worries, you don\'t need to do anything and I\'ll start looking to *find you another match soon!* '

      return (
        <div className="block-container">
          <div className="message-container">
            <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
            <div className="message-content-box">
              <div className="sent-msg-info">
                <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} updatePathName={updatePathName}/>
                {isProspelaTeam && (
                  <UserBadge badgeType='isPrTeam' />
                )}
                <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
              </div>
              <div className="message-content">
                <div className="negativeReply redText">
                  <X /><strong> YOUR MENTOR IS UNAVAILABLE</strong>
                </div>
                <TextParser text={text}/>
              </div>
            </div>
          </div>
        </div>
      );

      // Let Mentee know mentor rejected their chat request
      case 'tellMenteeMentorAcc':

      text = 'Hey again, ' + userToMatch[0].fname + ' \n\nI\'m excited to say that ' + potentialMatch[0].fname + ' accepted your mentor request and has sent a reply to your message! \n\nYou\'ll find your new chat in your Direct Messages (over there <<) and you can always contact me (your Relationship Manager) if you have any questions, issues, etc. \n\n For now: BEST OF LUCK!! I hope you guys have a great convo.'

      return (
        <div className="block-container">
          <div className="message-container">
            <Avatar userID={message.uid} userName={message.author} isProspelaAuto={isProspelaAuto} picSize={40}/>
            <div className="message-content-box">
              <div className="sent-msg-info">
                <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} updatePathName={updatePathName}/>
                {isProspelaTeam && (
                  <UserBadge badgeType='isPrTeam' />
                )}
                <span className="msg-sent-time"><TimeCalc time={message.ts} /></span>
              </div>
              <div className="message-content">
                <div className="positiveReply greenText">
                  <Check /><strong> YOUR MENTOR ACCEPTED</strong>
                </div>
                <TextParser text={text}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default PrModAuto;
