// Dex last merged this code on 10th August 2019

import React, { Component } from "react";

import Avatar from './Avatar.js';
import {ChevronUp, DateCalc, TimeCalc} from './GeneralFunctions.js';
import {getIndustryDeets, convertHashtags, getCredText} from './UserDetail.js';

class QA extends Component {

  render() {
    const qaItem = {
      qid: '123456',
      uid: '123',
      datecreated: '2020-09-04T13:30:50.667Z',
      lastupdated: '2020-09-05T13:30:50.667Z',
      title: 'What is the best thing to wear to an interview?',
      textdetail: 'I know we have to be professional, but would like to stand out if possible.',
      hids: [], // no answers yet
      //hids: ['1234','1235'],
      industriesToPostTo: ['2','19'],
      hashtags: ['23','20'],
      hashtagsfreetext: ['my free text hashtag'],
      isanon: 0,
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
    const author = {uid: '123', fname: 'Emma', lname: 'Sullivan'}
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
    let hidsActiveDatesArr = hidsArr.map(hid => hid.lastupdated);
    let activeDatesArr = [
      ...qaItem.lastupdated,
      hidsActiveDatesArr
    ]
    const mostRecentActivityDate = new Date(Math.max(...activeDatesArr.map(e => new Date(e))));
    const hashtagsCommaString = (qaItem.hashtags.length > 0 || qaItem.hashtagsfreetext.length > 0) ? convertHashtags(qaItem.hashtags, qaItem.hashtagsfreetext) : []
    const hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')

    return (
      <React.Fragment>
        <script type="application/ld+json">
          {JSON.stringify(qaStructuredData)}
        </script>
        <div>
          <h3>Question</h3>
          <div>
            <div>{qaItem.title}</div>
            <div>
              in
              <div className="bubbleContainer">
                {qaItem.industriesToPostTo.map((indID) => {
                  let industryItem = getIndustryDeets(indID)
                  let icon = industryItem.fa
                  let indName = industryItem.label
                  return <div className="bubble" key={indID}><i className={icon} /> {indName}</div>
                })}
              </div>
            </div>
            <div>
              <div>Asked {qaItem.datecreated}</div>
              <div>Active {mostRecentActivityDate}</div>
            </div>
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
                  <div>
                    {/*<div>Share</div>
                    <div>Follow</div> */}
                    <div>Delete</div>
                  {/*  <div>Report</div> */}
                  </div>
                  <div className="previewSuperContainer">
                    <div className="textRight greyText fontSize14">asked <DateCalc time={qaItem.datecreated} showPureDate /> at <TimeCalc time={qaItem.datecreated} /></div>
                    <div>
                      <div className="credentialPreviewContainer">
                        <div className="dispInlineBlock verticalAlignMiddle">
                          <Avatar userID={qaItem.uid} isAnon={qaItem.isanon} userName={qaItem.isanon ? 'Anonymous' : author.fname} showAsCircle picSize={360}/>
                        </div>
                        <div className="credDetail dispInlineBlock verticalAlignMiddle">
                          <span className="fontSize12"><strong>{qaItem.isanon ? "" : (author.fname + " " + author.lname + ", ")}</strong><span className="darkGreyText">{credentialText}</span></span>
                        </div>
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
      </React.Fragment>
    );
  }
}

export default QA;
