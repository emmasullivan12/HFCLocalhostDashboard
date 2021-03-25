// Dex last merged this code on 25th mar 2021

import React from "react";
import ReactDOM from "react-dom";

import AcceptSignUpContent from "./AcceptSignUpContent.js";
import Modal from "./Modal.js";
import RejectSignUpContent from "./RejectSignUpContent.js";
import {Check} from './GeneralFunctions.js';
import {userFlagEmoji, convertRole} from './UserDetail.js';

const AcceptSignUpModalProps = {
  ariaLabel: 'Popup to accept signup',
  triggerText: 'Accept Signup',
  usedFor: 'signupToReview-accept',
  changeInitFocus: true
}

const RejectSignUpModalProps = {
  ariaLabel: 'Popup to reject signup',
  triggerText: 'Reject Signup',
  usedFor: 'signupToReview-reject',
  changeInitFocus: true
}

class UserToReview extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      editingSource: false,
      source: props.signup.source,
    }
  }

  updateSource = () => {
    this.setState({
      editingSource: true
    })
    this.editableSource.focus();
  }

  saveNewSource = (evt) => {
    const pText = evt.target.previousSibling.innerHTML;
    this.setState({
      source: pText,
      editingSource: false,
    })
    this.updateSourceBtn.focus();
  }

  onKeyDown = (e) => {
    e.stopPropagation();
  }

  render() {
   const {signup, grabSchOrUni, ukSchsListLoaded, ukUnisListLoaded, allowAccept, lastupdated} = this.props;
   const {editingSource, source} = this.state;
   let eduName;
   let age;

   const userroles = signup.activerole == 'mentor' ? convertRole(signup.rolesexp, signup.rolesexpfreetext) : convertRole(signup.roles, signup.rolesfreetext)

   const birthdayts = signup.birthday
   var ts = new Date(birthdayts);
   var today = new Date();
   age = today.getFullYear() - ts.getFullYear()

   //age = + "age"

   if (ukSchsListLoaded && signup.eetstatus == 'sch') {
     eduName = " " + (signup.schname != '' ? (grabSchOrUni('sch', signup.schname)) : signup.schnamefreetext)
   } else if (ukUnisListLoaded && signup.eetstatus == 'uni') {
     eduName = " " + (signup.uniname != '' ? (grabSchOrUni('uni', signup.uniname)) : signup.uninamefreetext)
   }

    return (
      <React.Fragment>
        <div className="userToReview-card">
          <div className="user-card-header noMarginB" />
          <div className="userToReview-detail main">
            <div>
              <b>{signup.fname} {signup.lname}</b>
              <span><i> ({signup.activerole})</i></span>
              <span><i> - {age} years old </i></span>
              <span className="redText">  {signup.reviewreason}</span>
            </div>
            <div className="userToReview-date"><i>Since {lastupdated} </i></div>
            {allowAccept == true && (
              <Modal {...AcceptSignUpModalProps}>
                <AcceptSignUpContent
                  signup={signup}
                  source={this.state.source}
                />
              </Modal>
            )}
            <Modal {...RejectSignUpModalProps}>
              <RejectSignUpContent
                signup={signup}
                source={this.state.source}
              />
            </Modal>
          </div>
          <div className="userToReview-detail">
            <div>
              <b>{signup.eetstatus}</b>
              <span>
                {signup.eetstatus == 'sch' ? eduName : ''}
                {signup.eetstatus == 'uni' ? eduName : ''}
                {signup.eetstatus == 'job' ? (' ' + signup.currrole + ' @ ' + signup.currco) : ''}
                {signup.eetstatus == 'train' ? (' ' + signup.currtraining + ' @ ' + signup.currtrainingprovider) : ''}
              </span>
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              <span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji(signup.country)}/></span>
              <span> {signup.country}</span>
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              <i className="fas fa-link" />
              <span>{"  " + signup.profprofileurl}</span>
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              <span className={signup.source == '' ? 'redText' : 'greenText'}><i className="fas fa-door-open" /></span>
              <p name="source" contentEditable="true" ref={n => this.editableSource = n} className={"editableText-userToReview noMarginBlockEnd noMarginBlockStart " + (signup.source != '' ? "greenText" : 'redText')} onKeyDown={this.onKeyDown} value={source}> {signup.source != '' ? signup.source : 'null'}</p>
              {editingSource == true && (
                <button type="button" className="button-unstyled userToReview-updateSourceBtn" onClick={this.saveNewSource}>Update</button>
              )}
              {signup.source == '' && editingSource == false && (
                <button type="button" className="button-unstyled" ref={n => this.updateSourceBtn = n} onClick={this.updateSource}><i className="fas fa-pencil-alt"/></button>
              )}
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              {signup.email != null && (
                <span className={signup.emailverif == 1 ? "greenText" : ''}>EMAIL: <i>{signup.email}</i> </span>
              )}
              {signup.emailverif == 1 && (
                <span className="greenText verifiedBadgeContainer"><Check /></span>
              )}
              {signup.eduemail != null && (
                <span className={signup.eduemailverif == 1 ? "greenText" : ''}>EDUEMAIL:<i> {signup.eduemail} </i></span>
              )}
              {signup.eduemailverif == 1 && (
                <span className="greenText verifiedBadgeContainer"><Check /></span>
              )}
              {signup.profemail != null && (
                <span className={signup.profemailverif == 1 ? "greenText" : ''}>PROFEMAIL: <i>{signup.profemail} </i></span>
              )}
              {signup.profemailverif == 1 && (
                <span className="greenText verifiedBadgeContainer"><Check /></span>
              )}
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              CURRENT SITUATION
              <div>{signup.currsitu}</div>
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              {signup.activerole == 'mentor' ? 'ROLE(S)' : 'WANTS ROLE(S)'}
              <div>{userroles}</div>
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              {signup.activerole == 'mentor' ? 'WHY HELP?' : 'WHY JOIN?'}
              <div className="normalLineheight">{signup.activerole == 'mentor' ?  signup.whyHelp : signup.whyJoin}</div>
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              HAS PROGCODE?
              <span>{signup.progcode != '' ? (" " + signup.progcode) : ' no'}</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserToReview;
