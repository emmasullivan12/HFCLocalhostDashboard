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
  triggerText: 'Take Picture',
  usedFor: 'U18picContainer'
}

class MentorU18Picture extends Component {
  render() {
    const {step} = this.props;

    return (
      <React.Fragment>
        <div>
          <div className='progress-circles-container'>
            <div className={step==='1' ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
            <div className={step==='2' ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
            <div className={step==='3' ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
            <div className={step==='4' ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
          </div>
          <form method="POST" action="/U18PhotoID" className="U18PhotoForm">
            <Modal {...U18CameraUploadModalProps}>
              <U18CameraUploadContent/>
            </Modal>
          </form>
        </div>
      </React.Fragment>
    );
  }
}


export default MentorU18Picture;
