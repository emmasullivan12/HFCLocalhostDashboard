// Dex last merged this code on 24th sept 2021

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/MenuModal.css";
import "../css/General.css";

// ModalTrigger is the button that will open the Modal
const MenuTrigger = ({
  menuButtonRef,
  onOpen,
  text,
  usedFor,
  isLoggedIn
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
        {isLoggedIn == false ? 'Welcome!' : 'fname'}
      </div>
    </div>
{/*    <div className="userBadgesContainer">
      <div className="trophyContainer">
        <i className="fa fa-trophy" />
      </div>
      <div className="badgeName">
        Beginner
      </div>
    </div>*/}
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
}) => {
  return ReactDOM.createPortal(
    <aside className="menuModal-overlay" id="menuModalOverlay" role='dialog' aria-label={ariaLabel} aria-modal="true" tabIndex="-1" onKeyDown={onKeyDown} onClick={onClickAway}>
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

  componentDidMount() {

    // Closes modal if user presses browser back button
    let self = this
    window.addEventListener("popstate", this.onPopState.bind(event, self))
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState)
    if (this.props.manualCloseModalNotTrigger) {
      if (this.state.isOpen == true) {
        this.onClose()
      }
    }
  }

  onOpen() {
    const {changeInitFocus} = this.props;
    this.setState({ isMenuOpen: true }, () => {
      if (changeInitFocus) {
        const top = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        document.getElementsByClassName("menuModal-container")[0].scrollTop = top
      } else {
        this.closeButtonNode.focus();
      }
    });
    this.toggleScrollLock();

    // Need to call it twice because e.state onpopstate refers to the
    // second last state that was pushed. i.e. the latest history state
    // is popped out (taken away from the stack)
    history.pushState({ menuModal: 'open'}, '')
    history.pushState({ menuModal: 'open'}, '')
  }

  onMenuClose() {
    history.pushState({ menuModal: 'closed'}, '')
    history.pushState({ menuModal: 'closed'}, '')
    this.setState({ isMenuOpen: false });
    if (this.openButtonNode != undefined) {
      this.openButtonNode.focus();
    }
    this.toggleScrollLock();
  }

  onPopState = (e, self) => {
    if (self.state && self.state.menuModal === 'open' && this.state.isMenuOpen == true) {
      e.onMenuClose()
    }
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
    const {ariaLabel, children, role, isLoggedIn} = this.props;
    return (
      <React.Fragment>
        <MenuTrigger
          onOpen={this.onOpen}
          menuButtonRef={n => this.openButtonNode = n}
          isLoggedIn={isLoggedIn}
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
