// Dex last merged this code on 10th August 2019

import React, { Component } from "react";

import AddHighlightModalContent from "./AddHighlightModalContent";
import Avatar from './Avatar.js';
import {ChevronUp, DateCalc, TimeCalc} from './GeneralFunctions.js';
import DeleteContentModalContent from './DeleteContentModalContent.js';
import Modal from './Modal';
import {getIndustryDeets, convertHashtags, getCredText, timeSince} from './UserDetail.js';

import "../css/QA.css";

const AddHighlightModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: 'Ask Question',
  usedFor: 'addHighlightQApage',
  changeInitFocus: true,
  wider: true
}

const DeleteContentModalProps = {
  ariaLabel: 'Confirm content deletion',
  triggerText: 'Delete',
  usedFor: 'deleteQ',
}

class QA extends Component {

  render() {
    const qaItem = {
      qid: '123456',
      uid: '123',
      datecreated: '2020-09-04T13:30:50.667Z',
      lastupdated: '2022-02-02T13:30:50.667Z',
      title: 'What is the best thing to wear to an interview?',
      textdetail: 'I know we have to be professional, but would like to stand out if possible.',
      hids: [], // no answers yet
      //hids: ['1234','1235'],
      industriesToPostTo: ['2','19'],
      //industriesToPostTo: ['2','19','1','3','4','5','6','7','8','9','10'],
      hashtags: ['23','20'],
      hashtagsfreetext: ['my free text hashtag'],
      isanon: 1,
      authorinst: '',
      authorinstfreetext: 'BPP',
      authorrole: '',
    //  authorroleishidden: 0,
      authordegree: '',
      authortraining: '',
      authorinsttype: 'train',
      authorstate: 'Bedf',
      authorcountry: 'GBR',
      votes: 123,
    //  reactions jsonb
    /*  seen: [
          mentors: [
            {uid: uid, ts: ts}
          ],
          mentees: [
            {uid: uid, ts: ts}
          ]
        ]*/
    //  followers jsonb
    //  deleted jsonb
    //  reported jsonb
    //  reportedstatus jsonb
    }
    const qAuthor = {uid: '123', fname: 'Emma', lname: 'Sullivan'}
    const myID = '123'; //223456
    const qIsMe = (qaItem.uid === myID) ? 'isMe' : 'isntMe';
    const hidsArr = [
      {
        hid: '1234',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-05T19:30:50.667Z',
        text: 'first answer',
        votes: 12,
        isacceptedanswer: true,
        url: 'google.com/answer/#firstanswer',
      },
      {
        hid: '1235',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-06T13:30:50.667Z',
        text: 'second answer',
        votes: 10,
        isacceptedanswer: false,
        url: 'google.com/answer/#secondanswer',
      },
      {
        hid: '1236',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-07T13:30:50.667Z',
        text: 'third answer',
        votes: 1,
        isacceptedanswer: false,
        url: 'google.com/answer/#thirdanswer',
      }
    ]
    const acceptedAnswer = hidsArr.length > 0 && hidsArr.filter(hid => hid.isacceptedanswer == true)
    const suggestedAnswers = hidsArr.length > 0 && hidsArr.filter(hid => hid.isacceptedanswer != true)
    const suggestedAnswersStructured = suggestedAnswers && suggestedAnswers.map(hid => {
      const answer = {
        "@type": "Answer",
      }

      answer.text = hid.text
      answer.upvoteCount = hid.votes
      if (hid.url != '') {
        answer.url = hid.url
      }

      /*  "author": {
          "@type": "Person",
          "name": "New Baking User"
        },*/

      return answer
    })
    const qaStructuredData = {
      "@context": "https://schema.org",
      "@type": "QAPage",
      "mainEntity": {
        "@type": "Question",
        "name": qaItem.title,
        "text": qaItem.textdetail,
        "answerCount": qaItem.hids.length,
        "upvoteCount": qaItem.votes,
      /*  "author": {
          "@type": "Person",
          "name": "New Baking User"
        }, */
        ...(acceptedAnswer.length > 0 && {
          "acceptedAnswer": {
            "@type": "Answer",
            "text": acceptedAnswer[0].text,
          /*  "author": {
              "@type": "Person",
              "name": "New Baking User"
            },*/
            "upvoteCount": acceptedAnswer[0].votes,
            ...(acceptedAnswer[0].url != '' && {
              "url": acceptedAnswer[0].url, // This is not required, but strongly recommended
            })
          },
        }),
        ...(suggestedAnswers.length > 0 && {
          "suggestedAnswer": suggestedAnswersStructured
        })
      }
    }
    const credentialText = getCredText(qaItem.authorinsttype, qaItem.authorrole, qaItem.authorroleishidden, qaItem.authorinst, qaItem.authorinstfreetext, qaItem.authortraining, qaItem.authordegree, qaItem.authorstate, qaItem.authorcountry)
    let activeDatesArr = []

    activeDatesArr.push(qaItem.lastupdated)
    hidsArr.map((hid) => {
      activeDatesArr.push(hid.lastupdated)
    });
    const mostRecentActivityDate = activeDatesArr.sort().slice(-1)
    const indArrToShow = qaItem.industriesToPostTo.length <= 2 ? qaItem.industriesToPostTo : qaItem.industriesToPostTo.slice(0,2)
    const hashtagsCommaString = (qaItem.hashtags.length > 0 || qaItem.hashtagsfreetext.length > 0) ? convertHashtags(qaItem.hashtags, qaItem.hashtagsfreetext) : []
    const hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')

    return (
      <React.Fragment>
        <script type="application/ld+json">
          {JSON.stringify(qaStructuredData)}
        </script>
        <div className="padding25 marginTop20">
          <div className="borderBtm borderGrey paddingBtm marginBottom20">
            <div className="chatItemFlexContainer">
              <span className="qTitle qaPage marginBottom20 breakWord"><strong>{qaItem.title}</strong></span>
              <span className="absolute right20">
                <Modal {...AddHighlightModalProps}>
                  <AddHighlightModalContent modalID="modal-addHighlightQApage" userRole='mentee'/>
                </Modal>
              </span>
            </div>
            <div className="darkGreyText fontSize13">
              <div>
                Asked {timeSince(qaItem.datecreated)} in <span className="bubbleContainer">
                  {indArrToShow.map((indID) => {
                    let industryItem = getIndustryDeets(indID)
                    let icon = industryItem.fa
                    let indName = industryItem.label
                    return <div className="bubble noBackground" key={indID}><i className={icon} /> {indName}</div>
                  })}
                </span>{qaItem.industriesToPostTo.length > 2 ? 'and other groups' : ''}
              </div>
              <div>Active {timeSince(mostRecentActivityDate)}</div>
            </div>
          </div>
          <div className="mainBar" role="main" aria-label="question and answers">
            <div>
              <div>
                <ChevronUp />
                {qaItem.votes}
              </div>
              <div>
                <div>{qaItem.textdetail}</div>
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
                <div>
                  <div className="greyText fontSize12">
                    <div>Share</div>
                    <div>Follow</div>
                    {qIsMe == 'isMe' && (
                      <Modal {...DeleteContentModalProps}>
                        <DeleteContentModalContent />
                      </Modal>
                    )}
                    <div>Report</div>
                  </div>
                  <div className="previewSuperContainer">
                    <div className="textRight greyText fontSize12">asked <DateCalc time={qaItem.datecreated} showPureDate /> at <TimeCalc time={qaItem.datecreated} /></div>
                    <div>
                      <div className="credentialPreviewContainer">
                        <div className="dispInlineBlock verticalAlignMiddle">
                          <Avatar userID={qaItem.uid} isAnon={qaItem.isanon} userName={qaItem.isanon ? 'Anonymous' : qAuthor.fname} showAsCircle picSize={360}/>
                        </div>
                        <div className="credDetail dispInlineBlock verticalAlignMiddle">
                          <span className="fontSize12"><strong>{qaItem.isanon ? "" : (qAuthor.fname + " " + qAuthor.lname + ", ")}</strong><span className="darkGreyText">{credentialText}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <h3>Answers to follow...</h3>
          </div>
          <div className="sideBar" role="complementary" aria-label="sidebar">
            SIDEBAR PLACEHOLDER
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default QA;
