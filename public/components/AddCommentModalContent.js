// Dex last merged this code on 30th dec 2022

import React, { Component } from "react";

import { NimblePicker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import data from 'emoji-mart/data/emojione.json'
import Avatar from './Avatar.js';
import TextInput from './TextInput.js';

class AddCommentModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postSuccess: false,
      text: '',
      showEmojis: false,
      cursorPos: '',
    };
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    const addmsgbox = document.getElementById("txtInput-box");
    const addmsgboxMaxHeight = window.getComputedStyle(addmsgbox).maxHeight;
    this.setState({
      addmsgboxMaxHeight: addmsgboxMaxHeight,
    })
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu)
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  handleMessageChange = (e) => {
    this.setState({
      text: e.target.value
    })

    this.checkEmailPhoneSharing(e.target.value)

    this.setInputBoxHeight()
  }

  setInputBoxHeight = () => {
    const addmsgbox = this.addMessageNode;

    // Expand height of box & add scroll if needed
    addmsgbox.style.height = '20px';
    addmsgbox.style.height = addmsgbox.scrollHeight + 'px';
    if (addmsgbox.style.height > this.state.addmsgboxMaxHeight) {
      addmsgbox.style.overflowY = "auto";
    }
  }

  checkEmailPhoneSharing = (value) => {
    var notAllowedText = document.getElementById("notAllowedTextAddHighlight")
    var emailExpression = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    let phoneExpression = /\+?(?:\d\s?\D?){9,12}$/g
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

    if(idx >= 0) {
      const phoneEmailTxt = arrEmail != null ? ' an email address' : ' a phone number'
      let newText
      newText = 'PLEASE CHECK: It looks like <span class="notAllowedHighlight">' +
                value.substring(idx, idx + matchLen) +
                '</span> is '+
                phoneEmailTxt +
                ', which we discourage you from sharing, particularly in this public post'
      notAllowedText.style.display = 'block';
      notAllowedText.innerHTML = newText
    } else {
      notAllowedText.style.display = 'none';
      notAllowedText.innerHTML = ''
    }
  }

  showEmojis = (e) => {
    // Set cursor position of textarea at moment Emoji box was opened
    const el = document.getElementById('txtInput-box')
    const cursorPos = el.selectionStart

    this.modalOverflowOff()

    this.setState({
      showEmojis: true,
      cursorPos: cursorPos,
    }, () => document.addEventListener('click', this.closeMenu))
  }

  closeMenu = (e) => {
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.modalOverflowOn()
      this.setState({
        showEmojis: false
      }, () => document.removeEventListener('click', this.closeMenu))
    }
  }

  handleEmojiClick = (evt) => {
    const {cursorPos} = this.state;
    const el = document.getElementById('txtInput-box');
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

  closeOnEsc = (e) => {
    var key = e.key || e.keyCode

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.setState({
        showEmojis: false
      }, () => document.removeEventListener('click', this.closeMenu))
      this.modalOverflowOn()
      this.addMessageNode.focus()
    } else {
      return;
    }
  }

  /* Toggles modal's overflow off so that z-index of AutocompleteTagsMulti box is not overriden */
  modalOverflowOff = () => {
    const {modalID} = this.props
    const isSafari = this.state.whichBrowser == 'safari'
    const modal = document.getElementById(modalID)
  //  modal.style.overflowY = 'unset'
    var h = window.innerHeight;
    var w = window.innerWidth;
    var txtBox = document.getElementById('txtInput-box')
    var txtBoxHeight = txtBox.offsetHeight
    var heightToCheck = 732 - 25 + txtBoxHeight // 732 is min-height we need when textBox is in empty state / 25 is height of txtBox in empty state
    var onMobile = w <= '500'
    if (h >= heightToCheck && !onMobile) {
      modal.style.overflowY = 'unset'
    }
  /*  if (isSafari == true) {
      modal.style.WebkitOverflowScrolling = 'unset'
    } */
  }

  modalOverflowOn = () => {
    const {modalID} = this.props
    const isSafari = this.state.whichBrowser == 'safari'
    const modal = document.getElementById(modalID)
    if (isSafari == true) {
      modal.style.overflowY = 'scroll'
  //    modal.style.WebkitOverflowScrolling = 'touch'
    } else {
      modal.style.overflowY = 'auto'
    }
    var h = window.innerHeight;
    var w = window.innerWidth;
    var onMobile = w <= '500'
    if ((h < '732' || onMobile) && isSafari != true) {
      modal.style.overflowY = 'auto'
    }
  }

  handleFocus = () => {
    this.modalOverflowOff()
  }

  handleBlur = () => {
    this.modalOverflowOn()
  }

  handleSubmit = (e) => {
    const {text} = this.state
    const { type, qid, hid } = this.props

    this.setState({ postSuccess: true });

    const submission = {
      text: text,
      type: type,
      qid: qid,
      hid: hid,
    }
  }

  canBeSubmitted() {
    const {text} = this.state;

    return (
      (text.length != 0 && text.length <= 2000)
    );
  }

  render() {
    const { postSuccess, text, showEmojis } = this.state;
    const {showAsAnon, userID} = this.props
    const isEnabled = this.canBeSubmitted();

    if(postSuccess == false) {
      return (
        <React.Fragment>
          <div className="modal-title">
            Add your comment
          </div>
          {showAsAnon == true && (
            <div className="group-detail-item bright marginTop20">
              <Avatar userID={userID} isAnon userName='Anonymous' showAsCircle isAddHighlight picSize={40} isMedium/>
              <div className="textLeft addHighlight-user fontSize14 lineHeight2">
                <strong>Posting anonymously</strong>
              </div>
            </div>
          )}
          <div id="new-message" className="addHighlight-footer">
            <div className="footer-container">
              <div className="descriptor reqAsterisk">Your comment</div>
              <div className="input-box-container">
                <div className="input-flexContainer">
                  <div className="textInput-container" id="chatMessageForm">
                    <textarea
                      ref={n => this.addMessageNode = n}
                      className="input-box addHighlight showLargeBox"
                      id="txtInput-box"
                      form="chatMessageForm"
                      value={text}
                      onChange={this.handleMessageChange}
                      placeholder="What would you like to share? Avoid answering questions in comments"
                      autoComplete="on"
                      autoCorrect="on"
                      spellCheck="true"
                      maxLength="2000"
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {text.length > 0 && (
            <React.Fragment>
              <div className="descriptor-br addHighlight black marginBottom10 fontSize12">
                <b>*bold*</b> <i>_italics_</i> <span className="highlight-titleText">~highlight~</span>
              </div>
              <div className="descriptor-br addHighlight">
                {text.length} / 2000
              </div>
            </React.Fragment>
          )}
          <p className="footer-container textLeft" id="notAllowedTextAddHighlight"/>
          <div className="fontSize14 textLeft marginTop20">
            <div className="paddingR20 paddingL20 marginBottom20">
              <div className="multiple padding20 fontSize14 lineHeight20pc marginRight0">
                <p><strong>Avoid answering questions in comments.</strong></p>
                <p><strong>Comments are used to ask for clarification, to point out problems to the post, or to show thanks.</strong></p>
                <ul>
                  <li>The <i>post author will always be notified</i> of your comment.</li>
                  <li>Please <i>do not</i> share personal details</li>
                  <li><i>Showcase your personality!</i> No need to be serious here if you don&#39;t want to be. Let others see your personality!</li>
                  <li>...remember to have fun!</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="paddingL20 paddingR20">
            <div className="absolute">
              <button type="button" className="highlightEmojiContainer" onClick={this.showEmojis} onKeyDown={this.showEmojis}>
                <i className="hideOnHover far fa-smile" />
                <i className="showOnHover fas fa-laugh" />
              </button>
              {showEmojis && (
                /* The <div> element is just used as a container for EmojiPicker */
                /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
                <div className="emojiPickerContainer addHighlight" ref={el => (this.emojiPicker = el)} onKeyDown={this.closeOnEsc}>
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
            </div>
            <button className="ModalOpenBtn ModalOpenBtn-postHighlight alignRight" type="button" disabled={!isEnabled} onClick={this.handleSubmit}>Add comment</button>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className="modal-title">
          <div className="emoji-icon tada-emoji successBox" />
          Comment added
        </div>
      )
    }
  }
}


export default AddCommentModalContent;
