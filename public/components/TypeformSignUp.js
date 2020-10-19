// Dex last merged this code on 19th oct 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { connect } from "react-redux";
//import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import "../css/SignUp.css";
import ConfirmStudent from './ConfirmStudent.js';
import CountryShortSU from './CountryShortSU.js';
import EduShortSU from './EduShortSU.js';
import IndustryRoleSU from './IndustryRoleSU.js';
import DiversitySU from './DiversitySU.js';
import ProgressCircles from './ProgressCircles.js';
import SignUpScreenTemplate from './SignUpScreenTemplate.js';
//import TypeformEmbedded from './TypeformEmbedded.js';
import VerifyEmail from './VerifyEmail.js';
import {lookupUKSchUnis} from './UserDetail.js';
import {LoadingSpinner} from './GeneralFunctions.js';

import chatList from './1LastActiveChats.js';
import LastActive from './1LastActive.js';

//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const MenteeShortSUProps = {
  subheader: 'Personalise your Prospela experience',
  title: 'Let\'s get you set up',
  fullWidth: false
}

function MenteeSU3Props(userRole) {
  let confirmStudentProps = {};

  const title = userRole === 'mentor' ? 'How can you help?' : 'Help us help you'
  const subheader = userRole === 'mentor' ? 'You might have experience across a range of roles & industries' : 'By understanding where you\'re starting from and where you\'re trying to get to, we\'re better able to support you!'

  confirmStudentProps = {
    subheader: subheader,
    title: title,
    fullWidth: false,
  }
  return confirmStudentProps;

}

const MenteeSU4Props = {
  subheader: 'Prospela\'s Co-Founder\'s proudly come from "working class" & second-gen immigrant backgrounds =)',
  title: 'Some of us have extra hurdles',
  fullWidth: false
}

function MenteeSU5Props(eetStatus, userEduName, currCo, currTrainingProvider, step, userRole) {
  let confirmStudentProps = {};

/*  const subheaderUni = step === 'updatingEmailError' ? ('It looks like the email you entered isn\'t a valid ' + userEduName + ' email address. Please try again') : ('Tell us your personal ' + userEduName + ' email address so we can send you a verification code');
  const titleUni = step === 'updatingEmailError' ? 'Is your Uni email correct?' : (step === 'updatingEmail' ? 'Update your uni email' : 'Verify your account')
  const titleWork = step === 'updatingEmailError' ? 'Is your Work email correct?' : (step === 'updatingEmail' ? 'Update your work email' : 'Verify your account')*/
  const subheaderUni = 'Tell us your personal ' + userEduName + ' email address so we can send you a verification code';
  const titleUni = step === 'updatingEmail' ? 'Update your uni email' : 'Verify your account';
  const titleWork = step === 'updatingEmail' ? 'Update your work email' : 'Verify your account';
  const emailType2 = userRole === 'mentor' ? (eetStatus != 'none' ? userEduName : 'work') : 'student'

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
        subheader: subheaderUni,
        title: titleUni,
        fullWidth: false,
      }
      return confirmStudentProps;
    case 'job':
    case 'train':
    case 'none':
      confirmStudentProps = {
        subheader: 'Tell us your ' + emailType2 + ' email address so we can send you a verification code',
        title: titleWork,
        fullWidth: false,
      }
      return confirmStudentProps;
  }
}

