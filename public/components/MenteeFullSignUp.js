// Dex last merged this code on 10th August 2019

import React, { Component } from "react";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import TypeformFullPage from './TypeformFullPage.js';

// This includes props to be passed to Typeform
const MenteeFullSignUpProps = {
  triggerText: 'Complete Full Sign Up >>',
  usedFor: 'menteeFullSignUp'
}


// Passes Typeform links to full sign up (mentee) or training (mentors)
class MenteeFullSignUp extends Component {
  render() {
    const fname = 'Emma';
    const id = '12345'
    const nonPartnerSch = true;
    const didTraining = false;
    const menteetflink = 'https://prospela.typeform.com/to/cOQ1a0?fname='+fname+'&uid='+id;

    return (
      <section>
        <div className="landingCTABtnContainer">
          {nonPartnerSch && (
            <button type="button" className="Submit-btn landingCTA hollow">
              Invite a teacher
            </button>
          )}
        </div>
        <div className="contentBox landingCTA">
          <div className="placeholderPic completeFullSU"/>
          <h2 className="landingCTATitle">
            Complete your full sign up to join this programme
          </h2>
          <p className="landingCTADesc">
            We need to know more about what help you need to determine the best mentor matches for you
          </p>
          <TypeformFullPage tflink={menteetflink} {...MenteeFullSignUpProps}/>
        </div>
      </section>
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
export default MenteeFullSignUp;
