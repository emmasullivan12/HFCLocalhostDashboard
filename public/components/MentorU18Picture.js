// Dex last merged this code on 17th Sept 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";

import * as typeformEmbed from '@typeform/embed';
import TypeformEmbedded from './TypeformEmbedded.js';
import Modal from './Modal.js';
import U18CameraUploadContent from './U18CameraUploadContent.js';

// import "../css/TypeformSignUp.css";
import "../css/General.css";
import "../css/Login.css";

const U18CameraUploadModalProps = {
  ariaLabel: 'Upload a picture',
  triggerText: 'Take Selfie with Photo ID',
  usedFor: 'U18picContainer'
}

class MentorU18Picture extends Component {
  render() {
    const {step} = this.props;

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic completeFullSU"/>
          <h2 className="landingCTATitle">
            Upload a selfie with your Photo ID
          </h2>
          <p className="landingCTADesc">
            Please make sure you upload a clear photo of you holding a valid piece of government-issued photo ID (e.g. Passport, Drivers Licence).
          </p>
          <Modal {...U18CameraUploadModalProps}>
            <U18CameraUploadContent/>
          </Modal>
        </div>
      </section>
    );
  }
}


export default MentorU18Picture;
