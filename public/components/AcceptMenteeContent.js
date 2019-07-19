// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import "../css/RequestChatContent.css";

class AcceptMenteeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptMenteeMessage: '',
    };
  }

  handleMessageChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    alert('Chat request sent!');
  }

  canBeSubmitted() {
    const {acceptMenteeMessage} = this.state;
    return (
      acceptMenteeMessage.length > 50
    );
  }

  render() {
    const { acceptMenteeMessage } = this.state;
    const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <div className="modal-title">
          Accept chat request
        </div>
        <form>
          <input
            type="text"
            name="acceptMenteeMessage"
            className="requestChatMessage-Form"
            placeholder="Type your message"
            value={this.state.acceptMenteeMessage}
            onChange={this.handleMessageChange}
            required
          />
          <div className="textInputDetail">
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
                <div className="wave-emoji-icon" />
                <div className="idea-item-text"><strong>Introduce yourself</strong> (your name, what you’re working on, your hobbies)</div>
              </li>
              <li className="ideas-list-item">
                <div className="heart-emoji-icon" />
                <div className="idea-item-text"><strong>Your career path</strong> (what role / industries you have experience in)</div>
              </li>
              <li className="ideas-list-item">
                <div className="sunglasses-emoji-icon" />
                <div className="idea-item-text"><strong>Why this mentee</strong> (what you think you can help them with)</div>
              </li>
            </ul>
          </div>
          <div className="request-btn-container">
            <button type="submit" disabled={!isEnabled} className="RequestChat-btn" onSubmit={this.handleSubmit}>
              Accept
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}


export default AcceptMenteeContent;
