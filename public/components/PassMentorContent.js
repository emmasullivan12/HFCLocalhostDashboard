// Dex last merged this code on 7th sept 2020

import React, { Component } from "react";
import Checkbox from './Checkbox.js';
import "../css/PassMatchContent.css";
import "../css/General.css";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class PassMentorContent extends Component {
  constructor() {
    super();
    this.state = {
      PassReasonMessage: '',
      PassedOnMentor: false,
      messageFromServer: ''
    };
    this.updateClassname = this.updateClassname.bind(this);
  }

  handleInput = (e) => {
    e.target.style.height = (e.target.scrollHeight) + 'px';
    this.setState({ [e.target.name]: e.target.value });
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
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    this.setState({ messageFromServer: 'Pass sent server says' });
  }

  // This updates the CSS if Student clicks to Pass on Mentor
  updateClassname() {
    this.setState({ PassedOnMentor: true });
    alert('You passed on this mentor!');
  }

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  canBeSubmitted() {
    const {PassReasonMessage} = this.state;
    return (
      PassReasonMessage.length > 0
    );
  }

  render() {
    const { PassReasonMessage, PassedOnMentor, messageFromServer } = this.state;
    const isEnabled = this.canBeSubmitted();
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-preTitle">
            Help us match you better
          </div>
          <div className="modal-subtitle">
            Why do you want to pass?
          </div>
          <form className="pass-form" id="passMentorForm">
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Doesn't have a role I'd like to explore"
              name="Role"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Isn't in an industry I'm interested in"
              name="Industry"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Limited similar personal interests to me"
              name="Interests"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Doesn't have any of the skills I want to develop"
              name="Skills"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <div className="descriptor bold passDescriptor">
              Please comment:
            </div>
            <textarea
              name="PassReasonMessage"
              className="textInputBox passTxtBox"
              form="passMentorForm"
              value={this.state.PassReasonMessage}
              onChange={this.handleInput}
              placeholder="Tell us why this isn't a great match for you..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
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
            <div className="emoji-icon successBox fa">
              <i className="far fa-hand-peace"/>
            </div>
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

export default PassMentorContent;
