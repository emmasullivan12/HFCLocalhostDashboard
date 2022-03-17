// Dex last merged this code on 16th mar 2022

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
        <Link to={"/questions/" + post.qid + post.url} className="link">
          <div className="contentBox feedItem withHover padding20 positionRel">
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
                <div className="marginTop10 marginBottom10 fontSize16 lineHeight20pc darkGreyText">
                  <strong>{post.title}</strong>
                </div>
                {/*{post.textdetail != '' && (
                  <div className="marginBottom20 answerSummary greyText fontSize16">
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
                    <span className="paddingL25">{post.isanon ? "Anonymous" : (post.fname + (post.authorinsttype == 'sch' ? "" : (" " + post.lname)))}</span><span className="greyText"> asked <DateCalc time={post.datecreated} showPureDate /> at <TimeCalc time={post.datecreated} /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    } else if (contentType == 'answer' || contentType == 'general') {
      return <div>Answer or General Post goes here</div>
    }
  }
}

export default FeedItem;