function MenteeSU6Props(emailToVerify, userRole) {
  let confirmStudentProps = {};
  const emailType2 = userRole === 'mentee' ? 'Student' : 'Work'

  confirmStudentProps = {
    subheader: 'We\'ve sent a verification code to ' + emailToVerify + '. Please enter it below. Note: code only valid for the next 24 hours.',
    title: 'Verify your ' + emailType2 + ' email',
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
/*const MenteeTypeformSignUpContent = ({tflink, step, currentStep, totalMenteeSteps}) => (
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
)*/

const MentorCountryShortSUProps = {
  subheader: 'Tell us where you\'re based',
  title: 'Let\'s get you set up',
  fullWidth: false
}

/*const MentorTypeformSignUpProps = {
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
)*/

class TypeformSignUp extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: true,
      isGeneralError: '',
      step: 'didDiversity', // set to did1stSU when first loaded
      userEduName: '',
      country: 'AUS',
      eetStatus: 'uni',
      schName: '',
      schNameFreeText: '',
      uniName: '',
      uniNameFreeText: 'aus school',
      emailToVerify: 'emma@pladis.com',
      currCo: '',
      currTrainingProvider: '',
      userRole: 'mentee'
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
    this.mounted = true
    this.getUserEduName();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getUserEduName() {
    const {step, country, eetStatus, schName, schNameFreeText, uniName, uniNameFreeText, userRole, currCo, currTrainingProvider} = this.state;

//    if (step === 'didDiversity' || step === 'updatingEdu' || step === 'didGroup' || step === 'updatingEmail' || step === 'updatingEmailError' ) {
    if (step === 'didDiversity' || step === 'updatingEdu' || step === 'didGroup' || step === 'updatingEmail') {
      if (eetStatus === 'sch') {
        if (country === 'GBR') {

          if (schName != '') {
            return Promise.all([lookupUKSchUnis(schName, 'label', eetStatus)])
              .then(sch => {
                if(this.mounted) {
                  this.setState({
                    isLoading: false,
                    userEduName: sch[0].label,
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
                if(this.mounted) {
                  this.setState({
                    isLoading: false,
                    userEduName: uni[0].label,
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
      } else if (eetStatus === 'job') {
        this.setState({
          isLoading: false,
          userEduName: currCo
        })
      } else if (eetStatus === 'train') {
        this.setState({
          isLoading: false,
          userEduName: currTrainingProvider
        })
      } else {
        this.setState({
          isLoading: false,
          userEduName: 'student'
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
          if(this.mounted) {
            this.setState({
              step: 'didDiversity', // User updated education & has already done Shortsu so jump forward to didDiversity and confirm email
              isGeneralError: false,
            }, () => {
              this.getUserEduName()
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

    } else if (stepJustDone === 'didIndRole') {
      this.setState({
        step: 'didIndRole'
      })
      return;
    } else if (stepJustDone === 'didIndRoleMentor') {
      this.setState({
        step: 'didIndRoleMentor'
      })
      return;

    } else if (stepJustDone === 'didDiversity') {
      this.setState({
        step: 'didDiversity'
      }, () => {
        this.getUserEduName()
      })
      return;
    } else if (stepJustDone === 'updatingEmail') {
      this.setState({
        step: 'updatingEmail'
      }, () => {
        this.getUserEduName()
      })
      return;
/*    } else if (stepJustDone === 'updatingEmailError') {
      this.setState({
        step: 'updatingEmailError'
      }, () => {
        this.getUserEduName()
      })
      return;*/
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
    const {isGeneralError, isLoading, step, country, userEduName, eetStatus, schName, schNameFreeText, uniName, uniNameFreeText, currCo, currTrainingProvider, emailToVerify, userRole} = this.state;
    const totalMenteeSteps = 5;
    const totalMentorSteps = 3;
    const fname = 'Emma';
    const id = '12345';
    const mentortflink = 'https://prospela.typeform.com/to/vRxfCm?fname='+fname+'&uid='+id; // actual typeform to be used
  //  const menteetflink = 'https://prospela.typeform.com/to/UZtWfo?fname='+fname+'&uid='+id; // actual typeform to be used

    if (isGeneralError === true) {
      <div>
        Oops! Something went wrong. Please try reloading the page.
      </div>
    } else {
      switch (step) {
        case 'did1stSU':
          return (
            <SignUpScreenTemplate {...MenteeShortSUProps}>
              <CountryShortSU
                step={step}
                userRole={userRole}
                currentStep="1"
                totalSteps={userRole === 'mentee' ? totalMenteeSteps : totalMentorSteps}
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
                userRole={userRole}
                currentStep="2"
                totalSteps={userRole === 'mentee' ? totalMenteeSteps : totalMentorSteps}
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
            <SignUpScreenTemplate {...MenteeSU3Props(userRole)}>
              <IndustryRoleSU
                step={step}
                userRole={userRole}
                currentStep="3"
                totalSteps={userRole === 'mentee' ? totalMenteeSteps : totalMentorSteps}
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
                totalSteps={userRole === 'mentee' ? totalMenteeSteps : totalMentorSteps}
                updateStep={this.updateStep}
              />
            </SignUpScreenTemplate>
          );
      /*  case 'didIndRoleMentor':
          return (
            <SignUpScreenTemplate>
              <GroupSU
                step={step}
                currentStep="4"
                totalSteps={userRole === 'mentee' ? totalMenteeSteps : totalMentorSteps}
                updateStep={this.updateStep}
              />
            </SignUpScreenTemplate>
          );*/
        case 'didDiversity':
        case 'updatingEmail':
    //    case 'updatingEmailError':
          return (
            <React.Fragment>
              {this.state.isLoading === true && (
                <div className="clientUI">
                  <div className="clientContainer">
                    <div className="loadingSUContainer">
                      <div id="loadingSU-welcome">
                        <div className="loadingSUMsg">
                          <p className="loadingWelcomeMsg">
                            Loading sign-up form...
                          </p>
                          <div className="infiniteSpinner infiniteSpinner-medium">
                            <div className="LoaderLayout-sc-1eu50fy-0 eczmJS">
                              <div className="LoaderWrapper-sc-1eu50fy-1 iKvkDg">
                                <LoadingSpinner />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!isLoading && (
                <SignUpScreenTemplate {...MenteeSU5Props(eetStatus, userEduName, currCo, currTrainingProvider, step, userRole)}>
                  <ConfirmStudent
                    step={step}
                    userRole={userRole}
                    currentStep='5'
                    totalSteps={userRole === 'mentee' ? totalMenteeSteps : totalMentorSteps}
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
              )}
            </React.Fragment>
          );
        case 'didEduEmail':
        case 'didEduEmailNeedsRev':
        case 'didGroup':
        case 'didIndRoleMentor':
          return (
            <SignUpScreenTemplate {...MenteeSU6Props(emailToVerify, userRole)}>
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
      }
    }
  }
}

export default TypeformSignUp;
