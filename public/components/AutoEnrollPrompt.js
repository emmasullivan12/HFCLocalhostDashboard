// Dex last merged this code on 18th nov 2020

import React, { Component } from "react";
import {cdn, groupImgFolder} from './CDN.js';
import Modal from './Modal.js';
import AutoEnrollProgModalContent from './AutoEnrollProgModalContent.js';

const AutoEnrollModalProps = {
  ariaLabel: 'Join Group from invite',
  triggerText: 'Join',
  usedFor: 'joinProgAuto',
}

class AutoEnrollPrompt extends Component {
  render() {
    const autoEnrollProgName = 'BAME in Games';
    const {source} = this.props
    var progLogoURL = cdn + '/' + groupImgFolder + '/' + source + '.png'
    const nonPartnerSch = false; /// check school email (or prog code if signed up with personal email) for school partnership
    return (
      <section>
      {/*  <div className="contentBox landingCTA"> */}
        <div className="alignCenter">
          <div className="placeholderPic small openEnvelope"/>
          <div className="logoContainer small">
            <img className="logoImg" alt="Initiative Logo" src={progLogoURL}/>
          </div>
          <h2 className="landingCTATitle">
            You&#39;ve been invited to join the {autoEnrollProgName} Group
          </h2>
          <p className="landingCTADesc">
            Click below to get access
          </p>
          <Modal {...AutoEnrollModalProps}>
            <AutoEnrollProgModalContent autoEnrollProgName={autoEnrollProgName}/>
          </Modal>
        </div>
      </section>
    );
  }
}

export default AutoEnrollPrompt;
