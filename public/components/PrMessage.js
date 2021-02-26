// Dex last merged this code on 26th feb 2021

import React, { Component } from "react";

//import AcceptCTA from './AcceptCTA.js';
import AudioCTA from './AudioCTA.js';
import Avatar from './Avatar.js';
import DisplayMsgFile from './DisplayMsgFile.js';
import EmojiReactions from './EmojiReactions.js';
import FeedbkCTA from './FeedbkCTA.js';
import FullPageModal from './FullPageModal.js';
import {isIE, DateCalc} from './GeneralFunctions.js';
import MenteeProfileContent from './MenteeProfileContent.js';
import UserRej from './UserRej.js';
import MentorProfileContent from './MentorProfileContent.js';
import MessageActions from './MessageActions.js';
import Modal from './Modal.js';
import PrModAuto from './PrModAutoMsgs.js';
import UserBadge from './UserBadge.js';
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
  // Element receiving focus/click/hover which is making message blur
  const newTargetElement = isIE() ? document.activeElement : e.relatedTarget;

  // If clicking off "more actions" modal
  if(e.target.className === 'msgActions-btn tooltip moreActions' && (newTargetElement == null || newTargetElement.className != 'ModalOpenBtn ModalOpenBtn-ReportMsg')) {
    // hide the "more actions" modal
    e.target.nextSibling.classList.remove('active');
  }
}

//onFocusOut={toggleMoreActionsBlur}

function WelcomeMessage(props) {
  const fname = 'Dexter'
  const mentorText = '~*You\'re amazing, @' + fname + '!*~ \n\nBy signing up, you\'re making a dream career that little bit more accessible for somebody! 🎉\n\n*So, what now?*\n📷 If you\'re supporting under 18s, ~upload your photo ID selfie~ & CV/Resume or LinkedIn URL\n🎓 ~Complete our short & sweet training~. It\'s mandatory before we introduce you to students and will help you feel fully equipped in supporting students across the Prospela network!\n🔗 Once you\'re good to go, our employee of the month (Penny 👩🏼‍🔧) will get busy matching you!\n\n*Questions, thoughts, feedback?*\nWe\'re all ears. Simply shoot us a DM in this "Prospela Bot" chat and one of the team will get back to you asap 😃\n_How did you find the sign up process so far?_'

  const menteeText = '~*Nice job, @' + fname + '!*~ \n\nBy signing up, you\'ve just made your dream career that little bit more accessible! 🎉\n\n*So, what now?*\n🎓 ~Complete our short & sweet training~. It\'s mandatory before we introduce you to real employees and will help you feel fully equipped to make the most of your new network, incl. learning how to build a professional relationship online, and more!\n🔗 Once you\'re good to go, our employee of the month (Penny 👩🏼‍🔧) will get busy matching you!\n\n*Questions, thoughts, feedback?*\nWe\'re all ears.\nSimply shoot us a DM in this "Prospela Bot" chat and one of the team will get back to you asap 😃\n_How did you find the sign up process so far?_'

  const text = props.userRole === 'mentor' ? mentorText : menteeText

  return (
    <React.Fragment>
      <div className="block-container" onBlur={toggleMoreActionsBlur} >
        <div className="message-container">
          <Avatar userID={props.message.uid} userName={props.message.author} isProspelaAuto={props.isProspelaAuto}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName fname={props.message.author} userUID={props.message.uid} isProspelaAuto={props.isProspelaAuto}/>
              <UserBadge badgeType='isPrBot' />
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

// In Group prospelabot welcome message for demos
// const text = '~*Welcome, new joiners!*~\n*Next steps*\n💬 Feel free to user this general channel to chit chat with your fellow E-Mentors, the Prospela team & your group\'s amazing founding team!\n📋 Check back here for the latest tips, resources & announcements to help you get the most out of your mentoring experience.\n\n*Questions, thoughts, something to shout about?* Shout about it in this general channel or DM the Prospela team via ProspelaBot 😎'

function FinishedSUMessage(props) {
  const fname = 'Dexter'
  const mentorText = '~*Nice job, @' + fname + '!*~ \n\n*Next steps*\n🔗 Sit back and relax as ol\' employee of the month Penny 👩🏼‍🔧 matches you with a mentee based on what you\'ve told us about your career to date, skills & interests. She\'s pretty darn good at it! _Note: It can take a few weeks to find a relevant match!_ \n💬 When your mentee accepts, they\'ll send you a message (you\'ll receive an email too) and we\'ll create a private channel for you which will appear over there <<👀 in your "Direct Messages"\n📋 We\'ll also send you some info on their current career aspirations, skills & interests to help you kick off the convo!\n\n*Coming soon*\n-We\'ll be launching a new “hello-mentors” channel: a place where you can talk with the rest of our mentor community 😎, the Prospela team and where we will post the latest updates. So keep your eyes peeled!\n\n*Questions, thoughts, feedback?* Simply shoot us a DM in this "Prospela Bot" chat and one of the team will get back to you asap 😃'

  const menteeText = '~*Nice job, @' + fname + '!*~ \n\n*Next steps*\n🔗 Sit back and relax as ol\' employee of the month Penny 👩🏼‍🔧 matches you with an employee mentor based on what you\'ve told us about your preferred industry/role. She\'s pretty darn good at it! _Note: It can take a few weeks to find a relevant match!_ \n📋 We\'ll also send you some info on their skills & interests to help you kick off the convo and send them your first message!\n💬 When your E-Mentor accepts, they\'ll reply to your message (you\'ll receive an email too) and we\'ll create a private channel for you which will appear over there <<👀 in your "Direct Messages"\n\n*Coming soon*\n-We\'ll be launching a new “hello-mentees” channel: a place where you can talk with other mentees 😎, the Prospela team and where we will post the latest updates. So keep your eyes peeled!\n\n*Questions, thoughts, feedback?* Simply shoot us a DM in this "Prospela Bot" chat and one of the team will get back to you asap 😃'

  const text = props.userRole === 'mentor' ? mentorText : menteeText

  return (
    <React.Fragment>
      <div className="block-container" onBlur={toggleMoreActionsBlur} >
        <div className="message-container">
          <Avatar userID={props.message.uid} userName={props.message.author} isProspelaAuto={props.isProspelaAuto}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName fname={props.message.author} userUID={props.message.uid} isProspelaAuto={props.isProspelaAuto}/>
              <UserBadge badgeType='isPrBot' />
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
  const showReactions = (props.message.reactions != null && props.message.reactions.length > 0) ? true : false
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
              {showReactions && (
                <EmojiReactions msgID={props.message.id} reactions={props.message.reactions}/>
              )}
              <div className="msgStatus read">
                &#10003; Seen
              </div>
              <div className="msgStatus error">
                &#10007; Error sending message. Please try again
              </div>
            </div>
            <MessageActions msgID={props.message.id}/>
          </div>
        ):(
          <div className="message-container">
            <Avatar userID={props.message.uid} userName={props.message.author} isProspelaAuto={props.isProspelaAuto} picSize={40}/>
            <div className="message-content-box">
              <div className="sent-msg-info">
                <UserName fname={props.message.author} userUID={props.message.uid} isProspelaAuto={props.isProspelaAuto} isProspelaTeam={props.isProspelaTeam} isFounder={props.isFounder} isPM={props.isPM}/>
                {props.isProspelaTeam && (
                  <UserBadge badgeType='isPrTeam' />
                )}
                {props.isFounder && (
                  <UserBadge badgeType='founder' />
                )}
                {props.isPM && (
                  <UserBadge badgeType='pm' />
                )}
                <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
              </div>
              <div className="message-content">
                <TextParser text={props.message.text}/>
              </div>
              {showReactions && (
                <EmojiReactions msgID={props.message.id} reactions={props.message.reactions}/>
              )}
              <div className="msgStatus read">
                &#10003; Seen
              </div>
              <div className="msgStatus error">
                &#10007; Error sending message. Please try again
              </div>
            </div>
            <MessageActions msgID={props.message.id}/>
          </div>
        )
      }
      </div>
    </React.Fragment>
  );
}

