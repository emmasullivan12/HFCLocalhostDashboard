import React, { Component } from "react";
import "../css/PassMenteeContent.css";

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
        <div className="modal-title">
          Help us match you better: Why do you want to pass?
        </div>
        <form>
          <div>Their career desires are not relevant to my role</div>
          <input
            type="radio"
            name="Role"
            className="SubmitMatch-input"
            value="t"
            onClick={this.handleMessageChange}
          />
          <div>They are not interested in my industry</div>
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
          <div>I dont think I know enough about the skills they want to develop</div>
          <input
            type="radio"
            name="Skills"
            className="SubmitMatch-input"
            value="t"
            onClick={this.handleMessageChange}
          />
          <div>I am unfortunately too busy at the moment to take on another mentee</div>
          <input
            type="radio"
            name="Busy"
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
          <button type="submit" disabled={!isEnabled} className="PassMenteeSubmit-btn" onClick={this.updateClassname}>
            Pass
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default PassMenteeContent;
