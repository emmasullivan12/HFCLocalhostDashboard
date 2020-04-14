// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import ProgressCircles from './ProgressCircles.js';
import TypeformEmbedded from './TypeformEmbedded.js';
import Autocomplete from './Autocomplete.js';
import NoEduEmail from './NoEduEmail.js';
import {lookupUKSchUnis} from './UserDetail.js';

class ConfirmStudent extends React.Component {
  constructor () {
    super();
    this.state = {
      userInput: '',
      eduEmailIsValid: '',
      isPersonalEmail: '',
      hasTextBeforeAt: '',
      hasTextAfterAt: '',
      endsWithSymbol: '',
      emailFormat: '',
      dm: '',
      sentForReview: '',
      timeout: 0
    }
    this.onBlur = this.onBlur.bind(this);
    this.checkEduEmail = this.checkEduEmail.bind(this);
    this.handleNoEduEmail = this.handleNoEduEmail.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleUpdateEdu = this.handleUpdateEdu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {country, schName, uniName, eetStatus} = this.props;

    if (country === 'GBR') {
      if (eetStatus === 'sch' && schName != '') {
        return Promise.all([lookupUKSchUnis(schName, 'emailFormat', eetStatus)]).then(email => {
          this.setState({
            emailFormat: email[0].emailFormat.toLowerCase(),
            dm: email[0].dm != undefined ? email[0].dm : ''
          })
        });
      } else if (eetStatus === 'uni' && uniName != '') {
        return Promise.all([lookupUKSchUnis(uniName, 'emailFormat', eetStatus)]).then(email => {
          this.setState({
            emailFormat: email[0].emailFormat.toLowerCase()
          })
        });
      }
    }
  }

