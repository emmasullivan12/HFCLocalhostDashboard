// Dex last merged this code on 14th apr 2021

import React, { Component } from "react";

import MyContentItem from "./MyContentItem";

class MyQuestions extends Component {

  render() {
    const qs = [
      {
        qid: '123456',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: [], // no answers yet
        industriesToPostTo: ['2','19'],
        hashtags: ['23','11'],
        hashtagsfreetext: ['my free text hashtag'],
      //  votes jsonb
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
      },
      {
        qid: '123456',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: ['1234','1235'], // 2 answers
        industriesToPostTo: ['2','19'],
        hashtags: ['23','11'],
        hashtagsfreetext: ['my free text hashtag'],
      },
    ]

    return (
      <div className="mycontent-container">
        {qs.map((q, index) => {
          return (
            <MyContentItem
              contentType="q"
              key={q.qid}
            />
          )
        })}
      </div>
    );
  }
}

export default MyQuestions;
