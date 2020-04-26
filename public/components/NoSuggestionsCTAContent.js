// Dex last merged this code on 26th April 2020

import React, { Component } from "react";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class NoSuggestionsCTAContent extends Component {
  constructor() {
    super();
    this.state = {
      schNameFreeTextModal: '',
      uniNameFreeTextModal: '',
      messageFromServer: ''
    };
  }

  componentDidMount(){
    console.log("componentdidmount")
    console.log("document.getElementById(eduNameFreeTextModal)"+document.getElementById("eduNameFreeTextModal"))
    console.log(document.getElementById("eduNameFreeTextModal"))
    document.getElementById("eduNameFreeTextModal").focus();
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
        console.log("IN MODAL: schNameFreeTextModal: "+schNameFreeTextModal);
        this.setState({
          messageFromServer: 'We are saving down your school name in free text!'
        }, () => {
          console.log("messageFromServer: "+this.state.messageFromServer);
          handleSchChange(schNameFreeTextModal);
        });

      } else if (eetStatusLocal === "uni") {
        console.log("IN MODAL: uniNameFreeTextModal: "+uniNameFreeTextModal);
        this.setState({
          messageFromServer: 'We are saving down your uni name in free text!'
        }, () => {
          handleUniChange(uniNameFreeTextModal);
        });
      } else {
        return; // not currently using Autocomplete for anything other than sch & uni
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
    return (
      schNameFreeTextModal.length >= 2 || uniNameFreeTextModal.length >= 2
    );
  }

  render() {
    const {onKeyDown } = this;
    const { schNameFreeTextModal, uniNameFreeTextModal, messageFromServer } = this.state;
    const { country, eetStatusLocal } = this.props;
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
            <input
              name="eduNameFreeText"
              id="eduNameFreeTextModal"
              className="form-control-std"
              form="eduFreeTextForm"
              value={eetStatusLocal === "sch" ? schNameFreeTextModal : uniNameFreeTextModal}
              onChange={this.handleChange}
              onKeyDown={this.onKeyDown}
              placeholder={country === 'GBR' ? "School or College" : "High School"}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              required
            />
            <div className="pass-btn-container">
              <button type="button" disabled={!isEnabled} onClick={this.handleSubmit} className="Submit-btn">
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
