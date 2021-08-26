// Dex last merged this code on 26th aug 2021

import React, { Component } from "react";
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import Checkbox from './Checkbox.js';
import Modal from './Modal.js';
import {LoadingSpinner} from './GeneralFunctions.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class EditWorkingOnContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      startingWorkingOnArr: this.props.workingOnArr ? this.props.workingOnArr : [],
      workingOnFromList: this.props.workingOn != null ? this.props.workingOn : [],
      endingWorkingOnArr: this.props.workingOnArr ? this.props.workingOnArr : [],
    };
    this.handleWorkingOnChange = this.handleWorkingOnChange.bind(this);
    this.handleDoneClick = this.handleDoneClick.bind(this);
  }

  componentDidMount() {
    document.getElementById("autocompleteBox-selectWorkingOn").focus()
  }

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    this.setState({ updateSuccess: true })
  }

  handleWorkingOnChange(userInput, callback) {
    const workingOnOptions = [
      {value: '0', label: 'Deciding on a career path'},
      {value: '1', label: 'CV/Resume editing'},
      {value: '2', label: 'Portfolio / Showreel review'},
      {value: '3', label: 'Finding an internship / work experience'},
      {value: '4', label: 'Full-time job search'},
      {value: '5', label: 'Job Interviews'},
      {value: '6', label: 'Making subject / degree choices'},
      {value: '7', label: 'Applying to University'},
      {value: '8', label: 'Learning to Code'},
      {value: '9', label: 'Learning a language'},
      {value: '10', label: 'Learning an instrument'},
      {value: '11', label: 'Training for a sporting event'},
    ]
    const workingOnFromList = workingOnOptions
      .filter(item => userInput.includes(item.label))

    const labels = workingOnFromList.map(value => value.label)

    const values = workingOnFromList.map(value => value.value)

    this.setState({
      workingOnFromList: values,
      endingWorkingOnArr: userInput
    }, () => {
      if(callback) {
        callback()
      }
    })
  }

  handleDoneClick() {
    const {workingOnFromList} = this.state
    if (workingOnFromList.length != 0) {
      document.getElementById("Submit-btn-UpdateWorkingOn").focus()
    } else {
      document.getElementById("autocompleteBox-selectWorkingOn").focus()
    }
  }

  canBeSubmitted() {
    const { workingOnFromList, startingWorkingOnArr, endingWorkingOnArr } = this.state;

    return (
      workingOnFromList.length != 0
      && (JSON.stringify(startingWorkingOnArr) != JSON.stringify(endingWorkingOnArr)) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, workingOn, startingWorkingOnArr } = this.state;
    const { modalTitle, workingOnArr } = this.props;
    const workingOnOptions = [
      {value: '0', label: 'Deciding on a career path'},
      {value: '1', label: 'CV/Resume editing'},
      {value: '2', label: 'Portfolio / Showreel review'},
      {value: '3', label: 'Finding an internship / work experience'},
      {value: '4', label: 'Full-time job search'},
      {value: '5', label: 'Job Interviews'},
      {value: '6', label: 'Making subject / degree choices'},
      {value: '7', label: 'Applying to University'},
      {value: '8', label: 'Learning to Code'},
      {value: '9', label: 'Learning a language'},
      {value: '10', label: 'Learning an instrument'},
      {value: '11', label: 'Training for a sporting event'},
    ]
    const isEnabled = this.canBeSubmitted();

    if(updateSuccess == false) {
      return (
        <React.Fragment>
          <div className="showSmallModalSize">
            <div className="modal-title">
              {modalTitle}
            </div>
            <form className="paddingR20 paddingL20">
              <div className="form-group">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="roleco">Are you working on any of the following <strong>activities, events, documents</strong> in the near future</label>
                <div className="autocompleter">
                  <AutocompleteTagsMulti
                    multiple
                    openOnClick
                    showValues
                    showCheckbox
                    handleDone={this.handleDoneClick}
                    suggestions={workingOnOptions}
                    name='selectWorkingOn'
                    placeholder='Select options...'
                    placeholderOnClick="Select options..."
                    handleChange={this.handleWorkingOnChange}
                    idValue='value'
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                    defaultChecked={startingWorkingOnArr}
                  />
                </div>
              </div>
              <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-UpdateWorkingOn">
                {isSubmitting == true && (
                  <LoadingSpinner />
                )}
                {isSubmitting != true && (
                  <span>Update</span>
                )}
              </button>
            </form>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="showSmallModalSize">
            <div className="modal-title">
              <div className="ideas-icon-container">
                <span role="img" aria-label="ok emoji">👌</span>
              </div>
              Activities you are working on updated
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default EditWorkingOnContent;
