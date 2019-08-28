// Dex last merged this code on 10th August 2019

import React, { Component } from "react";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class SendNotifModalContent extends Component {
  constructor() {
    super();
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
    return (
      <React.Fragment>
        <div className="modal-title">
          Send Notification to users
        </div>
        <button type="button" className="Submit-btn" >
          Send Notification
        </button>
      </React.Fragment>
    );
  }
}

export default SendNotifModalContent;
