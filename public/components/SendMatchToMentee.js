// Dex last merged this code on 15th sept 2020

import React, { Component } from "react";

class SendMatchToMentee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMatchMessage: '',
      messageFromServer: ''
    };
  }

  handleInput = (evt) => {
  //  evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    this.setState({ messageFromServer: 'Match sent' });
  }

  render() {
    const { sendMatchMessage, messageFromServer } = this.state;
    const { mentorName, menteeName } = this.props;
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Send a match to <span className="request-mentor-name">{menteeName} (mentee)</span>
          </div>
          <div className="input-accompanyText above"><i>&#8220;Hi @{menteeName},</i></div>
          <div className="input-accompanyText"><i>I&#39;ve shared a profile of {mentorName} with you below, who I think could be a great match for you. </i></div>
          <form id="sendMatchForm">
            <textarea
              name="sendMatchMessage"
              className="form-control-std sendMatch"
              form="sendMatchForm"
              value={sendMatchMessage}
              onChange={this.handleInput}
              placeholder="Add optional message..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              maxLength="1000"
              autoFocus
            />
            <div className="input-accompanyText below">
              <i>If you&#39;re happy simply click &#8220;Accept&#8221; to get chatting :) If you&#39;re unsure, feel free to ask my any questions before responding - happy to help!&#8221;</i>
            </div>
            <div className="descriptor-br form">
              {sendMatchMessage.length} / 1000 (Min 50 characters)
            </div>
            <div className="request-btn-container">
              <button type="button" className="Submit-btn" onSubmit={this.handleSubmit}>
                Send Match
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon tada-emoji successBox" />
            Match Sent!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              We&#39;ll chase the mentor & mentee for you until they respond / time out (in which case they&#39;ll go back into the &#39;To be Matched&#39; tab)
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}


export default SendMatchToMentee;
