// Dex last merged this code on 10th Aug 2019

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
    return (
      <React.Fragment>
        <div className="modal-title">
          Upload a file
        </div>
        <form className="fileUploadForm">
          <input
            type="text"
            name="fileUploadDescription"
            className="textInputBox passTxtBox"
            placeholder="Type your description..."
            value={this.state.fileUploadDescription}
            onChange={this.handleDescriptionChange}
          />
          <button type="button" className="Submit-btn BlankBtn">
            Choose Files
          </button>
          <button type="submit" className="Submit-btn">
            Upload
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default FileUploadContent;
