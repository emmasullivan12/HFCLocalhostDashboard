// Dex last merged this code on 13th dec 2020

import React, { Component } from "react";
import "../css/PrAddMessage.css";
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/emojione.json'
import {checkMobile} from './GeneralFunctions.js';
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
      isMobile: checkMobile(),
  //    playMsgAudio: false
    }
//    audio = new Audio(this.props.url)
  }

  componentDidMount() {
    const addmsgbox = document.getElementById("txtInput-box");
    const addmsgboxMaxHeight = window.getComputedStyle(addmsgbox).maxHeight;
    this.setState({
      addmsgboxMaxHeight: addmsgboxMaxHeight,
    })
  }

  /*handleResize = (e) => {
    console.log("resize event")
    const addmsgbox = document.getElementById("txtInput-box");
    console.log("height: " + addmsgbox.style.height)
    if (addmsgbox.scrollHeight < addmsgbox.style.height) {
      console.log("needs resizing")
//      addmsgbox.style.height = 'auto'
      addmsgbox.style.height = addmsgbox.scrollHeight
      console.log("height AFTER: " + addmsgbox.style.height)
    }

    // Resize
    console.log("clientheight: "+addmsgbox.clientHeight)
    console.log("offsetheight: "+addmsgbox.offsetHeight)
    console.log("scrollheight: "+addmsgbox.scrollHeight)

  }*/

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

  resetPrAddMessage = () => {
    let value = "";
    this.messageChange(value)
  }

  handleMessageChange = (e) => {
    let value = e.target.value;
    this.messageChange(value)
  }

  messageChange = (value) => {
  //  const isUnder18Chat = true;
    const country = 'GBR'
    const userRole = 'mentor'
    const isGroup = this.props.isGroup;
    const addmsgbox = document.getElementById("txtInput-box");

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
        let newText
        if (isGroup) {
          newText = 'PLEASE CHECK: It looks like <span class="notAllowedHighlight">' +
                    value.substring(idx, idx + matchLen) +
                    '</span> is '+
                    phoneEmailTxt +
                    ', which we discourage you from sharing, particularly in this public channel'
        } else {
          newText = 'PLEASE CHECK: It looks like <span class="notAllowedHighlight">' +
                    value.substring(idx, idx + matchLen) +
                    '</span> is '+
                    phoneEmailTxt +
                    ', which you\'ve agreed not to share for safeguarding reasons if your mentee is under 18'
        }
        notAllowedText.style.display = 'block';
        notAllowedText.innerHTML = newText
      } else {
        notAllowedText.style.display = 'none';
        notAllowedText.innerHTML = ''
      }
    }

    //  if (isUnder18Chat === true) {
    if (userRole === 'mentor') {
      checkEmailPhoneSharing()
    }

    // Show the bold/italics/highlight key
    var msgInsights = document.getElementById('msgInsights-bar-right');
    if (value.length > 0) {
      msgInsights.classList.add("show");
    } else {
      msgInsights.classList.remove("show");
      document.getElementById("prAddMessageCount").style.display = 'none'
    }

    addmsgbox.style.height = '20px';
    addmsgbox.style.height = (addmsgbox.scrollHeight) + 'px';
    if (addmsgbox.style.height > this.state.addmsgboxMaxHeight) {
      addmsgbox.style.overflowY = "scroll";
    }

    // Show the chraacter counter if goes over 1 line
    if (addmsgbox.scrollHeight > 26) {
      document.getElementById("prAddMessageCount").style.display = 'block'
    } else {
      document.getElementById("prAddMessageCount").style.display = 'none'
    }

    // Position the red "newmsgsbelowbtn" to always be 5px above the PrAddMessage container
    const newMsgsBelowBtn = document.getElementById('newMsgsBelowBtn')
    if (newMsgsBelowBtn) {
      const addMessage = document.getElementById('new-message')
      newMsgsBelowBtn.style.setProperty("bottom", (addMessage.offsetHeight + 5) + "px", "important")
    }
  }

  onEnterPress = (e) => {
    var key = e.key || e.keyCode

    if((key === 'Enter' || key === 13) && e.shiftKey === false) {
      e.preventDefault();
  //    this.toggleMsgAudio()
      this.handleSubmit();
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

  handleSubmit = () => {
    var msgInsights = document.getElementById('msgInsights-bar-right');
    msgInsights.classList.remove("show");

    // Set input box text back to ''
    this.addMessageNode.value = ''
    this.setState({
      text: ''
    }, () => {
      // Hide the bold/italics/highlight key
      var msgInsights = document.getElementById('msgInsights-bar-right');
      msgInsights.classList.remove("show");

      // Hide the character counter
      document.getElementById("prAddMessageCount").style.display = 'none';

      // Resize message input box to one line height
      const addmsgbox = document.getElementById("txtInput-box")
      addmsgbox.style.height = '26px';

      // Position the red "newmsgsbelowbtn" to always be 5px above the PrAddMessage container
      const newMsgsBelowBtn = document.getElementById('newMsgsBelowBtn')
      if (newMsgsBelowBtn) {
        const addMessage = document.getElementById('new-message')
        newMsgsBelowBtn.style.setProperty("bottom", (addMessage.offsetHeight + 5) + "px", "important")
      }
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
    const {isOffline} = this.props;

    return (
      <React.Fragment>
        <div id="new-message" className="chatWindow-footer">
          <div className="footer-container">
            <div className={"input-box-container"+ (isOffline ? " offline" : "")}>
              <div className="input-flexContainer">
                <form className="textInput-container" id="chatMessageForm">
                  <p id="notAllowedText"/>
                  <textarea
                    ref={n => this.addMessageNode = n}
                    className="input-box"
                    id="txtInput-box"
                    form="chatMessageForm"
                    value={text}
                  //  value={this.convertTextToEmojis}
                //    value={this.state.inputValue}
                    onChange={this.handleMessageChange}
                  //  onScroll={this.handleTextAreaScroll}
                    onKeyDown={this.onEnterPress}
                    onKeyUp={this.onKeyUp}
                    placeholder={isOffline ? "You're offline..." : "Type message..."}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    maxLength="5000"
                    disabled={isOffline}
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
                <div className="descriptor-br prAddMessage" id="prAddMessageCount">
                  {text.length} / 5000
                </div>
                <button type="button" className="emojiContainer" onClick={this.showEmojis} onKeyDown={this.showEmojis}>
                  <i className="hideOnHover far fa-smile" />
                  <i className="showOnHover fas fa-laugh" />
                </button>
                {showEmojis && (
                  /* The <div> element is just used as a container for EmojiPicker */
                  /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
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
                <button type="button" disabled={text.length === 0} className={"sendMsgContainer" + ((!isOffline && text.length > 0) ? ' isTyping' : "") + (isOffline ? ' isOffline' : '')} onClick={isOffline ? '' : this.handleSubmit}>
                  <i className="fas fa-paper-plane" />
                </button>
              </div>
            </div>
            <div className="msgInsights-bar">
              <div className="msgInsights-bar-left" id="isTyping">
                Dexter is Typing...
              </div>
              <div className="msgInsights-bar-right" id="msgInsights-bar-right">
                {this.state.isMobile != true && (
                  <span>↑ Shift + ⤶ Enter for new line </span>
                )}
                <b>*bold*</b> <i>_italics_</i> <span className="highlight-titleText">~highlight~</span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default PrAddMessage;
