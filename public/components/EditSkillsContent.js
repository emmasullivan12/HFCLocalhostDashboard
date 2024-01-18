// Dex last merged this code on 16th jan 2024

import React, { Component } from "react";
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import Checkbox from './Checkbox.js';
import Modal from './Modal.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import skillsOptions from './Skills.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class EditSkillsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      startingExpertiseArr: this.props.expertiseArr ? this.props.expertiseArr : [],
      expertiseFromList: this.props.currExpertiseFromList != null ? this.props.currExpertiseFromList : [],
      freeTextExpertise: this.props.expertisefreetext != null ? this.props.expertisefreetext : [],
      endingExpertiseArr: this.props.expertiseArr ? this.props.expertiseArr : [],
      startingLearningArr: this.props.learningArr ? this.props.learningArr : [],
      learningFromList: this.props.currLearningFromList != null ? this.props.currLearningFromList : [],
      freeTextLearning: this.props.learningfreetext != null ? this.props.learningfreetext : [],
      endingLearningArr: this.props.learningArr ? this.props.learningArr : [],
      errorLoadingSkills: '',
    };
    this.handleExpertiseChange = this.handleExpertiseChange.bind(this);
    this.handleDoneClickExpertise = this.handleDoneClickExpertise.bind(this);
    this.handleLearningChange = this.handleLearningChange.bind(this);
    this.handleDoneClickLearning = this.handleDoneClickLearning.bind(this);
  }

  componentDidMount() {
    const {expOrLearning} = this.props
    if (expOrLearning == 'exp') {
      document.getElementById("autocompleteBox-selectExpertise").focus()
    } else {
      document.getElementById("autocompleteBox-selectLearning").focus()
    }
  }

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    this.setState({ updateSuccess: true })
  }

  handleExpertiseChange(userInput, callback) {
    const expertiseFromList = skillsOptions
      .filter(skill => userInput.includes(skill.label))

    const labels = expertiseFromList.map(value => value.label)

    const freeTextExpertise = userInput
      .filter(skill => labels.indexOf(skill) === -1)

    const values = expertiseFromList.map(value => value.value)

    this.setState({
      expertiseFromList: values,
      freeTextExpertise: freeTextExpertise,
      endingExpertiseArr: userInput
    }, () => {
      if(callback) {
        callback()
      }
    })
  }

  handleDoneClickExpertise() {
    const {expertiseFromList, freeTextExpertise} = this.state
    if ((expertiseFromList.length != 0 || freeTextExpertise.length != 0)) {
      document.getElementById("Submit-btn-UpdateSkills").focus()
    } else {
      document.getElementById("autocompleteBox-selectExpertise").focus()
    }
  }

  handleLearningChange(userInput, callback) {
    const learningFromList = skillsOptions
      .filter(skill => userInput.includes(skill.label))

    const labels = learningFromList.map(value => value.label)

    const freeTextLearning = userInput
      .filter(skill => labels.indexOf(skill) === -1)

    const values = learningFromList.map(value => value.value)

    this.setState({
      learningFromList: values,
      freeTextLearning: freeTextLearning,
      endingLearningArr: userInput
    }, () => {
      if(callback) {
        callback()
      }
    })
  }

  handleDoneClickLearning() {
    const {learningFromList, freeTextLearning} = this.state
    if ((learningFromList.length != 0 || freeTextLearning.length != 0)) {
      document.getElementById("Submit-btn-UpdateSkills").focus()
    } else {
      document.getElementById("autocompleteBox-selectLearning").focus()
    }
  }

  canBeSubmitted() {
    const { expertiseFromList, freeTextExpertise, startingExpertiseArr, endingExpertiseArr, learningFromList, freeTextLearning, startingLearningArr, endingLearningArr } = this.state;

    return (
      ((expertiseFromList.length != 0 || freeTextExpertise.length != 0)
      && (JSON.stringify(startingExpertiseArr) != JSON.stringify(endingExpertiseArr)))
      && ((learningFromList.length != 0 || freeTextLearning.length != 0)
      && (JSON.stringify(startingLearningArr) != JSON.stringify(endingLearningArr))) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, errorLoadingSkills, startingExpertiseArr, startingLearningArr } = this.state;
    const { modalTitle } = this.props;
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
                <label className="descriptor alignLeft reqAsterisk" htmlFor="roleco">Your <strong>Key Skills</strong></label>
                <div className="autocompleter">
                  <AutocompleteTagsMulti
                    multiple
                    openOnClick
                    showValues
                    showCheckbox
                    handleDone={this.handleDoneClickExpertise}
                    suggestions={skillsOptions}
                    name='selectExpertise'
                    placeholder="Type skills..."
                    placeholderOnClick="Type Skills..."
                    handleChange={this.handleExpertiseChange}
                    idValue='value'
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                    defaultChecked={startingExpertiseArr}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="roleco">Skills you&#39;re <strong>learning</strong></label>
                <div className="autocompleter">
                  <AutocompleteTagsMulti
                    multiple
                    openOnClick
                    showValues
                    showCheckbox
                    handleDone={this.handleDoneClickLearning}
                    suggestions={skillsOptions}
                    name='selectLearning'
                    placeholder="Type skills..."
                    placeholderOnClick="Type Skills..."
                    handleChange={this.handleLearningChange}
                    idValue='value'
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                    defaultChecked={startingLearningArr}
                  />
                </div>
              </div>
              {errorLoadingSkills === true && (
                <div className="descriptor prompt error indRoleForm alignLeft">
                  Error loading Skills. Try reloading the page.
                </div>
              )}
              <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-UpdateSkills">
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
              Skills updated
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default EditSkillsContent;
