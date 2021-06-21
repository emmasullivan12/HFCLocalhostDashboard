// Dex last merged this code on 26th june 2021

import React, { Component } from "react";
import ReactDOM from "react-dom";

import {getIcon, getChannelAbout, checkDevice, X} from './GeneralFunctions.js';
import Avatar from './Avatar.js';
import PrMessagesList from "./PrMessagesList";
import PrAddMessage from "./PrAddMessage";
import MenuNav from './MenuNav.js';
import FullPageModal from './FullPageModal.js';
import Modal from "./Modal";
import FileUploadContent from "./FileUploadContent";
import UserBadge from './UserBadge.js';
import UserName from './UserName.js';
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
  //    ukUnisList: '',
  //    ukUnisListLoaded: false,
    //  prevIndexOfLatest: '',
      /* dragFiles: '', */
    }
    this.observer;
//    this.headerObserver;
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
  //  this.mounted = true;
    window.addEventListener("resize", this.updateDevice);
    this.handleUnreads();

//    this.renderComponents('UKUnis','ukUnisList') // grab unis
  //  this.formatDateHeaders();

    // Turn on IntersectionObservers for dateheaders
  //  const container = document.getElementById('drop-zone');
  //  this.headerObserver = this.observeHeaders(container);

  /*  document.addEventListener('sticky-change', e => {
      const {prevIndexOfLatest} = this.state;

      // Update sticking header title.
      const [header, stuck] = [e.detail.target, e.detail.stuck];
      const parentNode = header.parentNode;
      var dateHeaders = parentNode.getElementsByClassName('dateHeader')

      // Add "isPinned" status to latest dateheader
      header.classList.toggle('isPinned', stuck);
      header.classList.add('shadow');

      // Find index of current header within array of all dateHeaders
      const indexOfLatest = Array.prototype.indexOf.call(dateHeaders, header);
      const userScrollingDown = prevIndexOfLatest != '' && (indexOfLatest >= prevIndexOfLatest)

      // Remove all dateHeader "isPinned" and "shadow" status except current and previous (as otherwise previous was disappearing too soon)
      Array.prototype.forEach.call(dateHeaders, (dateHeader, index) => {

      //  const indexOfLatestDateHeader = (dateHeader == header) ? index : 0
      //  if ((index < indexOfLatestDateHeader - 1))  {
        if (userScrollingDown) {

          // Remove shadow of earlier headers
          if (index < (indexOfLatest - 1)) {
            dateHeader.classList.remove('shadow');
          }

        // If scrollup, Add shadow of earlier headers
        } else if (index == (indexOfLatest - 1) || (index == indexOfLatest)) {
          dateHeader.classList.add('shadow');
        // If scrollup, Remove shadow of headers below
        } else if (index > (indexOfLatest + 1)) {
          dateHeader.classList.remove('shadow');
        }

      });

      this.setState({
        prevIndexOfLatest: indexOfLatest
      });

    //  }
  });*/
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
        this.hideNewMsgsNotif('below')
      }

      if (this.state.newMsgsAbove == true) {
        this.hideNewMsgsNotif('above')
      }

    }
  }

  componentWillUnmount() {
  //  this.mounted = false;
    window.removeEventListener("resize", this.updateDevice);

    // Unobserve all headerObserver elements
/*    if (this.headerObserver) {
      this.headerObserver.disconnect();
    }*/
  }

  /*renderComponents = (fileToRender, componentUpdatesState, error) => {
    import(`./${fileToRender}.js`)
      .then(component => {
        if(this.mounted) {
          console.log("gets here")
          this.setState({
            [componentUpdatesState]: component.default,
            [componentUpdatesState+'Loaded']: true,
          }, () => {
            console.log("UNI LIST LOADED!!!!!!!!!!")
            console.log(this.state.ukUnisList)
          })
        }
      })
      .catch(err => {
        if(this.mounted) {
          console.log("error loading edu")
          console.log(err)
        }
      })
  }*/

