// Dex last merged this code on 27th Aug 2019

import React, { Component } from "react";
import "../css/PassMatchContent.css";
import "../css/General.css";


// Format all multi-line textarea elements




class PassMenteeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PassReasonMessage: '',
      PassedOnMentee: false,
      messageFromServer: ''
    };
    this.updateClassname = this.updateClassname.bind(this);
  }

  handleInput = (evt) => {
    evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleMessageChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  updateClassname() {
    this.setState({ PassedOnMentee: true });
    this.setState({ messageFromServer: 'Pass sent server says' });
  }

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  canBeSubmitted() {
    const {PassReasonMessage} = this.state;
    return (
      PassReasonMessage.length > 0
    );
  }

  render() {
    const { PassReasonMessage, PassedOnMentee, messageFromServer } = this.state;
    const isEnabled = this.canBeSubmitted();
//    const { onSubmit } = this.props;
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-preTitle">
            Help us match you better
          </div>
          <div className="modal-subtitle">
            Why do you want to pass?
          </div>
          <form className="pass-form" id="passMenteeForm">
            <label className="checkbox-container">Their career aspirations are <strong>not relevant</strong> to my role
              <input
                type="checkbox"
                name="Role"
                className="SubmitMatch-input"
                value="t"
                onClick={this.handleMessageChange}
              />
              <span className="checkmark" />
            </label>
            <label className="checkbox-container">They are <strong>not interested in my industry</strong>
              <input
                type="checkbox"
                name="Industry"
                className="SubmitMatch-input"
                value="t"
                onClick={this.handleMessageChange}
              />
              <span className="checkmark" />
            </label>
            <label className="checkbox-container">Not enough relatable <strong>personal interests</strong>
              <input
                type="checkbox"
                name="Interests"
                className="SubmitMatch-input"
                value="t"
                onClick={this.handleMessageChange}
              />
              <span className="checkmark" />
            </label>
            <label className="checkbox-container">I dont know enough about the <strong>skills</strong> they want to develop
              <input
                type="checkbox"
                name="Skills"
                className="SubmitMatch-input"
                value="t"
                onClick={this.handleMessageChange}
              />
              <span className="checkmark" />
            </label>
            <label className="checkbox-container">Im <strong>too busy</strong> to take on another mentee
              <input
                type="checkbox"
                name="Busy"
                className="SubmitMatch-input"
                value="t"
                onClick={this.handleMessageChange}
              />
              <span className="checkmark" />
            </label>
            <div className="descriptor bold passDescriptor">
              How could we better match you?
            </div>
            <textarea
              name="PassReasonMessage"
              className="textInputBox passTxtBox"
              form="passMenteeForm"
              value={this.state.PassReasonMessage}
              onChange={this.handleInput}
              placeholder="Tell us why this isn't a great match for you..."
              required
            />
            <div className="pass-btn-container">
              <button type="submit" disabled={!isEnabled} className="Submit-btn" onClick={this.updateClassname}>
                Pass
                </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon peace-emoji successBox" />
            You passed
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              Thanks for letting us know why this wasn&#39;t such a great match for you. It will help us do better next time.
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default PassMenteeContent;
