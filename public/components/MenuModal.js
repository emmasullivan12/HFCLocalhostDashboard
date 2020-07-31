// Dex last merged this code on 27th Aug 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/MenuModal.css";
import "../css/General.css";

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

// ModalContent provides all of the Content within Modal
const MenuContent = ({
  ariaLabel,
  menuButtonRef,
  content,
  menuRef,
  onClickAway,
  onMenuClose,
  onKeyDown,
  role = 'dialog'
}) => {
  return ReactDOM.createPortal(
    <aside className="menuModal-overlay" id="menuModalOverlay" role={role} aria-label={ariaLabel} aria-modal="true" tabIndex="-1" onKeyDown={onKeyDown} onClick={onClickAway}>
      <div className="menuModal-container" ref={menuRef}>
        <button type="button" className="menuModal-close" aria-labelledby="Close Modal" onClick={onMenuClose} ref={menuButtonRef}>
          <span id="close-modal" className="u-hide-visually">Close</span>
        </button>
        <div className="menuModal-scrollArea">
          {React.Children.map(content, child => React.cloneElement(child, {onMenuClose, onKeyDown}))}
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
      isMenuOpen: false
    }
    this.onOpen = this.onOpen.bind(this);
    this.onMenuClose = this.onMenuClose.bind(this);
  }

  onOpen() {
    this.setState({ isMenuOpen: true }, () => {
      this.closeButtonNode.focus();
    });
    this.toggleScrollLock();
  }

  onMenuClose() {
    this.setState({ isMenuOpen: false });
    this.openButtonNode.focus();
    this.toggleScrollLock();
  }

  // Prevents user being able to scroll on screen behind Modal
  toggleScrollLock = () => document.querySelector('html').classList.toggle('u-lock-scroll');

  // Close modal using Escape key on keyboard
  onKeyDown = e => {
    var key = e.key || e.keyCode
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.onMenuClose();
    }
  }

  /* Close modal by clicking on item inside modal
  onClickItem = (e) => {
    if (this.menuNode && this.menuNode.contains(e.target)) {
      this.onMenuClose();
    } else {
      return;
    }
  }
*/
  // Close modal by clicking outside of Modal
  onClickAway = (e) => {
    var menuModalOverlay = document.getElementById('menuModalOverlay');
    if ((e.target) == menuModalOverlay) {
      this.onMenuClose();
    } else {
      return;
    }
//    if (this.meenuNode && this.menuNode.contains(e.target)) return;
//    this.onMenuClose();
  }

    render() {
    const {isMenuOpen} = this.state;
    const {ariaLabel, children, role} = this.props;
    return (
      <React.Fragment>
        <MenuTrigger
          onOpen={this.onOpen}
          menuButtonRef={n => this.openButtonNode = n}
        />
        {isMenuOpen && (
          <MenuContent
            ariaLabel={ariaLabel}
            menuButtonRef={n => this.closeButtonNode = n}
            menuRef={n => this.menuNode = n}
            content={children}
            onClickAway={this.onClickAway}
            onMenuClose={this.onMenuClose}
            onKeyDown={this.onKeyDown}
            role={role}
          />
        )}
      </React.Fragment>
    );
  }
}

export default MenuModal;
