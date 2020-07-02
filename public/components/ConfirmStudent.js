// Dex last merged this code on 29th June 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import ProgressCircles from './ProgressCircles.js';
import TypeformEmbedded from './TypeformEmbedded.js';
//import Autocomplete from './Autocomplete.js';
import Checkbox from './Checkbox.js';
import NoEduEmail from './NoEduEmail.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import {lookupUKSchUnis} from './UserDetail.js';
import personalEmails from "./PersonalEmails.js";

class ConfirmStudent extends React.Component {
  constructor () {
    super();
    this.state = {
      isGeneralError: '',
      isSubmitting: false,
      userInput: '',
      eduEmailIsValid: '',
      isPersonalEmail: '',
      containsDotAndAt: '',
      hasTextBeforeAt: '',
      hasTextAfterAt: '',
      endsWithSymbol: '',
      isHtmlValid: '',
      emailFormat: '',
      dm: '',
      requestReview: false,
      submitted: ''
    }
    this.onBlur = this.onBlur.bind(this);
    this.checkEduEmail = this.checkEduEmail.bind(this);
    this.handleNoEduEmail = this.handleNoEduEmail.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleUpdateEdu = this.handleUpdateEdu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.mounted = true
    const {country, schName, uniName, eetStatus} = this.props;

    if (country === 'GBR') {
      if (eetStatus === 'sch' && schName != '') {
        return Promise.all([lookupUKSchUnis(schName, 'emailFormat', eetStatus)])
          .then(email => {
            if(this.mounted) {
              this.setState({
                emailFormat: email[0].emailFormat.toLowerCase(),
                dm: email[0].dm != undefined ? email[0].dm : '',
                isGeneralError: false
              })
            }
          })
          .catch(err => {
            if(this.mounted) {
              this.setState({
                isGeneralError: true,
              })
            }
          })

      } else if (eetStatus === 'uni' && uniName != '') {
        return Promise.all([lookupUKSchUnis(uniName, 'emailFormat', eetStatus)])
          .then(email => {
            if(this.mounted) {
              this.setState({
                emailFormat: email[0].emailFormat.toLowerCase(),
                isGeneralError: false
              })
            }
          })
          .catch(err => {
            if(this.mounted) {
              this.setState({
                isGeneralError: true,
              })
            }
          })
      }
    }
  }

  componentWillUnmount() {

    this.mounted = false;

    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
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
//    const {eduEmailIsValid} = this.state;
    this.setState({
      userInput: e.currentTarget.value
    })
  }

  toggleCheckbox = (e) => {
    const currentState = this.state[e.target.name];

    if (currentState === false) {
      this.setState({
        [e.target.name]: true,
      }, () => {
        document.getElementById("Submit-btn-eduEmail").focus()
      });

    } else {
      this.setState({
        [e.target.name]: false
      });
    }
  }

  onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      e.stopPropagation();
      e.preventDefault();

    }
  }

  handleKeyUp = (e) => {

    clearTimeout(this.timerHandle);

    this.timerHandle = setTimeout(() => {
      this.checkEduEmail()
      this.timerHandle = 0;
    }, 800);
  }

  handleUpdateEdu() {
    const {updateStep} = this.props;

    updateStep('didEduEmail', true)
  }

  handleNoEduEmail(emailInput) {
    const {updateStep, updateEduEmail} = this.props;
    updateEduEmail(emailInput)
    updateStep('didEduEmail', false)
  }

  handleSubmit() {
    const {userInput, eduEmailIsValid, requestReview} = this.state;
    const {country, updateStep, updateEduEmail} = this.props;

    this.setState({
      isSubmitting: true,
      submitted: true
    })
    updateEduEmail(userInput, () => {
      if (requestReview === true) {
        updateStep('didEduEmailNeedsRev', false)
      } else {
        updateStep('didEduEmail', false)
      }
    })
  }

  checkEduEmail() {
    const {userInput, emailFormat, dm, eduEmailIsValid} = this.state;
    const {country, eetStatus, schName, uniName, schNameFreeText, uniNameFreeText} = this.props;

    var emailSplit = userInput.split('@')
    var freeEmail = emailSplit[emailSplit.length-1].toLowerCase();
    const emailFormInput = document.getElementById("eduEmailInput")

  if (personalEmails.includes(freeEmail)) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: true,
        requestReview: false
      });
    } else if (userInput.includes(".") != true || userInput.includes("@") != true) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: false,
        containsDotAndAt: false,
        requestReview: false
      });
    } else if (userInput.indexOf("@") === 0) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: false,
        containsDotAndAt: true,
        hasTextBeforeAt: false,
        requestReview: false
      });
    } else if (/^[a-zA-Z()]+$/.test(userInput.charAt(userInput.indexOf("@") + 1)) === false) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: false,
        containsDotAndAt: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: false,
        requestReview: false
      });
    } else if (/^[a-zA-Z()]+$/.test(userInput.charAt(userInput.length - 1)) === false) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: false,
        containsDotAndAt: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: true,
        requestReview: false
      });
    } else if (emailFormInput.checkValidity() != true) {
      this.setState({
        eduEmailIsValid: false,
        isPersonalEmail: false,
        containsDotAndAt: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: false,
        isHtmlValid: false,
        requestReview: false
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
            containsDotAndAt: true,
            hasTextBeforeAt: true,
            hasTextAfterAt: true,
            endsWithSymbol: false,
            isHtmlValid: true,
          }, () => {
            if (eduEmailIsValid === false && (document.getElementById("requestReview") != undefined && document.getElementById("requestReview").checked)) {
              this.setState({
                requestReview: true,
              })
            } else {
              this.setState({
                requestReview: false,
              }, () => {
                if (this.state.submitted != true) {
                  document.getElementById("Submit-btn-eduEmail").focus()
                }
              })
            }
          });

        // if sch doesnt have specific format or user freetyped in sch name then do general check
        } else {

          const isValid = (userInput.indexOf(".sch.uk") == userInput.length - 7 || userInput.indexOf(".gov.uk") == userInput.length - 7 || userInput.indexOf(".ac.uk") == userInput.length - 6);

          this.setState({
            eduEmailIsValid: isValid,
            isPersonalEmail: false,
            containsDotAndAt: true,
            hasTextBeforeAt: true,
            hasTextAfterAt: true,
            endsWithSymbol: false,
            isHtmlValid: true,
          }, () => {
            if (eduEmailIsValid === false && (document.getElementById("requestReview") != undefined && document.getElementById("requestReview").checked)) {
              this.setState({
                requestReview: true,
              })
            } else {
              this.setState({
                requestReview: false,
              }, () => {
                if (this.state.submitted != true) {
                  document.getElementById("Submit-btn-eduEmail").focus()
                }
              })
            }
          });
        }

      } else if (eetStatus === 'uni') {

        // first check if user selected uni from our list and whether that university has defined a specific email format
        if (uniName != '' && emailFormat != "") {

          // This University does not have .ac.uk format
          if (uniName === '69' || uniName === '163') {
            const isValid = freeEmail === emailFormat;
            this.setState({
              eduEmailIsValid: isValid,
              isPersonalEmail: false,
              containsDotAndAt: true,
              hasTextBeforeAt: true,
              hasTextAfterAt: true,
              endsWithSymbol: false,
              isHtmlValid: true,
            }, () => {
              if (eduEmailIsValid === false && (document.getElementById("requestReview") != undefined && document.getElementById("requestReview").checked)) {
                this.setState({
                  requestReview: true,
                })
              } else {
                this.setState({
                  requestReview: false,
                }, () => {
                  if (this.state.submitted != true) {
                    document.getElementById("Submit-btn-eduEmail").focus()
                  }
                })
              }
            });
          } else {
            const isValid = freeEmail === emailFormat + ".ac.uk";
            this.setState({
              eduEmailIsValid: isValid,
              isPersonalEmail: false,
              containsDotAndAt: true,
              hasTextBeforeAt: true,
              hasTextAfterAt: true,
              endsWithSymbol: false,
              isHtmlValid: true,
            }, () => {
              if (eduEmailIsValid === false && (document.getElementById("requestReview") != undefined && document.getElementById("requestReview").checked)) {
                this.setState({
                  requestReview: true,
                })
              } else {
                this.setState({
                  requestReview: false,
                }, () => {
                  if (this.state.submitted != true) {
                    document.getElementById("Submit-btn-eduEmail").focus()
                  }
                })
              }
            });
          }

        // if uni doesnt have specific format or user freetyped in uni name then do general check .ac.uk
        } else {
          const length = userInput.length - 6; /// 6 is length of ".ac.uK" string
          const isValid = userInput.indexOf(".ac.uk") == length;
          this.setState({
            eduEmailIsValid: isValid,
            isPersonalEmail: false,
            containsDotAndAt: true,
            hasTextBeforeAt: true,
            hasTextAfterAt: true,
            endsWithSymbol: false,
            isHtmlValid: true,
          }, () => {
            if (eduEmailIsValid === false && (document.getElementById("requestReview") != undefined && document.getElementById("requestReview").checked)) {
              this.setState({
                requestReview: true,
              })
            } else {
              this.setState({
                requestReview: false,
              }, () => {
                if (this.state.submitted != true) {
                  document.getElementById("Submit-btn-eduEmail").focus()
                }
              })
            }
          });
        }

      // if user is eetstatus: job, train or nonw then do general check
      } else {
        const isValid = (userInput.indexOf(".sch.uk") == userInput.length - 7 || userInput.indexOf(".ac.uk") == userInput.length - 6);
        this.setState({
          eduEmailIsValid: isValid,
          isPersonalEmail: false,
          containsDotAndAt: true,
          hasTextBeforeAt: true,
          hasTextAfterAt: true,
          endsWithSymbol: false,
          isHtmlValid: true,
        }, () => {
          if (eduEmailIsValid === false && (document.getElementById("requestReview") != undefined && document.getElementById("requestReview").checked)) {
            this.setState({
              requestReview: true,
            })
          } else {
            this.setState({
              requestReview: false,
            }, () => {
              if (this.state.submitted != true) {
                document.getElementById("Submit-btn-eduEmail").focus()
              }
            })
          }
        });
      }
    } else if (country === 'USA') {
      if (eetStatus === 'uni') {
        const length = userInput.length - 4; /// 4 is length of ".edu" string
        const isValid = userInput.indexOf(".edu") === length;

        this.setState({
          eduEmailIsValid: isValid,
          isPersonalEmail: false,
          containsDotAndAt: true,
          hasTextBeforeAt: true,
          hasTextAfterAt: true,
          endsWithSymbol: false,
          isHtmlValid: true,
        }, () => {
          if (eduEmailIsValid === false && (document.getElementById("requestReview") != undefined && document.getElementById("requestReview").checked)) {
            this.setState({
              requestReview: true,
            })
          } else {
            this.setState({
              requestReview: false,
            }, () => {
              if (this.state.submitted != true) {
                document.getElementById("Submit-btn-eduEmail").focus()
              }
            })
          }
        });

      } else if (eetStatus === 'sch') {
        // saying email is valid as don't know format of sch emails, but Prospela to approve before get access
        this.setState({
          eduEmailIsValid: true,
          isPersonalEmail: false,
          containsDotAndAt: true,
          hasTextBeforeAt: true,
          hasTextAfterAt: true,
          endsWithSymbol: false,
          isHtmlValid: true,
        }, () => {
          this.setState({
            requestReview: true,
          }, () => {
            if (this.state.submitted != true) {
              document.getElementById("Submit-btn-eduEmail").focus()
            }
          })
        });

      // if user is eetstatus: job, train or nonw then do general check
      } else {

        const isValid = (userInput.indexOf(".edu") === userInput.length - 4);
        this.setState({
          eduEmailIsValid: isValid,
          isPersonalEmail: false,
          containsDotAndAt: true,
          hasTextBeforeAt: true,
          hasTextAfterAt: true,
          endsWithSymbol: false,
          isHtmlValid: true,
        }, () => {
          if (eduEmailIsValid === false && (document.getElementById("requestReview") != undefined && document.getElementById("requestReview").checked)) {
            this.setState({
              requestReview: true,
            })
          } else {
            this.setState({
              requestReview: false,
            }, () => {
              if (this.state.submitted != true) {
                document.getElementById("Submit-btn-eduEmail").focus()
              }
            })
          }
        });
      }

    } else {
      //don't do a check (as dont know format for every country) just get them to verify
      //and then come to prospela for approval before going to dashboard

      this.setState({
        eduEmailIsValid: true,
        isPersonalEmail: false,
        containsDotAndAt: true,
        hasTextBeforeAt: true,
        hasTextAfterAt: true,
        endsWithSymbol: false,
        isHtmlValid: true,
      }, () => {
        this.setState({
          requestReview: true,
        }, () => {
          if (this.state.submitted != true) {
            document.getElementById("Submit-btn-eduEmail").focus()
          }
        })
      });
    }
  }

  canBeSubmitted() {
    const {userInput, eduEmailIsValid, isPersonalEmail, hasTextBeforeAt, hasTextAfterAt, endsWithSymbol, requestReview} = this.state;
    const {eetStatus} = this.props;

    if (eetStatus === 'sch' || eetStatus === 'uni') {
      if (userInput != '' && (eduEmailIsValid || requestReview != false) && !isPersonalEmail && hasTextBeforeAt && hasTextAfterAt && !endsWithSymbol) {
        const form = document.getElementById("form-ConfirmStudentSU");

        if (form.checkValidity()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }

    } else if (eetStatus === 'job' || eetStatus === 'train' || eetStatus === 'none') {
      if ((eduEmailIsValid || requestReview != false) && hasTextBeforeAt && hasTextAfterAt && !endsWithSymbol) {
        const form = document.getElementById("form-ConfirmStudentSU");

        if (form.checkValidity()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  render() {
    const { onChange, onKeyDown, toggleCheckbox, handleKeyUp } = this;
    const { tflink, step, country, currentStep, eetStatus, totalMenteeSteps, userEduName, currCo, currTrainingProvider, updateEduEmail, updateStep } = this.props;
    const { isGeneralError, containsDotAndAt, eduEmailIsValid, userInput, isPersonalEmail, hasTextBeforeAt, hasTextAfterAt, endsWithSymbol, isHtmlValid, isSubmitting } = this.state;
    const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div>
          <ProgressCircles
            totalSteps={totalMenteeSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            {isGeneralError === true && (
              <div>
                Oops! Something went wrong. Please try reloading the page.
              </div>
            )}
            {isGeneralError != true && (
              <form autoComplete="off" id="form-ConfirmStudentSU">
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="eduEmailInput">Your <strong>{eetStatus === 'sch' || eetStatus === 'uni' ? userEduName : 'student'}</strong> Email Address</label>
                  <input
                    type="email"
                    name="eduEmail"
                    id="eduEmailInput"
                    onBlur={this.onBlur}
                    onChange={onChange}
                    onKeyUp={handleKeyUp}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    className={"form-control-std verifyForm " + (eduEmailIsValid === true || eduEmailIsValid === "" ? "" : "error")}
                    placeholder={"Your " + (eetStatus === 'sch' || eetStatus === 'uni' ? userEduName : 'student') + " email address"}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    maxLength="100"
                    autoFocus
                    required
                  />
                  {isSubmitting === false && (
                    <NoEduEmail
                      country={country}
                      eetStatus={eetStatus}
                      handleNoEduEmail={this.handleNoEduEmail}
                      updateEduEmail={updateEduEmail}
                      updateStep={updateStep}
                      currCo={currCo}
                      currTrainingProvider={currTrainingProvider}
                    />
                  )}
                </div>
                {eduEmailIsValid === false && isPersonalEmail === false && (
                  <React.Fragment>
                    <div className="descriptor prompt error verifyForm otherOption alignLeft">
                      This must be a valid {(eetStatus === 'sch' || eetStatus === 'uni') ? userEduName : 'student'} email
                    </div>
                    {isHtmlValid === true && containsDotAndAt != false && hasTextBeforeAt && hasTextAfterAt && endsWithSymbol != true && (
                      <Checkbox
                        label={"This is a valid " + ((eetStatus === 'sch' || eetStatus === 'uni') ? userEduName : 'student') + " email. Submit for review"}
                        labelClassName="checkbox-container alignLeft textLeft reqAsterisk noPaddingT"
                        id="requestReview"
                        name="requestReview"
                        value="1"
                        className="SubmitMatch-input"
                        spanClassName="checkmark"
                        onChange={toggleCheckbox}
                        required
                      />
                    )}
                  </React.Fragment>
                )}
                {isPersonalEmail === true && (
                  <div className="descriptor prompt error verifyForm alignLeft textLeft">This can&#39;t be a personal email address</div>
                )}
                <button type="button" onClick={this.handleSubmit} disabled={isSubmitting === true ? true : !isEnabled} className="Submit-btn fullWidth" id="Submit-btn-eduEmail">
                  {isSubmitting === true && (
                    <LoadingSpinner />
                  )}
                  {isSubmitting != true && (
                    <span>Next</span>
                  )}
                </button>
                <button type="button" disabled={isSubmitting === true ? true : false} onClick={this.handleUpdateEdu} className="Submit-btn BlankBtn Grey fullWidth">
                  or Change {eetStatus === 'uni' ? 'University' : eetStatus === 'sch' ? country === 'GBR' ? 'School/College' : 'High School' : 'school status'}
                </button>
              </form>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConfirmStudent;
