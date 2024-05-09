// Last merged this code on 28th mar 2024

import React, { Component } from "react";
import ReactDOM from "react-dom";
import TextParser from './TextParser.js';
import "../css/DisplayMsgFile.css";

// This is a container for all messages in the chat
class DisplayMsgFile extends Component {

  render() {
  const {fileName, fileURL, filetype, imgSubType} = this.props;
  let type = filetype
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
          <div className="msg-img-container">
            <div className="msg-img-content">
              <a href='' target="_blank" rel="noopener noreferrer">
                {fileType === 'img' && (
                  <img
                    className={"msg-img" + (imgSubType == "medIcon" ? " medIcon" : "")}
                    src={fileURL}
                    alt={fileName}
                  />
                )}
                {fileType === 'pdf' && (
                  <div className="fileIcon-container pdf">
                    <i className="far fa-file-pdf" />
                    <span className="fileName-text">{fileName}</span>
                  </div>
                )}
                {fileType === 'xls' && (
                  <div className="fileIcon-container xls">
                    <i className="far fa-file-excel" />
                    <span className="fileName-text">{fileName}</span>
                  </div>
                )}
                {fileType === 'word' && (
                  <div className="fileIcon-container word">
                    <i className="far fa-file-word" />
                    <span className="fileName-text">{fileName}</span>
                  </div>
                )}
                {fileType === 'ppt' && (
                  <div className="fileIcon-container ppt">
                    <i className="far fa-file-powerpoint" />
                    <span className="fileName-text">{fileName}</span>
                  </div>
                )}
                {fileType === 'other' && (
                  <div>
                    <i className="far fa-file-alt" />
                    <span className="fileName-text">{fileName}</span>
                  </div>
                )}
              </a>
            </div>
          </div>
          {fileName && (
            <div className="file-name">
              <TextParser text={fileName}/>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default DisplayMsgFile;
