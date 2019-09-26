// Dex last merged this code on 17th Sept 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as typeformEmbed from '@typeform/embed';
import TypeformEmbedded from './TypeformEmbedded.js';

// import "../css/TypeformSignUp.css";
import "../css/General.css";
import "../css/Login.css";

class MentorU18SUContent extends Component {
  constructor () {
    super();
    this.state = {
      isYesContainerOpen: false,
      isNoContainerOpen: false,
    }
    this.handleYesU18 = this.handleYesU18.bind(this);
    this.handleNoU18 = this.handleNoU18.bind(this);
  }

  handleYesU18() {
    this.setState({
      isYesContainerOpen: true,
      isNoContainerOpen: false
    });
    var yesBtn = document.getElementById("yesU18-btn");
    var noBtn = document.getElementById("noU18-btn");
    noBtn.classList.remove('active');
    yesBtn.classList.add('active');
  }

  handleNoU18() {
    this.setState({
      isYesContainerOpen: false,
      isNoContainerOpen: true
    });
    var yesBtn = document.getElementById("yesU18-btn");
    var noBtn = document.getElementById("noU18-btn");
    yesBtn.classList.remove('active');
    noBtn.classList.add('active');
  }

  render() {
    const {isYesContainerOpen,isNoContainerOpen} = this.state;
    const {tflink, step} = this.props;

    return (
      <React.Fragment>
        <div>
          <div className='progress-circles-container'>
            <div className={step==='1' ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
            <div className={step==='2' ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
            <div className={step==='3' ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
            <div className={step==='4' ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
          </div>
          <form method="POST" action="/U18pref" className="U18prefForm">
            <div>
              <input type="radio" className="hiddenRadio" value="yesU18" name="role" id="yesU18radio" />
              <input type="radio" className="hiddenRadio" value="noU18" name="role" id="noU18radio" />
              <button type="button" id="yesU18-btn" name="role" className="btn-left" onClick={this.handleYesU18}>Yes</button>
              <button type="button" id="noU18-btn" name="role" className="btn-right" onClick={this.handleNoU18}>No</button>
            </div>
            {isYesContainerOpen && (
              <div className='embedded-typeform'>
                <TypeformEmbedded
                  tflink={tflink}
                />
              </div>
            )}
            {isNoContainerOpen && (
              <div>
                <button type="submit" className="ModalOpenBtn ModalOpenBtn-joinProgLrg">Next</button>
              </div>
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}


export default MentorU18SUContent;