/*  grabSchOrUni = (schOrUni, schUniNum) => {
    const {ukUnisList, ukUnisListLoaded} = this.state;
    console.log("schUniNum: "+schUniNum)

    // Removed sch so doesnt show user school if eetstatus is school

    if (schOrUni == 'uni') {
      let uni;
      uni = ukUnisList && ukUnisList.filter(uni => {
        return uni.value == schUniNum;
      })
      const uniName = uni[0].label;
      return uniName;
    }
  }*/

  handleUnreads = () => {
    const {observerIsOn} = this.state;
    const hasUnreads = true

    if (hasUnreads) {
      const newMsgsBanner = document.getElementById('newMsgs')
      //this.observer.disconnect() // This is in live server
      if (!observerIsOn) {
        this.observer = this.createNewMsgBannerObserver()
        this.observer.observe(newMsgsBanner);
      }
    }
  }

  createNewMsgBannerObserver = () => {
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

  /**
   * Notifies when elements that have the class `sticky` begin to stick or not.
   * Note: these should be children of the `container` element.
   */
  //notifyWhenStickyHeadersChange = (container) => {
    //this.observeHeaders(container);
  //  this.observeFooters(container);
  //}

  /**
   * Dispatches a `sticky-event` custom event on the element.
   * @param {boolean} stuck
   * @param {!Element} target Target element of event.
   */
/*  fire = (stuck, target) => {
    const evt = new CustomEvent('sticky-change', {detail: {stuck, target}});
    document.dispatchEvent(evt);
  }*/

  /**
   * Sets up an intersection observer to notify when elements with the class
   * `.sticky_sentinel--top` become visible/invisible at the top of the container.
   */
/*  observeHeaders = (container) => {
    let options = {
      threshold: 1,
      root: container
    }

    const headerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const targetInfo = entry.boundingClientRect;
        const stickyTarget = entry.target.nextElementSibling; // Sentinel top must always be directly next to the dateheader
        const rootBoundsInfo = entry.rootBounds;

        if (targetInfo.bottom < rootBoundsInfo.top) {
          this.fire(true, stickyTarget);
        }

        if ((targetInfo.bottom >= rootBoundsInfo.top) && (targetInfo.bottom < rootBoundsInfo.bottom)) {
          this.fire(false, stickyTarget);
        }
      });
    }, options);

    // Add the bottom sentinels to each section and attach an observer.
    const sentinels = document.querySelectorAll(".sticky_sentinel--top");
    console.log("connecting observer")
    sentinels.forEach(el => headerObserver.observe(el));
  }*/

  /**
   * Sets up an intersection observer to notify when elements with the class
   * `.sticky_sentinel--bottom` become visible/invisible at the botton of the
   * container.
   */
/*  observeFooters = (container) => {
    let options = {
      // rootMargin: '16px',
      // Get callback slightly before element is 100% visible/invisible.
      threshold: 1,
      root: container
    }
    const footerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const targetInfo = entry.boundingClientRect;
      /*  var span = document.getElementsByClassName('button')[4], // one of the "button" spans
          div = span.parentNode, // get the span's parent div
          ele,  // variable to hold the element we are looking for
          temp; // temp var for the loop

        while ((div = div.previousSibling) !== null) {  // Loop through all the previous divs
            temp = div.firstChild;  // get the div's children
            if (temp && temp.className === 'elementToGet') { // does it's 1st child have the class?
                ele = temp;  // we found it!
                break;
            }
        }
*/
  /*      let parentNode = entry.target.parentNode;
        let temp, ele
        while ((parentNode = parentNode.previousSibling) !== null) {
          temp = parentNode.firstChild;
          if (temp && temp.classList.contains('dateHeader')) {
            ele = temp;
            break;
          }
        }
        //const stickyTarget = entry.target.nextElementSibling.nextElementSibling;
        const stickyTarget = ele;
        console.log(stickyTarget)
        const rootBoundsInfo = entry.rootBounds;
        const ratio = entry.intersectionRatio;

        if (targetInfo.bottom > rootBoundsInfo.top && ratio === 1) {
          this.fire(true, stickyTarget);
        }

        if (targetInfo.top < rootBoundsInfo.top && targetInfo.bottom < rootBoundsInfo.bottom) {
              console.log("offscreen")
          this.fire(false, stickyTarget);
        }
      });
    }, options);

    // Add the bottom sentinels to each section and attach an observer.
    const sentinels = document.querySelectorAll("sticky_sentinel--bottom");
    sentinels.forEach(el => footerObserver.observe(el));
  }
*/
/*  formatDateHeaders = () => {
    const dateHeaders = document.querySelectorAll(".block-container.dateHeader")
    const container = document.getElementById("drop-zone");

    let options = {
      threshold: 0,
      root: container
    }
*/
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
  //  const scrollTop = this.scrollRef.current.scrollTop;
    /*if (scrollTop < 250) {
      this.setState({isLoadingMsgs: true});
    }*/

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
  let feedbackDone;
  const feedbackDoneMentee = true
  const feedbackDoneMentor = false
  const userRole = 'mentee';
  if (userRole == 'mentee') {
    feedbackDone = feedbackDoneMentee
  } else if (userRole == 'mentor') {
    feedbackDone = feedbackDoneMentor
  }
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
  //  const isGroooop = false;
    const prRelMgr = '1'
    const prRelMgrList = [
      {value: '1', uid: '12345', fname: 'Penny', lname: 'Gee'},
      {value: '2', uid: '12346', fname: 'Dexter', lname: 'Boyce'},
      {value: '3', uid: '12347', fname: 'Emma', lname: 'Sullivan'},
    ]
    const relMgrToShow = prRelMgrList
      .filter(prMod => prRelMgr.includes(prMod.value))

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
              {isGroup != true && !isDevice && (
                <div className="relMgr-container">
                  <div className="title">Your Relationship Manager</div>
                  <div className="group-detail-item bright">
                    <Avatar userID={relMgrToShow[0].uid} userName={relMgrToShow[0].fname} isGroupFlex smallIdle picSize={40}/>
                    <UserName userUID={relMgrToShow[0].uid} fname={relMgrToShow[0].fname} lname={relMgrToShow[0].lname} smallIdle/>
                    <UserBadge badgeType='isPrTeam' />
                  </div>
                </div>
              )}
              {isGroup == true && !isDevice && (
                <div className="more-info-container">
                  <div className="chatInfoContainer" onClick={this.toggleFlexContainer}>
                    <i className="fas fa-info-circle"/>
                  </div>
                </div>
              )}
              {isGroup == true && isDevice && (
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
            {!feedbackDone && (
              <div className="chatTopBanners priorityBanner">
                <div className="banner offlineBanner">
                  <div className="bannerMsg">
                    You haven&#39;t completed your chat feedback yet. Click the button in your most recent message!
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
              //  grabSchOrUni={this.grabSchOrUni}
              //  ukUnisListLoaded={ukUnisListLoaded}
              />
            </div>
            <PrAddMessage
              isGroup={isGroup}
              isOffline={isOffline}
              incompleteFeedback={!feedbackDone}
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
            <form id="chatWindow-fileUpload" onSubmit={this.handleFileSelect} encType="multipart/form-data">
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
