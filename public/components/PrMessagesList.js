import React, { Component } from "react";
import PrMessage from "./PrMessage";

class PrMessagesList extends Component {
  render() {
    const messages = [
      {
        id: '100001',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '12:10pm',
        text: 'This is my message'
      },
      {
        id: '100002',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '12:10pm',
        text: 'This is my message'
      },
      {
        id: '100003',
        uid: '23456',
        type: 'message',
        subtype: 'std',
        author: 'emma-student',
        time: '12:10pm',
        text: 'This is my message'
      },
      {
        id: '100004',
        uid: '23456',
        type: 'message',
        subtype: 'menteeReq',
        author: 'emma-student',
        time: '12:10pm',
        text: 'This is a request for a mentor woohoo!'
      },
      {
        id: '100005',
        uid: '12345',
        type: 'message',
        subtype: 'std',
        author: 'dexter',
        time: '12:10pm',
        text: 'This is my message'
      }
    ];

    return (
      <React.Fragment>
      <div>
        <ul>
        {messages.map(message => (
          <PrMessage
            message={message}
            key={message.id}
          />
        ))}
        </ul>
      </div>
      </React.Fragment>
    );
  }
}

export default PrMessagesList;
