// Dex last merged this code on 15th Sept 2019

import React, { Component } from "react";
import PrMessage from "./PrMessage";

function isNewDay(prevMsg, message) {
  var prevMsgDate = new Date(prevMsg.ts * 1000);
  var msgDate = new Date(message.ts * 1000);
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
  if (isNewDay(prevMsg,message)) {
    return true;
  } else {
    return false;
  }
}

function checkIsAdjacent(prevMsg, message) {
  if (prevMsg.uid != message.uid) {
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
        id: '99990',
        uid: '11111',
        type: 'message',
        subtype: 'prAuto',
        author: 'emma',
        ts: 1525209202,
        text: 'This is the start of your chat!',
        prAuto: {
          title: 'start'
        }
      },
      {
        id: '99991',
        uid: '23456',
        type: 'message',
        subtype: 'mentorAcc',
        author: 'emma',
        ts: 1525209202,
        text: 'This is emmas message'
      },
      {
        id: '99992',
        uid: '11111',
        type: 'message',
        subtype: 'mentorRej',
        author: 'emma',
        ts: 1525209202,
        text: 'This is emmas message'
      },
      {
        id: '99993',
        uid: '23456',
        type: 'message',
        subtype: 'prAuto',
        author: 'emma',
        ts: 1525209202,
        text: 'This is emmas message',
        prAuto: {
          title: 'prompt'
        }
      },
      {
        id: '99994',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma',
        ts: 1525209202,
        text: 'This is emmas message'
      },
      {
        id: '99995',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma',
        ts: 1525209202,
        text: 'This is emmas message'
      },
      {
        id: '99996',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma',
        ts: 1525209202,
        text: 'This is emmas message'
      },
      {
        id: '99997',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: 1535209202,
        text: 'This is dex message'
      },
      {
        id: '99998',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: 1535209202,
        text: 'This is dex message'
      },
      {
        id: '99999',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma',
        ts: 1545209202,
        text: 'This is emmas message'
      },
      {
        id: '100000',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: 1545209202,
        text: 'This is dex message'
      },
      {
        id: '100001',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: 1565209202,
        text: 'This is dex message'
      },
      {
        id: '100002',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma',
        ts: 1565209202,
        text: 'This is emmas message'
      },
      {
        id: '100003',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: 1565209202,
        text: 'This is dex message'
      },
      {
        id: '100004',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma',
        ts: 1565209202,
        text: 'This is emmas message'
      },
      {
        id: '100005',
        uid: '23456',
        type: 'message',
        subtype: 'file',
        author: 'emma-student',
        ts: 1565209202,
        text: 'Emma sent you a picture',
        file: {
          id: '99999',
          name: 'Image uploaded from iOS',
          title: 'Here is a pic of my office at lunchtime!',
          uid: '23456',
          imgurl: 'https://prospela.com/wp-content/uploads/2019/02/Harj-1.jpeg'
        }
      },
      {
        id: '100006',
        uid: '23456',
        type: 'message',
        subtype: 'menteeReq',
        author: 'emma-student',
        ts: 1565209202,
        text: 'Hi Im Emma studying Business, Maths and English. I’m interested in learning more about marketing and hear more about your work at Pladis. I think the company looks very interesting. I also like tennis!',
      },
      {
        id: '100007',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: 1565367993,
        text: 'This is dex message'
      },
      {
        id: '100008',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: 1565367993,
        text: 'This is dex message'
      },
      {
        id: '100009',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        ts: 1565367993,
        text: 'This is dex message'
      },
      {
        id: '100010',
        uid: '12345',
        type: 'message',
        subtype: 'prAuto',
        author: 'prospela',
        ts: 1565367993,
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
        ts: 1565367993,
        prAuto: {
          title: 'ended'
        }
      }
    ];
    var prevMsg = {};

    return (
      <React.Fragment>
        <div className="messages-container" >
        {messages.map((message, index) => {
        const showDateHeader = (index===0 ? true : shouldShowDateHeader(prevMsg, message));
        const isAdjacent = (index===0 || showDateHeader===true ? false : checkIsAdjacent(prevMsg, message));
        prevMsg = message;
          return (
            <PrMessage
              message={message}
              key={message.id}
              showDateHeader={showDateHeader}
              isAdjacent={isAdjacent}
            />
          )
        })}
        </div>
      </React.Fragment>
    );
  }
}

export default PrMessagesList;
