// Dex last merged this code on 27th mar 2023

import React, { Component } from "react";
import "../css/PrAddMessage.css";
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/emojione.json'
import {LoadingSpinner, checkMobile} from './GeneralFunctions.js';
import Modal from './Modal.js';


class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.isInModal ? '' : '',
      showEmojis: false,
      isMobile: checkMobile(),
      cursorPos: '', // cursor position to enter emoji within string
    }
  }

  componentDidMount() {
    const {gid, isInModal} = this.props
    const {text} = this.state
    const addmsgbox = document.getElementById("txtInput-box-"+gid+(isInModal ? "-isInModal" : ""));
    const addmsgboxMaxHeight = window.getComputedStyle(addmsgbox).maxHeight;

  /*  const addmsgbox = this.addMessageNode; */
    var msgInsights = document.getElementById('msgInsights-bar-right-'+gid+(isInModal ? "-isInModal" : ""));
    var msgCount = document.getElementById("prAddMessageCount-"+gid+(isInModal ? "-isInModal" : ""));

    this.setState({
      addmsgboxMaxHeight: addmsgboxMaxHeight,
    })

    // Show box height larger if has saved text in it when modal opens
    if (text.length > 0) {
      // Show the bold/italics/highlight key
      msgInsights.classList.add("show");

      // Expand height of box & add scroll if needed
      addmsgbox.style.height = '20px';
      addmsgbox.style.height = addmsgbox.scrollHeight + 'px';

      if (addmsgbox.style.height > this.state.addmsgboxMaxHeight) {
        addmsgbox.style.overflowY = "auto";
      }

      // Show the chraacter counter if goes over 1 line
      if (addmsgbox.scrollHeight > 26) {
        msgCount.style.display = 'block'
      } else {
        msgCount.style.display = 'none'
      }

      //Put cursor at end of the text (have to set focus first)
      addmsgbox.focus()
      let end = addmsgbox.selectionEnd;
      addmsgbox.selectionStart = end = text.length;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu)
  }

  handleEmojiClick = (evt) => {
    const {cursorPos} = this.state;
    const {gid, isInModal} = this.props
    const el = document.getElementById("txtInput-box-"+gid+(isInModal ? "-isInModal" : ""));
    const end = el.selectionEnd;

    let emojiPic = evt.native

    // Max of existing cursor position and 'end' which takes into account emojiPic.length
    const posToUse = Math.max(cursorPos, end)

    this.setState((prevState) => {
      const string = prevState.text;

      return {
        text: string.substring(0, posToUse) + emojiPic + string.substring(posToUse, string.length),
        showEmojis: false,
      };
    }, () => {
      el.selectionStart = end + emojiPic.length; // Moves cursor after newly inserted emoji (start pos)
      el.selectionEnd = end + emojiPic.length; // Moves cursor after newly inserted emoji (end pos)
      document.removeEventListener('click', this.closeMenu)
      this.addMessageNode.focus()
    })
  }

  handleMessageChange = (e) => {
    let value = e.target.value;
    this.messageChange(value)
  }

  messageChange = (value, hardReset) => {
  //  const isUnder18Chat = true;
    const country = 'GBR'
    const userRole = 'mentor'
    const {isGroup, showGeneralNotAllowedText, gid, isInModal} = this.props
    //const addmsgbox = document.getElementById("txtInput-box-"+gid)
  //  const addmsgbox = this.addMessageNode;
    const addmsgbox = document.getElementById("txtInput-box-"+gid+(isInModal ? "-isInModal" : ""));
    var msgInsights = document.getElementById('msgInsights-bar-right-'+gid+(isInModal ? "-isInModal" : ""));
    var msgCount = document.getElementById("prAddMessageCount-"+gid+(isInModal ? "-isInModal" : ""));

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

      var notAllowedText = document.getElementById("notAllowedText-"+gid+(isInModal ? "-isInModal" : ""))

      if(idx >= 0) {
        const phoneEmailTxt = arrEmail != null ? ' an email address' : ' a phone number'
        let newText
        if (isGroup || showGeneralNotAllowedText) {
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

    if (hardReset != true) {
      checkEmailPhoneSharing()

      // Show the bold/italics/highlight key
      if (value.length > 0) {
        msgInsights.classList.add("show");
      } else {
        msgInsights.classList.remove("show");
        msgCount.style.display = 'none';
      }

      // Expand height of box & add scroll if needed
      addmsgbox.style.height = '20px';
      addmsgbox.style.height = addmsgbox.scrollHeight + 'px';

      if (addmsgbox.style.height > this.state.addmsgboxMaxHeight) {
        addmsgbox.style.overflowY = "auto";
      }

      // Show the chraacter counter if goes over 1 line
      if (addmsgbox.scrollHeight > 26) {
        msgCount.style.display = 'block'
      } else {
        msgCount.style.display = 'none'
      }

    } else {
      // Reset inbox box back to normal
      addmsgbox.style.height = '26px';
      msgInsights.classList.remove("show");
      msgCount.style.display = 'none';
      addmsgbox.focus();
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
      }, () => document.removeEventListener('click', this.closeMenu))
      //document.getElementById("txtInput-box-"+this.props.gid).focus()
      this.addMessageNode.focus()
    } else {
      return;
    }
  }

  handleSubmit = () => {
    const {gid, isInModal} = this.props
    var msgInsights = document.getElementById('msgInsights-bar-right-'+gid+(isInModal ? "-isInModal" : ""));
    msgInsights.classList.remove("show");

    // Set input box text back to ''
    //document.getElementById("txtInput-box-"+gid).value = ''
    this.addMessageNode.value = ''
    this.setState({
      text: ''
    }, () => {
      // Hide the bold/italics/highlight key
      msgInsights.classList.remove("show");

      // Hide the character counter
      document.getElementById("prAddMessageCount-"+this.props.gid+(isInModal ? "-isInModal" : "")).style.display = 'none';

      // Resize message input box to one line height
      const addmsgbox = document.getElementById("txtInput-box-"+this.props.gid+(isInModal ? "-isInModal" : ""))
      addmsgbox.style.height = '26px';
    })
  }

  showEmojis = (e) => {
    const {gid, isInModal} = this.props
    const el = document.getElementById("txtInput-box-"+gid+(isInModal ? "-isInModal" : ""));
    // Set cursor position of textarea at moment Emoji box was opened
    const cursorPos = el.selectionStart

    this.setState({
      showEmojis: true,
      cursorPos: cursorPos,
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
    const {isOffline, gid, type, isInModal, isLoggedIn} = this.props;

    return (
      <React.Fragment>
        <div id={"new-message-"+gid+(isInModal ? "-isInModal" : "")} className={"chatWindow-footer marginTop20" + (type == 'g' ? " isGeneral" : "")}>
          <div className="redText"> Hmmm, looks like something went wrong. Please refresh the page and try again. </div>
          <div className={"input-box-container" + ((type == 'g' && isInModal) ? " isGeneralInModal" : "") + ((type == 'g' && !isInModal) ? " noPointerEvents isGeneralOnFeed" : "") + ((!isLoggedIn || isOffline) ? " offline" : "")}>
            <div className="input-flexContainer">
              <form className="textInput-container" id={"addCommentForm-"+gid+(isInModal ? "-isInModal" : "")}>
                <p className="notAllowedText" id={"notAllowedText-"+gid+(isInModal ? "-isInModal" : "")}/>
                <textarea
                  ref={n => this.addMessageNode = n}
                  className="input-box txtInput-box isAddComment"
                  id={"txtInput-box-"+gid+(isInModal ? "-isInModal" : "")}
                  form={"addCommentForm-"+gid+(isInModal ? "-isInModal" : "")}
                  value={text}
                //  value={this.convertTextToEmojis}
              //    value={this.state.inputValue}
                  onChange={this.handleMessageChange}
                //  onScroll={this.handleTextAreaScroll}
                  onKeyDown={this.onEnterPress}
                  onKeyUp={this.onKeyUp}
                  placeholder={(isInModal ? (!isLoggedIn ? "Log in to post..." : (isOffline ? "You're offline..." : "Add comment...")) : "Join the conversation...")}
                  autoComplete="on"
                  autoCorrect="on"
                  spellCheck="true"
                  maxLength="5000"
                  disabled={isOffline || (isInModal && !isLoggedIn)}
                  autoFocus={isInModal ? true : false}
                />
              </form>
              <div className="descriptor-br prAddMessage" id={"prAddMessageCount-"+gid+(isInModal ? "-isInModal" : "")}>
                {text.length} / 5000
              </div>
              <button type="button" className={"emojiContainer isAddComment" + (isInModal ? " isInModal" : "")} onClick={!isLoggedIn ? null : this.showEmojis} onKeyDown={!isLoggedIn ? null : this.showEmojis}>
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
              <button type="button" disabled={text.length === 0} className={"sendMsgContainer isAddComment" + (isInModal ? " isInModal" : "") + ((!isOffline && text.length > 0) ? ' isTyping' : "") + (isOffline ? ' isOffline' : '')} onClick={((!isLoggedIn || isOffline) ? null : this.handleSubmit)}>
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </div>
          <div className={!isInModal ? "msgInsights-bar" : ""}>
            <div className="msgInsights-bar-right" id={"msgInsights-bar-right-"+gid+(isInModal ? "-isInModal" : "")}>
              {this.state.isMobile != true && (
                <span>↑ Shift + ⤶ Enter for new line </span>
              )}
              <b>*bold*</b> <i>_italics_</i> <span className="highlight-titleText">~highlight~</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default AddComment;
