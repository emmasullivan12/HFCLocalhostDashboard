// Dex last merged this code on 30th June 2020

import React, { Component } from "react";
import "../css/PassMatchContent.css";
import "../css/General.css";

class ReportModalContent extends Component {
  constructor() {
    super();
    this.state = {
      ReportReasonMessage: '',
      ReportedMsg: false,
      messageFromServer: ''
    };
    this.updateClassname = this.updateClassname.bind(this);
  }

  componentDidMount(){
    document.getElementsByTagName("textarea")[0].focus();
  }

  handleInput = (evt) => {
    evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleMessageChange = (evt) => {
    this.setState({ ReportReasonMessage: evt.target.value });
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    this.setState({ messageFromServer: 'Report sent server says' });
  }

  updateClassname() {
    this.setState({ ReportedMsg: true });
    alert('You reported this message!');
  }

  canBeSubmitted() {
    const {ReportReasonMessage} = this.state;
    return (
      ReportReasonMessage.length > 0
    );
  }

  render() {
    const { ReportReasonMessage, ReportedMsg, messageFromServer } = this.state;
    const isEnabled = this.canBeSubmitted();
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-subtitle">
            Do you want to report this message?
          </div>
          <form className="report-form" id="reportMentorForm">
            <div className="descriptor bold passDescriptor">
              Talk to us:
            </div>
            <textarea
              name="ReportReasonMessage"
              className="textInputBox passTxtBox"
              form="reportMentorForm"
              value={this.state.ReportReasonMessage}
              onChange={this.handleInput}
              placeholder="Tell us why you're reporting this message..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              required
            />
            <div className="pass-btn-container">
              <button type="submit" disabled={!isEnabled} className="Submit-btn" onClick={this.updateClassname}>
                Report Message
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
            You reported a message
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              Thanks for letting us know. We&#39;ll be sure to investigate further and will be in touch if we need anything else from you.
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default ReportModalContent;
