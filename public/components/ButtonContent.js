// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/ButtonContent.css";

function ButtonContent(props) {
  const usedFor = props.usedFor;
  const text = props.text;

  switch (usedFor) {
    case 'picContainer':
      return (
        <div type="button" className="picContainer">
          <i className="far fa-image" />
        </div>
      );
    case 'attachmentContainer':
      return (
        <div type="button" className="attachmentContainer">
          <i className="fas fa-paperclip" />
        </div>
      );
    case 'RequestChat':
      return (
        <div type="button" className="RequestChatBtnContainer">
          <div className="RequestChatIcon">
            <i className="fas fa-circle" />
          </div>
          <div className="RequestChatBtnTxt">
            {text}
          </div>
        </div>
      );
    default:
      return <div>{text}</div>
  }
}

export default ButtonContent;
