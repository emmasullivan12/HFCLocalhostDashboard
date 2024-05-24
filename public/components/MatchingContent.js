// Dex last merged this code on 22nd july 2021

import React, { Component } from "react";

import AlertBox from './AlertBox.js';
import Autocomplete from './Autocomplete.js';
import Modal from './Modal.js';
import SetUnavailabilityContent from './SetUnavailabilityContent.js';

import TextInput from './TextInput.js';
import MatchUserCard from './MatchUserCard.js';

import {userFlagEmoji} from './UserDetail.js';
import {LoadingSpinner} from "./GeneralFunctions";

const SetUnavailableProps = {
  ariaLabel: 'Set Unavailability',
  triggerText: 'Set Unavailability',
  usedFor: 'settingUnavailability',
  hideTrigger: true,
  changeInitFocus: true,
  removeOverflowY: true, // This means any dropdowns etc are not clipped off in modal but instead show over the modal. Do not use for modals likely to be used on Modal i.e. user facing. Use "showAbove" in Select.js instead
}

const potentialMatches = [
  {
    uid: '12343',
    fname: 'Emmalina',
    lname: 'Sullivanos',
    gdprdivts: '2021-02-04T14:46:14.209Z', // signed up date
    birthday: '1995-01-01T00:00:00.000Z',
    matchType: 'strong',
    gender: 3,
    ethnicity: 2,
    role: 'mentor',
    city: 'London',
    country: 'GBR',
    timeZone: 'Europe/London',
    eetstatus: 'job',
    avail: 1,
    group: 'avfx',
    no_mentors: 2,
    no_mentees: 2,
    maxmentees: 5,
    pendingmatches: 0,
    mentorsustep: 'didFullSUIDtf',
    lastActiveDate: '1556389526',
    matchstatus: 7,
    isavailable: {status: 1},
    profprofileurl: 'https://www.linkedin.com/profile',
    uni: 0,
    degree: 'BSc (Hons) Business Administration',
    schname: '',
    schnamefreetext: '', // If their school wasn't on the list
    uniname: '75',
    uninamefreetext: '', // If their school wasn't on the list
    subjects: 'Business, Art, English Literature & Language',
    currrole: 'Head of Marketing',
    currco: '6',
    currcofreetext: '',
    currind: '#food&beverage',
    expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
    learning: 'leadership, negotiations, excel, programming, python, mySQL',
    hobbies: ['12', '98'],
    hobbiesfreetext: ['hobby3', 'hobby4'],
    certainty: 7,
    roles: ['12', '98'],
    rolesfreetext: ['role3', 'role4'],
    rolesexp: ['12', '98'],
    rolesexpfreetext: ['role3', 'role4'],
    lifestyle: 'I want to work a 9-5pm job and have no responsibilities and earn £1m a month',
    whyHelp: 'I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.',
    whyJoin: 'I need help getting into Animation and want advice on my reel and how to craft my CV and cover letter. Please help!',
    helpFocus: 'review CVs and job applications, feedback on reel, work-reality, general',
    roleDesc: 'In my role, I\'m in charge of XYZ and I travel regularly and work with lots of interesting people and projects include working with Excel, Powerpoint and managing 3 employees',
    matches: [
      {matchid: '123', status_of_match: 1, date_matched: '2021-02-04T14:46:14.209Z', mentee_replied_date: '2021-02-04T14:46:14.209Z', mentor_replied_date: '2021-02-04T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: ''},
      {matchid: '124', status_of_match: 2, date_matched: '2021-02-03T14:46:14.209Z', mentee_replied_date: '2021-02-04T14:46:14.209Z', mentor_replied_date: '2021-02-04T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: ''},
      {matchid: '125', status_of_match: 3, date_matched: '2021-02-02T14:46:14.209Z', mentee_replied_date: '2021-02-04T14:46:14.209Z', mentor_replied_date: '2021-02-04T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: ''},
      {matchid: '126', status_of_match: 4, date_matched: '2021-02-01T14:46:14.209Z', mentee_replied_date: '2021-02-04T14:46:14.209Z', mentor_replied_date: '2021-02-04T14:46:14.209Z', mentee_pass_comments: 'Soz. not the mentor for me', mentor_pass_comments: ''},
    ]
  },
  {
    uid: '12346',
    fname: 'Emily',
    lname: 'Sullivany',
    gdprdivts: '2021-02-04T14:46:14.209Z', // signed up date
    birthday: '2005-11-01T00:00:00.000Z',
    matchType: 'medium',
    gender: 2,
    ethnicity: 8,
    role: 'mentor',
    city: 'LA',
    country: 'USA',
    timeZone: 'Europe/London',
    eetstatus: 'job',
    avail: 1,
    group: 'avfx',
    no_mentors: 1,
    no_mentees: 2,
    maxmentees: 5,
    pendingmatches: 1,
    mentorsustep: 'didFullSUIDtf',
    lastActiveDate: '1556389526',
    matchstatus: 4,
    isavailable: {status: 0, by: "PennyUID", dateUnavailable:"2021-02-04T14:46:14.209Z", reminderDate:"2021-02-14T14:46:14.209Z", reminderStatus: 1},
    profprofileurl: '',
    uni: 0,
    degree: 'BSc (Hons) Business Administration',
    schname: '',
    schnamefreetext: '', // If their school wasn't on the list
    uniname: '75',
    uninamefreetext: '', // If their school wasn't on the list
    subjects: 'Business, Art, English Literature & Language',
    currrole: 'Head of Marketing',
    currco: '',
    currcofreetext: 'Free text company',
    currind: '#food&beverage',
    notes: 'Wants to only help avfx mentees',
    expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
    learning: 'leadership, negotiations, excel, programming, python, mySQL',
    hobbies: ['12', '98'],
    hobbiesfreetext: ['hobby3', 'hobby4'],
    certainty: 7,
    roles: ['12', '98'],
    rolesfreetext: ['role3', 'role4'],
    rolesexp: ['12', '98'],
    rolesexpfreetext: ['role3', 'role4'],
    lifestyle: 'I want to work a 9-5pm job and have no responsibilities and earn £1m a month',
    whyHelp: 'I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.',
    whyJoin: 'I need help getting into Animation and want advice on my reel and how to craft my CV and cover letter. Please help!',
    helpFocus: 'review CVs and job applications, feedback on reel, work-reality, general',
    roleDesc: 'In my role, I\'m in charge of XYZ and I travel regularly and work with lots of interesting people and projects include working with Excel, Powerpoint and managing 3 employees',
    matches: [
      {matchid: '123', status_of_match: 4, date_matched: '2021-02-01T14:46:14.209Z', mentee_replied_date: '2021-02-01T14:46:14.209Z', mentor_replied_date: '2021-02-01T14:46:14.209Z', mentee_pass_comments: 'Soz. not the mentor for me', mentor_pass_comments: ''},
      {matchid: '124', status_of_match: 5, date_matched: '2021-02-03T14:46:14.209Z', mentee_replied_date: '2021-02-01T14:46:14.209Z', mentor_replied_date: '2021-02-01T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: ''},
      {matchid: '125', status_of_match: 6, date_matched: '2021-02-05T14:46:14.209Z', mentee_replied_date: '2021-02-01T14:46:14.209Z', mentor_replied_date: '2021-02-01T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: ''},
      {matchid: '126', status_of_match: 7, date_matched: '2021-02-02T14:46:14.209Z', mentee_replied_date: '2021-02-01T14:46:14.209Z', mentor_replied_date: '2021-02-01T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: 'Soz. not the mentee for me'},
    ]
  },
  {
    uid: '12347',
    fname: 'Emmi',
    lname: 'Sullibano',
    gdprdivts: '2021-02-04T14:46:14.209Z', // signed up date
    birthday: '1995-12-06T00:00:00.000Z',
    matchType: 'weak',
    gender: 1,
    ethnicity: 4,
    role: 'mentor',
    city: 'LA',
    country: 'USA',
    timeZone: 'Europe/London',
    eetstatus: 'job',
    avail: 1,
    group: 'avfx',
    no_mentors: 1,
    no_mentees: 2,
    maxmentees: 5,
    pendingmatches: 3,
    lastActiveDate: '1556389526',
    matchstatus: 8,
    isavailable: {status: 1},
    profprofileurl: '',
    uni: 0,
    degree: 'BSc (Hons) Business Administration',
    schname: '',
    schnamefreetext: '', // If their school wasn't on the list
    uniname: '75',
    uninamefreetext: '', // If their school wasn't on the list
    subjects: 'Business, Art, English Literature & Language',
    currrole: 'Head of Marketing',
    currco: '6',
    currcofreetext: '',
    currind: '#food&beverage',
    expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
    learning: 'leadership, negotiations, excel, programming, python, mySQL',
    hobbies: ['12', '98'],
    hobbiesfreetext: ['hobby3', 'hobby4'],
    certainty: 7,
    roles: ['12', '98'],
    rolesfreetext: ['role3', 'role4'],
    rolesexp: ['12', '98'],
    rolesexpfreetext: ['role3', 'role4'],
    lifestyle: 'I want to work a 9-5pm job and have no responsibilities and earn £1m a month',
    whyHelp: 'I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.',
    whyJoin: 'I need help getting into Animation and want advice on my reel and how to craft my CV and cover letter. Please help!',
    helpFocus: 'review CVs and job applications, feedback on reel, work-reality, general',
    roleDesc: 'In my role, I\'m in charge of XYZ and I travel regularly and work with lots of interesting people and projects include working with Excel, Powerpoint and managing 3 employees',
    matches: [
      {matchid: '123', status_of_match: 1, date_matched: '2021-02-14T14:46:14.209Z', mentee_replied_date: '2021-02-14T14:46:14.209Z', mentor_replied_date: '2021-02-14T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: ''},
      {matchid: '124', status_of_match: 7, date_matched: '2021-02-24T14:46:14.209Z', mentee_replied_date: '2021-02-14T14:46:14.209Z', mentor_replied_date: '2021-02-14T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: 'Soz. not the mentee for me'},
      {matchid: '125', status_of_match: 4, date_matched: '2021-05-04T14:46:14.209Z', mentee_replied_date: '2021-02-14T14:46:14.209Z', mentor_replied_date: '2021-02-14T14:46:14.209Z', mentee_pass_comments: 'Soz. not the mentor for me', mentor_pass_comments: ''},
      {matchid: '126', status_of_match: 2, date_matched: '2021-03-24T14:46:14.209Z', mentee_replied_date: '2021-02-14T14:46:14.209Z', mentor_replied_date: '2021-02-14T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: ''},
    ]
  }
];

class MatchingContent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userToSearchFor: '',
      showUnavailableModal: false,
      isLoading: false,
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

  handleMatchStatusChange = (userInput) => {
    this.setState({
      showUnavailableModal: userInput == '9' ? true : false // if selects user status as "unavailable" i.e. #9
    });
  }

  closeAvailabilityModal = () => {
    this.setState({
      showUnavailableModal: false
    });
  }

  renderMatchesList = (userToMatchName) => {
    if (potentialMatches.length > 0) {
      const {matchStatusOptionsAll, matchStatusOptions, convertRole, convertHobbies, grabSchOrUni} = this.props;

      return (
        <div>
          {potentialMatches.map((user, index) => {
            return (
              <MatchUserCard
                user={user}
                key={user.uuid}
                userToMatchName={userToMatchName}
                isPotentialMatch
                matchStatusOptions={matchStatusOptions}
                matchStatusOptionsAll={matchStatusOptionsAll}
                handleMatchStatusChange={this.handleMatchStatusChange}
                convertRole={convertRole}
                convertHobbies={convertHobbies}
                grabSchOrUni={grabSchOrUni}
              />
            )
          })}
        </div>
      )
    }
  }

  render() {
    const {userToSearchFor, showUnavailableModal, isLoading} = this.state;
    const {matchStatusOptions, matchStatusOptionsAll, convertRole, convertHobbies, userName, birthdayts, grabSchOrUni} = this.props;
    var users = [
      {value: 'uuid123', name: 'Adam Ant', role: 'mentee'},{value: 'uuid124', name: 'Busy Bee', role: 'mentor'},{value: 'uuid125', name: 'Charlie Adams', role: 'mentee'},{value: 'uuid126', name: 'Derek David', role: 'mentor'},{value: 'uuid127', name: 'Emma Elephant', role: 'mentee'}
    ]
    const userToMatch = {
      uid: '12345',
      fname: 'Emma',
      lname: 'Sullivan',
      role: 'mentor',
      city: 'LA',
      country: 'USA',
      timeZone: 'Europe/London',
      birthday: '2010-01-01T00:00:00.000Z',
      eetstatus: 'uni',
      avail: 1,
      group: 'avfx',
      gender: 0,
      ethnicity: 6,
      no_mentors: 1,
      no_mentees: 2,
      maxmentees: 5,
      pendingmatches: 2,
      lastActiveDate: '1556389526',
      mentorsustep: 'didFullSUIDtf',
      gdprdivts: '2021-02-04T14:46:14.209Z', // signed up date
      matchstatus: 7,
      isavailable: {status: 0, by: "auto", dateUnavailable:"2021-02-04T14:46:14.209Z", reminderDate:"2021-02-14T14:46:14.209Z", reminderStatus: 1},
      profprofileurl: '',
      uni: 0,
      degree: 'BSc (Hons) Business Administration',
      schname: '',
      schnamefreetext: '', // If their school wasn't on the list
      uniname: '75',
      uninamefreetext: '', // If their school wasn't on the list
      subjects: 'Business, Art, English Literature & Language',
      currrole: 'Head of Marketing',
      currco: '6',
      currcofreetext: '',
      currind: '#food&beverage',
      notes: 'Really good at Houdini. Wants to only help working class kids',
      expertise: 'rendering, compositing, 2D, 3D animation, excel, leadership',
      learning: 'leadership, negotiations, excel, programming, python, mySQL',
      hobbies: ['12', '98'],
      hobbiesfreetext: ['hobby3', 'hobby4'],
      certainty: 7,
      roles: ['12', '98'],
      rolesfreetext: ['role3', 'role4'],
      rolesexp: ['12', '98'],
      rolesexpfreetext: ['role3', 'role4'],
      lifestyle: 'I want to work a 9-5pm job and have no responsibilities and earn £1m a month',
      whyHelp: 'I want to give back to those in need of support and which I didnt get to benefit from when I was starting out my career.',
      whyJoin: 'I need help getting into Animation and want advice on my reel and how to craft my CV and cover letter. Please help!',
      helpFocus: 'review CVs and job applications, feedback on reel, work-reality, general',
      roleDesc: 'In my role, I\'m in charge of XYZ and I travel regularly and work with lots of interesting people and projects include working with Excel, Powerpoint and managing 3 employees',
      matches: [
        {matchid: '123', status_of_match: 1, date_matched: '2021-02-01T14:46:14.209Z', mentee_replied_date: '2021-02-01T14:46:14.209Z', mentor_replied_date: '2021-02-01T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: ''},
        {matchid: '124', status_of_match: 2, date_matched: '2021-02-02T14:46:14.209Z', mentee_replied_date: '2021-02-01T14:46:14.209Z', mentor_replied_date: '2021-02-01T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: ''},
        {matchid: '125', status_of_match: 3, date_matched: '2021-02-03T14:46:14.209Z', mentee_replied_date: '2021-02-01T14:46:14.209Z', mentor_replied_date: '2021-02-01T14:46:14.209Z', mentee_pass_comments: '', mentor_pass_comments: ''},
        {matchid: '126', status_of_match: 4, date_matched: '2021-04-04T14:46:14.209Z', mentee_replied_date: '2021-02-01T14:46:14.209Z', mentor_replied_date: '2021-02-01T14:46:14.209Z', mentee_pass_comments: 'Soz. not the mentor for me', mentor_pass_comments: ''},
      ]
    }
    const importUsersComplete = true;
    const importUsersSuccess = 'success';
    const usersSuccessAlertMessage = importUsersSuccess == 'success' ? 'Success! Message goes here' : 'Oops! Noone imported'
    const importUserComplete = false;
    const importUserSuccess = 'success';
    const userSuccessAlertMessage = importUsersSuccess == 'success' ? 'Success! Message goes here' : 'Oops! Noone imported'

    return (
      <React.Fragment>
        <div className="article-page profile matching">
          <div className="row article-container profile">
            <div className="col-5 col-s-12 article-extras matchUser">
              <div className="matchUser-header">USER TO BE MATCHED</div>
              <MatchUserCard
                user={userToMatch}
                userName={userName}
                matchStatusOptions={matchStatusOptions}
                handleMatchStatusChange={this.handleMatchStatusChange}
                matchStatusOptionsAll={matchStatusOptionsAll}
                convertRole={convertRole}
                convertHobbies={convertHobbies}
                grabSchOrUni={grabSchOrUni}
              />
            </div>
            <div className="searchBar searchByText">
              <div>
                <TextInput
                  name="searchUserByText"
                  placeholder="Search by keyword (skills, roles or notes)"
                  className="form-control-std searchUserByText"
                />
                <button type="button" className="Submit-btn importPotentialMatches" onClick={this.importUsersFromSearch}>
                  + Import
                </button>
              </div>
              {importUsersComplete == true && (
                <AlertBox successOrFailure={importUsersSuccess} fadesOut={importUsersSuccess == 'success' ? true : false}>
                  <div>{usersSuccessAlertMessage}</div>
                </AlertBox>
              )}
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
              //    showDetail
              //    detailToShow='role'
                  showCTA1
              //  cta1ClickHandler={this.launchUpdateStatusModal}
                  cta1Text="Import"
                  grabSuggestionsAfterTyping
                />
              </div>
              {importUserComplete == true && (
                <AlertBox successOrFailure={importUserSuccess} fadesOut={importUserSuccess == 'success' ? true : false}>
                  <div>{userSuccessAlertMessage}</div>
                </AlertBox>
              )}
            </div>
            <div className="col-7 col-s-12 content-col profile matchUser">
              <div className="article-body profile">
                <div className="matchUser-header">POTENTIAL MATCHES
                  <div className="exclamation-icon-container grey tooltip"> <i className="fas fa-question-circle" />
                    <div className="tooltiptext below">
                      <strong>Sorted by:</strong>
                      <ul>
                        <li className="alignL">Same <strong>role</strong> as Match</li>
                        <li className="alignL">Same <strong>group</strong> as Match</li>
                        <li className="alignL"><strong>Match status</strong> Priority</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {isLoading == true && (
                  <div className="loadingPotentialMatches">
                    <p>
                      Loading...
                    </p>
                    <LoadingSpinner />
                  </div>
                )}
                {isLoading == false && (
                  this.renderMatchesList(userToMatch.fname)
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
