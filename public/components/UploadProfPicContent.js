// Dex last merged this code on 11th nov 2020

import React, { Component } from "react";
import {cdn, groupImgFolder, usercdn, userAvatarsFolder} from './CDN.js';
import Camera from './Camera.js';
import Photo from './Photo.js';

import "../css/General.css";
import "../css/FileUploadContent.css";
import '../css/CameraUploadContent.css';

// **Overview**
  // **Props**
    // - profPicSrc
      //   type: /path/to/img (without the cdn URL at beginning)
      //   path to any existing profile pictures (if user is changing pic). Is adjusted within this component to add CDN URL etc


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
    const {profPicSrc, isPicSet, userInitial, isMe, picSizeToShow, isCompany} = this.props;
    const selectedFiles = true;
    const isEnabled = false;
    let profPicURL

    // Create the URL
    function createProfPicURL(string, isCompany) {
      if (isCompany) {
        return cdn.concat('/',groupImgFolder,string);
      } else {
        return usercdn.concat('/',userAvatarsFolder,string,'-',picSizeToShow);
      }

    }

    profPicURL = createProfPicURL(profPicSrc, isCompany)

    return (
      <React.Fragment>
        <div className="modal-title">
          Upload{isCompany == true ? ' Company Logo': ''}
        </div>
        <form className="fileUploadForm" id="profPicUploadForm">
          <div className="capture">
            {isCompany != true && (
              <Camera />
            )}
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
              <span>{isCompany == true ? ' Choose a file...': 'or Choose a file...'}</span>
            </label>
            <Photo isProfPic='isProfPic' isPicSet={isPicSet} profPicSrc={profPicURL} userInitial={userInitial} isMe={isMe}/>
            <button type="submit" disabled={!isEnabled} className="Submit-btn uploadPicBtn" id="saveButton">{isCompany == true ? 'Upload Logo': 'Upload photo'}</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default UploadProfPicContent;
