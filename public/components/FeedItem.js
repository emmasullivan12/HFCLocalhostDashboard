// Dex last merged this code on 29th mar 2023

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddComment from './AddComment.js';
import Avatar from './Avatar.js';
import {usercdn, userImgsFolder} from './CDN.js';
import {Check, DateCalc, TimeCalc, checkMobile} from './GeneralFunctions.js';
import DeleteContentModalContent from './DeleteContentModalContent.js';
import FullPageModal from './FullPageModal.js';
import MenteeProfileContent from './MenteeProfileContent.js';
import MentorProfileContent from './MentorProfileContent.js';
import Modal from './Modal.js';
import PrAddMessage from "./PrAddMessage";
import QAThreads from './QAThreads.js';
import UserBadge from './UserBadge.js';
import TextParser from './TextParser.js';
import {getIndustryDeets, getVerifLevelArr, convertHashtags, getCredText} from './UserDetail.js';

import '../css/MyActivity.css';

const GeneralPostModalProps = {
  ariaLabel: 'View General Post',
  triggerText: 'View General Post',
  usedFor: 'GeneralPost',
  hideTrigger: true,
  changeInitFocus: true
}

const MenteeProfileUsrNameModalProps = {
  ariaLabel: 'View Mentee Profile',
  usedFor: 'mentee-profile-feedItem',
  backBtn: 'arrow'
}

const MentorProfileUsrNameModalProps = {
  ariaLabel: 'View Mentor Profile',
  usedFor: 'mentor-profile-feedItem',
  backBtn: 'arrow'
}

