// Dex last merged this code on 12th jan 2021

import React, { Component } from "react";

import { NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/emojione.json'
import Modal from './Modal.js';
import ReportModalContent from './ReportModalContent.js';
import "../css/MessageActions.css";

const ReportModalProps = {
  ariaLabel: 'Report message to Prospela',
  triggerText: 'Report',
  usedFor: 'ReportMsg',
  changeInitFocus: true
}

class MessageActions extends Component {
  constructor () {
    super();
    this.state = {
      starClicked: false,
      showMoreActions: false,
      showEmojis: false,
    }
    this.toggleStarClicked = this.toggleStarClicked.bind(this);
    this.toggleMoreActions = this.toggleMoreActions.bind(this);
    this.closeMoreActions = this.closeMoreActions.bind(this);
  }

  onKeyDown = (e) => {
    var key = e.key || e.keyCode
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.closeMoreActions();
    }
  }

  handleEmojiClick = (evt) => {
    const {msgID} = this.props;
    alert(evt.colons + ' clicked');
    /* If ({evt.colons} doesnt exist in message.reactions list for {msgID}) {
         add new reaction to {msgID} i.e. (reaction.name = {evt.colons}, reaction.users = {myUID}, reaction.count = 1)
       } else if (I {myUID} am already on the list of reaction.users for {msgID}) {
           if (reaction.count = 1) {
             delete reaction from list entirely for {msgID}
           } else {
             remove {myUID} from reaction.users and decrease count by 1 for {msgID}
           }
       } else {
         add {myUID} to reaction.users list and increase count by 1 for {msgID}
       }
    */

    this.setState({
      showEmojis: false
    }, () => {
      this.toggleMsgHover();
      document.removeEventListener('mousedown', this.closeMenu);
    })
  }

  toggleEmojis = (e) => {
    e.persist();
    const {showEmojis} = this.state
    const currentState = showEmojis;
    this.setState({
      showEmojis: !currentState
    }, () => {
      if (this.state.showEmojis === true) {
        this.toggleMsgHover(e);
        document.addEventListener('mousedown', this.closeMenu);

        // Check if message is positioned too near the bottom of screen (i.e. won't fit the EmojiPicker box)
        const dropZone = document.getElementById('drop-zone');
        const elOffsetTop = e.target.closest('.block-container').offsetTop;
        const parentOffsetTop = dropZone.offsetTop;
        const parentClientHeight = dropZone.clientHeight;
        const parentScrollTop = dropZone.scrollTop;
        const parentOffsetHeight = dropZone.offsetHeight;
        const emojiPickerHeight = 423; // 423px
        const nearBottomOfDiv = (parentOffsetHeight - parentScrollTop) < emojiPickerHeight;
        const spaceAbove = elOffsetTop - parentScrollTop;
        const spaceBelow = (parentClientHeight + parentScrollTop) - elOffsetTop;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

        // If not on mobile (where diff formatting applies)
        if (screenWidth > 500) {
          // SORT VERTICAL POSITIONING
          // If not enough space below & (if not near the very scroll bottom of the div) has space above
          if ((spaceBelow < emojiPickerHeight) && (!nearBottomOfDiv ? (spaceAbove >= emojiPickerHeight) : true)) {
            // Make EmojiPicker appear above button just clicked but taking as much space below as poss
            document.querySelector('.emojiPickerContainer.messageActions').style.top = "-" + (emojiPickerHeight - spaceBelow) + "px"
          }
        }
      } else {
        this.toggleMsgHover(e);
        document.removeEventListener('mousedown', this.closeMenu);
      }
    })

  }

  closeMenu = (e) => {
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target) && (!this.emojiPicker.closest('.addReaction-container').contains(e.target))) {
      this.toggleMsgHover();
      this.setState({
        showEmojis: false
      }, () => {
        document.removeEventListener('mousedown', this.closeMenu);
      })
    }
  }

  closeOnEsc = (e) => {
    var key = e.key || e.keyCode

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      e.persist();
      this.setState({
        showEmojis: false
      })
      this.toggleMsgHover(e);
      document.removeEventListener('mousedown', this.closeMenu);
      this.addMessageNode.focus()
    } else {
      return;
    }
  }

  // Prevents user being able to scroll on screen behind Modal
  /*toggleScrollLock = () => document.getElementById('drop-zone').classList.toggle('u-lock-scroll');*/

  // Maintains hover formatting on message emojipicker relates to
  toggleMsgHover = (e) => {
    if (e) {
      e.target.closest('.block-container').classList.toggle('keepHover');
    // If relates to remove event listener i.e. where can't use e.persist()
    } else {
      document.querySelector('.block-container.keepHover').classList.toggle('keepHover');
    }
  }

  toggleStarClicked(e) {
    const {starClicked} = this.state
    const currentState = starClicked;
    this.setState({ starClicked: !currentState });
  }

  toggleMoreActions(e) {
    this.moreActions.classList.toggle('active');
  }

  closeMoreActions(e) {
    if (this.moreActions !== null && !this.moreActions.contains(e.target)) {
      this.moreActions.classList.remove('active');
    }
  }

  render() {
    const {starClicked, showMoreActions, showEmojis} = this.state;

    return (
      <React.Fragment>
        <div className="msgActions-container">
        {/*  <button type="button" className="msgActions-btn tooltip" onMouseDown={this.toggleStarClicked}>
            {starClicked ? (
              <React.Fragment>
                <div className="msgAction-icon clicked" id="msgAction-star">
                  <i className="fas fa-star" />
                </div>
                <span className="tooltiptext groups">Unstar message</span>
              </React.Fragment>
              )
            : (
              <React.Fragment>
                <div className="msgAction-icon" id="msgAction-star">
                  <i className="far fa-star" />
                </div>
                <span className="tooltiptext groups">Star message</span>
              </React.Fragment>
            )}
          </button>
          <button type="button" className="msgActions-btn tooltip">
            <div className="msgAction-icon">
              <i className="fas fa-share-alt" />
            </div>
            <span className="tooltiptext last groups">Share post</span>
          </button>*/}
          <div className="addReaction-container">
            <button type="button" className="msgActions-btn tooltip addReaction" onClick={this.toggleEmojis} onKeyDown={this.toggleEmojis} ref={n => this.addMessageNode = n}>
              <div className="msgAction-icon addReaction-icon">
                <i className="hideOnHover far fa-smile" />
                <i className="showOnHover fas fa-laugh" />
              </div>
              <svg width="5px" height="5px" viewBox="0 0 10 10" className="plusSign addEmoji-msgActions">
                <line className="" x1="0" x2="10" y1="5" y2="5" />
                <line className="" x1="5" x2="5" y1="0" y2="10" />
              </svg>
              <span className="tooltiptext last messageActions">Add reaction</span>
            </button>
            {showEmojis && (
              /* The <div> element is just used as a container for EmojiPicker */
              /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
              <div className="emojiPickerContainer messageActions" ref={el => (this.emojiPicker = el)} onKeyDown={this.closeOnEsc}>
                <NimblePicker
                  onSelect={this.handleEmojiClick}
                  data={data}
                  title="Pick your emoji…"
                  emoji="point_up"
                  set="emojione"
                  autoFocus
                />
              </div>
            )}
          </div>
          {/*<button type="button" className="msgActions-btn tooltip moreActions" onMouseDown={this.toggleMoreActions}>
            <div className="msgAction-icon">
              <i className="fas fa-ellipsis-h" />
            </div>
            <span className="tooltiptext last groups">More actions</span>
          </button>
          <div className="moreActionsContainer" ref={el => (this.moreActions = el)} role="button" tabIndex={0} onKeyDown={this.onKeyDown} onClick={this.closeMoreActions}>
            <div className="moreActions-scrollArea">
              <ul className="moreActionsList">
                <li className="moreActionsListItem" >
                  <span className="moreActionsLabel overflow-ellipsis">
                    <Modal {...ReportModalProps} tabIndex="0">
                      <ReportModalContent />
                    </Modal>
                  </span>
                </li>
              </ul>
            </div>
          </div>*/}
        </div>
      </React.Fragment>
    );
  }
}


export default MessageActions;
