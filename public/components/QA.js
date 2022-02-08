// Dex last merged this code on 10th August 2019

import React, { Component } from "react";

class QA extends Component {

  render() {
    const qaItem = {
      qid: '123456',
      datecreated: '2020-09-04T13:30:50.667Z',
      title: 'What is the best thing to wear to an interview?',
      textdetail: 'I know we have to be professional, but would like to stand out if possible.',
      hids: [], // no answers yet
      //hids: ['1234','1235'],
      industriesToPostTo: ['2','19'],
      hashtags: ['23'],
      hashtagsfreetext: ['my free text hashtag'],
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
    }
    const hidsArr = [
      {
        hid: '1234',
        datecreated: '2020-09-04T13:30:50.667Z',
        text: 'first answer',
        votes: 12,
        isacceptedanswer: true,
        url: 'google.com/answer/#firstanswer',
      },
      {
        hid: '1235',
        datecreated: '2020-09-04T13:30:50.667Z',
        text: 'second answer',
        votes: 10,
        isacceptedanswer: false,
        url: 'google.com/answer/#secondanswer',
      },
      {
        hid: '1236',
        datecreated: '2020-09-04T13:30:50.667Z',
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

    return (
      <React.Fragment>
        <script type="application/ld+json">
          {JSON.stringify(qaStructuredData)}
        </script>
        <div>
          <h3>Question page!</h3>
          <div>Question: {qaStructuredData.mainEntity.name}</div>
          <div>Detail: {qaStructuredData.mainEntity.text}</div>
          <div>Upvotes: {qaStructuredData.mainEntity.upvoteCount}</div>
          <br />
          <h3>Answers to follow...</h3>
        </div>
      </React.Fragment>
    );
  }
}

export default QA;
