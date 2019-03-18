import React, { Component } from "react";
import Modal from './Modal.js';
import AcceptMenteeContent from './AcceptMenteeContent.js';
import PassMenteeContent from './PassMenteeContent.js';
import "../css/PrMessage.css";

const AcceptMenteeModalProps = {
  ariaLabel: 'Popup to accept chat with matched Mentee',
  title: 'Accept chat request',
  triggerText: 'Start Chatting',
  usedFor: 'AcceptChat'
}

const AcceptMenteeModalContent = (
  <AcceptMenteeContent />
)

const PassMenteeModalProps = {
  ariaLabel: 'Pass on Mentee',
  title: 'Why did you pass? Help us match you better',
  triggerText: 'Pass on Mentee',
  usedFor: 'PassBtn'
}

const PassMenteeModalContent = (
  <PassMenteeContent />
)

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

function MenteeReq(props) {
  return (
    <div className="prospela-auto-msg-container">
      <div>
        {props.message.text}
      </div>
      <div className="ModalButtons">
        <Modal {...PassMenteeModalProps}>{PassMenteeModalContent}</Modal>
        <Modal {...AcceptMenteeModalProps}>{AcceptMenteeModalContent}</Modal>
      </div>
    </div>
  );
}

class PrMessage extends Component {
  render() {
    const message = this.props.message;

    switch (message.subtype) {
      case 'std':
        return <StdMessage message={message} />
      case 'menteeReq':
        return <MenteeReq message={message} />
    }
  }
}

export default PrMessage;
