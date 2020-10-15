// Dex last merged this code on 15th oct 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import ButtonContent from './ButtonContent.js';
import {isIE, isEdge} from './GeneralFunctions.js';

import "../css/Modal.css";

// ModalTrigger is the button that will open the Modal
const FullPageModalTrigger = ({
  buttonFPRef,
  onOpen,
  text,
  usedFor,
  focusOnLoad
}) => (
  <button type="button" className={"ModalOpenBtn ModalOpenBtn-" + usedFor} autoFocus={focusOnLoad} onClick={onOpen} ref={buttonFPRef}>
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
  title,
  usedFor
}) => {
  return ReactDOM.createPortal(
    <aside className="modal-overlay" role="dialog" aria-label={ariaLabel} aria-modal="true" tabIndex="-1" onKeyDown={onKeyDown}>
      <div className={"fullpage-modal-container " + usedFor} id={'fpModal-' + usedFor} ref={modalFPRef} onScroll={handleNavScroll}>
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
        <div className="fpModal-content">
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
    window.history.forward();
  }

  onOpen() {
    const {changeInitFocus} = this.props;
    this.setState({ isFPOpen: true }, () => {
      if (changeInitFocus) {
        return
      } else {
        this.closeButtonFPNode.focus();
      }
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
    let mainNavLinks = Array.prototype.slice.call(document.querySelectorAll(".section-list li a"), 0);
    const mainNavLinksLength = mainNavLinks.length;
    const scrollTop = this.modalFPRef.current.scrollTop;
    const offsetHeight = this.modalFPRef.current.offsetHeight;
    const maxHeight = this.modalFPRef.current.scrollHeight;
    mainNavLinks.forEach((link, index) => {
      const isFirstSection = (index===0 ? true : false);
      const isLastSection = (index===(mainNavLinksLength-1) ? true : false);
      let section = document.querySelector(link.hash);
      if (
        isFirstSection && section.offsetTop > scrollTop ||
        isLastSection && (scrollTop === (maxHeight - offsetHeight)) ||
        (section.offsetTop-6) <= scrollTop && (scrollTop != (maxHeight - offsetHeight)) &&
        ((section.offsetTop-6) + section.offsetHeight) > scrollTop
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    const menu = document.getElementById('articleMenu');
    if (menu != null && (isEdge() || isIE())) {
      const menuoffsetTop = menu.offsetTop;
      if (scrollTop >= menuoffsetTop) {
        menu.classList.add("sticky");
      } else {
        menu.classList.remove("sticky");
      }
    } else return;
  }

  // Prevents user being able to scroll on screen behind Modal
  toggleScrollLock = () => document.querySelector('html').classList.toggle('u-lock-scroll');

  // Close modal using Escape key on keyboard
  onKeyDown = e => {
    var key = e.key || e.keyCode
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.onClose();
    }
  }

  // Close modal by clicking outside of Modal
/*  onClickAway = (e) => {
    if (this.modalFPNode && this.modalFPNode.contains(e.target)) return;
    this.onClose();
  }*/

    render() {
    const {handleNavScroll} = this;
    const {isFPOpen} = this.state;
    const {ariaLabel, backBtn, children, mentorName, title, triggerText, usedFor, role, focusOnLoad} = this.props;
    return (
      <React.Fragment>
        <FullPageModalTrigger
          onOpen={this.onOpen}
          buttonFPRef={n => this.openButtonFPNode = n}
          text={triggerText}
          usedFor={usedFor}
          focusOnLoad={focusOnLoad}
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
