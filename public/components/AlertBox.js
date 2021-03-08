// Dex last merged this code on 8th feb 2021

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/AlertBox.css";

// ModalContent provides all of the Content within Modal
const AlertBoxContent = ({
  ariaLabel,
  buttonRef,
  content,
  alertRef,
  onMouseUp,
  onMouseDown,
  onClose,
  successOrFailure,
  onKeyDown
}) => {
  return ReactDOM.createPortal(
    <aside className="modal-overlay" role='dialog' aria-label={ariaLabel} aria-modal="true" tabIndex="-1" onKeyDown={onKeyDown} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <div className={"modal-container alertBox " + (successOrFailure)} ref={alertRef}>
        <div className="modal-header">
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
class AlertBox extends React.Component {
  constructor () {
    super();
    this.state = {
      isOpen: false,
    }
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    // Closes modal if user presses browser back button
    let self = this
    window.addEventListener("popstate", this.onPopState.bind(event, self))

    this.onOpen();
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState)
  }

  onOpen(e) {
    const {changeInitFocus} = this.props;
    this.setState({ isOpen: true }, () => {
      this.closeButtonNode.focus();
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
    const {ariaLabel, children, role, successOrFailure} = this.props;

    return (
      <React.Fragment>
        {isOpen && (
          <AlertBoxContent
            ariaLabel={ariaLabel}
            buttonRef={n => this.closeButtonNode = n}
            alertRef={n => this.alertNode = n}
            content={children}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onClose={this.onClose}
            onKeyDown={this.onKeyDown}
            successOrFailure={successOrFailure}
            role={role}
          />
        )}
      </React.Fragment>
    );
  }
}

export default AlertBox;
