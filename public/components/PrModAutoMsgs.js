// Dex last merged this code on 5th feb 2021
import React, { Component } from "react";

import Avatar from './Avatar.js';
import AcceptMenteeContent from './AcceptMenteeContent.js';
import Modal from './Modal.js';
import RequestChatContent from './RequestChatContent.js';
import PassMenteeContent from './PassMenteeContent.js';
import PassMentorContent from './PassMentorContent.js';
import UserBadge from './UserBadge.js';
import UserName from './UserName.js';
import TextParser from './TextParser.js';
import {X, Check} from './GeneralFunctions.js';
import {usercdn, userAvatarsFolder} from './CDN.js';
import {userFlagEmoji, convertHobbies} from './UserDetail.js';

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
        status_of_match: '3', // will be numbers i.e. 1 = 'profile sent', 2 = 'mentee timed out', 3 = 'mentee accepted', 4 = 'mentee rejected', 5 = 'mentor timed out', 6 = 'mentor accepted', 7 = 'mentor rejected'
        chasers: {
          type: 1, dateSent: '' // to be completed
        },
        date_matched: '1995-01-01T00:00:00.000Z',
        mentee_to_reply_by: '1995-01-04T00:00:00.000Z',
        mentee_replied_date: '1995-01-03T00:00:00.000Z',
        mentee_request_message: 'Hi Im Emma *studying Business*, Maths and English. I’m _interested in learning_ more about marketing and hear more about your work at Pladis. I think the company looks very interesting. I also like tennis!',
        mentor_reply_by: '',
        mentor_replied_date: '',
        match_comments: 'Guy has really good Houdini skills - exactly what you wanted!',
        mentee_pass_comments: '',
        mentor_pass_comments: '',
      }
    ]
    const mentorFname = '[MENTOR FNAME]'
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
        currco: 'Pladis',
        currind: '#food&beverage',
        expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
        learning: 'leadership, negotiations, excel, programming, python, mySQL',
        hobbies: ['1', '4', '67', '111'],
        hobbiesfreetext: ['Beer', 'Pubs', 'Bad jokes'],
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
    const today = new Date();
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
        profPicSrcLarger = createProfPicURL(userProfileToShow.profilepic, '80');
      }
    } else {
      userInitial = userProfileToShow.fname && userProfileToShow.fname.charAt(0).toUpperCase();
    }

    // Grab uni name
    if (userProfileToShow.eetstatus == 'uni') {
      uniName = (userProfileToShow.uniname != '' ? grabSchOrUni('uni', userProfileToShow.uniname) : userProfileToShow.uninamefreetext)
    }

    switch (message.prModAuto.type) {
      // Sending a potential Mentor to mentee for approval
      case 'sendMatch':

        text = 'Hi, @' + userToMatch[0].fname + '! 👋 \n\n~*🎉 NEW E-MENTOR MATCH*~ \n\nI\'ve shared a profile of ' + potentialMatch[0].fname + ' with you below, who I think could be a *great match for you...* ' + (matchDetail[0].match_comments != '' ? ('\n\n '+ matchDetail[0].match_comments) : '') + '\n\nIf you\'re happy, simply click *Accept* to get chatting :) \n\n _If you\'re unsure, feel free to ask me any questions before responding - I\'ll be your Relationship Manager, and I\'d be happy to help!_ '
        userNotYetResponded = matchDetail[0].status_of_match == 1
        userTimedOut = matchDetail[0].status_of_match == 2
        userAcc = matchDetail[0].status_of_match == 3 || matchDetail[0].status_of_match > 4
        userRej = matchDetail[0].status_of_match == 4

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
                      <div className="userDetail-profileCard">
                        <div className="lightPurpleText"><strong>Careers evolve over time. I&#39;m learning:</strong></div>
                        <div>{userProfileToShow.learning}</div>
                      </div>
                      <div className="userDetail-profileCard">
                        <div className="lightPurpleText"><strong>Outside of work I love:</strong></div>
                        <div>{ convertHobbies(userProfileToShow.hobbies, userProfileToShow.hobbiesfreetext) }</div>
                      </div>
                    </div>
                  </div>
                  {userNotYetResponded == true && (
                    <div className="messageCTABtns">
                      <Modal {...RequestChatModalProps}>
                        <RequestChatContent mentorName={userProfileToShow.fname} matchid={matchid}/>
                      </Modal>
                      <Modal {...PassModalProps}>
                        <PassMentorContent matchid={matchid}/>
                      </Modal>
                    </div>
                  )}
                  {userTimedOut == true && (
                    <div className="negativeReply redText">
                      Sadly you didn&#39;t repspond in time, so it&#39;s likely this mentor is no longer available! Are you still interested in me finding somebody for you?
                    </div>
                  )}
                  {userAcc == true && (
                    <div className="positiveReply greenText"><Check /> I&#39;ve Accepted: Request sent to mentor!</div>
                  )}
                  {userRej == true && (
                    <div className="negativeReply redText"><X /> Sorry, I Rejected</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      // Sending mentee's intro message and profile to mentor for approval
      case 'sendMenteeReq':

        text = 'Hi, @' + mentorFname + '! 👋 \n\n~*🎉 NEW MENTEE MATCH*~ \n\nI have a mentee (' + userToMatch[0].fname + ') who is *excited to be matched with you.* They wanted to say a few words to introduce themselves and I\'ve also shared a little bit about them below. \n\nIf you\'re happy, simply click *Accept* to get chatting :) \n\n _If you\'re unsure, feel free to ask me any questions before responding - I\'ll be your Relationship Manager and I\'d be happy to help!_ '
        userNotYetResponded = matchDetail[0].status_of_match == 3
        userTimedOut = matchDetail[0].status_of_match == 5
        userAcc = matchDetail[0].status_of_match == 6
        userRej = matchDetail[0].status_of_match == 7

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
                        <div className="lightPurpleText"><strong>Outside {(eetstatus == 'uni' || eetstatus == 'sch') ? 'the classroom': 'of work'} I love:</strong></div>
                        <div>{ convertHobbies(userProfileToShow.hobbies, userProfileToShow.hobbiesfreetext) }</div>
                      </div>
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
                    </div>
                  )}
                  {userTimedOut == true && (
                    <div className="negativeReply redText">
                      Sadly you didn&#39;t repspond in time, so it&#39;s likely we&#39;ve had to rematch this mentee with someone else! Are you still interested in being a mentor?
                    </div>
                  )}
                  {userAcc == true && (
                    <div className="positiveReply greenText"><Check /> I&#39;ve Accepted: Conversation started!</div>
                  )}
                  {userRej == true && (
                    <div className="negativeReply redText"><X /> Sorry, I Rejected</div>
                  )}
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
                <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} />
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
                <UserName fname={message.author} userUID={message.uid} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} />
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
