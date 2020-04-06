// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import ProgressCircles from './ProgressCircles.js';
import TypeformEmbedded from './TypeformEmbedded.js';
import Autocomplete from './Autocomplete.js';

class ConfirmStudent extends React.Component {
  constructor () {
    super();
    this.state = {
      userInput: '',
      eduEmailIsValid: ''
    }
    this.onBlur = this.onBlur.bind(this);
  //  this.handleEduEmailChange = this.handleEduEmailChange.bind(this);
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  onChange = (e) => {
    const isValid = this.checkEduEmail(e.currentTarget.value);
    this.setState({
      userInput: e.currentTarget.value,
      eduEmailIsValid: isValid
    });
  }

  render() {
    const { onChange } = this;
    const { tflink, step, currentStep, totalMenteeSteps, userEduName } = this.props;
    const { eduEmailIsValid, userInput } = this.state;
//  const isEnabled = this.canBeSubmitted(countries, states, provinces, ukCounties, ieCounties);

    return (
      <React.Fragment>
        <div>
          <ProgressCircles
            totalSteps={totalMenteeSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            <form autoComplete="off">
              <div className="form-group">
                <label className="descriptor alignLeft">Your {userEduName} Email Address</label>
                <input
                  type="email"
                  name="schEmail"
                  onBlur={this.onBlur}
                  onChange={onChange}
                  value={userInput}
                  className="form-control-std"
                  placeholder={"Your " + userEduName + " email address"}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                  autoFocus
                  required
                />
              </div>
              {eduEmailIsValid === false && (
                <div className="descriptor prompt error signUpForm alignLeft">This must be a valid {userEduName} email address</div>
              )}
  {/*            <button type="submit" disabled={!isEnabled} className="Submit-btn fullWidth"> */}
              <button type="submit" className="Submit-btn fullWidth">
                Next
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConfirmStudent;
