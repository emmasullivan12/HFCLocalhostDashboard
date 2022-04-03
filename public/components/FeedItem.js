// Dex last merged this code on 3rd apr 2022

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Avatar from './Avatar.js';
import {usercdn, userImgsFolder} from './CDN.js';
import {Check, DateCalc, TimeCalc} from './GeneralFunctions.js';
import DeleteContentModalContent from './DeleteContentModalContent.js';
import Modal from './Modal.js';
import UserBadge from './UserBadge.js';
import {getIndustryDeets, getVerifLevelArr, convertHashtags, getCredText} from './UserDetail.js';

import '../css/MyActivity.css';

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
      this.closePopup();
    }
  }

  togglePopup = (e) => {
    this.popup.classList.toggle('open');
  }

  closePopup = (e) => {
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
      default:
        textToShow = 'General'
    }

    return (
      <div className={"contentTypeLabel " + contentType}>{textToShow}</div>
    )
  }

  handleSeeMore = (e, contentType) => {
    if (contentType != 'general') return

    e.currentTarget.previousSibling.classList.remove("max3Lines");
    e.currentTarget.innerHTML = '';
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

  render() {
    const {contentType, post, userRole} = this.props
    const {userUpvoted, votes} = this.state

    if (contentType == 'question') {
      const hashtagsCommaString = (post.hashtags.length > 0 || post.hashtagsfreetext.length > 0) ? convertHashtags(post.hashtags, post.hashtagsfreetext) : []
      const hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')
      const indArrToShow = post.industriestopostto.length <= 2 ? post.industriestopostto : post.industriestopostto.slice(0,2)
      const numViews = (post.mentorseen && post.mentorseen.length) + (post.menteeseen && post.menteeseen.length) + (post.prseen && post.prseen.length)
      const numViewsFormatted = numViews < 1000 ? numViews : ((Math.round(numViews / 100) / 10) + 'k')

      return (
        <Link to={{pathname: "/questions/" + post.qid + post.url, state: {prevPath: window.location.pathname}}} className="link">
          <div className="contentBox feedItem withHover padding20 positionRel" data-itemid={post.qid} data-itemtype="question">
            { this.showContentTypeLabel(contentType) }
            <div className="postContainer">
              <div className="postDetail marginRight20 marginTop12 textRight fontSize13 flexShrink0 width100px darkGreyText">
              {/*  <div className="marginBottom5">{post.votes && (post.votes.length < 1000 ? post.votes.length : ((Math.round(post.votes.length / 100) / 10) + 'k'))} votes</div> */}
                <div className={"followBtn fontSize13 marginBottom10" + (userUpvoted == true ? " electricPurpleText" : " darkGreyText")} onClick={(e) => this.toggleUpvote(e, post.qid)}>
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
                <div className="numAnswers marginBottom5">
                  {post.hids.length != 0 && (
                    <span className={"multiple marginRight0 fontSize13 " + (post.hasacceptedanswer == true ? "green" : "greenOutline")}>
                      {post.hasacceptedanswer == true && (
                        <React.Fragment>
                          <span className="tickNumSelected">
                            <Check />
                          </span>
                        </React.Fragment>
                      )}
                      <span>{post.hids.length} {post.hids.length == 1 ? 'answer' : 'answers'}</span>
                    </span>
                  )}
                  {post.hids.length == 0 && (
                    <span className="multiple grey marginRight0 fontSize13">0 answers</span>
                  )}
                </div>
                <div className="marginBottom5"><i className="fas fa-eye"/> {numViewsFormatted} views</div>
              </div>
              <div className="flexGrow1 maxWidth100">
                <div className="marginTop10 fontSize18 lineHeight20pc darkGreyText">
                  <strong>{post.title}</strong>
                </div>
                <div className="marginBottom10 marginTop5 fontSize13">
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
                    <Avatar userID={post.uid} isAnon={post.isanon} userName={post.isanon ? 'Anonymous' : post.fname} showAsCircle smallIdle picSize={40}/>
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
      const aCredentialText = getCredText(post.authorinsttype, post.authorrole, post.authorroleishidden, post.authorinst, post.authorinstfreetext, post.authortraining, post.authordegree, post.authorstate, post.authorcountry)
    //  const indArrToShow = post.industriestopostto.length <= 2 ? post.industriestopostto : post.industriestopostto.slice(0,2)
      const mentor = {
        verifiedtype: '1',
        eduemailverif: '',
        profemailverif: '',
        mentorsustep: '',
        tsapproved: ''
      }
      const isProspelaTeam = false
      const verifiedType = mentor.verifiedtype
      const eduemailverif = mentor.eduemailverif;
      const profemailverif = mentor.profemailverif;
      const mentorSUStep = mentor.mentorsustep;
      const tsapproved = mentor.tsapproved // THIS IS TIMESTAMP APPROVED THEIR ID / BACKGROUND
      const verifTypesArr = getVerifLevelArr(verifiedType, eduemailverif, profemailverif, mentorSUStep, tsapproved, isProspelaTeam)
      const hasMinVerif = userRole == 'mentee' ? false : (verifTypesArr && verifTypesArr.length > 0)
      const error = false
      let indArrToShow, hashtagsCommaString, hashtagsArray

      if (contentType == 'general') {
      //  indArrToShow = post.industriestopostto.length <= 2 ? post.industriestopostto : post.industriestopostto.slice(0,2)
        hashtagsCommaString = (post.hashtags.length > 0 || post.hashtagsfreetext.length > 0) ? convertHashtags(post.hashtags, post.hashtagsfreetext) : []
        hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')
      }

      const FeedItemDetail = () => (
        <div className="contentBox feedItem withHover padding20 positionRel" data-itemid={post.hid} data-itemtype={contentType}>
          { this.showContentTypeLabel(contentType) }
          <div className="postContainer">
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
            {/*  <div className="marginBottom10 marginTop5 fontSize13">
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
              </div> */}
              <div className={"marginTop10 max3Lines greyText" + (isTextClamped == true ? "" : " marginBottom10")} ref={this.textItemRef} >
                <div className="darkGreyText fontSize13">{post.text}</div>
              </div>
              {isTextClamped == true && (
                <div className="fontSize13 marginBottom10 pointerCursor linkPurpleText" onClick={(e) => {this.handleSeeMore(e, contentType)}}>
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
                <div className={"fontSize13 lineHeight20pc darkGreyText max1Line" + (isTextClamped == true ? "" : " marginTop10")}>
                  Replying to: <strong className="purpleText">{post.title}</strong>
                </div>
              )}
              {contentType == 'general' && (
                <React.Fragment>
                {/*  <div className="linkPurpleText marginBottom10 marginTop5 fontSize13">
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
                  </div> */}
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
              <div className={"fontSize12 absolute displayFlex bottom15" + (userUpvoted == true ? " electricPurpleText" : " darkGreyText")} onClick={(e) => this.toggleUpvote(e, post.hid)}>
                <button type="button" className={"button-unstyled " + (userUpvoted == true ? "opacity1" : "")}>
                {/*  <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
                    <path d="M2 25h32L18 9 2 25Z"/>
                  </svg> */}
                  {userUpvoted == true && (
                    <i className="fas fa-thumbs-up"/>
                  )}
                  {userUpvoted != true && (
                    <i className="far fa-thumbs-up"/>
                  )}
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
          <Link to={contentType == 'general' ? null : {pathname: "/questions/" + post.relatedqid + post.url, state: {prevPath: window.location.pathname}}} className="link">
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

export default FeedItem;
