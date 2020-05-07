// Dex last merged this code on 26th April 2020
import React, { Component } from "react";
import ReactDOM from "react-dom";

import SelectBox from './Select.js';
import Autocomplete from './Autocomplete.js';
import TextInput from './TextInput.js';
import ProgressCircles from './ProgressCircles.js';
//import {lookupRoles} from './UserDetail.js';

class IndustryRoleSU extends React.Component {
  constructor () {
    super();
    this.state = {
      roles: [],
      errorLoadingRoles: '',
      showRolePrompt: '',
      tabPressed: '',
      industries: '',
      editingInd: '',
      rolesChosen: '',
      roleValid: '',
      editingRole: '',
      knowNextSteps: '',
    }
    this.handleIndChange = this.handleIndChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderComponents = this.renderComponents.bind(this);
  }

  onRoleFocus = (e) => {
    const currentStateRoles = this.state.rolesChosen;
    const currentStateValid = this.state.roleValid;
    if (currentStateRoles != '' && currentStateValid != '') {
      this.setState({
        editingRole: true
      })
    }
    this.setState({
      showRolePrompt: true
    })
  }

  onRoleBlur = (e) => {
    this.setState({
      showRolePrompt: false
    })
  }

  onRatingBlur = (e) => {
    const isValid = e.currentTarget.value > 0 && e.currentTarget.value <= 10
    if(isValid) {
      document.getElementById("knowNextSteps").classList.remove('error');
    } else {
      document.getElementById("knowNextSteps").classList.add('error');
    }
  }

  handleIndChange(userInput) {
    if (userInput === '') {
      this.setState({
        editingInd: true
      })
    }
    this.setState({
      industries: userInput
    });
  }

  handleRoleChange(userInput, isValid) {
    const currentStateRoles = this.state.rolesChosen;
    const currentStateValid = this.state.roleValid;
    if (currentStateRoles != '' && currentStateValid != '' && userInput === '') {
      this.setState({
        editingRole: true
      })
    }
    if (userInput != "") {
      this.setState({
        showRolePrompt: false
      })
    }
    this.setState({
      rolesChosen: userInput,
      roleValid: isValid
    });
  }

  handleRatingChange(e) {
    this.setState({
      knowNextSteps: e.currentTarget.value
    }, () => {
      document.getElementById("Submit-btn-ind").focus()
    });
  }

  handleTabPress(tabPressed) {
    this.setState({ tabPressed: tabPressed });
  }

  handleSubmit(e) {
    const {updateStep} = this.props;

    updateStep('didIndRole');
  }

  canBeSubmitted() {
    const {industries, rolesChosen, roleValid, knowNextSteps} = this.state;

    if (industries != "" && rolesChosen != '' && roleValid === true && knowNextSteps != "" && knowNextSteps != 0 && !(knowNextSteps > 10)) {
      return true;
    } else {
      return false;
    }

  }

  renderComponents(fileToRender, componentUpdatesState, error) {
    import(`./${fileToRender}.js`)
      .then(component => {
        this.setState({
          [componentUpdatesState]: component.default,
          errorLoadingRoles: false
        })
      })
      .catch(err => {
        this.setState({
          errorLoadingRoles: true
        })
        console.log("Dex to deal with logging error: "+err.message)
      })
  }

  render() {
    const {errorLoadingRoles, showRolePrompt, roles, tabPressed, industries, editingInd, rolesChosen, editingRole, roleValid, knowNextSteps} = this.state;
    const { step, currentStep, totalMenteeSteps } = this.props;

    const industryOptions = [
      {value: '0', label: 'Accounting'},
      {value: '1', label: 'VFX'},
      {value: '2', label: 'Banking'},
      {value: '3', label: 'Astrology'},
      {value: '4', label: 'Zoology'}
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
                <label className="descriptor alignLeft reqAsterisk" htmlFor="selectInd">Which <strong>industries</strong> are you interested in?</label>
                <SelectBox
                  options={industryOptions}
                  name='selectInd'
                  placeholder='Select Industry(s):'
                  handleChange={this.handleIndChange}
                  handleTabPress={this.handleTabPress}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  required
                />
              </div>
              {(industries != '' || editingInd === true) && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectRole">What <strong>career or profession</strong> do you want to work in?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={roles}
                      name='selectRole'
                      placeholder='Type Role(s):'
                      renderComponents={this.renderComponents}
                      fileToRender="Roles"
                      componentUpdatesState="roles"
                      handleChange={this.handleRoleChange}
                      onFocus={this.onRoleFocus}
                      onBlur={this.onRoleBlur}
                      handleTabPress={this.handleTabPress}
                      focusOnLoad={tabPressed ? false : true}
                      idValue='value'
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                    {showRolePrompt && (
                      <div className="descriptor prompt indRoleForm">
                        If you don&#39;t know just yet, that&#39;s fine! Just put &#34;don&#39;t know&#34;
                      </div>
                    )}
                    {errorLoadingRoles === true && (
                      <div className="descriptor prompt error indRoleForm alignLeft">
                        Error loading Roles. Try reloading the page.
                      </div>
                    )}
                  </div>
                </div>
              )}
              {((rolesChosen != '' && roleValid === true) || editingRole === true) && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="knowNextSteps">Out of 10, <strong>how confident</strong> are you in knowing what next steps to take to get there?</label>
                  <TextInput
                    name="knowNextSteps"
                    id="knowNextSteps"
                    placeholder="Rating goes here"
                    className="form-control-std"
                    required
                    handleChange={this.handleRatingChange}
                    handleTabPress={this.handleTabPress}
                    onBlur={this.onRatingBlur}
                    focusOnLoad={tabPressed ? false : true}
                  />
                </div>
              )}
              <button type="button" disabled={!isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-ind">
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
