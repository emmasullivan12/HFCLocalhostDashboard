// Dex last merged this code on 8th aug 2021

import React, { Component } from "react";
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import Checkbox from './Checkbox.js';
import Modal from './Modal.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import subjectOptions from './Subjects.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class EditSubjectsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      startingSubjectsArr: this.props.subjectsArray ? this.props.subjectsArray : [],
      subjectsFromList: this.props.subjects != null ? this.props.subjects : [],
      freeTextSubjects: this.props.subjectsfreetext != null ? this.props.subjectsfreetext : [],
      endingSubjectsArr: this.props.subjectsArray ? this.props.subjectsArray : [],
      errorLoadingSubjects: '',
    };
    this.handleSubjectsChange = this.handleSubjectsChange.bind(this);
    this.handleDoneClickSubjects = this.handleDoneClickSubjects.bind(this);
  }

  componentDidMount() {
    document.getElementById("autocompleteBox-selectSubject").focus()
  }

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    this.setState({ updateSuccess: true })
  }

  handleSubjectsChange(userInput, callback) {
    const subjectsFromList = subjectOptions
      .filter(subject => userInput.includes(subject.label))

    const labels = subjectsFromList.map(value => value.label)

    const freeTextSubjects = userInput
      .filter(subject => labels.indexOf(subject) === -1)

    const values = subjectsFromList.map(value => value.value)

    this.setState({
      subjectsFromList: values,
      freeTextSubjects: freeTextSubjects,
      endingSubjectsArr: userInput
    }, () => {
      if(callback) {
        callback()
      }
    })
  }

  handleDoneClickSubjects() {
    const {subjectsFromList, freeTextSubjects} = this.state
    if ((subjectsFromList.length != 0 || freeTextSubjects.length != 0)) {
      document.getElementById("Submit-btn-UpdateSubjects").focus()
    } else {
      document.getElementById("autocompleteBox-selectSubject").focus()
    }
  }

  canBeSubmitted() {
    const { subjectsFromList, freeTextSubjects, startingSubjectsArr, endingSubjectsArr } = this.state;

    return (
      (subjectsFromList.length != 0 || freeTextSubjects.length != 0)
      && (JSON.stringify(startingSubjectsArr) != JSON.stringify(endingSubjectsArr)) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, errorLoadingSubjects, subjects, subjectsfreetext, startingSubjectsArr } = this.state;
    const { modalTitle, subjectsArray } = this.props;
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
                <label className="descriptor alignLeft reqAsterisk" htmlFor="roleco">What <strong>subjects</strong> did you study at High School?</label>
                <div className="autocompleter">
                  <AutocompleteTagsMulti
                    multiple
                    openOnClick
                    showValues
                    showCheckbox
                    handleDone={this.handleDoneClickSubjects}
                    suggestions={subjectOptions}
                    name='selectSubject'
                    placeholder='Type Subjects...'
                    placeholderOnClick="Type Subjects..."
                    handleChange={this.handleSubjectsChange}
                    idValue='value'
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                    defaultChecked={startingSubjectsArr}
                  />
                  {errorLoadingSubjects === true && (
                    <div className="descriptor prompt error indRoleForm alignLeft">
                      Error loading Subjects. Try reloading the page.
                    </div>
                  )}
                </div>
              </div>
              <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-UpdateSubjects">
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
              Subjects updated
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default EditSubjectsContent;
