// Dex last merged this code on 29th June 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import SelectBox from './Select.js';
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import TextInput from './TextInput.js';
import ProgressCircles from './ProgressCircles.js';
import RatingItems from './RatingItems.js';
import {LoadingSpinner} from './GeneralFunctions.js';
//import {lookupRoles} from './UserDetail.js';

const industryOptions = [
  {value: '', label: 'Finance Sector', icon: 'https://images.typeform.com/images/EfFgjb4xicUU/image/default', isTitle: true},
  {value: '0', label: 'Accounting', checkbox: true, isTitle: false},
  {value: '1', label: 'VFX', checkbox: true, isTitle: false},
  {value: '2', label: 'Banking', checkbox: true, isTitle: false},
  {value: '3', label: 'Astrology', checkbox: true, isTitle: false},
  {value: '4', label: 'Zoology', checkbox: true, isTitle: false},
  {value: '', label: 'Engineering Sector', icon: 'https://images.typeform.com/images/EfFgjb4xicUU/image/default', isTitle: true},
  {value: '5', label: 'Librarian', checkbox: true, isTitle: false},
  {value: '6', label: 'Writing', checkbox: true, isTitle: false},
  {value: '7', label: 'Reading', checkbox: true, isTitle: false},
  {value: '8', label: 'Healthcare', checkbox: true, isTitle: false},
  {value: '9', label: 'Physics', checkbox: true, isTitle: false},
  {value: '', label: 'Engineering Sector2', icon: 'https://images.typeform.com/images/EfFgjb4xicUU/image/default', isTitle: true},
  {value: '5', label: 'Librarian2', checkbox: true, isTitle: false},
  {value: '6', label: 'Writing2', checkbox: true, isTitle: false},
  {value: '7', label: 'Reading2', checkbox: true, isTitle: false},
  {value: '8', label: 'Healthcare2', checkbox: true, isTitle: false},
  {value: '9', label: 'Physics2', checkbox: true, isTitle: false},
  {value: '', label: 'Engineering Sector3', icon: 'https://images.typeform.com/images/EfFgjb4xicUU/image/default', isTitle: true},
  {value: '5', label: 'Librarian3', checkbox: true, isTitle: false},
  {value: '6', label: 'Writing3', checkbox: true, isTitle: false},
  {value: '7', label: 'Reading3', checkbox: true, isTitle: false},
  {value: '8', label: 'Healthcare3', checkbox: true, isTitle: false},
  {value: '9', label: 'Physics3', checkbox: true, isTitle: false},
  {value: '', label: 'Engineering Sector4', icon: 'https://images.typeform.com/images/EfFgjb4xicUU/image/default', isTitle: true},
  {value: '5', label: 'Librarian4', checkbox: true, isTitle: false},
  {value: '6', label: 'Writing4', checkbox: true, isTitle: false},
  {value: '7', label: 'Reading4', checkbox: true, isTitle: false},
  {value: '8', label: 'Healthcare4', checkbox: true, isTitle: false},
  {value: '9', label: 'Physics4', checkbox: true, isTitle: false},
  {value: '', label: 'Engineering Sector5', icon: 'https://images.typeform.com/images/EfFgjb4xicUU/image/default', isTitle: true},
  {value: '5', label: 'Librarian5', checkbox: true, isTitle: false},
  {value: '6', label: 'Writing5', checkbox: true, isTitle: false},
  {value: '7', label: 'Reading5', checkbox: true, isTitle: false},
  {value: '8', label: 'Healthcare5', checkbox: true, isTitle: false},
  {value: '9', label: 'Physics5', checkbox: true, isTitle: false}
];

const roleOptions = [
  {value: '0', label: 'Animator'},
  {value: '1', label: 'Accountant'},
  {value: '2', label: 'Banker'},
  {value: '3', label: 'Candlestick Maker'},
  {value: '4', label: 'Librarian'},
  {value: '5', label: 'Delivery Driver'},
  {value: '6', label: 'Uber Driver'},
  {value: '7', label: 'Postman'},
  {value: '8', label: 'Teacher'},
  {value: '9', label: 'Baker'},
];

class IndustryRoleSU extends React.Component {
  constructor () {
    super();
    this.state = {
      rolesFromList: [],
      freeTextRoles: [],
      errorLoadingRoles: '',
      tabPressed: '',
      industries: [],
      editingInd: '',
      editingRole: '',
      knowNextSteps: '',
      isSubmitting: false,
    }
    this.handleIndChange = this.handleIndChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleMultiOptions = this.handleMultiOptions.bind(this);
  //  this.handleMultiRoles = this.handleMultiRoles.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onRoleFocus = (e) => {
    const {rolesFromList, freeTextRoles} = this.state
    if ((rolesFromList.length != 0 || freeTextRoles.length != 0)) {
      this.setState({
        editingRole: true
      })
    }
  }

/*  onRatingBlur = (e) => {
    const isValid = e.currentTarget.value > 0 && e.currentTarget.value <= 10
    if(isValid) {
      document.getElementById("knowNextSteps").classList.remove('error');
    } else {
      document.getElementById("knowNextSteps").classList.add('error');
    }
  }*/

