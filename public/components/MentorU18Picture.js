// Dex last merged this code on 15th Sept 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Modal from './Modal.js';
import U18CameraUploadContent from './U18CameraUploadContent.js';

import "../css/General.css";
import "../css/Login.css";

const U18CameraUploadModalProps = {
  ariaLabel: 'Upload a picture',
  triggerText: 'Take Selfie with Photo ID >>',
  usedFor: 'U18picContainer'
}

class MentorU18Picture extends Component {
  render() {
    const {step} = this.props;

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic uploadSelfieID"/>
          <h2 className="landingCTATitle">
            Upload a selfie with your Photo ID
          </h2>
          <p className="landingCTADesc">
            To verify your identify, please upload a clear photo of yourself <strong>holding</strong> your valid government-issued photo ID (e.g. Passport, Drivers Licence). NOTE: Your photo ID must be legible otherwise your selfie will be rejected. We&#39;re so grateful that you&#39;d like to support under-18s!
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
