// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class NoSuggestionsCTAContent extends Component {
  constructor() {
    super();
    this.state = {
      schNameFreeText: '',
      uniNameFreeText: '',
      messageFromServer: ''
    };
  }

  handleChange = (evt) => {
    const { schNameFreeText, uniNameFreeText } = this.state;
    const { eetStatus } = this.props;
    if (eetStatus === "sch") {
      this.setState({
        schNameFreeText: evt.target.value
      });
    } else if (eetStatus === "uni") {
      this.setState({
        uniNameFreeText: evt.target.value
      });
    } else {
      return; // not currently using Autocomplete for anything other than sch & uni
    }
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    this.setState({ messageFromServer: 'We are saving down your school name in free text!' });
  }

  // This ensures user cannot press Enter on keyboard to submit without completing form first
  canBeSubmitted() {
    const {schNameFreeText, uniNameFreeText} = this.state;
    return (
      schNameFreeText.length > 0 || uniNameFreeText.length > 0
    );
  }

  render() {
    const { schNameFreeText, uniNameFreeText, messageFromServer } = this.state;
    const { country, eetStatus } = this.props;
    const isEnabled = this.canBeSubmitted();
    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-preTitle">
            Sorry about that...
          </div>
          <div className="modal-subtitle">
            What&#39;s your {eetStatus === 'uni' ? 'University' : (country === 'GBR' ? 'School' : 'High School')} name?
          </div>
          <form className="eduFreeText-form" id="eduFreeTextForm">
            <input
              name="eduNameFreeText"
              className="form-control-std"
              form="eduFreeTextForm"
              value={eetStatus === "sch" ? schNameFreeText : uniNameFreeText}
              onChange={this.handleChange}
              placeholder={country === 'GBR' ? "School or College" : "High School"}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              required
            />
            <div className="pass-btn-container">
              <button type="submit" disabled={!isEnabled} className="Submit-btn">
                Submit
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
            You passed
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              Thanks for letting us know why this wasn&#39;t such a great match for you. It will help us do better next time.
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default NoSuggestionsCTAContent;
