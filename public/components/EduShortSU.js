// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import SelectBox from './Select.js';
import Autocomplete from './Autocomplete.js';
import {setSchGraduYr} from './UserDetail.js';


class EduShortSU extends React.Component {
  constructor () {
    super();
    this.state = {
      eetStatus: '',
      schName: '',
      uniName: '',
      schYrGrp: '',
      uniYrGrp: '',
      schGraduYr: '',
      uniGraduYr: ''
    }
    this.handleEetStatusChange = this.handleEetStatusChange.bind(this);
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

  handleUniChange(userInput) {
    this.setState({ uniName: userInput });
  }

  handleUniYrChange(userInput) {
    this.setState({ uniYrGrp: userInput });
  }

  handleUniGradYrChange(userInput) {
    this.setState({ uniGraduYr: userInput });
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
  const ukSchYrs = ['Select:','Year 8','Year 9','Year 10','Year 11','Year 12 (Sixth Form Yr 1)','Year 13 (Sixth Form Yr 2)', 'Finished School / Sixth Form / College']
  const nonUKSchYrs = ['Select:','7th Grade','8th Grade','9th Grade','10th Grade','11th Grade','12th Grade', 'Finished High School'];
  const uniYrs = ['Select:','1st Year','2nd Year','3rd Year','4th Year','Studying Post-grad']
  const ukUnis = [
    {value: 'University of Bath', location: 'Bath, UK'},
    {value: 'University of Bristol', location: 'Bristol, UK'},
  ];
  function uniGraduYrs() {
    var d = new Date();
    var year = d.getFullYear();
    var graduYrs = []
    graduYrs[0] = {value: 'Select', label: 'Select Year:'};
    graduYrs[1] = {value: year, label: 'Class of ' + year};
    graduYrs[2] = {value: year + 1, label: 'Class of ' + (year+1)};
    graduYrs[3] = {value: year + 2, label: 'Class of ' + (year+2)};
    graduYrs[4] = {value: year + 3, label: 'Class of ' + (year+3)};
    graduYrs[5] = {value: year + 4, label: 'Class of ' + (year+4)};
    graduYrs[6] = {value: year + 5, label: 'Class of ' + (year+5)};
    return graduYrs;
  }

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
                      name='ukSchs'
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
                    name="uniName"
                    value={this.state.uniName}
                    onChange={this.handleUniChange}
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
                    value={this.state.uniName}
                    onChange={this.handleUniChange}
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
                    <label className="descriptor alignLeft">And which year are you due to graduate?</label>
                    <div className="autocompleter">
                      <SelectBox
                        options={uniGraduYrs()}
                        required='required'
                        name='uniGraduYr'
                        placeholder='University Graduation Year'
                        handleChange={this.handleUniGradYrChange}
                        handleBlur={this.onBlur}
                      />
                    </div>
                  </div>
                </React.Fragment>
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
