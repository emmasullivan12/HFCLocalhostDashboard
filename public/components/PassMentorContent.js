// Dex last merged this code on 26th feb 2021

import React, { Component } from "react";
import Checkbox from './Checkbox.js';
import "../css/PassMatchContent.css";
import "../css/General.css";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class PassMentorContent extends Component {
  constructor() {
    super();
    this.state = {
      passReasonMessage: '',
      messageFromServer: ''
    };
  }

  handleInput = (e) => {
//    e.target.style.height = (e.target.scrollHeight) + 'px';
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
    const {matchid} = this.props;

    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }

    this.setState({ messageFromServer: 'Passed on matchid: ' + matchid + ' server says' });
  }

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  canBeSubmitted() {
    const {passReasonMessage} = this.state;
    return (
      passReasonMessage.length > 0
    );
  }

  render() {
    const { passReasonMessage, messageFromServer } = this.state;
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
              label="Doesn't have a *role* I'd like to explore"
              name="Role"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
          {/*}  <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Isn't in an *industry* I'm interested in"
              name="Industry"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />*/}
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Limited similar *personal interests* to me"
              name="Interests"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Doesn't have any of the *skills* I want to develop"
              name="Skills"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Other"
              name="Other"
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
              name="passReasonMessage"
              className="form-control-std"
              form="passMentorForm"
              value={passReasonMessage}
              onChange={this.handleInput}
              placeholder="Tell us why this isn't a great match for you..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              maxLength="250"
              required
            />
            <div className="descriptor-br form">
              {passReasonMessage.length} / 250
            </div>
            <div className="pass-btn-container">
              <button type="button" disabled={!isEnabled} className="Submit-btn" onClick={this.handleSubmit}>
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
              Thanks for letting us know why this wasn&#39;t such a great match for you. We&#39;ll try to do better next time!
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default PassMentorContent;
