import React, { Component } from "react";
import ChatWindow from './ChatWindow.js';
import MtchdUsrProfile from './MtchdUsrProfile.js';
import "../css/ProspelaBot.css";

const matchesProfile = (
  <MtchdUsrProfile />
)

class ProspelaBot extends Component {
  render() {
    return (
      <React.Fragment>
        <ChatWindow flexContent={matchesProfile} className="chatWindowContainer" />
      </React.Fragment>
    );
  }
}

/*
// Dummy mentor data (this will eventually come from Postgres)
const DUMMY_CHAT_MESSAGES = [
  {
    chatId: '100001',
    chatTitle: 'emma-and-david',
    type: 'message',
    messageID: '000001',
    sender: {
      id: '12345',
      name: 'David',
      avatarUrl: "https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000",
    },
    msgSentTime: '12:10pm',
    messageContent: 'This is my message'
  },
  {
    chatId: '100001',
    chatTitle: 'emma-and-david',
    type: 'message',
    messageID: '000002',
    sender: {
      id: '54321',
      name: 'Emma',
      avatarUrl: "https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg",
    },
    msgSentTime: '12:11pm',
    messageContent: 'This is my message too'
  },
  {
    chatId: '100001',
    chatTitle: 'emma-and-david',
    type: 'mentorReq',
    messageID: '000003',
    sender: {
      id: '12345',
      name: 'David',
      avatarUrl: "https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000",
    },
    msgSentTime: '12:12pm',
    messageContent: 'You have a new mentee request!!'
  },
  {
    chatId: '100001',
    chatTitle: 'emma-and-david',
    type: 'message',
    messageID: '000004',
    sender: {
      id: '12345',
      name: 'David',
      avatarUrl: "https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000",
    },
    msgSentTime: '12:15pm',
    messageContent: 'Yeah bru'
  }
]
*/
export default ProspelaBot;
