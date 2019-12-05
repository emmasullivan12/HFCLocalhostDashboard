// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import "../css/TypeformSignUp.css";
import CountryShortSU from './CountryShortSU.js';
import EduShortSU from './EduShortSU.js';
import SignUpScreenTemplate from './SignUpScreenTemplate.js';
import TypeformEmbedded from './TypeformEmbedded.js';

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
const MenteeTypeformSignUpContent = ({tflink, step}) => (
  <div>
    <div className='progress-circles-container'>
      <div className={step===1 ? "thisStep" : "nxtStep"}>
        <i className="fas fa-circle" />
      </div>
      <div className={step===2 ? "thisStep" : "nxtStep"}>
        <i className="fas fa-circle" />
      </div>
    </div>
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

const MentorTypeformSignUpContent = ({tflink, step}) => (
  <div>
    <div className='progress-circles-container'>
      <div className={step==='1' ? "thisStep" : "nxtStep"}>
        <i className="fas fa-circle" />
      </div>
      <div className={step==='2' ? "thisStep" : "nxtStep"}>
        <i className="fas fa-circle" />
      </div>
    </div>
    <div className='embedded-typeform'>
      <TypeformEmbedded
        tflink={tflink}
      />
    </div>
  </div>
)

class TypeformSignUp extends Component {
  render() {
    const userRole = 'mentee';
    const step = 'didCountry';
    const fname = 'Emma';
    const id = '12345';
    const country = 'United Kingdom';
    const mentortflink = 'https://prospela.typeform.com/to/vRxfCm?fname='+fname+'&uid='+id; // actual typeform to be used
    const menteetflink = 'https://prospela.typeform.com/to/UZtWfo?country='+country+'&fname='+fname+'&uid='+id; // actual typeform to be used

    if(userRole === 'mentee') {
      switch (step) {
        case 'did1stSU':
          return (
            <SignUpScreenTemplate {...MenteeShortSUProps}>
              <CountryShortSU step={step}/>
            </SignUpScreenTemplate>
          );
        case 'didCountry': // School status component goes here
          return (
            <SignUpScreenTemplate {...MenteeShortSUProps}>
              <EduShortSU step={step} country={country}/>
            </SignUpScreenTemplate>
          );
        case 'didEdu':
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MenteeTypeformSignUpProps}>
                  <MenteeTypeformSignUpContent tflink={menteetflink} step={step}/>
                </SignUpScreenTemplate>
              )}
            </React.Fragment>
          );
        case 'didShortSU':
          return (
            <SignUpScreenTemplate {...MenteeShortSUProps}>
              Confirm youre a student input email address goes here
            </SignUpScreenTemplate>
          );
      }
    } else {
      switch (step) {
        case 'did1stSU':
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MentorCountryShortSUProps}>
                  <CountryShortSU step='1'/>
                </SignUpScreenTemplate>
              )}
            </React.Fragment>
          );
        case 'didCountry':
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MentorTypeformSignUpProps}>
                  <MentorTypeformSignUpContent tflink={mentortflink} step='2'/>
                </SignUpScreenTemplate>
              )}
    	      </React.Fragment>
          );
      }
    }
  }
}

export default TypeformSignUp;
