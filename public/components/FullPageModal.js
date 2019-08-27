// Dex last merged this code on 27th Aug 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import ButtonContent from './ButtonContent.js';
import "../css/Modal.css";

// ModalTrigger is the button that will open the Modal
const FullPageModalTrigger = ({
  buttonFPRef,
  onOpen,
  text,
  usedFor
}) => (
  <button type="button" className={"ModalOpenBtn ModalOpenBtn-" + usedFor} onClick={onOpen} ref={buttonFPRef}>
    <ButtonContent usedFor={usedFor} text={text}/>
  </button>
)

// ModalContent provides all of the Content within Modal
const FullPageModalContent = ({
  ariaLabel,
  backBtn,
  buttonFPRef,
  content,
  handleNavScroll,
  mentorName,
  modalFPRef,
  onClose,
  onKeyDown,
  role = 'dialog',
  title,
  usedFor
}) => {
  return ReactDOM.createPortal(
    <aside className="modal-overlay" role={role} aria-label={ariaLabel} aria-modal="true" tabIndex="-1" onKeyDown={onKeyDown}>
      <div className={"fullpage-modal-container " + usedFor} ref={modalFPRef} onScroll={handleNavScroll}>
        <div className="modal-header">
          <button type="button" className={"modal-close fullPage " + (backBtn==='arrow' ? 'bkArrow' : "")} aria-labelledby="Close Modal" onClick={onClose} ref={buttonFPRef}>
            { backBtn==='bk2Pr' && (
              <span id="close-modal">&#60;&#60; Back to Prospela</span>
            )}
            { backBtn==='arrow' && (
              <span id="close-modal"><i className="fas fa-arrow-left"/></span>
            )}
          </button>
        </div>
        <div className="modal-content">
          {content}
        </div>
      </div>
    </aside>,
    document.body
  );
}

// Modal template which handles state i.e. whether is open / closed
class FullPageModal extends React.Component {
  constructor (props) {
    super(props);
    this.modalFPRef = React.createRef();
    this.state = {
      isFPOpen: false
    }
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleNavScroll = this.handleNavScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleNavScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleNavScroll)
  }

  onOpen() {
    this.setState({ isFPOpen: true }, () => {
      this.closeButtonFPNode.focus();
    });
    this.toggleScrollLock();
  }

  onClose() {
    this.setState({ isFPOpen: false });
    this.openButtonFPNode.focus()
    this.toggleScrollLock();
  }

  handleNavScroll = () => {
    const { modalFPRef } = this;
    let mainNavLinks = document.querySelectorAll(".section-list li a");
  //  let mainSections = document.querySelectorAll(".scroll-anchor");
  //  let lastId;
  //  let cur = [];
    const scrollTop = this.modalFPRef.current.scrollTop;
    mainNavLinks.forEach((link, index) => {
      const isFirstSection = (index===0 ? true : false);
      let section = document.querySelector(link.hash);
      if (
        isFirstSection && section.offsetTop > scrollTop ||
        section.offsetTop <= scrollTop &&
        section.offsetTop + section.offsetHeight > scrollTop
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Prevents user being able to scroll on screen behind Modal
  toggleScrollLock = () => document.querySelector('html').classList.toggle('u-lock-scroll');

  // Close modal using Escape key on keyboard
  onKeyDown = ({keyCode}) => keyCode === 27 && this.onClose();

  // Close modal by clicking outside of Modal
/*  onClickAway = (e) => {
    if (this.modalFPNode && this.modalFPNode.contains(e.target)) return;
    this.onClose();
  }*/

    render() {
    const {handleNavScroll} = this;
    const {isFPOpen} = this.state;
    const {ariaLabel, backBtn, children, mentorName, title, triggerText, usedFor, role} = this.props;
    return (
      <React.Fragment>
        <FullPageModalTrigger
          onOpen={this.onOpen}
          buttonFPRef={n => this.openButtonFPNode = n}
          text={triggerText}
          usedFor={usedFor}
        />
        {isFPOpen && (
          <FullPageModalContent
            ariaLabel={ariaLabel}
            backBtn={backBtn}
            buttonFPRef={n => this.closeButtonFPNode = n}
            content={children}
            handleNavScroll={this.handleNavScroll}
            mentorName={mentorName}
            modalFPRef={this.modalFPRef}
            onClose={this.onClose}
            onKeyDown={this.onKeyDown}
            role={role}
            title={title}
            usedFor={usedFor}
          />
        )}
      </React.Fragment>
    );
  }
}

export default FullPageModal;
