// Dex last merged this code on 12th jan 2021

import React, { Component } from "react";
import PrMessage from "./PrMessage";

function isNewDay(prevMsg, message) {
  var prevMsgDate = new Date(prevMsg.ts);
  var msgDate = new Date(message.ts);
  msgDate.setHours(0);
  msgDate.setMinutes(0);
  msgDate.setSeconds(0);
  if (prevMsgDate < msgDate) {
    return true;
  } else {
    return false;
  }
}

function shouldShowDateHeader(prevMsg, message) {
//  var showDateHeader;
  if (isNewDay(prevMsg,message) && message.mid != 1 && message.subtype != 'welcome') {
    return true;
  } else {
    return false;
  }
}

function checkIsAdjacent(prevMsg, message) {
  if (prevMsg.uid != message.uid || message.subtype === 'welcome') {
    return false;
  } else {
    return true;
  }
}

class PrMessagesList extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const messages = [
      {
        id: '99989',
        uid: '55555',
        type: 'message',
        subtype: 'prAuto',
        author: 'prospela',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is the start of your chat!',
        prAuto: {
          title: 'start'
        }
      },
      {
        id: '99990',
        uid: '23456',
        type: 'message',
        subtype: 'mentorAcc',
        author: 'emma',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is emmas message'
      },
      {
        id: '99991',
        uid: '11111',
        type: 'message',
        subtype: 'mentorRej',
        author: 'emma',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is emmas message'
      },
      {
        id: '99992',
        uid: '23456',
        type: 'message',
        subtype: 'prAuto',
        author: 'emma',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is *emmas* message :smiley:s',
        prAuto: {
          title: 'prompt'
        }
      },
      {
        id: '99993',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma',
        ts: '2020-09-01T13:30:50.667Z',
        text: '~This <b>is</b>~ ~This <b>is</b>~ _This <b>is</b>_ ** *bold* **bold* ***bold* ****bold* ~~ ~~~ ~~~~ ~yo~ ~~yo~ ~~~yo~ ~~~~yo~ my_profile my__profile my___profile my____profile _italics_ and ~<script> *emmas* _message_~\n></script> \nhttps://www.pr~ospel~a.com/myprofil_enumbe_r89__linesarebeforethis or https://www.prospela.com/myprofil_enumbe_r89__linsebefore https://prospela.com/my*profile* https://prospela.com/my~profile~yeah https://prospela.com/my~~profile~yeah'
      },
      {
        id: '99994',
        uid: '55555',
        type: 'message',
        subtype: 'welcome',
        author: 'prospela',
        ts: '2020-09-01T13:30:50.667Z',
        text: ''
      },
      {
        id: '99995',
        uid: '55555',
        type: 'message',
        subtype: 'finTraining',
        author: 'prospela',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is emmas message'
      },
      {
        id: '99996',
        uid: '223458',
        type: 'message',
        subtype: 'std',
        author: 'emma-prospela',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is emma-prospela message'
      },
      {
        id: '99997',
        uid: '223457',
        type: 'message',
        subtype: 'std',
        author: 'emmaMoonraker',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is moonraker message'
      },
      {
        id: '99998',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is emmas message',
        reactions: [
          {
            name: ":santa::skin-tone-3:",
            users: [
              '23456',
              '223457',
            ],
            count: 2
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":heart_eyes:",
            users: [
              '23456',
              '223458',
              '223459',
              '223460'
            ],
            count: 4
          },
        ]
      },
      {
        id: '99999',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is dex message',
        reactions: [
          {
            name: ":santa::skin-tone-3:",
            users: [
              '23456',
              '223457',
            ],
            count: 2
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":heart_eyes:",
            users: [
              '23456',
              '223458',
              '223459',
              '223460'
            ],
            count: 4
          },
        ]
      },
      {
        id: '100000',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is dex message'
      },
      {
        id: '100001',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma',
        ts: '2020-09-01T13:30:50.667Z',
        text: 'This is emmas message',
        reactions: [
          {
            name: ":santa::skin-tone-3:",
            users: [
              '23456',
              '223457',
            ],
            count: 2
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":heart_eyes:",
            users: [
              '23456',
              '223458',
              '223459',
              '223460'
            ],
            count: 4
          },
        ]
      },
      {
        id: '100002',
        uid: '12345',
        type: 'message',
        subtype: 'notSent',
        author: 'dexter',
        ts: '2020-09-02T13:30:50.667Z',
        text: 'This is dex message'
      },
      {
        id: '100003',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma',
        ts: '2020-09-02T13:30:50.667Z',
        text: 'This is emmas message',
        reactions: [
          {
            name: ":santa::skin-tone-3:",
            users: [
              '23456',
              '223457',
            ],
            count: 2
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":heart_eyes:",
            users: [
              '23456',
              '223458',
              '223459',
              '223460'
            ],
            count: 4
          },
        ]
      },
      {
        id: '100004',
        uid: '223456',
        type: 'message',
        subtype: 'file',
        author: 'simon',
        ts: '2020-09-02T13:30:50.667Z',
        text: 'Emma sent you a picture',
        file: {
          id: '99999',
          name: 'Image uploaded from iOS',
          title: 'Here is a pic of my office at lunchtime!',
          uid: '23456',
          fileType: 'image/jpeg',
          imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'
        }
      },
      {
        id: '100005',
        uid: '23456',
        type: 'message',
        subtype: 'uploadNotSent',
        author: 'emma-student',
        ts: '2020-09-02T13:30:50.667Z',
        text: 'Emma sent you a picture',
        file: {
          id: '99999',
          name: 'Image uploaded from iOS',
          title: 'Here is a pic of my office at lunchtime!',
          uid: '23456',
          fileType: 'image/jpeg',
          imgurl: 'https://prospela.com/wp-content/uploads/2019/02/Harj-1.jpeg'
        }
      },
      {
        id: '100006',
        uid: '23456',
        type: 'message',
        subtype: 'menteeReq',
        author: 'emma-student',
        ts: '2020-09-02T13:30:50.667Z',
        text: 'Hi Im Emma *studying Business*, Maths and English. I’m _interested in learning_ more about marketing and hear more about your work at Pladis. I think the company looks very interesting. I also like tennis!',
      },
      {
        id: '100007',
        uid: '99999',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: '2020-09-03T13:30:50.667Z',
        text: 'This is dex message',
        reactions: [
          {
            name: ":santa::skin-tone-3:",
            users: [
              '23456',
              '223457',
            ],
            count: 2
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":heart_eyes:",
            users: [
              '23456',
              '223458',
              '223459',
              '223460'
            ],
            count: 4
          },
        ]
      },
      {
        id: '100008',
        uid: '99999',
        type: 'message',
        subtype: 'notSent',
        author: 'dexter',
        ts: '2020-09-03T13:30:50.667Z',
        text: 'This is dex message *bold* _italics_'
      },
      {
        id: '100009',
        uid: '99999',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: '2020-09-03T13:30:50.667Z',
        text: 'This is dex message'
      },
      {
        id: '100010',
        uid: '12345',
        type: 'message',
        subtype: 'prAuto',
        author: 'prospela',
        ts: '2020-09-03T13:30:50.667Z',
        prAuto: {
          title: 'ending'
        }
      },
      {
        id: '100011',
        uid: '12345',
        type: 'message',
        subtype: 'prAuto',
        author: 'prospela',
        ts: '2020-09-03T13:30:50.667Z',
        text: 'This is dex message',
        prAuto: {
          title: 'match'
        }
      },
      {
        id: '100012',
        uid: '23456',
        type: 'message',
        subtype: 'uploadNotSent',
        author: 'emma-student',
        ts: '2020-09-04T13:30:50.667Z',
        text: 'Emma sent you a picture',
        file: {
          id: '99989',
          name: 'Image uploaded from iOS',
          title: 'Here <b>is a</b> *pic* of my _office_ at lunchtime!',
          uid: '23456',
          imgurl: 'https://prospela.com/wp-content/uploads/2019/02/Harj-1.jpeg'
        }
      },
      {
        id: '100013',
        uid: '12345',
        type: 'message',
        subtype: 'prAuto',
        author: 'prospela',
        ts: '2020-09-03T13:30:50.667Z',
        prAuto: {
          title: 'ended'
        }
      },
      {
        id: '100014',
        uid: '223458',
        type: 'message',
        subtype: 'std',
        author: 'emma-prospela',
        ts: '2020-09-03T14:30:50.667Z',
        text: 'This is emma-prospela message. How is it going? Just trying to make this a super long message so I can try and see how its line spacing looks and improve on it. What do you think?'
      },
      {
        id: '100015',
        uid: '223458',
        type: 'message',
        subtype: 'std',
        author: 'emma-prospela',
        ts: '2020-09-03T15:30:50.667Z',
        text: 'This is emma-prospela message. How is it going? Just trying to make this a super long message so I can try and see how its line spacing looks and improve on it. What do you think?'
      },
      {
        id: '100016',
        uid: '223458',
        type: 'message',
        subtype: 'std',
        author: 'emma-prospela',
        ts: '2020-09-03T16:30:50.667Z',
        text: 'This is emma-prospela message. How is it going? Just trying to make this a super long message so I can try and see how its line spacing looks and improve on it. What do you think?',
        reactions: [
          {
            name: ":santa::skin-tone-3:",
            users: [
              '23456',
              '223457',
            ],
            count: 2
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":smiley:",
            users: [
              '23456',
              '223458',
              '223459'
            ],
            count: 3
          },
          {
            name: ":heart_eyes:",
            users: [
              '23456',
              '223458',
              '223459',
              '223460'
            ],
            count: 4
          },
        ]
      },
    ];

    const {handleLastPic, founders, pms, scrollToNewMessage} = this.props

    var prevMsg = {};

    const prTeam = ['223458', '223459', '223460']

    return (
      <React.Fragment>
        <div className="messages-container" >
          {messages.map((message, index) => {
            const showDateHeader = (index===0 ? true : shouldShowDateHeader(prevMsg, message));
            const prospelaBotID = '8d91cd17-5858-4a52-acd8-5ebb8bc24199'
            const isProspelaAuto = message.uid === prospelaBotID

            const isProspelaTeam = prTeam && prTeam.includes(message.uid)

            const isFounder = founders && founders.includes(message.uid)
            const isPM = pms && pms.includes(message.uid)
            const isAdjacent = ((index===0 || showDateHeader===true) ? false : checkIsAdjacent(prevMsg, message));
            const isLastPic = message.id == 100013 ? true : false

            prevMsg = message;
              return (
                <PrMessage
                  message={message}
                  key={message.id}
                  showDateHeader={showDateHeader}
                  isAdjacent={isAdjacent}
                  isLastPic={isLastPic}
                  handleLastPic={handleLastPic}
                  isProspelaAuto={isProspelaAuto}
                  isProspelaTeam={isProspelaTeam}
                  isFounder={isFounder}
                  isPM={isPM}
                />
              )
            })}
        </div>
      </React.Fragment>
    );
  }
}

export default PrMessagesList;
