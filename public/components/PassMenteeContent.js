// Dex last merged this code on 14th sept 2020

import React, { Component } from "react";
import Checkbox from './Checkbox.js';
import "../css/PassMatchContent.css";
import "../css/General.css";

// Format all multi-line textarea elements

class PassMenteeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passReasonMessage: '',
      passedOnMentee: false,
      messageFromServer: ''
    };
    this.updateClassname = this.updateClassname.bind(this);
  }

  handleInput = (e) => {
//    e.target.style.height = (e.target.scrollHeight) + 'px';
    this.setState({ [e.target.name]: e.target.value });
  }

  handleMessageChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

  updateClassname() {
    this.setState({ passedOnMentee: true });
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
    const { passReasonMessage, passedOnMentee, messageFromServer } = this.state;
    const isEnabled = this.canBeSubmitted();
//    const { onSubmit } = this.props;
    if(messageFromServer === '') {
      return (
        <React.Fragment>
          <div className="modal-preTitle">
            Help us match you better
          </div>
          <div className="modal-subtitle">
            Why do you want to pass?
          </div>
          <form className="pass-form" id="passMenteeForm">
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Their career aspirations are *not relevant* to my role"
              name="Role"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="They are not interested in my *industry*"
              name="Industry"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Not enough relatable *personal interests*"
              name="Interests"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="I dont know enough about the *skills* they want to develop"
              name="Skills"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <Checkbox
              labelClassName="checkbox-container textLeft"
              label="Im *too busy* to take on another mentee"
              name="Busy"
              className="SubmitMatch-input"
              value="1"
              spanClassName="checkmark"
              onChange={this.handleMessageChange}
              required={false}
            />
            <div className="descriptor bold passDescriptor">
              How could we better match you?
            </div>
            <textarea
              name="PassReasonMessage"
              className="form-control-std"
              form="passMenteeForm"
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

export default PassMenteeContent;
