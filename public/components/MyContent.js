// Dex last merged this code on 16th jan 2022

import React, { Component } from "react";

import AskAQPrompt from "./AskAQPrompt";
import MyContentItem from "./MyContentItem";

class MyContent extends Component {

  render() {
    const {userRole, contentType} = this.props
  //  const contentArr = []
  /*  const contentArr = [ // Questions
      {
        qid: '123456',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: [], // no answers yet
        industriesToPostTo: ['2','19'],
        hashtags: ['23'],
        hashtagsfreetext: ['my free text hashtag'],
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
    ]*/
    const contentArr = [ // Answers
      {
        hid: '1234',
        uid: '123',
        fname: 'Emma',
        lname: 'Sullivan',
        title: 'What is the best thing to wear to an interview?',
        authorinst: '',
        authorinstfreetext: 'Really Long Institution Name',
        authorrole: '',
      //  authorroleishidden: 0,
        authordegree: 'BSc (Hons) Business Administration',
        authortraining: '',
        authorinsttype: 'uni',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-05T19:30:50.667Z',
        text: 'first answer sfgh sldfkj ghlskjdf hglkjsd fhgkjls dhflkjg hsdlfkj ghlksdjfh glkjsd fhgkljsdh fgkjlh sdlfkj ghlskdjf ghlkjsdfh gkljsdfh glkjsdfh gkljsdh fgkjlhds flkgjh sdlkfj ghslkdjf ghlksjdf glksjdfh glsjkdf gkljsdf hglkjsd fhglkjsdfh glksjdfh glskjdfh glkjsdfh glkjsdfh gkljsdfh glkjsdfh gkjlsd fhgkljsdh fklgjhs dflkjgh slkdfj ghskldjf ghslkdfjgh lskdjf ghlskdjfgh slkdjf ghlksdfjgh ',
        isanon: 0,
        votes: [],
        isacceptedanswer: false,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#firstanswer',
      },
      {
        hid: '1235',
        uid: '124',
        fname: 'Dave',
        lname: 'Petrie',
        title: 'What is it like working at Pladis?',
        authorinst: '',
        authorinstfreetext: '',
        authorrole: '',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: '',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-06T13:30:50.667Z',
        text: 'second answer sfgh sldfkj ghlskjdf hglkjsd fhgkjls dhflkjg hsdlfkj ghlksdjfh glkjsd fhgkljsdh fgkjlh sdlfkj ghlskdjf ghlkjsdfh gkljsdfh glkjsdfh gkljsdh fgkjlhds flkgjh sdlkfj ghslkdjf ghlksjdf glksjdfh glsjkdf gkljsdf hglkjsd fhglkjsdfh glksjdfh glskjdfh glkjsdfh glkjsdfh gkljsdfh glkjsdfh gkjlsd fhgkljsdh fklgjhs dflkjgh slkdfj ghskldjf ghslkdfjgh lskdjf ghlskdjfgh slkdjf ghlksdfjgh',
        isanon: 1,
        votes: ['12','23'],
        isacceptedanswer: true,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#secondanswer',
      },
      {
        hid: '1236',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        title: 'When should I apply to grad schemes (what time of year)?',
        authorinst: '',
        authorinstfreetext: 'Pladis',
        authorrole: 'Marketing Manager',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: 'job',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-07T13:30:50.667Z',
        text: 'third answer',
        isanon: 0,
        votes: ['123','20'],
        isacceptedanswer: false,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#thirdanswer',
      }
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
