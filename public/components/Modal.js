// Dex last merged this code on 19th oct 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";
import ButtonContent from './ButtonContent.js';
import "../css/Modal.css";

// ModalTrigger is the button that will open the Modal
const ModalTrigger = ({
  ariaLabel,
  buttonRef,
  onOpen,
  text,
  triggerHasAutoFocus,
  usedFor
}) => (
  <button tabIndex="0" type="button" aria-label={ariaLabel} className={"ModalOpenBtn ModalOpenBtn-" + usedFor} onClick={onOpen} ref={buttonRef} autoFocus={triggerHasAutoFocus}>
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
  onMouseUp,
  onMouseDown,
  onClose,
//  onCloseAsPrevModal,
  onKeyDown,
  title
}) => {
  return ReactDOM.createPortal(
    <aside className="modal-overlay" role='dialog' aria-label={ariaLabel} aria-modal="true" tabIndex="-1" onKeyDown={onKeyDown} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
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
        <div className="modal-content" id="modal-content">
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
      isOpen: false,
  //    itemClicked: ''
    }
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {

    // Closes modal if user presses browser back button
    let self = this
    window.addEventListener("popstate", this.onPopState.bind(event, self))
  /*  window.addEventListener("popstate", function onPopState(e) {
      if (e.state.modal === 'open') {
        self.onClose()
      }
    })*/
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState)
  }

  onOpen(e) {
    const {changeInitFocus} = this.props;
    this.setState({ isOpen: true }, () => {

      // if there is an input within modal content then allow focus to
      // be given to that instead of close button
      if (changeInitFocus) {
        const top = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        document.getElementsByClassName("modal-container")[0].scrollTop = top
      } else {
        this.closeButtonNode.focus();
      }
    });
    this.toggleScrollLock();

    // Need to call it twice because e.state onpopstate refers to the
    // second last state that was pushed. i.e. the latest history state
    // is popped out (taken away from the stack)
    history.pushState({ modal: 'open'}, '')
    history.pushState({ modal: 'open'}, '')
  }

  onClose() {
    this.setState({ isOpen: false });
    if (this.openButtonNode != undefined) {
      this.openButtonNode.focus()
    }
    this.toggleScrollLock();
  }

  onPopState = (e, self) => {
    if (self.state.modal === 'open') {
      e.onClose()
    }
  }

  // Prevents user being able to scroll on screen behind Modal
  toggleScrollLock = () => document.querySelector('html').classList.toggle('u-lock-scroll');

  // Close modal using Escape key on keyboard
  onKeyDown = (e) => {
    var key = e.key || e.keyCode

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.onClose();
    }
  }

  // Ensures if click within modal and end outside of modal does not cloes modal
  onMouseDown = (e) => {
    this.setState({
      itemClicked: e.target
    })
  }

  // Close modal by clicking outside of Modal
  onMouseUp = (e) => {
  //  if (this.modalNode && this.modalNode.contains(this.state.itemClicked)) return;
    if (this.state.itemClicked.classList[0] != 'modal-overlay') return;
    this.onClose();
  }

    render() {
    const {isOpen} = this.state;
    const {ariaLabel, children, mentorName, title, triggerText, triggerHasAutoFocus, usedFor, role} = this.props;
    return (
      <React.Fragment>
        <ModalTrigger
          ariaLabel={ariaLabel}
          onOpen={this.onOpen}
          buttonRef={n => this.openButtonNode = n}
          text={triggerText}
          triggerHasAutoFocus={triggerHasAutoFocus}
          usedFor={usedFor}
        />
        {isOpen && (
          <ModalContent
            ariaLabel={ariaLabel}
            buttonRef={n => this.closeButtonNode = n}
            mentorName={mentorName}
            modalRef={n => this.modalNode = n}
            content={children}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onClose={this.onClose}
          //  onCloseAsPrevModal={this.onCloseAsPrevModal}
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
