// Dex last merged this code on 16th mar 2022

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {Check, DateCalc, TimeCalc} from './GeneralFunctions.js';
import DeleteContentModalContent from './DeleteContentModalContent.js';
import Modal from './Modal.js';
import {convertHashtags} from './UserDetail.js';

import '../css/MyActivity.css';

const DeleteContentModalProps = {
  ariaLabel: 'Confirm content deletion',
  triggerText: 'Delete',
  usedFor: 'deleteContent',
}

class MyContentItem extends Component {

  onKeyDown = (e) => {
    var key = e.key || e.keyCode
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      this.closePopup();
    }
  }

  togglePopup = (e) => {
  //  const {q} = this.props
  //  const popupName = e.currentTarget.dataset.popupname
  //  const popup = document.getElementById(popupName)
  //  popup.classList.toggle('open')
/*    function showPopup() {
      popup.classList.add('open');
    }
    function hidePopup() {
      popup.classList.remove('open');
    }*/
  /*  console.log(e.target)
    console.log(e.currentTarget)
    console.log(e.target.classList)
    console.log(e.target.classList.contains("fas fa-ellipsis-h"))
    if (e.target.classList.contains("fas fa-ellipsis-h")) {return} */
    this.popup.classList.toggle('open');
  }

  closePopup = (e) => {
  //  if (this.popup !== null ) {
      this.popup.classList.remove('open');
  //  }
  }

  render() {
    const {contentType, post} = this.props

  // QUESTIONSnpm
  /*
    datecreated: '2020-09-04T13:30:50.667Z',
    title: 'What is the best thing to wear to an interview?',
    textdetail: 'I know we have to be professional, but would like to stand out if possible.',
    hids: ['1234','1235'], // 2 answers
    industriesToPostTo: ['2','19'],
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

    if (contentType == 'questions' || contentType == 'answers' || contentType == 'generalPosts') {
      const hashtagsCommaString = (post.hashtags.length > 0 || post.hashtagsfreetext.length > 0) ? convertHashtags(post.hashtags, post.hashtagsfreetext) : []
      const hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')
      const hasUnreadAnswers = true

      return (
        <div className="contentBox withHover padding20">
          <div>
            {contentType == 'questions' && post.hids.length > 0 && (
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
            {contentType == 'questions' && post.hids.length == 0 && (
              <span className="multiple grey">No answers yet</span>
            )}
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
          </div>
          <Router>
            <div className="marginTop10 marginBottom10 fontSize18 lineHeight20pc">
            {/*  <Link to="/questions"> */}
              <strong>{post.title}</strong>
            {/*  </Link> */}
            </div>
          </Router>
          {contentType == 'answers' && (
            <div className="marginBottom20 answerSummary greyText">
              <div className="darkGreyText">You answered: </div>
              <div>{post.text}</div>
            </div>
          )}
          {(contentType == 'questions' || contentType == 'generalPosts') && hashtagsArray.length > 0 && (
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
          {contentType == 'answers' && (
            <div>
              {post.votes.length > 0 && (
                <span className="multiple green">
                  <span className="tickNumSelected cursorText">
                    {contentType == 'answers' && (
                      <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
                        <path d="M2 25h32L18 9 2 25Z"/>
                      </svg>
                    )}
                  </span>
                  <span>{post.votes.length} {post.votes.length == 1 ? 'upvote' : 'upvotes'}</span>
                </span>
              )}
              {post.votes.length == 0 && (
                <span className="multiple grey">No upvotes yet</span>
              )}
              <div className="textRight greyText fontSize14"><DateCalc time={post.datecreated} showPureDate /> at <TimeCalc time={post.datecreated} /></div>
            </div>
          )}
          {(contentType == 'questions' || contentType == 'generalPosts') && (
            <div className="textRight greyText fontSize14"><DateCalc time={post.datecreated} showPureDate /> at <TimeCalc time={post.datecreated} /></div>
          )}
        </div>
      );
    }
  }
}

export default MyContentItem;
