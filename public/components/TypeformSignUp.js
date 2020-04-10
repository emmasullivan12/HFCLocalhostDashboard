// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import "../css/TypeformSignUp.css";
import ConfirmStudent from './ConfirmStudent.js';
import CountryShortSU from './CountryShortSU.js';
import EduShortSU from './EduShortSU.js';
import ProgressCircles from './ProgressCircles.js';
import SignUpScreenTemplate from './SignUpScreenTemplate.js';
import TypeformEmbedded from './TypeformEmbedded.js';
import {lookupUKSchUnis} from './UserDetail.js';
//import VerifyStudentProps from './VerifyStudentProps.js';

function VerifyStudentProps(eetStatus, userEduName) {
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
      return 'EM & DEX TO DECIDE WHAT TO REQUEST FROM JOB/TRAIN/NONE PEOPLE';
  }
}

//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const MenteeShortSUProps = {
  subheader: 'Personalise your Prospela experience',
  title: 'Let\'s get you set up',
  fullWidth: false
}

//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const MenteeTypeformSignUpProps = {
  subheader: 'By understanding where you\'re starting from and where you\'re trying to get to, we\'re better able to support you!',
  title: 'Help us help you',
  fullWidth: true
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
      userEduName: ''
    }
  }

  componentDidMount() {
    const step = 'didShortSU';
    const country = 'GBR';
    const eetStatus = 'sch';
    const schName = '2'; // if from UK then save down sch number, not name
    const schNameFreeText = '';
    const uniName = '75'; // if from UK then save down uni number, not name
    const uniNameFreeText = 'sdfsdfds'; // save down free text i.e. uniName as not

    if (step === 'didShortSU') {
      if (eetStatus === 'sch') {
        if (country === 'GBR') {

          if (schName != '') {
            return Promise.all([lookupUKSchUnis(schName, 'label', eetStatus)]).then(sch => {
              this.setState({
                isLoading: false,
                userEduName: sch[0].label
              })
            });
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
            return Promise.all([lookupUKSchUnis(uniName, 'label', eetStatus)]).then(uni => {
              this.setState({
                isLoading: false,
                userEduName: uni[0].label
              })
            });
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
      }
    }
  }

  render() {
    const {isLoading, userEduName} = this.state;
    const userRole = 'mentee';
    const step = 'didShortSU';
    const totalMenteeSteps = 4;
    const totalMentorSteps = 2;
    const fname = 'Emma';
    const id = '12345';
    const country = 'GBR';
    const eetStatus = 'sch';
    const schName = '2'; // if from UK then save down sch number, not name
    const schNameFreeText = '';
    const uniName = '75'; // if from UK then save down uni number, not name
    const uniNameFreeText = 'sdfsdfsdf'; // save down free text i.e. uniName as not
    const mentortflink = 'https://prospela.typeform.com/to/vRxfCm?fname='+fname+'&uid='+id; // actual typeform to be used
    const menteetflink = 'https://prospela.typeform.com/to/UZtWfo?fname='+fname+'&uid='+id; // actual typeform to be used

    if(userRole === 'mentee') {
      switch (step) {
        case 'did1stSU':
          return (
            <SignUpScreenTemplate {...MenteeShortSUProps}>
              <CountryShortSU step={step} userRole={userRole} currentStep="1" totalMenteeSteps={totalMenteeSteps}/>
            </SignUpScreenTemplate>
          );
        case 'didCountry': // School status component goes here
          return (
            <SignUpScreenTemplate {...MenteeShortSUProps}>
              <EduShortSU step={step} country={country} currentStep="2" totalMenteeSteps={totalMenteeSteps}/>
            </SignUpScreenTemplate>
          );
        case 'didEdu':
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MenteeTypeformSignUpProps}>
                  <MenteeTypeformSignUpContent tflink={menteetflink} step={step} currentStep="3" totalMenteeSteps={totalMenteeSteps}/>
                </SignUpScreenTemplate>
              )}
            </React.Fragment>
          );
        case 'didShortSU':
          return (
            //<SignUpScreenTemplate {...VerifyStudentProps(eetStatus, schName, schNameFreeText, uniName, uniNameFreeText, country)}>
            !isLoading && (
              <SignUpScreenTemplate {...VerifyStudentProps(eetStatus, userEduName)}>
                <ConfirmStudent
                  step={step}
                  currentStep="4"
                  totalMenteeSteps={totalMenteeSteps}
                  schName={schName}
                  schNameFreeText={schNameFreeText}
                  uniName={uniName}
                  uniNameFreeText={uniNameFreeText}
                  eetStatus={eetStatus}
                  country={country}
                  userEduName={userEduName}
                />
              </SignUpScreenTemplate>
            )
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
