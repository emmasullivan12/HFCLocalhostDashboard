// Dex last merged this code on 17th Sept 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import "../css/TypeformSignUp.css";
import CountryShortSU from './CountryShortSU.js';
import SignUpScreenTemplate from './SignUpScreenTemplate.js';
import TypeformEmbedded from './TypeformEmbedded.js';
import MentorU18SUContent from './MentorU18SUContent.js';
import MentorU18Picture from './MentorU18Picture.js';

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

//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const MentorTypeformSignUpProps = {
  subheader: 'This will take about 10 mins & greatly help us match you to students based on your skills, interests, interests and personality … which makes for more successful mentoring!',
  title: 'Set up your profile'
}

const MentorU18SUProps = {
  subheader: 'We have many younger students who typically cannot access real professionals like you within their existing social circles',
  title: 'Want to support under-18 students?',
  fullWidth: true
}

const MentorU18PictureProps = {
  subheader: 'Please make sure you upload a clear photo of you holding a valid piece of government-issued photo ID (e.g. Passport, Drivers Licence).  ',
  title: 'Upload a selfie with your Photo ID',
  fullWidth: true
}

//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const MentorTypeformTrainingProps = {
  subheader: 'This takes ~10 min and is mandatory before we introduce you to students. It will help you feel at home being an E-mentor with Prospela!',
  title: 'Complete your Training',
  fullWidth: true
}

// This includes all content to appear below SignUpScreenTemplate title for the Student Sign Up flow
const MentorTypeformSignUpContent = ({tflink, step}) => (
  <div>
    {step==='4' && (
      <a className="skipText" href="www.prospela.com">
        Short on time? Skip ahead and complete later.
      </a>
    )}
    <div className='progress-circles-container'>
      <div className={step==='1' ? "thisStep" : "nxtStep"}>
        <i className="fas fa-circle" />
      </div>
      <div className={step==='2' ? "thisStep" : "nxtStep"}>
        <i className="fas fa-circle" />
      </div>
      <div className={step==='3' ? "thisStep" : "nxtStep"}>
        <i className="fas fa-circle" />
      </div>
      <div className={step==='4' ? "thisStep" : "nxtStep"}>
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
// Content for Typeform Template being used for Sign Ups
class TypeformSignUp extends Component {
  render() {
    const userRole = 'mentor';
    const step = 'didU18pref';
    const fname = 'Emma';
    const id = '12345';
    const country = 'United States';
    const setLinkedIn = false;
    const mentortflink = 'https://prospela.typeform.com/to/vRxfCm?fname='+fname+'&uid='+id; // actual typeform to be used
    const under18prefTF = 'https://prospela.typeform.com/to/FDxHrf?country='+country+'&fname='+fname+'&uid='+id+'&setlinkedin='+setLinkedIn; // actual typeform to be used
    const mentorTrainingLink = 'https://prospela.typeform.com/to/s5nFr9?fname='+fname+'&uid='+id;
    const menteetflink = 'https://prospela.typeform.com/to/UZtWfo?country='+country+'&fname='+fname+'&uid='+id; // actual typeform to be used

    if(userRole === 'mentee') {
      switch (step) {
        case 1:
          return (
            <SignUpScreenTemplate {...MenteeShortSUProps}>
              <CountryShortSU step={step}/>
            </SignUpScreenTemplate>
          );
        case 2:
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MenteeTypeformSignUpProps}>
                  <MenteeTypeformSignUpContent tflink={menteetflink} step={step}/>
                </SignUpScreenTemplate>
              )}
            </React.Fragment>
          );
      }
    } else {
      switch (step) {
        case 'didEmailVerif':
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
        case 'didSUtf':
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MentorU18SUProps}>
                  <MentorU18SUContent tflink={under18prefTF} step='3'/>
                </SignUpScreenTemplate>
              )}
    	      </React.Fragment>
          );
        case 'didU18tf':
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MentorU18PictureProps}>
                  <MentorU18Picture step='3'/>
                </SignUpScreenTemplate>
              )}
    	      </React.Fragment>
          );
        case 'didU18pref':
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MentorTypeformTrainingProps}>
          	      <MentorTypeformSignUpContent tflink={mentorTrainingLink} step='4'/>
                </SignUpScreenTemplate>
              )}
    	      </React.Fragment>
          );
      }
    }
  }
}

/*TypeformSignUp.propTypes = {
    users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};
*/
export default TypeformSignUp;
