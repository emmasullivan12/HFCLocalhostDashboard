import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import TypeformTemplate from './TypeformTemplate.js';
import TypeformEmbedded from './TypeformEmbedded.js';

//This includes props and title to be passed to TypeformTemplate if Student is signing up
const MenteeTypeformSignUpProps = {
  subheader: 'We will be able to match you with better career advice and insights if we know where you are trying to get to!',
  title: 'Set up your profile'
}

// This includes all content to appear below TypeformTemplate title for the Student Sign Up flow
const MenteeTypeformSignUpContent  = ({tflink}) => (
  <div>
    <div className='embedded-typeform'>
      <TypeformEmbedded
        tflink={tflink}
      />
    </div>
    <button type="button" className='signup-nextstep-btn'>
      Next
    </button>
    <div className='progress-circles'>
      Step 1 of 2 (circles) go here
    </div>
  </div>
)

//This includes props and title to be passed to TypeformTemplate if Student is signing up
const MentorTypeformSignUpProps = {
  subheader: 'This will take about 10 min, but we’ll be better able to match you to students based on your skills, interests, interests and personality … which makes for more successful mentoring!',
  title: 'Set up your profile'
}

// This includes all content to appear below TypeformTemplate title for the Student Sign Up flow
const MentorTypeformSignUpContent = ({tflink}) => (
  <div>
    <div className='embedded-typeform'>
      <TypeformEmbedded
        tflink={tflink}
      />
    </div>
    <button type="button" className='signup-nextstep-btn'>
      Next
    </button>
    <div className='progress-circles'>
      Step 1 of 3 (circles) go here
    </div>
  </div>
)
// Content for Typeform Template being used for Sign Ups
class TypeformSignUp extends Component {
  render() {
    const userRole = this.props.userRole;
    const fname = 'Emma';
    const id = '12345';
    const mentortflink = 'https://prospela.typeform.com/to/miX7CZ?fname='+fname+'&uid='+id;
    const menteetflink = 'https://prospela.typeform.com/to/cOQ1a0?fname='+fname+'&uid='+id;

    if(userRole === 'mentee') {
      return (
        <div>
          {fname && (
            <TypeformTemplate {...MenteeTypeformSignUpProps}>
              <MenteeTypeformSignUpContent tflink={menteetflink}/>
            </TypeformTemplate>
          )}
        </div>
      );
    } else {
      return (
	<div>
          {fname && (
            <TypeformTemplate {...MentorTypeformSignUpProps}>
      	      <MentorTypeformSignUpContent tflink={mentortflink}/>
            </TypeformTemplate>
          )}
	</div>
      );
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
