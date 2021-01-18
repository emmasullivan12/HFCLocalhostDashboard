// Dex last merged this code on 18th jan 2021

import React, { Component } from "react";

class AcceptSignUpContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifiedType: null,
      messageFromServer: '',
      acceptUserNotes: ''
    };
  }

  handleInput = (evt) => {
  //  evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (e) => {
    const {acceptUserNotes} = this.state;
    const {signup, source} = this.props;

    if (e.target.name == "fullAccept") {
      this.setState({
        verifiedType: 1
      })
    } else {
      this.setState({
        verifiedType: 2
      })
    }

    const submission = {
      verifiedType: this.state.verifiedType,
      uid: signup.uid,
      acceptRejectNotes: acceptUserNotes,
      source: source, // take this as will include any updates we might have made
    }

    this.setState({ messageFromServer: 'Accepted signup server says' });
  }

  canBeSubmitted() {
    const {source} = this.props;
    return (
      source != ''
    );
  }

  render() {
    const { messageFromServer, acceptUserNotes } = this.state;
    const { signup, source } = this.props;
    const isEnabled = this.canBeSubmitted();

    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Are you sure you want to accept?
          </div>
          <form id="acceptSignUpForm">
            <div className="need-ideas-container">
              <div className="ideas-Title">
                Did you check?
              </div>
              <ul className="ideas-list textLeft">
                <li className="ideas-list-item">
                  <div className="idea-item-text"><strong>Edu Name (if free text)</strong> matches email domain</div>
                </li>
                <li className="ideas-list-item">
                  <div className="idea-item-text"><strong>LinkedIn profile</strong> matches current situation & institution/verified email domains</div>
                </li>
                <li className="ideas-list-item">
                  <div className="idea-item-text"><strong>Valid source and/or progcode</strong> Is the progcode valid?</div>
                </li>
              </ul>
            </div>
            <textarea
              name="acceptUserSignUp"
              className="form-control-std"
              form="acceptUserSignUp"
              value={acceptUserNotes}
              onChange={this.handleInput}
              placeholder="Type accept reason (not shared with user)..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              maxLength="500"
              autoFocus
            />
            <div>
              <b>Full Accept:</b> Will allow user access to the insitution they signed up with (i.e. Villiers High School)
            </div>
            <div>
              <b>Soft Accept:</b> Will not give user access to institution (i.e. we cannot verify they are from there)
            </div>
            <br />
            {!isEnabled && (
              <div className="redText">You havent set a source you twat!</div>
            )}
            <br />
            <div className="request-btn-container">
              <button type="button" name="fullAccept" className="Submit-btn" onClick={this.handleSubmit}>
                Full Accept
              </button>
              <button type="button" name="softAccept" className="Submit-btn" onClick={this.handleSubmit}>
                Soft Accept
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
            Signup Accepted
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


export default AcceptSignUpContent;
