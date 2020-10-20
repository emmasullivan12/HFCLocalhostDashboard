// Dex last merged this code on 20th oct 2020

import React, { Component } from "react";

import AcceptCTA from './AcceptCTA.js';
import AudioCTA from './AudioCTA.js';
import DisplayMsgFile from './DisplayMsgFile.js';
import FeedbkCTA from './FeedbkCTA.js';
import FullPageModal from './FullPageModal.js';
import {isIE} from './GeneralFunctions.js';
import MenteeProfileContent from './MenteeProfileContent.js';
import MentorProfileContent from './MentorProfileContent.js';
import MessageActions from './MessageActions.js';
import Modal from './Modal.js';
import UploadProfPicContent from './UploadProfPicContent.js';
import UserName from './UserName.js';
import TextParser from './TextParser.js';

import "../css/Emoji.css";
import "../css/General.css";
import "../css/PrMessage.css";

const MenteeProfilePrautoModalProps = {
  ariaLabel: 'View Mentee Profile',
  triggerText: 'View Mentee Profile',
  usedFor: 'mentee-prauto-profile',
  backBtn: 'arrow'
}

const MenteeProfileMsgBtnModalProps = {
  ariaLabel: 'View Mentee Profile',
  triggerText: 'Profile',
  usedFor: 'mentee-msgBtn-profile',
  backBtn: 'arrow'
}

const MentorProfileMsgBtnModalProps = {
  ariaLabel: 'View Mentor Profile',
  triggerText: 'View Mentor Profile',
  usedFor: 'mentor-msgBtn-profile',
  backBtn: 'arrow'
}

const UploadProfPicProps = {
  ariaLabel: 'Add or Edit Profile Picture',
  triggerText: 'Add/Edit Profile pic',
  usedFor: 'addPicBtn msg-thumb'
}

function Avatar(props) {
  const {senderName, senderID, subtype, isProspela} = props
  const profPicSrc = "https://files-and-media.ams3.digitaloceanspaces.com/images/Puppy%20Power.jpeg" // looks up profpic URL of UID
//  const profPicSrcNotMe = "https://files-and-media.ams3.digitaloceanspaces.com/images/Puppy%20Power.jpeg"
  const profPicSrcNotMe = ''
  const profPicSrcProspela = "https://files-and-media.ams3.digitaloceanspaces.com/images/Professional%20Photo_50.jpg"
  const userInitial = senderName.charAt(0).toUpperCase();
  const myID = '12345';
  const isMe = (senderID === myID) ? 'isMe' : 'isntMe';
  const checkMe = profPicSrc != null && profPicSrc != ''
  const checkOtherPerson = isProspela ? (profPicSrcProspela != null && profPicSrcProspela != '') : (profPicSrcNotMe != null && profPicSrcNotMe != '')
  const isPicSet = (subtype === 'welcome' || subtype === 'prAuto') ? false : (isMe === 'isMe' ? checkMe : checkOtherPerson)
//  const senderRole = 'mentor'; // will need to check senderUID for role (when opening profile)
  return (
    <div className="msg-thumb-container">
      {isPicSet ? (
        <div className={"msg-thumb img-square allowAddPic " + isMe + (isMe==='isMe' ? ' hasPic' : ' hasPic noModal')} style={(isPicSet && isMe==='isMe') ? {backgroundImage:"url(" + profPicSrc + ")"} : (isProspela ? {backgroundImage:"url(" + profPicSrcProspela + ")"} : {backgroundImage:"url(" + profPicSrcNotMe + ")"})}>
          {isMe==="isMe" ? (
        //  {isMe==="isMe" && (
            <Modal {...UploadProfPicProps}>
              <UploadProfPicContent isPicSet={isPicSet} profPicSrc={profPicSrc} isMe={isMe}/>
            </Modal>
            )
            : null
          }
      {  /*    senderRole === 'mentee' ? (
              <FullPageModal {...MenteeProfileMsgBtnModalProps}>
                <MenteeProfileContent />
              </FullPageModal>
              )
            : (
              <FullPageModal {...MentorProfileMsgBtnModalProps}>
                <MentorProfileContent />
              </FullPageModal>
            )
          )}*/}
        </div>
        )
      : (
        <div className={"msg-thumb img-square allowAddPic noPic " + isMe + " " + (isProspela === true ? 'isProspela' : null)}>
          {isMe==="isMe" ? (
        //  {isMe==="isMe" ? (
            <Modal {...UploadProfPicProps}>
              <UploadProfPicContent isPicSet={isPicSet} userInitial={userInitial} isMe={isMe}/>
            </Modal>
            )
            : null
          }
    {/*        senderRole === 'mentee' ? (
              <FullPageModal {...MenteeProfileMsgBtnModalProps}>
                <MenteeProfileContent />
              </FullPageModal>
              )
            : (
              <FullPageModal {...MentorProfileMsgBtnModalProps}>
                <MentorProfileContent />
              </FullPageModal>
            )
          )}*/}
          <div className={"userInitial msg-thumb "+(isMe==='isMe' ? null : 'noModal')}>
            {userInitial}
          </div>
        </div>
      )}
    </div>
  );
}

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

