// Dex last merged this code on 9th sept 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";
import {convertMarkup} from './GeneralFunctions.js';
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

  componentDidMount() {
    const {file, msgId} = this.props
    convertMarkup(file.title, 'fileTitle-'+msgId)
  }

  toggleFlexContainer() {
    const currentState = this.state.isFlexContainerOpen;
    this.setState({ isFlexContainerOpen: !currentState });
  }

  render() {
  const {isFlexContainerOpen} = this.state;
  const {file, error, isLastPic, handleLastPic, msgId} = this.props;
  let fileType = 'other'
/*  if (file.fileType === 'image/png' || file.fileType === 'image/jpeg' || file.fileType === 'image/bmp') {
    fileType = 'img'
  } else if (file.fileType === 'application/pdf') {
    fileType = 'pdf'
  } else if (file.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    fileType = 'xls'
  } else if (file.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    fileType = 'word'
  } else fileType = 'other'*/

    return (
      <React.Fragment>
        <div className="display-file-container">
          <div className="file-name" id={'fileTitle-'+msgId} />
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
              <div className="msg-img-content">
                <a className={error ? "disabled" : null} href={error ? '' : 'www.prospela.com'} target="_blank" rel="noopener noreferrer">
                  {fileType === 'img' && (
                    <img
                      className="msg-img"
                      src={file.imgurl}
                      alt={file.name}
                      onLoad={isLastPic ? () => handleLastPic() : null}
                    />
                  )}
                  {fileType === 'pdf' && (
                    <div>
                      <i className="far fa-file-pdf" />
                      <span className="fileName-text">{file.name}</span>
                    </div>
                  )}
                  {fileType === 'xls' && (
                    <div>
                      <i className="far fa-file-excel" />
                      <span className="fileName-text">{file.name}</span>
                    </div>
                  )}
                  {fileType === 'word' && (
                    <div>
                      <i className="far fa-file-word" />
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
