// Dex last merged this code on 26th feb 2021

import React, { Component } from "react";
import "../css/RequestChatContent.css";
import "../css/Emoji.css";
import "../css/General.css";

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class RequestChatContent extends Component {
  constructor() {
    super();
    this.state = {
      requestChatMessage: '',
      messageFromServer: '',
    };
  }

  componentDidMount(){
    document.getElementById("menteeReqMentorMsg").focus();
  }

  handleInput = (evt) => {
    evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ requestChatMessage: evt.target.value });
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    const {matchid} = this.props;

    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }

    this.setState({ messageFromServer: 'Request sent for matchid: ' + matchid + ' server says' });
  }

  canBeSubmitted() {
    const {requestChatMessage} = this.state;
    return (
      requestChatMessage.length > 50
    );
  }

  render() {
    const { requestChatMessage, messageFromServer } = this.state;
    const isEnabled = this.canBeSubmitted();
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Send a chat request to <span className="request-mentor-name">{this.props.mentorName}</span>
          </div>
          <form id="reqMentorForm">
            <textarea
              name="requestChatMessage"
              className="form-control-std textInputBox"
              id="menteeReqMentorMsg"
              form="reqMentorForm"
              value={requestChatMessage}
              onChange={this.handleInput}
              placeholder="Type your 'hello' message..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              minLength="50"
              maxLength="1000"
              required
            />
            <div className="descriptor-br form">
              {requestChatMessage.length} / 1000 (Min 50 characters)
            </div>
            <div className="need-ideas-container">
              <div className="ideas-icon-container">
                <i className="far fa-lightbulb" />
              </div>
              <div className="ideas-Title">
                Need ideas for what to say? How about:
              </div>
              <ul className="ideas-list">
                <li className="ideas-list-item">
                  <div className="emoji-icon wave-emoji" />
                  <div className="idea-item-text textLeft"><strong>Introduce yourself!</strong> (your name, current situation, hobbies you enjoy)</div>
                </li>
                <li className="ideas-list-item">
                  <div className="emoji-icon heart-emoji" />
                  <div className="idea-item-text textLeft"><strong>Your career preferences</strong> (why you&#39;re passionate about certain roles or industries interest you)</div>
                </li>
                <li className="ideas-list-item">
                  <div className="emoji-icon sunglasses-emoji" />
                  <div className="idea-item-text textLeft"><strong>Why you&#39;re excited</strong> (what guidance or insights you&#39;r hoping a mentor can help you with)</div>
                </li>
                <li className="ideas-list-item">
                  <div className="emoji-icon questionMark-emoji" />
                  <div className="idea-item-text textLeft"><strong>Ask them a question</strong> (Keep up the conversation flow!)</div>
                </li>
              </ul>
            </div>
            <div className="request-btn-container">
              <button type="button" disabled={!isEnabled} className="Submit-btn" onClick={this.handleSubmit}>
                Request
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="ideas-icon-container">
              <i className="fas fa-paper-plane" />
            </div>
            Request Sent!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              You&#39;ll hear from us asap when your mentor replies. For now, sit back, and if they accept you&#39;ll be able to chat to them soon from your Direct Messages.
            </div>
            <div className="emoji-icon ok-emoji successBox" />
            <div className="showDMPic"/>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default RequestChatContent;
