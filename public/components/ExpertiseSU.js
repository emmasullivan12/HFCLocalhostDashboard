// Dex last merged this code on 20th apr 2023

import React, { Component } from "react";
import ReactDOM from "react-dom";

import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import ProgressCircles from './ProgressCircles.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import communityList from './Communities.js';

class ExpertiseSU extends React.Component {
  constructor () {
    super();
    this.state = {
      tabPressed: '',
      seniority: '',
      supportNeeded: [],
      editingSupport: '',
      experience: [],
      editingExp: '',
      howHeard: '',
      isSubmitting: false,
    }
    this.handleSeniorityChange = this.handleSeniorityChange.bind(this);
    this.handleSupportChange = this.handleSupportChange.bind(this);
    this.handleExpChange = this.handleExpChange.bind(this);
    this.handleHowHeardAboutUsChange = this.handleHowHeardAboutUsChange.bind(this);
    this.handleMultiSupportOptions = this.handleMultiSupportOptions.bind(this);
    this.handleMultiExpOptions = this.handleMultiExpOptions.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleMultiSupportOptions() {
    if (this.state.supportNeeded.length > 0) {
      document.getElementById("selectBox-selectExp").focus()
    } else {
      document.getElementById("selectBox-selectSupport").focus()
    }
  }

  handleMultiExpOptions() {
    if (this.state.experience.length > 0) {
      document.getElementById("howHeardTextBox").focus()
    } else {
      document.getElementById("selectBox-selectExp").focus()
    }
  }

  handleSeniorityChange(userInput) {
    console.log(userInput)
    this.setState({
      seniority: userInput
    });
  }

  handleSupportChange(userInput) {
    let newArray

    newArray = communityList
      .filter(subCommunity => userInput.includes(subCommunity.label))
      .map(value => value.value)

    if (this.state.supportNeeded.length != 0 && userInput.length != 0) {
      this.setState({
        editingSupport: true
      })
    }

    this.setState({
      supportNeeded: newArray,
    })
  }

  handleExpChange(userInput) {
    let newArray

    newArray = communityList
      .filter(subCommunity => userInput.includes(subCommunity.label))
      .map(value => value.value)

    if (this.state.supportNeeded.length != 0 && userInput.length != 0) {
      this.setState({
        editingExp: true
      })
    }

    this.setState({
      experience: newArray,
    })
  }

  handleHowHeardAboutUsChange(e) {
    this.setState({ howHeard: e.target.value })
  }

  handleTabPress(tabPressed) {
    this.setState({ tabPressed: tabPressed });
  }

  handleSubmit(e) {
    const {updateStep} = this.props;
    this.setState({ isSubmitting: true });

    updateStep("didExpertise")
  }

  canBeSubmitted() {
    const {seniority, supportNeeded, experience, howHeard} = this.state;
    if (seniority != "" && seniority != 0 && supportNeeded.length != 0 && experience.length != 0 && howHeard.length <= 50) {
      const form = document.getElementById("form-ExpertiseSU");

      if (form.checkValidity()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  render() {
    const {seniority, supportNeeded, editingSupport, experience, editingExp, tabPressed, isSubmitting} = this.state;
    const {currentStep, totalSteps} = this.props;
    const isEnabled = this.canBeSubmitted();

    const seniorityOptions = [
      {value: 'entry', label: 'Entry-level / junior', detail: 'e.g executional work, reporting, bookkeeping'},
      {value: 'mid', label: 'Mid-level', detail: 'e.g. project manager, lead small teams / initiatives'},
      {value: 'senior', label: 'Senior / department lead', detail: 'e.g. lead larger teams, influence strategy'},
      {value: 'exec', label: 'Executive / CFO-level', detail: 'e.g. company-wide strategy & decision-making'},
      {value: 'other', label: 'Other'}
    ];

    return (
      <React.Fragment>
        <div>
          <ProgressCircles
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            <form autoComplete="off" id="form-ExpertiseSU">
              <div className="form-group">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="selectSeniority">What <strong>stage are you</strong> in your finance career?</label>
                <SelectBox
                  options={seniorityOptions}
                  placeholder="Select your career stage:"
                  name='selectSeniority'
                  handleChange={this.handleSeniorityChange}
                  handleTabPress={this.handleTabPress}
                  handleMouseDown={this.handleMouseDown}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showDetail
                  detailToShow='detail'
                  required
                />
              </div>
              {(seniority != "" && seniority != 0) && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectSupport">Where do you <strong>need support the most</strong>?</label>
                  <SelectBox
                    multiple
                    finMultiOptions={this.handleMultiSupportOptions}
                    options={communityList}
                    name='selectSupport'
                    placeholder='Select your focus areas:'
                    placeholderOnClick='You can edit these later'
                    handleChange={this.handleSupportChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad={tabPressed ? false : true}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    //showIcon
                    //iconToShow='iconFA'
                    showCheckbox
                    required
                  />
                </div>
              )}
              {(supportNeeded.length > 0 || editingSupport != '') && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectExp">Which areas do you <strong>have experience in / can talk about</strong>?</label>
                  <SelectBox
                    multiple
                    finMultiOptions={this.handleMultiExpOptions}
                    options={communityList}
                    name='selectExp'
                    placeholder='Select expertise areas:'
                    placeholderOnClick='You can edit these later'
                    handleChange={this.handleExpChange}
                    handleTabPress={this.handleTabPress}
                    //focusOnLoad={tabPressed ? false : true}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    //showIcon
                    //iconToShow='iconFA'
                    showCheckbox
                    required
                  />
                </div>
              )}
              {(experience.length > 0 || editingExp != '') && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="selectWorkEnv">Lastly, how did you <strong>hear about us?</strong></label>
                  <TextInput
                    name="howHeard"
                    id="howHeardTextBox"
                    placeholder="Type where you heard about us..."
                    className="form-control-std"
                    maxLength="50"
                    handleChange={this.handleHowHeardAboutUsChange}
                    handleTabPress={this.handleTabPress}
                    handleMouseDown={this.handleMouseDown}
                    //focusOnLoad={tabPressed ? false : true}
                    onBlur={this.onBlur}
                  />
                </div>
              )}
              <button type="button" disabled={isSubmitting === true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-ind">
                {isSubmitting === true && (
                  <LoadingSpinner />
                )}
                {isSubmitting != true && (
                  <span>Next</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExpertiseSU;
