// Dex last merged this code on 14th mar 2021

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/AlertBox.css";

// ModalContent provides all of the Content within Modal
const AlertBoxContent = ({
  ariaLabel,
  buttonRef,
  content,
  alertRef,
  onClose,
  successOrFailure,
  fadesOut
}) => {
  return (
    <div role='dialog' aria-label={ariaLabel} aria-modal="true" tabIndex="-1" className={"alertBox" + (successOrFailure ? (" " + successOrFailure) : "") + (fadesOut == true ? " fadesOut" : "")} ref={alertRef}>
      <div className="alertBox-content">
        <button type="button" className="alertBox-close" aria-labelledby="Close Alert Box" onClick={onClose} ref={buttonRef}>
          <span id="close-modal" className="u-hide-visually">Close</span>
          <svg className={"modal-close-icon" + (successOrFailure ? (" " + successOrFailure) : "")} viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
        </button>
        {React.Children.map(content, child => React.cloneElement(child, {onClose}))}
      </div>
    </div>
  );
}

// Modal template which handles state i.e. whether is open / closed
class AlertBox extends React.Component {
  constructor () {
    super();
    this.state = {
      isOpen: true,
    }
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.closeButtonNode.focus();
  }

  onClose() {
    this.setState({ isOpen: false });
  }

    render() {
    const {isOpen} = this.state;
    const {ariaLabel, children, role, successOrFailure, fadesOut} = this.props;

    return (
      <React.Fragment>
        {isOpen && (
          <AlertBoxContent
            ariaLabel={ariaLabel}
            buttonRef={n => this.closeButtonNode = n}
            alertRef={n => this.alertNode = n}
            content={children}
            onClose={this.onClose}
            successOrFailure={successOrFailure}
            fadesOut={fadesOut}
            role={role}
          />
        )}
      </React.Fragment>
    );
  }
}

export default AlertBox;