  handleIndChange(userInput) {
    let newArray

    newArray = industryOptions
      .filter(industry => userInput.includes(industry.label))
      .map(value => value.value)

    if (this.state.industries.length != 0 && userInput.length != 0) {
      this.setState({
        editingInd: true
      })
    }

    this.setState({
      industries: newArray,
    })
  }

  handleMultiOptions() {
    if (this.state.industries.length > 0) {
      document.getElementById("autocompleteBox-selectRole").focus()
    } else {
      document.getElementById("selectBox-selectInd").focus()
    }
  }

/*  handleMultiRoles() {
    const {rolesFromList, freeTextRoles} = this.state
    if ((rolesFromList.length != 0 || freeTextRoles.length != 0)) {
      document.getElementById("ratingsContainer").firstElementChild.focus()
    } else {
      document.getElementById("autocompleteBox-selectRole").focus()
    }
  }*/

  handleRoleChange(userInput, callback) {
    const rolesFromList = roleOptions
      .filter(role => userInput.includes(role.label))

    const labels = rolesFromList.map(value => value.label)

    const freeTextRoles = userInput
      .filter(role => labels.indexOf(role) === -1)

    const values = rolesFromList.map(value => value.value)

    if ((this.state.rolesFromList.length != 0 || this.state.freeTextRoles.length != 0) && userInput.length != 0) {
      this.setState({
        editingRole: true
      })
    }

    this.setState({
      rolesFromList: values,
      freeTextRoles: freeTextRoles
    }, () => {
      if(callback) {
        callback()
      }
    })

  }

  handleRatingChange(value) {
    this.setState({
      knowNextSteps: value
    }, () => {
      if (this.state.knowNextSteps === "") {
        document.getElementById("ratingsContainer").firstElementChild.focus()
      } else {
        document.getElementById("Submit-btn-ind").focus()
      }
    });
  }

  handleTabPress(tabPressed) {
    this.setState({ tabPressed: tabPressed });
  }

  handleSubmit(e) {
    const {updateStep} = this.props;
    this.setState({ isSubmitting: true });
    updateStep('didIndRole');
  }

  canBeSubmitted() {
    const {industries, rolesFromList, freeTextRoles, knowNextSteps} = this.state;
    if (industries.length != 0 && (rolesFromList.length != 0 || freeTextRoles.length != 0) && knowNextSteps != "" && knowNextSteps != 0 && !(knowNextSteps > 10)) {
      const form = document.getElementById("form-IndRoleShortSU");

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
    const {errorLoadingRoles, rolesFromList, freeTextRoles, tabPressed, industries, editingInd, editingRole, knowNextSteps, isSubmitting} = this.state;
    const { step, currentStep, totalMenteeSteps } = this.props;

    const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div>
          <ProgressCircles
            totalSteps={totalMenteeSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            <form autoComplete="off" id="form-IndRoleShortSU">
              <div className="form-group">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="selectInd">Which <strong>industries</strong> are you interested in?</label>
                <SelectBox
                  multiple
                  finMultiOptions={this.handleMultiOptions}
                  options={industryOptions}
                  name='selectInd'
                  placeholder='Select Industry(s):'
                  placeholderOnClick='You can edit these later'
                  handleChange={this.handleIndChange}
                  handleTabPress={this.handleTabPress}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showIcon
                  iconToShow='icon'
                  showCheckbox
                  required
                />
              </div>
              {(industries.length > 0 || editingInd != '') && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectRole">What <strong>career or profession</strong> do you want to work in?</label>
                  <div className="autocompleter">
                    <AutocompleteTagsMulti
                      multiple
                      openOnClick
                      showValues
                      showCheckbox
                  //    finMultiOptions={this.handleMultiRoles}
                      suggestions={roleOptions}
                      name='selectRole'
                      placeholder='Type Role(s):'
                      placeholderOnClick="Type Role(s): Not sure? Select 'don't know'"
                      handleChange={this.handleRoleChange}
                      onFocus={this.onRoleFocus}
                      handleTabPress={this.handleTabPress}
                      focusOnLoad={tabPressed ? false : true}
                      idValue='value'
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                    {errorLoadingRoles === true && (
                      <div className="descriptor prompt error indRoleForm alignLeft">
                        Error loading Roles. Try reloading the page.
                      </div>
                    )}
                  </div>
                </div>
              )}
              {((rolesFromList.length != 0 || freeTextRoles.length != 0) || editingRole != '') && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="knowNextSteps">Out of 10, <strong>how confident</strong> are you in knowing what next steps to take to get there?</label>
                  <RatingItems
                    ratingOutOf={10}
                    handleRatingChange={this.handleRatingChange}
                    name='selectRating'
                    handleTabPress={this.handleTabPress}
                    focusOnLoad={tabPressed ? false : true}
                    required
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

export default IndustryRoleSU;
