// Dex last merged this code on 26th April 2020

import React, { Component } from "react";

import {isURL} from './GeneralFunctions.js';

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class NoEduEmailContent extends Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      emailIsValid: '',
      isPersonalEmail: '',
      containsDot: '',
      hasTextBeforeAt: '',
      hasTextAfterAt: '',
      endsWithSymbol: '',
      currentSitu: '',
      profProfileURL: '',
      urlInputIsValid: '',
      messageFromServer: '',
      timeout: 0
    };
    this.onBlur = this.onBlur.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.handleURLKeyUp = this.handleURLKeyUp.bind(this);
    this.handleEmailKeyUp = this.handleEmailKeyUp.bind(this);
  }

/*  componentDidMount(){
    const {eetStatus} = this.props;
    eetStatus != 'none'
      ? document.getElementById("notStudentEmail").focus()
      : document.getElementById("currentSitu").focus()
  }*/

  onBlur(e) {
    console.log("onblur triggered")
    const {emailInput, emailIsValid, currentSitu, profProfileURL, urlInputIsValid} = this.state;
    const {eetStatus} = this.props;

    if (e.target.name === 'emailInput') {
      if(e.target.checkValidity() && (emailInput === '' || emailIsValid === true)) {
        e.target.classList.remove('error');
      } else {
        e.target.classList.add('error');
      }
    } else if (e.target.name === 'currentSitu') {
      if(e.target.checkValidity() && currentSitu.length >= 25) {
        e.target.classList.remove('error');
      } else {
        e.target.classList.add('error');
      }
    } else if (e.target.name === 'profProfileURL') {
      if(e.target.checkValidity() && (profProfileURL === '' || urlInputIsValid === true)) {
        e.target.classList.remove('error');
      } else {
        e.target.classList.add('error');
      }
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (e) => {
    if (!this.canBeSubmitted()) {
      e.preventDefault ();
      return;
    } else {
      const { handleNoEduEmail, sendForReview, updateStep } = this.props;
      const { emailInput } = this.state;
      console.log("noeduemailcontent handle submit triggered")
      sendForReview('other details/currentSitu', 'no eduEmail')
      if (emailInput != '') {
        handleNoEduEmail(emailInput)
      } else {
        handleNoEduEmail('personal')
      }
      updateStep('didEduEmail', false)
      this.setState({
        messageFromServer: 'We are sending your deets to Prospela!'
      });

    }
  }

  checkEmail() {
    const {emailInput} = this.state;
    const {eetStatus} = this.props;

    const freeEmailDomains = ["gmail.com", "hotmail.com"];
    var emailSplit = emailInput.split('@')
    var freeEmail = emailSplit[emailSplit.length-1].toLowerCase();

    if (freeEmailDomains.includes(freeEmail)) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: true
      });
    } else if (emailInput.includes(".") != true) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        containsDot: false
      });
    } else if (emailInput.indexOf("@") === 0) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        containsDot: true,
        hasTextBeforeAt: false
      });
    } else if (/^[a-zA-Z()]+$/.test(emailInput.charAt(emailInput.indexOf("@") + 1)) === false) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        containsDot: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: false
      });
    } else if (/^[a-zA-Z()]+$/.test(emailInput.charAt(emailInput.length - 1)) === false) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        containsDot: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: true
      });
    } else {
      this.setState({
        emailIsValid: true,
        isPersonalEmail: false,
        containsDot: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: false
      });
    }
  }

  checkProfUrl() {
    const {profProfileURL} = this.state;
    console.log("profProfileURL: "+profProfileURL)

    if (isURL(profProfileURL) === false) {
      this.setState({
        urlInputIsValid: false,
      });
    } else {
      this.setState({
        urlInputIsValid: true,
      });
    }
  }

  handleURLKeyUp(e) {
    const {timeout, profProfileURL, urlInputIsValid} = this.state;
    clearTimeout(timeout);

    this.setState({
      timeout: setTimeout(()=>{
        this.checkProfUrl()
      }, 800)
    })

    /*if (e.target.name === 'profProfileURL') {
      if(e.target.checkValidity() && (profProfileURL === '' || urlInputIsValid === true)) {
        e.target.classList.remove('error');
      } else {
        e.target.classList.add('error');
      }
    }*/
  }

  handleEmailKeyUp(e) {
    const {timeout, emailInput, emailIsValid} = this.state;

    clearTimeout(timeout);

    this.setState({
      timeout: setTimeout(()=>{
        this.checkEmail()
      }, 800)
    })

  /*  if (e.target.name === 'emailInput') {
      if(e.target.checkValidity() && (emailInput === '' || emailIsValid === true)) {
        e.target.classList.remove('error');
      } else {
        e.target.classList.add('error');
      }
    }*/

  }

