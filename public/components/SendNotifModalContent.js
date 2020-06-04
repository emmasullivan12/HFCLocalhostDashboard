// Dex last merged this code on 4th June 2020 

import React, { Component } from "react";
import Checkbox from './Checkbox.js';

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class SendNotifModalContent extends Component {
  constructor() {
    super();
    this.state = {
      PrNotifMessage: '',
      UserID: '',
    };
  }

  handleInput = (e) => {
    e.target.style.height = (e.target.scrollHeight) + 'px';
    this.setState({ PrNotifMessage: e.target.value });
  }

  handleTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value });
  }

  handleMessageChange = (e) => {
    const currentState = this.state[e.target.name];

    if (currentState === '1') {
      this.setState({
        [e.target.name]: ''
      });

    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
//  handleSubmit = (evt) => {
//    if (!this.canBeSubmitted()) {
//      evt.preventDefault ();
//      return;
//    }
//    alert('Notification sent!');
//  }

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  //canBeSubmitted() {
  //  const { MatchReasonMessage, MenteeID, MentorID } = this.state;
  //  return (
  //    MatchReasonMessage.length > 0 && MenteeID.length > 0 && MentorID.length > 0
  //  );
//  }

  render() {
//    const isEnabled = this.canBeSubmitted();
    const { PrNotifMessage, UserID } = this.state;
    return (
      <React.Fragment>
        <div className="modal-title">
          Send Notification to users
        </div>
        <form id="sendNotifForm">
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Send to All Users?</span>
            <Checkbox
              labelClassName="switch"
              name="SendAll"
              id="sendAll"
              value="1"
              spanClassName="slider round"
              onChange={this.handleMessageChange}
              required={false}
            />
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Send to Mentees only?</span>
            <Checkbox
              labelClassName="switch"
              name="sendMentees"
              id="sendMentees"
              value="1"
              spanClassName="slider round"
              onChange={this.handleMessageChange}
              required={false}
            />
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Send to Mentors only?</span>
            <Checkbox
              labelClassName="switch"
              name="sendMentors"
              id="sendMentors"
              value="1"
              spanClassName="slider round"
              onChange={this.handleMessageChange}
              required={false}
            />
          </div>
          <div>Or Type User IDs</div>
          <input
            type="text"
            name="UserIDs"
            className="textInputBox small"
            placeholder="Enter UserIDs..."
            value={this.state.UserID}
            onChange={this.handleTextChange}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
          />
          <textarea
            name="NewNotif"
            className="textInputBox"
            form="sendNotifForm"
            value={this.state.PrNotifMessage}
            onChange={this.handleInput}
            placeholder="Type message to send as notification..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            required
          />
          <button type="submit" className="Submit-btn">
            Send Notification
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default SendNotifModalContent;
