// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import "../css/SignUp.css";
import ConfirmStudent from './ConfirmStudent.js';
import CountryShortSU from './CountryShortSU.js';
import EduShortSU from './EduShortSU.js';
import IndustryRoleSU from './IndustryRoleSU.js';
import DiversitySU from './DiversitySU.js';
import ProgressCircles from './ProgressCircles.js';
import SignUpScreenTemplate from './SignUpScreenTemplate.js';
import TypeformEmbedded from './TypeformEmbedded.js';
import VerifyEmail from './VerifyEmail.js';
import {lookupUKSchUnis} from './UserDetail.js';

function VerifyStudentProps(eetStatus, userEduName, currCo, currTrainingProvider) {
  let confirmStudentProps = {};

  switch (eetStatus) {
    case 'sch':
      confirmStudentProps = {
        subheader: 'Tell us your personal ' + userEduName + ' email address so we can send you a verification code',
        title: 'Verify your account',
        fullWidth: false,
      }
      return confirmStudentProps;
    case 'uni':
      confirmStudentProps = {
        subheader: 'Tell us your personal ' + userEduName + ' email address so we can send you a verification code',
        title: 'Verify your account',
        fullWidth: false,
      }
      return confirmStudentProps;
    case 'job':
    case 'train':
    case 'none':
      confirmStudentProps = {
        subheader: 'Tell us your student email address so we can send you a verification code',
        title: 'Verify your account',
        fullWidth: false,
      }
      return confirmStudentProps;
  }
}

//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const MenteeShortSUProps = {
  subheader: 'Personalise your Prospela experience',
  title: 'Let\'s get you set up',
  fullWidth: false
}

//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const MenteeSU3Props = {
  subheader: 'By understanding where you\'re starting from and where you\'re trying to get to, we\'re better able to support you!',
  title: 'Help us help you',
  fullWidth: false
}

const MenteeSU4Props = {
  subheader: 'Prospela\'s Co-Founder\'s proudly come from "working class" & second-gen immigrant backgrounds =)',
  title: 'Some of us have extra hurdles',
  fullWidth: false
}

function MenteeSU5Props(emailToVerify) {
  let confirmStudentProps = {};

  confirmStudentProps = {
    subheader: 'We\'ve sent a verification code to ' + emailToVerify + '. Please enter it below. Note: code only valid for the next 24 hours.',
    title: 'Verify your Student email',
    fullWidth: false,
  }

  return confirmStudentProps;
}

// This includes all content to appear below SignUpScreenTemplate title for the Student Sign Up flow
const MenteeTypeformSignUpContent = ({tflink, step, currentStep, totalMenteeSteps}) => (
  <div>
    <ProgressCircles
      totalSteps={totalMenteeSteps}
      currentStep={currentStep}
    />
    <div className='embedded-typeform'>
      <TypeformEmbedded
        tflink={tflink}
      />
    </div>
  </div>
)

const MentorCountryShortSUProps = {
  subheader: 'Tell us where you\'re based',
  title: 'Let\'s get you set up',
  fullWidth: false
}

const MentorTypeformSignUpProps = {
  subheader: 'This will take about 10 mins & greatly help us match you to students based on your skills, interests, interests and personality … which makes for more successful mentoring!',
  title: 'Set up your profile',
  fullWidth: true
}

const MentorTypeformSignUpContent = ({tflink, step, currentStep, totalMentorSteps}) => (
  <div>
    <ProgressCircles
      totalSteps={totalMentorSteps}
      currentStep={currentStep}
    />
    <div className='embedded-typeform'>
      <TypeformEmbedded
        tflink={tflink}
      />
    </div>
  </div>
)

