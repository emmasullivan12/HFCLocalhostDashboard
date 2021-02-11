// Dex last merged this code on 11th nov 2020

import React, { Component } from "react";

import Autocomplete from './Autocomplete.js';
import Modal from './Modal.js';
import SetUnavailabilityContent from './SetUnavailabilityContent.js';
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import UserHistoryItem from './UserHistoryItem.js';
import {userFlagEmoji, eduName,} from './UserDetail.js';
import {DateCalc, X, Check, LoadingSpinner} from "./GeneralFunctions";

const SetUnavailableProps = {
  ariaLabel: 'Set Unavailability',
  triggerText: 'Set Unavailability',
  usedFor: 'settingUnavailability',
  hideTrigger: true,
  changeInitFocus: true
}

class MatchingContent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userToSearchFor: '',
      matchStatus: this.props.matchStatus,
      showUnavailableModal: false,
      showDetail: false,
      editingNotes: false,
      notes: this.props.userToMatchNotes,
      isLoading: true,
    }
  }

  handleUserSearch = (userInput) => {
    // NEED TO ONLY BRING BACK THE MENTOR VERSION (IF MATCHING WITH A MENTEe) AND VICE VERSA
    this.setState({
      userToSearchFor: userInput,
    })
  }

  importUsersFromSearch = (e) => {
    // Dex handle search an d
  }

  getMatchStatus = () => {
    const {matchStatusOptions} = this.props;
    const {matchStatus} = this.state;

    const status = matchStatusOptions
      .filter(status => status['value'] == matchStatus)

    return status[0].label
  }

  getPriority = () => {
    const {matchStatusOptions} = this.props;
    const {matchStatus} = this.state;

    const status = matchStatusOptions
      .filter(status => status['value'] == matchStatus)

    return status[0].priority
  }

  toggleShowMore = () => {
    const currentState = this.state.showDetail;
    this.setState({
      showDetail: !currentState,
    })
  }

  handleMatchStatusChange = (userInput) => {
    this.setState({
      matchStatus: userInput,
      showUnavailableModal: userInput == '9' ? true : false // if selects user status as "unavailable" i.e. #9
    });
  }

  closeAvailabilityModal = () => {
    this.setState({
      showUnavailableModal: false
    });
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

  render() {
    const {userToSearchFor, showUnavailableModal, showDetail, notes, editingNotes, isLoading} = this.state;
    const {matchStatusOptions, convertRole, userName, userToMatchNotes, birthdayts} = this.props;
    var users = [
      {value: 'uuid123', name: 'Adam Ant', role: 'mentee'},{value: 'uuid124', name: 'Busy Bee', role: 'mentor'},{value: 'uuid125', name: 'Charlie Adams', role: 'mentee'},{value: 'uuid126', name: 'Derek David', role: 'mentor'},{value: 'uuid127', name: 'Emma Elephant', role: 'mentee'}
    ]
    var userHistory = [
      {date: '2021-01-03T19:54:25.084Z', type: 'signedUp'},
      {date: '2021-01-04T19:54:25.084Z', type: 'accMatch', accMatchName: 'David Amor'},
      {date: '2021-01-01T19:54:25.084Z', type: 'rejMatch', rejMatchName: 'Mat Fraser', rejReason: 'He is out of my league. #HWPO'},
    ]
    const userToMatch = {
      uid: '12345',
      fname: 'Emma',
      role: 'mentee',
      city: 'LA',
      country: 'USA',
      timeZone: 'Europe/London',
      eetstatus: 'job',
      avail: 1,
      group: 'avfx',
      activementees: 2,
      allmentees: 5,
      lastActiveDate: '1556389526',
      uni: 0,
      degree: 'BSc (Hons) Business Administration',
      schName: '',
      schNameFreeText: '', // If their school wasn't on the list
      uniName: '',
      uniNameFreeText: '', // If their school wasn't on the list
      subjects: 'Business, Art, English Literature & Language',
      currrole: 'Head of Marketing',
      currco: 'Pladis',
      currind: '#food&beverage',
      expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
      learning: 'leadership, negotiations, excel, programming, python, mySQL',
      hobbies: 'running, swimming, theatre, yoga, skiing, gabadee',
      certainty: 7,
      roles: ['12', '98'],
      rolesfreetext: ['role3', 'role4'],
      rolesexp: ['12', '98'],
      rolesexpfreetext: ['role3', 'role4'],
      lifestyle: 'I want to work a 9-5pm job and have no responsibilities and earn £1m a month',
      whyHelp: 'I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.',
      whyJoin: 'I need help getting into Animation and want advice on my reel and how to craft my CV and cover letter. Please help!',
      helpFocus: 'review CVs and job applications, feedback on reel, work-reality, general',
      roleDesc: 'In my role, I\'m in charge of XYZ and I travel regularly and work with lots of interesting people and projects include working with Excel, Powerpoint and managing 3 employees'
    }
    const potentialMatches = []
    const priority = this.getPriority();
    const matchStatusName = this.getMatchStatus();
    const userroles = userToMatch.role == 'mentor' ? convertRole(userToMatch.rolesexp, userToMatch.rolesexpfreetext) : convertRole(userToMatch.roles, userToMatch.rolesfreetext)
    //let classNameSafeguarding = "userToMatch-sgStatus";
    let classNameSafeguarding = 'userToMatch-safeguardingText';
    let safeguardingText;
    let wantsU18;
    let prApproved;
    let isU18;
    let eduInstName;
    let historyItems = []

    if (userToMatch.eetstatus == 'sch' || userToMatch.eetstatus == 'uni') {
      eduInstName = " " + eduName(userToMatch.schName, userToMatch.schNameFreeText, userToMatch.uniName, userToMatch.uniNameFreeText, userToMatch.eetStatus);
    }

    if (userToMatch.role == 'mentee') {
      var ts = new Date(birthdayts);
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
      wantsU18 = userToMatch.mentorsustep == 'didFullSUIDtf' || userToMatch.mentorsustep == 'didIDTrain';
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
        <div className="article-page profile">
          <div className="row article-container profile">
            <div className="col-5 col-s-12 article-extras matchUser">
              <div className="matchUser-header">USER TO BE MATCHED</div>
              <div className="userToMatch-card">
                <div className="user-card-header noMarginB" />
                <div className="userToReview-detail main matchUser">
                  <div>
                    <b>{userName}</b>
                    <span><i> ({userToMatch.role})</i></span>
                    <span className={classNameSafeguarding}>
                      {userToMatch.role == 'mentor' && wantsU18 == true && prApproved == true && (
                        <Check />
                      )}
                      {userToMatch.role == 'mentor' && wantsU18 == true && prApproved == false && (
                        <X />
                      )}
                      {safeguardingText}
                    </span>
                  </div>
                  <div className={"userToMatch-changeStatus matchUser " + priority}>
                    <SelectBox
                      options={matchStatusOptions}
                      name='selectStatus'
                      placeholder={matchStatusName}
                      placeholderOnClick="Change status:"
                      handleChange={this.handleMatchStatusChange}
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    />
                  </div>
                </div>
                <div className="userToReview-detail small">
                  <div>
                    <b>{userToMatch.eetstatus}</b>
                    <span>
                      {userToMatch.eetstatus == 'sch' ? eduInstName : ''}
                      {userToMatch.eetstatus == 'uni' ? eduInstName : ''}
                      {userToMatch.eetstatus == 'job' ? (' ' + userToMatch.currrole + ' @ ' + userToMatch.currco) : ''}
                      {userToMatch.eetstatus == 'train' ? (' ' + userToMatch.currtraining + ' @ ' + userToMatch.currtrainingprovider) : ''}
                    </span>
                  </div>
                </div>
                <div className="userToReview-detail">
                  <div className="userToReview-subDetail">
                    <i className={"emoji-icon sml " + userFlagEmoji(userToMatch.country)}/>
                    <div className="normalLineheight"> {userToMatch.city}, {userToMatch.country}</div>
                  </div>
                </div>
                {userToMatch.role == 'mentor' && userToMatch.profprofileurl != '' && (
                  <div className="userToReview-detail">
                    <div className="userToReview-subDetail">
                      <i className="fas fa-link" />
                      <span>{"  " + userToMatch.profprofileurl}</span>
                    </div>
                  </div>
                )}
                <div className="userToReview-detail">
                  <div className="userToReview-subDetail">
                    <span><i className="fas fa-door-open" /></span>
                    <p className="editableText-userToReview noMarginBlockEnd noMarginBlockStart"> {userToMatch.group != '' ? userToMatch.group : 'null'}</p>
                  </div>
                </div>
                {userToMatch.role == 'mentee' && (
                  <div className="userToReview-detail">
                    <div className="userToReview-subDetail">
                      <span><strong>HOW SURE?: </strong><i><span className="greenText"><strong>{userToMatch.certainty}</strong></span> / 10</i> </span>
                    </div>
                  </div>
                )}
                <div className="userToReview-detail">
                  <div className="userToReview-subDetail">
                    <strong>{userToMatch.role == 'mentor' ? 'ROLE(S)' : 'WANTS ROLE(S)'}</strong>
                    <div className="normalLineheight">{userroles}</div>
                  </div>
                </div>
                <div className="userToReview-detail">
                  <div className="userToReview-subDetail">
                    <strong>SKILLS</strong>
                    <div className="normalLineheight">{userToMatch.expertise}</div>
                  </div>
                </div>
                {userToMatch.role == 'mentor' && userToMatch.learning != '' && (
                  <div className="userToReview-detail">
                    <div className="userToReview-subDetail">
                      <strong>LEARNING</strong>
                      <div className="normalLineheight">{userToMatch.learning}</div>
                    </div>
                  </div>
                )}
                <div className="userToReview-detail">
                  <div className="userToReview-subDetail">
                    <strong>HOBBIES</strong>
                    <div className="normalLineheight">{userToMatch.hobbies}</div>
                  </div>
                </div>
                { showDetail == true && (
                  <div>
                    <div className="userToReview-detail">
                      <div className="userToReview-subDetail">
                        <strong>{userToMatch.role == 'mentor' ? 'WHY HELP?' : 'WHY JOIN?'}</strong>
                        <div className="normalLineheight">{userToMatch.role == 'mentor' ?  userToMatch.whyHelp : userToMatch.whyJoin}</div>
                      </div>
                    </div>
                    {userToMatch.role == 'mentee' && userToMatch.lifestyle != '' && (
                      <div className="userToReview-detail">
                        <div className="userToReview-subDetail">
                          <strong>LIFESTYLE</strong>
                          <div className="normalLineheight">{userToMatch.lifestyle}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="userToMatch-seeMore" onClick={this.toggleShowMore}>
                  {showDetail == true ? '<< See Less' : 'See More >>'}
                </div>
                <button type="button" className="Submit-btn messageUser">
                  Message
                </button>
              </div>
              <div className="userToMatch-card notes">
                <div className="userToReview-detail">
                  <div className="userToReview-subDetail">
                    NOTES
                    <div className="normalLineheight" onMouseOver={this.showEditBtn} onMouseLeave={this.hideEditBtn} onFocus={this.showEditBtn}>
                      <p contentEditable="false" ref={n => this.editableNotes = n} className={"editableText-userNotes noMarginBlockEnd noMarginBlockStart" + (editingNotes == true ? ' editing' : '')} value={notes}>{userToMatchNotes != '' ? userToMatchNotes : ''}</p>
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
            </div>
            <div className="searchBar searchByText">
              <div>
                <TextInput
                  name="searchUserByText"
                  placeholder="Search by keyword (skills, roles or notes)"
                  className="form-control-std searchUserByText"
                />
                <button type="button" className="Submit-btn importPotentialMatches" onClick={this.importUsersFromSearch}>
                  Import
                </button>
              </div>

            </div>
            <div className="searchBar searchByName">
              <div className="autocompleter">
                <Autocomplete
                  suggestions={users}
                  name='searchByNamePotentialMatch'
                  placeholder='Search all Prospela users by name'
                  handleChange={this.handleUserSearch}
                  focusOnLoad
                  idValue='value'
                  valueToShow='name' // This is the attribute of the array/object to be displayed to user
                  showCTA1
                  cta1ClickHandler={this.launchUpdateStatusModal}
                  cta1Text="Update"
                />
              </div>
            </div>
            <div className="col-7 col-s-12 content-col profile matchUser">
              <div className="article-body profile">
                <div className="matchUser-header">POTENTIAL MATCHES <span className="lightGreyText">{potentialMatches.length}</span></div>
                {isLoading == true && (
                  <div className="loadingPotentialMatches">
                    <p>
                      Loading...
                    </p>
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {showUnavailableModal == true && (
          <Modal {...SetUnavailableProps} handleLocalStateOnClose={this.closeAvailabilityModal}>
            <SetUnavailabilityContent
              name={userName}
            />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default MatchingContent;
