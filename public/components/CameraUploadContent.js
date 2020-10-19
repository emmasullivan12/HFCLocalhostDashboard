// Dex last merged this code on 12th oct 2020

import React, { Component } from "react";
import Camera from './Camera.js';
import Photo from './PhotoShare.js';
import '../css/General.css';
import '../css/CameraUploadContent.css';

class CameraUploadContent extends Component {
  constructor(props) {
  super(props);
    this.state = {
      pictureTaken: false,
      cameraUploadDescription: '',
    }
  }
// Add to takePicture function: photo.style.display = 'block';

  handleDescriptionChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

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
            <textarea
              name="cameraUploadDescription"
              className="form-control-std textInputBox"
              form="uploadPhotoForm"
              placeholder="Type your message..."
              value={this.state.cameraUploadDescription}
              onChange={this.handleDescriptionChange}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              maxLength="5000"
            />
            <div className="descriptor-br form">
              {this.state.cameraUploadDescription.length} / 5000 characters
            </div>
            <button type="submit" disabled={!isEnabled} className="Submit-btn uploadPicBtn" id="saveButton">Upload photo</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CameraUploadContent;
