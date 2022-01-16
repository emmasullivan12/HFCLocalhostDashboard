// Last merged this code on 12th jan 2022

import React, { Component } from "react";

import { NimblePicker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import data from 'emoji-mart/data/emojione.json'
import AlertBox from './AlertBox.js';
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import Avatar from './Avatar.js';
import CameraUploadContent from './CameraUploadContent.js';
import {usercdn, userImgsFolder} from './CDN.js';
import {Check} from './GeneralFunctions.js';
import FileUploadContent from './FileUploadContent.js';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import UserName from './UserName.js';
import industryOptions from './Industries.js';
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


class AddHighlightTextBox extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      qText: '',
      showEmojis: false,
      showCredentials: false,
      cursorPos: '', // cursor position to enter emoji within string
      errorLoadingHashtags: '',
      hashtagsFromList: [],
      freeTextHashtags: [],
      endingHashtagsArr: [],
      showMaxReachedError: false,
      dragover: '',
      //credentialChecked: '',
      authorType: '',
      authorInst: '',
      authorInstNum: '',
      authorInstFreeText: '',
      authorRole: '',
      authorIsMainRole: '',
      authorDegree: '',
      authorTraining: '',
      authorState: '',
      authorCountry: '',
      clickedEditCred: false,
      credentialText: '',
    //  credentialUpdatedSuccess: false,
      showCredentialUpdatedMsg: false,
      postSuccess: false,
      industriesToPostTo: [],
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
      isAnon: false,
    };
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
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
  //  document.removeEventListener('click', this.closeCredentials)
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  editCredential = () => {
  //  this.modalOverflowOff()
    this.setState({
      showCredentials: true,
      clickedEditCred: true,
    })
  //  }, () => document.addEventListener('click', this.closeCredentials))
  }

  closeCredentials = (e) => {
  //  if ((this.credentialsPicker !== null && !this.credentialsPicker.contains(e.target)) || e.currentTarget.id == 'close-credential' || e.currentTarget.id == 'close-credential-bkBtn') {
    //  this.modalOverflowOn()
      this.setState({
        showCredentials: false
      }, () => {
        this.setInputBoxHeight()
      })
  //    }, () => document.removeEventListener('click', this.closeCredentials))
  //  }
  }

  /*handleSaveCredential = () => {
    // Don't need to do much here as handleRadioClick has already saved the credential info into authorType, authorRole etc for you to use onSubmit of the post
    this.modalOverflowOn()
    this.setState({
      showCredentials: false
    }, () => document.removeEventListener('click', this.closeCredentials))
  }*/

