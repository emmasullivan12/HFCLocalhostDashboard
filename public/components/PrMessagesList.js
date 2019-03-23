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
        subtype: 'file',
        author: 'emma-student',
        time: '12:10pm',
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
          <div className="messages-container">
          {messages.map(message => (
            <PrMessage
              message={message}
              key={message.id}
            />
          ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PrMessagesList;
