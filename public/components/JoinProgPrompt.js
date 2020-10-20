// Dex last merged this code on 12th oct 2020

import React, { Component } from "react";
import Modal from './Modal.js';
import JoinProgrammeModalContent from './JoinProgrammeModalContent.js';

import "../css/General.css";

const JoinProgrammeModalProps = {
  ariaLabel: 'Join a live Programme',
  triggerText: 'Join a Programme',
  usedFor: 'joinProgLrg',
  changeInitFocus: true
}

class JoinProgPrompt extends Component {
  render() {
    const {userRole} = this.props;
    const nonPartnerInst = true; /// check school email (or prog code if signed up with personal email) for school partnership
    return (
      <section>
        <div className="landingCTABtnContainer">
        {/*  {nonPartnerInst && (
            <button type="button" className="Submit-btn landingCTA hollow">
              Invite {userRole === 'mentee' ? 'a teacher' : 'your company\'s CSR Lead'}
            </button>
          )}*/}
          <Modal {...JoinProgrammeModalProps}>
            <JoinProgrammeModalContent userRole={userRole}/>
          </Modal>
        </div>
        <div className="contentBox landingCTA">
          <div className="placeholderPic mentorMatches"/>
          <h2 className="landingCTATitle">
            Join a live group{userRole === 'mentee' ? ' to see your mentor matches!' : '!'}
          </h2>
          <p className="landingCTADesc">
            It looks like you aren&#39;t part of any live programmes yet. {userRole === 'mentee' ? 'Get a programme code or invite link from your teacher or Prospela Partner to get access to personalised mentoring' : 'Get a programme code or invite link from your Employer to increase your company\'s collective impact'}
          </p>
        {/*  {nonPartnerInst && userRole === 'mentee' && (
            <div className="neutralText alignCenter">
              Don&#39;t have a code? Click to get your school to pay ;)
            </div>
          )}
          {nonPartnerInst && userRole === 'mentor' && (
            <div className="neutralText alignCenter">
              Don&#39;t have a code? Click to invite your company&#39;s Social Impact Lead
            </div>
          )} */}
        </div>
      </section>
    );
  }
}

export default JoinProgPrompt;
