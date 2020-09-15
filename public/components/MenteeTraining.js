// Dex last merged this code on 16th Aug 2020

import React, { Component } from "react";
//import { connect } from "react-redux";
//import PropTypes from "prop-types";


// Passes Typeform links to full sign up (mentee) or training (mentors)
class MenteeTraining extends Component {
  render() {
    const fname = 'Emma';
    const id = '12345'
    const is18plus = 1;
  //  const nonPartnerSch = true;
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
          <a className="button link Submit-btn" href={menteetflink} target="_blank" rel="noopener noreferrer">
            Complete 5-min Training &gt;&gt;
          </a>
          {is18plus == 1 && (
            <button type="button" className="Submit-btn BlankBtn Grey skipCTA">
              Skip for now
            </button>
          )}
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
