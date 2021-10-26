// Dex last merged this code on 26th feb 2021

import React, { Component } from "react";

import { NimblePicker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import data from 'emoji-mart/data/emojione.json'
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import Avatar from './Avatar.js';
import CameraUploadContent from './CameraUploadContent.js';
import FileUploadContent from './FileUploadContent.js';
import Modal from './Modal.js';
import UserName from './UserName.js';

const FileUploadModalProps = {
  ariaLabel: 'Upload a file',
  usedFor: 'highlightAttachmentContainer',
  changeInitFocus: true
}

const CameraUploadModalProps = {
  ariaLabel: 'Upload a picture',
  usedFor: 'highlightPicContainer',
  changeInitFocus: true
}


class AddHighlightModalContent extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      showEmojis: false,
      cursorPos: '', // cursor position to enter emoji within string
      errorLoadingHashtags: '',
    };
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

  showEmojis = (e) => {
    // Set cursor position of textarea at moment Emoji box was opened
    const el = document.getElementById('txtInput-box')
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
      };
    }, () => {
      el.selectionStart = end + emojiPic.length; // Moves cursor after newly inserted emoji (start pos)
      el.selectionEnd = end + emojiPic.length; // Moves cursor after newly inserted emoji (end pos)
    })
  }

  handleMessageChange = (e) => {
    let value = e.target.value;
    this.messageChange(value)
  }

  messageChange = (value) => {
    const addmsgbox = this.addMessageNode;

    this.setState({
      text: value
    })

    // Expand height of box & add scroll if needed
    addmsgbox.style.height = '20px';
    addmsgbox.style.height = addmsgbox.scrollHeight + 'px';

    if (addmsgbox.style.height > this.state.addmsgboxMaxHeight) {
      addmsgbox.style.overflowY = "auto";
    }

  }

  render() {
    const { text, showEmojis, errorLoadingHashtags } = this.state;
    const user = {uid: '12345', fname: 'Emma', lname: 'Sullivan'}

    return (
      <React.Fragment>
        <div>
          <div className="modal-title">
            Create post
          </div>
          <div className="group-detail-item bright">
            <Avatar userID={user.uid} userName={user.fname} isGroupFlex smallIdle picSize={40}/>
            <UserName userUID={user.uid} fname={user.fname} lname={user.lname} smallIdle/>
            <div>Edit Credential</div>
          </div>
          <div id="new-message" className="chatWindow-footer">
            <div className="footer-container">
              <div className="input-box-container">
                <div className="input-flexContainer">
                  <form className="textInput-container" id="chatMessageForm">
                    <textarea
                      ref={n => this.addMessageNode = n}
                      className="input-box"
                      id="txtInput-box"
                      form="chatMessageForm"
                      value={text}
                      onChange={this.handleMessageChange}
                      placeholder="What would you like to share?"
                      autoComplete="on"
                      autoCorrect="on"
                      spellCheck="true"
                      maxLength="5000"
                      autoFocus
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="fontSize14 marginTop20 textLeft">
            <form className="paddingR20 paddingL20">
              <div><span role="img" aria-label="sparkle-emoji">✨</span><strong> Suggested hashtags:</strong></div>
              <div className="form-group">
                <label className="alignLeft darkGreyText noBold reqAsterisk" htmlFor="roleco">Help reach more mentees (Add up to 5)</label>
                <div className="autocompleter">
                  <AutocompleteTagsMulti
                    multiple
                    openOnClick
                    showValues
                    showCheckbox
                    handleDone={this.handleDoneClickHobbies}
                    suggestions={[
                      {value: '0', label: '3D Animation'},
                      {value: '1', label: 'Design'},
                      {value: '2', label: 'AI'},
                      {value: '3', label: 'Javascript'},
                      {value: '4', label: 'Maya'}
                    ]}
                    name='selectHobby'
                    placeholder='Type Hashtags...'
                    placeholderOnClick="Type Hashtags..."
                    handleChange={this.handleHobbiesChange}
                    idValue='value'
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                  {errorLoadingHashtags === true && (
                    <div className="descriptor prompt error indRoleForm alignLeft">
                      Error loading Hashtags. Try reloading the page.
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="paddingL20 paddingR20">
            <div className="absolute">
              <Modal {...CameraUploadModalProps}>
                <CameraUploadContent/>
              </Modal>
              <button type="button" className="highlightEmojiContainer" onClick={this.showEmojis} onKeyDown={this.showEmojis}>
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
            </div>
            <button className="ModalOpenBtn ModalOpenBtn-postHighlight alignRight" type="button">Post</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default AddHighlightModalContent;