/*  onKeyDown = e => {

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
*/
  // This ensures user cannot press Enter on keyboard to submit without completing form first
/*  canBeSubmitted() {
    const {schNameFreeTextModal, uniNameFreeTextModal} = this.state;
    return (
      schNameFreeTextModal.length >= 2 || uniNameFreeTextModal.length >= 2
    );
  }*/

  canBeSubmitted() {
    const {emailInput, currentSitu, profProfileURL, urlInputIsValid, emailIsValid, isPersonalEmail, containsDot, hasTextBeforeAt, hasTextAfterAt, endsWithSymbol} = this.state;
    const {eetStatus} = this.props;

    if (eetStatus != 'none') {
      if ((emailInput === '' || emailIsValid === true) && currentSitu.length >= 25 && (profProfileURL === '' || urlInputIsValid != 'false')) {
        return true;
      } else {
        return false;
      }
    } else {
      if (currentSitu.length >= 25 && (profProfileURL === '' || urlInputIsValid != 'false')) {
        return true;
      } else {
        return false;
      }
    }
  }

  render() {
    const { onKeyDown } = this;
    const { emailInput, currentSitu, profProfileURL, isPersonalEmail, emailIsValid, messageFromServer } = this.state;
    const { country, eetStatus, currCo, currTrainingProvider } = this.props;
    const isEnabled = this.canBeSubmitted();
    if(messageFromServer === '') {
      return (
        <React.Fragment>
          <div className="modal-preTitle">
            Help us assess your eligibility
          </div>
          <div className="modal-subtitle">
            Tell us about your situation
          </div>
          <form className="noEduEmail-form" id="noEduEmailForm">
            {eetStatus != 'none' &&(
              <React.Fragment>
                <label htmlFor="notStudentEmail" className="descriptor alignLeft">
                  Your {eetStatus === 'job' ? currCo : eetStatus === 'train' ? currTrainingProvider : 'professional'} Email Address (if you have one)
                </label>
                <input
                  type="email"
                  name="emailInput"
                  id="notStudentEmail"
                  onBlur={this.onBlur}
                  onChange={this.handleChange}
                  onKeyUp={this.handleEmailKeyUp}
                  value={this.state.emailInput}
                  className="form-control-std verifyForm"
                  placeholder={"Your " + (eetStatus === 'job' ? currCo : eetStatus === 'train' ? currTrainingProvider : 'professional') + " email address"}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                  autoFocus
                />
                {emailIsValid === false && isPersonalEmail === false && (
                  <div className="descriptor prompt error verifyForm alignLeft">
                    This must be a valid {eetStatus === 'job' ? currCo : eetStatus === 'train' ? currTrainingProvider : 'professional'} email address
                  </div>
                )}
                {isPersonalEmail === true && (
                  <div className="descriptor prompt error verifyForm alignLeft textLeft">This can&#39;t be a personal email address</div>
                )}
              </React.Fragment>
            )}
            <label className="descriptor alignLeft reqAsterisk" htmlFor="currentSitu">
              Tell us a bit about your current situation
            </label>
            <textarea
              name="currentSitu"
              className="form-control-std textInputBox verifyForm"
              //className="form-control-std verifyForm"
              form="noEduEmailForm"
              onBlur={this.onBlur}
              onChange={this.handleChange}
              value={this.state.currentSitu}
              placeholder="Help us assess your eligibility to join..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              required
            />
            {currentSitu != '' && currentSitu.length < 25 && (
              <div className="descriptor prompt error verifyForm alignLeft">
                Min 25 characters
              </div>
            )}
            <label htmlFor="profProfileURL" className="descriptor alignLeft">
              Link to your LinkedIn (or equivalent) professional profile
            </label>
            <input
              type="url"
              name="profProfileURL"
              id="profProfileURL"
              onBlur={this.onBlur}
              onChange={this.handleChange}
              onKeyUp={this.handleURLKeyUp}
              value={this.state.profProfileURL}
              className="form-control-std verifyForm"
              placeholder="https://...."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
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
            Details submitted
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              We&#39;ll review as soon as we can. For now, feel free to continue verifying your email!
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default NoEduEmailContent;
