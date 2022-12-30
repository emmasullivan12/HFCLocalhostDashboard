// Dex last merged this code on 30th dec 2022

import React, { Component } from "react";

import { NimblePicker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import data from 'emoji-mart/data/emojione.json'
import Avatar from './Avatar.js';
import TextInput from './TextInput.js';

class FlagCommentModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postSuccess: false,
      flagReason: '',
    };
  }

  handleSubmit = (e) => {
    const {flagReason} = this.state
    const { cid } = this.props

    this.setState({ postSuccess: true });

    const submission = {
      flagReason: flagReason,
      cid: cid
    }
  }

  updateFlagReason = (e) => {
    this.setState({ flagReason: e.target.id });
  }

  canBeSubmitted() {
    const {flagReason} = this.state;

    return (
      (flagReason != '')
    );
  }

  render() {
    const { postSuccess } = this.state;
    const isEnabled = this.canBeSubmitted();

    if(postSuccess == false) {
      return (
        <React.Fragment>
          <div className="modal-title">
            Why do you want to flag this comment?
          </div>
          <form className="textLeft marginTop10" onSubmit={this.handleSubmit}>
            <div className="notifToggleContainer contact">
              <div className="commentFlaggingBtns darkGreyText">
                <label className="radioContainer fontSize13">
                  <strong>Spam</strong>
                  <div>Exists only to promote a product or service</div>
                  <input type="radio" id="spam" name="radio" onClick={this.updateFlagReason}/>
                  <span className="radioCheckmark"/>
                </label>
              </div>
            </div>
            <div className="notifToggleContainer contact">
              <div className="commentFlaggingBtns darkGreyText">
                <label className="radioContainer fontSize13">
                  <strong>Rude or abusive</strong>
                  <div>A reasonable person would find this content innappropriate for respectful discourse. Learn more in our <a className="link" href="https://prospela.com/terms-of-use-safeguarding-policy/" target="_blank" rel="noopener noreferrer">Terms of Use & Community Etiquette</a></div>
                  <input type="radio" id="abusive" name="radio" onClick={this.updateFlagReason}/>
                  <span className="radioCheckmark"/>
                </label>
              </div>
            </div>
            <div className="notifToggleContainer contact">
              <div className="commentFlaggingBtns darkGreyText">
                <label className="radioContainer fontSize13">
                  <strong>In need of moderator intervention</strong>
                  <div>A problem not listed above that requires action by a moderator</div>
                  <input type="radio" id="other" name="radio" onClick={this.updateFlagReason}/>
                  <span className="radioCheckmark"/>
                </label>
              </div>
            </div>
            <button className="ModalOpenBtn ModalOpenBtn-postHighlight alignRight" type="submit" disabled={!isEnabled}>Flag comment</button>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <div className="modal-title">
          <div className="emoji-icon tick-emoji successBox" />
          Comment flagged for review.
        </div>
      )
    }
  }
}


export default FlagCommentModalContent;
