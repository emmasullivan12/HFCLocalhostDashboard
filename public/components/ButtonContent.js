// Dex last merged this code on 30th sept 2023

import React, { Component } from "react";
import ReactDOM from "react-dom";
import {X, Check, PenIcon} from "./GeneralFunctions.js";
import "../css/ButtonContent.css";

function ButtonContent(props) {
  const usedFor = props.usedFor;
  const text = props.text;
  const otherFormatting = props.otherFormatting

  switch (usedFor) {
    case 'picContainer':
  //  case 'highlightPicContainer':
      return (
        <div type="button" className="picContainer">
          <i className="fas fa-camera" />
        </div>
      );
    case 'attachmentContainer':
  //  case 'highlightAttachmentContainer':
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
    case 'deleteContent':
     return (
       <div className="moreActionsListItem">
         <span className="moreActionsLabel overflow-ellipsis">
           {text}
         </span>
        </div>
     )
    case 'addHighlightSml':
    case 'addHighlightMenuSml':
      return (
        <div>
          <i className="fas fa-pencil-alt" />
          {/*<span className="fontSize18 dispInlineBlock"><PenIcon /></span>*/}
        </div>
      )
    case 'addHighlight':
    case 'addHighlightDashboard':
    case 'askQuestionDashboard':
      return (
        <div>
          <span className="fontSize14 paddingR5"><i className="fas fa-pencil-alt" /></span> {text}
          {/*<span className="fontSize18 dispInlineBlock"><PenIcon /></span> {text}*/}
        </div>
      )
    case 'addHighlightQApage':
    case 'addAnswerQApage':
      return (
        <div>
          <span className="fontSize12 paddingR5"><i className="fas fa-pencil-alt" /></span> {text}
        </div>
      )
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
    case 'flagComment':
      return (
        <div className="button-unstyled">
          <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26">
            <path d="M3 2v14h2v-6h3.6l.4 1h6V3H9.5L9 2H3Z"/>
          </svg>
        </div>
      )
    case 'addEditRole':
    case 'addRoleDesc':
    case 'deleteRole':
    case 'editIndRoles':
    case 'addEditSkills':
    case 'editHobbies':
    case 'addEditWhyHelp':
    case 'editSubjects':
    case 'editUni':
    case 'addEditUni':
    case 'addEditTraining':
    case 'editSch':
    case 'addSchDesc':
    case 'addUniDesc':
      return (
        <div className="marginTop10 marginAuto smallFont">
          {text}
        </div>
      )
    case 'addEditHeadline':
      return (
        <div className="marginAuto smallFont">
          {text}
        </div>
      )
    case 'mentee-profile-prModAuto':
    case 'mentor-profile-prModAuto':
      return (
        <div className="button-unstyled userDetail-viewProfile lightPurpleText marginLeft10">
          {text}
        </div>
      )
    case 'mentor-profile-userName':
    case 'mentee-profile-userName':
      return (
        <div className="button-unstyled userNameCard-viewProfile lightPurpleText">
          {text}
        </div>
      )
    case 'mentor-profile-feedItem':
    case 'mentee-profile-feedItem':
      return (
        <strong className="darkGreyText">
          {text}
        </strong>
      )
    case 'mentor-profile-qaItem':
    case 'mentee-profile-qaItem':
      return (
        <strong>
          {text}
        </strong>
      )
    case 'joinProgSmlHome':
    case 'addPicBtn':
    case 'addPicBtn userMenuPlus':
    case 'addPicBtn msg-thumb':
    case 'addPicBtn msg-thumb isGroupFlex':
    case 'addPicBtn msg-thumb isGroupFlex smallIdle':
    case 'addPicBtn msg-thumb smallIdle':
      return (
        <i className="fas fa-plus" />
      );
    case 'mentor-msgBtn-profile':
    case 'mentee-msgBtn-profile':
      return (
        <i className="fas fa-user" />
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
      return <div className={"overflow-ellipsis " + otherFormatting}>{text}</div>
  }
}

export default ButtonContent;
