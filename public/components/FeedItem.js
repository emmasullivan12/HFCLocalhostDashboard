// Dex last merged this code on 18th mar 2022

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Avatar from './Avatar.js';
import {Check, DateCalc, TimeCalc} from './GeneralFunctions.js';
import DeleteContentModalContent from './DeleteContentModalContent.js';
import Modal from './Modal.js';
import {getIndustryDeets, convertHashtags} from './UserDetail.js';

import '../css/MyActivity.css';

const DeleteContentModalProps = {
  ariaLabel: 'Confirm content deletion',
  triggerText: 'Delete',
  usedFor: 'deleteContent',
}

class FeedItem extends Component {

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

  showContentTypeLabel = (contentType) => {
    let textToShow

    switch (contentType) {
      case 'question':
        textToShow = 'Question'
        break;
      default:
        textToShow = 'General'
    }

    return (
      <div className={"contentTypeLabel " + contentType}>{textToShow}</div>
    )
  }

  render() {
    const {contentType, post} = this.props

    if (contentType == 'question') {
      const hashtagsCommaString = (post.hashtags.length > 0 || post.hashtagsfreetext.length > 0) ? convertHashtags(post.hashtags, post.hashtagsfreetext) : []
      const hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')
      const indArrToShow = post.industriestopostto.length <= 2 ? post.industriestopostto : post.industriestopostto.slice(0,2)
      const numViews = (post.mentorseen && post.mentorseen.length) + (post.menteeseen && post.menteeseen.length) + (post.prseen && post.prseen.length)
      const numViewsFormatted = numViews < 1000 ? numViews : ((Math.round(numViews / 100) / 10) + 'k')

      return (
        <Link to={{pathname: "/questions/" + post.qid + post.url, state: {prevPath: window.location.pathname}}} className="link">
          <div className="contentBox feedItem withHover padding20 positionRel" data-itemid={post.qid} data-itemtype="question">
            { this.showContentTypeLabel("question") }
            <div className="postContainer">
              <div className="postDetail marginRight20 marginTop10 textRight fontSize13 flexShrink0 width100px darkGreyText">
                <div className="marginBottom5">{post.votes.length} votes</div>
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
                <div className="marginBottom5">{numViewsFormatted} views</div>
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
    } else if (contentType == 'answer') {
      return <div className="feedItem" data-itemid={post.hid} data-itemtype="answer">Answer posts goes here</div>
    } else if (contentType == 'general') {
      return <div className="feedItem" data-itemid={post.hid} data-itemtype="general">General posts goes here</div>
    }
  }
}

export default FeedItem;
