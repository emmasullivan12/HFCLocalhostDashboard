// Dex last merged this code on 19th july 2021

import React, { Component } from "react";
import ReactDOM from "react-dom";
import {X, Check} from "./GeneralFunctions.js";
import "../css/ButtonContent.css";

function ButtonContent(props) {
  const usedFor = props.usedFor;
  const text = props.text;

  switch (usedFor) {
    case 'picContainer':
      return (
        <div type="button" className="picContainer">
          <i className="fas fa-camera" />
        </div>
      );
    case 'attachmentContainer':
      return (
        <div type="button" className="attachmentContainer">
          <i className="fas fa-paperclip" />
        </div>
      );
    case 'openFlexContainer':
      return (
        <div className="chatInfoContainer">
          <i className="fas fa-info-circle"/>
        </div>
      );
    case 'joinProgLrg':
      return (
        <div>+ Join a live Group</div>
      );
    case 'joinProg':
      return (
        <div className="chatMenuItem menuCTA">
          <span className="menuCTA">+ Join a Group...</span>
        </div>
      );
    case 'joinProgSml':
    case 'addPrDM':
      return (
        <div className="addContainer">
          <i className="fas fa-plus" />
        </div>
      );
    case 'editSection':
      return (
        <div className="editSectionBtnContainer">
          <i className="fas fa-pencil-alt" />
        </div>
      )
    case 'joinProgSmlHome':
    case 'addPicBtn':
    case 'addPicBtn userMenuPlus':
    case 'addPicBtn msg-thumb':
    case 'addPicBtn msg-thumb isGroupFlex':
    case 'addPicBtn msg-thumb isGroupFlex smallIdle':
      return (
        <i className="fas fa-plus" />
      );
    case 'mentor-msgBtn-profile':
    case 'mentee-msgBtn-profile':
      return (
        <i className="fas fa-user" />
      );
    case 'mentor-usrName-profile':
    case 'mentee-usrName-profile':
      return (
        <span className="sender-name">{text}</span>
      );
    case 'settings':
      return (
        <div className="settings-Btn-txt">
          {text}
        </div>
      );
    case 'manageFeedbackFromUserMenu':
      return (
        <div className="mngFeedback-Btn-txt">
          {text}
        </div>
      );
  /*  case 'addPrDM':
      return (
        <div>
          &#10010;
        </div>
      );*/
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
    case 'signupToReview-accept':
      return (
        <Check />
      )
    case 'signupToReview-reject':
      return (
        <X />
      )
    default:
      return <div className="overflow-ellipsis">{text}</div>
  }
}

export default ButtonContent;
