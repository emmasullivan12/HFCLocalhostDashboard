// Dex last merged this code on 16th jan 2022

import React, { Component } from "react";

import AskAQPrompt from "./AskAQPrompt";
import MyContentItem from "./MyContentItem";

class MyContent extends Component {

  render() {
    const {userRole, contentType} = this.props
  //  const contentArr = []
    const contentArr = [
      {
        qid: '123456',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: [], // no answers yet
        industriesToPostTo: ['2','19'],
        hashtags: ['23'],
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
        qid: '123457',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: ['1234','1235'], // 2 answers
        industriesToPostTo: ['2','19'],
        hashtags: ['23','11','30','55','61'],
        hashtagsfreetext: ['my free text hashtag'],
      },
    ]
    console.log("gets here: MyContent")
    console.log(userRole)
    console.log(contentType)

    return (
      <div className="mycontent-container">
        {contentArr.length == 0 && userRole == "mentee" && (
          <AskAQPrompt userRole="mentee" hasNoContentYet />
        )}
        {contentArr.length == 0 && userRole == "mentor" && (
          <AskAQPrompt userRole="mentor" hasNoContentYet/>
        )}
        {contentArr.length > 0 && contentArr.map((post, index) => {
          return (
            <MyContentItem
              contentType={contentType}
              key={post.qid ? post.qid : post.hid}
              post={post}
            />
          )
        })}
      </div>
    );
  }
}

export default MyContent;
