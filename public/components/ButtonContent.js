// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/ButtonContent.css";

function ButtonContent(props) {
  const usedFor = props.usedFor;
  const text = props.text;

  switch (usedFor) {
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
