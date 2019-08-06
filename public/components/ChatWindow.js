// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import PrMessagesList from "./PrMessagesList";
import PrAddMessage from "./PrAddMessage";
import Modal from "./Modal";
import FileUploadContent from "./FileUploadContent";
import "../css/ChatWindow.css";
import "../css/General.css";


// FlexContainerContent provides all of the Content within FlexContainer
const FlexContainerContent = ({
  content
}) => {
  return (
    <div className="flex-container-overlay">
      <div className="flex-container-container">
        <div className="flex-container-content">
          {content}
        </div>
      </div>
    </div>
  );
}

/* const FileDropModalProps = {
  ariaLabel: 'Uploading file',
  usedFor: 'attachmentDropContainer',
  dropOpen: true,
}
*/
//To do
// This is a container for all messages in the chat
class ChatWindow extends Component {
  constructor () {
    super();
    this.state = {
      isFlexContainerOpen: false,
      dragover: '',
      /* dragFiles: '', */
    }
    this.toggleFlexContainer = this.toggleFlexContainer.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    /* this.handleFileDrop = this.handleFileDrop.bind(this);*/
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

  /* handleFileDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragover: '', dragFiles: e.dataTransfer.files});
  } */

  toggleFlexContainer() {
    const currentState = this.state.isFlexContainerOpen;
    this.setState({ isFlexContainerOpen: !currentState });
  }

  render() {
  const {isFlexContainerOpen} = this.state;
  const {flexContent} = this.props;
  const isOffline = true;

  /*        {dragFiles != '' && (
              <Modal {...FileDropModalProps}>
                <FileUploadContent selectedFiles={dragFiles} />
              </Modal>
            )}
  */

    return (
      <React.Fragment>
        <div className="chat-container">
          <div className="chat-content-container">
            <div className="chat-header">
              <div className="chat-detail-container">
                <div className="chat-title overflow-ellipsis">
                  Chat name
                </div>
              </div>
              <div className="more-info-container">
                <button type="button" className="more-info-btn" onClick={this.toggleFlexContainer}>
                  {isFlexContainerOpen===false ? (
                    <span className="more-info-btn-txt">See USERID&#39;s Profile &#62;&#62;</span>
                  ) : (
                    <span className="more-info-btn-txt">&#60;&#60; Hide USERID&#39;s Profile</span>
                  )}
                </button>
              </div>
            </div>
            {isOffline && (
              <div className="chatTopBanners">
                <div className="offlineBanner">
                  <div className="bannerMsg">
                    It seems like you&#39;re offline. Messages will be sent when you&#39;re connected again.
                  </div>
                </div>
              </div>
            )}
            <div id="drop-zone" className="messages-panel" onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleFileDrop}>
              <PrMessagesList />
            </div>
            <PrAddMessage />
            <div className={"dragover-pane-overlay dragover-pane-overlay-" +this.state.dragover} >
              <div className="animate">
                <div className='topbottom'/>
                <div className='leftright'/>
              </div>
              <div className="dragover-pane-overlay-info">
                <div className="dragover-pane-overlay-pic">
                  <div className="dragover-pane-overlay-picFile"/>
                </div>
                <div className="dragover-pane-overlay-title">Upload to Chat Name</div>
                <div className="dragover-pane-overlay-subtitle">Drop file here to share</div>
              </div>
            </div>
            <form onSubmit={this.handleFileSelect} encType="multipart/form-data">
              <input
                type="file"
                name="selectedFiles"
                onChange={this.onChange}
                multiple
              />
              <button type="submit">Upload</button>
            </form>
          </div>
          {isFlexContainerOpen && (
            <FlexContainerContent
              content={flexContent}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ChatWindow;
