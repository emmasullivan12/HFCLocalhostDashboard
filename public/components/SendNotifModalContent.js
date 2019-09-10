// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class SendNotifModalContent extends Component {
  constructor() {
    super();
    this.state = {
      PrNotifMessage: '',
      UserID: '',
    };
  }

  handleInput = (evt) => {
    evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ PrNotifMessage: evt.target.value });
  }

  handleMessageChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.type === 'number' ? parseInt(evt.target.value) : evt.target.value });
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
            <label className="switch" htmlFor="sendAll" >
              <input
                type="checkbox"
                id="sendAll"
                name="SendAll"
                value="t"
                onClick={this.handleMessageChange}
              />
              <span className="slider round"/>
            </label>
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Send to Mentees only?</span>
            <label className="switch" htmlFor="sendMentees" >
              <input
                type="checkbox"
                id="sendMentees"
                name="sendMentees"
                value="t"
                onClick={this.handleMessageChange}
              />
              <span className="slider round"/>
            </label>
          </div>
          <div className="notifToggleContainer">
            <span className="notifToggleTxt">Send to Mentors only?</span>
            <label className="switch" htmlFor="sendMentors" >
              <input
                type="checkbox"
                id="sendMentors"
                name="sendMentors"
                value="t"
                onClick={this.handleMessageChange}
              />
              <span className="slider round"/>
            </label>
          </div>
          <div>Or Type User IDs</div>
          <input
            type="text"
            name="UserIDs"
            className="textInputBox small"
            placeholder="Enter UserIDs..."
            value={this.state.UserID}
            onChange={this.handleMessageChange}
          />
          <textarea
            name="NewNotif"
            className="textInputBox"
            form="sendNotifForm"
            value={this.state.PrNotifMessage}
            onChange={this.handleInput}
            placeholder="Type message to send as notification..."
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