function toggleMoreActionsBlur(e) {
  const newTargetElement = isIE() ? document.activeElement : e.relatedTarget;
  if(e.target.className === 'msgActions-btn tooltip moreActions' && (newTargetElement == null || newTargetElement.className != 'ModalOpenBtn ModalOpenBtn-ReportMsg')) {
    e.target.nextSibling.classList.remove('active');
  }
}

//onFocusOut={toggleMoreActionsBlur}

function WelcomeMessage(props) {
  const fname = 'Dexter'
  const mentorText = '~*You\'re amazing, @' + fname + '!*~\nBy signing up, you\'re making a dream career that little bit more accessible for somebody! 🎉\n\n*So, what now?*\n📷 If you\'re supporting under 18s, ~upload your photo ID selfie~ & CV/Resume or LinkedIn URL\n🎓 ~Complete our short & sweet training~. It\'s mandatory before we introduce you to students and will help you feel fully equipped in supporting students across the Prospela network!\n🔗 Once you\'re good to go, our employee of the month (Penny 👩🏼‍🔧) will get busy matching you!\n\n*Questions, thoughts, feedback?*\nWe\'re all ears. Simply shoot us a DM in this "Prospela Bot" chat and one of the team will get back to you asap 😃\n_How did you find the sign up process so far?_'

  const menteeText = '~*Nice job, @' + fname + '!*~\nBy signing up, you\'ve just made your dream career that little bit more accessible! 🎉\n\n*So, what now?*\n🎓 ~Complete our short & sweet training~. It\'s mandatory before we introduce you to real employees and will help you feel fully equipped to make the most of your new network, incl. learning how to build a professional relationship online, and more!\n🔗 Once you\'re good to go, our employee of the month (Penny 👩🏼‍🔧) will get busy matching you!\n\n*Questions, thoughts, feedback?*\nWe\'re all ears.\nSimply shoot us a DM in this "Prospela Bot" chat and one of the team will get back to you asap 😃\n_How did you find the sign up process so far?_'

  const text = props.userRole === 'mentor' ? mentorText : menteeText

  return (
    <React.Fragment>
      <div className="block-container" onBlur={toggleMoreActionsBlur} >
        <div className="message-container">
          <Avatar senderID={props.message.uid} senderName={props.message.author} subtype={props.message.subtype} isProspela={props.isProspela}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName msgAuthor={props.message.author} senderUID={props.message.uid} subtype={props.message.subtype} isProspela={props.isProspela}/>
              <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
            </div>
            <div className="message-content">
              <TextParser text={text} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

function FinishedSUMessage(props) {
  const fname = 'Dexter'
  const mentorText = '~*Nice job, @' + fname + '!*~\n*Next steps*\n🔗 Sit back and relax as ol\' employee of the month Penny 👩🏼‍🔧 matches you with a mentee based on what you\'ve told us about your career to date, skills & interests. She\'s pretty darn good at it! _Note: It can take a few weeks to find a relevant match!_\n💬 When your mentee accepts, they\'ll send you a message (you\'ll receive an email too) and we\'ll create a private channel for you which will appear over there <<👀 in your "Direct Messages"\n📋 We\'ll also send you some info on their current career aspirations, skills & interests to help you kick off the convo!\n\n*Coming soon*\n-We\'ll be launching a new “hello-mentors” channel: a place where you can talk with the rest of our mentor community 😎, the Prospela team and where we will post the latest updates. So keep your eyes peeled!\n\n*Questions, thoughts, feedback?* Simply shoot us a DM in this "Prospela Bot" chat and one of the team will get back to you asap 😃'

  const menteeText = '~*Nice job, @' + fname + '!*~\n*Next steps*\n🔗 Sit back and relax as ol\' employee of the month Penny 👩🏼‍🔧 matches you with an employee mentor based on what you\'ve told us about your preferred industry/role. She\'s pretty darn good at it! _Note: It can take a few weeks to find a relevant match!_\n📋 We\'ll also send you some info on their skills & interests to help you kick off the convo and send them your first message!\n💬 When your E-Mentor accepts, they\'ll reply to your message (you\'ll receive an email too) and we\'ll create a private channel for you which will appear over there <<👀 in your "Direct Messages"\n\n*Coming soon*\n-We\'ll be launching a new “hello-mentees” channel: a place where you can talk with other mentees 😎, the Prospela team and where we will post the latest updates. So keep your eyes peeled!\n\n*Questions, thoughts, feedback?* Simply shoot us a DM in this "Prospela Bot" chat and one of the team will get back to you asap 😃'

  const text = props.userRole === 'mentor' ? mentorText : menteeText

  return (
    <React.Fragment>
      <div className="block-container" onBlur={toggleMoreActionsBlur} >
        <div className="message-container">
          <Avatar senderID={props.message.uid} senderName={props.message.author} subtype={props.message.subtype} isProspela={props.isProspela}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName msgAuthor={props.message.author} senderUID={props.message.uid} subtype={props.message.subtype} isProspela={props.isProspela}/>
              <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
            </div>
            <div className="message-content">
              <TextParser text={text} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

function StdMessage(props) {
  return (
    <React.Fragment>
      <div className="block-container" onBlur={toggleMoreActionsBlur} >
      {
        props.isAdjacent === true
        ? (
          <div className="message-container adjacent">
            <div className="messageGutter">
              <div className="msg-sent-time adjacent">
                <TimeCalc time={props.message.ts} />
              </div>
            </div>
            <div className="message-content-box">
              <div className="message-content">
                <TextParser text={props.message.text} />
              </div>
              <div className="msgStatus read">
                &#10003; Seen
              </div>
              <div className="msgStatus error">
                &#10007; Error sending message. Please try again
              </div>
            </div>
          {//  <MessageActions />
        }  </div>
        ):(
          <div className="message-container">
            <Avatar senderID={props.message.uid} senderName={props.message.author} subtype={props.message.subtype} isProspela={props.isProspela}/>
            <div className="message-content-box">
              <div className="sent-msg-info">
                <UserName msgAuthor={props.message.author} senderUID={props.message.uid} subtype={props.message.subtype} isProspela={props.isProspela}/>
                <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
              </div>
              <div className="message-content">
                <TextParser text={props.message.text}/>
              </div>
              <div className="msgStatus read">
                &#10003; Seen
              </div>
              <div className="msgStatus error">
                &#10007; Error sending message. Please try again
              </div>
            </div>
          {//  <MessageActions />
        }  </div>
        )
      }
      </div>
    </React.Fragment>
  );
}

function DisplayFile(props) {
  return (
    <React.Fragment>
      <div className="block-container" onBlur={toggleMoreActionsBlur}>
        <div className="message-container">
          <Avatar senderID={props.message.uid} senderName={props.message.author} subtype={props.message.subtype} isProspela={props.isProspela}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName msgAuthor={props.message.author} senderUID={props.message.uid} subtype={props.message.subtype} isProspela={props.isProspela}/>
              <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
            </div>
            <div className="message-content">
              <div className="extra-content-container">
                <DisplayMsgFile
                  file={props.message.file}
                  isLastPic={props.isLastPic}
                  handleLastPic={props.handleLastPic}
                  msgId={props.message.id}
                />
              </div>
            </div>
            <div className="msgStatus read">
              &#10003; Seen
            </div>
            <div className="msgStatus error">
              &#10007; Error sending message. Please try again
            </div>
          </div>
      {//    <MessageActions />
      }  </div>
      </div>
    </React.Fragment>
  );
}

function MessageNotSent(props) {
  return (
    <React.Fragment>
      <div className="block-container">
        <div className="message-container">
          <Avatar senderID={props.message.uid} senderName={props.message.author} subtype={props.message.subtype} isProspela={props.isProspela}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName msgAuthor={props.message.author} senderUID={props.message.uid} subtype={props.message.subtype} isProspela={props.isProspela}/>
              <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
            </div>
            <div className="message-content">
              <TextParser text={props.message.text} />
            </div>
            <div className="msgStatus error">
              &#10007; Error sending message. Please check your connection and try again
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function UploadNotSent(props) {
  return (
    <React.Fragment>
      <div className="block-container">
        <div className="message-container">
          <Avatar senderID={props.message.uid} senderName={props.message.author} subtype={props.message.subtype} isProspela={props.isProspela}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName msgAuthor={props.message.author} senderUID={props.message.uid} subtype={props.message.subtype} isProspela={props.isProspela}/>
              <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
            </div>
            <div className="message-content">
              <div className="extra-content-container">
                <DisplayMsgFile
                  file={props.message.file}
                  error="error"
                  handleLastPic={props.handleLastPic}
                  msgId={props.message.id}
                />
              </div>
              <div className="msgStatus error">
                &#10007; Error sending message. Please check your connection and try again
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function MenteeReq(props) {
  return (
    <React.Fragment>
      <div className="prauto-msg-container">
        <div className="msg-title-container">
            <div className="title-emoji-container">
              <i className="emoji-icon tada-emoji" />
            </div>
            <div className="message-content-box msgTitle">
              <span className="prAutoMsgTitle">&#91;NEW CHAT REQUEST&#93; You have a message from Dexter, a mentee who would really appreciate your mentorship!</span>
            </div>
        </div>
        <div className="message-extras-container">
          <div className="message-extras-border" />
          <div className="msg-extras">
            <div className="message-container noPaddingL noPaddingR noPaddingT">
              <Avatar senderID={props.message.uid} senderName={props.message.author} subtype={props.message.subtype} isProspela={props.isProspela}/>
              <div className="message-content-box">
                <div className="sent-msg-info">
                  <UserName msgAuthor={props.message.author} senderUID={props.message.uid} subtype={props.message.subtype} isProspela={props.isProspela}/>
                  <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
                </div>
                <div className="message-content">
                  <TextParser text={props.message.text} />
                </div>
              </div>
            </div>
            <FullPageModal {...MenteeProfilePrautoModalProps}>
              <MenteeProfileContent />
            </FullPageModal>
          </div>
        </div>
        <AcceptCTA />
      </div>
    </React.Fragment>
  );
}

function MentorReply(props) {
  const subtype = props.message.subtype;
  return (
    <React.Fragment>
      <div className="prauto-msg-container">
        <div className="msg-title-container">
            <div className="title-emoji-container">
              {subtype === "mentorAcc" ? <i className="emoji-icon tick-emoji" /> : <i className="emoji-icon cross-emoji" />}
            </div>
            <div className="message-content-box msgTitle">
              {subtype === "mentorAcc" ? (
                <span className="prAutoMsgTitle">Your request was accepted!</span>
                )
              : (
                <span className="prAutoMsgTitle">Unfortunately, that employee couldn&#39;t accept your request</span>
                )
              }
            </div>
        </div>
        <div className="message-extras-container">
          <div className="message-extras-border" />
          <div className="msg-extras">
            {subtype === "mentorAcc" ? (
              <a href="/messages/chatid" className="link msg-extras-ctaTxt">
                Click to see their reply &#62;&#62;
              </a>
              )
            : (
              <form action="/latest-advice">
                <button type="submit" className="Submit-btn chatCTA">
                  Request new matches &#62;&#62;
                </button>
              </form>
              )
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function PrAuto(props) {
  const actioned = false;
  switch (props.message.prAuto.title) {
    case 'start':
      return (
        <div className="prauto-start-msg-container">
          <div className="msg-title-container">
              <div className="message-content-box msgTitle alignCenter">
                <span className="prAutoMsgTitle">This is the start of your chat!</span>
              </div>
          </div>
        </div>
      );
    case 'prompt':
      return (
        <div className="prauto-msg-container">
          <div className="msg-title-container">
              <div className="title-emoji-container">
                <i className="emoji-icon crossed-fingers-emoji" />
              </div>
              <div className="message-content-box msgTitle">
                <span className="prAutoMsgTitle">&#91;A Little Reminder&#93; Your mentee Dexter sent you a message, but you haven&#39;t replied yet</span>
              </div>
          </div>
          <div className="message-extras-container">
            <div className="message-extras-border" />
            <div className="msg-extras">
              <div className="message-container noPaddingL noPaddingR noPaddingT">
                <Avatar senderID={props.message.uid} senderName={props.message.author} subtype={props.message.subtype} isProspela={props.isProspela}/>
                <div className="message-content-box">
                  <div className="sent-msg-info">
                    <UserName msgAuthor={props.message.author} senderUID={props.message.uid} subtype={props.message.subtype} isProspela={props.isProspela}/>
                    <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
                  </div>
                  <div className="message-content">
                    <TextParser text={props.message.text}/>
                  </div>
                </div>
              </div>
              <a href="/messages/chatid" className="link msg-extras-ctaTxt">
                Take me to chat &#62;&#62;
              </a>
            </div>
          </div>
        </div>
      );
    case 'match':
     return (
       <div className="prauto-msg-container">
         <div className="msg-title-container">
             <div className="title-emoji-container">
               <i className="emoji-icon tada-emoji" />
             </div>
             <div className="message-content-box msgTitle">
               <span className="prAutoMsgTitle">&#91;NEW MATCH&#93; Prospela has a new mentoring match for you!</span>
             </div>
         </div>
         <div className="msg-extras textLeft">
           {actioned ? (
             <div className="greenText">&#10004; You have already seen the match</div>
           ) : (
             <form action="/latest-advice">
               <button type="submit" className="Submit-btn chatCTA">
                 See Matches &#62;&#62;
               </button>
             </form>
           )}
          </div>
       </div>
     );
    case 'ending':
      return (
        <div className="prauto-msg-container">
          <div className="msg-title-container">
              <div className="title-emoji-container">
                <i className="emoji-icon timer-emoji" />
                <i className="emoji-icon sad-emoji" />
              </div>
              <div className="message-content-box msgTitle">
                <span className="prAutoMsgTitle">Your mentoring match is coming to an end soon</span>
              </div>
          </div>
          <AudioCTA />
        </div>
      );
    case 'ended':
      return (
        <div className="prauto-final-msg-container">
          <div className="msg-title-container">
              <div className="title-emoji-container">
                <i className="emoji-icon timesup-emoji" />
              </div>
              <div className="message-content-box msgTitle">
                <span className="prAutoMsgTitle">Your 3-month match ended</span>
              </div>
          </div>
          <FeedbkCTA />
        </div>
      );
  }
}

function nthCalc(date) {
  if (date > 3 && date < 21) return 'th';
  switch (date % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

function DateCalc(props) {
  var ts = new Date(props.time);
  var today = new Date();
  var tsDate = ts.toDateString()
  var todayDate = today.toDateString();
  var yestDate = new Date((today.setDate(today.getDate()-1))).toDateString()
  var isToday = tsDate == todayDate
  if (isToday) {
    return "Today"
  } else if(tsDate == yestDate) {
    return "Yesterday"
  } else {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    var year = ((ts.getFullYear()===new Date().getFullYear()) ? '' : ' '+ts.getFullYear());
    var month = months[ts.getMonth()];
    var day = days[ts.getDay()];
    var date = ts.getDate();
    var nth = nthCalc(date);
    var time = day + ', ' + month + ' ' + date + nth + year
    return time;
  }
}

class PrMessage extends Component {

  render() {
  const {message,showDateHeader,isAdjacent, isLastPic, handleLastPic, isProspela} = this.props;

    return (
      <React.Fragment>
        {message.id==='100004' && (
          <div className="block-container" id="newMsgs">
            <div className="unread-separator">
              <hr className="unreadSeparator__hr" />
              <div className="unreadSeparator__text">
                <span>new messages</span>
              </div>
            </div>
          </div>
        )}
        {showDateHeader && (
          <div className="block-container dateHeader">
            <div className="date-separator">
              <hr className="separator__hr" />
              <div className="separator__text">
                <span><DateCalc time={message.ts} /></span>
              </div>
            </div>
          </div>
        )}
        <PrMessageContents message={message} isAdjacent={isAdjacent} isLastPic={isLastPic} handleLastPic={handleLastPic} isProspela={isProspela}/>
      </React.Fragment>
    )
  }
}

class PrMessageContents extends Component {

  render() {
    const {isProspela, message, isAdjacent, isLastPic, handleLastPic} = this.props
    const userRole = 'mentor'
    switch (this.props.message.subtype) {
      case "welcome":
        return <WelcomeMessage message={message} userRole={userRole} isProspela={isProspela}/>
      case "finTraining":
        return <FinishedSUMessage message={message} userRole={userRole} isProspela={isProspela}/>
      case "std":
        return <StdMessage message={message} isAdjacent={isAdjacent} isProspela={isProspela}/>
      case "file":
        return <DisplayFile message={message} isLastPic={isLastPic} handleLastPic={handleLastPic} isProspela={isProspela}/>
      case "prAuto":
        return <PrAuto message={message} isProspela={isProspela}/>
      case 'notSent':
        return <MessageNotSent message={message} isProspela={isProspela}/>
      case 'uploadNotSent':
        return <UploadNotSent message={message} handleLastPic={handleLastPic} isProspela={isProspela}/>
      case "menteeReq":
        return <MenteeReq message={message} isProspela={isProspela}/>
      case "mentorAcc":
      case "mentorRej":
        return <MentorReply message={message} isProspela={isProspela}/>
      default:
        return <MenteeReq message={message} isProspela={isProspela}/>
    }
  }
}

export default PrMessage;
