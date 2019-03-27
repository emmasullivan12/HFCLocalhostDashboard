import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/ButtonContent.css";

function ButtonContent(props) {
  const usedFor = props.usedFor;
  const text = props.text;

  switch (usedFor) {
    case 'attachmentContainer':
      return (
        <button type="button" className="attachmentContainer">
          <i className="fas fa-paperclip" />
        </button>
      );
    default:
      return <div>{text}</div>
  }
}

export default ButtonContent;
