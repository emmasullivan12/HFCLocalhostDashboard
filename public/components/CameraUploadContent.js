// Dex last merged this code on 7th sept 2020

import React, { Component } from "react";
import Camera from './Camera.js';
import Photo from './Photo.js';
import '../css/General.css';
import '../css/CameraUploadContent.css';

class CameraUploadContent extends Component {
  constructor(props) {
  super(props);
    this.state = {
      pictureTaken: false
    }
  }
// Add to takePicture function: photo.style.display = 'block';

  canBeSubmitted() {
    const {pictureTaken} = this.state
    if (pictureTaken === true) {
      return true
    } else return false
  }

  render() {
    const isEnabled = this.canBeSubmitted();
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
