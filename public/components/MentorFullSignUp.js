// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
import * as typeformEmbed from '@typeform/embed';

import TypeformFullPage from './TypeformFullPage.js';

const MentorFullSignUpProps = {
  triggerText: 'Complete Full Sign Up >>',
  usedFor: 'mentorFullSignUp'
}

class MentorFullSignUp extends Component {
  render() {
    const fname = 'Emma';
    const id = '12345';
    const country = 'United States';
    const hasSetMobNo = true;
    const mentorFulltflink = 'https://prospela.typeform.com/to/FDxHrf?country='+country+'&fname='+fname+'&uid='+id+'&hasSetMobNo='+hasSetMobNo; // actual typeform to be used

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic completeFullSUMentor"/>
          <h2 className="landingCTATitle">
            Complete your full sign up
          </h2>
          <p className="landingCTADesc">
            We need to know a few more quick details, including whether you want to support under-18 students
          </p>
          <TypeformFullPage tflink={mentorFulltflink} {...MentorFullSignUpProps}/>
        </div>
      </section>
    );
  }
}

export default MentorFullSignUp;
