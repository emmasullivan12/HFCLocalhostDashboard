// Dex last merged this code on 12th June 2020

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

import chatList from './1LastActiveChats.js';
import LastActive from './1LastActive.js';

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

function MenteeSU5Props(eetStatus, userEduName, currCo, currTrainingProvider) {
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

function MenteeSU6Props(emailToVerify) {
  let confirmStudentProps = {};

  confirmStudentProps = {
    subheader: 'We\'ve sent a verification code to ' + emailToVerify + '. Please enter it below. Note: code only valid for the next 24 hours.',
    title: 'Verify your Student email',
    fullWidth: false,
  }

  return confirmStudentProps;
}

const MenteeSU7Props = {
  subheader: 'We just need to verify your student status. You\'ll hear from us soon!',
  title: 'Hold tight',
  fullWidth: false
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
      step: 'didEdu', // set to did1stSU when first loaded
      userEduName: '',
      country: 'GBR',
      eetStatus: 'uni',
      schName: '',
      schNameFreeText: '',
      uniName: '75',
      uniNameFreeText: '',
      emailToVerify: '',
      currCo: '',
      currTrainingProvider: ''
    }
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
    const {step, country, eetStatus, schName, schNameFreeText, uniName, uniNameFreeText} = this.state;

    if (step === 'didDiversity' || step === 'updatingEdu') {
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
            return Promise.all([lookupUKSchUnis(uniName, 'label', eetStatus)])
              .then(uni => {
                this.setState({
                  isLoading: false,
                  userEduName: uni[0].label,
                  isGeneralError: false
                })
              })
              .catch(err => {
                this.setState({
                  isGeneralError: true,
                })
              })
          } else {
            this.setState({
              isLoading: false,
              userEduName: uniNameFreeText
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

  updateStep(stepJustDone, updatingEdu) {
    if (stepJustDone === 'didCountry') {
      this.setState({
        step: 'didCountry'
      })
      return;

    } else if (stepJustDone === 'didEdu') {
      this.setState({
        step: 'didEdu'
      })
      return;

    } else if (stepJustDone === 'updatingEdu') {
      return Promise.all([this.getUserEduName()])
        .then(res => {
          this.setState({
            step: 'didDiversity', // User updated education & has already done Shortsu so jump forward to didDiversity and confirm email
            isGeneralError: false,
          }, () => {
            this.getUserEduName()
          })
        })
        .catch(err => {
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
        this.getUserEduName()
      })
      return;

    } else if (stepJustDone === 'didEduEmail' && updatingEdu === true) {
      this.setState({
        step: 'updatingEdu', // User wants to go back to update education
      })
      return;

    } else if (stepJustDone === 'didEduEmail' && updatingEdu != true) {
      this.setState({
        step: 'didEduEmail'
      })
      return;

    } else if (stepJustDone === 'didEduEmailNeedsRev') {
      this.setState({
        step: 'didEduEmailNeedsRev'
      })
      return;

    } else if (stepJustDone === 'didEmailVerif') {
      this.setState({
        step: 'didEmailVerif'
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
    if (userInput === 'personal') {
      const personalEmail = 'personal@gmail.com' //DEX TO PULL IN PERSONAL EMAIL FROM HTML SIGNUP PAGE
      this.setState({
        emailToVerify: personalEmail
      }, () => {
        if (callback) {
          callback();
        }
      })
    } else {
      this.setState({
        emailToVerify: userInput
      }, () => {
        if (callback) {
          callback();
        }
      })
    }
  }

  render() {
    const {isGeneralError, isLoading, step, country, userEduName, eetStatus, schName, schNameFreeText, uniName, uniNameFreeText, currCo, currTrainingProvider, emailToVerify} = this.state;
    const userRole = 'mentee';
    const totalMenteeSteps = 5;
    const totalMentorSteps = 2;
    const fname = 'Emma';
    const id = '12345';
    const mentortflink = 'https://prospela.typeform.com/to/vRxfCm?fname='+fname+'&uid='+id; // actual typeform to be used
  //  const menteetflink = 'https://prospela.typeform.com/to/UZtWfo?fname='+fname+'&uid='+id; // actual typeform to be used

    if (isGeneralError === true) {
      <div>
        Oops! Something went wrong. Please try reloading the page.
      </div>
    } else if (userRole === 'mentee') {
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
        case 'didCountry':
        case 'updatingEdu':
          return (
            <SignUpScreenTemplate {...MenteeShortSUProps}>
              <EduShortSU
                step={step}
                country={country}
                currentStep="2"
                totalMenteeSteps={totalMenteeSteps}
                eetStatus={step === 'updatingEdu' ? eetStatus : ''}
                updateEetStatus={this.updateEetStatus}
                updateUKSch={this.updateUKSch}
                updateSchFreeText={this.updateSchFreeText}
                updateUKUni={this.updateUKUni}
                updateUniFreeText={this.updateUniFreeText}
                updateCurrCo={this.updateCurrCo}
                updateCurrTrainingProv={this.updateCurrTrainingProv}
                updateStep={this.updateStep}
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
                country={country}
                eetStatus={eetStatus}
                totalMenteeSteps={totalMenteeSteps}
                updateStep={this.updateStep}
              />
            </SignUpScreenTemplate>
          );
        case 'didDiversity':
          return (
            !isLoading && (
              <SignUpScreenTemplate {...MenteeSU5Props(eetStatus, userEduName, currCo, currTrainingProvider)}>
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
                  currCo={currCo}
                  currTrainingProvider={currTrainingProvider}
                />
              </SignUpScreenTemplate>
            )
          );
        case 'didEduEmail':
        case 'didEduEmailNeedsRev':
          return (
            <SignUpScreenTemplate {...MenteeSU6Props(emailToVerify)}>
              <VerifyEmail
                step={step}
                updateStep={this.updateStep}
                emailToVerify={emailToVerify}
              />
            </SignUpScreenTemplate>
          );
        case 'didEmailVerifNeedsRev':
          return (
            <SignUpScreenTemplate {...MenteeSU7Props} />
          );
        case 'didEmailVerif':
          return (
            <div>
              Doesnt need review. Show the dashboard!!
            </div>
          );
    /*    case 'checkActiveUsers':
          return (
            <LastActive
              chatList={chatList}
            />
          );*/
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
