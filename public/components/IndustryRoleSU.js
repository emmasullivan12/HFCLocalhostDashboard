// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";

import SelectBox from './Select.js';
import Autocomplete from './Autocomplete.js';
import TextInput from './TextInput.js';
import ProgressCircles from './ProgressCircles.js';
import {lookupRoles} from './UserDetail.js';

class IndustryRoleSU extends React.Component {
  constructor () {
    super();
    this.state = {
      roles: [],
      errorLoadingRoles: '',
      showIndPrompt: '',
      showRolePrompt: '',
      tabPressed: '',
      industry: '',
      role: '',
      ratingConfi: ''
    }
    this.handleIndChange = this.handleIndChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
  }

  componentDidMount(){
    return lookupRoles().then(component => {
      this.setState({
        roles: component.default,
        errorLoadingRoles: false
      })
      console.log("roles: "+this.state.roles)
    })
    .catch(err => {
      this.setState({
        errorLoadingRoles: true
      })
      console.log("Dex to deal with logging error: "+err.message)
    })
  }

  onIndFocus = (e) => {
    this.setState({
      showIndPrompt: true
    })
  }

  onIndBlur = (e) => {
    this.setState({
      showIndPrompt: false
    })
  }

  onRoleFocus = (e) => {
    this.setState({
      showRolePrompt: true
    })
  }

  onRoleBlur = (e) => {
    this.setState({
      showRolePrompt: false
    })
  }

  handleIndChange(userInput) {
    this.setState({
      industry: userInput
    });
  }

  handleRoleChange(userInput) {
    this.setState({
      role: userInput
    });
  }

  handleRatingChange(e) {
    this.setState({
      ratingConfi: e.currentTarget.value
    });
  }

  handleTabPress(tabPressed) {
    this.setState({ tabPressed: tabPressed });
  }

  render() {
    const {errorLoadingRoles, showIndPrompt, showRolePrompt, roles, tabPressed, industry, role, ratingConfi} = this.state;
    const { step, currentStep, totalMenteeSteps } = this.props;

    const industryOptions = [
      {value: '0', label: 'Accounting'},
      {value: '1', label: 'VFX'},
      {value: '2', label: 'Banking'},
      {value: '3', label: 'Astrology'},
      {value: '4', label: 'Zoology'}
    ];

  //  const isEnabled = this.canBeSubmitted();

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
                <label className="descriptor alignLeft" htmlFor="selectInd">Which industries are you interested in?</label>
                <SelectBox
                  options={industryOptions}
                  name='selectInd'
                  placeholder='Select Industry(s):'
                  onFocus={this.onIndFocus}
                  onBlur={this.onIndBlur}
                  handleChange={this.handleIndChange}
                  handleTabPress={this.handleTabPress}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  required
                />
                {showIndPrompt && (
                  <div className="descriptor prompt">
                    You can select up to 3 if you like
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="descriptor alignLeft" htmlFor="selectRole">What career or profession do you want to work in?</label>
                <div className="autocompleter">
                  <Autocomplete
                    suggestions={roles}
                    name='selectRole'
                    placeholder='Type Role(s):'
                    handleChange={this.handleRoleChange}
                    onFocus={this.onRoleFocus}
                    onBlur={this.onRoleBlur}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad={tabPressed ? false : true}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                  {showRolePrompt && (
                    <div className="descriptor prompt">
                      If you don&#39;t know just yet, that&#39;s fine! Just put &#34;don&#39;t know&#34;
                    </div>
                  )}
                  {errorLoadingRoles === true && (
                    <div className="descriptor prompt error eduForm alignLeft">
                      Error loading education institutions. Try reloading the page.
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="descriptor alignLeft" htmlFor="ratingConfi">Out of 10, how confident are you in knowing what next steps you need to take to get down your preferred career path?</label>
                <TextInput
                  name="ratingConfi"
                  id="ratingConfi"
                  placeholder="Rating goes here"
                  className="form-control-std"
                  required
                  handleChange={this.handleRatingChange}
                  handleTabPress={this.handleTabPress}
              //    onBlur={this.onBlur}
                  focusOnLoad={tabPressed ? false : true}
                />
              </div>
              <div className="form-group">
                <label className="descriptor alignLeft" htmlFor="uniNameTextBox">What&#39;s the key thing holding you back from getting there?</label>
                <TextInput
                  name="holdBackTxt"
                  id="holdBackTxt"
                  placeholder="Type here..."
                  className="form-control-std"
                  required
              //    handleChange={this.handleUniChange}
                  handleTabPress={this.handleTabPress}
              //    onBlur={this.onBlur}
                  focusOnLoad={tabPressed ? false : true}
                />
              </div>
              <button type="button" className="Submit-btn fullWidth">
                Next
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IndustryRoleSU;
