// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import SelectBox from './Select.js';
import Autocomplete from './Autocomplete.js';
import {setSchGraduYr, setUniGraduYr} from './UserDetail.js';


class EduShortSU extends React.Component {
  constructor () {
    super();
    this.state = {
      eetStatus: '',
      schName: '',
      uniName: '',
      schYrGrp: '',
      uniYrGrp: '',
      courseLength: '',
      schGraduYr: '',
      uniGraduYr: ''
    }
    this.handleEetStatusChange = this.handleEetStatusChange.bind(this);
    this.handleUKSchChange = this.handleUKSchChange.bind(this);
    this.handleSchYrChange = this.handleSchYrChange.bind(this);
    this.handleUKUniChange = this.handleUKUniChange.bind(this);
    this.handleUniYrChange = this.handleUniYrChange.bind(this);
    this.handleUniGradYrChange = this.handleUniGradYrChange.bind(this);
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
    this.setState({ eetStatus: userInput });
  }

  handleUKSchChange(userInput) {
    this.setState({ schName: userInput });
  }

  handleSchYrChange(userInput) {
    this.setState({
      schYrGrp: userInput,
      schGraduYr: setSchGraduYr(userInput),
    });
  }

  handleUKUniChange(userInput) {
    this.setState({ uniName: userInput });
  }

  handleUniYrChange(userInput) {
    const courseLength = this.state.courseLength;
    this.setState({
      uniYrGrp: userInput,
      uniGraduYr: setUniGraduYr(userInput, courseLength)
    });
  }

  handleUniGradYrChange(userInput) {
    const uniYrGrp = this.state.uniYrGrp;
    this.setState({
      courseLength: userInput,
      uniGraduYr: setUniGraduYr(uniYrGrp, userInput)
    });
  }

/*  canBeSubmitted(countries, ukCounties) {
    const {country, stateProv, city} = this.state;

    CHECK IS NOT "SELECT" OPTION

    if (country != '' && countries.indexOf(country) != -1 && city != '') {
      if (country === 'United States of America' || country === 'Canada') {
        if (stateProv != '' && ukCounties.indexOf(stateProv) != -1 ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }
*/