  onBlur(e) {
    const {eduEmailIsValid} = this.state;
    if(e.target.checkValidity() && eduEmailIsValid) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  onChange = (e) => {
    this.setState({
      userInput: e.currentTarget.value
    })
  }

  handleMessageChange = (e) => {
    const currentState = this.state[e.target.name];

    if (currentState === '1') {
      this.setState({
        [e.target.name]: ''
      });

    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  handleUpdateEdu() {
    const {updateStep} = this.props;
    updateStep('didEduEmail', true)
  }

  handleNoEduEmail() {
    console.log("handlenoeduemail function goes here")
  }

  handleSubmit(e) {
    const {updateStep} = this.props;
    updateStep('didEduEmail', false)

    // Update status in Typeform sign up to be "emailNeedsPrVerif" and/or "eduNeedsPrVerif" ... this will be used
    // to render page AFTER email verifcode page and BEFORE dashboard

  }

  handleKeyUp(e) {
    const {userInput, timeout} = this.state;

    clearTimeout(timeout);

    this.setState({
      timeout: setTimeout(()=>{
      //  if (userInput.includes("@") && userInput.includes(".")) {
          this.checkEduEmail()
    //    }
      }, 800)
    })
  }

  checkEduEmail() {
    const {userInput, emailFormat, dm, eduEmailIsValid} = this.state;
    const {country, eetStatus, schName, uniName} = this.props;

    const freeEmailDomains = ["gmail.com", "hotmail.com"];
    var emailSplit = userInput.split('@')
    var freeEmail = emailSplit[emailSplit.length-1].toLowerCase();

    if (freeEmailDomains.includes(freeEmail)) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: true,
        sentForReview: ''
      });
    } else if (userInput.indexOf("@") === 0) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: false,
        hasTextBeforeAt: false,
        sentForReview: ''
      });
    } else if (/^[a-zA-Z()]+$/.test(userInput.charAt(userInput.indexOf("@") + 1)) === false) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: false,
        hasTextBeforeAt: true,
        hasTextAfterAt: false,
        sentForReview: ''
      });
    } else if (/^[a-zA-Z()]+$/.test(userInput.charAt(userInput.length - 1)) === false) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: false,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: true,
        sentForReview: ''
      });
    } else if (country === 'GBR') {
      if (eetStatus === 'sch') {

        // first check if user selected sch from our list and whether
        // that school has defined a specific email format
        if (schName != '' && emailFormat != "") {

          //check domain format
          const domain = (dm === 's'
            ? '.sch.uk'
            : dm === 'g'
              ? '.gov.uk'
              : dm === 'ac'
                ? '.ac.uk'
                : ''
          )

          const isValid = (freeEmail === emailFormat + domain);
          this.setState({
            eduEmailIsValid: isValid,
            isPersonalEmail: false,
            hasTextBeforeAt: true,
            hasTextAfterAt: true,
            endsWithSymbol: false,
            sentForReview: ''
          }, () => {
            ( document.getElementById('schEmailInput').checkValidity() && eduEmailIsValid
              ? document.getElementById('schEmailInput').classList.remove('error')
              : document.getElementById('schEmailInput').classList.add('error')
            )
          });

        // if sch doesnt have specific format or user freetyped in sch name then do general check
        } else {

          const isValid = (userInput.indexOf(".sch.uk") == userInput.length - 7 || userInput.indexOf(".gov.uk") == userInput.length - 7 || userInput.indexOf(".ac.uk") == userInput.length - 6);
          this.setState({
            eduEmailIsValid: isValid,
            isPersonalEmail: false,
            hasTextBeforeAt: true,
            hasTextAfterAt: true,
            endsWithSymbol: false,
            sentForReview: ''
          }, () => {
            ( document.getElementById('schEmailInput').checkValidity() && eduEmailIsValid
              ? document.getElementById('schEmailInput').classList.remove('error')
              : document.getElementById('schEmailInput').classList.add('error')
            )
          });
        }

      } else if (eetStatus === 'uni') {

        // first check if user selected uni from our list and whether that university has defined a specific email format
        if (uniName != '' && emailFormat != "") {

          // This University does not have .ac.uk format
          if (uniName === '69') {
            const isValid = emailFormat[0] === freeEmail;
            this.setState({
              eduEmailIsValid: isValid,
              isPersonalEmail: false,
              hasTextBeforeAt: true,
              hasTextAfterAt: true,
              endsWithSymbol: false,
              sentForReview: ''
            }, () => {
              ( document.getElementById('schEmailInput').checkValidity() && eduEmailIsValid
                ? document.getElementById('schEmailInput').classList.remove('error')
                : document.getElementById('schEmailInput').classList.add('error')
              )
            });
          } else {
            const isValid = freeEmail === emailFormat + ".ac.uk";
            this.setState({
              eduEmailIsValid: isValid,
              isPersonalEmail: false,
              hasTextBeforeAt: true,
              hasTextAfterAt: true,
              endsWithSymbol: false,
              sentForReview: ''
            }, () => {
              ( eduEmailIsValid
                ? document.getElementById('schEmailInput').classList.remove('error')
                : document.getElementById('schEmailInput').classList.add('error')
              )
            });
          }

        // if uni doesnt have specific format or user freetyped in uni name then do general check .ac.uk
        } else {
          const length = userInput.length - 6; /// 6 is length of ".ac.uK" string
          const isValid = userInput.indexOf(".ac.uk") == length;
          this.setState({
            eduEmailIsValid: isValid,
            isPersonalEmail: false,
            hasTextBeforeAt: true,
            hasTextAfterAt: true,
            endsWithSymbol: false,
            sentForReview: ''
          }, () => {
            ( document.getElementById('schEmailInput').checkValidity() && eduEmailIsValid
              ? document.getElementById('schEmailInput').classList.remove('error')
              : document.getElementById('schEmailInput').classList.add('error')
            )
          });
        }
      }
    } else if (country === 'USA') {
      if (eetStatus === 'uni') {
        const length = userInput.length - 4; /// 4 is length of ".edu" string
        const isValid = userInput.indexOf(".edu") == length;
        this.setState({
          eduEmailIsValid: isValid,
          isPersonalEmail: false,
          hasTextBeforeAt: true,
          hasTextAfterAt: true,
          endsWithSymbol: false,
          sentForReview: ''
        }, () => {
          ( document.getElementById('schEmailInput').checkValidity() && eduEmailIsValid
            ? document.getElementById('schEmailInput').classList.remove('error')
            : document.getElementById('schEmailInput').classList.add('error')
          )
        });

      } else if (eetStatus === 'sch') {
        // saying email is valid as don't know format of sch emails, but Prospela to approve before get access
        this.setState({
          eduEmailIsValid: true,
          isPersonalEmail: false,
          hasTextBeforeAt: true,
          hasTextAfterAt: true,
          endsWithSymbol: false,
          sentForReview: '1'
        }, () => {
          ( document.getElementById('schEmailInput').checkValidity() && eduEmailIsValid
            ? document.getElementById('schEmailInput').classList.remove('error')
            : document.getElementById('schEmailInput').classList.add('error')
          )
        });
      }

    } else {
      //don't do a check (as dont know format for every country) just get them to verify
      //and then come to prospela for approval before going to dashboard
      this.setState({
        eduEmailIsValid: true,
        isPersonalEmail: false,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: false,
        sentForReview: '1'
      }, () => {
        ( document.getElementById('schEmailInput').checkValidity() && eduEmailIsValid
          ? document.getElementById('schEmailInput').classList.remove('error')
          : document.getElementById('schEmailInput').classList.add('error')
        )
      });
    }
  }

  canBeSubmitted() {
    const {userInput, eduEmailIsValid, isPersonalEmail, hasTextBeforeAt, hasTextAfterAt, endsWithSymbol, sentForReview} = this.state;
    const {eetStatus} = this.props;

    if (eetStatus === 'sch' || eetStatus === 'uni') {
      if (userInput != '' && (eduEmailIsValid || sentForReview != '') && !isPersonalEmail && hasTextBeforeAt && hasTextAfterAt && !endsWithSymbol) {
        return true;
      } else {
        return false;
      }

    } else if (eetStatus === 'job' || eetStatus === 'train' || eetStatus === 'none') {
      if (sentForReview != '' && hasTextBeforeAt && hasTextAfterAt && !endsWithSymbol) {
        return true;
      } else {
        return false;
      }
    }
  }

  render() {
    const { onChange, handleKeyUp } = this;
    const { tflink, step, country, currentStep, eetStatus, totalMenteeSteps, userEduName, currCo, currTrainingProvider } = this.props;
    const { eduEmailIsValid, userInput, isPersonalEmail, hasTextBeforeAt, hasTextAfterAt, endsWithSymbol } = this.state;
    const isEnabled = this.canBeSubmitted();

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
                <label className="descriptor alignLeft">Your {eetStatus === 'sch' || eetStatus === 'uni' ? userEduName : 'student'} Email Address</label>
                <NoEduEmail
                  country={country}
                  eetStatus={eetStatus}
                  handleNoEduEmail={this.handleNoEduEmail}
                  currCo={currCo}
                  currTrainingProvider={currTrainingProvider}
                />
                <input
                  type="email"
                  name="schEmail"
                  id="schEmailInput"
                  onBlur={this.onBlur}
                  onChange={onChange}
                  onKeyUp={handleKeyUp}
                  value={userInput}
                  className="form-control-std verifyForm"
                  placeholder={"Your " + (eetStatus === 'sch' || eetStatus === 'uni' ? userEduName : 'student') + " email address"}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                  autoFocus
                  required
                />
              </div>
              {eduEmailIsValid === false && isPersonalEmail === false && (
                <React.Fragment>
                  <div className="descriptor prompt error verifyForm alignLeft">
                    This must be a valid {userEduName} email address
                  </div>
                  {hasTextBeforeAt && hasTextAfterAt && endsWithSymbol != true && (
                    <label className="checkbox-container alignLeft textLeft">This is a valid {userEduName} email. Submit for review
                      <input
                        type="checkbox"
                        name="sentForReview"
                        className="SubmitMatch-input"
                        value="1"
                        onClick={this.handleMessageChange}
                        required
                      />
                      <span className="checkmark" />
                    </label>
                  )}
                </React.Fragment>
              )}
              {isPersonalEmail === true && (
                <div className="descriptor prompt error verifyForm alignLeft textLeft">This can&#39;t be a personal email address</div>
              )}
              <button type="button" onClick={this.handleSubmit} disabled={!isEnabled} className="Submit-btn fullWidth">
                Next
              </button>
              {eetStatus === 'sch' || eetStatus === 'uni' && (
                <button type="button" onClick={this.handleUpdateEdu} className="Submit-btn BlankBtn Grey fullWidth">
                  or Change {eetStatus === 'uni' ? 'University' : country === 'GBR' ? 'School/College' : 'High School'}
                </button>
              )}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConfirmStudent;
