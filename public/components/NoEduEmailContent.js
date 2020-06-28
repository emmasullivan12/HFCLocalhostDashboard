// Dex last merged this code on 27th June 2020

import React, { Component } from "react";

import personalEmails from "./PersonalEmails.js";
import {isURL, LoadingSpinner} from './GeneralFunctions.js';

// Content for Passing on Mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class NoEduEmailContent extends Component {
  constructor() {
    super();
    this.state = {
      progCode: '',
      progCodeIsValid: '',
      emailInput: '',
      emailIsValid: '',
      isPersonalEmail: '',
      containsDotAndAt: '',
      hasTextBeforeAt: '',
      hasTextAfterAt: '',
      endsWithSymbol: '',
      isHtmlValid: '',
      currentSitu: '',
      profProfileURL: '',
      urlInputIsValid: '',
      messageFromServer: '',
      isSubmitting: false,
      timeout: 0
    };
    this.onBlur = this.onBlur.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
  }

  componentDidMount(){
    document.getElementById("progverifcode").focus();
  }

  onBlur(e) {
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

  handleCodeChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      progCodeIsValid: e.target.value.length > 0
    })
  }

  handleCodeMoveNext = (e) => {
    if (e.target.value.length >= 6 && e.target.value.length < 50) {
      document.getElementById("currentSituInput").focus();
    }
  }

  handleSituChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSituMoveNext = (e) => {
    const {eetStatus} = this.props;
    if (e.target.value.length >= 25) {
      if (eetStatus != 'none') {
        document.getElementById("profEmail").focus();
      } else {
        document.getElementById("profProfileURL").focus();
      }
    }
  }

  handleURLChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.checkProfUrl()
    })
  }

  handleURLMoveNext = (e) => {
    document.getElementById("Submit-btn-noEduEmail").focus();
  }

  handleEmailChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.checkEmail()
    })
  }

  handleEmailMoveNext = (e) => {
    document.getElementById("profProfileURL").focus();
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (e) => {
    if (!this.canBeSubmitted()) {
      e.preventDefault ();
      return;
    } else {
      const { handleNoEduEmail, updateStep } = this.props;
      const { emailInput } = this.state;
      this.setState({
        isSubmitting: true,
        messageFromServer: 'We are sending your deets to Prospela!',
      });
      if (emailInput != '') {
        handleNoEduEmail(emailInput)
      } else {
        handleNoEduEmail('personal')
      }
      updateStep('didEduEmailNeedsRev', false)

    }
  }

  handleMouseDown = (e) => {
    const {timeout} = this.state;
    clearTimeout(timeout);
  }

  handleKeyDown = (e) => {
    const {timeout} = this.state;
    clearTimeout(timeout);
  }

  handleKeyUp = (e) => {
    e.persist()
    const {timeout, emailInput, emailIsValid} = this.state;
    clearTimeout(timeout);

    // checks use has not pressed backspace
    if (e.target.value != '' && e.keyCode != 8) {
      this.setState({
        timeout: setTimeout(()=>{
          if (e.target.name === 'progCode') {
            this.handleCodeMoveNext(e)
          } else if (e.target.name === 'currentSitu') {
            this.handleSituMoveNext(e)
          } else if (e.target.name === 'emailInput') {
            this.handleEmailMoveNext(e)
          } else if (e.target.name === 'profProfileURL') {
            this.handleURLMoveNext(e)
          }
        }, 800)
      })
    }
  }

  checkEmail() {
    const {emailInput} = this.state;
    const {eetStatus} = this.props;

    var emailSplit = emailInput.split('@')
    var freeEmail = emailSplit[emailSplit.length-1].toLowerCase();
    const emailFormInput = document.getElementById("profEmail")

    if (personalEmails.includes(freeEmail)) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: true
      });
    } else if (emailInput.includes(".") != true || emailInput.includes("@") != true) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        containsDotAndAt: false
      });
    } else if (emailInput.indexOf("@") === 0) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        containsDotAndAt: true,
        hasTextBeforeAt: false
      });
    } else if (/^[a-zA-Z()]+$/.test(emailInput.charAt(emailInput.indexOf("@") + 1)) === false) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        containsDotAndAt: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: false
      });
    } else if (/^[a-zA-Z()]+$/.test(emailInput.charAt(emailInput.length - 1)) === false) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        containsDotAndAt: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: true
      });
    } else if (emailFormInput.checkValidity() != true) {
      this.setState({
        emailIsValid: false,
        isPersonalEmail: false,
        containsDotAndAt: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: false,
        isHtmlValid: false,
      });
    } else {
      this.setState({
        emailIsValid: true,
        isPersonalEmail: false,
        containsDotAndAt: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: false,
        isHtmlValid: true,
      });
    }
  }

  checkProfUrl() {
    const {profProfileURL} = this.state;

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

  canBeSubmitted() {
    const {progCode, progCodeIsValid, emailInput, currentSitu, profProfileURL, urlInputIsValid, emailIsValid, isPersonalEmail, containsDotAndAt, hasTextBeforeAt, hasTextAfterAt, endsWithSymbol, isHtmlValid} = this.state;
    const {eetStatus} = this.props;

    if (eetStatus != 'none') {
      if ((progCode === '' || progCodeIsValid === true) && (emailInput === '' || emailIsValid === true) && currentSitu.length >= 25 && currentSitu.length <= 500 && (profProfileURL === '' || urlInputIsValid != false)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (currentSitu.length >= 25 && currentSitu.length <= 500 && (profProfileURL === '' || urlInputIsValid != false)) {
        return true;
      } else {
        return false;
      }
    }
  }

  render() {
    const { onKeyDown } = this;
    const { progCode, emailInput, currentSitu, profProfileURL, isPersonalEmail, emailIsValid, messageFromServer, isHtmlValid, isSubmitting } = this.state;
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
            <label htmlFor="profProfileURL" className="descriptor alignLeft">
              Have a <strong>programme code?</strong> Enter it here:
            </label>
            <input
              type="password"
              name="progCode"
              className="form-control-std verifyForm"
              onBlur={this.onBlur}
              onChange={this.handleCodeChange}
              onKeyUp={this.handleKeyUp}
              onKeyDown={this.handleKeyDown}
              onMouseDown={this.handleMouseDown}
              placeholder="_ _ _ _ _ _"
              id="progverifcode"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              maxLength="50"
            />
            <label className="descriptor alignLeft reqAsterisk" htmlFor="currentSitu">
              Tell us a bit about <strong>your current situation</strong>
            </label>
            <textarea
              name="currentSitu"
              className="form-control-std textInputBox verifyForm"
              form="noEduEmailForm"
              id="currentSituInput"
              onBlur={this.onBlur}
              onChange={this.handleSituChange}
              onKeyUp={this.handleKeyUp}
              onKeyDown={this.handleKeyDown}
              onMouseDown={this.handleMouseDown}
              placeholder="Help us assess your eligibility to join..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              minLength="25"
              maxLength="500"
              required
            />
            {currentSitu != '' && currentSitu.length < 25 && (
              <div className="descriptor prompt error verifyForm alignLeft">
                Min 25 characters
              </div>
            )}
            {currentSitu != '' && currentSitu.length > 500 && (
              <div className="descriptor prompt error verifyForm alignLeft">
                Max 500 characters
              </div>
            )}
            <div className="neutralText verifyForm alignRight">
              {currentSitu.length} / 500
            </div>
            {eetStatus != 'none' &&(
              <React.Fragment>
                <label htmlFor="profEmail" className="descriptor alignLeft">
                  Your <strong>{eetStatus === 'job' ? currCo : eetStatus === 'train' ? currTrainingProvider : 'professional'} Email Address</strong> (if you have one)
                </label>
                <input
                  type="email"
                  name="emailInput"
                  id="profEmail"
                  onBlur={this.onBlur}
                  onChange={this.handleEmailChange}
                  onKeyUp={this.handleKeyUp}
                  onKeyDown={this.handleKeyDown}
                  onMouseDown={this.handleMouseDown}
                  className="form-control-std verifyForm"
                  placeholder={"Your " + (eetStatus === 'job' ? currCo : eetStatus === 'train' ? currTrainingProvider : 'professional') + " email address"}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                  maxLength="100"
                  autoFocus
                />
                {isHtmlValid === false && emailIsValid === false && isPersonalEmail === false && (
                  <div className="descriptor prompt error verifyForm alignLeft">
                    This must be a valid {eetStatus === 'job' ? currCo : eetStatus === 'train' ? currTrainingProvider : 'professional'} email
                  </div>
                )}
                {isPersonalEmail === true && (
                  <div className="descriptor prompt error verifyForm alignLeft textLeft">This can&#39;t be a personal email address</div>
                )}
              </React.Fragment>
            )}
            <label htmlFor="profProfileURL" className="descriptor alignLeft">
              Link to your <strong>LinkedIn (or equivalent) professional profile</strong>
            </label>
            <input
              type="url"
              name="profProfileURL"
              id="profProfileURL"
              onBlur={this.onBlur}
              onChange={this.handleURLChange}
              onKeyUp={this.handleKeyUp}
              onMouseDown={this.handleMouseDown}
              className="form-control-std verifyForm"
              placeholder="https://...."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              maxLength="150"
            />
            <div className="pass-btn-container">
              <button type="button" disabled={!isEnabled} onClick={this.handleSubmit} className="Submit-btn" id="Submit-btn-noEduEmail">
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
