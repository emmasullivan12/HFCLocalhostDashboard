// Dex last merged this code on 3rd july 2020

import React, { Component } from "react";

import {LoadingSpinner} from './GeneralFunctions.js';

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class NoSuggestionsCTAContent extends Component {
  constructor() {
    super();
    this.state = {
      schNameFreeTextModal: '',
      uniNameFreeTextModal: '',
      messageFromServer: '',
      isSubmitting: false,
    };
  }

  componentDidMount(){
    document.getElementById("eduNameFreeTextModal").focus();
  }

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  handleKeyUp = (e) => {
    e.persist();

    clearTimeout(this.timerHandle);

    this.timerHandle = setTimeout(() => {
      this.handleMoveNext()
      this.timerHandle = 0;
    }, 800);
  }

  handleMoveNext = () => {
    const { eetStatusLocal } = this.props;
    if (this.canBeSubmitted() === true) {
      document.getElementById("Submit-btn-addEdu").focus()
    }
  }

  handleChange = (e) => {
    const { eetStatusLocal } = this.props;

    if (eetStatusLocal === "sch") {
      this.setState({
        schNameFreeTextModal: e.target.value
      });
    } else if (eetStatusLocal === "uni") {
      this.setState({
        uniNameFreeTextModal: e.target.value
      });
    } else {
      return; // not currently using Autocomplete for anything other than sch & uni
    }
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (e) => {
    if (!this.canBeSubmitted()) {
      e.preventDefault();
      return;
    } else {
      const { eetStatusLocal, handleSchChange, handleUniChange } = this.props;
      const { schNameFreeTextModal, uniNameFreeTextModal } = this.state;

      if (eetStatusLocal === "sch") {
        this.setState({
          messageFromServer: 'We are saving down your school name in free text!',
          isSubmitting: true,
        })
        handleSchChange(schNameFreeTextModal);

      } else if (eetStatusLocal === "uni") {
        this.setState({
          messageFromServer: 'We are saving down your uni name in free text!',
          isSubmitting: true,
        })
        handleUniChange(uniNameFreeTextModal)
      }
    }
  }

  onKeyDown = e => {
    var key = e.key || e.keyCode
    
    // User pressed the enter key
    if (key === 'Enter' || key === 13) {
      if (!this.canBeSubmitted()) {
        e.preventDefault ();
        return;
      } else {
        this.handleSubmit();
      }
    }
  };

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  canBeSubmitted() {
    const {schNameFreeTextModal, uniNameFreeTextModal} = this.state;
    const {maxLength} = this.props;

    if ((schNameFreeTextModal.length >= 2 && schNameFreeTextModal.length <= maxLength) || (uniNameFreeTextModal.length >= 2 && uniNameFreeTextModal.length <= maxLength)) {
      return true
    } else {
      return false
    }
  }

  render() {
    const {onKeyDown } = this;
    const { messageFromServer, isSubmitting } = this.state;
    const { country, eetStatusLocal, maxLength } = this.props;
    const isEnabled = this.canBeSubmitted();
    if(messageFromServer === '') {
      return (
        <React.Fragment>
          <div className="modal-preTitle">
            Sorry about that...
          </div>
          <div className="modal-subtitle">
            What&#39;s your {eetStatusLocal === 'uni' ? 'University' : (country === 'GBR' ? 'School' : 'High School')} name?
          </div>
          <form className="eduFreeText-form" id="eduFreeTextForm">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="schName">Your <strong>{eetStatusLocal === 'uni' ? 'University' : (country === 'GBR' ? 'School' : 'High School')}</strong> name?</label>
            <input
              name="eduNameFreeText"
              id="eduNameFreeTextModal"
              className="form-control-std"
              form="eduFreeTextForm"
          //    value={eetStatusLocal === "sch" ? schNameFreeTextModal : uniNameFreeTextModal}
          //    onChange={this.handleChange}
              onKeyDown={this.onKeyDown}
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
              placeholder={country === 'GBR' ? "School or College" : "High School"}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              maxLength={maxLength}
              required
            />
            <div className="pass-btn-container">
              <button type="button" disabled={isSubmitting === true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn" id="Submit-btn-addEdu">
                {isSubmitting === true && (
                  <LoadingSpinner />
                )}
                {isSubmitting != true && (
                  <span>Submit for Review</span>
                )}
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
            Education institution submitted
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              We&#39;ll review as soon as we can. For now, feel free to continue your sign up!
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default NoSuggestionsCTAContent;
