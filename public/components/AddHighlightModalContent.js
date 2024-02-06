// Last merged this code on 6th feb 2024

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddHighlightTextBox from './AddHighlightTextBox.js';
//import QA from './QA.js';

import "../css/AddHighlight.css";

class AddHighlightModalContent extends Component {
  constructor() {
    super();
    this.state = {
      highlightType: '',
    };
  }

  handleClick = (e) => {
    e.persist()

    this.setState({
      highlightType: e.currentTarget.value
    }, () => {
      if (this.state.highlightType == "answer") {
        this.props.onClose()
      }
    });
  }

  render() {
    const { highlightType, text, showEmojis, errorLoadingHashtags } = this.state;
    const {modalID, userRole, isAskQ, isAddAnswer, isAddGeneral, updatePathName, qToAnswer, fromCommunityPage, commType, commName, updateTabToView, commURLending} = this.props
    const user = {uid: '12345', fname: 'Emma', lname: 'Sullivan'}

    if(highlightType == '' && isAskQ != true && isAddAnswer != true && isAddGeneral != true) {
      return (
        <div className="selectPostTypeContainer">
          <div className="modal-title">
            Select post type
          </div>
          <div className="modal-subtitleSml fontSize12">
            Share with {userRole == 'mentor' ? 'learners / mentees' : 'your fellow learners & experts'}
          </div>
          <div className="postTypeContainer">
            {/* <Link to={`/questions/${qid}`}> */}
            <button type="button" className="postTypeButton" autoFocus={userRole != 'mentor'} onClick={this.handleClick} value='question'>
              <div className="placeholderPic askAQ" />
              <div className="postType-title"><strong>Ask</strong></div>
              <div className="postType-desc">Ask employree experts and fellow learners</div>
            </button>
            {!fromCommunityPage
              ? (
                <Link to={{pathname: "/questions", state: { fromAddHighlightBtn: true }}} onClick={updatePathName}>
                  <button type="button" className="postTypeButton" autoFocus={userRole == 'mentor'} onClick={this.handleClick} value='answer'>
                    <div className="postTypeIcon fontSize25 marginLeft10">
                      <i className="far fa-edit" />
                    </div>
                    <div className="postType-title"><strong>Answer</strong></div>
                    <div className="postType-desc">Browse questions to answer</div>
                  </button>
                </Link>
              )
              : (
                <Link to={{pathname: commURLending + "/questions", state: {prevPath: window.location.pathname}}}>
                  <button type="button" name="questions" autoFocus={userRole == 'mentor'} onClick={(e) => {this.handleClick(e), updateTabToView(e)}} className="postTypeButton" value='answer'>
                    <div className="postTypeIcon fontSize25 marginLeft10">
                      <i className="far fa-edit" />
                    </div>
                    <div className="postType-title"><strong>Answer</strong></div>
                    <div className="postType-desc">Browse questions to answer</div>
                  </button>
                </Link>
              )
            }
            <button type="button" className="postTypeButton" onClick={this.handleClick} value='other'>
              <div className="postTypeIcon fontSize30">
                <i className="fas fa-hashtag" />
              </div>
              <div className="postType-title"><strong>General</strong></div>
              <div className="postType-desc">Share resources, URLs or other stuff!</div>
            </button>
          </div>
        </div>
      );
    } else if (highlightType == 'answer') {
      return null
  /*  } else if (userRole == 'mentor' && highlightType == 'answer') {
      const qid = '1234'
      return (
        <Router>
          <div>
            <h2>
              <Link to={`/questions/${qid}`} target="_blank">Open Question in new tab</Link>
            </h2>
          </div>
        </Router>
      ) */
      /*<div className="qaComingSoonContainer">
        <div className="electricPurpleText fontSize30 marginTop20">
          <i className="far fa-comments"/>
        </div>
        <div className="qaTitle modal-preTitle marginBottom20">Coming soon!</div>
        <div className="darkGreyText">Help mentees from every background get access to quality careers advice, by contributing to our new open-access Q&A reference library</div>
      </div>*/
    } else if (highlightType != 'answer') {
      return (
        <AddHighlightTextBox
          modalID={modalID}
          isAskQ={(isAskQ || highlightType == 'question') ? true : false}
          isAddAnswer={isAddAnswer}
          isAddGeneral={isAddGeneral}
          qToAnswer={qToAnswer}
          fromCommunityPage={fromCommunityPage}
          commType={commType}
          commName={commName}
        />
      )
    }
  }
}

export default AddHighlightModalContent;
