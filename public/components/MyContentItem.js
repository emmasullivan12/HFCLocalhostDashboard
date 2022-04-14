// Dex last merged this code on 14th apr 2022

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Avatar from './Avatar.js';
import {usercdn, userImgsFolder} from './CDN.js';
import {Check, DateCalc, TimeCalc} from './GeneralFunctions.js';
import DeleteContentModalContent from './DeleteContentModalContent.js';
import Modal from './Modal.js';
import UserBadge from './UserBadge.js';
import {getVerifLevelArr, convertHashtags, getCredText} from './UserDetail.js';

import '../css/MyActivity.css';

const DeleteContentModalProps = {
  ariaLabel: 'Confirm content deletion',
  triggerText: 'Delete',
  usedFor: 'deleteContent',
}

class MyContentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userUpvoted: '',
    }
  }

  componentDidMount() {
    const {post} = this.props
    this.countVotes(post.votes)
  }

  onKeyDown = (e) => {
    var key = e.key || e.keyCode
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.closePopup(e);
    }
  }

  countVotes = (votes) => {
    const myID = '123'; //223456
    this.setState({
      votes: votes.length,
      userUpvoted: votes.includes(myID)
    })
  }

  toggleUpvote = (e, postId) => {
    e.preventDefault()
    const currentState = this.state.userUpvoted;

    this.setState(prevState => {
      let newVotes, newIsUpvoted
      if (currentState == false || currentState == undefined) {
        newVotes = prevState.votes + 1
        newIsUpvoted = true
      } else {
        newVotes = prevState.votes - 1
        newIsUpvoted = false
      }

      return {
        userUpvoted: newIsUpvoted,
        votes: newVotes
      }
    })
  }

  togglePopup = (e) => {
    e.preventDefault()
    this.popup.classList.toggle('open');
  }

  closePopup = (e) => {
    e.preventDefault()
    this.popup.classList.remove('open');
  }

  render() {
    const {contentType, post, updatePathName, userRole} = this.props
    const {userUpvoted, votes} = this.state

    let isProspelaTeam, verifiedType, eduemailverif, profemailverif, mentorSUStep, tsapproved, verifTypesArr

    if (userRole == 'mentor') {
      const mentor = {
        verifiedtype: '1',
        eduemailverif: '',
        profemailverif: '',
        mentorsustep: '',
        tsapproved: ''
      }
      isProspelaTeam = false
      verifiedType = mentor.verifiedtype
      eduemailverif = mentor.eduemailverif;
      profemailverif = mentor.profemailverif;
      mentorSUStep = mentor.mentorsustep;
      tsapproved = mentor.tsapproved // THIS IS TIMESTAMP APPROVED THEIR ID / BACKGROUND
      verifTypesArr = getVerifLevelArr(verifiedType, eduemailverif, profemailverif, mentorSUStep, tsapproved, isProspelaTeam)
    }

    const hasMinVerif = userRole == 'mentee' ? false : (verifTypesArr && verifTypesArr.length > 0)
    const hashtagsCommaString = (post.hashtags.length > 0 || post.hashtagsfreetext.length > 0) ? convertHashtags(post.hashtags, post.hashtagsfreetext) : []
    const hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')

  // QUESTIONSnpm
  /*
    datecreated: '2020-09-04T13:30:50.667Z',
    title: 'What is the best thing to wear to an interview?',
    textdetail: 'I know we have to be professional, but would like to stand out if possible.',
    hids: ['1234','1235'], // 2 answers
    industriestopostto: ['2','19'],
    hashtags: ['23','11'],
    hashtagsfreetext: ['my free text hashtag'] */

  // ANSWERS
  /*  hid: '1234',
    uid: '123',
    qids: ['1234'], // relates to 1 question
    datecreated: '2020-09-04T13:30:50.667Z',
    lastupdated: '2020-09-05T19:30:50.667Z',
    text: 'first answer',
    isanon: 0,
    votes: ['12','23'], */
  //  hashtags: ['23','20','1','2','0',],
  //  hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],

    if (contentType == 'question' || contentType == 'following') {
      const hasUnreadAnswers = true

      return (
        <Link to={{pathname: "/questions/" + post.qid + post.url, state: {prevPath: window.location.pathname}}} className="link" onClick={updatePathName}>
          <div className="contentBox withHover padding20">
            <div>
              {post.hids && post.hids.length > 0 && (
                <span className="multiple green">
                  <span className="tickNumSelected">
                    <Check />
                  </span>
                  <span>{post.hids.length} {post.hids.length == 1 ? 'answer' : 'answers'}</span>
                  {hasUnreadAnswers && (
                    <div className="notificationNum isMyContent">New</div>
                  )}
                </span>
              )}
              {post.hids && post.hids.length == 0 && (
                <span className="multiple grey">No answers yet</span>
              )}
              {contentType != 'following' && (
                <React.Fragment>
                  <button type="button" className="msgActions-btn tooltip moreActions alignRight lightGreyText" onClick={this.togglePopup} tabIndex={0} onKeyDown={this.onKeyDown}>
                    <div className="msgAction-icon">
                      <i className="fas fa-ellipsis-h" />
                    </div>
                    <span className="tooltiptext endContentBox groups">More actions</span>
                  </button>
                  <div className="popup" ref={el => (this.popup = el)} >
                    <div className="blocker" onClick={this.closePopup} />
                    <div className="contents right" onClick={this.closePopup}>
                      <div className="myContentMoreActionsContainer">
                        <div className="moreActions-scrollArea">
                          <ul className="moreActionsList">
                            <li onClick={this.closePopup}>
                              <Modal {...DeleteContentModalProps}>
                                <DeleteContentModalContent />
                              </Modal>
                            </li>
                            <li className="moreActionsListItem" onClick={this.closePopup}>
                              <span className="moreActionsLabel overflow-ellipsis">
                                Share
                              </span>
                            </li>
                            <li className="moreActionsListItem" onClick={this.closePopup}>
                              <span className="moreActionsLabel overflow-ellipsis">
                                Report
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="marginTop10 marginBottom10 fontSize16 lineHeight20pc">
              <strong>{post.title}</strong>
            </div>
            {hashtagsArray.length > 0 && (
              <div className="tagsList">
                {hashtagsArray.map((hashtag) => {
                  return (
                    <span
                      key={hashtag}
                      className="multiple value paddingR"
                      id={hashtag}
                    >
                      {hashtag}
                    </span>
                  )
                })}
              </div>
            )}
            <div className="textRight greyText fontSize13"><DateCalc time={post.datecreated} showPureDate /> at <TimeCalc time={post.datecreated} /></div>
            {contentType == 'following' && (
              <div className={"followBtn fontSize13" + (userUpvoted == true ? " electricPurpleText" : " darkGreyText")} onClick={(e) => this.toggleUpvote(e, post.qid)}>
                <button type="button" className={"button-unstyled " + (userUpvoted == true ? "opacity1" : "")}>
                  <span className="paddingR5">
                    {userUpvoted == true && (
                      <i className="fas fa-bell" />
                    )}
                    {userUpvoted != true && (
                      <i className="far fa-bell" />
                    )}
                  </span>
                </button>
                <span className="fontSize13 paddingTop2 noSelect">{userUpvoted == true ? 'Following' : 'Follow'}</span>
              </div>
            )}
          </div>
        </Link>
      );
    } else if (contentType == 'answer' || contentType == 'general') {
      const aCredentialText = getCredText(post.authorinsttype, post.authorrole, post.authorroleishidden, post.authorinst, post.authorinstfreetext, post.authortraining, post.authordegree, post.authorstate, post.authorcountry)
      const error = false

      const FeedItemDetail = () => (
        <div className="contentBox feedItem withHover padding20 positionRel" data-itemid={post.hid} data-itemtype={contentType}>
          <button type="button" className="msgActions-btn tooltip moreActions alignRight lightGreyText" onClick={this.togglePopup} tabIndex={0} onKeyDown={this.onKeyDown}>
            <div className="msgAction-icon">
              <i className="fas fa-ellipsis-h" />
            </div>
            <span className="tooltiptext endContentBox groups">More actions</span>
          </button>
          <div className="popup" ref={el => (this.popup = el)} >
            <div className="blocker" onClick={this.closePopup} />
            <div className="contents right">
              <div className="myContentMoreActionsContainer">
                <div className="moreActions-scrollArea">
                  <ul className="moreActionsList">
                    <li onClick={this.closePopup}>
                      <Modal {...DeleteContentModalProps}>
                        <DeleteContentModalContent />
                      </Modal>
                    </li>
                    <li className="moreActionsListItem" onClick={this.closePopup}>
                      <span className="moreActionsLabel overflow-ellipsis">
                        Share
                      </span>
                    </li>
                    <li className="moreActionsListItem" onClick={this.closePopup}>
                      <span className="moreActionsLabel overflow-ellipsis">
                        Report
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="">
          {/*  <div className="postDetail marginRight20 marginTop10 textRight fontSize13 flexShrink0 width100px darkGreyText">
              <div className="marginBottom5">{post.votes.length} votes</div>
              <div className="marginBottom5">{numViewsFormatted} views</div>
            </div> */}
            <div className="flexGrow1 maxWidth100">
              <div className="gridContainer marginTop10">
                <div className="gridLeftColumn dispInlineBlock verticalAlignMiddle">
                  <Avatar userID={post.uid} isAnon={post.isanon} userName={post.isanon ? 'Anonymous' : post.fname} showAsCircle onFeed picSize={40}/>
                </div>
                <div className="gridRightColumn textLeft whiteSpace fontSize12">
                  <span className="darkGreyText"><strong>{post.isanon ? ("Anonymous" + (hasMinVerif == true ? "" : ", ")) : (post.fname + (post.authorinsttype == 'sch' ? "" : (" " + post.lname)) + (hasMinVerif == true ? "" : ", "))}</strong></span>
                  {hasMinVerif == true && (
                    <span className="tooltip fontSize18">
                      <UserBadge badgeType='pr-certified' />
                      <span className="tooltiptext below profile onFeed textLeft">
                        <strong>Prospela Certified Mentor</strong>
                      </span>
                    </span>
                  )}
                  <div className="darkGreyText">{aCredentialText}</div>
                </div>
              </div>
              <div className="marginTop10 max3Lines greyText marginBottom10" >
                <div className="darkGreyText fontSize13">{post.text}</div>
              </div>
              <div className="fontSize14 textLeft">
                {post.selectedFiles && post.selectedFiles.length >= 1 && (
                  <div className="marginTop20 marginBottom20 fileBoxesContainer">
                    {post.selectedFiles.map((file, index) => {
                      const fileName = file.name;
                      const fileID = file.fileid
                      let fileType, backgroundImgURL, fileurl
                      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/bmp') {
                        fileType = 'img'
                        backgroundImgURL = usercdn + '/' + userImgsFolder + file.imgurl + '-80'
                        fileurl = usercdn + userImgsFolder + file.imgurl + '-o'
                      } else if (file.type === 'application/pdf') {
                        fileType = 'pdf'
                        fileurl = "https://google.com"
                      } else if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' || file.type === 'application/vnd.ms-excel.sheet.macroEnabled.12' || file.type === 'application/vnd.ms-excel.template.macroEnabled.12' || file.type === 'application/vnd.ms-excel.addin.macroEnabled.12' || file.type === 'application/vnd.ms-excel.sheet.binary.macroEnabled.12') {
                        fileType = 'xls'
                        fileurl = "https://google.com"
                      } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' || file.type === 'application/vnd.ms-word.document.macroEnabled.12' || file.type === 'application/vnd.ms-word.template.macroEnabled.12') {
                        fileType = 'word'
                        fileurl = "https://google.com"
                      } else if (file.type === 'application/mspowerpoint' || file.type === 'application/ms-powerpoint' || file.type === 'application/mspowerpnt' || file.type === 'application/vnd-mspowerpoint' || file.type === 'application/powerpoint' || file.type === 'application/x-powerpoint' || file.type === 'application/vnd.ms-powerpoint' || file.type === 'application/vnd.ms-powerpoint.presentation.macroEnabled.12' || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                        fileType = 'ppt'
                        fileurl = "https://google.com"
                      } else {
                        fileType = 'other'
                        fileurl = "https://google.com"
                      }

                      return (
                        <div className="fileBox tooltip" key={fileName} onClick={(e) => {this.openFile(e, fileurl, error)}} >
                          {fileType === 'img' && (
                            <div className="fileBoxImg" style={{backgroundImage: `url(${backgroundImgURL})`}} />
                          )}
                          {fileType === 'pdf' && (
                            <React.Fragment>
                              <div className="fileIcon-container addHighlight pdf fontSize30">
                                <i className="far fa-file-pdf" />
                              </div>
                            </React.Fragment>
                          )}
                          {fileType === 'xls' && (
                            <React.Fragment>
                              <div className="fileIcon-container addHighlight xls fontSize30">
                                <i className="far fa-file-excel" />
                              </div>
                            </React.Fragment>
                          )}
                          {fileType === 'word' && (
                            <React.Fragment>
                              <div className="fileIcon-container addHighlight word fontSize30">
                                <i className="far fa-file-word" />
                              </div>
                            </React.Fragment>
                          )}
                          {fileType === 'ppt' && (
                            <React.Fragment>
                              <div className="fileIcon-container addHighlight ppt fontSize30">
                                <i className="far fa-file-powerpoint" />
                              </div>
                            </React.Fragment>
                          )}
                          {fileType === 'other' && (
                            <React.Fragment>
                              <div className="fileIcon-container addHighlight fontSize30">
                                <i className="far fa-file-alt" />
                              </div>
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
              </div>
              {contentType != 'general' && (
                <div className="fontSize13 lineHeight20pc darkGreyText max1Line marginTop10">
                  Replying to: <strong className="purpleText">{post.title}</strong>
                </div>
              )}
              {contentType == 'general' && (
                <React.Fragment>
                  {hashtagsArray.length > 0 && (
                    <div className="tagsList">
                      {hashtagsArray.map((hashtag) => {
                        return (
                          <span
                            key={hashtag}
                          //  onClick={this.onClickValue}
                            className="multiple value paddingR"
                          //  role="button"
                            id={hashtag}
                          >
                            {hashtag}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </React.Fragment>
              )}
              <div className="fontSize12 absolute displayFlex bottom15 darkGreyText">
                <button type="button" className="button-unstyled">
                  <i className="far fa-thumbs-up"/>
                </button>
                <div className="fontSize14 marginLeft5 paddingTop2 noSelect">{votes && (votes < 1000 ? votes : ((Math.round(votes / 100) / 10) + 'k'))}</div>
              </div>
              <div>
                <div className="marginTop10 textRight greyText fontSize13"><DateCalc time={post.datecreated} showPureDate /> at <TimeCalc time={post.datecreated} /></div>
              </div>
            </div>
          </div>
        </div>
      )

      if (contentType == 'answer') {
        return (
          <Link to={{pathname: "/questions/" + post.relatedqid + post.url, state: {prevPath: window.location.pathname}}} className="link" onClick={updatePathName}>
            <FeedItemDetail />
          </Link>
        )
      } else {
        return (
          <div className="link">
            <FeedItemDetail />
          </div>
        )
      }

    }
  }
}

export default MyContentItem;
