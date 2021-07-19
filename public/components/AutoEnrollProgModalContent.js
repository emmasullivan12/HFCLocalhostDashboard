// Dex last merged this code on 19th july 2021

import React, { Component } from "react";
import Checkbox from './Checkbox.js';
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

  toggleCheckbox = (e) => {
    const currentState = this.state[e.target.name];

    if (currentState === false) {
      this.setState({
        [e.target.name]: true,
      });

    } else {
      this.setState({
        [e.target.name]: false
      });
    }
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    this.setState({ messageFromServer: 'Group code sent' });
  }

  canBeSubmitted() {
    const {tanp} = this.state;
    return (
      tanp == true
    );
  }

  render() {
    const { messageFromServer } = this.state;
    const {autoEnrollProgName} = this.props;
    const isError = false;
    const isEnabled = this.canBeSubmitted();
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            <span className="emoji-icon sparkle-emoji titleLeft" />
            <span>Join the {autoEnrollProgName} Group</span>
            <span className="emoji-icon sparkle-emoji titleRight" />
          </div>
          <form className="leftRightPad">
            <Checkbox
              labelId="tncText"
              labelClassName="checkbox-container-login"
              label="I agree to share my Prospela profile with the Group admin for the purposes of providing me career advice & support"
              id="tncCheckbox"
              name="tanp"
              value="1"
              onChange={this.toggleCheckbox}
              spanClassName="checkmark left"
              spanId="tncStyle"
              required={false}
            />
            <div className="request-btn-container">
              <button type="submit" disabled={!isEnabled} className="Submit-btn" onSubmit={this.handleSubmit}>
                Join Group
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
