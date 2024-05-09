// Dex last merged this code on 29nd mar 2023

import React, { Component } from "react";
import ReactDOM from "react-dom";

import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';

import "../css/Login.css";

const jobList = [
  {value: 0, label: "C-level"},
  {value: 1, label: "SVP/EVP"},
  {value: 2, label: "Director/VP"},
  {value: 3, label: "Manager/Supervisor"},
  {value: 4, label: "Mid or Entry level"},
  {value: 5, label: "Intern"},
  {value: 6, label: "Freelance or contract"},
  {value: 7, label: "Student"},
  {value: 8, label: "Other"}
];

const roleList = [ // currently just placeholders
  {value: '', label: 'Business / Strategy', isTitle: true},
  {value: 0, label: "C-level"},
  {value: '', label: 'Operations', isTitle: true},
  {value: 1, label: "SVP/EVP"},
  {value: '', label: 'Finance / Accounting', isTitle: true},
  {value: 2, label: "Director/VP"},
  {value: '', label: 'Consulting', isTitle: true},
  {value: 3, label: "Manager/Supervisor"},
  {value: '', label: 'Other', isTitle: true},
  {value: 4, label: "Mid or Entry level"},
];

const currEmployerList = [ // [if not student or freelancer]
  {value: 0, label: "Accounting & Audit firm"},
  {value: 1, label: "Other Professional Services firm (e.g. Investment Bank, PE, VC, Asset Manager, Consulting)"},
  {value: 2, label: "Working in industry (e.g. Tech, Oil & Gas, FMCG, etc.)"},
  {value: 3, label: "I'm not currently in education, employment or training"},
  {value: 4, label: "Other"}
];

const currSituList = [
  {value: 0, label: "Applying for commercial finance & strategy roles (e.g. FDD, FP&A, TAS, Commercial Analyst)"},
  {value: 1, label: "Wanting to level up in current role / division"},
  {value: 2, label: "Stepping into first business role / P&L ownership"},
  {value: 3, label: "Other"}
];

class SignUp extends React.Component {
  constructor () {
    super();
    this.state = {
      tabPressed: '',
      fname: '',
      lname: '',
      job: '',
      role: '',
      currEmployer: '',
      currSitu: '',
      isGeneralError: false,
      isSubmitting: false,
      generalErrorMessage: '',
    }
    this.handleFnameChange = this.handleFnameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleJobChange = this.handleJobChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleCurrEmployerChange = this.handleCurrEmployerChange.bind(this);
    this.handleCurrSituChange = this.handleCurrSituChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  onBlur = (e) => {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  handleMouseDown = (e) => {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  handleFnameChange = (e) => {
    this.setState({ fname: e.target.value })
  }

  handleLnameChange = (e) => {
    this.setState({ lname: e.target.value })
  }

  handleJobChange(userInput) {
    this.setState({
      job: userInput
    });
  }

  handleRoleChange(userInput) {
    this.setState({
      role: userInput
    });
  }

  handleCurrEmployerChange(userInput) {
    this.setState({
      currEmployer: userInput
    });
  }

  handleCurrSituChange(userInput) {
    this.setState({
      currSitu: userInput
    }, () => {
      document.getElementById("Submit-btn-eth").focus()
    });
  }

  handleTabPress(tabPressed) {
    this.setState({ tabPressed: tabPressed });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmitting: true,
      isGeneralError: false,
      generalErrorMessage: ''
    });
    const submission = {
      fname: this.state.fname,
      lname: this.state.lname,
      job: this.state.job,
      role: this.state.role,
      currEmployer: this.state.currEmployer,
      currSitu: this.state.currSitu
    }

  }

  canBeSubmitted() {
    const {job, role, currEmployer, currSitu, fname, lname} = this.state;

    if (job != '' && role != '' && (job == 7 || job == 8 || currEmployer != '') && currSitu != '' && fname != '' && lname != '') {
      const form = document.getElementById("form-SignUp");

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
    const {tabPressed, fname, lname, job, role, currEmployer, currSitu, isSubmitting} = this.state;
    const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div>
          <div className='embedded-typeform'>
            <form autoComplete="off" id="form-SignUp">
              <div className="form-group">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="fnameTextBox">What&#39;s your <strong>first name?</strong></label>
                <TextInput
                  name="fname"
                  id="fnameTextBox"
                  placeholder="First Name"
                  className="form-control-std"
                  maxLength="35"
                  handleChange={this.handleFnameChange}
                  handleTabPress={this.handleTabPress}
                  handleMouseDown={this.handleMouseDown}
                  onBlur={this.onBlur}
                  focusOnLoad={tabPressed ? false : true}
                  required
                />
              </div>
              {fname != '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="lnameTextBox">What&#39;s your <strong>last name?</strong></label>
                  <TextInput
                    name="lname"
                    id="lnameTextBox"
                    placeholder="Last Name"
                    className="form-control-std"
                    maxLength="35"
                    handleChange={this.handleLnameChange}
                    handleTabPress={this.handleTabPress}
                    handleMouseDown={this.handleMouseDown}
                    onBlur={this.onBlur}
                    focusOnLoad={tabPressed ? false : true}
                    required
                  />
                </div>
              )}
              {lname != '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-selectJob">What&#39;s your <strong>current job level</strong>?</label>
                  <SelectBox
                    options={jobList}
                    name='selectJob'
                    placeholder='Select Job Level:'
                    handleChange={this.handleJobChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad={tabPressed ? false : true}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                </div>
              )}
              {job != '' && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-selectRole">What best describes your <strong>role</strong>?</label>
                  <SelectBox
                    options={roleList}
                    name='selectRole'
                    placeholder='Select your current role:'
                    handleChange={this.handleRoleChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad={tabPressed ? false : true}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                </div>
              )}
              {role != '' && (job != 7 || job != 8) && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-selectCurrEmployer">Who is your <strong>current employer</strong>?</label>
                  <SelectBox
                    options={currEmployerList}
                    name='selectCurrEmployer'
                    placeholder='Select your current employer:'
                    handleChange={this.handleCurrEmployerChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad={tabPressed ? false : true}
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  />
                </div>
              )}
              {role != '' && (job == 7 || job == 8 || currEmployer != '') && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-selectCurrSitu">How would you best describe your <strong>current situation</strong>?</label>
                  <SelectBox
                    options={currSituList}
                    name='selectCurrSitu'
                    placeholder='Select your current situation:'
                    handleChange={this.handleCurrSituChange}
                    handleTabPress={this.handleTabPress}
                    focusOnLoad={tabPressed ? false : true}
                    isLastChild
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                </div>
              )}
              {currSitu != '' && (
               <React.Fragment>
                  <div className="neutralText textLeft paddingBtm">
                    We use this information to support the continued development of our service to our customers, and are serious about safeguarding your personal data as per our <a tabIndex="-1" className="legal-href" href="https://theswiftexit.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
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
              {this.state.generalErrorMessage && (
                <div className="redText"> {this.state.generalErrorMessage} </div>
              )}
              {this.state.isGeneralError && (
                <div className="redText"> Hmmm, looks like something went wrong. Please refresh the page and try again. </div>
              )}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;