/*  closeCredentialsOnEsc = (e) => {
    var key = e.key || e.keyCode

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.setState({
        showCredentials: false
      }, () => document.removeEventListener('click', this.closeCredentials))
  //    this.modalOverflowOn()
    } else {
      return;
    }
  }*/

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

  /*resetCredentialUpdated = () => {
    this.setState({
      credentialUpdatedSuccess: false,
    })
  }*/

  handleRadioClick = (e) => {
    this.setState({
      //updatingCredentialIsLoading: true,
      showCredentialUpdatedMsg: true,
    })

    const container = document.querySelector(".credentialPickerContainer");
    const credentialItems = container.querySelectorAll(".credential-item");

    credentialItems.forEach((item) => {
      item.style.backgroundColor = "#fff"
    });

    e.target.closest(".credential-item").style.backgroundColor = "#f2f2f2"

    var authorType = e.target.dataset.authortype
    var authorState = e.target.dataset.state
    var authorCountry = e.target.dataset.country
    let authorInst, authorInstNum, authorInstFreeText, authorRole, authorDegree, authorIsMainRole
    //var credentialChecked = e.target.id
    if (authorType == 'job') {
      authorInstFreeText = e.target.dataset.instfreetext
      authorRole = e.target.dataset.role
      authorIsMainRole = e.target.dataset.ismainrole
      var credentialTextToUse = authorIsMainRole == "true" ? (authorRole + ' at ' + authorInstFreeText) : ('Worked at ' + authorInstFreeText + ' as ' + authorRole)
      this.setState({
        authorType: authorType,
        authorInstFreeText: authorInstFreeText,
        authorInst: '',
        authorInstNum: '',
        authorRole: authorRole,
        authorIsMainRole: authorIsMainRole,
        authorTraining: '',
        authorDegree: '',
        authorState: authorState,
        authorCountry: authorCountry,
        credentialText: credentialTextToUse,
      //  credentialUpdatedSuccess: true,
      //  updatingCredentialIsLoading: false,
      //  credentialChecked: credentialChecked,
    })
    } else if (authorType == 'train') {
      authorInstFreeText = e.target.dataset.instfreetext
      this.setState({
        authorType: authorType,
        authorInstFreeText: authorInstFreeText,
        authorInst: '',
        authorInstNum: '',
        authorRole: '',
        authorIsMainRole: false,
        authorTraining: e.target.dataset.training,
        authorDegree: '',
        authorState: authorState,
        authorCountry: authorCountry,
        credentialText: 'Trained at ' + authorInstFreeText,
      //  credentialUpdatedSuccess: true,
      //  updatingCredentialIsLoading: false,
      //  credentialChecked: credentialChecked,
      })
    } else if (authorType == 'uni') {
      authorInst = e.target.dataset.inst ? e.target.dataset.inst : ''
      authorInstNum = e.target.dataset.instnum ? e.target.dataset.instnum : ''
      authorInstFreeText = e.target.dataset.instfreetext ? e.target.dataset.instfreetext : ''
      authorDegree = e.target.dataset.degree
      this.setState({
        authorType: authorType,
        authorInst: authorInst,
        authorInstNum: authorInstNum,
        authorInstFreeText: authorInstFreeText,
        authorRole: '',
        authorIsMainRole: false,
        authorTraining: '',
        authorDegree: authorDegree,
        authorState: authorState,
        authorCountry: authorCountry,
        credentialText: 'Studied ' + authorDegree + ' at ' + authorInst,
      //  credentialUpdatedSuccess: true,
      //  updatingCredentialIsLoading: false,
      //  credentialChecked: credentialChecked,
      })
    } else if (authorType == 'sch') {
      authorInst = e.target.dataset.inst ? e.target.dataset.inst : ''
      authorInstNum = e.target.dataset.instnum ? e.target.dataset.instnum : ''
      authorInstFreeText = e.target.dataset.instfreetext ? e.target.dataset.instfreetext : ''
      this.setState({
        authorType: authorType,
        authorInst: authorInst,
        authorInstNum: authorInstNum,
        authorInstFreeText: authorInstFreeText,
        authorRole: '',
        authorIsMainRole: false,
        authorTraining: '',
        authorDegree: '',
        authorState: authorState,
        authorCountry: authorCountry,
        credentialText: 'Studied at ' + authorInst,
      //  credentialUpdatedSuccess: true,
      //  updatingCredentialIsLoading: false,
      //  credentialChecked: credentialChecked,
      })
    } else {
      this.setState({
        authorType: authorType,
        authorInst: '',
        authorInstNum: '',
        authorInstFreeText: '',
        authorRole: '',
        authorIsMainRole: false,
        authorTraining: '',
        authorDegree: '',
        authorState: authorState,
        authorCountry: authorCountry,
        credentialText: 'Lives in ' + authorState + ', ' + authorCountry,
      //  credentialUpdatedSuccess: true,
      //  updatingCredentialIsLoading: false,
      //  credentialChecked: credentialChecked,
      })
    }
  }

  getStartingCredText = (roleHistory, latestRole, currTraining, currTrainingProvider, uniHistory, sortedUnis, schHistory, sortedSchs, stateProv, country) => {
    if (roleHistory && roleHistory.length != 0) {
      return latestRole[0].title + ' at ' + latestRole[0].co
    } else if (currTraining != '') {
      return 'Trained at ' + currTrainingProvider
    } else if (uniHistory && uniHistory.length != 0) {
      const uniInst = (sortedUnis[0].uniname) ? (sortedUnis[0].uniname) : (sortedUnis[0].uninamefreetext)
      return 'Studied ' + sortedUnis[0].degree + ' at ' + uniInst
    } else if (schHistory && schHistory.length != 0) {
      const schInst = (sortedSchs[0].schname) ? (sortedSchs[0].schname) : (sortedSchs[0].schnamefreetext)
      return 'Studied at ' + schInst
    } else {
      return 'Lives in ' + stateProv + ', ' + country
    }
  }

  handleMessageChange = (e) => {
    let value = e.target.value;
    this.messageChange(value)
  }

  handleQuestionChange = (e) => {
    let value = e.target.value;

    this.setState({
      qText: value
    })

    this.checkEmailPhoneSharing(value)

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
  }

  modalOverflowOn = () => {
    const {modalID} = this.props
    const modal = document.getElementById(modalID)
    modal.style.overflowY = 'auto'
    var h = window.innerHeight;
    var w = window.innerWidth;
    var onMobile = w <= '500'
    if (h < '732' || onMobile) {
      modal.style.overflowY = 'auto'
    }
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

  messageChange = (value) => {
    this.setState({
      text: value
    })

    this.checkEmailPhoneSharing(value)

    this.setInputBoxHeight()
  }

  onClickAnon = () => {
    const currentState = this.state.isAnon
    this.setState({
      isAnon: !currentState
    })
  }

  handleSubmit = () => {
    const {hashtagsFromList, freeTextHashtags, endingHashtagsArr, authorType, authorInst, authorInstNum, authorInstFreeText, authorRole, authorIsMainRole, authorDegree, authorTraining, authorState, authorCountry, industriesToPostTo} = this.state
    this.setState({
      postSuccess: true
    })

    if (authorType == '') {
      const roleHistory = [
        {title: 'Marketing Manager', co: 'GE', startDate: '', endDate: '', roledesc: 'I look after everything marketing, whether it is product, price, packaging or promotion - the 4 Ps, just what I learned at Uni.', ismain: true},
        {title: 'Marketing Analyst', co: 'Energy Contract Company', startDate: '2019-01-03T13:30:50.667Z', endDate: '2021-01-01T13:30:50.667Z', roledesc: '', ismain: false}
      ]
      const currTraining = ''
      const uniHistory = [
        {degree: 'Marketing', uniname: '44', uninamefreetext: '', unistartyr: '', unigraduyr: '2017', uniyrgrp: 'pg', unidesc: ''},
        {degree: 'Business', uniname: '', uninamefreetext: 'FreeName University', unistartyr: '2017', unigraduyr: '2020', uniyrgrp: '1', unidesc: ''},
        {degree: 'Business Basics', uniname: '', uninamefreetext: 'Other University', unistartyr: '', unigraduyr: '2017', uniyrgrp: '', unidesc: 'Such a good 4 years of my life!'}
      ]
      const schHistory = [
        {schname: '', schnamefreetext: 'Thamesmead', schgraduyr: '2002', schyrgrp: '', schdesc: ''},
        {schname: '', schnamefreetext: 'Strodes', schgraduyr: '2000', schyrgrp: '', schdesc: ''},
      ]

      // Set initial authorType/isMainRole
      if (roleHistory && roleHistory.length != 0) {
        this.setState({
          authorType: 'job',
          authorIsMainRole: true,
        })
      } else if (currTraining != '') {
        this.setState({
          authorType: 'train',
          authorIsMainRole: false
        })
      } else if (uniHistory && uniHistory.length != 0) {
        this.setState({
          authorType: 'uni',
          authorIsMainRole: false
        })
      } else if (schHistory && schHistory.length != 0) {
        this.setState({
          authorType: 'sch',
          authorIsMainRole: false
        })
      } else {
        this.setState({
          authorType: 'none',
          authorIsMainRole: false
        })
      }
    }
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

  handleIndChange = (userInput) => {
    let newArray

    newArray = industryOptions
      .filter(industry => userInput.includes(industry.label))
      .map(value => value.value)

    this.setState({
      industriesToPostTo: newArray,
    })
  }

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

  canBeSubmitted() {
    const {selectedFiles, errorFileSize, errorFileNumber, industriesToPostTo, text, qText, endingHashtagsArr, showMaxReachedError} = this.state;
    const {isMenteeQ} = this.props
    console.log("selectedFiles.length: "+ selectedFiles.length)
    console.log((!isMenteeQ && errorFileSize == false && errorFileNumber == false))
    console.log(!isMenteeQ)
    console.log((errorFileSize == false))
    console.log((errorFileNumber == false))
    console.log((selectedFiles.length > 0 ? (!isMenteeQ && errorFileSize == false && errorFileNumber == false) : true))

    return (
      ((selectedFiles.length > 0 ? (!isMenteeQ && errorFileSize == false && errorFileNumber == false) : true) && (industriesToPostTo.length > 0) && (isMenteeQ == true ? (qText.length >= 10 && qText.length <= 200 && text.length <= 2000) : (text.length != 0 && text.length <= 2000)) &&
      (endingHashtagsArr.length > 0 && showMaxReachedError != true))
    );
  }

  render() {
    const {
      text,
      qText,
      showEmojis,
      showCredentials,
      credentialText,
    //  credentialUpdatedSuccess,
    //  updatingCredentialIsLoading,
      showCredentialUpdatedMsg,
    //  credentialChecked,
      errorLoadingHashtags,
      showMaxReachedError,
      selectedFiles,
      errorFileSize,
      errorFileNumber,
      isAnon,
      authorType,
      authorIsMainRole,
      authorInst,
      authorInstFreeText,
      authorRole,
      authorTraining,
      authorDegree,
      clickedEditCred,
      postSuccess,
      industriesToPostTo,
      endingHashtagsArr,
      /*stateProv,
      country,
      roleHistory,
      latestRole,
      currRole,
      currCo,
      roleHistoryNotMain,
      uniHistory,
      sortedUnis,
      schHistory,
      sortedSchs,
      currTraining,
      currTrainingProvider*/
    } = this.state;
    const {isMenteeQ} = this.props
    const user = {uid: '12345', fname: 'Emma', lname: 'Sullivan'}
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
    const sortedUnis = uniHistory && uniHistory.length != 0 && uniHistory.sort((a, b) => parseFloat(b.unigraduyr) - parseFloat(a.unigraduyr))
    const schHistory = [
      {schname: '', schnamefreetext: 'Thamesmead', schgraduyr: '2002', schyrgrp: '', schdesc: ''},
      {schname: '', schnamefreetext: 'Strodes', schgraduyr: '2000', schyrgrp: '', schdesc: ''},
    ]
    const sortedSchs = schHistory && schHistory.length != 0 && schHistory.sort((a, b) => parseFloat(b.schgraduyr) - parseFloat(a.schgraduyr))
    const currTraining = ''
    const currTrainingProvider = ''
    var currYr = new Date().getFullYear()
    const startingCredentialPreviewText = this.getStartingCredText(roleHistory, latestRole, currTraining, currTrainingProvider, uniHistory, sortedUnis, schHistory, sortedSchs, stateProv, country)
    const industryGroups = [
      ...industryOptions,
      {value: '', label: 'Other', iconFA: 'fas fa-hashtag', isTitle: true},
      {value: '99999', label: 'General Advice', checkbox: true, isTitle: false, fa: 'fas fa-hashtag'},
    ]
    const isEnabled = this.canBeSubmitted();

    if (!showCredentials && !postSuccess) {
      return (
        <form className="fileUploadForm" id="fileUploadForm" onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleFileDrop}>
          {isMenteeQ == true && (
            <div className="modal-title">
              Ask a public question
            </div>
          )}
          <div className="group-detail-item bright marginTop20">
            <Avatar userID={user.uid} isAnon={isAnon} userName={isAnon ? 'Anonymous' : user.fname} showAsCircle isAddHighlight picSize={40}/>
            <div className="textLeft addHighlight-user fontSize14"><strong>{isAnon ? "" : (user.fname + " " + user.lname)}</strong><span className="darkGreyText">{credentialText == '' ? (clickedEditCred == false ? '' : ((isAnon ? "" : ", ") + startingCredentialPreviewText)) : ((isAnon ? "" : ", ") + credentialText)}</span></div>
            <div className="textLeft addHighlight-user editCredentialBtn electricPurpleText" onClick={this.editCredential} role="button" >
              Edit Credential
            </div>
          {/*  {showCredentials && (
              <div className="credentialPickerContainer textLeft paddingR20 paddingL20" ref={el => (this.credentialsPicker = el)} onKeyDown={this.closeCredentialsOnEsc}>
                <div className="marginBottom20 marginTop40">
                  <div className="paddingR20 paddingL20 marginBottom20 marginTop20 fontSize18"><strong>Choose post credential</strong></div>
                  <div className="paddingR20 paddingL20 marginTopMinus15 darkGreyText">Help mentees understand your experience with this topic</div>
                  {updatingCredentialIsLoading == false && credentialUpdatedSuccess == true && (
                    <AlertBox successOrFailure='success' fadesOut positionAbove>
                      <div>	&#10003; Your credential has been saved</div>
                    </AlertBox>
                  )}
                  <div className="credentialsContainer paddingR20 paddingL20 marginBottom20 marginTop20">
                    <div className="uppercase fontSize10 paddingBtm">Your credentials</div>
                    {roleHistory && roleHistory.length != 0 && (
                      <React.Fragment>
                        {latestRole && (
                          <div className="credential-item">
                            <label className="radioContainer setPrimary overflow-ellipsis" htmlFor={"job-"+latestRole[0].title}>
                              <input type="radio" id={"job-"+latestRole[0].title} data-authortype="job" data-state={stateProv} data-country={country} data-ismainrole data-role={latestRole[0].title} data-inst={latestRole[0].co} defaultChecked name="radio-credentials" onChange={this.handleRadioClick}/>
                              <span className="credential-text">{latestRole[0].title} at {latestRole[0].co}</span>
                              <span className="radioCheckmark"/>
                            </label>
                            <span className="defaultCredential neutralText tooltip">
                              default
                              <span className="tooltiptext updateCredential">
                                This will be the credential that appears by default on your answers / posts
                              </span>
                            </span>
                          </div>
                        )}
                        {roleHistoryNotMain && roleHistoryNotMain.length != 0 && roleHistoryNotMain.map((role) => {
                          let roleName = role.title;
                          let roleCo = role.co;
                          return (
                            <div className="credential-item" key={roleName}>
                              <label className="radioContainer setPrimary overflow-ellipsis" htmlFor={"job-"+roleName+roleCo}>
                                <input type="radio" id={"job-"+roleName+roleCo} data-authortype="job" data-role={roleName} data-state={stateProv} data-country={country} data-ismainrole={false} data-inst={roleCo} name="radio-credentials" onChange={this.handleRadioClick}/>
                                <span className="credential-text">Worked at {roleCo} as {roleName}</span>
                                <span className="radioCheckmark"/>
                              </label>
                            </div>
                          )
                        })}
                      </React.Fragment>
                    )}
                    {currTraining && currTraining != '' && (
                      <div className="credential-item">
                        <label className="radioContainer setPrimary overflow-ellipsis" htmlFor={"train-"+currTrainingProvider+currTraining}>
                          <input type="radio" id={"train-"+currTrainingProvider+currTraining} data-authortype="train" data-state={stateProv} data-country={country} data-training={currTraining} data-inst={currTrainingProvider} defaultChecked={latestRole ? false : true} name="radio-credentials" onChange={this.handleRadioClick}/>
                          <span className="credential-text">Trained at {currTrainingProvider}</span>
                          <span className="radioCheckmark"/>
                        </label>
                        {(roleHistory == null || (roleHistory && roleHistory.length < 1)) && (
                          <span className="defaultCredential neutralText tooltip">
                            default
                            <span className="tooltiptext updateCredential">
                              This will be the credential that appears by default on your answers / posts
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                    {uniHistory && uniHistory.length != 0 && (
                      <React.Fragment>
                        {sortedUnis && sortedUnis.map((uni, index) => { */}
                          {/*const uniInstName = (uni.uniname) ? (this.grabSchOrUni('uni', uni.uniname)) : (uni.uninamefreetext)*/}
                      {/*}    const uniInstName = (uni.uniname) ? (uni.uniname) : (uni.uninamefreetext)
                          let degree = uni.degree;
                          return (
                            <div className="credential-item" key={degree}>
                              <label className="radioContainer setPrimary overflow-ellipsis" htmlFor={"uni-"+uniInstName+degree}>
                                <input type="radio" id={"uni-"+uniInstName+degree} data-authortype="uni" data-state={stateProv} data-country={country} data-degree={degree} data-inst={uniInstName} defaultChecked={(latestRole || currTraining || index != 0) ? false : true} name="radio-credentials" onChange={this.handleRadioClick}/>
                                <span className="credential-text">{uni.unigraduyr <= currYr ? 'Studied' : 'Studying'} {degree} at {uniInstName}</span>
                                <span className="radioCheckmark"/>
                              </label>
                              {((roleHistory == null || (roleHistory && roleHistory.length < 1)) && currTraining == '' && index == 0) && (
                                <span className="defaultCredential neutralText tooltip">
                                  default
                                  <span className="tooltiptext updateCredential">
                                    This will be the credential that appears by default on your answers / posts
                                  </span>
                                </span>
                              )}
                            </div>
                          )
                        })}
                      </React.Fragment>
                    )}
                    {schHistory && schHistory.length != 0 && (
                      <React.Fragment>
                        {sortedSchs && sortedSchs.map((sch, index) => { */}
                          {/*const schInstName = (sch.schname) ? (this.grabSchOrUni('sch', sch.schname)) : (sch.schnamefreetext)*/}
                        {/*}  const schInstName = (sch.schname) ? (sch.schname) : (sch.schnamefreetext)
                          return (
                            <div className="credential-item" key={schInstName}>
                              <label className="radioContainer setPrimary overflow-ellipsis" htmlFor={"sch-"+schInstName}>
                                <input type="radio" id={"sch-"+schInstName} data-authortype="sch" data-state={stateProv} data-country={country} data-inst={schInstName} defaultChecked={(latestRole || currTraining || sortedUnis || index != 0) ? false : true} name="radio-credentials" onChange={this.handleRadioClick}/>
                                <span className="credential-text">{sch.schgraduyr <= currYr ? 'Studied' : 'Studying'} at {schInstName}</span>
                                <span className="radioCheckmark"/>
                              </label>
                              {((roleHistory == null || (roleHistory && roleHistory.length < 1)) && currTraining == '' && (uniHistory == null || (uniHistory && uniHistory.length < 1)) && index == 0) && (
                                <span className="defaultCredential neutralText tooltip">
                                  default
                                  <span className="tooltiptext updateCredential">
                                    This will be the credential that appears by default on your answers / posts
                                  </span>
                                </span>
                              )}
                            </div>
                          )
                        })}
                      </React.Fragment>
                    )}
                    {stateProv && country && (
                      <div className="credential-item">
                        <label className="radioContainer setPrimary overflow-ellipsis" htmlFor="none">
                          <input type="radio" id="none" data-authortype="none" data-state={stateProv} data-country={country} defaultChecked={(latestRole || currTraining || sortedUnis || sortedSchs) ? false : true} name="radio-credentials" onChange={this.handleRadioClick}/>
                          <span className="credential-text">Lives in {stateProv}, {country}</span>
                          <span className="radioCheckmark"/>
                        </label>
                        {((roleHistory == null || (roleHistory && roleHistory.length < 1)) && currTraining == '' && (uniHistory == null || (uniHistory && uniHistory.length < 1)) && (schHistory == null || (schHistory && schHistory.length < 1))) && (
                          <span className="defaultCredential neutralText tooltip">
                            default
                            <span className="tooltiptext updateCredential">
                              This will be the credential that appears by default on your answers / posts
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="italic paddingR20 paddingL20">You can add or edit your credentials from your Profile</div> */}
                {/*}  <button className="ModalOpenBtn ModalOpenBtn-postHighlight alignRight marginBottom20" type="button" onClick={this.handleSaveCredential}>Save</button>*/}
                {/*}  <div>
                    <div className="crerdentialPreviewTitle">Preview</div>
                    <div className="credentialPreviewContainer">
                      <div className="dispInlineBlock verticalAlignMiddle"><Avatar userID={user.uid} userName={user.fname} showAsCircle picSize={360}/></div>
                      <div className="dispInlineBlock verticalAlignMiddle">
                        <span className="fontSize12"><strong>{user.fname} {user.lname}</strong>, <span className="darkGreyText">{credentialText}</span></span>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="modal-close" id="close-credential" aria-labelledby="Close Modal" onClick={this.closeCredentials}>
                    <span className="u-hide-visually">Close</span>
                    <svg className="modal-close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
                  </button>
                </div>
              </div>
            )} */}
          </div>
          {isMenteeQ == true && (
            <div className="footer-container marginTop20 marginBottom10">
              <label className="descriptor alignLeft reqAsterisk">Question</label>
              <TextInput
                className="form-control-std addHighlight"
                id="new-question"
                form="chatMessageForm"
                value={qText}
                handleChange={this.handleQuestionChange}
                onBlur={this.onBlur}
                placeholder="Be specific. Start with 'What', 'How', 'Why', etc."
                autoComplete="on"
                autoCorrect="on"
                spellCheck="true"
                minLength="10"
                maxLength="200"
                required
                focusOnLoad
              />
              {qText.length > 0 && (
                <div className="descriptor-br addHighlight noMarginR marginTopMinus15">
                  {qText.length} / 200 (Min 10 characters)
                </div>
              )}
            </div>
          )}
          <div id="new-message" className="addHighlight-footer">
            <div className="footer-container">
              {isMenteeQ == true && (
                <div className="descriptor">Detail <i className="greyText">(optional)</i></div>
              )}
              <div className={"input-box-container" + (isMenteeQ == true ? "" : " addHighlight")}>
                <div className="input-flexContainer">
                  <div className="textInput-container" id="chatMessageForm">
                    <textarea
                      ref={n => this.addMessageNode = n}
                      className={"input-box addHighlight" + (isMenteeQ == true ? " showLargeBox" : "")}
                      id="txtInput-box"
                      form="chatMessageForm"
                      value={text}
                      onChange={this.handleMessageChange}
                      placeholder={isMenteeQ == true ? 'Describe a little more detail if needed' : "What would you like to share?"}
                      autoComplete="on"
                      autoCorrect="on"
                      spellCheck="true"
                      maxLength="2000"
                      autoFocus={isMenteeQ != true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {text.length > 0 && (
            <div className="descriptor-br addHighlight">
              {text.length} / 2000
            </div>
          )}
          <p className="footer-container textLeft" id="notAllowedTextAddHighlight"/>
          <div className={"fontSize14 textLeft" + (isMenteeQ != true ? " marginTop50" : " marginTop35")}>
            {isMenteeQ != true && selectedFiles && selectedFiles.length >= 1 && (
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
            {isMenteeQ != true && errorFileSize && (
              <div className="paddingR20 paddingL20 marginBottom20 marginTopMinus20 redText">Files need to be under 25MB in size</div>
            )}
            {isMenteeQ != true && errorFileNumber && (
              <div className="paddingR20 paddingL20 marginBottom20 marginTopMinus20 redText">Max number of files uploaded is 5</div>
            )}
            <div className="paddingR20 paddingL20">
              <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-startdate"><span role="img" aria-label="box-emoji">📦</span> <strong>Posting to:</strong></label>
              <div className="inlineForm">
                <div className="form-group inlineLeft textLeft postToGroupContainer">
                  <SelectBox
                    multiple
                    options={industryGroups}
                    name='selectInd'
                    placeholder='Select group(s):'
                    handleChange={this.handleIndChange}
                    handleFocus={this.handleFocus}
                    onBlur={this.handleBlur}
              //      defaultChecked={industriesToPostTo}
              //      handleTabPress={this.handleTabPress}
              //      focusOnLoad
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    showIcon
                    iconToShow='iconFA'
                    showCheckbox
                    showBubbleVersion
                    required
                  />
                </div>
              </div>
            </div>
            <div className="paddingR20 paddingL20 descriptor">
              <div><span role="img" aria-label="sparkle-emoji">✨</span><strong> Suggested hashtags:</strong></div>
              <div className="form-group">
                <label className="alignLeft darkGreyText noBold reqAsterisk" htmlFor="roleco">
                  {isMenteeQ == true ? 'Help your question reach more employees' : 'Help reach more mentees'}
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
                    defaultChecked={endingHashtagsArr}
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
              {isMenteeQ != true && (
                <React.Fragment>
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
                </React.Fragment>
              )}
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
              {isMenteeQ != true && (
                <React.Fragment>
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
                </React.Fragment>
              )}
            </div>
            <button className="ModalOpenBtn ModalOpenBtn-postHighlight alignRight" type="button" disabled={!isEnabled} onClick={this.handleSubmit}>Post</button>
          </div>
          {isMenteeQ != true && (
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
          )}
        {/*  <div className="modal-title">
            Create post
          </div>*/}
        </form>
      )
    } else if (!showCredentials && postSuccess) {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon tada-emoji successBox" />
            {isMenteeQ == true ? 'You posted a question!' : 'You posted a highlight!'}
          </div>
        {/*  <div className="success-container">
            <div className="ideas-Title">
              Thanks for letting us know why this wasn&#39;t such a great match for you. We&#39;ll try to do better next time!
            </div>
          </div>*/}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <div id="close-credential-bkBtn" className="paddingL20 textLeft electricPurpleText" onClick={this.closeCredentials}><i className="fas fa-arrow-left"/> Back to Post</div>
          <div className="credentialPickerContainer textLeft paddingR20 paddingL20" ref={el => (this.credentialsPicker = el)}>
            <div className="marginBottom20 marginTop40">
              <div className="marginBottom20 marginTop20 fontSize18"><strong>Choose post credential</strong></div>
              <div className="marginTopMinus15 darkGreyText">{isMenteeQ == true ? 'Help real employees know where you\'re coming from to get the best advice' : 'Help mentees understand your experience with this topic'}</div>
            {/*}  {updatingCredentialIsLoading == false && credentialUpdatedSuccess == true && (
                <AlertBox successOrFailure='success' fadesOut positionAtTop>
                  <div>	&#10003; Your credential has been saved</div>
                </AlertBox>
              )}*/}
              {showCredentialUpdatedMsg == true && (
                <AlertBox successOrFailure='success' fadesOut positionAtTop>
                  <div>	&#10003; Your credential has been saved</div>
                </AlertBox>
              )}
              <div className="credentialsContainer marginBottom20 marginTop20">
                <div className="uppercase fontSize10 paddingBtm">Your credentials</div>
                {roleHistory && roleHistory.length != 0 && (
                  <React.Fragment>
                    {latestRole && (
                      <div className="credential-item">
                        <label className="radioContainer setPrimary overflow-ellipsis" htmlFor={"job-"+latestRole[0].title}>
                          <input type="radio" id={"job-"+latestRole[0].title} data-authortype="job" data-state={stateProv} data-country={country} data-ismainrole data-role={latestRole[0].title} data-instfreetext={latestRole[0].co} defaultChecked={(authorType == '' || (authorType == 'job' && authorIsMainRole == "true")) ? true : false} name="radio-credentials" onChange={this.handleRadioClick}/>
                          <span className="credential-text">{latestRole[0].title} at {latestRole[0].co}</span>
                          <span className="radioCheckmark"/>
                        </label>
                        <span className="defaultCredential neutralText tooltip">
                          default
                          <span className="tooltiptext updateCredential">
                            This will be the credential that appears by default on your {isMenteeQ == true ? 'questions' : 'answers'} / posts
                          </span>
                        </span>
                      </div>
                    )}
                    {roleHistoryNotMain && roleHistoryNotMain.length != 0 && roleHistoryNotMain.map((role) => {
                      let roleName = role.title;
                      let roleCo = role.co;
                      return (
                        <div className="credential-item" key={roleName}>
                          <label className="radioContainer setPrimary overflow-ellipsis" htmlFor={"job-"+roleName+roleCo}>
                            <input type="radio" id={"job-"+roleName+roleCo} data-authortype="job" data-role={roleName} data-state={stateProv} data-country={country} data-ismainrole={false} data-instfreetext={roleCo} defaultChecked={(authorType == 'job' && authorIsMainRole == "false" && authorRole == roleName && authorInstFreeText == roleCo) ? true : false} name="radio-credentials" onChange={this.handleRadioClick}/>
                            <span className="credential-text">Worked at {roleCo} as {roleName}</span>
                            <span className="radioCheckmark"/>
                          </label>
                        </div>
                      )
                    })}
                  </React.Fragment>
                )}
                {currTraining && currTraining != '' && (
                  <div className="credential-item">
                    <label className="radioContainer setPrimary overflow-ellipsis" htmlFor={"train-"+currTrainingProvider+currTraining}>
                      <input type="radio" id={"train-"+currTrainingProvider+currTraining} data-authortype="train" data-state={stateProv} data-country={country} data-training={currTraining} data-instfreetext={currTrainingProvider} defaultChecked={authorType == '' ? (latestRole ? false : true) : (authorType == 'train' && authorTraining == currTraining && authorInstFreeText == currTrainingProvider)} name="radio-credentials" onChange={this.handleRadioClick}/>
                      <span className="credential-text">Trained at {currTrainingProvider}</span>
                      <span className="radioCheckmark"/>
                    </label>
                    {(roleHistory == null || (roleHistory && roleHistory.length < 1)) && (
                      <span className="defaultCredential neutralText tooltip">
                        default
                        <span className="tooltiptext updateCredential">
                          This will be the credential that appears by default on your {isMenteeQ == true ? 'questions' : 'answers'} / posts
                        </span>
                      </span>
                    )}
                  </div>
                )}
                {uniHistory && uniHistory.length != 0 && (
                  <React.Fragment>
                    {sortedUnis && sortedUnis.map((uni, index) => {
                      {/*const uniInstName = (uni.uniname) ? (this.grabSchOrUni('uni', uni.uniname)) : (uni.uninamefreetext)*/}
                      const uniInstName = (uni.uniname) ? (uni.uniname) : (uni.uninamefreetext)
                      let degree = uni.degree;
                      return (
                        <div className="credential-item" key={degree}>
                          <label className="radioContainer setPrimary overflow-ellipsis" htmlFor={"uni-"+uniInstName+degree}>
                            <input type="radio" id={"uni-"+uniInstName+degree} data-authortype="uni" data-state={stateProv} data-country={country} data-degree={degree} data-instnum={uni.uniname ? uni.uniname : ''} data-inst={uni.uniname ? uniInstName : ''} data-instfreetext={uni.uniname ? '' : uniInstName} defaultChecked={authorType == '' ? ((latestRole || currTraining || index != 0) ? false : true) : (authorType == 'uni' && authorDegree == degree && (authorInst == uniInstName || authorInstFreeText == uniInstName))} name="radio-credentials" onChange={this.handleRadioClick}/>
                            <span className="credential-text">{uni.unigraduyr <= currYr ? 'Studied' : 'Studying'} {degree} at {uniInstName}</span>
                            <span className="radioCheckmark"/>
                          </label>
                          {((roleHistory == null || (roleHistory && roleHistory.length < 1)) && currTraining == '' && index == 0) && (
                            <span className="defaultCredential neutralText tooltip">
                              default
                              <span className="tooltiptext updateCredential">
                                This will be the credential that appears by default on your {isMenteeQ == true ? 'questions' : 'answers'} / posts
                              </span>
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </React.Fragment>
                )}
                {schHistory && schHistory.length != 0 && (
                  <React.Fragment>
                    {sortedSchs && sortedSchs.map((sch, index) => {
                      {/*const schInstName = (sch.schname) ? (this.grabSchOrUni('sch', sch.schname)) : (sch.schnamefreetext)*/}
                      const schInstName = (sch.schname) ? (sch.schname) : (sch.schnamefreetext)
                      return (
                        <div className="credential-item" key={schInstName}>
                          <label className="radioContainer setPrimary overflow-ellipsis" htmlFor={"sch-"+schInstName}>
                            <input type="radio" id={"sch-"+schInstName} data-authortype="sch" data-state={stateProv} data-country={country} data-instnum={sch.schname ? sch.schname : ''} data-inst={sch.schname ? schInstName : ''} data-instfreetext={sch.schname ? '' : schInstName} defaultChecked={authorType == '' ? ((latestRole || currTraining || sortedUnis || index != 0) ? false : true) : (authorType == 'sch' && (authorInst == schInstName || authorInstFreeText == schInstName))} name="radio-credentials" onChange={this.handleRadioClick}/>
                            <span className="credential-text">{sch.schgraduyr <= currYr ? 'Studied' : 'Studying'} at {schInstName}</span>
                            <span className="radioCheckmark"/>
                          </label>
                          {((roleHistory == null || (roleHistory && roleHistory.length < 1)) && currTraining == '' && (uniHistory == null || (uniHistory && uniHistory.length < 1)) && index == 0) && (
                            <span className="defaultCredential neutralText tooltip">
                              default
                              <span className="tooltiptext updateCredential">
                                This will be the credential that appears by default on your {isMenteeQ == true ? 'questions' : 'answers'} / posts
                              </span>
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </React.Fragment>
                )}
                {stateProv && country && (
                  <div className="credential-item">
                    <label className="radioContainer setPrimary overflow-ellipsis" htmlFor="none">
                      <input type="radio" id="none" data-authortype="none" data-state={stateProv} data-country={country} defaultChecked={authorType == '' ? ((latestRole || currTraining || sortedUnis || sortedSchs) ? false : true) : authorType == 'none'} name="radio-credentials" onChange={this.handleRadioClick}/>
                      <span className="credential-text">Lives in {stateProv}, {country}</span>
                      <span className="radioCheckmark"/>
                    </label>
                    {((roleHistory == null || (roleHistory && roleHistory.length < 1)) && currTraining == '' && (uniHistory == null || (uniHistory && uniHistory.length < 1)) && (schHistory == null || (schHistory && schHistory.length < 1))) && (
                      <span className="defaultCredential neutralText tooltip">
                        default
                        <span className="tooltiptext updateCredential">
                          This will be the credential that appears by default on your {isMenteeQ == true ? 'questions' : 'answers'} / posts
                        </span>
                      </span>
                    )}
                  </div>
                )}
                <div className="marginTop20 marginBottom20 fullWidth">
                  <div className={"lightGreyText fontSize13 anonOption" + (isAnon ? " selectedCheckbox" : "")} onClick={this.onClickAnon}>
                    <span className="checkbox">
                      <Check />
                    </span>
                    <span className="checkboxText overflow-ellipsis">
                      Add Anonymously
                    </span>
                  </div>
                </div>
              </div>
              <div className="italic">You can add or edit your credentials from your Profile</div>
            {/*}  <button className="ModalOpenBtn ModalOpenBtn-postHighlight alignRight marginBottom20" type="button" onClick={this.handleSaveCredential}>Save</button>*/}
              <div className="previewSuperContainer">
                <div className="crerdentialPreviewTitle">Preview</div>
                <div className="credentialPreviewContainer">
                  <div className="dispInlineBlock verticalAlignMiddle">
                    <Avatar userID={user.uid} isAnon={isAnon} userName={isAnon ? 'Anonymous' : user.fname} showAsCircle picSize={360}/>
                  </div>
                  <div className="credDetail dispInlineBlock verticalAlignMiddle">
                    <span className="fontSize12"><strong>{isAnon ? "" : (user.fname + " " + user.lname + ", ")}</strong><span className="darkGreyText">{credentialText == '' ? startingCredentialPreviewText : credentialText}</span></span>
                  </div>
                </div>
              </div>
              <button type="button" className="modal-close" id="close-credential" aria-labelledby="Close Modal" onClick={this.closeCredentials}>
                <span className="u-hide-visually">Close</span>
                <svg className="modal-close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
              </button>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default AddHighlightTextBox;
