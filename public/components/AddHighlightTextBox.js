// Dex last merged this code on 26th feb 2021

import React, { Component } from "react";

import { NimblePicker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import data from 'emoji-mart/data/emojione.json'
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import Avatar from './Avatar.js';
import CameraUploadContent from './CameraUploadContent.js';
import {usercdn, userImgsFolder} from './CDN.js';
import {Check} from './GeneralFunctions.js';
import FileUploadContent from './FileUploadContent.js';
import Modal from './Modal.js';
import UserName from './UserName.js';
import hashtagOptions from './Hashtags.js';

/*const FileUploadModalProps = {
  ariaLabel: 'Upload a file',
  usedFor: 'highlightAttachmentContainer',
  changeInitFocus: true
}*/

/*const CameraUploadModalProps = {
  ariaLabel: 'Upload a picture',
  usedFor: 'highlightPicContainer',
  changeInitFocus: true
}*/


class AddHighlightModalContent extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      showEmojis: false,
      showCredentials: false,
      cursorPos: '', // cursor position to enter emoji within string
      errorLoadingHashtags: '',
      hashtagsFromList: [],
      freeTextHashtags: [],
      endingHashtagsArr: [],
      showMaxReachedError: false,
      dragover: '',
      authorType: '',
      authorInst: '',
      authorRole: '',
      authorDegree: '',
      authorTraining: '',
      authorState: '',
      authorCountry: '',
      selectedFiles: [
        {fileid: '123', name: 'My image', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
        {fileid: '124', name: 'My PDF', type: 'application/pdf'},
        {fileid: '125', name: 'MyExcelspreadsheet.xls', type: 'application/vnd.ms-excel'},
        {fileid: '126', name: 'MyWorddocfilename.word', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
        {fileid: '127', name: 'MyPOWERPOINTBABY!', type: 'application/vnd-mspowerpoint'},
        {fileid: '128', name: 'My other doc format', type: 'other'}
      ],
      errorFileNumber: false,
      errorFileSize: false,
    };
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
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
    document.removeEventListener('click', this.closeCredentials)
  }

  editCredential = () => {
    this.modalOverflowOff()
    this.setState({
      showCredentials: true,
    }, () => document.addEventListener('click', this.closeCredentials))
  }

  closeCredentials = (e) => {
    if ((this.credentialsPicker !== null && !this.credentialsPicker.contains(e.target)) || e.currentTarget.id == 'close-credential') {
      this.modalOverflowOn()
      this.setState({
        showCredentials: false
      }, () => document.removeEventListener('click', this.closeCredentials))
    }
  }

  closeCredentialsOnEsc = (e) => {
    var key = e.key || e.keyCode

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.setState({
        showCredentials: false
      }, () => document.removeEventListener('click', this.closeCredentials))
      this.modalOverflowOn()
    } else {
      return;
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

  handleRadioClick = (e) => {
    console.log(e.target.dataset)
    var authorType = e.target.dataset.authortype
    var authorState = e.target.dataset.state
    var authorCountry = e.target.dataset.country
    if (authorType == 'job') {
      this.setState({
        authorType: authorType,
        authorInst: e.target.dataset.inst,
        authorRole: e.target.dataset.role,
        authorState: authorState,
        authorCountry: authorCountry,
      })
    } else if (authorType == 'train') {
      this.setState({
        authorType: authorType,
        authorInst: e.target.dataset.inst,
        authorTraining: e.target.dataset.training,
        authorState: authorState,
        authorCountry: authorCountry,
      })
    } else if (authorType == 'uni') {
      this.setState({
        authorType: authorType,
        authorInst: e.target.dataset.inst,
        authorDegree: e.target.dataset.degree,
        authorState: authorState,
        authorCountry: authorCountry,
      })
    } else if (authorType == 'sch') {
      this.setState({
        authorType: authorType,
        authorInst: e.target.dataset.inst,
        authorState: authorState,
        authorCountry: authorCountry,
      })
    } else {
      this.setState({
        authorType: authorType,
        authorState: authorState,
        authorCountry: authorCountry,
      })
    }
  }

  handleMessageChange = (e) => {
    let value = e.target.value;
    this.messageChange(value)
  }

  handleHashtagChange = (userInput, callback) => {
    const {endingHashtagsArr} = this.state

    // If is at maxNumValues of 5 but user still trying to change, show error message
    if (endingHashtagsArr.length == 5 && userInput.length == 5) {
      this.setState({
        showMaxReachedError: true,
      })
    } else {
      this.setState({
        showMaxReachedError: false,
      })
    }

    const hashtagsFromList = hashtagOptions
      .filter(hashtag => userInput.includes(hashtag.label))

    const labels = hashtagsFromList.map(value => value.label)

    const freeTextHashtags = userInput
      .filter(hashtag => labels.indexOf(hashtag) === -1)

    const values = hashtagsFromList.map(value => value.value)

    this.setState({
      hashtagsFromList: values,
      freeTextHashtags: freeTextHashtags,
      endingHashtagsArr: userInput
    }, () => {
      if(callback) {
        callback()
      }
    })
  }

  /* Toggles modal's overflow off so that z-index of AutocompleteTagsMulti box is not overriden */
  modalOverflowOff = () => {
    const {modalID} = this.props
    document.getElementById(modalID).style.overflowY = 'unset'
  }

  modalOverflowOn = () => {
    const {modalID} = this.props
    document.getElementById(modalID).style.overflowY = 'auto'
  }

  handleFocus = () => {
    this.modalOverflowOff()
  }

  finMultiOptions = () => {
    const {endingHashtagsArr} = this.state

    // If is less than or equal to maxNumValues of 5 remove error message
    if (endingHashtagsArr.length <= 5) {
      this.setState({
        showMaxReachedError: false,
      })
    } else {
      this.setState({
        showMaxReachedError: true,
      })
    }
  }

  handleBlur = () => {
    this.modalOverflowOn()
  }

  messageChange = (value) => {
    const addmsgbox = this.addMessageNode;

    this.setState({
      text: value
    })

    function checkEmailPhoneSharing() {
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

    checkEmailPhoneSharing()

    // Expand height of box & add scroll if needed
    addmsgbox.style.height = '20px';
    addmsgbox.style.height = addmsgbox.scrollHeight + 'px';

    if (addmsgbox.style.height > this.state.addmsgboxMaxHeight) {
      addmsgbox.style.overflowY = "auto";
    }

  }

  handleSubmit = () => {
    const {hashtagsFromList, freeTextHashtags, endingHashtagsArr, authorType, authorInst, authorRole, authorDegree, authorTraining, authorState, authorCountry} = this.state
  }

  removeFile = (e) => {
    const {selectedFiles} = this.state;
    this.setState({
      selectedFiles: selectedFiles.filter(file => file.fileid != e.currentTarget.dataset.id)
    })
  }

  /*grabSchOrUni = (schOrUni, schUniNum) => {
    const { ukSchsList, ukUnisList } = this.props;
    if (schOrUni == 'sch') {
      const sch = ukSchsList && ukSchsList.filter(x => {
        return x.value == schUniNum;
      })
      const schName = sch[0] && sch[0].label;
      return schName;

    } else if (schOrUni == 'uni') {
      let uni;
      uni = ukUnisList && ukUnisList.filter(y => {
        return y.value == schUniNum;
      })
      const uniName = uni[0] && uni[0].label;
      return uniName;
    }
  }*/

  handleDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragover: 'dragover'});
  }

  handleDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragover: ''});
  }

  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // changes the mouse cursor to a "+" to show user it's a copy action and active
    this.setState({dragover: 'dragover'});
  }

  handleFileDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragover: ''});
  }

  render() {
    const { text, showEmojis, showCredentials, errorLoadingHashtags, showMaxReachedError, selectedFiles, errorFileSize, errorFileNumber } = this.state;
    const user = {uid: '12345', fname: 'Emma', lname: 'Sullivan'}
    var currYr = new Date().getFullYear()
    const stateProv = 'CA'
    const country = 'USA'
    const roleHistory = [
      {title: 'Marketing Manager', co: 'GE', startDate: '', endDate: '', roledesc: 'I look after everything marketing, whether it is product, price, packaging or promotion - the 4 Ps, just what I learned at Uni.', ismain: true},
      {title: 'Marketing Analyst', co: 'Energy Contract Company', startDate: '2019-01-03T13:30:50.667Z', endDate: '2021-01-01T13:30:50.667Z', roledesc: '', ismain: false}
    ]
    const latestRole = roleHistory && roleHistory.length != 0 && roleHistory.filter(role => role.ismain == true)
    const currRole = roleHistory && roleHistory.length != 0 && latestRole.map(role => role.title)
    const currCo = roleHistory && roleHistory.length != 0 && latestRole.map(role => role.co)
    const roleHistoryNotMain = roleHistory && roleHistory.length != 0 && roleHistory.filter(role => role.ismain != true)
    const uniHistory = [
      {degree: 'Marketing', uniname: '44', uninamefreetext: '', unistartyr: '', unigraduyr: '2017', uniyrgrp: 'pg', unidesc: ''},
      {degree: 'Business', uniname: '', uninamefreetext: 'FreeName University', unistartyr: '2017', unigraduyr: '2020', uniyrgrp: '1', unidesc: ''},
      {degree: 'Business Basics', uniname: '', uninamefreetext: 'Other University', unistartyr: '', unigraduyr: '2017', uniyrgrp: '', unidesc: 'Such a good 4 years of my life!'}
    ]
    const sortedUnis = uniHistory && uniHistory.length != 0 && uniHistory.sort((a, b) => parseFloat(b.unigraduyr) - parseFloat(a.unigraduyr));
    const schHistory = [
      {schname: '', schnamefreetext: 'Thamesmead', schgraduyr: '2002', schyrgrp: '', schdesc: ''},
    ]
    const sortedSchs = schHistory && schHistory.length != 0 && schHistory.sort((a, b) => parseFloat(b.schgraduyr) - parseFloat(a.schgraduyr));
    const currTraining=''
    const currTrainingProvider=''

    return (
      <React.Fragment>
        <form className="fileUploadForm" id="fileUploadForm" onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleFileDrop}>
          <div className="group-detail-item bright">
            <Avatar userID={user.uid} userName={user.fname} isAddHighlight picSize={40}/>
            <div className="textLeft addHighlight-user fontSize14"><strong>{user.fname} {user.lname}</strong></div>
            <div className="textLeft addHighlight-user editCredentialBtn electricPurpleText" onClick={this.editCredential} role="button" >
              Edit Credential
            </div>
            {showCredentials && (
              <div className="credentialPickerContainer" ref={el => (this.credentialsPicker = el)} onKeyDown={this.closeCredentialsOnEsc}>
                <div>Choose post credential</div>
                <div>Help mentees understand your experience with this topic</div>
                <div>
                  <div>Your credentials</div>
                  {roleHistory && roleHistory.length != 0 && (
                    <React.Fragment>
                      {latestRole && (
                        <div>
                          <label className="radioContainer neutralText setPrimary" htmlFor={"job-"+latestRole[0].title}>{latestRole[0].title} at {latestRole[0].co}
                            <input type="radio" id={"job-"+latestRole[0].title} data-authortype="job" data-state={stateProv} data-country={country} data-role={latestRole[0].title} data-inst={latestRole[0].co} defaultChecked name="radio-credentials" onChange={this.handleRadioClick}/>
                            <span className="radioCheckmark"/>
                          </label>
                          <div className="darkGeyText">default</div>
                        </div>
                      )}
                      {roleHistoryNotMain && roleHistoryNotMain.length != 0 && roleHistoryNotMain.map((role) => {
                        let roleName = role.title;
                        let roleCo = role.co;
                        return (
                          <div key={role.title}>
                            <label className="radioContainer neutralText setPrimary" htmlFor={"job-"+roleName}>Worked at {roleCo} as {roleName}
                              <input type="radio" id={"job-"+roleName} data-authortype="job" data-role={roleName} data-state={stateProv} data-country={country} data-inst={roleCo} name="radio-credentials" onChange={this.handleRadioClick}/>
                              <span className="radioCheckmark"/>
                            </label>
                          </div>
                        )
                      })}
                    </React.Fragment>
                  )}
                  {currTraining && currTraining != '' && (
                    <div>
                      <label className="radioContainer neutralText setPrimary" htmlFor={"train-"+currTrainingProvider}>Trained at {currTrainingProvider}
                        <input type="radio" id={"train-"+currTrainingProvider} data-authortype="train" data-state={stateProv} data-country={country} data-training={currTraining} data-inst={currTrainingProvider} defaultChecked={latestRole ? false : true} name="radio-credentials" onChange={this.handleRadioClick}/>
                        <span className="radioCheckmark"/>
                      </label>
                    </div>
                  )}
                  {uniHistory && uniHistory.length != 0 && (
                    <React.Fragment>
                      {sortedUnis && sortedUnis.map((uni) => {
                        {/*const uniInstName = (uni.uniname) ? (this.grabSchOrUni('uni', uni.uniname)) : (uni.uninamefreetext)*/}
                        const uniInstName = (uni.uniname) ? (uni.uniname) : (uni.uninamefreetext)
                        let degree = uni.degree;
                        return (
                          <div key={degree}>
                            <label className="radioContainer neutralText setPrimary" htmlFor={"uni-"+uniInstName}>{uni.unigraduyr <= currYr ? 'Studied' : 'Studying'} {degree} at {uniInstName}
                              <input type="radio" id={"uni-"+uniInstName} data-authortype="uni" data-state={stateProv} data-country={country} data-degree={degree} data-inst={uniInstName} defaultChecked={(latestRole || currTraining) ? false : true} name="radio-credentials" onChange={this.handleRadioClick}/>
                              <span className="radioCheckmark"/>
                            </label>
                          </div>
                        )
                      })}
                    </React.Fragment>
                  )}
                  {schHistory && schHistory.length != 0 && (
                    <React.Fragment>
                      {sortedSchs && sortedSchs.map((sch) => {
                        {/*const schInstName = (sch.schname) ? (this.grabSchOrUni('sch', sch.schname)) : (sch.schnamefreetext)*/}
                        const schInstName = (sch.schname) ? (sch.schname) : (sch.schnamefreetext)
                        return (
                          <div key={schInstName}>
                            <label className="radioContainer neutralText setPrimary" htmlFor={"sch-"+schInstName}>{sch.schgraduyr <= currYr ? 'Studied' : 'Studying'} at {schInstName}
                              <input type="radio" id={"sch-"+schInstName} data-authortype="sch" data-state={stateProv} data-country={country} data-inst={schInstName} defaultChecked={(latestRole || currTraining || sortedUnis) ? false : true} name="radio-credentials" onChange={this.handleRadioClick}/>
                              <span className="radioCheckmark"/>
                            </label>
                          </div>
                        )
                      })}
                    </React.Fragment>
                  )}
                  {stateProv && country && (
                    <div>
                      <label className="radioContainer neutralText setPrimary" htmlFor="none">Lives in {stateProv}, {country}
                        <input type="radio" id="none" data-authortype="none" data-state={stateProv} data-country={country} defaultChecked={(latestRole || currTraining || sortedUnis || sortedSchs) ? false : true} name="radio-credentials" onChange={this.handleRadioClick}/>
                        <span className="radioCheckmark"/>
                      </label>
                    </div>
                  )}
                </div>
                <button type="button" className="modal-close" id="close-credential" aria-labelledby="Close Modal" onClick={this.closeCredentials}>
                  <span className="u-hide-visually">Close</span>
                  <svg className="modal-close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
                </button>
              </div>
            )}
          </div>
          <div id="new-message" className="chatWindow-footer">
            <div className="footer-container">
              <div className="input-box-container addHighlight">
                <div className="input-flexContainer">
                  <div className="textInput-container" id="chatMessageForm">
                    <textarea
                      ref={n => this.addMessageNode = n}
                      className="input-box addHighlight"
                      id="txtInput-box"
                      form="chatMessageForm"
                      value={text}
                      onChange={this.handleMessageChange}
                      placeholder="What would you like to share?"
                      autoComplete="on"
                      autoCorrect="on"
                      spellCheck="true"
                      maxLength="1000"
                      autoFocus
                    />
                    <p className="textLeft" id="notAllowedTextAddHighlight"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {text.length > 0 && (
            <div className="descriptor-br addHighlight">
              {text.length} / 1000
            </div>
          )}
          <div className="fontSize14 marginTop50 textLeft">
            {selectedFiles && selectedFiles.length >= 1 && (
              <div className="paddingR20 paddingL20 marginBottom20 fileBoxesContainer">
                {selectedFiles.map((file, index) => {
                  const fileName = file.name;
                  const fileID = file.fileid
                  let fileType, backgroundImgURL
                  if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/bmp') {
                    fileType = 'img'
                    backgroundImgURL = usercdn + '/' + userImgsFolder + file.imgurl + '-80'
                  } else if (file.type === 'application/pdf') {
                    fileType = 'pdf'
                  } else if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' || file.type === 'application/vnd.ms-excel.sheet.macroEnabled.12' || file.type === 'application/vnd.ms-excel.template.macroEnabled.12' || file.type === 'application/vnd.ms-excel.addin.macroEnabled.12' || file.type === 'application/vnd.ms-excel.sheet.binary.macroEnabled.12') {
                    fileType = 'xls'
                  } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' || file.type === 'application/vnd.ms-word.document.macroEnabled.12' || file.type === 'application/vnd.ms-word.template.macroEnabled.12') {
                    fileType = 'word'
                  } else if (file.type === 'application/mspowerpoint' || file.type === 'application/ms-powerpoint' || file.type === 'application/mspowerpnt' || file.type === 'application/vnd-mspowerpoint' || file.type === 'application/powerpoint' || file.type === 'application/x-powerpoint' || file.type === 'application/vnd.ms-powerpoint' || file.type === 'application/vnd.ms-powerpoint.presentation.macroEnabled.12' || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                    fileType = 'ppt'
                  } else fileType = 'other'

                  return (
                    <div className="fileBox tooltip" key={fileName}>
                      {fileType === 'img' && (
                        <div className="fileBoxImg" style={{backgroundImage: `url(${backgroundImgURL})`}}>
                          <button tabIndex="0" type="button" aria-label="Add or Edit Profile Picture" className="ModalOpenBtn ModalOpenBtn-addPicBtn userMenuPlus" data-id={fileID} onClick={(e) => {this.removeFile(e)}}>
                            <i className="fas fa-times"/>
                          </button>
                        </div>
                      )}
                      {fileType === 'pdf' && (
                        <React.Fragment>
                          <div className="fileIcon-container addHighlight pdf fontSize30">
                            <i className="far fa-file-pdf" />
                          </div>
                          <button tabIndex="0" type="button" aria-label="Add or Edit Profile Picture" className="ModalOpenBtn ModalOpenBtn-addPicBtn userMenuPlus" data-id={fileID} onClick={(e) => {this.removeFile(e)}}>
                            <i className="fas fa-times"/>
                          </button>
                        </React.Fragment>
                      )}
                      {fileType === 'xls' && (
                        <React.Fragment>
                          <div className="fileIcon-container addHighlight xls fontSize30">
                            <i className="far fa-file-excel" />
                          </div>
                          <button tabIndex="0" type="button" aria-label="Add or Edit Profile Picture" className="ModalOpenBtn ModalOpenBtn-addPicBtn userMenuPlus" data-id={fileID} onClick={(e) => {this.removeFile(e)}}>
                            <i className="fas fa-times"/>
                          </button>
                        </React.Fragment>
                      )}
                      {fileType === 'word' && (
                        <React.Fragment>
                          <div className="fileIcon-container addHighlight word fontSize30">
                            <i className="far fa-file-word" />
                          </div>
                          <button tabIndex="0" type="button" aria-label="Add or Edit Profile Picture" className="ModalOpenBtn ModalOpenBtn-addPicBtn userMenuPlus" data-id={fileID} onClick={(e) => {this.removeFile(e)}}>
                            <i className="fas fa-times"/>
                          </button>
                        </React.Fragment>
                      )}
                      {fileType === 'ppt' && (
                        <React.Fragment>
                          <div className="fileIcon-container addHighlight ppt fontSize30">
                            <i className="far fa-file-powerpoint" />
                          </div>
                          <button tabIndex="0" type="button" aria-label="Add or Edit Profile Picture" className="ModalOpenBtn ModalOpenBtn-addPicBtn userMenuPlus" data-id={fileID} onClick={(e) => {this.removeFile(e)}}>
                            <i className="fas fa-times"/>
                          </button>
                        </React.Fragment>
                      )}
                      {fileType === 'other' && (
                        <React.Fragment>
                          <div className="fileIcon-container addHighlight fontSize30">
                            <i className="far fa-file-alt" />
                          </div>
                          <button tabIndex="0" type="button" aria-label="Add or Edit Profile Picture" className="ModalOpenBtn ModalOpenBtn-addPicBtn userMenuPlus" data-id={fileID} onClick={(e) => {this.removeFile(e)}}>
                            <i className="fas fa-times"/>
                          </button>
                        </React.Fragment>
                      )}
                      <span className="tooltiptext chats breakWord">
                        {fileName}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
            {errorFileSize && (
              <div className="paddingR20 paddingL20 marginBottom20 marginTopMinus20 redText">Files need to be under 25MB in size</div>
            )}
            {errorFileNumber && (
              <div className="paddingR20 paddingL20 marginBottom20 marginTopMinus20 redText">Max number of files uploaded is 5</div>
            )}
            <div className="paddingR20 paddingL20">
              <div><span role="img" aria-label="sparkle-emoji">✨</span><strong> Suggested hashtags:</strong></div>
              <div className="form-group">
                <label className="alignLeft darkGreyText noBold reqAsterisk" htmlFor="roleco">
                  Help reach more mentees
                  {showMaxReachedError && (
                    <span className="redText"> (You can only add up to 5)</span>
                  )}
                  {!showMaxReachedError && (
                    <span> (Add up to 5)</span>
                  )}
                </label>
                <div className="autocompleter">
                  <AutocompleteTagsMulti
                    multiple
                    openOnClick
                    showValues
                    showCheckbox
                    handleDone={this.handleDoneClickHobbies}
                    suggestions={hashtagOptions}
                    name='selectHashtag'
                    placeholder='Type Hashtags...'
                    placeholderOnClick="Type Hashtags..."
                    handleChange={this.handleHashtagChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    finMultiOptions={this.finMultiOptions}
                    maxNumValues={5}
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
            </div>
          </div>
          <div className="paddingL20 paddingR20">
            <div className="absolute">
              <input
                type="file"
                id="fileSelectCamera"
                name="selectedFiles"
                className="inputFile addHighlight BlankBtn"
                placeholder="Choose a file..."
                onChange={this.handleChange}
                minsize={0}
                title=""
                required
              />
              <label htmlFor="fileSelectCamera" className="ModalOpenBtn-highlightPicContainer">
                <div type="button" className="picContainer">
                  <i className="fas fa-camera" />
                </div>
              </label>
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
              <input
                type="file"
                id="fileSelect"
                name="selectedFiles"
                className="inputFile addHighlight BlankBtn"
                placeholder="Choose a file..."
                onChange={this.handleChange}
                minsize={0}
                title=""
                required
              />
              <label htmlFor="fileSelect" className="ModalOpenBtn-highlightAttachmentContainer">
                <div type="button" className="attachmentContainer">
                  <i className="fas fa-paperclip" />
                </div>
              </label>
            </div>
            <button className="ModalOpenBtn ModalOpenBtn-postHighlight alignRight" type="button">Post</button>
          </div>
          <div className={"dragover-pane-overlay dragover-pane-overlay-" +this.state.dragover} >
            <div className="animate">
              <div className='topbottom'/>
              <div className='leftright'/>
            </div>
            <div className="dragover-pane-overlay-info">
              <div className="dragover-pane-overlay-pic">
                <div className="dragover-pane-overlay-picFile"/>
              </div>
              <div className="dragover-pane-overlay-title">Upload File(s)</div>
              <div className="dragover-pane-overlay-subtitle">Drop file here to share</div>
            </div>
          </div>
        {/*  <div className="modal-title">
            Create post
          </div>*/}
        </form>
      </React.Fragment>
    )
  }
}

export default AddHighlightModalContent;
