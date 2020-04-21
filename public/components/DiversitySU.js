// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";

import SelectBox from './Select.js';
import Autocomplete from './Autocomplete.js';
import TextInput from './TextInput.js';
import ProgressCircles from './ProgressCircles.js';

class DiversitySU extends React.Component {
  constructor () {
    super();
    this.state = {
      tabPressed: '',
      hurdles: '',
      gender: '',
      ethnicity: '',
    }
    this.handleHurChange = this.handleHurChange.bind(this);
    this.handleGenChange = this.handleGenChange.bind(this);
    this.handleEthChange = this.handleEthChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleHurChange(userInput) {
    this.setState({
      hurdles: userInput
    });
  }

  handleGenChange(userInput) {
    this.setState({
      gender: userInput
    });
  }

  handleEthChange(userInput) {
    this.setState({
      ethnicity: userInput
    });
  }

  handleTabPress(tabPressed) {
    this.setState({ tabPressed: tabPressed });
  }

  handleSubmit(e) {
    const {updateStep} = this.props;
    updateStep('didDiversity', false);
  }

  canBeSubmitted() {
    const {hurdles, gender, ethnicity} = this.state;

    if (hurdles != "" && gender != '' && ethnicity != "") {
      return true;
    } else {
      return false;
    }

  }

  render() {
    const {tabPressed, hurdles, gender} = this.state;
    const { step, currentStep, totalMenteeSteps } = this.props;

    const hurdlesList = [
      {value: '0', label: 'Eligible for Free School Meals'},
      {value: '1', label: '1st in my family to go to university'},
      {value: '2', label: 'Non-native English speaker'},
      {value: '3', label: 'None'},
      {value: '4', label: 'Prefer not to say'}
    ];

    const genders = [
      {value: '0', label: 'Male'},
      {value: '1', label: 'Female'},
      {value: '2', label: 'Non-binary'},
      {value: '3', label: 'Prefer not to say'}
    ];

    const ethnicities = [
      {value: '0', label: 'Asian'},
      {value: '1', label: 'Arab'},
      {value: '2', label: 'Black / African / Caribbean'},
      {value: '3', label: 'Hispanic / Latinx'},
      {value: '4', label: 'Indian / Pakistani'},
      {value: '5', label: 'Mixed / Multiple Ethnic Groups'},
      {value: '6', label: 'White'},
      {value: '7', label: 'Other'},
      {value: '8', label: 'Prefer not to say'}
    ];

    const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div>
          <ProgressCircles
            totalSteps={totalMenteeSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            <form autoComplete="off">
              <div className="form-group">
                <label className="descriptor alignLeft" htmlFor="selectHur">Are / were any of the following applicable to you?</label>
                <SelectBox
                  options={hurdlesList}
                  name='selectHur'
                  placeholder='Select as many as you like:'
                  handleChange={this.handleHurChange}
                  handleTabPress={this.handleTabPress}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  required
                />
              </div>
              <div className="tooltip alignRight descriptor no-href" id="diversityTooltip">Why do I need to provide this?
                <span className="tooltiptext">Not only to we want to make sure nobody gets left behind, but we think it&39;s pretty fun to celebrate our differences!</span>
              </div>
              {(hurdles != '') && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="selectGender">What&#39;s your <strong>gender</strong>?</label>
                  <SelectBox
                    options={genders}
                    name='selectGender'
                    placeholder='Select gender:'
                    handleChange={this.handleGenChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                </div>
              )}
              {gender != '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft" htmlFor="selectEth">How do you identify your <strong>ethnicity</strong>?</label>
                  <SelectBox
                    options={ethnicities}
                    name='selectEth'
                    placeholder='Select ethnicity:'
                    handleChange={this.handleEthChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                </div>
              )}
              <button type="button" disabled={!isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth">
                Next
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DiversitySU;
