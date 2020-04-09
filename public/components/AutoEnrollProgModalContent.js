// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
import "../css/Modal.css";
import "../css/Emoji.css";
import "../css/General.css";

class AutoEnrollProgModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFromServer: ''
    };
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    this.setState({ messageFromServer: 'Programme code sent' });
  }

  render() {
    const { messageFromServer } = this.state;
    const {autoEnrollProgName} = this.props;
    const isError = false;
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            <span className="emoji-icon sparkle-emoji titleLeft" />
            <span>Join the {autoEnrollProgName} Programme</span>
            <span className="emoji-icon sparkle-emoji titleRight" />
          </div>
          <form className="leftRightPad">
            <label className="checkbox-container-login" id="tncText">
              I agree to share my Prospela profile with the programme admin for the purposes of providing me career advice & support
              <input type="checkbox" id="tncCheckbox" name="tanp" value="1" />
              <span className="checkmark left" id="tncStyle"/>
            </label>
            <div className="request-btn-container">
              <button type="submit" className="Submit-btn" onSubmit={this.handleSubmit}>
                Join Programme
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
            It&#39;s official!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              You&#39;re now a member of {autoEnrollProgName}.
            </div>
            <p className="landingCTADesc">
              You can access all of your memberships within &#39;My Memberships&#39;
            </p>
            <div className="showProgsPic"/>
          </div>
        </React.Fragment>
      )
    }
  }
}


export default AutoEnrollProgModalContent;
