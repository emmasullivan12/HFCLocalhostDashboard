// Dex last merged this code on 27th Aug 2019

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
          <Camera  />
          <form className="uploadPhotoForm">
            <Photo  />
            <input
              type="text"
              name="cameraUploadName"
              className="textInputBox inputTitle"
              placeholder="Type picture name..."
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
            />
            <input
              type="text"
              name="cameraUploadDescription"
              className="textInputBox"
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
