// Dex last merged this code on 26th April 2020

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
      schType: '',
      gender: '',
      ethnicity: '',
    }
    this.handleHurChange = this.handleHurChange.bind(this);
    this.handleSchTypeChange = this.handleSchTypeChange.bind(this);
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

  handleSchTypeChange(userInput) {
    this.setState({
      schType: userInput
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
    }, () => {
      document.getElementById("Submit-btn-eth").focus()
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
    const {hurdles, schType, gender, ethnicity} = this.state;

    if (hurdles != "" && schType != "" && gender != '' && ethnicity != "") {
      return true;
    } else {
      return false;
    }

  }

  render() {
    const {tabPressed, hurdles, schType, gender, ethnicity} = this.state;
    const { step, currentStep, totalMenteeSteps, country, eetStatus } = this.props;

    const hurdlesList = [
      {value: '0', label: 'Eligible for Free School Meals'},
      {value: '1', label: 'My parents didn\'t go to university'},
      {value: '2', label: 'Non-native English speaker'},
      {value: '3', label: 'None'},
      {value: '4', label: 'Prefer not to say'}
    ];

    const uKschAttendedList = [
      {value: '0', label: 'State-run/funded school', detail: ''},
      {value: '1', label: 'Independent or fee-paying school ', detail: 'with bursary'},
      {value: '2', label: 'Independent or fee-paying school', detail: 'no bursary'},
      {value: '3', label: 'Home-schooled', detail: ''},
      {value: '4', label: 'Prefer not to say', detail: ''}
    ];

    const schAttendedList = [
      {value: '0', label: 'Public school/state-funded (selective)', detail: ''},
      {value: '1', label: 'Private or fee-paying school ', detail: 'with scholarship'},
      {value: '2', label: 'Private or fee-paying school', detail: 'no scholarship'},
      {value: '3', label: 'Home-schooled', detail: ''},
      {value: '4', label: 'Prefer not to say', detail: ''}
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
                <label className="descriptor alignLeft reqAsterisk" htmlFor="selectHur">Are / were any of the following applicable to you?</label>
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
              {(hurdles != '') && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectHur">{"What type of " + (country === 'GBR' || 'country' === 'IRL' ? "Secondary School" : "High School") + (eetStatus === "sch" ? " do you attend?" : " did you attend?")}</label>
                  <SelectBox
                    options={country === 'GBR' || 'country' === 'IRL' ? uKschAttendedList : schAttendedList}
                    name='selectSchType'
                    placeholder={'Select ' + (country === 'GBR' ? 'school' : 'high-school') + ' type:'}
                    handleChange={this.handleSchTypeChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    showDetail
                    detailToShow='detail'
                    required
                  />
                </div>
              )}
              {(schType != "") && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectGender">What&#39;s your <strong>gender</strong>?</label>
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
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectEth">How do you identify your <strong>ethnicity</strong>?</label>
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
              {ethnicity != '' && (
                <React.Fragment>
                  <div className="neutralText textLeft paddingBtm">
                    We use this information to support equality of opportunities for our mentees, and are serious about safeguarding your personal data as per our <a className="legal-href" href="https://prospela.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                  </div>
                  <div className="neutralText textLeft paddingBtm">
                    By clicking &#34;Next&#34;, you consent us to use your responses for this purpose.
                  </div>
                </React.Fragment>
              )}
              <button type="button" disabled={!isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-eth">
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