function DisplayFile(props) {
  const showReactions = (props.message.reactions && props.message.reactions.length > 0) ? true : false
  return (
    <React.Fragment>
      <div className="block-container" onBlur={toggleMoreActionsBlur}>
        <div className="message-container">
          <Avatar userID={props.message.uid} userName={props.message.author} isProspelaAuto={props.isProspelaAuto} picSize={40}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName fname={props.message.author} userUID={props.message.uid} isProspelaAuto={props.isProspelaAuto} isProspelaTeam={props.isProspelaTeam} isFounder={props.isFounder} isPM={props.isPM}/>
              {props.isProspelaTeam && (
                <UserBadge badgeType='isPrTeam' />
              )}
              {props.isFounder && (
                <UserBadge badgeType='founder' />
              )}
              {props.isPM && (
                <UserBadge badgeType='pm' />
              )}
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
            {showReactions && (
              <EmojiReactions msgID={props.message.id} reactions={props.message.reactions}/>
            )}
            <div className="msgStatus read">
              &#10003; Seen
            </div>
            <div className="msgStatus error">
              &#10007; Error sending message. Please try again
            </div>
          </div>
          <MessageActions msgID={props.message.id}/>
        </div>
      </div>
    </React.Fragment>
  );
}

function MessageNotSent(props) {
  return (
    <React.Fragment>
      <div className="block-container">
        <div className="message-container">
          <Avatar userID={props.message.uid} userName={props.message.author} isProspelaAuto={props.isProspelaAuto} picSize={40}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName fname={props.message.author} userUID={props.message.uid} isProspelaAuto={props.isProspelaAuto} isProspelaTeam={props.isProspelaTeam} isFounder={props.isFounder} isPM={props.isPM}/>
              {props.isProspelaTeam && (
                <UserBadge badgeType='isPrTeam' />
              )}
              {props.isFounder && (
                <UserBadge badgeType='founder' />
              )}
              {props.isPM && (
                <UserBadge badgeType='pm' />
              )}
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
          <Avatar userID={props.message.uid} userName={props.message.author} isProspelaAuto={props.isProspelaAuto} picSize={40}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <UserName fname={props.message.author} userUID={props.message.uid} isProspelaAuto={props.isProspelaAuto} isProspelaTeam={props.isProspelaTeam} isFounder={props.isFounder} isPM={props.isPM}/>
              {props.isProspelaTeam && (
                <UserBadge badgeType='isPrTeam' />
              )}
              {props.isFounder && (
                <UserBadge badgeType='founder' />
              )}
              {props.isPM && (
                <UserBadge badgeType='pm' />
              )}
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

/*function MentorReply(props) {
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
}*/

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
    case 'groupStart':
      return (
        <div className="prauto-start-msg-container">
          <div className="msg-title-container">
              <div className="message-content-box msgTitle alignCenter">
                <span className="prAutoMsgTitle">This is the start of your group chat!</span>
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
                <Avatar userID={props.message.uid} userName={props.message.author} isProspelaAuto={props.isProspelaAuto} picSize={40}/>
                <div className="message-content-box">
                  <div className="sent-msg-info">
                    <UserName fname={props.message.author} userUID={props.message.uid} isProspelaAuto={props.isProspelaAuto}/>
                    <UserBadge badgeType='isPrBot' />
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
/*    case 'match':
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
     );*/
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

class PrMessage extends Component {

  render() {
  const {message,showDateHeader,isAdjacent, isLastPic, handleLastPic, isProspelaAuto, isFounder, isPM, isProspelaTeam} = this.props;

  /*border-color: red;*/
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
          <React.Fragment>
        {/*    <div className="sticky_sentinel sticky_sentinel--bottom"/>
            <div className="sticky_sentinel sticky_sentinel--top"/> */}
            <div className="block-container dateHeader stickyDateHeader">
              <div className="date-separator">
                <hr className="separator__hr" />
                <div className="separator__text">
                  <span><DateCalc time={message.ts} /></span>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        <PrMessageContents
          message={message}
          isAdjacent={isAdjacent}
          isLastPic={isLastPic}
          handleLastPic={handleLastPic}
          isProspelaAuto={isProspelaAuto}
          isProspelaTeam={isProspelaTeam}
          isFounder={isFounder}
          isPM={isPM}
        //  grabSchOrUni={grabSchOrUni}
        //  ukUnisListLoaded={ukUnisListLoaded}
        />
      </React.Fragment>
    )
  }
}

class PrMessageContents extends Component {

  render() {
    const {isProspelaAuto, message, isAdjacent, isLastPic, handleLastPic, isFounder, isPM, isProspelaTeam} = this.props
    const userRole = 'mentor'
    switch (message.subtype) {
      case "welcome":
        return <WelcomeMessage message={message} userRole={userRole} isProspelaAuto/>
      case "finTraining":
        return <FinishedSUMessage message={message} userRole={userRole} isProspelaAuto/>
      case "std":
        return <StdMessage message={message} isAdjacent={isAdjacent} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} isFounder={isFounder} isPM={isPM}/>
      case "file":
        return <DisplayFile message={message} isLastPic={isLastPic} handleLastPic={handleLastPic} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} isFounder={isFounder} isPM={isPM}/>
      case "prAuto":
        return <PrAuto message={message} isProspelaAuto/>

      // These include auto messages to mentee with match profile, to mentor with mentee request message, and to mentee if mentor rejected/accepted
      case "prModAuto":
        return <PrModAuto message={message} isProspelaTeam={isProspelaTeam} />
      case 'notSent':
        return <MessageNotSent message={message} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} isFounder={isFounder} isPM={isPM}/>
      case 'uploadNotSent':
        return <UploadNotSent message={message} handleLastPic={handleLastPic} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} isFounder={isFounder} isPM={isPM}/>

      // These appear in 1:1 chat with Relationship Manager only (i.e. users cant see each others feedback)
      case "menteeRej":
      case "mentorRej":
        return <UserRej message={message} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} />

      default:
        return <StdMessage message={message} isAdjacent={isAdjacent} isProspelaAuto={isProspelaAuto} isProspelaTeam={isProspelaTeam} isFounder={isFounder} isPM={isPM}/>
    }
  }
}

export default PrMessage;
