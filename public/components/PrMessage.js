// Dex last merged this code on 16th May 2019

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
  return (
    <div className="msg-thumb-container">
      <img
        className="msg-thumb img-square"
        src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
        alt={props.senderName}
      />
    </div>
  );
}

function StdMessage(props) {
  return (
    <React.Fragment>
      <div className="block-container">
        <div className="message-container">
          <Avatar senderID={props.message.uid} senderName={props.message.author}/>
          <div className="message-content-box">
            <div className="sent-msg-info">
              <span className="sender-name">{props.message.author}</span>
              <span className="msg-sent-time">{props.message.time}</span>
            </div>
            <div className="message-content">
              {props.message.text}
            </div>
          </div>
        </div>
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
              <span className="msg-sent-time">{props.message.time}</span>
            </div>
            <div className="message-content">
              <div className="extra-content-container">
                <DisplayMsgFile
                  file={props.message.file}
                />
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
              <span className="prAutoMsgTitle">&#91;NEW CHAT REQUEST&#93; {props.message.text}</span>
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
                  <span className="msg-sent-time">{props.message.time}</span>
                </div>
                <div className="message-content">
                  {props.message.chatReq.reqMsg}
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

function PrAuto(props) {
  switch (props.message.prAuto.title) {
    case 'prompt':
      return (
        <div className="prauto-msg-container">
          Reminder to reply to message
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

class PrMessage extends Component {
  render() {
    switch (this.props.message.subtype) {
      case "std":
      case 'mentorAcc':
        return <StdMessage message={this.props.message} />
      case "file":
        return <DisplayFile message={this.props.message} />
      case "prAuto":
        return <PrAuto message={this.props.message} />
      case "menteeReq":
        return <MenteeReq message={this.props.message} />
      default:
        return <MenteeReq message={this.props.message} />
    }
  }
}

export default PrMessage;
