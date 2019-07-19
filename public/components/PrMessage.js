// Dex last merged this code on 16th May 2019

import React, { Component } from "react";

import AcceptMenteeContent from './AcceptMenteeContent.js';
import DisplayMsgFile from './DisplayMsgFile.js';
import Modal from './Modal.js';
import PassMenteeContent from './PassMenteeContent.js';

import "../css/PrMessage.css";

const AcceptMenteeModalProps = {
  ariaLabel: 'Popup to accept chat with matched Mentee',
  triggerText: 'Accept Mentee',
  usedFor: 'msgExtras-accept'
}

const PassMenteeModalProps = {
  ariaLabel: 'Pass on Mentee',
  triggerText: 'Pass',
  usedFor: 'msgExtras-pass'
}

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

class MsgExtrasCTA extends Component {
  constructor () {
    super();
    this.state = {
      CTAcompleted: false,
      accepted: false
    }
  }

  render() {
    const {CTAcompleted, accepted} = this.state;

    switch (CTAcompleted) {
      case true:
        return (
          <div className="msg-extras-btns">
            {accepted ? (
              <div className="acceptText">&#10004; You Accepted</div>
            ) : (
              <div className="passedText">&#10008; You Passed</div>
            )}
          </div>
        );
      case false:
        return (
          <div className="msg-extras-btns">
            <Modal {...AcceptMenteeModalProps}>
              <AcceptMenteeContent />
            </Modal>
            <Modal {...PassMenteeModalProps}>
              <PassMenteeContent />
            </Modal>
          </div>
        );
    }
  }
}

function MenteeReq(props) {
  return (
    <React.Fragment>
      <div className="prospela-auto-msg-container">
        <div className="msg-title-container">
            <div className="title-emoji-container">
              <i className="tada-emoji-icon" />
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
        <MsgExtrasCTA />
      </div>
    </React.Fragment>
  );
}

function PrAuto(props) {
  return (
    <div className="prospela-auto-msg-container">
      <div>
        {props.message.text}
        {props.message.time}
      </div>
    </div>
  );
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
