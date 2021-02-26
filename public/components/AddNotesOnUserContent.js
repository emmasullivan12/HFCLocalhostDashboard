// Dex last merged this code on 26th feb 2021

import React, { Component } from "react";
import "../css/RequestChatContent.css";
import "../css/Emoji.css";

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class AddNotesOnUserContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesOnUser: this.props.notesOnUser,
      messageFromServer: '',
    };
  }

  componentDidMount(){
    const el = document.getElementById("updateNotesInputBox")
    el.focus();
    this.setCaret(el, el.value.length);
  }

  setCaret = (el, caretPos) => {
    el.setSelectionRange(caretPos, caretPos);
  /*  var range = document.createRange()
    var sel = window.getSelection()
    range.setStart(el.lastChild, el.lastChild != null ? el.lastChild.length : 0)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)*/
  }

  handleInput = (evt) => {
    evt.target.style.height = (evt.target.scrollHeight) + 'px';
    this.setState({ notesOnUser: evt.target.value });
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    const {uid} = this.props;
    const {notesOnUser} = this.state;

    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }

    this.setState({ messageFromServer: 'Notes updated for user: ' + uid + ' server says' });
  }

  render() {
    const { notesOnUser, messageFromServer } = this.state;

    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Update notes on <span className="request-mentor-name">{this.props.username}</span>
          </div>
          <form id="updateUserNotesForm">
            <textarea
              name="notesOnUser"
              className="form-control-std textInputBox"
              id="updateNotesInputBox"
              form="updateUserNotesForm"
              value={notesOnUser}
              onChange={this.handleInput}
              placeholder={notesOnUser}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              required
            />
            <div className="descriptor-br form">
              {notesOnUser.length} / 500
            </div>
            <div className="request-btn-container">
              <button type="button" className="Submit-btn" onClick={this.handleSubmit}>
                Save
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="ideas-icon-container">
              <i className="fas fa-paper-plane" />
            </div>
            Notes Updated!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              You&#39;ll hear from us asap when your mentor replies. For now, sit back, and if they accept you&#39;ll be able to chat to them soon from your Direct Messages.
            </div>
            <div className="emoji-icon ok-emoji successBox" />
          </div>
        </React.Fragment>
      )
    }
  }
}

export default AddNotesOnUserContent;
