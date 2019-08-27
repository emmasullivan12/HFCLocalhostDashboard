// Dex last merged this code on 27th Aug 2019

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/General.css";
import "../css/FileUploadContent.css";

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class FileUploadContent extends Component {
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
    const selectedFiles = true;
    const isEnabled = false;
    return (
      <React.Fragment>
        <div className="modal-title">
          Upload
        </div>
        <form className="fileUploadForm">
          <input
            type="file"
            id="fileSelect"
            name="selectedFiles"
            className="inputFile BlankBtn"
            placeholder="Choose a file..."
            onChange={this.handleChange}
            multiple
            minsize={0}
            title=""
            required
          />
          <label htmlFor="fileSelect">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
            </svg>
            <span>Choose a file...</span>
          </label>
          <input
            type="text"
            name="fileUploadDescription"
            className="textInputBox passTxtBox"
            placeholder="Type your description..."
            value={this.state.fileUploadDescription}
            onChange={this.handleDescriptionChange}
          />
          { selectedFiles && (
            <div className="fileNamesContainer">
              <div className="fileNamesHeader">
                No. Files Uploaded: 4
              </div>
              <div className="fileNames">
                File name.xls
              </div>
              <div className="fileNames">
                File name2.xls
              </div>
              <div className="fileNames">
                File name3.xls
              </div>
              <div className="fileNames">
                ...
              </div>
            </div>
          )}
          <button type="submit" disabled={!isEnabled} className="Submit-btn">
            Upload
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default FileUploadContent;
