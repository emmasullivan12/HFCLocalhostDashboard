// Dex last merged this code on 15th sept 2020

import React, { Component } from "react";

class RejectSignUpContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFromServer: '',
      rejectUserReason: ''
    };
  }

  handleInput = (evt) => {
  //  evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (e) => {
    const {rejectUserReason} = this.state;
    const {signup, source} = this.props;

    // Can't remember what our process is for rejecting users i.e. adding them to a certain list.
    // Do we want diff types of rejection i.e. "we need more info" and "hard reject dont bother asking for more"
    const submission = {
      uid: signup.uid,
      acceptRejectNotes: rejectUserReason,
      source: source
    }
    this.setState({ messageFromServer: 'Rejected signup server says' });
  }

  canBeSubmitted() {
    const {source} = this.props;
    return (
      source != ''
    );
  }

  render() {
    const { messageFromServer, rejectUserReason } = this.state;
    const { signup, source } = this.props;
    const isEnabled = this.canBeSubmitted();

    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Are you sure you want to REJECT
          </div>
          <form id="rejectUserForm">
            <textarea
              name="rejectUserSignUp"
              className="form-control-std"
              form="rejectUserSignUp"
              value={rejectUserReason}
              onChange={this.handleInput}
              placeholder="Type rejection reason (not shared with user)..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              maxLength="500"
              autoFocus
            />
            {!isEnabled && (
              <div className="redText">You havent set a source you twat!</div>
            )}
            <br />
            <div className="request-btn-container">
              <button type="button" name="fullAccept" className="Submit-btn" onClick={this.handleSubmit}>
                Reject Sign up
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
            That was mean! Signup REJECTED
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              Now get back to work you tosser.
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}


export default RejectSignUpContent;
