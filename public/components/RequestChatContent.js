import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/RequestChatContent.css";

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
      requestChatMessage.length > 0
    );
  }

  render() {
    const { requestChatMessage } = this.state;
    const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <form>
          <input
            type="text"
            className="requestChatMessage-Form"
            placeholder="Type your message"
            value={this.state.requestChatMessage}
            onChange={this.handleMessageChange}
          />
          <button type="button" disabled={!isEnabled} className="RequestChat-btn" onSubmit={this.handleSubmit}>
            Request
          </button>
        </form>
        <div>
          <div className="needIdeas-Title">
            Need ideas for what to say?
          </div>
          <div><NavLink to="/teams">Link to Teams</NavLink></div>
          <ul>
            <li><span className="bold">Introduce yourself</span> (your name, what you’re studying, your hobbies)</li>
            <li><span className="bold">Your career preferences</span> (what role, industries interest you)</li>
            <li><span className="bold">Why this mentor</span> (what would you like them to help you with)sss</li>
          </ul>
        </div>

      </React.Fragment>
    );
  }
}

export default RequestChatContent;
