// Dex last merged this code on 1st Sept 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Modal from './Modal.js';
import U18FileUploadContent from './U18FileUploadContent.js';

import "../css/General.css";
import "../css/Login.css";

const U18FileUploadModalProps = {
  ariaLabel: 'Upload a CV/Resume or URL of your LinkedIn profile)',
  triggerText: 'Upload CV / LinkedIn >>',
  usedFor: 'U18fileContainer',
  changeInitFocus: true
}

class MentorU18Doc extends Component {
  render() {
    const {step} = this.props;

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic uploadCV"/>
          <h2 className="landingCTATitle">
            Upload your CV/Resume or share your LinkedIn profile
          </h2>
          <p className="landingCTADesc">
            To support your Mentor application, please upload a copy of your CV/Resume or your LinkedIn profile URL. We&#39;re so grateful that you&#39;d like to support under-18s!
          </p>
          <Modal {...U18FileUploadModalProps}>
            <U18FileUploadContent/>
          </Modal>
        </div>
      </section>
    );
  }
}


export default MentorU18Doc;
