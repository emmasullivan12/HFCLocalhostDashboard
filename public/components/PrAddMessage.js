// Dex last merged this code on 26th April 2020

import React, { Component } from "react";
import "../css/PrAddMessage.css";
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/emojione.json'
import Modal from './Modal.js';
import FileUploadContent from './FileUploadContent.js';
import CameraUploadContent from './CameraUploadContent.js';

// This includes props and title to be passed to FileUploadModal
const FileUploadModalProps = {
  ariaLabel: 'Upload a file',
  usedFor: 'attachmentContainer'
}

const CameraUploadModalProps = {
  ariaLabel: 'Upload a picture',
  usedFor: 'picContainer'
}

class PrAddMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showEmojis: false,
    }
  }

  handleEmojiClick = (evt) => {
    let sym = evt.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emojiPic = String.fromCodePoint(...codesArray)
    this.setState((prevState) => {
      return {text: prevState.text + emojiPic};
    })
  }

  handleMessageChange = (evt) => {
    this.setState({ text: evt.target.value });
    var msgInsights = document.getElementById('msgInsights-bar-right');

    if (evt.target.value.length > 0) {
      msgInsights.classList.add("show");
    } else {
      msgInsights.classList.remove("show");
    }
    evt.target.style.height = '20px';
    evt.target.style.height = (evt.target.scrollHeight) + 'px';
    evt.target.style.overflowY = "scroll";
  }

  convertBoldItalicsLinks = () => {
    var txt = document.getElementById('txtInput-box').value
    var result = document.getElementById('isTyping')

    //bold
    {txt.match(/\*([\w\s\d]+)?\*/g) != null && (
      txt.match(/\*([\w\s\d]+)?\*/g).forEach(function(match) {
        var str = match.substring(1, match.length - 1);
        txt = txt.replace(match, "<b>" + str + "</b>");
      })
    )}

    //italics
    {txt.match(/_([\w\s\d]+)?_/g) != null && (
      txt.match(/_([\w\s\d]+)?_/g).forEach(function(match) {
        var str = match.substring(1, match.length - 1);
        txt = txt.replace(match, "<i>" + str + "</i>");
      })
    )}

    //links
    {txt.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm) != null && (
      txt.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm).forEach(function(match) {
        var url = match.substring(0, match.length);
        txt = txt.replace(match, "<a rel={'external'} target=\"_blank\" href={http://" + url + "}>" + url + "</a>");
      })
    )}

    result.innerHTML = txt;
  }

  onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.handleMessageSubmit();
    } else {
      return;
    }
  }

  handleMessageSubmit = () => {
    this.convertBoldItalicsLinks();
    alert('message submitted!');
    var msgInsights = document.getElementById('msgInsights-bar-right');
    msgInsights.classList.remove("show");
  }

  showEmojis = (e) => {
    this.setState({
      showEmojis: true
    }, () => document.addEventListener('click', this.closeMenu))
  }

  closeMenu = (e) => {
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState({
        showEmojis: false
      }, () => document.removeEventListener('click', this.closeMenu))
    }
  }

  render() {
    const {showEmojis} = this.state;
    const {text} = this.state.text;

    return (
      <React.Fragment>
        <div id="new-message" className="chatWindow-footer">
          <div className="footer-container">
            <div className="input-box-container">
              <button type="button" className="emojiContainer" onClick={this.showEmojis}>
                <i className="far fa-smile" />
              </button>
              {showEmojis && (
                <div className="emojiPickerContainer" ref={el => (this.emojiPicker = el)}>
                  <NimblePicker
                    onSelect={this.handleEmojiClick}
                    data={data}
                    title="Pick your emoji…"
                    emoji="point_up"
                    set="emojione"
                  />
                </div>
              )}
              <div className="input-flexContainer">
                <form className="textInput-container" id="chatMessageForm">
                  <textarea
                    className="input-box"
                    id="txtInput-box"
                    form="chatMessageForm"
                    value={this.state.text}
                    onChange={this.handleMessageChange}
                    onKeyDown={this.onEnterPress}
                    placeholder="Type message..."
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    autoFocus
                  />
                </form>
                <Modal {...FileUploadModalProps}>
                  <FileUploadContent/>
                </Modal>
                <Modal {...CameraUploadModalProps}>
                  <CameraUploadContent/>
                </Modal>
              </div>
            </div>
            <div className="msgInsights-bar">
              <div className="msgInsights-bar-left" id="isTyping">
                Dexter is Typing...
              </div>
              <div className="msgInsights-bar-right" id="msgInsights-bar-right">
                <b>*bold*</b> <i>_italics_</i>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default PrAddMessage;
