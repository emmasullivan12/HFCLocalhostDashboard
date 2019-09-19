// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";

import AcceptCTA from './AcceptCTA.js';
import AudioCTA from './AudioCTA.js';
import DisplayMsgFile from './DisplayMsgFile.js';
import FeedbkCTA from './FeedbkCTA.js';
import Modal from './Modal.js';

import "../css/Emoji.css";
import "../css/General.css";
import "../css/PrMessage.css";

function Avatar(props) {
  const isPicSet = false; // check if author who sent message has avatar pic set
  const myID = props.senderID;
  const isMe = (props.senderID === myID) ? 'isMe' : 'isntMe';
  return (
    <div className="msg-thumb-container">
      {isPicSet ? (
        <img
          className="msg-thumb img-square"
          src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
          alt={props.senderName}
        />
        )
      : (
        <div className={"msg-thumb img-square noPic "+isMe}>{props.senderName.charAt(0).toUpperCase()}</div>
      )}
    </div>
  );
}

function TimeCalc(props) {
  var ts = new Date(props.time * 1000);
  var hour = ts.getHours();
  var min = ts.getMinutes();
  var ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  min = min >= 0 && min < 10 ? '0'+min : min;
  var timeTxt = hour + ':' + min + ' ' + ampm;
  return timeTxt;
}

function StdMessage(props) {
  return (
    <React.Fragment>
      <div className="block-container">
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
                {props.message.text}
              </div>
              <div className="msgStatus read">
                &#10003; Seen
              </div>
              <div className="msgStatus error">
                &#10007; Error sending message. Please try again
              </div>
            </div>
          </div>
        ):(
          <div className="message-container">
            <Avatar senderID={props.message.uid} senderName={props.message.author}/>
            <div className="message-content-box">
              <div className="sent-msg-info">
                <span className="sender-name">{props.message.author}</span>
                <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
              </div>
              <div className="message-content">
                {props.message.text}
              </div>
              <div className="msgStatus read">
                &#10003; Seen
              </div>
              <div className="msgStatus error">
                &#10007; Error sending message. Please try again
              </div>
            </div>
          </div>
        )
      }
      </div>
    </React.Fragment>
  );
}

function DisplayFile(props) {
  return (
    <React.Fragment>
      <div className="block-container">
        <div className="message-container">
          <Avatar senderID={props.message.uid} senderName={props.message.author}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <span className="sender-name">{props.message.author}</span>
              <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
            </div>
            <div className="message-content">
              <div className="extra-content-container">
                <DisplayMsgFile
                  file={props.message.file}
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
            <div className="message-container noPadding">
              <Avatar senderID={props.message.uid} senderName={props.message.author}/>
              <div className="message-content-box">
                <div className="sent-msg-info">
                  <span className="sender-name">{props.message.author}</span>
                  <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
                </div>
                <div className="message-content">
                  {props.message.text}
                </div>
              </div>
            </div>
            <div className="msg-extras-ctaTxt">
              See Full Profile...
            </div>
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
                <span className="prAutoMsgTitle">Unfortunately, that employee couldn&#39;t accept your request!</span>
                )
              }
            </div>
        </div>
        <div className="message-extras-container">
          <div className="message-extras-border" />
          <div className="msg-extras">
            {subtype === "mentorAcc" ? (
              <a href="/messages/chatID" className="link msg-extras-ctaTxt">
                Click to see their reply &#62;&#62;
              </a>
              )
            : (
              <a href="/latest-advice" className="link msg-extras-ctaTxt">
                Request new matches &#62;&#62;
              </a>
              )
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function PrAuto(props) {
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
              <div className="message-container noPadding">
                <Avatar senderID={props.message.uid} senderName={props.message.author}/>
                <div className="message-content-box">
                  <div className="sent-msg-info">
                    <span className="sender-name">{props.message.author}</span>
                    <span className="msg-sent-time"><TimeCalc time={props.message.ts} /></span>
                  </div>
                  <div className="message-content">
                    {props.message.text}
                  </div>
                </div>
              </div>
              <a href="/messages/chatID" className="link msg-extras-ctaTxt">
                Take me to chat &#62;&#62;
              </a>
            </div>
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
  var ts = new Date(props.time * 1000);
  var today = new Date();
  var isToday = ts.toDateString() == today.toDateString();
  if (isToday) {
    return "Today"
  } else if(ts.toDateString() == new Date((today.setDate(today.getDate()-1))).toDateString()) {
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
  const {message,showDateHeader,isAdjacent} = this.props;

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
          <div className="block-container" id="dateHeader">
            <div className="date-separator">
              <hr className="separator__hr" />
              <div className="separator__text">
                <span><DateCalc time={message.ts} /></span>
              </div>
            </div>
          </div>
        )}
        <PrMessageContents message={message} isAdjacent={isAdjacent}/>
      </React.Fragment>
    )
  }
}

class PrMessageContents extends Component {
  render() {
    switch (this.props.message.subtype) {
      case "std":
        return <StdMessage message={this.props.message} isAdjacent={this.props.isAdjacent}/>
      case "file":
        return <DisplayFile message={this.props.message} />
      case "prAuto":
        return <PrAuto message={this.props.message} />
      case "menteeReq":
        return <MenteeReq message={this.props.message} />
      case "mentorAcc":
      case "mentorRej":
        return <MentorReply message={this.props.message} />
      default:
        return <MenteeReq message={this.props.message} />
    }
  }
}

export default PrMessage;
