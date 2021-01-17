// Dex last merged this code on 16th Aug 2020

import React from "react";
import ReactDOM from "react-dom";

import AcceptSignUpContent from "./AcceptSignUpContent.js";
import Modal from "./Modal.js";
import RejectSignUpContent from "./RejectSignUpContent.js";
import {Check} from './GeneralFunctions.js';
import {userFlagEmoji} from './UserDetail.js';

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
    })
    this.updateSourceBtn.focus();
  }

  render() {
   const {signup} = this.props;
   const {editingSource, source} = this.state;
    return (
      <React.Fragment>
        <div className="userToReview-card">
          <div className="user-card-header noMarginB" />
          <div className="userToReview-detail main">
            <div>
              <b>{signup.fname} {signup.lname}</b>
              <span><i> ({signup.activerole})</i></span>
              <span className="redText">  {signup.reviewreason}</span>
            </div>
            <Modal {...AcceptSignUpModalProps}>
              <AcceptSignUpContent />
            </Modal>
            <Modal {...RejectSignUpModalProps}>
              <RejectSignUpContent />
            </Modal>
          </div>
          <div className="userToReview-detail">
            <div>
              <b>eetStatus: </b>{signup.eetstatus}
              <span>
                {signup.eetStatus == 'sch' ? (signup.schname != '' ? signup.schname : signup.schnamefreetext) : ''}
                {signup.eetStatus == 'uni' ? (signup.uniname != '' ? signup.uniname : signup.uninamefreetext) : ''}
                {signup.eetStatus == 'job' ? (signup.currrole + '@' + signup.currco) : ''}
                {signup.eetStatus == 'train' ? (signup.currtraining + '@' + signup.currtrainingprovider) : ''}
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
              <span> {signup.profprofileurl}</span>
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              <i className="fas fa-door-open" />
              <p name="source" contentEditable="true" ref={n => this.editableSource = n} className={"editableText-userToReview noMarginBlockEnd noMarginBlockStart " + (signup.source != '' ? "greenText" : '')} value={source}> {signup.source}</p>
              {editingSource == true && (
                <button type="button" onClick={this.saveNewSource}>Update</button>
              )}
              <button type="button" ref={n => this.updateSourceBtn = n} onClick={this.updateSource}><i className="fas fa-pencil-alt"/></button>
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              {signup.email != '' && (
                <span>Email: {signup.email}</span>
              )}
              {signup.emailverif == 1 && (
                <Check />
              )}
              {signup.eduemail != '' && (
                <span>Eduemail: {signup.eduemail}</span>
              )}
              {signup.eduemailverif == 1 && (
                <Check />
              )}
              {signup.profemail != '' && (
                <span>Profemail: {signup.profemail}</span>
              )}
              {signup.profemailverif == 1 && (
                <Check />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserToReview;
