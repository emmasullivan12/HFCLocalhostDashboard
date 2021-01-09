// Dex last merged this code on 15th sept 2020

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
  /*  let sym = evt.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emojiPic = String.fromCodePoint(...codesArray)

    this.setState((prevState) => {
      return {
        text: prevState.text + emojiPic,
      };
    })*/
    alert('emoji clicked')
    this.setState({
      showEmojis: false
    })
  }

  showEmojis = (e) => {
    this.setState({
      showEmojis: true
    }, () => document.addEventListener('click', this.closeMenu))
  }

  closeMenu = (e) => {
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState({
        showEmojis: false
      }, () => document.removeEventListener('click', this.closeMenu))
    }
  }

  closeOnEsc = (e) => {
    var key = e.key || e.keyCode

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.setState({
        showEmojis: false
      })
      this.addMessageNode.focus()
    } else {
      return;
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
          <button type="button" className="msgActions-btn tooltip addReaction" onClick={this.showEmojis} onKeyDown={this.showEmojis} ref={n => this.addMessageNode = n}>
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
