// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/RequestChatContent.css";
import "../css/Emoji.css";
import "../css/General.css";

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class RequestChatContent extends Component {
  constructor() {
    super();
    this.state = {
      requestChatMessage: '',
    };
  }

  handleMessageChange = (evt) => {
    this.setState({ requestChatMessage: evt.target.value });
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    alert('Chat request sent!');
  }

  canBeSubmitted() {
    const {requestChatMessage} = this.state;
    return (
      requestChatMessage.length > 50
    );
  }

  render() {
    const { requestChatMessage } = this.state;
    const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <div className="modal-title">
          Send a chat request to <span className="request-mentor-name">{this.props.mentorName}</span>
        </div>
        <form>
          <input
            type="text"
            className="textInputBox"
            placeholder="Type your message..."
            value={this.state.requestChatMessage}
            onChange={this.handleMessageChange}
            required
          />
          <div className="descriptor-br">
            (Minimum 50 characters)
          </div>
          <div className="need-ideas-container">
            <div className="ideas-icon-container">
              <i className="far fa-lightbulb" />
            </div>
            <div className="ideas-Title">
              Need ideas for what to say?
            </div>
            <ul className="ideas-list">
              <li className="ideas-list-item">
                <div className="emoji-icon wave-emoji" />
                <div className="idea-item-text"><strong>Introduce yourself</strong> (your name, what you’re studying, your hobbies)</div>
              </li>
              <li className="ideas-list-item">
                <div className="emoji-icon heart-emoji" />
                <div className="idea-item-text"><strong>Your career preferences</strong> (what role, industries interest you)</div>
              </li>
              <li className="ideas-list-item">
                <div className="emoji-icon sunglasses-emoji" />
                <div className="idea-item-text"><strong>Why this mentor</strong> (what would you like them to help you with)</div>
              </li>
            </ul>
          </div>
          <div className="request-btn-container">
            <button type="button" disabled={!isEnabled} className="Submit-btn" onSubmit={this.handleSubmit}>
              Request
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default RequestChatContent;
