// Dex last merged this code on 23rd feb 2022

import React, { Component } from "react";
import ReactDOM from "react-dom";
import {usercdn, userImgsFolder} from './CDN.js';
import TextParser from './TextParser.js';
import "../css/DisplayMsgFile.css";
import "../css/General.css";

// This is a container for all messages in the chat
class DisplayMsgFile extends Component {
  constructor () {
    super();
    this.state = {
      isFlexContainerOpen: true
    }
    this.toggleFlexContainer = this.toggleFlexContainer.bind(this);
  }

  toggleFlexContainer() {
    const {isFlexContainerOpen} = this.state
    const currentState = isFlexContainerOpen;
    this.setState({ isFlexContainerOpen: !currentState });
  }

  render() {
  const {isFlexContainerOpen} = this.state;
  const {file, error, isLastPic, handleLastPic, msgId, isQA} = this.props;
  let type = file.fileType ? file.fileType : file.type
  let fileType
  if (type === 'image/png' || type === 'image/jpeg' || type === 'image/bmp') {
    fileType = 'img'
  } else if (type === 'application/pdf') {
    fileType = 'pdf'
  } else if (type === 'application/vnd.ms-excel' || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' || type === 'application/vnd.ms-excel.sheet.macroEnabled.12' || type === 'application/vnd.ms-excel.template.macroEnabled.12' || type === 'application/vnd.ms-excel.addin.macroEnabled.12' || type === 'application/vnd.ms-excel.sheet.binary.macroEnabled.12') {
    fileType = 'xls'
  } else if (type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' || type === 'application/vnd.ms-word.document.macroEnabled.12' || type === 'application/vnd.ms-word.template.macroEnabled.12') {
    fileType = 'word'
  } else if (type === 'application/mspowerpoint' || type === 'application/ms-powerpoint' || type === 'application/mspowerpnt' || type === 'application/vnd-mspowerpoint' || type === 'application/powerpoint' || type === 'application/x-powerpoint' || type === 'application/vnd.ms-powerpoint' || type === 'application/vnd.ms-powerpoint.presentation.macroEnabled.12' || type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
    fileType = 'ppt'
  } else fileType = 'other'

    return (
      <React.Fragment>
        <div className="display-file-container">
          {file.title && (
            <div className="file-name">
              <TextParser text={file.title}/>
            </div>
          )}
          <button type="button" onClick={this.toggleFlexContainer} className="file-title-container button-unstyled">
            <span className="file-title">
              {file.name}
            </span>
            <span className="down-arrow-img-icon">
              <i className="fas fa-caret-down" />
            </span>
          </button>
          {isFlexContainerOpen && (
            <div className="msg-img-container">
              <div className={"msg-img-content" + isQA == true ? " floatUnset" : ""}>
                <a className={error ? "disabled" : null} href='' target="_blank" rel="noopener noreferrer">
                  {fileType === 'img' && (
                    <img
                      className="msg-img"
                      src={usercdn + '/' + userImgsFolder + file.imgurl + '-270'} // 270px width size
                      alt={file.name}
                      onLoad={isLastPic ? () => handleLastPic() : null}
                    />
                  )}
                  {fileType === 'pdf' && (
                    <div className="fileIcon-container pdf">
                      <i className="far fa-file-pdf" />
                      <span className="fileName-text">{file.name}</span>
                    </div>
                  )}
                  {fileType === 'xls' && (
                    <div className="fileIcon-container xls">
                      <i className="far fa-file-excel" />
                      <span className="fileName-text">{file.name}</span>
                    </div>
                  )}
                  {fileType === 'word' && (
                    <div className="fileIcon-container word">
                      <i className="far fa-file-word" />
                      <span className="fileName-text">{file.name}</span>
                    </div>
                  )}
                  {fileType === 'ppt' && (
                    <div className="fileIcon-container ppt">
                      <i className="far fa-file-powerpoint" />
                      <span className="fileName-text">{file.name}</span>
                    </div>
                  )}
                  {fileType === 'other' && (
                    <div>
                      <i className="far fa-file-alt" />
                      <span className="fileName-text">{file.name}</span>
                    </div>
                  )}
                  {error && (
                    <div className="msg-img-overlay" />
                  )}
                </a>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default DisplayMsgFile;
