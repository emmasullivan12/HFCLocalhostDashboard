// Dex last merged this code on 24th may 2024
import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { connect } from "react-redux";
//import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import "../css/SignUp.css";

import CountryShortSU from './CountryShortSU.js';
import EduShortSU from './EduShortSU.js';
import ExpertiseSU from './ExpertiseSU.js';
import ProgressCircles from './ProgressCircles.js';
import SignUpScreenTemplate from './SignUpScreenTemplate.js';
import TripwirePage from './TripwirePage.js';
import UpdateEmail from './UpdateEmail.js';
import VerifyEmail from './VerifyEmail.js';
import {lookupUKSchUnis, getCompanyDeets} from './UserDetail.js';
import {LoadingSpinner} from './GeneralFunctions.js';

import chatList from './1LastActiveChats.js';
import LastActive from './1LastActive.js';

//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const UserShortSUProps = {
  subheader: 'Personalise your Human Finance Club experience',
  title: 'Let\'s get you set up',
  fullWidth: false
}

const UserSU3Props = {
  subheader: 'By understanding where you\'re starting from and where you\'re trying to get to, we\'re better able to support you!',
  title: 'Help us help you',
  fullWidth: false
}

const UserSU5Props = {
  subheader: 'Tell us your email address so we can send you a verification code',
  title: 'Update your email',
  fullWidth: false,
}

function UserSU6Props(emailToVerify) {
  let verifyEmailProps = {
    subheader: 'We\'ve sent a verification code to ' + emailToVerify + '. Note: code only valid for the next 24 hours.',
    title: 'Verify your email',
    fullWidth: false,
  }
  return verifyEmailProps
}

const UserSU7Props = {
  subheader: 'Welcome aboard - now you’re officially part of The Human Finance Club. As a thank you, here’s an exclusive 24-hour launch offer.',
  title: 'Thanks for verifying your email 🎉',
  fullWidth: true,
  containerClassName: "paddingL30 paddingR30 paddingTop50",
  isTripwire: true,
}

class TypeformSignUp extends Component {
  constructor () {
    super();
    this.state = {
      isGeneralError: '',
      step: 'didEmailVerif', // set to did1stSU when first loaded
      userEduName: '',
      country: 'GBR',
      eetStatus: 'uni',
      schName: '',
      schNameFreeText: '',
      uniName: '',
      uniNameFreeText: '',
      emailToVerify: 'emma@pladis.com',
      currCo: '',
      currCoFreeText: '',
      currTrainingProvider: '',
    }
    this.updateCountry = this.updateCountry.bind(this);
    this.updateEetStatus = this.updateEetStatus.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.updateUKSch = this.updateUKSch.bind(this);
    this.updateSchFreeText = this.updateSchFreeText.bind(this);
    this.updateUKUni = this.updateUKUni.bind(this);
    this.updateUniFreeText = this.updateUniFreeText.bind(this);
    this.updateCurrCo = this.updateCurrCo.bind(this);
    this.updateCurrTrainingProv = this.updateCurrTrainingProv.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateStep(stepJustDone) {
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

    } else if (stepJustDone === 'didExpertise') {
      this.setState({
        step: 'didExpertise'
      })
      return;
    } else if (stepJustDone === 'updatingEmail') {
      this.setState({
        step: 'updatingEmail' // re-load VerifyEmail page
      })
      return;
    } else if (stepJustDone === 'updatedEmail') {
      this.setState({
        step: 'updatedEmail' // re-load VerifyEmail page
      })
      return;
    } else if (stepJustDone === 'didEmailVerif') {
      this.setState({
        step: 'didEmailVerif'
      })
      return;
    } else if (stepJustDone === 'didTripwire') {
      this.setState({
        step: 'didTripwire'
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
      currCoFreeText: '',
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

  updateCurrCo(currCo, currCoFreeText, callback) {
    this.setState({
      currCo: currCo,
      currCoFreeText: currCoFreeText
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

  updateEmail(userInput, callback) {
    this.setState({
      emailToVerify: userInput
    }, () => {
      if (callback) {
        callback();
      }
    })
  }

  render() {
    const {isGeneralError, step, userCurrency, country, userEduName, eetStatus, schName, schNameFreeText, uniName, uniNameFreeText, currCo, currCoFreeText, currTrainingProvider, emailToVerify, userRole} = this.state;
    const totalSignUpSteps = 4;
    const currCoName = getCompanyDeets(currCo, currCoFreeText, 'name')

    if (isGeneralError === true) {
      <div>
        Oops! Something went wrong. Please try reloading the page.
      </div>
    } else {
      switch (step) {
        case 'did1stSU':
          return (
            <SignUpScreenTemplate {...UserShortSUProps}>
              <CountryShortSU
                step={step}
                currentStep="1"
                totalSteps={totalSignUpSteps}
                updateCountry={this.updateCountry}
                updateStep={this.updateStep}
              />
            </SignUpScreenTemplate>
          );
        case 'didCountry':
          return (
            <SignUpScreenTemplate {...UserShortSUProps}>
              <EduShortSU
                step={step}
                country={country}
                currentStep="2"
                totalSteps={totalSignUpSteps}
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
        case 'didEdu': // This will be the general sign up questions
          return (
            <SignUpScreenTemplate {...UserSU3Props}>
              <ExpertiseSU
                step={step}
                country={country}
                userRole={userRole}
                currentStep="3"
                eetStatus={eetStatus}
                totalSteps={totalSignUpSteps}
                updateStep={this.updateStep}
              />
            </SignUpScreenTemplate>
          );
        case 'didExpertise':
        case 'updatedEmail':
          return (
            <SignUpScreenTemplate {...UserSU6Props(emailToVerify)}>
              <VerifyEmail
                step={step}
                updateStep={this.updateStep}
                emailToVerify={emailToVerify}
              />
            </SignUpScreenTemplate>
          );
        case 'updatingEmail':
          return (
            <React.Fragment>
              <SignUpScreenTemplate {...UserSU5Props}>
                <UpdateEmail
                  updateStep={this.updateStep}
                  updateEmail={this.updateEmail}
                />
              </SignUpScreenTemplate>
            </React.Fragment>
          );
        case 'didEmailVerif':
          return (
            <React.Fragment>
              <SignUpScreenTemplate {...UserSU7Props}>
                <TripwirePage
                  updateStep={this.updateStep}
                  userCurrency={userCurrency}
                />
              </SignUpScreenTemplate>
            </React.Fragment>
          );
        case 'didTripwire':
          return (
            <div>
              Show the dashboard!
            </div>
          );
      }
    }
  }
}

export default TypeformSignUp;
