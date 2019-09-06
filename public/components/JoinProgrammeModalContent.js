// Dex last merged this code on 27th Aug 2019

import React, { Component } from "react";
import "../css/Modal.css";
import "../css/General.css";

class JoinProgrammeModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progCode: '',
      messageFromServer: ''
    };
  }

  handleInput = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    this.setState({ messageFromServer: 'Programme code sent' });
  }

  canBeSubmitted() {
    const {progCode} = this.state;
    return (
      progCode.length === 6
    );
  }

  render() {
    const { progCode, messageFromServer } = this.state;
    const isError = false;
    //const isEnabled = this.canBeSubmitted();
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Join a live Programme
          </div>
          <p className="modalDesc alignCenter">
            To join a programme enter an invite code from your teacher or Prospela Partner below (or click the link if they&#39;ve sent you an invite email):
          </p>
          <form className="leftRightPad">
            <input
              type="text"
              name="progCode"
              className="form-control-std width80pc"
              id="progCode"
              value={this.state.progCode}
              onChange={this.handleInput}
              placeholder="Type your invite code..."
              required
              minLength="6"
              maxLength="6"
            />
            {isError && (
              <div className="redText">
                Sorry, that programme doesn&#39;t exist. Make sure you have the correct code.
              </div>
            )}
            <div className="request-btn-container">
              <button type="submit" className="Submit-btn" onSubmit={this.handleSubmit}>
                Join Programme
              </button>
            </div>
          </form>
          <div className="neutralText alignCenter">
            Don&#39;t have a code? Click to get your school to pay ;)
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon tada-emoji successBox" />
            It&#39;s official!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              You&#39;re now a member of [LIVE PROGRAMME NAME]. You can now access your memberships within &#39;My Memberships&#39;.
            </div>
            <div className="showDMPic"/>
          </div>
        </React.Fragment>
      )
    }
  }
}


export default JoinProgrammeModalContent;
