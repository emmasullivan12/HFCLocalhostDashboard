// Dex last merged this code on 6th nov 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import {getIcon, checkDevice, X} from './GeneralFunctions.js';
import PrMessagesList from "./PrMessagesList";
import PrAddMessage from "./PrAddMessage";
import MenuNav from './MenuNav.js';
import FullPageModal from './FullPageModal.js';
import Modal from "./Modal";
import FileUploadContent from "./FileUploadContent";
import VerifiedBadge from "./VerifiedBadge";
import "../css/ChatWindow.css";
import "../css/General.css";

const FlexContainerProps = {
  usedFor: 'openFlexContainer',
  backBtn: 'arrow',
  animation: ' slideUp'
}

// FlexContainerContent provides all of the Content within FlexContainer
const FlexContainerContent = ({
  content,
  isGroup,
  isDevice,
  toggleFlexContainer
}) => {
  return (
    <div className={"flex-container-overlay" + (isGroup == true ? ' group' : '') + (isDevice == true ? ' isDevice' : '')}>
      <div className="flex-container-container">
        {isGroup && !isDevice && (
          <button type="button" className="close-flex-container" aria-labelledby="Close Flex Container" onClick={toggleFlexContainer}>
            <span id="close-modal" className="u-hide-visually">Close</span>
            <svg className="menu-close-icon flexContainer" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
          </button>
        )}
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
  constructor (props) {
    super(props);
    this.scrollRef = React.createRef();
    this.state = {
      isDevice: checkDevice(),
      isFlexContainerOpen: this.props.isGroup ? true : false,
      isLoadingMsgs: false,
      dragover: '',
      /* dragFiles: '', */
    }
    this.toggleFlexContainer = this.toggleFlexContainer.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    /* this.handleFileDrop = this.handleFileDrop.bind(this);*/
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDevice);
  }

  componentDidUpdate(prevProps) {
    const {isGroup} = this.props;
    if (isGroup !== prevProps.isGroup) {
      if (isGroup) {
        this.openFlexContainer()
      } else {
        this.closeFlexContainer()
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDevice);
  }

  updateDevice = () => {
    console.log("triggered")
    this.setState({
      isDevice: checkDevice(),
    })
  }

  scrollToBottom = () => {
    var div = document.getElementById("drop-zone");
    div.scrollTop = div.scrollHeight;
  }

  onScroll = () => {
    const { scrollRef } = this;
    const scrollTop = this.scrollRef.current.scrollTop;
    if (scrollTop < 250) {
      this.setState({isLoadingMsgs: true});
    }
  };

  handleLastPic = () => {
    this.scrollToBottom();
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

  openFlexContainer() {
    this.setState({ isFlexContainerOpen: open });
  }

  closeFlexContainer() {
    this.setState({ isFlexContainerOpen: false });
  }

  render() {
  const {isLoadingMsgs, isFlexContainerOpen, isDevice} = this.state;
  const {flexContent, isGroup, groupName, channelName, channelType, channelAbout, founders, pms} = this.props;
  const {onScroll} = this;
  const isOffline = false;
  const isVerifiedGroup = true
  const icon = getIcon(channelType)
  const about = channelAbout ? channelAbout : ''

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
              <MenuNav />
              <div className="page-detail-container overflow-ellipsis">
                <div className="chat-title-container overflow-ellipsis">
                  <span className="chat-title">
                    {groupName}
                  </span>
                  {isVerifiedGroup && (
                    <VerifiedBadge />
                  )}
                  {!isDevice && (
                    <React.Fragment>
                      <span className="channel-title noBold">
                        - {channelName}
                      </span>
                      <span className="chat-title-icon">
                        {icon}
                      </span>
                    </React.Fragment>
                  )}
                </div>
                <div className="chat-detail overflow-ellipsis">
                  {isDevice && (
                    <React.Fragment>
                      <span className="chat-title-icon mobile">
                        {icon}
                      </span>
                      <span className="channel-title mobile bold">
                        {channelName}
                      </span>
                    </React.Fragment>
                  )}
                  {isDevice ? '- ' : ''}{about}
                </div>
              </div>
              {isGroup && !isDevice && (
                <div className="more-info-container">
                  <div className="chatInfoContainer" onClick={this.toggleFlexContainer}>
                    <i className="fas fa-info-circle"/>
                  </div>
                </div>
              )}
              {isGroup && isDevice && (
                <FullPageModal {...FlexContainerProps} isDevice={isDevice}>
                  <FlexContainerContent
                    content={flexContent}
                    isGroup={isGroup}
                    isDevice={isDevice}
                  />
                </FullPageModal>
              )}
            </div>
            {isOffline && (
              <div className="chatTopBanners priorityBanner">
                <div className="banner offlineBanner">
                  <div className="bannerMsg">
                    It seems like you&#39;re offline. Please try sending your messages again when you&#39;re reconnected.
                  </div>
                </div>
              </div>
            )}
            {isLoadingMsgs && (
              <div className="chatTopBanners">
                <div className="banner loadingMsgsBanner">
                  <div className="bannerMsg">
                    Loading messages...
                  </div>
                </div>
              </div>
            )}
            <div id="drop-zone" className="messages-panel" ref={this.scrollRef} onScroll={onScroll} onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleFileDrop}>
              <PrMessagesList handleLastPic={this.handleLastPic} isGroup={isGroup} founders={founders} pms={pms}/>
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
          {isFlexContainerOpen && !isDevice && (
            <FlexContainerContent
              content={flexContent}
              isGroup={isGroup}
              toggleFlexContainer={this.toggleFlexContainer}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ChatWindow;