const DeleteContentModalProps = {
  ariaLabel: 'Confirm content deletion',
  triggerText: 'Delete',
  usedFor: 'deleteContent',
}

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextClamped: '',
      userUpvoted: '',
      showGeneralPostModal: false,
    }
    this.textItemRef = React.createRef();
  }

  componentDidMount() {
    const {post} = this.props
    this.checkIfTextClamped()
    this.countVotes(post.votes)
    window.addEventListener('resize', this.checkIfTextClamped);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkIfTextClamped);
  }

  showModal = (e, modalType) => {
    if (e.target.dataset.label == 'ignoreOpenModal' || e.currentTarget.dataset.label == 'ignoreOpenModal') {return}

    this.setState({
      ["show"+modalType+"Modal"]: true,
    });
  }

  closeModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: false,
    });
  }

  countVotes = (votes) => {
    const myID = '123'; //223456
    this.setState({
      votes: votes.length,
      userUpvoted: votes.includes(myID)
    })
  }

  checkIfTextClamped = () => {
    const {contentType} = this.props

    if (contentType == 'answer' || contentType == 'general') {
      const el = this.textItemRef.current
      const isTextClamped = el.scrollHeight > el.clientHeight

      this.setState({
        isTextClamped: isTextClamped
      })
    }
  }

  onKeyDown = (e) => {
    var key = e.key || e.keyCode
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.closePopup(e);
    }
  }

  togglePopup = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.popup.classList.toggle('open');
  }

  closePopup = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.popup.classList.remove('open');
  }

  openFile = (e, fileurl, error) => {
    if (error) {
      return
    } else {
      e.preventDefault()
      window.open(fileurl, '_blank').focus();
    }
  }

  showContentTypeLabel = (contentType) => {
    let textToShow

    switch (contentType) {
      case 'question':
        textToShow = 'Question'
        break;
      case 'answer':
        textToShow = 'Answer'
        break;
      case 'custom':
        textToShow = 'custom'
        break;
      default:
        textToShow = 'General'
    }

    return (
      <div className={"contentTypeLabel " + contentType}>{textToShow}</div>
    )
  }

  handleSeeMore = (e, contentType) => {
    if (contentType != 'general') return

    e.stopPropagation();

    e.currentTarget.previousSibling.classList.remove("max3Lines");
    e.currentTarget.innerHTML = '';
  }

  handleToggle = (e, postId, requireLogin, allowedPermissions) => {
    const {checkHasAccess, noAccessHandler} = this.props

    // If there is an access requirement
    if (checkHasAccess) {
      checkHasAccess(requireLogin, allowedPermissions ? allowedPermissions : null, (hasAccess) => {
        if (hasAccess == false) {
          e.preventDefault();
          return noAccessHandler ? noAccessHandler(null, "feedItem-upvote") : null
        } else {
          return this.toggleUpvote(e, postId)
        }
      })

    // There was na ccess requirement
    } else {
      this.toggleUpvote(e, postId)
    }
  }

  toggleUpvote = (e, postId) => {
    const {isOnMyContentPage, contentType} = this.props
    e.preventDefault()

    // Don't allow to upvote own content
    if (isOnMyContentPage == true && contentType != 'following') { return }

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

  render() {
    const {contentType, post, userRole, isOnMyContentPage, updatePathName, maxViewsReached, handleUnlockBtnClick} = this.props
    const {userUpvoted, votes, showGeneralPostModal} = this.state

    const isOffline = false;

    let indArrToShow, hashtagsCommaString, hashtagsArray
    let isProspelaTeam, verifiedType, eduemailverif, profemailverif, mentorSUStep, tsapproved, verifTypesArr, hasMinVerif
    let userRoleOfAuthor = 'mentor'

    if (userRoleOfAuthor == 'mentor') {
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

    hasMinVerif = userRoleOfAuthor == 'mentee' ? false : (verifTypesArr && verifTypesArr.length > 0)

    if (contentType == 'question' || contentType == 'following') {
      //Prioritise showing similar industries to viewer
      const viewersIndustries = ['2','11']
      //const viewersIndustries = userRole == 'mentee' ? this.props.users.industries : this.props.users.industriesexp
      const indToPostTo = post.industriestopostto
      if (indToPostTo && indToPostTo.length <= 2) {
        indArrToShow = indToPostTo
      } else {
        const indToPostToFiltered = indToPostTo && indToPostTo.filter(ind => viewersIndustries.includes(ind))
        if (indToPostToFiltered && indToPostToFiltered.length == 0) {
          indArrToShow = indToPostTo.slice(0,2) // Will just show the poster's first 2 industries
        } else if (indToPostToFiltered && indToPostToFiltered.length >= 2) {
          indArrToShow = indToPostToFiltered.slice(0,2) // Will show the first 2 relevant industries
        } else {
          indArrToShow = indToPostToFiltered // Will only show the relevant industry even if there are more
        }
      }

      hashtagsCommaString = (post.hashtags.length > 0 || post.hashtagsfreetext.length > 0) ? convertHashtags(post.hashtags, post.hashtagsfreetext) : []
      hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')
      const numViews = (post.mentorseen && post.mentorseen.length) + (post.menteeseen && post.menteeseen.length) + (post.prseen && post.prseen.length)
      const numViewsFormatted = numViews < 1000 ? numViews : ((Math.round(numViews / 100) / 10) + 'k')
      const hasUnreadAnswers = true // isOnMyContentPage == true ? null : [LINKTODEX]

      const isMobile = checkMobile()
      const showVotesNum = !isMobile && votes && (votes != '0' && votes != 0)

      return (
        <Link to={{pathname: "/questions/" + post.qid + post.url, state: {prevPath: window.location.pathname}}} className="link" onClick={updatePathName}>
          <div className="contentBox feedItem withHover padding20 positionRel" data-itemid={post.qid} data-itemtype={contentType}>
            { isOnMyContentPage != true && this.showContentTypeLabel((userRole == 'pr' && post.custom && post.custom == 1) ? 'custom' : contentType) }
            { isOnMyContentPage == true && contentType != 'following' && (
              <React.Fragment>
                <button type="button" className="msgActions-btn absolute right20 tooltip moreActions alignRight lightGreyText" onClick={this.togglePopup} tabIndex={0} onKeyDown={this.onKeyDown}>
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
            <div className="postContainer">
              <div className={"postDetail marginTop12 textRight fontSize13 flexShrink0 width100px darkGreyText" + (isMobile == true ? "" : " marginRight20 ")}>
              {/*  <div className="marginBottom5">{post.votes && (post.votes.length < 1000 ? post.votes.length : ((Math.round(post.votes.length / 100) / 10) + 'k'))} votes</div> */}
                {(isOnMyContentPage != true || contentType == 'following') && (
                  <div className={"followBtn fontSize13 marginBottom10" + (userUpvoted == true ? " electricPurpleText" : " darkGreyText")} onClick={(e) => this.handleToggle(e, post.qid, true)}>
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
                    <span className="fontSize13 paddingTop2 noSelect">
                      {userUpvoted == true ? 'Following' : 'Follow'}
                      {showVotesNum == true && (
                        <span> ({(votes < 1000 ? votes : ((Math.round(votes / 100) / 10) + 'k'))})</span>
                      )}
                    </span>
                  </div>
                )}
                {(isOnMyContentPage == true && contentType != 'following') && (
                  <div className="followBtn fontSize13 marginBottom10 darkGreyText">
                    <button type="button" className="button-unstyled">
                      <i className="far fa-thumbs-up"/>
                    </button>
                    <span className="fontSize13 marginLeft5 paddingTop2 noSelect">{votes && (votes < 1000 ? votes : ((Math.round(votes / 100) / 10) + 'k'))}</span>
                  </div>
                )}
                <div className="numAnswers marginBottom5">
                  {post.hids && post.hids.length != 0 && (
                    <span className={"multiple marginRight0 fontSize12 " + (post.hasacceptedanswer == true ? "green" : "greenOutline")}>
                      {post.hasacceptedanswer == true && (
                        <React.Fragment>
                          <span className="tickNumSelected">
                            <Check />
                          </span>
                        </React.Fragment>
                      )}
                      <span>
                        {hasUnreadAnswers && isOnMyContentPage == true && (
                          <span>
                            <span className="notificationNum isMyContent">New</span> {post.hids.length == 1 ? 'answer' : 'answers'}
                          </span>
                        )}
                        {isOnMyContentPage != true && (
                          <span>{post.hids.length} {post.hids.length == 1 ? 'answer' : 'answers'}</span>
                        )}
                      </span>
                    </span>
                  )}
                  {post.hids && post.hids.length == 0 && (
                    <span className="multiple grey marginRight0 fontSize13">0 answers</span>
                  )}
                </div>
                <div className="marginBottom5"><i className="fas fa-eye"/> {numViewsFormatted} views</div>
              </div>
              <div className="flexGrow1 maxWidth100">
                <div className="marginTop10 fontSize20 lineHeight20pc darkGreyText">
                  <strong>{post.title}</strong>
                </div>
                <div className="marginBottom20 marginTop10 fontSize13 darkGreyText lineHeight10px">
                  in <span className="bubbleContainer">
                    {indArrToShow.map((indID) => {
                      let industryItem, icon, indName
                      if (indID == '99999') {
                        icon = 'fas fa-hashtag'
                        indName = 'General Advice'
                      } else {
                        industryItem = getIndustryDeets(indID)
                        icon = industryItem.fa
                        indName = industryItem.label
                      }
                      return <div className="bubble noBackground" key={indID}><i className={icon} /> {indName}</div>
                    })}
                  </span>{post.industriestopostto.length > 2 ? 'and other groups' : ''}
                </div>
                {/*{post.textdetail != '' && (
                  <div className="marginBottom20 max2Lines greyText fontSize16">
                    <div>{post.textdetail}</div>
                  </div>
                )}*/}
                <div className="displayFlex flexWrap">
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
                  <div className="fontSize13 positionRel dispInlineBlock flexEnd">
                    <Avatar userID={post.uid} isAnon={post.isanon} userName={post.isanon ? 'Anonymous' : post.fname} showAsCircle smallIdle isFeedMini picSize={40}/>
                    <span className="paddingL20 darkGreyText">{post.isanon ? "Anonymous" : (post.fname + (post.authorinsttype == 'sch' ? "" : (" " + post.lname)))}</span><span className="greyText"> asked <DateCalc time={post.datecreated} showPureDate /> at <TimeCalc time={post.datecreated} /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    } else if (contentType == 'answer' || contentType == 'general') {
      const {isTextClamped} = this.state
      const {isLoggedIn, checkHasAccess, noAccessHandler} = this.props
      const aCredentialText = getCredText((post.wasDefaultRole ? post.wasDefaultRole : null), post.authorinsttype, post.authorrole, post.authorroleishidden, post.authorinst, post.authorinstfreetext, post.authortraining, post.authordegree, post.authorstate, post.authorcountry)
      const error = false
      let answerURL

      if (contentType == 'general') {
        hashtagsCommaString = (post.hashtags.length > 0 || post.hashtagsfreetext.length > 0) ? convertHashtags(post.hashtags, post.hashtagsfreetext) : []
        hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')
      }

      const FixedBottomContent = () => (
        <AddComment
          showGeneralNotAllowedText
          isInModal
          isLoggedIn={isLoggedIn}
          isOffline={isOffline}
          gid={post.hid}
          type="g"
        />
      )

      const FeedItemDetail = (props) => (
        <div className={props.isInModal ? "textLeft" : "contentBox feedItem withHover padding20 positionRel" + (contentType == 'general' ? " paddingBtm0" : "")} data-itemid={post.hid} data-itemtype={contentType}>
          { isOnMyContentPage != true && !props.isInModal && this.showContentTypeLabel((userRole == 'pr' && post.custom && post.custom == 1) ? 'custom' : contentType) }
          { isOnMyContentPage == true && (
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
                  {/*<span className="darkGreyText"><strong>{post.isanon ? ("Anonymous" + (hasMinVerif == true ? "" : ", ")) : (post.fname + (post.authorinsttype == 'sch' ? "" : (" " + post.lname)) + (hasMinVerif == true ? "" : ", "))}</strong></span> */}
                  {contentType == 'general' && post.isanon != true && post.isPr != true && post.authorinsttype != 'sch' && (
                    <span>
                    {/*  <strong>{hid.isanon ? "" : (hid.fname + (aAuthorinsttype == 'sch' ? "" : (" " + hid.lname)))}</strong> */}
                      {post.authorUserRole == 'mentee' ? (
                          <FullPageModal {...MenteeProfileUsrNameModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler} triggerText={post.isanon ? ("Anonymous" + (hasMinVerif == true ? "" : ", ")) : (post.fname + (post.authorinsttype == 'sch' ? "" : (" " + post.lname)) + (hasMinVerif == true ? "" : ", "))}>
                            <MenteeProfileContent />
                          </FullPageModal>
                          )
                        : (
                          <FullPageModal {...MentorProfileUsrNameModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler} triggerText={post.isanon ? ("Anonymous" + (hasMinVerif == true ? "" : ", ")) : (post.fname + (post.authorinsttype == 'sch' ? "" : (" " + post.lname)) + (hasMinVerif == true ? "" : ", "))}>
                            <MentorProfileContent />
                          </FullPageModal>
                        )
                      }
                    </span>
                  )}
                  {(contentType != 'general' || post.isanon == true || post.isPr == true || post.authorinsttype == 'sch') && (
                    <span className="darkGreyText"><strong>{post.isanon ? ("Anonymous" + (hasMinVerif == true ? "" : ", ")) : (post.fname + (post.authorinsttype == 'sch' ? "" : (" " + post.lname)) + (hasMinVerif == true ? "" : ", "))}</strong></span>
                  )}
                  {isOnMyContentPage == true && post.hidden == 1 && (
                    <span className="tooltip fontSize18">
                      <UserBadge badgeType='questionRemoved' />
                      <span className="tooltiptext below profile onFeed textLeft">
                        <strong>The question related to the answer has been removed by the author</strong>
                      </span>
                    </span>
                  )}
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
              <div className={"feedItemTextContainer" + ((contentType == 'answer' && maxViewsReached == true) ? " maxViewsReached" : "")}>
                <div className={"marginTop10 max3Lines greyText" + (isTextClamped == true ? "" : " marginBottom10")} ref={this.textItemRef} >
                  {post.text && (
                    <div className={"darkGreyText fontSize13" + ((contentType == 'answer' && maxViewsReached == true) ? " blurryText" : "")}><TextParser text={post.text} /></div>
                  )}
                </div>
                {isTextClamped == true && (
                  <div className="fontSize13 marginBottom10 pointerCursor linkPurpleText" data-label="ignoreOpenModal" onClick={(e) => {this.handleSeeMore(e, contentType)}}>
                    See more...
                  </div>
                )}
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
                          <div className="fileBox tooltip" key={fileName} onClick={(contentType == 'answer' && maxViewsReached == true) ? null : ((e) => {this.openFile(e, fileurl, error)})} >
                            {fileType === 'img' && (
                              <div className={"fileBoxImg" + ((contentType == 'answer' && maxViewsReached == true) ? " blurryImg" : "")} style={{backgroundImage: `url(${backgroundImgURL})`}} />
                            )}
                            {fileType === 'pdf' && (
                              <React.Fragment>
                                <div className={"fileIcon-container addHighlight pdf fontSize30" + ((contentType == 'answer' && maxViewsReached == true) ? " blurryImg" : "")}>
                                  <i className="far fa-file-pdf" />
                                </div>
                              </React.Fragment>
                            )}
                            {fileType === 'xls' && (
                              <React.Fragment>
                                <div className={"fileIcon-container addHighlight xls fontSize30" + ((contentType == 'answer' && maxViewsReached == true) ? " blurryImg" : "")}>
                                  <i className="far fa-file-excel" />
                                </div>
                              </React.Fragment>
                            )}
                            {fileType === 'word' && (
                              <React.Fragment>
                                <div className={"fileIcon-container addHighlight word fontSize30" + ((contentType == 'answer' && maxViewsReached == true) ? " blurryImg" : "")}>
                                  <i className="far fa-file-word" />
                                </div>
                              </React.Fragment>
                            )}
                            {fileType === 'ppt' && (
                              <React.Fragment>
                                <div className={"fileIcon-container addHighlight ppt fontSize30" + ((contentType == 'answer' && maxViewsReached == true) ? " blurryImg" : "")}>
                                  <i className="far fa-file-powerpoint" />
                                </div>
                              </React.Fragment>
                            )}
                            {fileType === 'other' && (
                              <React.Fragment>
                                <div className={"fileIcon-container addHighlight fontSize30" + ((contentType == 'answer' && maxViewsReached == true) ? " blurryImg" : "")}>
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
              </div>
              {(contentType == 'answer' && maxViewsReached == true) && (
                <div>
                  <div className="feedItemUnlockSection marginTop10 marginBottom10">
                    <div className="feedItemUnlockSection-btnContainer" >
                      <button type="button" className="ModalOpenBtn ModalOpenBtn-unlockFeedContent" id="itemUnlockBtn">
                        <i className="fas fa-lock" id="itemUnlockIcon"/> Unlock
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {contentType != 'general' && (
                <div className={"fontSize13 lineHeight20pc darkGreyText max1Line" + (isTextClamped == true ? "" : " marginTop10")}>
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
                            className="multiple value paddingR"
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
              <div className={"fontSize12 displayFlex bottom15 width25px" + (contentType != 'general' ? " absolute" : " relative top15") + (userUpvoted == true ? " electricPurpleText" : " darkGreyText")} onClick={(e) => this.handleToggle(e, post.hid, true)}>
                <button type="button" className={"button-unstyled " + (userUpvoted == true ? "opacity1" : "")} data-label="ignoreOpenModal">
                  {userUpvoted == true && (
                    <i className="fas fa-thumbs-up" data-label="ignoreOpenModal"/>
                  )}
                  {userUpvoted != true && (
                    <i className="far fa-thumbs-up" data-label="ignoreOpenModal"/>
                  )}
                </button>
                <div className="fontSize14 marginLeft5 paddingTop2 noSelect">{votes && (votes < 1000 ? votes : ((Math.round(votes / 100) / 10) + 'k'))}</div>
              </div>
              <div>
                <div className={"textRight greyText fontSize13" + (contentType != 'general' ? " marginTop10" : "")}><DateCalc time={post.datecreated} showPureDate /> at <TimeCalc time={post.datecreated} /></div>
              </div>
              {contentType == 'general' && (
                <div className="marginTop10 paddingTop borderTop borderGrey">
                  {!props.isInModal && (
                    <React.Fragment>
                      {post.postComments.length > 0 && (
                        <div className="greyText fontSize14">View all {post.postComments.length} comments</div>
                      )}
                      <AddComment
                        showGeneralNotAllowedText
                        isInModal={false}
                        isLoggedIn={isLoggedIn}
                        isOffline={isOffline}
                        gid={post.hid}
                        type="g"
                      />
                    </React.Fragment>
                  )}
                  {props.isInModal && post.postComments.length > 0 && (
                    <React.Fragment>
                      <QAThreads
                        comments={post.postComments}
                        originalPostAuthorID={post.uid}
                        originalPostIsAnon={post.isanon}
                        originalPostID={post.hid}
                        isInModal
                        type="g"
                        checkHasAccess={checkHasAccess}
                        noAccessHandler={noAccessHandler}
                      />
                    {/*  <AddComment
                        showGeneralNotAllowedText
                        isInModal
                        isOffline={isOffline}
                        gid={post.hid}
                        type="g"
                      /> */}
                    </React.Fragment>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )

      if (contentType == 'answer') {
        return (
          <Link to={{pathname: "/questions/" + post.relatedqid + post.url, state: {prevPath: window.location.pathname}}} className="link" onClick={(e) => {handleUnlockBtnClick(e), updatePathName}}>
            <FeedItemDetail />
          </Link>
        )
      } else if (contentType == 'general') {
        return (
          <React.Fragment>
            <div className="link" onClick={(e) => this.showModal(e, 'GeneralPost')}>
              <FeedItemDetail />
            </div>
            {showGeneralPostModal == true && (
              <Modal {...GeneralPostModalProps} handleLocalStateOnClose={() => this.closeModal("GeneralPost")} FixedBottomContent={FixedBottomContent}>
                <FeedItemDetail
                  isInModal
                />
              </Modal>
            )}
          </React.Fragment>
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

export default FeedItem;
