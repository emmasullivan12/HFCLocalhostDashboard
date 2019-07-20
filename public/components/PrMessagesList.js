// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import PrMessage from "./PrMessage";

class PrMessagesList extends Component {
  render() {
    const messages = [
      {
        id: '99995',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '09:10am',
        text: 'This is my message'
      },
      {
        id: '99996',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '10:10am',
        text: 'This is my message'
      },
      {
        id: '99997',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '11:10am',
        text: 'This is my message'
      },
      {
        id: '99998',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '11:50am',
        text: 'This is my message'
      },
      {
        id: '99999',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '11:59am',
        text: 'This is my message'
      },
      {
        id: '100000',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '12:10pm',
        text: 'This is my message'
      },
      {
        id: '100001',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '13:10pm',
        text: 'This is my message'
      },
      {
        id: '100002',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '14:10pm',
        text: 'This is my message'
      },
      {
        id: '100001',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '15:10pm',
        text: 'This is my message'
      },
      {
        id: '100002',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '16:10pm',
        text: 'This is my message'
      },
      {
        id: '100003',
        uid: '23456',
        type: 'message',
        subtype: 'file',
        author: 'emma-student',
        time: '17:10pm',
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
        id: '100004',
        uid: '23456',
        type: 'message',
        subtype: 'menteeReq',
        author: 'emma-student',
        time: '18:10pm',
        text: 'You have a new student who would really appreciate your mentorship!',
        chatReq: {
          chatID: '12345',
          reqMsg: 'Hi Im Emma studying Business, Maths and English. I’m interested in learning more about marketing and hear more about your work at Pladis. I think the company looks very interesting. I also like tennis!',
        }
      },
      {
        id: '100005',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '19:10pm',
        text: 'This is my message'
      },
      {
        id: '100006',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '20:10pm',
        text: 'This is my message'
      },
      {
        id: '100007',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '21:10pm',
        text: 'This is my message'
      },
      {
        id: '100008',
        uid: '12345',
        type: 'message',
        subtype: 'prAuto',
        author: 'prospela',
        time: '22:10pm',
        prAuto: {
          title: 'ending'
        }
      },
      {
        id: '100009',
        uid: '12345',
        type: 'message',
        subtype: 'prAuto',
        author: 'prospela',
        time: '23:10pm',
        prAuto: {
          title: 'ended'
        }
      }
    ];

    return (
      <React.Fragment>
        <div className="messages-container">
        {messages.map(message => (
          <PrMessage
            message={message}
            key={message.id}
          />
        ))}
        </div>
      </React.Fragment>
    );
  }
}

export default PrMessagesList;
