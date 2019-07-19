// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
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
    const currentState = this.state.isFlexContainerOpen;
    this.setState({ isFlexContainerOpen: !currentState });
  }

  render() {
  const {isFlexContainerOpen} = this.state;
  const {file} = this.props;

    return (
      <React.Fragment>
        <div className="display-file-container">
          <div className="file-name">
            {file.title}
          </div>
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
                <img
                  className="msg-img"
                  src={file.imgurl}
                  alt={file.name}
                />
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default DisplayMsgFile;
