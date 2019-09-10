// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import TypeformFullPage from './TypeformFullPage.js';

const MentorFullSignUpProps = {
  triggerText: 'Complete Your Training',
  usedFor: 'mentorTraining'
}

// Passes Typeform links to full sign up (mentee) or training (mentors)
class MentorFullSignUp extends Component {
  render() {
  const fname = 'Emma';
  const id = '12345'
  const mentortflink = 'https://prospela.typeform.com/to/miX7CZ?fname='+fname+'&uid='+id;

    return (
      <div>
        {fname && (
          <TypeformFullPage tflink={mentortflink} {...MentorFullSignUpProps}/>
        )}
      </div>
    );
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
export default MentorFullSignUp;
