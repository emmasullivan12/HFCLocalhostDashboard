// Dex last merged this code on 29th jan 2021

import React from "react";
import ReactDOM from "react-dom";

import AcceptSignUpContent from "./AcceptSignUpContent.js";
import Modal from "./Modal.js";
import RejectSignUpContent from "./RejectSignUpContent.js";
import SelectBox from './Select.js';
import UserHistoryItem from './UserHistoryItem.js';
import {Check, X} from './GeneralFunctions.js';
import {userFlagEmoji, eduName} from './UserDetail.js';

/*const AcceptSignUpModalProps = {
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
}*/

class MatchUserCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showDetail: false,
      editingNotes: false,
      notes: this.props.user.notes,
      matchStatus: this.props.user.matchstatus,
      showNotes: false,
    }
  }

  toggleShowMore = () => {
    const currentState = this.state.showDetail;
    this.setState({
      showDetail: !currentState,
    })
  }

  toggleShowNotes = () => {
    const currentState = this.state.showNotes;
    this.setState({
      showNotes: !currentState,
    })
  }

  getMatchStatus = (matchStatus) => {
    const {matchStatusOptionsAll, user, matchStatusOptions, isPotentialMatch} = this.props;
    const matchStatusOptionsToUse = isPotentialMatch ? matchStatusOptionsAll : matchStatusOptions

    const status = matchStatusOptionsToUse
      .filter(status => status['value'] == matchStatus)

    return status[0].label
  }

  getPriority = () => {
    const {matchStatusOptionsAll, user, matchStatusOptions, isPotentialMatch} = this.props;
    const matchStatusOptionsToUse = isPotentialMatch ? matchStatusOptionsAll : matchStatusOptions
    const matchStatus = user.matchstatus;

    const status = matchStatusOptionsToUse
      .filter(status => status['value'] == matchStatus)

    return status[0].priority
  }

  setCaret = () => {
    var el = this.editableNotes;
    var range = document.createRange()
    var sel = window.getSelection()
    range.setStart(el.lastChild, el.lastChild != null ? el.lastChild.length : 0)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
  }

  updateNotes = () => {
    this.editableNotes.contentEditable = 'true'
    this.setState({
      editingNotes: true
    })

    this.editableNotes.focus();
    if (this.state.notes != '') {
      this.setCaret();
    }
  }

  saveNewNotes = (evt) => {
    const pText = this.editableNotes.innerHTML;
//    const pText = evt.target.previousSibling.innerHTML;
    this.setState({
      notes: pText,
      editingNotes: false,
    }, () => {
      this.updateNotesBtn.focus();
      this.editableNotes.contentEditable = 'false'
    })
  }

  showEditBtn =() => {
    const {editingNotes} = this.state;
    if (editingNotes == false) {
      this.updateNotesBtn.style.visibility = 'visible'
    }
  }

  hideEditBtn =() => {
    const {editingNotes} = this.state;
    if (editingNotes == false) {
      this.updateNotesBtn.style.visibility = 'hidden'
    }
  }

  handleStatusChange = (userInput) => {
    this.setState({
      matchStatus: userInput,
    }, () => {
      this.props.handleMatchStatusChange(userInput)
    });
  }

  render() {
   const {user, userName, isPotentialMatch, matchStatusOptions, handleMatchStatusChange, convertRole} = this.props;
   const {showDetail, matchStatus, editingNotes, notes, showNotes} = this.state;
   const name = user.fname + " " + user.lname;
   let classNameSafeguarding = 'userToMatch-safeguardingText' + (isPotentialMatch ? ' isPotentialMatch' : '');
   let priorityClassName = 'potentialMatchStatus';
   let safeguardingText;
   let wantsU18;
   let prApproved;
   let isU18;
   let eduInstName;
   let matchType = user.matchType ? user.matchType : ''; // strong, medium, weak, outsideGroup

   if (user.role == 'mentee') {
     var ts = new Date(user.birthday);
     var today = new Date();
     let age;

     age = today.getFullYear() - ts.getFullYear()
     isU18 = age < 18;

     if (isU18 == true) {
       safeguardingText = age + " years (U18)"
       classNameSafeguarding += " redText";
     } else {
       safeguardingText =  age + " years"
       classNameSafeguarding += " greyText";
     }
   } else {
     wantsU18 = user.mentorsustep == 'didFullSUIDtf' || user.mentorsustep == 'didIDTrain';
     if (wantsU18 == true) {
       prApproved = true
       if (prApproved == true) {
         safeguardingText = ' ID Checked'
         classNameSafeguarding += " greenText";
       } else {
         safeguardingText = ' Needs ID Check'
         classNameSafeguarding += " redText";
       }
     } else {
       safeguardingText = 'Over 18s only'
       classNameSafeguarding += " greyText";
     }
   }

   if (user.eetstatus == 'sch' || user.eetstatus == 'uni') {
     eduInstName = " " + eduName(user.schName, user.schNameFreeText, user.uniName, user.uniNameFreeText, user.eetStatus);
   }
   /*if (ukSchsListLoaded && signup.eetstatus == 'sch') {
     eduName = " " + (signup.schname != '' ? (grabSchOrUni('sch', signup.schname)) : signup.schnamefreetext)
   } else if (ukUnisListLoaded && signup.eetstatus == 'uni') {
     eduName = " " + (signup.uniname != '' ? (grabSchOrUni('uni', signup.uniname)) : signup.uninamefreetext)
   }*/

   const priority = this.getPriority();
   const priorityText = priority == 'H' ? 'High priority: ': (priority == 'M' ? 'Med priority: ' : 'Low priority: ')
   priorityClassName +=  priority == 'H' ? ' greenText': (priority == 'M' ? ' orangeText' : ' greyText')
   const showMatchStatus = this.getMatchStatus(matchStatus);
   const userroles = user.role == 'mentor' ? convertRole(user.rolesexp, user.rolesexpfreetext) : convertRole(user.roles, user.rolesfreetext)

   let historyItems = []

   var userHistory = [
     {date: '2021-01-03T19:54:25.084Z', type: 'signedUp'},
     {date: '2021-01-04T19:54:25.084Z', type: 'accMatch', accMatchName: 'David Amor'},
     {date: '2021-01-01T19:54:25.084Z', type: 'rejMatch', rejMatchName: 'Mat Fraser', rejReason: 'He is out of my league. #HWPO'},
   ]

   if (userHistory.length > 0) {
     userHistory.forEach((item) => {
       historyItems.push(
         <UserHistoryItem
           historyItem={item}
           key={item.date}
         />
       );
     });
   }

    return (
      <React.Fragment>
        <div className="userToMatch-card">
          <div className={"user-card-header noMarginB " + matchType} />
          <div className="userToReview-detail main matchUser">
            <div>
              <b>{userName ? userName : name}</b>
              <span><i> ({user.role})</i></span>
              {user.role == "mentee" && isPotentialMatch == true && (
                <span className="greyText smallFont"><i> {user.activementors} {user.activementors == 1 ? 'match' : 'matches'}</i></span>
              )}
              {user.role == "mentor" && isPotentialMatch == true && (
                <span className="greyText smallFont"><i> {user.activementees} / {user.maxmentees} matches</i></span>
              )}
              <span className={classNameSafeguarding}>
                {user.role == 'mentor' && wantsU18 == true && prApproved == true && (
                  <Check />
                )}
                {user.role == 'mentor' && wantsU18 == true && prApproved == false && (
                  <X />
                )}
                {safeguardingText}
              </span>
              {isPotentialMatch != true && (
                <div className={"userToMatch-changeStatus matchUser " + priority}>
                  <SelectBox
                    options={matchStatusOptions}
                    name='selectStatus'
                    placeholder={showMatchStatus}
                    placeholderOnClick="Change status:"
                    handleChange={this.handleStatusChange}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  />
                </div>
              )}
            </div>
            {isPotentialMatch == true && (
              <React.Fragment>
                <div className={priorityClassName}>
                  <strong>{priorityText}</strong> {showMatchStatus}
                </div>
                <button type="button" className="Submit-btn sendMatch">Send Match</button>
              </React.Fragment>
            )}
          </div>
          <div className="userToReview-detail small">
            <div>
              <b>{user.eetstatus}</b>
              <span>
                {user.eetstatus == 'sch' ? eduInstName : ''}
                {user.eetstatus == 'uni' ? eduInstName : ''}
                {user.eetstatus == 'job' ? (' ' + user.currrole + ' @ ' + user.currco) : ''}
                {user.eetstatus == 'train' ? (' ' + user.currtraining + ' @ ' + user.currtrainingprovider) : ''}
              </span>
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              <i className={"emoji-icon sml " + userFlagEmoji(user.country)}/>
              <div className="normalLineheight"> {user.city}, {user.country}</div>
            </div>
          </div>
          {user.role == 'mentor' && user.profprofileurl != '' && (
            <div className="userToReview-detail">
              <div className="userToReview-subDetail">
                <i className="fas fa-link" />
                <span>{"  " + user.profprofileurl}</span>
              </div>
            </div>
          )}
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              <span><i className="fas fa-door-open" /></span>
              <p className="editableText-userToReview noMarginBlockEnd noMarginBlockStart"> {user.group != '' ? user.group : 'null'}</p>
            </div>
          </div>
          {user.role == 'mentee' && (
            <div className="userToReview-detail">
              <div className="userToReview-subDetail">
                <span><strong>HOW SURE?: </strong><i><span className="greenText"><strong>{user.certainty}</strong></span> / 10</i> </span>
              </div>
            </div>
          )}
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              <strong>{user.role == 'mentor' ? 'ROLE(S)' : 'WANTS ROLE(S)'}</strong>
              <div className="normalLineheight">{userroles}</div>
            </div>
          </div>
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              <strong>SKILLS</strong>
              <div className="normalLineheight">{user.expertise}</div>
            </div>
          </div>
          {user.role == 'mentor' && user.learning != '' && (
            <div className="userToReview-detail">
              <div className="userToReview-subDetail">
                <strong>LEARNING</strong>
                <div className="normalLineheight">{user.learning}</div>
              </div>
            </div>
          )}
          <div className="userToReview-detail">
            <div className="userToReview-subDetail">
              <strong>HOBBIES</strong>
              <div className="normalLineheight">{user.hobbies}</div>
            </div>
          </div>
          { showDetail == true && (
            <div>
              <div className="userToReview-detail">
                <div className="userToReview-subDetail">
                  <strong>{user.role == 'mentor' ? 'WHY HELP?' : 'WHY JOIN?'}</strong>
                  <div className="normalLineheight">{user.role == 'mentor' ?  user.whyHelp : user.whyJoin}</div>
                </div>
              </div>
              {user.role == 'mentee' && user.lifestyle != '' && (
                <div className="userToReview-detail">
                  <div className="userToReview-subDetail">
                    <strong>LIFESTYLE</strong>
                    <div className="normalLineheight">{user.lifestyle}</div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="userToMatch-seeMore" onClick={this.toggleShowMore}>
            {showDetail == true ? '<< Less' : 'More >>'}
          </div>
          <button type="button" className="Submit-btn messageUser">
            Message
          </button>
        </div>
        {((userHistory.length > 0 || user.notes != null) && showNotes == false && isPotentialMatch) && (
          <div className="userToMatch-seeMore" onClick={this.toggleShowNotes}>
            {showNotes == true ? '<< Hide Notes' : 'See Notes >>'}
          </div>
        )}
        {(showNotes == true || !isPotentialMatch) && (
          <div className={"userToMatch-card notes" + (isPotentialMatch ? ' isPotentialMatch' : '')}>
            {isPotentialMatch && (
              <div className="userToMatch-seeMore" onClick={this.toggleShowNotes}>
                {showNotes == true ? '<< Hide Notes' : 'See Notes >>'}
              </div>
            )}
            <div className="userToReview-detail">
              <div className="userToReview-subDetail">
                NOTES
                <div className="normalLineheight" onMouseOver={this.showEditBtn} onMouseLeave={this.hideEditBtn} onFocus={this.showEditBtn}>
                  <p contentEditable="false" ref={n => this.editableNotes = n} className={"editableText-userNotes noMarginBlockEnd noMarginBlockStart" + (editingNotes == true ? ' editing' : '')} value={notes}>{user.notes!= '' ? user.notes : ''}</p>
                  {editingNotes == true && (
                    <button type="button" className="button-unstyled userToMatch-updateNotesBtn greenText" onClick={this.saveNewNotes}>Update</button>
                  )}
                  {editingNotes == false && (
                    <button type="button" className="button-unstyled userToMatch-editNotesBtn" ref={n => this.updateNotesBtn = n} onClick={this.updateNotes}><i className="fas fa-pencil-alt"/></button>
                  )}
                </div>
              </div>
            </div>
            <div className="userToReview-detail">
              <div className="userToReview-subDetail">
                HISTORY
                {historyItems}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default MatchUserCard;
