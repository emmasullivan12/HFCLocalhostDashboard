// Dex last merged this code on 29th mar 2022

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
      <React.Fragment>
        <div className="placeholderPic completeTrain noMarginT"/>
        <h2 className="landingCTATitle marginBottom20 paddingL paddingR">
          Complete your 5-min Prospela training
        </h2>
        <p className="landingCTADesc marginBottom30 paddingL paddingR">
          The last step before becoming a <strong>&#34;Certified Prospela Mentee&#34;</strong> is completing our short (and sweet) online training. It will help you feel fully equipped to make the most of your new network, incl. learning how to build a professional relationship online, and more.
        </p>
        <a className="button link Submit-btn" href={menteetflink} target="_blank" rel="noopener noreferrer">
          Complete 5-min Training &gt;&gt;
        </a>
      </React.Fragment>
    );
  }
}

export default MenteeTraining;
