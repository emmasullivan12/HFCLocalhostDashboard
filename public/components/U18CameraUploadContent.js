// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";
import Camera from './Camera.js';
import Photo from './Photo.js';
import '../css/General.css';
import '../css/CameraUploadContent.css';

class U18CameraUploadContent extends Component {

// Add to takePicture function: photo.style.display = 'block';

  render() {
    const isEnabled = false;
    return (
      <React.Fragment>
        <div className="capture">
          <Camera  />
          <form className="uploadPhotoForm">
            <Photo  />
            <button type="submit" disabled={!isEnabled} className="Submit-btn uploadPicBtn" id="saveButton">Upload photo</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default U18CameraUploadContent;
