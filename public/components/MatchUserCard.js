// Dex last merged this code on 23rd mar 2021

import React from "react";
import ReactDOM from "react-dom";

import AcceptSignUpContent from "./AcceptSignUpContent.js";
import Modal from "./Modal.js";
import RejectSignUpContent from "./RejectSignUpContent.js";
import SelectBox from './Select.js';
import SendMatchToMentee from './SendMatchToMentee.js';
import UserHistory from './UserHistory.js';
import {Check, X} from './GeneralFunctions.js';
import {userFlagEmoji} from './UserDetail.js';

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

const SendMatchProps = {
  ariaLabel: 'Send Match to Mentee',
  triggerText: 'Send Match to Mentee',
  usedFor: 'sendMatch',
  changeInitFocus: true
}

// We can set user status as these
const statusOfMatch = [
  {value: '1', label: 'Profile Sent'},
  {value: '2', label: 'Mentee timed out'},
  {value: '3', label: 'Mentee Accepted'},
  {value: '4', label: 'Mentee Rejected'},
  {value: '5', label: 'Mentor timed out'},
  {value: '6', label: 'Mentor Accepted'},
  {value: '7', label: 'Mentor Rejected'},
];

class MatchUserCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showDetail: false,
      editingNotes: false,
      notes: this.props.user.notes,
      matchStatus: this.props.user.matchstatus,
      showNotes: false,
      reservedMatch: false,
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

  toggleReserveMatch = () => {
    const currentState = this.state.reservedMatch;
    this.setState({
      reservedMatch: !currentState,
    })
  }

  getMatchStatus = (matchStatus) => {
    const {matchStatusOptionsAll, user, matchStatusOptions, isPotentialMatch} = this.props;
  //  const matchStatusOptionsToUse = isPotentialMatch ? matchStatusOptionsAll : matchStatusOptions
    const matchStatusOptionsToUse = matchStatusOptionsAll

    const status = matchStatusOptionsToUse
      .filter(status => status['value'] == matchStatus)

    return status[0].label
  }

  getPriority = () => {
    const {matchStatusOptionsAll, user, matchStatusOptions, isPotentialMatch} = this.props;
    //const matchStatusOptionsToUse = isPotentialMatch ? matchStatusOptionsAll : matchStatusOptions
    const matchStatusOptionsToUse = matchStatusOptionsAll
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

  onKeyDown = (e) => {
    e.stopPropagation();
  }

  getStatusOfMatch = (matchStatus) => {
    const status = statusOfMatch
      .filter(status => status['value'] == matchStatus)

    return status[0].label
  }

  render() {
   const {user, userName, isPotentialMatch, matchStatusOptions, matchStatusOptionsAll, handleMatchStatusChange, convertRole, convertHobbies, grabSchOrUni, userToMatchName} = this.props;
   const {showDetail, matchStatus, editingNotes, notes, showNotes, reservedMatch} = this.state;
   const name = user.fname + " " + user.lname;
   let classNameSafeguarding = 'userToMatch-safeguardingText' + (isPotentialMatch ? ' isPotentialMatch' : '');
   let priorityClassName = 'potentialMatchStatus';
   let safeguardingText;
   let wantsU18;
   let prApproved;
   let isU18;
   let eduInstName;
   let matchType = user.matchType ? user.matchType : ''; // strong, medium, weak
   let outsideGroup = false;
   let isavailable = user.isavailable.status == 1
   var ts = new Date(user.birthday);
   var today = new Date();
   const age = today.getFullYear() - ts.getFullYear()
   const match = {
    prevMatched: {
      mentee_pass_comments: 'They arent the right mentor for me soz',
      mentor_pass_comments: 'Nope. Wrong mentee for me soweee'
    }
  }

   if (user.role == 'mentee') {

     isU18 = age < 18;

     if (isU18 == true) {
       safeguardingText = age + " years old (U18)"
       classNameSafeguarding += " redText";
     } else {
       safeguardingText =  age + " years old"
       classNameSafeguarding += " greyText";
     }
   } else {
     wantsU18 = user.mentorsustep == 'didFullSUIDtf' || user.mentorsustep == 'didIDTrain';
     if (wantsU18 == true) {
       prApproved = true
       if (prApproved == true) {
         if (user.birthday != '') {
           safeguardingText = age + " years old & ID Checked"
         } else {
           safeguardingText = "ID Checked"
         }
         classNameSafeguarding += " greenText";
       } else {
         if (user.birthday != '') {
           safeguardingText = age + " years old & Needs ID Check"
         } else {
           safeguardingText = "Needs ID Check"
         }
         classNameSafeguarding += " redText";
       }
     } else {
       if (user.birthday != '') {
         safeguardingText = age + " years old & Over 18s only"
       } else {
         safeguardingText = "Over 18s only"
       }
       classNameSafeguarding += " greyText";
     }
   }

   if (user.eetstatus == 'sch') {
     eduInstName = " " + (user.schname != '' ? (grabSchOrUni('sch', user.schname)) : user.schnamefreetext)
   } else if (user.eetstatus == 'uni') {
     eduInstName = " " + (user.uniname != '' ? (grabSchOrUni('uni', user.uniname)) : user.uninamefreetext)
   }

   const priority = this.getPriority();
   const priorityText = priority == 'H' ? 'High priority: ': (priority == 'M' ? 'Med priority: ' : 'Low priority: ')
   priorityClassName +=  priority == 'H' ? ' greenText': (priority == 'M' ? ' orangeText' : ' greyText')
   const showMatchStatus = this.getMatchStatus(matchStatus);
   const userroles = user.role == 'mentor' ? convertRole(user.rolesexp, user.rolesexpfreetext) : convertRole(user.roles, user.rolesfreetext)

   const werePrevMatched = true
   const prevMatchStatus = 7
   const prevMatchStatusToShow = this.getStatusOfMatch(prevMatchStatus)

    return (
      <React.Fragment>
        <div className={"userToMatch-card" + (isavailable == false ? ' unavailable' : '')}>
          {isavailable == false && (
            <div className="unavailableOverlay" >
               <div className="unavailableOverlay-text">UNAVAILABLE</div>
            </div>
          )}
          <div className={"user-card-header noMarginB " + (isavailable == false ? 'unavailable' : (outsideGroup == true ? 'outsideGroup' : matchType))} />
          <div className="userToReview-detail main matchUser">
            <div>
              <b>{userName ? userName : name}</b>
              <span><i> ({user.role})</i></span>
              {user.role == "mentee" && isPotentialMatch == true && (
                <span className="greyText smallFont"><i> {user.no_mentors} {user.no_mentors == 1 ? 'match ' : 'matches '}</i></span>
              )}
              {user.role == "mentor" && isPotentialMatch == true && (
                <span className="greyText smallFont"><i> {user.no_mentees} / {user.maxmentees} matches </i></span>
              )}
              {user.pendingmatches > 0 && (
                <span className="greyText smallFont"><i> + {user.pendingmatches + ' pending' + (isPotentialMatch == true ? '' : ' matches')}</i></span>
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
            {/*  {isPotentialMatch != true && ( */}
                <div className={"userToMatch-changeStatus " + (isPotentialMatch == true ? 'isPotentialMatch ' : "matchUser ") + priority}>
                  <SelectBox
                    options={matchStatusOptionsAll}
                    name='selectStatus'
                    placeholder={showMatchStatus}
                    placeholderOnClick="Change status:"
                    handleChange={this.handleStatusChange}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  />
                </div>
            {/*  )}*/}
            </div>
            {isPotentialMatch == true && (
              <React.Fragment>
            {/*}    <div className={priorityClassName}>
                  <strong>{priorityText}</strong> {showMatchStatus}
                </div>
                <button type="button" className="Submit-btn sendMatch">Send Match to Mentee</button>*/}
                <Modal {...SendMatchProps} >
                  <SendMatchToMentee
                    mentorName={user.role == 'mentor' ? user.fname : userToMatchName} // If userToMatch is a mentee & potential matches are mentors
                    menteeName={user.role == 'mentee' ? user.fname : userToMatchName}
                  />
                </Modal>
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
              <p className="editableText-userToReview noMarginBlockEnd noMarginBlockStart"> {user.group != '' ? user.group : 'null'} {outsideGroup == true && (<span className="redText"> &#60;&#60; Diff Group!</span>)}</p>
            </div>
          </div>
          {isPotentialMatch && werePrevMatched == true && (
            <div className="userToReview-detail redText alignCenter">
              <strong>WARNING: WAS PREVIOUSLY MATCHED WITH THIS USER. </strong>
              <div>What happened: {prevMatchStatusToShow}</div>
              {prevMatchStatus == 4 && (
                <div>Why: {match.prevMatched.mentee_pass_comments}</div>
              )}
              {prevMatchStatus == 7 && (
                <div>Why: {match.prevMatched.mentor_pass_comments}</div>
              )}

            </div>
          )}
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
              <div className="normalLineheight">{convertHobbies(user.hobbies, user.hobbiesfreetext)}</div>
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
      {/*    {isPotentialMatch == true && (
            <button type="button" className={"Submit-btn messageUser reserveUser tooltip" + (reservedMatch ? ' reserved' : '')} onClick={this.toggleReserveMatch}>
              <i className="fas fa-bookmark"/>
              <span className="tooltiptext">
                {reservedMatch == true ? 'Reserved: potential match': 'Save as potential match'}
              </span>
            </button>
          )}*/}
          <button type="button" className="Submit-btn messageUser">
            Message
          </button>
        </div>
      {/*  {((userHistory.length > 0 || user.notes != null) && showNotes == false && isPotentialMatch) && ( */}
        {showNotes == false && isPotentialMatch && (
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
                  <p contentEditable="false" ref={n => this.editableNotes = n} className={"editableText-userNotes noMarginBlockEnd noMarginBlockStart" + (editingNotes == true ? ' editing' : '')} value={notes} onKeyDown={this.onKeyDown}>{user.notes!= '' ? user.notes : ''}</p>
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
                <UserHistory
                  userRole={user.role}
                  isavailable={user.isavailable}
                  signedUpDate={user.gdprdivts}
                  usersMatches={user.matches}
                />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default MatchUserCard;
