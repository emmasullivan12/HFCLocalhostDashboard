// Dex last merged this code on 14th apr 2021

import React, { Component } from "react";

import {Check, DateCalc, TimeCalc} from './GeneralFunctions.js';
import {convertHashtags} from './UserDetail.js';

import '../css/MyActivity.css';

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

  deleteQ = () => {
    // Delete question logic goes here
    this.closePopup()
  }

  render() {
    const {contentType, q} = this.props

  /*
    datecreated: '2020-09-04T13:30:50.667Z',
    title: 'What is the best thing to wear to an interview?',
    textdetail: 'I know we have to be professional, but would like to stand out if possible.',
    hids: ['1234','1235'], // 2 answers
    industriesToPostTo: ['2','19'],
    hashtags: ['23','11'],
    hashtagsfreetext: ['my free text hashtag'] */

    if (contentType == 'q') {
      const hashtagsCommaString = (q.hashtags.length > 0 || q.hashtagsfreetext.length > 0) ? convertHashtags(q.hashtags, q.hashtagsfreetext) : []
      const hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')

      return (
        //<div className="contentBox landingCTA">
        <div className="contentBox padding20">
          <div>
            {q.hids.length > 0 && (
              <span className="multiple green">
                <span className="tickNumSelected">
                  <Check />
                </span>
                <span>{q.hids.length} {q.hids.length == 1 ? 'answer' : 'answers'}</span>
              </span>
            )}
            {q.hids.length == 0 && (
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
                      <li className="moreActionsListItem" onClick={this.deleteQ}>
                        <span className="moreActionsLabel overflow-ellipsis">
                          Delete
                        </span>
                      </li>
                      <li className="moreActionsListItem" onClick={this.deleteQ}>
                        <span className="moreActionsLabel overflow-ellipsis">
                          Share
                        </span>
                      </li>
                      <li className="moreActionsListItem" onClick={this.deleteQ}>
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
          <div className="marginTop10 marginBottom10 fontSize18 lineHeight20pc"><strong>{q.title}</strong></div>
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
          <div className="textRight greyText fontSize14"><DateCalc time={q.datecreated} showPureDate /> at <TimeCalc time={q.datecreated} /></div>
        </div>
      );
    }
  }
}

export default MyContentItem;
