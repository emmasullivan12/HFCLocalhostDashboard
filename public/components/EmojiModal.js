import React, { Component } from "react";
import ReactDOM from "react-dom";
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/emojione.json'
import "../css/EmojiModal.css";

// ModalTrigger is the button that will open the Modal
const EmojiTrigger = ({
  menuButtonRef,
  onOpen
}) => (
  <button type="button" className="emojiContainer" onClick={onOpen}>
    <i className="far fa-smile" />
  </button>
);

// <button type="button" className={"ModalOpenBtn ModalOpenBtn-" + usedFor} onClick={onOpen} ref={buttonRef}>{text}</button>;

// ModalContent provides all of the Content within Modal
class EmojiContent extends React.Component {

  handleEmojiClick = (evt) => {
    console.log(evt.unified)
    let sym = evt.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emojiPic = String.fromCodePoint(...codesArray)
    this.setState((prevState) => {
      return {text: prevState.text + emojiPic};
    })
  }

  render() {
    const {ariaLabel, menuButtonRef, content, menuRef, onClickAway, onClose, onKeyDown, role = 'dialog'} = this.props;
    return ReactDOM.createPortal(
      <aside className="menuModal-overlay" role={role} aria-label={ariaLabel} aria-modal="true" tabIndex="-1" onKeyDown={onKeyDown} onClick={onClickAway}>
        <div className="emojiModal-container" ref={menuRef}>
          <NimblePicker
            onSelect={this.handleEmojiClick}
            data={data}
            title="Pick your emoji…"
            emoji="point_up"
            set="emojione"
          />
          <button type="button" className="emojiModal-close" aria-labelledby="Close Modal" onClick={onClose} ref={menuButtonRef}>
            <span id="close-modal" className="u-hide-visually">Close</span>
          </button>
        </div>
      </aside>,
      document.body
    );
  }
}


// Modal template which handles state i.e. whether is open / closed
class EmojiModal extends React.Component {
  constructor () {
    super();
    this.state = {
      isOpen: false
    }
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onOpen() {
    this.setState({ isOpen: true }, () => {
      this.closeButtonNode.focus();
    });
    this.toggleScrollLock();
  }

  onClose() {
    this.setState({ isOpen: false });
    this.openButtonNode.focus();
    this.toggleScrollLock();
  }

  // Prevents user being able to scroll on screen behind Modal
  toggleScrollLock = () => document.querySelector('html').classList.toggle('u-lock-scroll');

  // Close modal using Escape key on keyboard
  onKeyDown = ({keyCode}) => keyCode === 27 && this.onClose();

  // Close modal by clicking outside of Modal
  onClickAway = (e) => {
    if (this.menuNode && this.menuNode.contains(e.target)) return;
    this.onClose();
  }

    render() {
    const {isOpen} = this.state;
    const {ariaLabel, children, role} = this.props;
    return (
      <React.Fragment>
        <EmojiTrigger
          onOpen={this.onOpen}
          menuButtonRef={n => this.openButtonNode = n}
        />
        {isOpen && (
          <EmojiContent
            ariaLabel={ariaLabel}
            menuButtonRef={n => this.closeButtonNode = n}
            menuRef={n => this.menuNode = n}
            content={children}
            onClickAway={this.onClickAway}
            onClose={this.onClose}
            onKeyDown={this.onKeyDown}
            role={role}
          />
        )}
      </React.Fragment>
    );
  }
}

export default EmojiModal;
