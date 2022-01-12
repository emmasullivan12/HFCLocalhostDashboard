// Dex last merged this code on 14th apr 2021

import React, { Component } from "react";

import {Check, DateCalc, TimeCalc} from './GeneralFunctions.js';
import {convertHashtags} from './UserDetail.js';

class MyContentItem extends Component {

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
        <div className="contentBox">
          <div>
            {q.hids.length > 0 && (
              <span className="multiple numChecked">
                <span className="tickNumSelected">
                  <Check />
                </span>
                <span>{q.hids.length} {q.hids.length == 1 ? 'answer' : 'answers'}</span>
              </span>
            )}
            {q.hids.length == 0 && (
              <div>No answers yet</div>
            )}
            <button type="button" className="msgActions-btn tooltip moreActions" onMouseDown={this.toggleMoreActions}>
              <div className="msgAction-icon">
                <i className="fas fa-ellipsis-h" />
              </div>
              <span className="tooltiptext last groups">More actions</span>
            </button>
            <div className="moreActionsContainer" ref={el => (this.moreActions = el)} role="button" tabIndex={0} onKeyDown={this.onKeyDown} onClick={this.closeMoreActions}>
              <div className="moreActions-scrollArea">
                <ul className="moreActionsList">
                  <li className="moreActionsListItem" >
                    <span className="moreActionsLabel overflow-ellipsis">
                      Hello
                    {/*}  <Modal {...ReportModalProps} tabIndex="0">
                        <ReportModalContent />
                      </Modal>*/}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div><strong>{q.title}</strong></div>
          {hashtagsArray.length > 0 && (
            <div className="tagsList">
              {hashtagsArray.map((hashtag) => {
            /*    return <div className="bubble" key={role}>{role}</div>
              })}
              {arrayToMap.map((value, index) => {*/
                return (
                  <span
                    key={hashtag}
                  //  onClick={this.onClickValue}
                    className="multiple value"
                  //  role="button"
                    id={hashtag}
                  >
                    {hashtag}
                  </span>
                )
              })}
            </div>
          )}
          <div className="textRight greyText fontSize14"><DateCalc time={q.datecreated} /> at <TimeCalc time={q.datecreated} /></div>
        </div>
      );
    }
  }
}

export default MyContentItem;
