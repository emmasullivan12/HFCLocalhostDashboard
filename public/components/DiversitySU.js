// Dex last merged this code on 29th June 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import ProgressCircles from './ProgressCircles.js';
import {LoadingSpinner} from './GeneralFunctions.js';

const hurdlesList = [
  {value: 0, label: 'Eligible for Free School Meals', iconFA: 'fas fa-utensils'},
  {value: 1, label: 'My parents didn\'t go to university', iconFA: 'fas fa-hiking'},
  {value: 2, label: 'Non-native English speaker', iconFA: 'fas fa-language'},
  {value: 3, label: 'None', iconFA: 'fas fa-times'},
  {value: 4, label: 'Prefer not to say', iconFA: 'fas fa-comment-slash'}
];

/*const hurdlesList = [
  {value: 0, label: 'Eligible for Free School Meals', iconFA: '', icon: 'https://images.typeform.com/images/EfFgjb4xicUU/image/default'},
  {value: 1, label: 'My parents didn\'t go to university', iconFA: '', icon: 'https://images.typeform.com/images/QSBrrY42iA35/image/default'},
  {value: 2, label: 'Non-native English speaker', iconFA: '', icon: 'https://images.typeform.com/images/di2wKSTrtKwX/image/default'},
  {value: 3, label: 'None', iconFA: '', icon: 'https://images.typeform.com/images/qfz8s3nqfncc/image/default'},
  {value: 4, label: 'Prefer not to say', iconFA: '', icon: 'https://images.typeform.com/images/WzCB42U3EE5c/image/default'}
];*/

class DiversitySU extends React.Component {
  constructor () {
    super();
    this.state = {
      tabPressed: '',
      hurdles: [],
      editingHurdles: '',
      schType: '',
      gender: '',
      ethnicity: '',
      isSubmitting: false,
    }
    this.handleHurChange = this.handleHurChange.bind(this);
    this.handleMultiOptions = this.handleMultiOptions.bind(this);
    this.handleSchTypeChange = this.handleSchTypeChange.bind(this);
    this.handleGenChange = this.handleGenChange.bind(this);
    this.handleEthChange = this.handleEthChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleHurChange(userInput) {
    const newArray = hurdlesList
      .filter(hurdle => userInput.includes(hurdle.label))
      .map(value => value.value)

    if (this.state.hurdles.length != 0 && userInput.length != 0) {
      this.setState({
        editingHurdles: true
      })
    }
    this.setState({
      hurdles: newArray
    })
  }

  handleMultiOptions() {
    if (this.state.hurdles.length > 0) {
      document.getElementById("selectBox-selectSchType").focus()
    } else {
      document.getElementById("selectBox-selectHur").focus()
    }
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
    this.setState({
      isSubmitting: true
    });
    updateStep('didDiversity');
  }

  canBeSubmitted() {
    const {hurdles, schType, gender, ethnicity} = this.state;

    if (hurdles.length != 0 && schType != '' && gender != '' && ethnicity != '') {
      const form = document.getElementById("form-DiversityShortSU");

      if (form.checkValidity()) {
    //    document.getElementById("Submit-btn-eth").focus()
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  render() {
    const {tabPressed, hurdles, editingHurdles, schType, gender, ethnicity, isSubmitting} = this.state;
    const { step, currentStep, totalSteps, country, eetStatus } = this.props;

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
      {value: '0', label: 'Male', iconFA: 'fas fa-male'},
      {value: '1', label: 'Female', iconFA: 'fas fa-female'},
      {value: '2', label: 'Other preferred description', iconFA: 'fas fa-genderless'},
      {value: '3', label: 'Prefer not to say', iconFA: 'fas fa-comment-slash'}
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
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            <form autoComplete="off" id="form-DiversityShortSU">
              <div className="form-group">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="selectHur">Are / were any of the following <strong>applicable to you?</strong></label>
                <SelectBox
                  multiple
                  finMultiOptions={this.handleMultiOptions}
                  options={hurdlesList}
                  name='selectHur'
                  placeholder='Select as many as you like:'
                  placeholderOnClick='Select as many as you like:'
                  handleChange={this.handleHurChange}
                  handleTabPress={this.handleTabPress}
                  focusOnLoad
                  showIcon
                  iconToShow='iconFA'
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showCheckbox
                  required
                />
              </div>
              {(hurdles.length > 0 || editingHurdles != '') && (
                <React.Fragment>
                  <div className="form-group">
                    <label className="descriptor alignLeft reqAsterisk" htmlFor="selectHur">What type of <strong>{(country === 'GBR' ? "Secondary School" : "High School")}</strong>{(eetStatus === "sch" ? " do you attend?" : " did you attend?")}</label>
                    <SelectBox
                      options={country === 'GBR' ? uKschAttendedList : schAttendedList}
                      name='selectSchType'
                      placeholder={'Select ' + (country === 'GBR' ? 'school' : 'high-school') + ' type:'}
                      handleChange={this.handleSchTypeChange}
                      handleTabPress={this.handleTabPress}
              //        focusOnLoad
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      showDetail
                      detailToShow='detail'
                      required
                    />
                  </div>
                </React.Fragment>
              )}
              {schType != '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectGender">What&#39;s your <strong>gender</strong>?</label>
                  <SelectBox
                    options={genders}
                    name='selectGender'
                    placeholder='Select gender:'
                    handleChange={this.handleGenChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad={tabPressed ? false : true}
                    showIcon
                    iconToShow='iconFA'
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
                    focusOnLoad={tabPressed ? false : true}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    isLastChild
                    required
                  />
                </div>
              )}
              {ethnicity != '' && (
               <React.Fragment>
                  <div className="neutralText textLeft paddingBtm">
                    We use this information to support equality of opportunities for our mentees, and are serious about safeguarding your personal data as per our <a tabIndex="-1" className="legal-href" href="https://prospela.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                  </div>
                  <div className="neutralText textLeft paddingBtm">
                    By clicking &#34;Next&#34;, you consent us to use your responses for this purpose.
                  </div>
                </React.Fragment>
              )}
              <button type="button" disabled={isSubmitting === true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-eth">
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

export default DiversitySU;
