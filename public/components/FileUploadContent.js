// Dex last merged this code on 30th sept 2020

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {Check} from './GeneralFunctions.js';
import "../css/General.css";
import "../css/FileUploadContent.css";

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class FileUploadContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploadDescription: '',
      dragover: '',
    };
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
  }

  handleDescriptionChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit = () => {
    const {onClose} = this.props
    onClose()
  }

  handleDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragover: 'dragover'});
  }

  handleDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragover: ''});
  }

  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // changes the mouse cursor to a "+" to show user it's a copy action and active
    this.setState({dragover: 'dragover'});
  }

  handleFileDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragover: ''});
  }

  render() {
    const { fileUploadDescription } = this.state;
    const selectedFiles = true;
    const isEnabled = true;
    return (
      <React.Fragment>
        <div className="modal-title">
          Upload a file
        </div>
        <form className="fileUploadForm" id="fileUploadForm" onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleFileDrop}>
          <div className="fileUploadPlaceholder">
            <div className="fileUploadDottedLine">
              <div className="fileUploadPlaceholder-title">Drag and drop Files here</div>
              <input
                type="file"
                id="fileSelect"
                name="selectedFiles"
                className="inputFile BlankBtn"
                placeholder="Choose a file..."
                onChange={this.handleChange}
                minsize={0}
                title=""
                required
              />
              <label htmlFor="fileSelect" className="fileUploadPlaceholder-subtitle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                  <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
                </svg>
                <span>or Browse Files...</span>
              </label>
              <div className={"dragover-pane-overlay dragover-pane-overlay-" +this.state.dragover} >
                <div className="animate">
                  <div className='topbottom'/>
                  <div className='leftright'/>
                </div>
                <div className="dragover-pane-overlay-info">
                  <div className="dragover-pane-overlay-pic">
                    <div className="dragover-pane-overlay-picFile"/>
                  </div>
                  <div className="dragover-pane-overlay-title">Upload File</div>
                  <div className="dragover-pane-overlay-subtitle">Drop file here to share</div>
                </div>
              </div>
            </div>
          </div>
          <textarea
            name="fileUploadDescription"
            className="form-control-std"
            form="fileUploadForm"
            value={this.state.fileUploadDescription}
            onChange={this.handleDescriptionChange}
            placeholder="Type your description..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            maxLength="2000"
            autoFocus
          />
          <div className="descriptor-br form">
            {this.state.fileUploadDescription.length} / 2000 characters
          </div>
          { selectedFiles && (
            <div className="fileNamesContainer">
              <div className="fileNamesHeader">
                <span
                  className="tickFilesUploaded"
                >
                  <Check />
                </span>
                Files Uploaded: 4
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
          <button type="submit" disabled={!isEnabled} onClick={this.handleSubmit} className="Submit-btn">
            Upload
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default FileUploadContent;
