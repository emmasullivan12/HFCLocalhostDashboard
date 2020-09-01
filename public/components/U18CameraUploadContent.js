// Dex last merged this code on 1st Sept 2020

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
          <canvas id="canvas" hidden />
          <form className="upload#PhotoForm" id="idPicUploadForm" >
            <Photo  />
            <input
              type="file"
              accept="image/png, image/jpeg, image/bmp"
              id="idPicSelect"
              name="selectedFiles"
              className="inputFile BlankBtn"
              placeholder="Choose a file..."
              onChange={this.handleChange}
              minsize={0}
              title=""
            />
            <label htmlFor="idPicSelect">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
              </svg>
              <span>or Choose a file...</span>
            </label>
            <button type="submit" disabled={!isEnabled} className="Submit-btn uploadPicBtn" id="saveButton">Upload photo</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default U18CameraUploadContent;
