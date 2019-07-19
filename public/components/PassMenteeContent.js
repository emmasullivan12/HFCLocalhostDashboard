// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import "../css/PassMatchContent.css";
import "../css/General.css";

class PassMenteeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PassReasonMessage: '',
      PassedOnMentee: false,
    };
    this.updateClassname = this.updateClassname.bind(this);
  }

  handleMessageChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  updateClassname() {
    this.setState({ PassedOnMentee: true });
    alert('You passed on this mentee!');
  }

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  canBeSubmitted() {
    const {PassReasonMessage} = this.state;
    return (
      PassReasonMessage.length > 0
    );
  }

  render() {
    const { PassReasonMessage, PassedOnMentee } = this.state;
    const isEnabled = this.canBeSubmitted();
//    const { onSubmit } = this.props;
    return (
      <React.Fragment>
        <div className="modal-preTitle">
          Help us match you better
        </div>
        <div className="modal-subtitle">
          Why do you want to pass?
        </div>
        <form className="pass-form">
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
          <div className="descriptor bold">
            How could we better match you?
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

export default PassMenteeContent;
