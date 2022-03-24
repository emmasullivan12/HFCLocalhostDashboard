// Dex last merged this code on 30th june 2021

import React, { Component } from "react";

import FullPageModal from './FullPageModal.js';
import Form from './Form.js';
import "../css/MentorFullSUContent.css";

const MentorU18FullSUProps = {
  ariaLabel: 'Speak to Under 18s | Complete your Full Mentor Application',
  triggerText: 'Yes!',
//  focusOnLoad: true,
  usedFor: 'mentorFullSU-u18',
  backBtn: 'arrow',
  changeInitFocus: true,
}
const MentorOver18FullSUProps = {
  ariaLabel: 'Complete your Full Mentor Application',
  triggerText: 'Not right now',
  usedFor: 'mentorFullSU',
  backBtn: 'arrow',
  changeInitFocus: true,
}

class MentorFullSignUp extends Component {
  render() {
    const {questionsO18, questionsU18} = this.props;

    return (
      <React.Fragment>
        <div className="modal-preTitle">
          Can you support under-18 year olds?
        </div>
        <div className="modal-subtitle-colour bold">
          Younger students typically cannot access real professionals like you within their existing social circles.
        </div>
        <div className="modalDesc alignCenter marginTop marginBottom safeguarding">
          For safeguarding purposes the following will be required:
          <div className="div-li-container">
            <div className="div-li"><span className="divLi img cvIcon"/><span className="divLi text">Your CV/Resume (or LinkedIn profile URL)</span></div>
            <div className="div-li"><span className="divLi img uploadSelfieID"/><span className="divLi text">A photo of you holding your photo ID</span></div>
            <div className="div-li"><span className="divLi img tickIcon"/><span className="divLi text">Prospela to conduct online background checks (which may include the review of sex offender registries, social media etc.)</span></div>
          </div>
          <div className="bold modalCTAText">
            By selecting &quot;Yes&quot; you provide us your consent to perform the aforementioned background checks as part of your application.
          </div>
        </div>
        <FullPageModal {...MentorU18FullSUProps}>
          <Form
            questions={questionsU18}
            usedFor="mentorFullSU-u18"
            renderComponentsInitialState='ukUnisList'
            saveOnSubmit='u18'
            formTitle="Complete your full mentor application"
          />
        </FullPageModal>
        <FullPageModal {...MentorOver18FullSUProps}>
          <Form
            questions={questionsO18}
            usedFor="mentorFullSU"
            renderComponentsInitialState='ukUnisList'
            saveOnSubmit='u18'
            formTitle="Complete your full mentor application"
          />
        </FullPageModal>
      </React.Fragment>
    );
  }
}

export default MentorFullSignUp;
