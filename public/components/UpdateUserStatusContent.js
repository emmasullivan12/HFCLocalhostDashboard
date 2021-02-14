// Dex last merged this code on 12th feb 2021

import React, { Component } from "react";

import Checkbox from './Checkbox.js';
import FullPageModal from './FullPageModal.js';
import MatchingContent from './MatchingContent.js';
import SelectBox from './Select.js';

const MatchingUsersProps = {
  triggerText: 'Match',
  usedFor: 'matchingUsers-fromModal',
  backBtn: 'arrow',
  title: 'Match User'
}

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class UpdateUserStatusContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToUpdate: this.props.userToUpdate,
      isUnavailable: false,
      isCompleteDud: '',
      reminderLengthDays: '',
      messageFromServer: '',
    };
  }

  componentDidMount(){
    document.getElementById("set-as-unavailable").focus()
  }

  handleDud = (userInput) => {
    this.setState({
      isCompleteDud: userInput
    });
  }

  handleSetToUnavailable = (e) => {
    this.setState({
      isUnavailable: e.target.checked
    })
  }

  handleReminderDateChange = (userInput) => {
    this.setState({
      reminderLengthDays: userInput
    });
  }

  handleMatchStatusChange = (userInput, e) => {
    const group = e.target.dataset.extrainfo1
    const role = e.target.dataset.extrainfo2
    this.setState({
      [group + "-" + role + '-matchStatus']: userInput,
    });
  }

  getMatchStatus = (matchStatus) => {
    const {matchStatusOptions} = this.props;

    const status = matchStatusOptions
      .filter(s => s['value'] == matchStatus)

    return status[0].label
  }

  getPriority = (matchStatus) => {
    const {matchStatusOptions} = this.props;

    const status = matchStatusOptions
      .filter(st => st['value'] == matchStatus)

    return status[0].priority
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    const {reminderLengthDays, isCompleteDud, userToUpdate} = this.state;

    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }

    this.setState({ messageFromServer: 'Set new user status' });
  }

  canBeSubmitted() {
    /*const {isCompleteDud} = this.state;
    return (
      isCompleteDud != ''
    );*/
    return true
  }

  render() {
    const { isUnavailable, isCompleteDud, messageFromServer } = this.state;
    const {matchStatusOptions, convertRole, grabSchOrUni, matchStatusOptionsAll} = this.props;
    const isEnabled = this.canBeSubmitted();
    var reminderLengthList = [
      {value: 7, label: 'in 1 week'},{value: 14, label: 'in 2 weeks'},{value: 30, label: 'in 1 Month'},{value: 60, label: 'in 2 Months'},{value: 90, label: 'in 3 Months'},{value: 182, label: 'in 6 Months'},{value: 365, label: 'in 1 Years'}
    ]
    var statusPerGroup = [];
    var userGroupsStatus = [
      {role: 'mentor', group: 'avfx', matchstatus: 4},{role: 'mentor', group: 'intogames', matchstatus: 6},
    ]
    const user = {
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
      no_mentors: 1,
      no_mentees: 2,
      maxmentees: 5,
      lastActiveDate: '1556389526',
      mentorsustep: 'didFullSUIDtf',
      matchstatus: 4,
      profprofileurl: '',
      uni: 0,
      degree: 'BSc (Hons) Business Administration',
      schname: '',
      schnamefreetext: '', // If their school wasn't on the list
      uniname: '75',
      uninamefreetext: '', // If their school wasn't on the list
      subjects: 'Business, Art, English Literature & Language',
      currrole: 'Head of Marketing',
      currco: 'Pladis',
      currind: '#food&beverage',
      notes: 'Really good at Houdini. Wants to only help working class kids',
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

    if (userGroupsStatus.length > 0) {
      userGroupsStatus.forEach((group) => {

        let matchStatusName = this.getMatchStatus(group.matchstatus);
        let priority = this.getPriority(group.matchstatus);

        statusPerGroup.push(
          <div className="setStatusContainer-modal">
            <div className="userGroupRole-modal"><strong>{group.group}</strong> - <i>{group.role}</i></div>
            <div className={"userToMatch-changeStatus modal " + priority}>
              <SelectBox
                options={matchStatusOptions}
                name='selectStatus'
                placeholder={matchStatusName}
                placeholderOnClick="Change status:"
                handleChange={this.handleMatchStatusChange}
                bringBackE // Brings back "e" event to be used in handleChange function
                dataExtraInfo1={group.group} // added to dataset-extraInfo1 and can be accessed within handlechange
                dataExtraInfo2={group.role}// added to dataset-extraInfo2 and can be accessed within handlechange
                valueToShow='label' // This is the attribute of the array/object to be displayed to user
              />
            </div>
            <FullPageModal {...MatchingUsersProps}>
              <MatchingContent
                matchStatusOptions={matchStatusOptions}
                matchStatusOptionsAll={matchStatusOptionsAll}
                matchStatus={user.matchstatus}
                convertRole={convertRole}
                userName={(user.fname + " " + user.lname)}
                userToMatchNotes={user.notes}
                birthdayts={user.birthday}
                grabSchOrUni={grabSchOrUni}
              />
            </FullPageModal>
          </div>
        );
      });
    }

    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Update user status for <span className="request-mentor-name">{this.props.fname} {this.props.lname}</span>
          </div>
          <form>
            <div className="notifToggleContainer">
              <span className="notifToggleTxt">Mark as Unavailable?</span>
              <Checkbox
                labelClassName="switch"
                id="set-as-unavailable"
                spanClassName="slider round"
                onChange={this.handleSetToUnavailable}
                defaultChecked={false}
              />
            </div>
            {isUnavailable == true && (
              <div className="form-group">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-isDud">Mark this person as a <strong>complete dud?</strong></label>
                <SelectBox
                  options={[{value: 1, label: "Yes"},{value: 0, label: "No"}]}
                  name='isDud'
                  placeholder='Yes or No:'
                  handleChange={this.handleDud}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  required
                />
              </div>
            )}
            {isCompleteDud == '0' && (
              <React.Fragment>
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="selectBox-selectReminderDate"><strong>Remind me</strong> to chase them: (leave blank if not)</label>
                  <SelectBox
                    options={reminderLengthList}
                    name='selectReminderDate'
                    placeholder='Select when to remind you:'
                    handleChange={this.handleReminderDateChange}
                    focusOnLoad
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  />
                </div>
              </React.Fragment>
            )}
            <div className="statusContainer-modal">
              {statusPerGroup}
            </div>
            <div className="request-btn-container">
              <button type="button" disabled={!isEnabled} className="Submit-btn" onClick={this.handleSubmit}>
                Update Status
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="ideas-icon-container">
              <i className="fas fa-check-circle" />
            </div>
            User status updated
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              If you asked for a reminder to check in on their availability, you will receive an email when the time comes!
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default UpdateUserStatusContent;
