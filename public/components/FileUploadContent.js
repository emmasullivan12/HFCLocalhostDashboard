// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
        <form>
          <input
            type="text"
            name="fileUploadDescription"
            className="fileUploadDescription-Form"
            placeholder="Type your description..."
            value={this.state.fileUploadDescription}
            onChange={this.handleDescriptionChange}
          />
          <button type="submit" className="FileUpload-btn">
            Upload
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default FileUploadContent;
