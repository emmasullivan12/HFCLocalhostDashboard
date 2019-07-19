// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import "../css/PassMatchContent.css";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class PassMentorContent extends Component {
  constructor() {
    super();
    this.state = {
      PassReasonMessage: '',
      PassedOnMentor: false,
    };
    this.updateClassname = this.updateClassname.bind(this);
  }

  handleMessageChange = (evt) => {
    this.setState({ PassReasonMessage: evt.target.value });
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    alert('Thanks for letting us know!');
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
    const { PassReasonMessage, PassedOnMentor } = this.state;
    const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <div className="modal-preTitle">
          Help us match you better
        </div>
        <div className="modal-subtitle">
          Why do you want to pass?
        </div>
        <form className="pass-form">
          <label className="checkbox-container">Doesn&apos;t have a <strong>role</strong> I&apos;d like to explore
            <input
              type="checkbox"
              name="Role"
              className="SubmitMatch-input"
              value="t"
              onClick={this.handleMessageChange}
            />
            <span className="checkmark" />
          </label>
          <label className="checkbox-container">Isn&apos;t in an <strong>industry</strong> I&apos;m interested in
            <input
              type="checkbox"
              name="Industry"
              className="SubmitMatch-input"
              value="t"
              onClick={this.handleMessageChange}
            />
            <span className="checkmark" />
          </label>
          <label className="checkbox-container">Limited similar <strong>personal interests</strong> to me
            <input
              type="checkbox"
              name="Interests"
              className="SubmitMatch-input"
              value="t"
              onClick={this.handleMessageChange}
            />
            <span className="checkmark" />
          </label>
          <label className="checkbox-container">Doesn&apos;t have any of the <strong>skills</strong> I want to develop
            <input
              type="checkbox"
              name="Skills"
              className="SubmitMatch-input"
              value="t"
              onClick={this.handleMessageChange}
            />
            <span className="checkmark" />
          </label>
          <div className="modal-textbox-title">
            Please comment:
          </div>
          <input
            type="text"
            name="PassReasonMessage"
            className="PassReasonMessage-Form"
            placeholder="Tell us why this isn't a great match for you..."
            value={this.state.PassReasonMessage}
            onChange={this.handleMessageChange}
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
  }
}

export default PassMentorContent;
