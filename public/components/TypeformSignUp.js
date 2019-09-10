// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import "../css/TypeformSignUp.css";
import MenteeShortSU from './MenteeShortSU.js';
import SignUpScreenTemplate from './SignUpScreenTemplate.js';
import TypeformEmbedded from './TypeformEmbedded.js';


//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const MenteeShortSUProps = {
  subheader: 'Personalise your Prospela expertience',
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



//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const MentorTypeformSignUpProps = {
  subheader: 'This will help us better match you to students based on your skills, interests, interests and personality … which makes for more successful mentoring!',
  title: 'Set up your profile'
}

//This includes props and title to be passed to SignUpScreenTemplate if Student is signing up
const MentorTypeformTrainingProps = {
  subheader: 'This will take about 10 min and will help you feel at home being an E-mentor with Prospela. Training is mandatory before we introduce you with your student matches.',
  title: 'Complete your Training'
}

// This includes all content to appear below SignUpScreenTemplate title for the Student Sign Up flow
const MentorTypeformSignUpContent = ({tflink, step}) => (
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
    {step===2 && (
      <a className="skipText" href="www.prospela.com">
        Short on time? Skip ahead and complete later.
      </a>
    )}
  </div>
)
// Content for Typeform Template being used for Sign Ups
class TypeformSignUp extends Component {
  render() {
    const userRole = 'mentee';
    const step = 2;
    const fname = 'Emma';
    const id = '12345';
    const country = 'needs to be linked to data user submits within MenteeShortSU';
    const mentortflink = step===1 ? 'https://prospela.typeform.com/to/miX7CZ?fname='+fname+'&uid='+id : 'https://prospela.typeform.com/to/s5nFr9?fname='+fname+'&uid='+id;
    const menteetflink = 'https://prospela.typeform.com/to/UZtWfo?country='+country+'&fname='+fname+'&uid='+id; // actual typeform to be used

    if(userRole === 'mentee') {
      switch (step) {
        case 1:
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MenteeShortSUProps}>
                  <MenteeShortSU step={step}/>
                </SignUpScreenTemplate>
              )}
            </React.Fragment>
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
        case 1:
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MentorTypeformSignUpProps}>
          	      <MentorTypeformSignUpContent tflink={mentortflink} step={step}/>
                </SignUpScreenTemplate>
              )}
    	      </React.Fragment>
          );
        case 2:
          return (
            <React.Fragment>
              {fname && (
                <SignUpScreenTemplate {...MentorTypeformTrainingProps}>
          	      <MentorTypeformSignUpContent tflink={mentortflink} step={step}/>
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
