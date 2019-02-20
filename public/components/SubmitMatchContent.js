import React, { Component } from "react";
import "../css/SubmitMatchContent.css";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class SubmitMatchContent extends Component {
  constructor() {
    super();
    this.state = {
      MatchReasonMessage: '',
      MenteeID: '',
      MentorID: '',
      MatchReason1: '',
      MatchReason2: ''
    };
  }

  handleMessageChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    alert('Thanks for submitting the match!');
  }

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  canBeSubmitted() {
    const { MatchReasonMessage, MenteeID, MentorID } = this.state;
    return (
      MatchReasonMessage.length > 0 && MenteeID.length > 0 && MentorID.length > 0
    );
  }

  render() {
    const { MatchReasonMessage, MenteeID, MentorID, MatchReason1, MatchReason2 } = this.state;
    const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <form>
          <input
            type="text"
            name="MenteeID"
            className="SubmitMatch-input"
            placeholder="Enter MenteeID..."
            value={this.state.MenteeID}
            onChange={this.handleMessageChange}
          />
          <input
            type="text"
            name="MentorID"
            className="SubmitMatch-input"
            placeholder="Enter MentorID..."
            value={this.state.MentorID}
            onChange={this.handleMessageChange}
          />
          <div>Matched by skill?</div>
          <input
            type="checkbox"
            name="MatchReason1"
            className="SubmitMatch-input"
            value={this.state.MatchReason1}
            onChange={this.handleMessageChange}
          />
          <div>Matched by industry?</div>
          <input
            type="checkbox"
            name="MatchReason2"
            className="SubmitMatch-input"
            value={this.state.MatchReason2}
            onChange={this.handleMessageChange}
          />
          <input
            type="text"
            name="MatchReasonMessage"
            className="SubmitMatch-input"
            placeholder="Let mentee know how they've been matched..."
            value={this.state.MatchReasonMessage}
            onChange={this.handleMessageChange}
          />
        </form>
        <button type="button" disabled={!isEnabled} className="SubmitMatch-btn" onSubmit={this.handleSubmit}>
          Submit Match
        </button>
      </React.Fragment>
    );
  }
}

export default SubmitMatchContent;
