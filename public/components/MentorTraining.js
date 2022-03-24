// Dex last merged this code on 24th mar 2022

import React, { Component } from "react";

// Passes Typeform links to full sign up (mentee) or training (mentors)
class MentorTraining extends Component {
  render() {
    const fname = 'Emma';
    const id = '12345'
    const mentorTrainingLink = 'https://prospela.typeform.com/to/snajXQ?fname='+fname+'&uid='+id;

    return (
      <React.Fragment>
        <div className="placeholderPic completeTrain noMarginT"/>
        <h2 className="landingCTATitle marginBottom20 paddingL paddingR">
          Complete your 5-min Prospela training
        </h2>
        <p className="landingCTADesc marginBottom30 paddingL paddingR">
          Our short (and sweet) online training is mandatory before we introduce you to students (under 18 years old) and will help you feel fully equipped in supporting students across the Prospela network!
        </p>
        <a className="button link Submit-btn dispInlineBlock" href={mentorTrainingLink} target="_blank" rel="noopener noreferrer">
          Complete 5-min Training &gt;&gt;
        </a>
      </React.Fragment>
    );
  }
}

export default MentorTraining;
