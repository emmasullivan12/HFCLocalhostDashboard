// Dex last merged this code on 26th April 2020

import React, { Component } from "react";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class NoSuggestionsCTAContent extends Component {
  constructor() {
    super();
    this.state = {
      schNameFreeTextModal: '',
      uniNameFreeTextModal: '',
      messageFromServer: '',
      timeout: 0
    };
  }

  componentDidMount(){
    document.getElementById("eduNameFreeTextModal").focus();
  }

  handleKeyUp = (e) => {
    e.persist();
    const {timeout} = this.state;

    clearTimeout(timeout);

    this.setState({
      timeout: setTimeout(()=>{
        this.handleMoveNext()
      }, 800)
    })
  }

  handleMoveNext = () => {
    const { eetStatusLocal } = this.props;

    document.getElementById("Submit-btn-addEdu").focus()
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
      e.preventDefault ();
      return;
    } else {
      const { eetStatusLocal, handleSchChange, handleUniChange } = this.props;
      const { schNameFreeTextModal, uniNameFreeTextModal } = this.state;

      if (eetStatusLocal === "sch") {
        this.setState({
          messageFromServer: 'We are saving down your school name in free text!'
        })
        handleSchChange(schNameFreeTextModal);

      } else if (eetStatusLocal === "uni") {
        this.setState({
          messageFromServer: 'We are saving down your uni name in free text!'
        })
        handleUniChange(uniNameFreeTextModal)
      }
    }
  }

  onKeyDown = e => {

    // User pressed the enter key
    if (e.keyCode === 13) {
      if (!this.canBeSubmitted()) {
        e.preventDefault ();
        return;
      } else {
        console.log("onkeydown triggered")
        this.handleSubmit();
      }
    }
  };

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  canBeSubmitted() {
    const {schNameFreeTextModal, uniNameFreeTextModal} = this.state;
    const {maxLength} = this.props;
    return (
      (schNameFreeTextModal.length >= 2 && schNameFreeTextModal.length <= maxLength) || (uniNameFreeTextModal.length >= 2 && uniNameFreeTextModal.length <= maxLength)
    );
  }

  render() {
    const {onKeyDown } = this;
    const { messageFromServer } = this.state;
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
            <label className="descriptor alignLeft reqAsterisk" htmlFor="schName">Your {eetStatusLocal === 'uni' ? 'University' : (country === 'GBR' ? 'School' : 'High School')} name?</label>
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
              <button type="button" disabled={!isEnabled} onClick={this.handleSubmit} className="Submit-btn" id="Submit-btn-addEdu">
                Submit for Review
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon peace-emoji successBox" />
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
