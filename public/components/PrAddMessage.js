// Dex last merged this code on 7th sept 2020

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
  usedFor: 'attachmentContainer',
  changeInitFocus: true
}

const CameraUploadModalProps = {
  ariaLabel: 'Upload a picture',
  usedFor: 'picContainer',
  changeInitFocus: true
}

class PrAddMessage extends Component {
  constructor(props) {
    super(props);
    this.initialText = "hey there emma@prospela.com"
    this.state = {
    //  showText: this.initialText,
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

/*  onKeyUp = (e) => {
  //  const div = document.getElementById('txtInput-box')
//    var t = div.textContent || div.innerText;

  /*  div.innerHTML == 'hello'
    ? t.replace(new RegExp('hello','gi'), )
    : t;*/
//    this.state.text.replace(/hello/gi, function (x) {
  //    return x.toUpperCase();
  //  });

  //  e.target.value = 'emma@prospela.com'
//}

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
/*  toggleMsgAudio = () => {
    var audio = new Audio('https://prospela.com/wp-content/uploads/2020/09/Message-Notif1-Short.mp3');
    audio.play();
  }*/

/*  handleTextAreaScroll = (e) => {
    var scrollTop = e.target.scrollTop();
    document.getElementById('notAllowedHighlightsBackdrop').scrollTop(scrollTop);
  }*/

  handleMessageChange = (e) => {
    let value = e.target.value;
    const isUnder18Chat = true;
    const country = 'GBR'

    this.setState({
      text: value
    })

    function checkEmailPhoneSharing() {
      var emailExpression = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

      let phoneExpression = /\+?(?:\d\s?\D?){9,12}$/g
    /*  if(country === 'GBR') {
        phoneExpression = /(?:0|\+?44)(?:\d\s?){9,10}$/g
      } else {
        phoneExpression = /\+?(?:\d\s?){10,12}$/g
      }*/
    /*  function applyHighlights(textValue) {
        return textValue
          .replace(/\n$/g, '\n\n')
          .replace(/hello/g, ('<mark class="notAllowedHighlight">' + textValue + '</mark>'));
      }

      var highlightedText = applyHighlights(value);
      document.getElementById("notAllowedHighlights").textContent = highlightedText;*/

    /*  var newText = value.replace(/hello/g, ('<span class="notAllowedHighlight">' + 'hello' + '</span>'))
      console.log(newText)
      document.getElementById("notAllowedHighlights").innerHTML = newText*/

    //  let txt = document.getElementById("notAllowedText").textContent;
    //  var newText = value.replace(/hello/g, ('<span class="notAllowedHighlight">' + 'hello' + '</span>'))
  //    console.log(newText)
      let arrEmail = emailExpression.exec(value)
      let arrPhone = phoneExpression.exec(value)
      let idx
      let matchLen

      if (arrEmail != null) {
        idx = arrEmail.index
        matchLen = arrEmail[0].length
      } else if (arrPhone != null) {
        idx = arrPhone.index
        matchLen = arrPhone[0].length
      }

      var notAllowedText = document.getElementById("notAllowedText")

      if(idx >= 0) {
        const phoneEmailTxt = arrEmail != null ? ' an email address' : ' a phone number'
        let newText = 'PLEASE CHECK: It looks like <span class="notAllowedHighlight">' +
                      value.substring(idx, idx + matchLen) +
                      '</span> is '+
                      phoneEmailTxt +
                      ', which you\'ve agreed not to share for safeguarding reasons'
        notAllowedText.style.display = 'block';
        notAllowedText.innerHTML = newText
      } else {
        notAllowedText.style.display = 'none';
        notAllowedText.innerHTML = ''
      }
    }

    if (isUnder18Chat === true) {
      checkEmailPhoneSharing()
    }

    var msgInsights = document.getElementById('msgInsights-bar-right');

    if (value.length > 0) {
      msgInsights.classList.add("show");
    } else {
      msgInsights.classList.remove("show");
    }
    e.target.style.height = '20px';
    e.target.style.height = (e.target.scrollHeight) + 'px';
    e.target.style.overflowY = "scroll";
    if (e.target.style.height > "26px") {
      document.getElementById("prAddMessageCount").style.display = 'block'
    } else {
      document.getElementById("prAddMessageCount").style.display = 'none'
    }
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
        var includesHttp = url.includes('http')
        txt = txt.replace(match, includesHttp ? ("<a rel='external' target='_blank' href=" + url + ">" + url + "</a>") : ("<a rel='external' target='_blank' href='//" + url + "'>" + url + "</a>"));
      })
    )}

    result.innerHTML = txt;
  }

  onEnterPress = (e) => {
    var key = e.key || e.keyCode

    if((key === 'Enter' || key === 13) && e.shiftKey === false) {
      e.preventDefault();
  //    this.toggleMsgAudio()
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

    // Set input box text back to ''
    this.addMessageNode.value = ''
    this.setState({
      text: ''
    })
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
    const {showEmojis, text} = this.state;

    return (
      <React.Fragment>
        <div id="new-message" className="chatWindow-footer">
          <div className="footer-container">
            <div className="input-box-container">

              <div className="input-flexContainer">
                <form className="textInput-container" id="chatMessageForm">
                  <p id="notAllowedText"/>
                  <textarea
                    ref={n => this.addMessageNode = n}
                    className="input-box"
                    id="txtInput-box"
                    form="chatMessageForm"
                    value={this.state.text}
                  //  value={this.convertTextToEmojis}
                //    value={this.state.inputValue}
                    onChange={this.handleMessageChange}
                  //  onScroll={this.handleTextAreaScroll}
                    onKeyDown={this.onEnterPress}
                    onKeyUp={this.onKeyUp}
                    placeholder="Type message..."
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    maxLength="2000"
                    autoFocus
                  />
          {  /*    <div className="highlight-container">
                  <div className="highlight-backdrop" id="notAllowedHighlightsBackdrop">
                      <div className="highlights" id="notAllowedHighlights">

                    </div>
                  </div>
*/}
        {  //      </div>
}               </form>
                {this.state.text.length >0 && (
                  <div className="descriptor-br prAddMessage" id="prAddMessageCount">
                    {this.state.text.length} / 2000
                  </div>
                )}
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
