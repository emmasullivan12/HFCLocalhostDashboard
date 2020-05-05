// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class AddChatModalContent extends Component {
  constructor() {
    super();
    this.state = {
      FirstPrMessage: '',
      UserID: ''
    }
  }

  componentDidMount(){
    document.getElementsByTagName("input")[0].focus();
  }

  handleInput = (evt) => {
    evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ [evt.target.name]: evt.target.type === 'number' ? parseInt(evt.target.value) : evt.target.value });
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
//    alert('Chat added to your list');
//  }

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  //canBeSubmitted() {
  //  const { MatchReasonMessage, MenteeID, MentorID } = this.state;
  //  return (
  //    MatchReasonMessage.length > 0 && MenteeID.length > 0 && MentorID.length > 0
  //  );
//  }

  render() {
  //  const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <div className="modal-title">
          Start a new Direct Message chat
        </div>
        <form id="newDMForm">
          <div>User ID</div>
          <input
            type="text"
            name="UserID"
            className="textInputBox small"
            placeholder="Enter UserID to send a message to..."
            value={this.state.UserID}
            onChange={this.handleMessageChange}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
          />
          <textarea
            name="FirstPrMessage"
            className="textInputBox"
            form="newDMForm"
            value={this.state.FirstPrMessage}
            onChange={this.handleInput}
            placeholder="Send message to user..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            required
          />
          <button type="submit" className="Submit-btn">
            Send Message
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AddChatModalContent;
