// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
import Modal from './Modal.js';
import AutoEnrollProgModalContent from './AutoEnrollProgModalContent.js';

import "../css/General.css";

const AutoEnrollModalProps = {
  ariaLabel: 'Join programme from invite',
  triggerText: 'Join',
  usedFor: 'joinProgAuto',
}

class AutoEnrollPrompt extends Component {
  render() {
    const autoEnrollProgName = 'BAME in Games';
    const {source} = this.props
    var progLogoURL = 'https://files-and-media.ams3.digitaloceanspaces.com/progImages/' + source + '.png'
    const nonPartnerSch = false; /// check school email (or prog code if signed up with personal email) for school partnership
    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic openEnvelope"/>
          <div className="groupsAvatarContainer">
            <img className="logoImg" alt="Initiative Logo" src={progLogoURL}/>
          </div>
          <h2 className="landingCTATitle">
            You&#39;ve been invited to join the {autoEnrollProgName} programme
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
