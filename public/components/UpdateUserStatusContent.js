// Dex last merged this code on 15th oct 2020

import React, { Component } from "react";

import Checkbox from './Checkbox.js';
import SelectBox from './Select.js';

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
    console.log("userInput: "+userInput)
    console.log(e)
/*    const group = e.target.dataset.group
    const role = e.target.dataset.role
    const stateToSet = group+role
    this.setState({
      [stateToSet]: userInput,
    });*/
  }

  getMatchStatus = (matchStatus) => {
    const {matchStatusOptions} = this.props;

    const status = matchStatusOptions
      .filter(status => status['value'] == matchStatus)

    return status[0].label
  }

  getPriority = (matchStatus) => {
    const {matchStatusOptions} = this.props;

    const status = matchStatusOptions
      .filter(status => status['value'] == matchStatus)

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
    const {matchStatusOptions} = this.props;
    const isEnabled = this.canBeSubmitted();
    var reminderLengthList = [
      {value: 7, label: 'in 1 week'},{value: 14, label: 'in 2 weeks'},{value: 30, label: 'in 1 Month'},{value: 60, label: 'in 2 Months'},{value: 90, label: 'in 3 Months'},{value: 182, label: 'in 6 Months'},{value: 365, label: 'in 1 Years'}
    ]
    var statusPerGroup = [];
    var userGroupsStatus = [
      {role: 'mentor', group: 'avfx', matchstatus: 4},
    ]

    if (userGroupsStatus.length > 0) {
      userGroupsStatus.forEach((group) => {

        const matchStatusName = this.getMatchStatus(group.matchstatus);
        const priority = this.getPriority(group.matchstatus);

        statusPerGroup.push(
          <React.Fragment>
            <div><strong>{group.group}</strong> - <i>{group.role}</i></div>
            <div className={"userToMatch-changeStatus " + priority}>
              <SelectBox
                options={matchStatusOptions}
                name='selectStatus'
                placeholder={matchStatusName}
                placeholderOnClick="Change status:"
                handleChange={this.handleMatchStatusChange}
                data-group={group.group}
                data-role={group.role}
                valueToShow='label' // This is the attribute of the array/object to be displayed to user
              />
            </div>
          </React.Fragment>
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
            {statusPerGroup}
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
