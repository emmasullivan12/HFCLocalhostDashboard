// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/MenuModal.css";

// ModalTrigger is the button that will open the Modal
const MenuTrigger = ({
  menuButtonRef,
  onOpen,
  text,
  usedFor
}) => (
  <button type="button" onClick={onOpen} ref={menuButtonRef} className="userMenu">
    <div className="userContainer">
      <div className="presenceContainer">
        <i className="fa fa-circle" />
      </div>
      <span className="down-arrow-icon">
        <i className="fa fa-angle-down" />
      </span>
      <div className="userName overflow-ellipsis">
        fname
      </div>
    </div>
    <div className="userBadgesContainer">
      <div className="trophyContainer">
        <i className="fa fa-trophy" />
      </div>
      <div className="badgeName">
        Beginner
      </div>
    </div>
  </button>
);

// <button type="button" className={"ModalOpenBtn ModalOpenBtn-" + usedFor} onClick={onOpen} ref={buttonRef}>{text}</button>;

// ModalContent provides all of the Content within Modal
const MenuContent = ({
  ariaLabel,
  menuButtonRef,
  content,
  menuRef,
  onClickAway,
  onClose,
  onKeyDown,
  role = 'dialog'
}) => {
  return ReactDOM.createPortal(
    <aside className="menuModal-overlay" role={role} aria-label={ariaLabel} aria-modal="true" tabIndex="-1" onKeyDown={onKeyDown} onClick={onClickAway}>
      <div className="menuModal-container" ref={menuRef}>
        <button type="button" className="menuModal-close" aria-labelledby="Close Modal" onClick={onClose} ref={menuButtonRef}>
          <span id="close-modal" className="u-hide-visually">Close</span>
        </button>
        <div className="menuModal-scrollArea">
          {content}
        </div>
      </div>
    </aside>,
    document.body
  );
}

// Modal template which handles state i.e. whether is open / closed
class MenuModal extends React.Component {
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
        <MenuTrigger
          onOpen={this.onOpen}
          menuButtonRef={n => this.openButtonNode = n}
        />
        {isOpen && (
          <MenuContent
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

export default MenuModal;
