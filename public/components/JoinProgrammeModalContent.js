// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";
import "../css/Modal.css";
import "../css/Emoji.css";
import "../css/General.css";

class JoinProgrammeModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progCode: '',
      messageFromServer: ''
    };
  }

  componentDidMount() {
    var tncCheckbox = document.getElementById("tncCheckbox");
    var tncStyle = document.getElementById("tncStyle");
    var tncText = document.getElementById("tncText");
    tncCheckbox.addEventListener('invalid', function(event) {
      tncText.classList.add('error');
      tncStyle.classList.add('error');
    }, false);
    tncCheckbox.addEventListener('change', function(event) {
      if(tncCheckbox.checkValidity()) {
        tncText.classList.remove('error');
        tncStyle.classList.remove('error');
     }
    })
  }

  componentWillUnmount() {
    var tncCheckbox = document.getElementById("tncCheckbox");
    var tncStyle = document.getElementById("tncStyle");
    var tncText = document.getElementById("tncText");
    tncCheckbox.removeEventListener('invalid', function(event) {
      tncText.classList.add('error');
      tncStyle.classList.add('error');
    }, false);
    tncCheckbox.removeEventListener('change', function(event) {
      if(tncCheckbox.checkValidity()) {
        tncText.classList.remove('error');
        tncStyle.classList.remove('error');
     }
    })
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
            <span className="emoji-icon sparkle-emoji titleLeft" />
            <span>Join a live Programme</span>
            <span className="emoji-icon sparkle-emoji titleRight" />
          </div>
          <p className="modalDesc alignCenter">
            Enter an invite code from your teacher or Prospela Partner below (or click the link if they&#39;ve sent you an invite email):
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
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
            />
            {isError && (
              <div className="redText">
                Sorry, that programme doesn&#39;t exist. Make sure you have the correct code.
              </div>
            )}
            <label className="checkbox-container-login" id="tncText">
              I agree to share my Prospela profile with the programme admin for the purposes of providing me career advice & support
              <input type="checkbox" id="tncCheckbox" name="tanp" required />
              <span className="checkmark left" id="tncStyle"/>
            </label>
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
