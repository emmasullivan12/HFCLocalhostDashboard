import React, { Component } from "react";
import "../css/PassMentorContent.css";

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
        <form>
          <div>Not the role I would like to explore</div>
          <input
            type="radio"
            name="Role"
            className="SubmitMatch-input"
            value="t"
            onClick={this.handleMessageChange}
          />
          <div>Not the industry I would like to explore</div>
          <input
            type="radio"
            name="Industry"
            className="SubmitMatch-input"
            value="t"
            onClick={this.handleMessageChange}
          />
          <div>We dont have enough personal interests that relate</div>
          <input
            type="radio"
            name="Interests"
            className="SubmitMatch-input"
            value="t"
            onClick={this.handleMessageChange}
          />
          <div>I dont think they know enough about the skills I want to develop</div>
          <input
            type="radio"
            name="Skills"
            className="SubmitMatch-input"
            value="t"
            onClick={this.handleMessageChange}
          />
          <div>Any other comments to note?</div>
          <input
            type="text"
            name="PassReasonMessage"
            className="PassReasonMessage-Form"
            placeholder="Tell us why this isn't a great match for you..."
            value={this.state.PassReasonMessage}
            onChange={this.handleMessageChange}
          />
          <button type="submit" disabled={!isEnabled} className="PassMentorSubmit-btn" onClick={this.updateClassname}>
            Pass
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default PassMentorContent;
