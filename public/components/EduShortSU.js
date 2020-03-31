// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import SelectBox from './Select.js';
import Autocomplete from './Autocomplete.js';
import TextInput from './TextInput.js';
import {ukUnis} from './UKUnis.js';
import {setSchGraduYr, setUniGraduYr} from './UserDetail.js';


class EduShortSU extends React.Component {
  constructor () {
    super();
    this.state = {
      eetStatus: '',
      schName: '',
      schNameIsValid: '',
      uniName: '',
      uniNameIsValid: '',
      schYrGrp: '',
      uniYrGrp: '',
      courseLength: '',
      schGraduYr: '',
      uniGraduYr: '',
      uniGraduYrIsValid: '',
      tabPressed: '',
      selectBoxFocused: '',
    }
    this.handleEetStatusChange = this.handleEetStatusChange.bind(this);
    this.handleUKSchChange = this.handleUKSchChange.bind(this);
    this.handleSchChange = this.handleSchChange.bind(this);
    this.handleSchYrChange = this.handleSchYrChange.bind(this);
    this.handleUKUniChange = this.handleUKUniChange.bind(this);
    this.handleUniChange = this.handleUniChange.bind(this);
    this.handleUniYrChange = this.handleUniYrChange.bind(this);
    this.handleUniGradYrChange = this.handleUniGradYrChange.bind(this);
    this.handleJobChange = this.handleJobChange.bind(this);
    this.handleTrainChange = this.handleTrainChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.otherValidityChecks = this.otherValidityChecks.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  handleEetStatusChange(userInput) {
    this.setState({
      eetStatus: userInput,
  //    eetStatusIsValid: isValid,
      schName: '',
      schNameIsValid: '',
      uniName: '',
      uniNameIsValid: '',
      schYrGrp: '',
      uniYrGrp: '',
      courseLength: '',
      schGraduYr: '',
      uniGraduYr: '',
      uniGraduYrIsValid: '',
      currCo: '',
      currTrainingProvider: '',
      tabPressed: '',
    });
  }

  handleUKSchChange(userInput, isValid) {
    if (!isValid) {
      this.setState({
        schYrGrp: '',
        schGraduYr: ''
      });
    }
    this.setState({
      schName: userInput,
      schNameIsValid: isValid
    })
  }

  handleSchChange(e) {
    const userInput = e.currentTarget.value;
    const isValid = userInput.length > 3;
    if (!isValid) {
      this.setState({
        schYrGrp: '',
        schGraduYr: ''
      });
    }
    this.setState({
      schName: userInput,
      schNameIsValid: isValid,
    });
  }

  handleSchYrChange(userInput) {
    this.setState({
      schYrGrp: userInput,
      schGraduYr: setSchGraduYr(userInput),
    });
  }

  handleUKUniChange(userInput, isValid) {
    if (!isValid) {
      this.setState({
        uniYrGrp: '',
        uniGraduYr: ''
      });
    }
    this.setState({
      uniName: userInput,
      uniNameIsValid: isValid
    })
  }

  handleUniChange(e) {
    const userInput = e.currentTarget.value;
    const isValid = userInput.length > 3;
    if (!isValid) {
      this.setState({
        uniYrGrp: '',
        uniGraduYr: ''
      });
    }
    this.setState({
      uniName: userInput,
      uniNameIsValid: isValid
    });
  }

  handleUniYrChange(userInput) {
    const courseLength = this.state.courseLength;
    const isValid = (userInput === 'pg' || courseLength >= userInput) ? true : false;
    this.setState({
      uniYrGrp: userInput,
      uniGraduYr: setUniGraduYr(userInput, courseLength),
      uniGraduYrIsValid: isValid
    });
  }

  handleUniGradYrChange(userInput) {
    const uniYrGrp = this.state.uniYrGrp;
    const isValid = (uniYrGrp === 'pg' || userInput >= uniYrGrp) ? true : false;
    this.setState({
      courseLength: userInput,
      uniGraduYr: setUniGraduYr(uniYrGrp, userInput),
      uniGraduYrIsValid: isValid
    });
  }

  handleJobChange(e) {
    this.setState({ currCo: e.currentTarget.value });
  }

  handleTrainChange(e) {
    this.setState({ currTrainingProvider: e.currentTarget.value });
  }

  handleTabPress(tabPressed) {
    this.setState({ tabPressed: tabPressed });
  }

  handleFocus(selectBoxFocused) {
    this.setState({ selectBoxFocused: selectBoxFocused });
  }

  // Passed on to be used within Select.js onBlur & onClickOption events
  otherValidityChecks() {
    const { selectBoxFocused, courseLength } = this.state;
    if (selectBoxFocused === "selectBox-uniYrGrp" || selectBoxFocused === "selectBox-uniLength") {
      if (courseLength === '') {
        document.getElementById("selectBox-uniYrGrp").classList.remove('error');
      } else {
        if (this.state.uniGraduYrIsValid === true) {
          document.getElementById("selectBox-uniYrGrp").classList.remove('error');
        } else {
          document.getElementById("selectBox-uniYrGrp").classList.add('error');
        }
      }
    } else {
      return;
    }
  }

  canBeSubmitted() {
    const {eetStatus, schName, schNameIsValid, uniName, uniNameIsValid, schYrGrp, uniYrGrp, courseLength, schGraduYr, uniGraduYr, uniGraduYrIsValid, currCo, currTrainingProvider } = this.state;

      if (eetStatus != '') {

        if (eetStatus === 'sch') {
          if (schName != '' && schNameIsValid && schYrGrp != '') {
            return true;
          } else {
            return false;
          }

        } else if (eetStatus === 'uni') {
          if (uniName != '' && uniNameIsValid && uniYrGrp != '' && courseLength != '' && uniGraduYrIsValid) {
            return true;
          } else {
            return false;
          }

        } else if (eetStatus === 'job') {
          if (currCo != '') {
            return true;
          } else {
            return false;
          }

        } else if (eetStatus === 'train') {
          if (currTrainingProvider != '') {
            return true;
          } else {
            return false;
          }

        } else if (eetStatus === 'none') {
          return true;


      } else {
        return true;
      }
    }
  }

  render() {

  const { eetStatus, schName, schNameIsValid, uniName, uniNameIsValid, schYrGrp, uniYrGrp, schGraduYr, tabPressed, uniGraduYr, uniGraduYrIsValid, courseLength} = this.state;
  const { country, tflink, step } = this.props;

  const eetStatusUKOptions = [
    {value: 'sch', label: 'I\'m at School / Sixth Form / College'},
    {value: 'uni', label: 'I\'m at University'},
    {value: 'job', label: 'I\'m in full-time employment'},
    {value: 'train', label: 'I\'m in Training'},
    {value: 'none', label: 'None'}
  ];
  const eetStatusNonUKOptions = [
    {value: 'sch', label: 'I\'m at High School'},
    {value: 'uni', label: 'I\'m at University / College'},
    {value: 'job', label: 'I\'m in full-time employment'},
    {value: 'train', label: 'I\'m in Training'},
    {value: 'none', label: 'None'}
  ];
  const ukSchs = ['Thamesmead School','Sunbury Manor','Thameswood College'
//    {value: 'Thamesmead School', location: 'Shepperton, Surrey'},
//    {value: 'Sunbury Manor', location: 'Sunbury, Middx'},
  ];
  const ukSchYrs = [
    {value: 'yr8', label: 'Year 8'},
    {value: 'yr9', label: 'Year 9'},
    {value: 'yr10', label: 'Year 10'},
    {value: 'yr11', label: 'Year 11'},
    {value: 'yr12', label: 'Year 12 (Sixth Form Yr 1)'},
    {value: 'yr13', label: 'Year 13 (Sixth Form Yr 2)'},
    {value: 'finSch', label: 'Finished School / Sixth Form / College'}
  ]
  const nonUKSchYrs = [
    {value: 'yr8', label: '7th Grade'},
    {value: 'yr9', label: '8th Grade'},
    {value: 'yr10', label: '9th Grade'},
    {value: 'yr11', label: '10th Grade'},
    {value: 'yr12', label: '11th Grade'},
    {value: 'yr13', label: '12th Grade'},
    {value: 'finSch', label: 'Finished High School'}
  ]
  const uniYrs = [
    {value: '1', label: '1st Year'},
    {value: '2', label: '2nd Year'},
    {value: '3', label: '3rd Year'},
    {value: '4', label: '4th Year'},
    {value: 'pg', label: 'Studying Post-grad'},
  ]
  const uniLength = [
    {value: '1', label: '1 year'},
    {value: '2', label: '2 years'},
    {value: '3', label: '3 years'},
    {value: '4', label: '4 years'},
    {value: '5', label: '5 years'},
    {value: '6', label: '6 years'},
    {value: '7', label: '7 years'},
    {value: '8', label: '8 years'},
  ]

  const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div>
          <div className='progress-circles-container'>
            <div className={(step==1) ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
            <div className={(step==2) ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle"  />
            </div>
            <div className={(step==3) ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle"  />
            </div>
            <div className={(step==4) ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle"  />
            </div>
          </div>
          <div className='embedded-typeform'>
            <form autoComplete="off">
              <div className="form-group">
                <label className="descriptor alignLeft">Are you currently in Education, Employment or Training?</label>
                <SelectBox
                  options={country === 'GBR' ? eetStatusUKOptions : eetStatusNonUKOptions}
                  placeholder="Select one:"
                  name='eetStatus'
                  handleChange={this.handleEetStatusChange}
                  handleTabPress={this.handleTabPress}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  required
                />
              </div>
              {country === 'GBR' && eetStatus === 'sch' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">What&#39;s the name of your School / College?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={ukSchs}
                      name='eduName'
                      placeholder='School or College'
                      handleChange={this.handleUKSchChange}
                      handleTabPress={this.handleTabPress}
                      focusOnLoad={tabPressed ? false : true}
                    />
                  </div>
                </div>
              )}
              {country != 'GBR' && eetStatus === 'sch' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">What&#39;s the name of your High School?</label>
                  <TextInput
                    name="eduName"
                    id="schNameTextBox"
                    placeholder="High School"
                    className="form-control-std"
                    required
                    handleChange={this.handleSchChange}
                    handleTabPress={this.handleTabPress}
                    onBlur={this.onBlur}
                    focusOnLoad={tabPressed ? false : true}
                  />
                </div>
              )}
              {eetStatus === 'sch' && schNameIsValid === true && (
                <div className="form-group">
                  <label className="descriptor alignLeft">And which {country === 'GBR' ? 'year group' : 'grade / year group'} are you in?</label>
                  <SelectBox
                    options={country === 'GBR' ? ukSchYrs : nonUKSchYrs}
                    placeholder="Select Year Group:"
                    name='schYrGrp'
                    handleChange={this.handleSchYrChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad={schNameIsValid === true && !tabPressed && country === 'GBR' ? true : false}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                </div>
              )}
              {country === 'GBR' && eetStatus === 'uni' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">What&#39;s the name of your University?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={ukUnis}
                      name='uniName'
                      placeholder='University'
                      handleChange={this.handleUKUniChange}
                      handleTabPress={this.handleTabPress}
                      idValue='value'
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      showDetail
                      detailToShow='location'
                      focusOnLoad={tabPressed ? false : true}
                      //tabIndex='1'
                      required
                    />
                  </div>
                </div>
              )}
              {country != 'GBR' && eetStatus === 'uni' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">What&#39;s the name of your University?</label>
                  <TextInput
                    name="uniName"
                    id="uniNameTextBox"
                    placeholder="University"
                    className="form-control-std"
                    required
                    handleChange={this.handleUniChange}
                    handleTabPress={this.handleTabPress}
                    onBlur={this.onBlur}
                    focusOnLoad={tabPressed ? false : true}
                  />
                </div>
              )}
              {eetStatus === 'uni' && uniNameIsValid === true && (
                <React.Fragment>
                  <div className="form-group">
                    <label className="descriptor alignLeft">And which year group are you in?</label>
                    <SelectBox
                      options={uniYrs}
                      name='uniYrGrp'
                      placeholder='Select Year Group:'
                      handleChange={this.handleUniYrChange}
                      handleTabPress={this.handleTabPress}
                      handleFocus={this.handleFocus}
                      otherValidityChecks={this.otherValidityChecks}
                      focusOnLoad={uniNameIsValid === true && uniYrGrp === '' && !tabPressed && country === 'GBR' ? true : false}
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                  </div>
                  {uniGraduYrIsValid === false && courseLength != '' && (
                    <div className="descriptor prompt error signUpForm alignLeft">Year group can&#39;t be greater than course length</div>
                  )}
                </React.Fragment>
              )}
              {eetStatus === 'uni' && uniNameIsValid === true && uniYrGrp != '' && (
                <React.Fragment>
                  <div className="form-group">
                    <label className="descriptor alignLeft">And how long is your course?</label>
                    <SelectBox
                      options={uniLength}
                      name='uniLength'
                      placeholder='Select Course Length:'
                      handleChange={this.handleUniGradYrChange}
                      handleTabPress={this.handleTabPress}
                      handleFocus={this.handleFocus}
                      otherValidityChecks={this.otherValidityChecks}
                      focusOnLoad={uniNameIsValid === true && uniYrGrp != '' && !tabPressed ? true : false}
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                  </div>
                </React.Fragment>
              )}
              {eetStatus === 'job' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">Who do you currently work for?</label>
                  <input
                    //tabIndex='1'
                    type="text"
                    name="currCo"
                    onBlur={this.onBlur}
                    onChange={this.handleJobChange}
                    className="form-control-std"
                    placeholder="Company"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    autoFocus
                    required
                  />
                </div>
              )}
              {eetStatus === 'train' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">Who is your training provider?</label>
                  <input
                    //tabIndex='1'
                    type="text"
                    name="currTrainingProvider"
                    onBlur={this.onBlur}
                    onChange={this.handleTrainChange}
                    className="form-control-std"
                    placeholder="Training Provider"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    autoFocus
                    required
                  />
                </div>
              )}

    {/*          <button type="submit" disabled={!isEnabled} className="Submit-btn fullWidth"> */}
              <button type="submit" disabled={!isEnabled} className="Submit-btn fullWidth">
                Next
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EduShortSU;
