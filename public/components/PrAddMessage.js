// Dex last merged this code on 31st july 2020

import React, { Component } from "react";
import "../css/PrAddMessage.css";
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker, Emoji } from 'emoji-mart'
import data from 'emoji-mart/data/emojione.json'
import {isURL} from './GeneralFunctions.js';
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
    this.initialText = "hey there emma@prospela.com"
    this.state = {
      showText: this.initialText,
      text: '',
      showEmojis: false,
  //    playMsgAudio: false
    }
//    audio = new Audio(this.props.url)
  }

  handleEmojiClick = (evt) => {
    let sym = evt.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emojiPic = String.fromCodePoint(...codesArray)

    this.setState((prevState) => {
      return {
        text: prevState.text + emojiPic,
      };
    })
  }

/*  convertTextToEmojis = () => {
    const {text} = this.state

    var reg = /:([^\s:]+)(?:::(skin-tone-[2-6]))?:/g;

    const newText = text.replace(reg, match => {
      return <Emoji emoji={match} size={16}/>
    })

    return newText

  }*/

  onKeyUp = (e) => {
    console.log("ONKEYUP")
  //  const div = document.getElementById('txtInput-box')
//    var t = div.textContent || div.innerText;

  /*  div.innerHTML == 'hello'
    ? t.replace(new RegExp('hello','gi'), )
    : t;*/
//    this.state.text.replace(/hello/gi, function (x) {
  //    return x.toUpperCase();
  //  });

  //  e.target.value = 'emma@prospela.com'
  }

/*  checkIsntSharingDeets = () => {
    const {text} = this.state

  //  var str = text
    var emailExpression = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/gi;
    var emailRegExp = new RegExp(emailExpression);
  //  var phoneExpression =
  //  var phoneRegExp = new RegExp(phoneExpression);


    var str = text.replace(emailRegExp, function(x) {
      return x.toUpperCase()
    })
    console.log(str)
    alert(str)

  //  if (text.match(emailRegExp)) {

      // hanle you shouldnt be sharing email
//      return false
  //  } else if (phoneRegExp.match(text)) {
      // handle you shouldnt be sharing phone numbers
  //    return false
  //  } else {
//      return true
//    }

  }
*/
  toggleMsgAudio = () => {
    var audio = new Audio('https://prospela.com/wp-content/uploads/2020/09/Message-Notif1-Short.mp3');
    audio.play();
  }

  handleMessageChange = (e) => {
    let value = e.target.value;

    this.setState({
      text: value
    })

    let txt = document.getElementById("myText").textContent;
    let idx = txt.indexOf(value);
    if(idx >= 0) {
      let newText = txt.substring(0, idx) +
                    '<span class="notAllowedHighlight">' +
                    txt.substring(idx, idx + value.length) +
                    '</span>' +
                    txt.substring(idx + value.length);
      document.getElementById("myText").innerHTML = newText
    }


  /* const chatIsWithU18 = true;
    this.setState({
      text: evt.target.value
    }, () => {
      if (chatIsWithU18 === true) {
        this.checkIsntSharingDeets()
      }
      isURL(this.state.text)
    });*/
    var msgInsights = document.getElementById('msgInsights-bar-right');

    if (e.target.value.length > 0) {
      msgInsights.classList.add("show");
    } else {
      msgInsights.classList.remove("show");
    }
    e.target.style.height = '20px';
    e.target.style.height = (e.target.scrollHeight) + 'px';
    e.target.style.overflowY = "scroll";
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
    var key = e.key || e.keyCode

    if((key === 'Enter' || key === 13) && e.shiftKey === false) {
      e.preventDefault();
      this.toggleMsgAudio()
      this.handleMessageSubmit();
    } else {
      return;
    }
  }

  closeOnEsc = (e) => {
    var key = e.key || e.keyCode

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.setState({
        showEmojis: false
      })
      this.addMessageNode.focus()
    } else {
      return;
    }
  }

  handleMessageSubmit = () => {
    this.convertBoldItalicsLinks();
  //  alert('message submitted!');
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
              <button type="button" className="emojiContainer" onClick={this.showEmojis} onKeyDown={this.showEmojis}>
                <i className="far fa-smile" />
              </button>
              {showEmojis && (
                <div className="emojiPickerContainer" ref={el => (this.emojiPicker = el)} onKeyDown={this.closeOnEsc}>
                  <NimblePicker
                    onSelect={this.handleEmojiClick}
                    data={data}
                    title="Pick your emoji…"
                    emoji="point_up"
                    set="emojione"
                    autoFocus
                  />
                </div>
              )}
              <div className="input-flexContainer">
                <form className="textInput-container" id="chatMessageForm">
                  <textarea
                    ref={n => this.addMessageNode = n}
                    className="input-box"
                    id="txtInput-box"
                    form="chatMessageForm"
                  //  value={this.convertTextToEmojis}
                //    value={this.state.inputValue}
                    onChange={this.handleMessageChange}
                    onKeyDown={this.onEnterPress}
                    onKeyUp={this.onKeyUp}
                    placeholder="Type message..."
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    autoFocus
                  />
                  <p id="myText">{this.state.showText}</p>
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
