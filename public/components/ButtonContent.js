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
    default:
      return <div>{text}</div>
  }
}

export default ButtonContent;
