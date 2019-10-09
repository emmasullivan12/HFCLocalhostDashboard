// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Camera from './Camera.js';
import Photo from './Photo.js';

import "../css/General.css";
import "../css/FileUploadContent.css";
import '../css/CameraUploadContent.css';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class UploadProfPicContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploadDescription: '',
    };
  }

  handleDescriptionChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    const { fileUploadDescription } = this.state;
    const {profPicSrc, isPicSet, userInitial, userRole} = this.props;
    const selectedFiles = true;
    const isEnabled = false;
    return (
      <React.Fragment>
        <div className="modal-title">
          Upload
        </div>
        <form className="fileUploadForm" id="profPicUploadForm">
          <div className="capture">
            <Camera  />
            <input
              type="file"
              id="profPicSelect"
              name="selectedFiles"
              className="inputFile BlankBtn"
              placeholder="Choose a file..."
              onChange={this.handleChange}
              multiple
              minsize={0}
              title=""
            />
            <label htmlFor="profPicSelect">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
              </svg>
              <span>or Choose a file...</span>
            </label>
            <Photo isProfPic='isProfPic' isPicSet={isPicSet} profPicSrc={profPicSrc} userInitial={userInitial} userRole={userRole}/>
            <button type="submit" disabled={!isEnabled} className="Submit-btn uploadPicBtn" id="saveButton">Upload photo</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default UploadProfPicContent;
