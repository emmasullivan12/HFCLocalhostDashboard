// Dex last merged this code on 8th feb 2021

import React, { Component } from "react";
import SelectBox from './Select.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class SetUnavailabilityContent extends Component {
  constructor() {
    super();
    this.state = {
      isCompleteDud: '',
      reminderLengthDays: '',
      messageFromServer: '',
    };
  }

  componentDidMount(){
    document.getElementById("selectBox-isDud").focus()
  }

  handleDud = (userInput) => {
    this.setState({
      isCompleteDud: userInput
    });
  }

  handleReminderDateChange = (userInput) => {
    this.setState({
      reminderLengthDays: userInput
    });
  }

  // This will handle Student Passing on Mentor i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    const {reminderLengthDays, isCompleteDud} = this.state;

    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }

    this.setState({ messageFromServer: 'Set unavailability' });
  }

  canBeSubmitted() {
    const {isCompleteDud} = this.state;
    return (
      isCompleteDud != ''
    );
  }

  render() {
    const { isCompleteDud, messageFromServer } = this.state;
    const isEnabled = this.canBeSubmitted();
    var reminderLengthList = [
      {value: 7, label: 'in 1 week'},{value: 14, label: 'in 2 weeks'},{value: 30, label: 'in 1 Month'},{value: 60, label: 'in 2 Months'},{value: 90, label: 'in 3 Months'},{value: 182, label: 'in 6 Months'},{value: 365, label: 'in 1 Years'}
    ]

    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Set <span className="request-mentor-name">{this.props.name}</span> as unavailable
          </div>
          <form>
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
            {isCompleteDud == '0' && (
              <React.Fragment>
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="selectBox-selectReminderDate"><strong>Remind me </strong>to chase them: (leave blank if not)</label>
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
            <div className="request-btn-container">
              <button type="button" disabled={!isEnabled} className="Submit-btn" onClick={this.handleSubmit}>
                Set as Unavailable
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
              <i className="fas fa-stopwatch" />
            </div>
            User set to Unavailable
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

export default SetUnavailabilityContent;
