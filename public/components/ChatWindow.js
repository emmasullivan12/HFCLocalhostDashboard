// Dex last merged this code on 13th dec 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import {getIcon, getChannelAbout, checkDevice, X} from './GeneralFunctions.js';
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
  backBtn: 'x',
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
    this.childRef = React.createRef();
    this.state = {
      isDevice: checkDevice(),
      isFlexContainerOpen: this.props.isGroup ? true : false,
      isLoadingMsgs: false,
      dragover: '',
      newMsgBannerSeen: false,
      newMsgsBelow: true,
      newMsgsAbove: true,
      observerIsOn: false,
      /* dragFiles: '', */
    }
    this.observer;
    this.toggleFlexContainer = this.toggleFlexContainer.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.showNewMsgsNotif = this.showNewMsgsNotif.bind(this);
    this.hideNewMsgsNotif = this.hideNewMsgsNotif.bind(this);
    this.scrollToNewMessage = this.scrollToNewMessage.bind(this);
    /* this.handleFileDrop = this.handleFileDrop.bind(this);*/
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDevice);
    this.handleUnreads();
  }

  componentDidUpdate(prevProps) {
    const {isGroup, chatid} = this.props;
    if (isGroup !== prevProps.isGroup) {
      if (isGroup) {
        this.openFlexContainer()
      } else {
        this.closeFlexContainer()
      }
    }
    this.handleUnreads();

    // If URL has changed i.e. moved channel then set this.state.text back to ''
    if (chatid != prevProps.chatid) {
      // Calls function in PrAddMessage to reset text
      this.childRef.current.resetPrAddMessage();

      // Hide any new message red buttons
      if (this.state.newMsgsBelow == true) {
        console.log("Hiding newmsgsbelow btn")
        this.hideNewMsgsNotif('below')
      }

      if (this.state.newMsgsAbove == true) {
        console.log("Hiding newmsgsabove btn")
        this.hideNewMsgsNotif('above')
      }

    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDevice);
  }

  handleUnreads = () => {
    const {observerIsOn} = this.state;
    const hasUnreads = true

    if (hasUnreads) {
      const newMsgsBanner = document.getElementById('newMsgs')
      //this.observer.disconnect() // This is in live server
      if (!observerIsOn) {
        this.observer = this.createObserver()
        this.observer.observe(newMsgsBanner);
      }
    }
  }

  createObserver = () => {
    let options = {
      threshold: 1
    }

    const {chatid} = this.props;
    const prevchatid = 99999;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {

        if (entry.intersectionRatio > 0) {
          this.setState({
            newMsgBannerSeen: true,
        //    newMsgsBelow: false,
            newMsgsAbove: false,
          }, () => {
            const newMsgsBanner = document.getElementById('newMsgs')
            observer.unobserve(newMsgsBanner);
          })
        }

        // unobserve "new msg" red line if switch window to different chat
        if (chatid != prevchatid) {
          const newMsgsBanner = document.getElementById('newMsgs')
          this.observer.unobserve(newMsgsBanner);
          this.setState({
            observerIsOn: false,
          })
        }

      });
    }, options);

    this.setState({
      observerIsOn: true,
    })
    return observer
  }

  updateDevice = () => {
    this.setState({
      isDevice: checkDevice(),
    })
  }

  scrollToBottom = () => {
    var div = document.getElementById("drop-zone");
    div.scrollTop = div.scrollHeight;
  }

  scrollToNewMessage = () => {
    document.getElementById('newMsgs').scrollIntoView({behavior:"smooth"});  //do this before update unreadstatus as need to calculate the id of new message etc before it's updated to nill - will need to put this below in a function...
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

  handleMoveDown = (e) => {
    if (e.target.tagName != 'svg' && e.target.tagName != 'path') {
      this.scrollToNewMessage();
      this.hideNewMsgsNotif('below', e);
    }
  }

  /*goToNewMsgs = () => {
    alert("go to start of new messages")
  }*/

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

  hideNewMsgsNotif(aboveOrBelow, e) {
    if (e != null) {
      if (e.target.tagName === 'svg' || e.target.tagName === 'path') {
        console.log("x clicked")
      }
    }
    const newMsgLocation = aboveOrBelow === 'below' ? 'newMsgsBelow' : (aboveOrBelow === 'above' ? 'newMsgsAbove' : '')
    this.setState({ [newMsgLocation]: false })
  }

  showNewMsgsNotif(aboveOrBelow) {
    const newMsgLocation = aboveOrBelow === 'below' ? 'newMsgsBelow' : (aboveOrBelow === 'above' ? 'newMsgsAbove' : '')
    this.setState({ [newMsgLocation]: true }, () => {
      if (aboveOrBelow === 'below') {
        const newMsgsBelowBtn = document.getElementById('newMsgsBelowBtn')
        const addMessage = document.getElementById('new-message')
        newMsgsBelowBtn.style.setProperty("bottom", (addMessage.offsetHeight + 5) + "px", "important")
      }
    })
  }

  openFlexContainer() {
    this.setState({ isFlexContainerOpen: true });
  }

  closeFlexContainer() {
    this.setState({ isFlexContainerOpen: false });
  }

  render() {
  const {isLoadingMsgs, isFlexContainerOpen, isDevice, newMsgBannerSeen, newMsgsBelow, newMsgsAbove} = this.state;
  const {flexContent, isGroup, groupName, channelName, channelType, channelAbout, channelAllowed, founders, pms} = this.props;
  const {onScroll} = this;
  const isOffline = false;
  const isVerifiedGroup = true
  const icon = getIcon(channelType)
  const isPBotChat = true //this.props.chatsList.pbotchat
  const about = isGroup ? (
    channelAbout ?
      channelAbout
    : getChannelAbout(channelType, channelAllowed)
    )
    : (
      isPBotChat ?
        'Your 1:1 chat with the Prospela team: ask questions, tell us your thoughts/feedback/suggestions. We\'re all ears!'
      : ''
    )

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
            <div className="page-header chat">
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
                {!isPBotChat && (
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
                )}
                {isPBotChat && (
                  <div className="chat-detail overflow-ellipsis">
                    {about}
                  </div>
                )}
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
            {newMsgsAbove == true && newMsgBannerSeen === false && (
            //  <div className="chatTopBanners small" onClick={this.goToNewMsgs}>
              <div className="chatTopBanners small" id="newMsgsAboveBtn" >
                <div className="separator__text go2NewMsgs textCursor">
                  <i className="fas fa-arrow-up" />
                  <span>More new messages</span>
                  <button type="button" className="close-chatAlert-container" aria-labelledby="Close Flex Container" onClick={(e) => this.hideNewMsgsNotif('above', e)}>
                    <span id="close-modal" className="u-hide-visually">Close</span>
                    <svg className="menu-close-icon chatAlert" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
                  </button>
                </div>
              </div>
            )}
            {newMsgsBelow == true && (
              <div className="chatTopBanners small bottom" id="newMsgsBelowBtn" onClick={this.handleMoveDown}>
                <div className="separator__text go2NewMsgs">
                  <i className="fas fa-arrow-down" />
                  <span>More new messages</span>
                  <button type="button" className="close-chatAlert-container" aria-labelledby="Close Flex Container" onClick={(e) => this.hideNewMsgsNotif('below', e)}>
                    <span id="close-modal" className="u-hide-visually">Close</span>
                    <svg className="menu-close-icon chatAlert" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
                  </button>
                </div>
              </div>
            )}
            <div id="drop-zone" className="messages-panel" ref={this.scrollRef} onScroll={onScroll} onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleFileDrop}>
              <PrMessagesList
                handleLastPic={this.handleLastPic}
                isGroup={isGroup}
                founders={founders}
                pms={pms}
                showNewMsgsNotif={this.showNewMsgsNotif}
                scrollToNewMessage={this.scrollToNewMessage}
                newMsgBannerSeen={newMsgBannerSeen}
              />
            </div>
            <PrAddMessage
              isGroup={isGroup}
              isOffline={isOffline}
              ref={this.childRef}
            />
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
