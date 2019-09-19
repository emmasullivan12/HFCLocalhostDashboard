// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
//import PropTypes from "prop-types";
import TypeformFullPage from './TypeformFullPage.js';

// This includes props to be passed to Typeform
const MenteeTrainingProps = {
  triggerText: 'Complete 5-min Training >>',
  usedFor: 'menteeTrain'
}

// Passes Typeform links to full sign up (mentee) or training (mentors)
class MenteeTraining extends Component {
  render() {
    const fname = 'Emma';
    const id = '12345'
    const nonPartnerSch = true;
    const menteetflink = 'https://prospela.typeform.com/to/GqAe1k?fname='+fname+'&uid='+id;

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic completeMenteeTrain"/>
          <h2 className="landingCTATitle">
            Complete your 5-min Prospela training
          </h2>
          <p className="landingCTADesc">
            The last step before becoming a <strong>&#34;Certified Prospela Mentee&#34;</strong> is completing our short (and sweet) online training. It will help you feel fully equipped to make the most of your new network, incl. learning how to build a professional relationship online, and more.
          </p>
          <TypeformFullPage tflink={menteetflink} {...MenteeTrainingProps}/>
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
export default MenteeTraining;
