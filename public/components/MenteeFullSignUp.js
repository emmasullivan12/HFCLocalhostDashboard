// Dex last merged this code on 28th Oct 2019 

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
    const id = '12345';
    const hasSetMobNo = true;
    const hasSetSchSubjects = true;
    const hasSetDegree = false;
    const hasSetRole = false;
    const hasSetTrain = false;
    const nonPartnerSch = true;
    const eetStatus = 'sch';
    const menteetflink = 'https://prospela.typeform.com/to/bszCn1?fname='+fname+'&uid='+id+'&hasSetMobNo='+hasSetMobNo+'&eetStatus='+eetStatus+'&hasSetSchSubjects='+hasSetSchSubjects+'&hasSetDegree='+hasSetDegree+'&hasSetRolee='+hasSetRole+'&hasSetTrain='+hasSetTrain;

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic completeFullSU"/>
          <h2 className="landingCTATitle">
            Complete your full sign up
          </h2>
          <p className="landingCTADesc">
            We need to know a little more about your future ambitions and what help you might need to help determine the best mentor matches for you
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
