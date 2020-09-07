// Dex last merged this code on 7th sept 2020

import React, { Component } from "react";
import Camera from './Camera.js';
import Photo from './Photo.js';
import '../css/General.css';
import '../css/CameraUploadContent.css';

class CameraUploadContent extends Component {

// Add to takePicture function: photo.style.display = 'block';

  render() {
    const isEnabled = false;
    return (
      <React.Fragment>
        <div className="capture">
          <Camera />
          <form className="uploadPhotoForm" id="uploadPhotoForm">
            <Photo />
            <input
              type="text"
              name="cameraUploadName"
              className="form-control-std"
              placeholder="Type picture name..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              autoFocus
            />
            <textarea
              name="cameraUploadDescription"
              className="form-control-std textInputBox"
              form="uploadPhotoForm"
              placeholder="Type your message..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
            />
            <button type="submit" disabled={!isEnabled} className="Submit-btn uploadPicBtn" id="saveButton">Upload photo</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CameraUploadContent;