  render() {

  const { eetStatus, schName, uniName, schYrGrp, uniYrGrp, schGraduYr, uniGraduYr} = this.state;
  const { country, tflink, step } = this.props;

  const eetStatusUKOptions = [
    {value: 'Select', label: 'Select an option:'},
    {value: 'sch', label: 'I\'m at School / Sixth Form / College'},
    {value: 'uni', label: 'I\'m at University'},
    {value: 'job', label: 'I\'m in full-time employment'},
    {value: 'train', label: 'I\'m in Training'},
    {value: 'none', label: 'None'}
  ];
  const eetStatusNonUKOptions = [
    {value: 'Select', label: 'Select an option:'},
    {value: 'sch', label: 'I\'m at High School'},
    {value: 'uni', label: 'I\'m at University / College'},
    {value: 'job', label: 'I\'m in full-time employment'},
    {value: 'train', label: 'I\'m in Training'},
    {value: 'none', label: 'None'}
  ];
  const ukSchs = ['Thamesmead School','Sunbury Manor'
//    {value: 'Thamesmead School', location: 'Shepperton, Surrey'},
//    {value: 'Sunbury Manor', location: 'Sunbury, Middx'},
  ];
  const ukSchYrs = [
    {value: 'Select', label: 'Select:'},
    {value: 'yr8', label: 'Year 8'},
    {value: 'yr9', label: 'Year 9'},
    {value: 'yr10', label: 'Year 10'},
    {value: 'yr11', label: 'Year 11'},
    {value: 'yr12', label: 'Year 12 (Sixth Form Yr 1)'},
    {value: 'yr13', label: 'Year 13 (Sixth Form Yr 2)'},
    {value: 'finSch', label: 'Finished School / Sixth Form / College'}
  ]
  const nonUKSchYrs = [
    {value: 'Select', label: 'Select:'},
    {value: 'yr8', label: '7th Grade'},
    {value: 'yr9', label: '8th Grade'},
    {value: 'yr10', label: '9th Grade'},
    {value: 'yr11', label: '10th Grade'},
    {value: 'yr12', label: '11th Grade'},
    {value: 'yr13', label: '12th Grade'},
    {value: 'finSch', label: 'Finished High School'}
  ]
  const uniYrs = [
    {value: 'Select', label: 'Select:'},
    {value: '1', label: '1st Year'},
    {value: '2', label: '2nd Year'},
    {value: '3', label: '3rd Year'},
    {value: '4', label: '4th Year'},
    {value: 'pg', label: 'Studying Post-grad'},
  ]
  const uniLength = [
    {value: 'Select', label: 'Select:'},
    {value: '1', label: '1 year'},
    {value: '2', label: '2 years'},
    {value: '3', label: '3 years'},
    {value: '4', label: '4 years'},
    {value: '5', label: '5 years'},
    {value: '6', label: '6 years'},
    {value: '7', label: '7 years'},
    {value: '8', label: '8 years'},
  ]
  const ukUnis = [
    {value: 'University of Bath', location: 'Bath, UK'},
    {value: 'University of Bristol', location: 'Bristol, UK'},
    {value: 'University of Cambridge', location: 'Cambridge, UK'},
    {value: 'St Andrews', location: 'St Andrews, Scotland, UK'},
  ];

//  const isEnabled = this.canBeSubmitted(countries, ukCounties);

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
                  options={country === 'United Kingdom' ? eetStatusUKOptions : eetStatusNonUKOptions}
                  required='required'
                  name='eetStatus'
                  handleChange={this.handleEetStatusChange}
                  handleBlur={this.onBlur}
                />
              </div>
              {country === 'United Kingdom' && eetStatus === 'sch' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">What&#39;s the name of your School / College?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={ukSchs}
                      name='eduName'
                      placeholder='School or College'
                      handleChange={this.handleUKSchChange}
                      handleBlur={this.onBlur}
                    />
                  </div>
                </div>
              )}
              {country != 'United Kingdom' && eetStatus === 'sch' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">What&#39;s the name of your High School?</label>
                  <input
                    type="text"
                    name="eduName"
                    onBlur={this.onBlur}
                    className="form-control-std"
                    placeholder="High School"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    required
                  />
                </div>
              )}
              {eetStatus === 'sch' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">And which {country === 'United Kingdom' ? 'year group' : 'grade / year group'} are you in?</label>
                  <div className="autocompleter">
                    <SelectBox
                      options={country === 'United Kingdom' ? ukSchYrs : nonUKSchYrs}
                      required='required'
                      name='schYrGrp'
                      placeholder='Year Group'
                      handleChange={this.handleSchYrChange}
                      handleBlur={this.onBlur}
                    />
                  </div>
                </div>
              )}
              {country === 'United Kingdom' && eetStatus === 'uni' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">What&#39;s the name of your University?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={ukUnis}
                      name='uniName'
                      placeholder='University'
                      handleChange={this.handleUKUniChange}
                      handleBlur={this.onBlur}
                      valueToShow='value'
                    />
                  </div>
                </div>
              )}
              {country != 'United Kingdom' && eetStatus === 'uni' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">What&#39;s the name of your University?</label>
                  <input
                    type="text"
                    name="uniName"
                    onBlur={this.onBlur}
                    className="form-control-std"
                    placeholder="University"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    required
                  />
                </div>
              )}
              {eetStatus === 'uni' && (
                <React.Fragment>
                  <div className="form-group">
                    <label className="descriptor alignLeft">And which year group are you in?</label>
                    <div className="autocompleter">
                      <SelectBox
                        options={uniYrs}
                        required='required'
                        name='uniYrGrp'
                        placeholder='Year Group'
                        handleChange={this.handleUniYrChange}
                        handleBlur={this.onBlur}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="descriptor alignLeft">And how long is your course?</label>
                    <div className="autocompleter">
                      <SelectBox
                        options={uniLength}
                        required='required'
                        name='uniLength'
                        placeholder='University Course Length'
                        handleChange={this.handleUniGradYrChange}
                        handleBlur={this.onBlur}
                      />
                    </div>
                  </div>
                </React.Fragment>
              )}
              {eetStatus === 'job' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">Who do you currently work for?</label>
                  <input
                    type="text"
                    name="currCo"
                    onBlur={this.onBlur}
                    className="form-control-std"
                    placeholder="Company"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    required
                  />
                </div>
              )}
              {eetStatus === 'train' && (
                <div className="form-group">
                  <label className="descriptor alignLeft">Who is your training provider?</label>
                  <input
                    type="text"
                    name="currTrainingProvider"
                    onBlur={this.onBlur}
                    className="form-control-std"
                    placeholder="Training Provider"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    required
                  />
                </div>
              )}

    {/*          <button type="submit" disabled={!isEnabled} className="Submit-btn fullWidth"> */}
              <button type="submit" className="Submit-btn fullWidth">
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
