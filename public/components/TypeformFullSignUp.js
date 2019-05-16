// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import TypeformFullPage from './TypeformFullPage.js';

// This includes props to be passed to Typeform
const MenteeFullSignUpProps = {
  triggerText: 'Complete Full Sign Up',
  usedFor: 'menteeFullSignUp'
}

const MentorFullSignUpProps = {
  triggerText: 'Complete Your Training',
  usedFor: 'mentorTraining'
}

// Passes Typeform links to full sign up (mentee) or training (mentors)
class TypeformFullSignUp extends Component {
  render() {
    const userRole = this.props.userRole;
    const fname = 'Emma';
    const id = '12345'
    const mentortflink = 'https://prospela.typeform.com/to/miX7CZ?fname='+fname+'&uid='+id;
    const menteetflink = 'https://prospela.typeform.com/to/cOQ1a0?fname='+fname+'&uid='+id;

    if(userRole === 'mentee') {
      return (
        <div>
          {fname && (
            <TypeformFullPage tflink={menteetflink} {...MenteeFullSignUpProps}/>
          )}
        </div>
      );
    } else {
      return (
        <div>
          {fname && (
            <TypeformFullPage tflink={mentortflink} {...MentorFullSignUpProps}/>
          )}
        </div>
      );
    }
  }
}

/*TypeformFullSignUp.propTypes = {
    users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};
*/
export default TypeformFullSignUp;
