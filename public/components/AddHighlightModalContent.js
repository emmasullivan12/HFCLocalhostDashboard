// Last merged this code on 17th nov 2021

import React, { Component } from "react";

import AddHighlightTextBox from './AddHighlightTextBox.js';

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
    });
  }

  render() {
    const { highlightType, text, showEmojis, errorLoadingHashtags } = this.state;
    const {modalID} = this.props
    const user = {uid: '12345', fname: 'Emma', lname: 'Sullivan'}

    if(highlightType == '') {
      return (
        <div className="selectPostTypeContainer">
          <div className="modal-title">
            Select post type
          </div>
          <div className="modal-subtitleSml fontSize12">
            Share a highlight with mentees
          </div>
          <div className="postTypeContainer">
            <button type="button" className="postTypeButton" autoFocus onClick={this.handleClick} value='qa'>
              <div className="postTypeIcon fontSize30">
                <i className="fas fa-question" />
              </div>
              <div className="postType-title"><strong>Q&A</strong></div>
              <div className="postType-desc">Browse mentee questions to answer</div>
            </button>
            <button type="button" className="postTypeButton" onClick={this.handleClick} value='other'>
              <div className="postTypeIcon fontSize30">
                <i className="fas fa-hashtag" />
              </div>
              <div className="postType-title"><strong>General</strong></div>
              <div className="postType-desc">Share work-life insights, resources or other stuff!</div>
            </button>
          </div>
        </div>
      );
    } else if (highlightType == 'qa') {
      return (
        <div className="qaComingSoonContainer">
          <div className="electricPurpleText fontSize30 marginTop20">
            <i className="far fa-comments"/>
          </div>
          <div className="qaTitle modal-preTitle marginBottom20">Coming soon!</div>
          <div className="darkGreyText">Help mentees from every background get access to quality careers advice, by contributing to our new open-access Q&A reference library</div>
        </div>
      )
    } else {
      return (
        <AddHighlightTextBox
          modalID={modalID}
        />
      )
    }
  }
}

export default AddHighlightModalContent;
