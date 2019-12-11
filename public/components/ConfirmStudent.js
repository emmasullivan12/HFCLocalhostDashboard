// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import TypeformEmbedded from './TypeformEmbedded.js';
import Autocomplete from './Autocomplete.js';

class ConfirmStudent extends React.Component {
  constructor () {
    super();
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  render() {

  const {tflink, step} = this.props;
//  const isEnabled = this.canBeSubmitted(countries, states, provinces, ukCounties, ieCounties);

    return (
      <React.Fragment>
        <div>
          <div className='progress-circles-container'>
            <div className={(step==1) ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
            <div className={(step==2) ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle"  />
            </div>
            <div className={(step==3) ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle"  />
            </div>
            <div className={(step==4) ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle"  />
            </div>
          </div>
          <div className='embedded-typeform'>
            <form autoComplete="off">
              <div className="form-group">
                <label className="descriptor alignLeft">Your personal institution Email Address</label>
                <input
                  type="email"
                  name="schEmail"
                  onBlur={this.onBlur}
                  className="form-control-std"
                  placeholder="Personal institution email address"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                  required
                />
              </div>
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
