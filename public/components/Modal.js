// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import ButtonContent from './ButtonContent.js';
import "../css/Modal.css";

// ModalTrigger is the button that will open the Modal
const ModalTrigger = ({
  buttonRef,
  onOpen,
  text,
  usedFor
}) => (
  <button type="button" className={"ModalOpenBtn ModalOpenBtn-" + usedFor} onClick={onOpen} ref={buttonRef}>
    <ButtonContent usedFor={usedFor} text={text}/>
  </button>
)

// ModalContent provides all of the Content within Modal
const ModalContent = ({
  ariaLabel,
  buttonRef,
  content,
  mentorName,
  modalRef,
  onClickAway,
  onClose,
  onKeyDown,
  role = 'dialog',
  title
}) => {
  return ReactDOM.createPortal(
    <aside className="modal-overlay" role={role} aria-label={ariaLabel} aria-modal="true" tabIndex="-1" onKeyDown={onKeyDown} onClick={onClickAway}>
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <div className="modal-title">
            {title}
          </div>
          <button type="button" className="modal-close" aria-labelledby="Close Modal" onClick={onClose} ref={buttonRef}>
            <span id="close-modal" className="u-hide-visually">Close</span>
            <svg className="modal-close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
          </button>
        </div>
        <div className="modal-content">
          {React.Children.map(content, child => React.cloneElement(child, {onClose, onKeyDown}))}
        </div>
      </div>
    </aside>,
    document.body
  );
}

// Modal template which handles state i.e. whether is open / closed
class Modal extends React.Component {
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
    this.openButtonNode.focus()
    this.toggleScrollLock();
  }

  // Prevents user being able to scroll on screen behind Modal
  toggleScrollLock = () => document.querySelector('html').classList.toggle('u-lock-scroll');

  // Close modal using Escape key on keyboard
  onKeyDown = ({keyCode}) => keyCode === 27 && this.onClose();

  // Close modal by clicking outside of Modal
  onClickAway = (e) => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.onClose();
  }

    render() {
    const {isOpen} = this.state;
    const {ariaLabel, children, mentorName, title, triggerText, usedFor, role} = this.props;
    return (
      <React.Fragment>
        <ModalTrigger
          onOpen={this.onOpen}
          buttonRef={n => this.openButtonNode = n}
          text={triggerText}
          usedFor={usedFor}
        />
        {isOpen && (
          <ModalContent
            ariaLabel={ariaLabel}
            buttonRef={n => this.closeButtonNode = n}
            mentorName={mentorName}
            modalRef={n => this.modalNode = n}
            content={children}
            onClickAway={this.onClickAway}
            onClose={this.onClose}
            onKeyDown={this.onKeyDown}
            role={role}
            title={title}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Modal;
