// Dex last merged this code on 19th oct 2020

import React, { Component } from "react";
import "../css/FileUploadContent.css";
import '../css/General.css';
import {LoadingSpinner, Check, isURL} from './GeneralFunctions.js';

class U18FileUploadContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isGeneralError: false,
      generalErrorMessage: '',
      isSubmitting: false,
      uploadedFile: [{name: 'file1'},{name: 'file2'}],
      profProfileURL: '',
      urlInputIsValid: false,
      dragover: '',
    };
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
  }

  handleURLChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.checkProfUrl()
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // FILE DROP ACTIVITY
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

  checkProfUrl() {
    const {profProfileURL} = this.state;

    if (isURL(profProfileURL) === false) {
      this.setState({
        urlInputIsValid: false,
      });
    } else {
      this.setState({
        urlInputIsValid: true,
      });
    }
  }

  canBeSubmitted() {
    const {urlInputIsValid, uploadedFile} = this.state
    if ((urlInputIsValid === true && uploadedFile.length == 0) || (uploadedFile.length > 0 && !urlInputIsValid)) {
      return true
    } else {
      return false
    }
  }

  render() {
    const { uploadedFile, url, generalErrorMessage, isGeneralError, isSubmitting, urlInputIsValid } = this.state;
    const isEnabled = this.canBeSubmitted()
    return (
      <React.Fragment>
        <div className="capture">
          <div onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleFileDrop}>
            <div className="placeholderPic uploadCV"/>
            <h2 className="landingCTATitle marginBottom20 paddingL paddingR">
              Upload your CV/Resume or LinkedIn URL
            </h2>
            <p className="landingCTADesc marginBottom20 paddingL paddingR">
              To mentor under-18s, please upload a copy of your CV/Resume or your LinkedIn profile URL.
            </p>
            <form className="fileUploadForm paddingL paddingR" id="fileUploadForm" encType="multipart/form-data">
              <label htmlFor="profProfileURL" className="descriptor alignLeft">
                Link to your <strong>LinkedIn (or equivalent) professional profile</strong>
              </label>
              <input
                type="url"
                name="profProfileURL"
                id="profProfileURL"
              //  onBlur={this.onBlur}
                value={this.state.profProfileURL}
                onChange={this.handleURLChange}
                className="form-control-std verifyForm"
                placeholder="https://...."
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
                maxLength="200"
                autoFocus
              />
              <div className="orText">
                OR
              </div>
              <div className="fileUploadPlaceholder">
                <div className="fileUploadDottedLine">
                  <div className="fileUploadPlaceholder-title">Drag and drop CV here</div>
                  <input
                    type="file"
                    id="fileSelect"
                    name="selectedFiles"
                    className="inputFile BlankBtn"
                    placeholder="Upload your CV..."
                    onChange={this.handleChange}
                    minsize={0}
                    title=""
                  />
                  <label htmlFor="fileSelect" className="fileUploadPlaceholder-subtitle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                      <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
                    </svg>
                    <span>or Browse Files...</span>
                  </label>
                  <div className="fileTypeAllowed">
                    Word or PDF only
                  </div>
                  <div className={"dragover-pane-overlay dragover-pane-overlay-" +this.state.dragover} >
                    <div className="animate">
                      <div className='topbottom'/>
                      <div className='leftright'/>
                    </div>
                    <div className="dragover-pane-overlay-info">
                      <div className="dragover-pane-overlay-pic">
                        <div className="dragover-pane-overlay-picFile"/>
                      </div>
                      <div className="dragover-pane-overlay-title">Upload CV</div>
                      <div className="dragover-pane-overlay-subtitle">Drop file here to share</div>
                    </div>
                  </div>
                </div>
              </div>
              {urlInputIsValid === true && uploadedFile.length > 0 && (
                <div className="redText">
                  We only need either your CV/Resume OR LinkedIn URL, not both =)
                </div>
              )}
              <div className="fileNamesContainer">
                <div className="fileNamesHeader">
                  <span
                    className="tickFilesUploaded"
                  >
                    <Check />
                  </span>
                  Files Uploaded: {uploadedFile.length}
                </div>
                <div className="fileNames">
                  {uploadedFile[0].name}
                </div>
                <div className="fileNames">
                  {uploadedFile[1].name}
                </div>
              </div>
              <button type="submit" disabled={!isEnabled} className="Submit-btn" id="saveButton">
                {isSubmitting === true && (
                  <LoadingSpinner />
                )}
                {isSubmitting != true && (
                  <span>Upload</span>
                )}
              </button>
              {generalErrorMessage && (
                <div className="login-error-msg"> {generalErrorMessage} </div>
              )}
              {isGeneralError && (
                <div className="login-error-msg">Oops! Something went wrong. Please try again.</div>
              )}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default U18FileUploadContent;
