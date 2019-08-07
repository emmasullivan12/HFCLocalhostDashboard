import React, { Component } from "react";
import Camera from './Camera.js';
import Photo from './Photo.js';
import '../css/General.css';
import '../css/CameraUploadContent.css';

class CameraUploadContent extends Component {

  render() {
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
            />
            <input
              type="text"
              name="cameraUploadDescription"
              className="textInputBox"
              placeholder="Type your message..."
            />
            <button type="submit" className="Submit-btn HollowBtn uploadPicBtn" id="saveButton">Upload photo</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CameraUploadContent;
