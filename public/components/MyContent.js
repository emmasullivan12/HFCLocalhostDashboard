// Last merged this code on 4th apr 2022

import React, { Component } from "react";

import AskAQPrompt from "./AskAQPrompt";
import FeedItem from "./FeedItem";

class MyContent extends Component {

  render() {
    const {userRole, contentType, updatePathName} = this.props
  //  const contentArr = []
    const contentArr = [ // Questions
      {
        qid: '123456',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: [], // no answers yet
        industriestopostto: ['2','19'],
        hashtags: ['23'],
        hashtagsfreetext: ['my free text hashtag'],
        votes: ['123','234','345','456'],
        hidden: 1,
      },
      {
        qid: '123457',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        text: 'I know we have to be professional, but would like to stand out if possible.I know we have to be professional, but would like to stand out if possible.I know we have to be professional, but would like to stand out if possible.I know we have to be professional, but would like to stand out if possible.I know we have to be professional, but would like to stand out if possible.I know we have to be professional, but would like to stand out if possible.',
        hids: ['1234','1235'], // 2 answers
        industriestopostto: ['2','19'],
        hashtags: ['23','11','30','55','61'],
        hashtagsfreetext: ['my free text hashtag'],
        votes: ['123','234','345','456'],
      },
      {
        hid: '1236',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        title: 'When should I apply to grad schemes (what time of year)?',
        industriestopostto: ['99999','19'],
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
        url: '/what-wear-to-interview/#thirdanswer',
        type: 'answer',
        relatedqid: '125',
        selectedFiles: [
          {fileid: '123', name: 'My image', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '123', name: 'My image 1', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '123', name: 'My image 2', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
        ],
      },
    ]
  /*  const contentArr = [ // Answers
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
    ]*/

    return (
      <div className="mycontent-container">
        {contentArr.length == 0 && (
          <AskAQPrompt userRole={userRole} hasNoContentYet updatePathName={updatePathName}/>
        )}
        {contentArr.length > 0 && contentArr.map((post, index) => {
          return (
            <FeedItem
              contentType={contentType}
              userRole={userRole}
              updatePathName={updatePathName}
              key={post.qid ? post.qid : post.hid}
              post={post}
              isOnMyContentPage
            />
          )
        })}
      </div>
    );
  }
}

export default MyContent;