class TypeformSignUp extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: true,
      isGeneralError: '',
      step: 'didDiversity', // set to did1stSU when first loaded
      userEduName: '',
      updatingEdu: '',
      country: 'GBR',
      eetStatus: 'sch',
      schName: '2',
      schNameFreeText: '',
      uniName: '',
      uniNameFreeText: '',
      emailToVerify: '',
      sendForReview: [],
      reviewReason: [],
      currCo: '',
      currTrainingProvider: ''
    }
    this.sendForReview = this.sendForReview.bind(this);
    this.getUserEduName = this.getUserEduName.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.updateEetStatus = this.updateEetStatus.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.updateUKSch = this.updateUKSch.bind(this);
    this.updateSchFreeText = this.updateSchFreeText.bind(this);
    this.updateUKUni = this.updateUKUni.bind(this);
    this.updateUniFreeText = this.updateUniFreeText.bind(this);
    this.updateCurrCo = this.updateCurrCo.bind(this);
    this.updateCurrTrainingProv = this.updateCurrTrainingProv.bind(this);
    this.updateEduEmail = this.updateEduEmail.bind(this);
  }

  componentDidMount() {
    this.getUserEduName();
  }

  getUserEduName() {
    const {step, updatingEdu, country, eetStatus, schName, schNameFreeText, uniName, uniNameFreeText} = this.state;
    console.log("getusereduname function triggered")
    console.log("eetStatus: "+eetStatus)
    console.log("uniName: "+uniName)
    console.log("step: "+step)
    console.log("updatingEdu: "+updatingEdu)
    if (step === 'didDiversity' || (step === 'didCountry' && updatingEdu)) {
      if (eetStatus === 'sch') {
        if (country === 'GBR') {

          if (schName != '') {
            return Promise.all([lookupUKSchUnis(schName, 'label', eetStatus)])
              .then(sch => {
                this.setState({
                  isLoading: false,
                  userEduName: sch[0].label,
                  isGeneralError: false
                })
              })
              .catch(err => {
                console.log(err.message);
                this.setState({
                  isGeneralError: true,
                })
              })
          } else {
            this.setState({
              isLoading: false,
              userEduName: schNameFreeText
            })
          }

        } else {
          this.setState({
            isLoading: false,
            userEduName: schNameFreeText
          })
        }

      } else if (eetStatus === 'uni') {
        if (country === 'GBR') {

          if (uniName != '') {
            console.log("doing uni look up promise")
            return Promise.all([lookupUKSchUnis(uniName, 'label', eetStatus)])
              .then(uni => {
                this.setState({
                  isLoading: false,
                  userEduName: uni[0].label,
                  isGeneralError: false
                })
              })
              .catch(err => {
                console.log(err.message);
                this.setState({
                  isGeneralError: true,
                })
              })
          } else {
            console.log("userEduName should be OLD uni: "+this.state.userEduName)
            this.setState({
              isLoading: false,
              userEduName: uniNameFreeText
            }, () => {
              console.log("userEduName should be new uni: "+this.state.userEduName)
            })
          }

        } else {
          this.setState({
            isLoading: false,
            userEduName: uniNameFreeText
          })
        }
      } else {
        this.setState({
          isLoading: false
        })
      }
    }
  }

  sendForReview(itemsToReview, reviewReason) {
    console.log("sending for review")
    this.setState(prevState => ({
      sendForReview: prevState.sendForReview.concat(itemsToReview),
      reviewReason: prevState.reviewReason.concat(reviewReason)
    }))
  }

  updateStep(stepJustDone, updatingEdu) {
    if (stepJustDone === 'didCountry') {
      this.setState({
        step: 'didCountry'
      })
      return;

    } else if (stepJustDone === 'didEdu' && updatingEdu != true) {
      this.setState({
        step: 'didEdu'
      })
      return;

    } else if (stepJustDone === 'didEdu' && updatingEdu === true) {
      return Promise.all([this.getUserEduName()])
        .then(res => {
          this.setState({
            step: 'didDiversity', // User updated education & has already done Shortsu so jump forward to didDiversity and confirm email
            isGeneralError: false
          }, () => {
            console.log("triggering getUserEduName")
            this.getUserEduName()
          })
        })
        .catch(err => {
          console.log(err.message);
          this.setState({
            isGeneralError: true,
          })
        })

    } else if (stepJustDone === 'didIndRole') {
      this.setState({
        step: 'didIndRole'
      })
    return;

    } else if (stepJustDone === 'didDiversity') {
      this.setState({
        step: 'didDiversity'
      }, () => {
        console.log("triggering getUserEduName")
        this.getUserEduName()
      })
      return;

    } else if (stepJustDone === 'didEduEmail' && updatingEdu === true) {
      this.setState({
        step: 'didCountry', // User wants to go back to update education
        updatingEdu: true
      })
      return;

    } else if (stepJustDone === 'didEduEmail' && updatingEdu != true) {
      this.setState({
        step: 'didEduEmail'
      })
      return;

    } else if (stepJustDone === 'didEmailVerifNeedsRev') {
      this.setState({
        step: 'didEmailVerifNeedsRev'
      })
      return;
    }

  }

  updateCountry(userInput) {
    this.setState({
      country: userInput
    })
  }

  updateEetStatus(userInput) {
    this.setState({
      eetStatus: userInput,
      schName: '',
      schNameFreeText: '',
      uniName: '',
      uniNameFreeText: '',
      currCo: '',
      currTrainingProvider: ''
    })
  }

  updateUKSch(userInput, callback) {
    this.setState({
      schName: userInput
    }, () => {
      if (callback) {
        callback();
      }
    })
  }

  updateSchFreeText(userInput, callback) {
    this.setState({
      schNameFreeText: userInput
    }, () => {
      if (callback) {
        callback();
      }
    })
  }

  updateUKUni(userInput, callback) {
    this.setState({
      uniName: userInput
    }, () => {
      if (callback) {
        callback();
      }
    })
  }

  updateUniFreeText(userInput, callback) {
    this.setState({
      uniNameFreeText: userInput
    }, () => {
      if (callback) {
        callback();
      }
    })
  }

  updateCurrCo(userInput, callback) {
    this.setState({
      currCo: userInput
    }, () => {
      if (callback) {
        callback();
      }
    })
  }

  updateCurrTrainingProv(userInput, callback) {
    this.setState({
      currTrainingProvider: userInput
    }, () => {
      if (callback) {
        callback();
      }
    })
  }

  updateEduEmail(userInput, callback) {
    this.setState({
      emailToVerify: userInput
    }, () => {
      if (callback) {
        callback();
      }
    })
  }

  render() {
    const {isGeneralError, isLoading, step, updatingEdu, country, userEduName, eetStatus, schName, schNameFreeText, uniName, uniNameFreeText, currCo, currTrainingProvider, emailToVerify} = this.state;
    const userRole = 'mentee';
    const totalMenteeSteps = 5;
    const totalMentorSteps = 2;
    const fname = 'Emma';
    const id = '12345';
    const mentortflink = 'https://prospela.typeform.com/to/vRxfCm?fname='+fname+'&uid='+id; // actual typeform to be used
    const menteetflink = 'https://prospela.typeform.com/to/UZtWfo?fname='+fname+'&uid='+id; // actual typeform to be used

    if (isGeneralError === true) {
      <div>
        Something went wrong. Please try reloading the page.
      </div>
    } else if(userRole === 'mentee') {
      switch (step) {
        case 'did1stSU':
          return (
            <SignUpScreenTemplate {...MenteeShortSUProps}>
              <CountryShortSU
                step={step}
                userRole={userRole}
                currentStep="1"
                totalMenteeSteps={totalMenteeSteps}
                updateCountry={this.updateCountry}
                updateStep={this.updateStep}
              />
            </SignUpScreenTemplate>
          );
        case 'didCountry': // School status component goes here
          return (
            <SignUpScreenTemplate {...MenteeShortSUProps}>
              <EduShortSU
                step={step}
                country={country}
                currentStep="2"
                totalMenteeSteps={totalMenteeSteps}
                updatingEdu={updatingEdu}
                eetStatus={updatingEdu ? eetStatus : ''}
                updateEetStatus={this.updateEetStatus}
                updateUKSch={this.updateUKSch}
                updateSchFreeText={this.updateSchFreeText}
                updateUKUni={this.updateUKUni}
                updateUniFreeText={this.updateUniFreeText}
                updateCurrCo={this.updateCurrCo}
                updateCurrTrainingProv={this.updateCurrTrainingProv}
                updateStep={this.updateStep}
                sendForReview={this.sendForReview}
              />
            </SignUpScreenTemplate>
          );
        case 'didEdu':
          return (
            <SignUpScreenTemplate {...MenteeSU3Props}>
              <IndustryRoleSU
                step={step}
                currentStep="3"
                totalMenteeSteps={totalMenteeSteps}
                updateStep={this.updateStep}
              />
            </SignUpScreenTemplate>
          );
        case 'didIndRole':
          return (
            <SignUpScreenTemplate {...MenteeSU4Props}>
              <DiversitySU
                step={step}
                currentStep="4"
                totalMenteeSteps={totalMenteeSteps}
                updateStep={this.updateStep}
              />
            </SignUpScreenTemplate>
          );
        case 'didDiversity':
          return (
            !isLoading && (
              <SignUpScreenTemplate {...VerifyStudentProps(eetStatus, userEduName, currCo, currTrainingProvider)}>
                <ConfirmStudent
                  step={step}
                  currentStep="5"
                  totalMenteeSteps={totalMenteeSteps}
                  schName={schName}
                  schNameFreeText={schNameFreeText}
                  uniName={uniName}
                  uniNameFreeText={uniNameFreeText}
                  eetStatus={eetStatus}
                  country={country}
                  userEduName={userEduName}
                  updateStep={this.updateStep}
                  updateEduEmail={this.updateEduEmail}
                  sendForReview={this.sendForReview}
                  currCo={currCo}
                  currTrainingProvider={currTrainingProvider}
                />
              </SignUpScreenTemplate>
            )
          );
        case 'didEduEmail':
          return (
            <SignUpScreenTemplate {...MenteeSU5Props(emailToVerify)}>
              <VerifyEmail
                step={step}
                updateStep={this.updateStep}
                emailToVerify={emailToVerify}
              />
            </SignUpScreenTemplate>
          );
        case 'didEmailVerifNeedsRev':
          return (
            console.log("pending review page goes here")
          );
      }
    } else {
      switch (step) {
        case 'didEmailVerif':
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MentorCountryShortSUProps}>
                  <CountryShortSU step={step} userRole={userRole} currentStep="1" totalMenteeSteps={totalMentorSteps}/>
                </SignUpScreenTemplate>
              )}
            </React.Fragment>
          );
        case 'didCountry':
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MentorTypeformSignUpProps}>
                  <MentorTypeformSignUpContent tflink={mentortflink} step={step} currentStep="2" totalMenteeSteps={totalMentorSteps}/>
                </SignUpScreenTemplate>
              )}
    	      </React.Fragment>
          );
      }
    }
  }
}

export default TypeformSignUp;
