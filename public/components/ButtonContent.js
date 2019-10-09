// Dex last merged this code on 12th Sept 2019

import React, { Component } from "react";
import {
  Route,
  NavLink
} from "react-router-dom";
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
    case 'joinProgLrg':
      return (
        <div>Join a live Programme +</div>
      )
    case 'joinProg':
      return (
        <div className="chatMenuItem menuCTA">
          <span className="menuCTA">+ Join a Programme...</span>
        </div>
      )
    case 'joinProgSml':
      return (
        <div className="addContainer">
          <i className="fas fa-plus" />
        </div>
      )
    case 'joinProgSmlHome':
    case 'addPicBtn':
    case 'addPicBtn userMenu-thumb':
    case 'addPicBtn msg-thumb':
      return (
        <i className="fas fa-plus" />
      )
    case 'settings':
      return (
        <div className="settings-Btn-txt">
          {text}
        </div>
      );
    case 'addPrDM':
      return (
        <div>
          &#10010;
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
    case 'mentee-prauto-profile':
      return (
        <div className="msg-extras-ctaTxt">
          See Full Profile...
        </div>
      );
    default:
      return <div>{text}</div>
  }
}

export default ButtonContent;
