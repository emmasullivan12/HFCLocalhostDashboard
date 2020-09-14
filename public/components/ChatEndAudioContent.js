// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";

import "../css/General.css";

class ChatEndAudioContent extends Component {

  render() {
    const {mentorName} = this.props
    const audioDone = false;
    const isEnabled = false;
    return (
      <React.Fragment>
        <div className="modal-title">
          Send a quick Thank You to <span className="request-mentor-name">{mentorName}</span>
        </div>
        <form>
          {audioDone ? (
            <div className="alignCenter">
              <div className="neutralText-large">
                &#10004; Audio Attached
              </div>
              <div className="neutralText-small">
                Remove
              </div>
            </div>
          ) : (
            <div className="request-btn-container">
              <button type="button" className="Submit-btn">
                Record audio
              </button>
            </div>
          )}
          <div className="need-ideas-container">
            <div className="ideas-icon-container">
              <i className="fas fa-microphone-alt" />
            </div>
            <div className="ideas-Title">
              Need ideas for what to say?
            </div>
            <ul className="ideas-list">
              <li className="ideas-list-item">
                <div className="emoji-icon ok-emoji" />
                <div className="idea-item-text"><strong>Say thanks!</strong> Was there anything in particular you found useful or made you think differently?</div>
              </li>
              <li className="ideas-list-item">
                <div className="emoji-icon footprints-emoji" />
                <div className="idea-item-text"><strong>Tell them your next steps</strong> Are you planning to build new skills, do some applications, etc.?</div>
              </li>
              <li className="ideas-list-item">
                <div className="emoji-icon typing-emoji" />
                <div className="idea-item-text"><strong>Would you like to stay in touch?</strong> If so, tell them!</div>
              </li>
            </ul>
          </div>
          <div className="request-btn-container">
            <button type="submit" disabled={!isEnabled} className="Submit-btn" onSubmit={this.handleSubmit}>
              Send
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ChatEndAudioContent;
