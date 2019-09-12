// Dex last merged this code on 27th Aug 2019

import React, { Component } from "react";
import "../css/RequestChatContent.css";
import "../css/Emoji.css";
import "../css/General.css";

class AcceptMenteeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptMenteeMessage: '',
      messageFromServer: ''
    };
  }

  handleInput = (evt) => {
    evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    this.setState({ messageFromServer: 'Pass sent server says' });
  }

  canBeSubmitted() {
    const {acceptMenteeMessage} = this.state;
    return (
      acceptMenteeMessage.length > 50
    );
  }

  render() {
    const { acceptMenteeMessage, messageFromServer } = this.state;
    const isEnabled = this.canBeSubmitted();
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Accept chat request
          </div>
          <form id="acceptMenteeForm">
            <textarea
              name="acceptMenteeMessage"
              className="textInputBox"
              form="acceptMenteeForm"
              value={this.state.acceptMenteeMessage}
              onChange={this.handleInput}
              placeholder="Type your message..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
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
                  <div className="idea-item-text"><strong>Introduce yourself</strong> (your name, what you’re working on, your hobbies)</div>
                </li>
                <li className="ideas-list-item">
                  <div className="emoji-icon heart-emoji" />
                  <div className="idea-item-text"><strong>Your career path</strong> (what role / industries you have experience in)</div>
                </li>
                <li className="ideas-list-item">
                  <div className="emoji-icon sunglasses-emoji" />
                  <div className="idea-item-text"><strong>Why this mentee</strong> (what you think you can help them with)</div>
                </li>
              </ul>
            </div>
            <div className="request-btn-container">
              <button type="submit" disabled={!isEnabled} className="Submit-btn" onSubmit={this.handleSubmit}>
                Accept
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon tada-emoji successBox" />
            You&#39;re the best!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              You accepted a new mentee. You can now access your new chat from within your Direct Messages.
            </div>
            <div className="showDMPic"/>
          </div>
        </React.Fragment>
      )
    }
  }
}


export default AcceptMenteeContent;
