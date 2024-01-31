// Dex last merged this code on 31st jan 2024

import React, { Component } from "react";
import ReactDOM from "react-dom";
import ButtonContent from './ButtonContent.js';
import "../css/Modal.css";



// ModalTrigger is the button that will open the Modal
const ModalTrigger = ({
  ariaLabel,
  buttonRef,
  clickHandler,
  customTriggerClassName,
  otherFormatting,
  text,
  triggerHasAutoFocus,
  usedFor
}) => (
  <button tabIndex="0" type="button" aria-label={ariaLabel} className={"ModalOpenBtn ModalOpenBtn-" + usedFor + (customTriggerClassName ? customTriggerClassName : "")} onClick={clickHandler} ref={buttonRef} autoFocus={triggerHasAutoFocus}>
    <ButtonContent usedFor={usedFor} text={text} otherFormatting={otherFormatting}/>
  </button>
)

// ModalContent provides all of the Content within Modal
const ModalContent = ({
  ariaLabel,
  buttonRef,
  content,
  modalRef,
  onMouseUp,
  onMouseDown,
  onClose,
//  onCloseAsPrevModal,
  onKeyDown,
  removeOverflowY,
  title,
  usedFor,
  wider,
  FixedBottomContent
}) => {
  return ReactDOM.createPortal(
    <aside className="modal-overlay" role='dialog' aria-label={ariaLabel} aria-modal="true" tabIndex="-1" onKeyDown={onKeyDown} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <div className={"modal-container" + (removeOverflowY == true ? ' removeOverflowY' : "") + (wider == true ? ' wider' : "") + (FixedBottomContent ? ' hasFixedBottomContent' : "")} ref={modalRef} id={'modal-' + usedFor}>
        <div className="modal-header">
          <div className="modal-title">
            {title}
          </div>
          <button type="button" className="modal-close" aria-labelledby="Close Modal" onClick={onClose} ref={buttonRef}>
            <span id="close-modal" className="u-hide-visually">Close</span>
            <svg className="modal-close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
          </button>
        </div>
        <div className={"modal-content" + (FixedBottomContent ? ' hasFixedBottomContent' : "")} id="modal-content">
          {React.Children.map(content, child => React.cloneElement(child, {onClose, onKeyDown}))}
        </div>
        {FixedBottomContent && (
          <div className="fixedContent">
            <FixedBottomContent />
          </div>
        )}
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
    const {hideTrigger} = this.props;

    // Closes modal if user presses browser back button
    let self = this
    window.addEventListener("popstate", this.onPopState.bind(event, self))

    // If want to open Modal automatically when called
    if (hideTrigger == true) {
      const {checkHasAccess, requireLogin, allowedPermissions, noAccessHandler, usedFor} = this.props;

      // If there is an access requirement
      if (checkHasAccess) {
        checkHasAccess(requireLogin, allowedPermissions ? allowedPermissions : null, (hasAccess) => {
          if (hasAccess == false) {
            return noAccessHandler ? noAccessHandler(null, "modal-"+usedFor) : null
          } else {
            return this.onOpen()
          }
        })

      // There was na ccess requirement
      } else {
        this.onOpen()
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState)
    if (this.props.manualCloseModalNotTrigger) {
      if (this.state.isOpen == true) {
        this.onClose()
      }
    }
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
    const {handleLocalStateOnClose, hideTrigger} = this.props;

    history.pushState({ modal: 'closed'}, '')
    history.pushState({ modal: 'closed'}, '')
    this.setState({ isOpen: false });

    if (this.openButtonNode != undefined && hideTrigger != true) {
      this.openButtonNode.focus()
    }

    if (handleLocalStateOnClose) {
      handleLocalStateOnClose();
    }

    this.toggleScrollLock();
  }

  onPopState = (e, self) => {
    if (self.state && self.state.modal && self.state.modal === 'open' && this.state.isOpen == true) {
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

  // Ensures if click within modal and end outside of modal does not close modal
  onMouseDown = (e) => {
    // No longer required as put content within existing modal as another screen rather than a pop up box
  /*  const {handleScrollBarClick} = this.props;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var clientX = e.clientX
    var careAboutScrollbar = h < '732' && e.target.style.overflowY == 'scroll' // i.e. if screenheight is small (but not on a mobile phone) & modal's overflowY has been turned off (which implies a container overflowing the screen height is likely in which case we care about scrollbar)
    var scrollbarClicked = (w - clientX) <= 8
    console.log("careAboutScrollbar: "+careAboutScrollbar)
    console.log("scrollbarClicked: "+scrollbarClicked)
    this.setState({
      itemClicked: (careAboutScrollbar && scrollbarClicked) ? 'scrollbar' : e.target
    }, () => {
      console.log("itemClicked: "+this.state.itemClicked)
    })*/
    this.setState({
      itemClicked: e.target
    })
  }

  // Close modal by clicking outside of Modal
  onMouseUp = (e) => {
  //  if (this.modalNode && this.modalNode.contains(this.state.itemClicked)) return;
  //  if (this.state.itemClicked == 'scrollbar' || this.state.itemClicked.classList[0] != 'modal-overlay') return;
    if (this.state.itemClicked.classList[0] != 'modal-overlay') return;
    this.onClose();
  }

  /*hasAccess = (requireLogin, allowedPermissions) => {
    const checkPermissions = (userPermissions, allowedPermissions) => {
      if (allowedPermissions.length === 0) {
        return true;
      }

      return userPermissions.some(permission =>
        allowedPermissions.includes(permission)
      );
    };

    const userPermissions = ["maxViewsNotReached"] //To be linked to Redux
    const isLoggedIn = false //To be linked to Redux
    const permitted = (requireLogin == true ? isLoggedIn : true) && checkPermissions(userPermissions, allowedPermissions)
    if (permitted == true) {
      console.log("permitted")
      return true
    } else {
      console.log("not permitted")
      return false
    }
  }*/

  clickHandler = () => {
    const {checkHasAccess, requireLogin, allowedPermissions, noAccessHandler, usedFor} = this.props;

    // If there is an access requirement
    if (checkHasAccess) {
      checkHasAccess(requireLogin, allowedPermissions ? allowedPermissions : null, (hasAccess) => {
        if (hasAccess == false) {
          return noAccessHandler ? noAccessHandler(null, "modal-"+usedFor) : null
        } else {
          return this.onOpen()
        }
      })

    // There was na ccess requirement
    } else {
      this.onOpen()
    }
  }

    render() {
    const {isOpen} = this.state;
    const {ariaLabel, children, customTriggerClassName, title, triggerText, triggerHasAutoFocus, usedFor, role, hideTrigger, removeOverflowY, wider, FixedBottomContent, otherFormatting} = this.props;

    return (
      <React.Fragment>
        {hideTrigger != true && (
          <ModalTrigger
            ariaLabel={ariaLabel}
            buttonRef={n => this.openButtonNode = n}
            clickHandler={this.clickHandler}
            customTriggerClassName={customTriggerClassName}
            otherFormatting={otherFormatting}
            text={triggerText}
            triggerHasAutoFocus={triggerHasAutoFocus}
            usedFor={usedFor}
          />
        )}
        {isOpen && (
          <ModalContent
            ariaLabel={ariaLabel}
            buttonRef={n => this.closeButtonNode = n}
            modalRef={n => this.modalNode = n}
            content={children}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onClose={this.onClose}
          //  onCloseAsPrevModal={this.onCloseAsPrevModal}
            onKeyDown={this.onKeyDown}
            role={role}
            removeOverflowY={removeOverflowY}
            title={title}
            usedFor={usedFor}
            wider={wider}
            FixedBottomContent={FixedBottomContent}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Modal;
