// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";

import * as typeformEmbed from '@typeform/embed';

import TypeformFullPage from './TypeformFullPage.js';


const MentorTrainingProps = {
  triggerText: 'Complete 5-min Training >>',
  usedFor: 'mentorTrain'
}

// Passes Typeform links to full sign up (mentee) or training (mentors)
class MentorTraining extends Component {
  render() {
    const fname = 'Emma';
    const id = '12345'
    const mentorTrainingLink = 'https://prospela.typeform.com/to/s5nFr9?fname='+fname+'&uid='+id; // to be updated

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic completeMenteeTrain"/>
          <h2 className="landingCTATitle">
            Complete your 5-min Prospela training
          </h2>
          <p className="landingCTADesc">
            The last step before becoming a <strong>&#34;Certified Prospela E-Mentor&#34;</strong> is completing our short (and sweet) online training. It&#39;s mandatory before we introduce you to students and will help you feel fully equipped in supporting students across the Prospela network, incl. student safeguarding, recognising where mentees might need extra support, and more.
          </p>
          <TypeformFullPage tflink={mentorTrainingLink} {...MentorTrainingProps}/>
        </div>
      </section>
    );
  }
}

export default MentorTraining;
