// Dex last merged this code on 20th oct 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import SelectBox from './Select.js';
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import TextInput from './TextInput.js';
import ProgressCircles from './ProgressCircles.js';
import RatingItems from './RatingItems.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import roleOptions from './Roles.js';
//import {lookupRoles} from './UserDetail.js';

/*const industryOptions2 = [
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
];*/

const industryOptions = [
  {value: '', label: 'Art, Fashion & Design', iconFA: 'fas fa-palette', isTitle: true},
  {value: '0', label: 'Art & Exhibitions', checkbox: true, isTitle: false},
  {value: '1', label: 'Fashion & Photography', checkbox: true, isTitle: false},
  {value: '2', label: 'Graphic Design & Animation', checkbox: true, isTitle: false},
  {value: '3', label: 'Product & Interior Design', checkbox: true, isTitle: false},
  {value: '', label: 'Business, Finance & Accounting', iconFA: 'fas fa-pound-sign', isTitle: true},
  {value: '4', label: 'Investment Banking', checkbox: true, isTitle: false},
  {value: '5', label: 'Asset Management & Private Equity', checkbox: true, isTitle: false},
  {value: '6', label: 'Accounting & Audit', checkbox: true, isTitle: false},
  {value: '7', label: 'Management Consulting', checkbox: true, isTitle: false},
  {value: '8', label: 'Insurance, Tax & Financial Advisory', checkbox: true, isTitle: false},
  {value: '9', label: 'Administration & Operations', checkbox: true, isTitle: false},
  {value: '', label: 'Construction & Real Estate', iconFA: 'fas fa-wrench', isTitle: true},
  {value: '10', label: 'Architecture & Civil Engineering', checkbox: true, isTitle: false},
  {value: '11', label: 'Construction Sites & Facilities', checkbox: true, isTitle: false},
  {value: '12', label: 'Real Estate Investing & Development', checkbox: true, isTitle: false},
  {value: '13', label: 'Property Management & Sales', checkbox: true, isTitle: false},
  {value: '', label: 'Education, Training & Recruitment', iconFA: 'fas fa-graduation-cap', isTitle: true},
  {value: '14', label: 'HR, Training & Recruitment', checkbox: true, isTitle: false},
  {value: '15', label: 'Teaching & Tutoring', checkbox: true, isTitle: false},
  {value: '', label: 'Energy, Environment & Agriculture', iconFA: 'fas fa-seedling', isTitle: true},
  {value: '16', label: 'Energy & Utilities', checkbox: true, isTitle: false},
  {value: '17', label: 'Conservation & Sustainability', checkbox: true, isTitle: false},
  {value: '18', label: 'Farming & Agriculture', checkbox: true, isTitle: false},
  {value: '', label: 'Entertainment', iconFA: 'fas fa-film', isTitle: true},
  {value: '19', label: 'Film, TV & VFX in Film/TV', checkbox: true, isTitle: false},
  {value: '20', label: 'Gaming & VFX in Games', checkbox: true, isTitle: false},
  {value: '21', label: 'Music, Dance & Theatre', checkbox: true, isTitle: false},
  {value: '22', label: 'Events Management', checkbox: true, isTitle: false},
  {value: '', label: 'Industrial & Engineering', iconFA: 'fas fa-drafting-compass', isTitle: true},
  {value: '23', label: 'Aeronautical & Space Engineering', checkbox: true, isTitle: false},
  {value: '24', label: 'Electronic & Mechanical Engineering', checkbox: true, isTitle: false},
  {value: '25', label: 'Chemical Engineering', checkbox: true, isTitle: false},
  {value: '26', label: 'Manufacturing', checkbox: true, isTitle: false},
  {value: '27', label: 'Nuclear, Petroleum & Process Engineering', checkbox: true, isTitle: false},
  {value: '', label: 'Law', iconFA: 'fas fa-gavel', isTitle: true},
  {value: '28', label: 'Criminal Law', checkbox: true, isTitle: false},
  {value: '29', label: 'Corporate Law & Intellectual Property', checkbox: true, isTitle: false},
  {value: '30', label: 'Common Law & Disuptes', checkbox: true, isTitle: false},
  {value: '', label: 'Media & Marketing', iconFA: 'fas fa-bullhorn', isTitle: true},
  {value: '31', label: 'Advertising & Branding', checkbox: true, isTitle: false},
  {value: '32', label: 'PR & Social Media', checkbox: true, isTitle: false},
  {value: '33', label: 'Journalism, Writing & Radio', checkbox: true, isTitle: false},
  {value: '', label: 'Non-profit, Charity & Social Care', iconFA: 'fas fa-hand-holding-heart', isTitle: true},
  {value: '34', label: 'International aid & development', checkbox: true, isTitle: false},
  {value: '35', label: 'Charity, Fundraising & Voluntary work', checkbox: true, isTitle: false},
  {value: '36', label: 'Community, Counselling & Social Care', checkbox: true, isTitle: false},
  {value: '', label: 'Politics & Philosophy', iconFA: 'fas fa-landmark', isTitle: true},
  {value: '37', label: 'Government, Civil Service & Policy', checkbox: true, isTitle: false},
  {value: '38', label: 'Economics, Social Research & Intelligence', checkbox: true, isTitle: false},
  {value: '', label: 'Emergency Services & Law Enforcement', iconFA: 'fas fa-fire-extinguisher', isTitle: true},
  {value: '39', label: 'Armed Forces & Security', checkbox: true, isTitle: false},
  {value: '40', label: 'Policing, Fire & Prison Services', checkbox: true, isTitle: false},
  {value: '', label: 'Sciences & Health', iconFA: 'fas fa-microscope', isTitle: true},
  {value: '41', label: 'Medical, Pharmacy & Dentistry', checkbox: true, isTitle: false},
  {value: '42', label: 'Clinical Science & Research', checkbox: true, isTitle: false},
  {value: '43', label: 'Nursing & Midwifery', checkbox: true, isTitle: false},
  {value: '44', label: 'Animals & Veterinary', checkbox: true, isTitle: false},
  {value: '', label: 'Sports, Leisure & Retail', iconFA: 'fas fa-umbrella-beach', isTitle: true},
  {value: '45', label: 'Retail & Merchandising', checkbox: true, isTitle: false},
  {value: '46', label: 'Sports, Fitness & Coaching', checkbox: true, isTitle: false},
  {value: '47', label: 'Accommodation & Food Services', checkbox: true, isTitle: false},
  {value: '48', label: 'Transportation & Tourism', checkbox: true, isTitle: false},
  {value: '', label: 'Startups & Entrepreneurship', iconFA: 'fas fa-rocket', isTitle: true},
  {value: '49', label: 'Entrepreneurship & Starting a business', checkbox: true, isTitle: false},
  {value: '50', label: 'Venture Capital & Fundraising', checkbox: true, isTitle: false},
  {value: '', label: 'Technology & Software', iconFA: 'fas fa-server', isTitle: true},
  {value: '51', label: 'Software Development: Mobile & Web', checkbox: true, isTitle: false},
  {value: '52', label: 'Hardware, Robotics & Electronics', checkbox: true, isTitle: false},
  {value: '53', label: 'Big Data & AI / Machine Learning', checkbox: true, isTitle: false},
  {value: '54', label: 'Cyber Security', checkbox: true, isTitle: false},
  {value: '55', label: 'Networking & Infrastructure', checkbox: true, isTitle: false},
  {value: '56', label: 'Telecommunications', checkbox: true, isTitle: false},
];

const workEnvOptions = [
  {value: '0', label: 'friendly'},
  {value: '1', label: 'laid-back'},
  {value: '2', label: 'nurturing'},
  {value: '3', label: 'always learning'},
  {value: '4', label: 'collaborative'},
  {value: '5', label: 'diverse'},
  {value: '6', label: 'forward-thinking'},
  {value: '7', label: 'modern'},
  {value: '8', label: 'flexible'},
  {value: '9', label: 'creative'},
  {value: '10', label: 'challenging'},
  {value: '11', label: 'competitive'},
  {value: '12', label: 'energizing'},
  {value: '13', label: 'thought-provoking'},
  {value: '14', label: 'inspiring'},
];

/*const roleOptions = [
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
];*/

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
      workEnv: [],
      isSubmitting: false,
    }
    this.handleIndChange = this.handleIndChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleWorkEnvChange = this.handleWorkEnvChange.bind(this);
    this.handleMultiOptions = this.handleMultiOptions.bind(this);
    this.handleDoneClickWorkEnv = this.handleDoneClickWorkEnv.bind(this);
    this.handleDoneClickRoles = this.handleDoneClickRoles.bind(this);
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

  handleDoneClickRoles() {
    const {rolesFromList, freeTextRoles} = this.state
    const {userRole} = this.props
    if ((rolesFromList.length != 0 || freeTextRoles.length != 0)) {
      if (userRole === 'mentor') {
        document.getElementById("selectBox-selectWorkEnv").focus()
      } else {
        document.getElementById("ratingsContainer").firstElementChild.focus()
      }
    } else {
      document.getElementById("autocompleteBox-selectRole").focus()
    }
  }

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

  handleWorkEnvChange(userInput) {
    let newArray

    newArray = workEnvOptions
      .filter(workEnvWord => userInput.includes(workEnvWord.label))
      .map(value => value.value)

    this.setState({
      workEnv: newArray,
    })
  }

  handleDoneClickWorkEnv() {
    if (this.state.workEnv.length > 0) {
      document.getElementById("Submit-btn-ind").focus()
    } else {
      document.getElementById("selectBox-selectWorkEnv").focus()
    }
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
    const {updateStep, userRole} = this.props;
    this.setState({ isSubmitting: true });
  //  const mentorEmailOK = true;
  //  const newStep = userRole === 'mentee' ? 'didIndRole' : (mentorEmailOK === true ? 'didIndRoleMentor' : 'updatingEmailError');
    const newStep = userRole === 'mentee' ? 'didIndRole' : 'didIndRoleMentor';
    updateStep(newStep)
  }

  canBeSubmitted() {
    const {industries, rolesFromList, freeTextRoles, knowNextSteps, workEnv} = this.state;
    const {userRole} = this.props;
    if (industries.length != 0 && (rolesFromList.length != 0 || freeTextRoles.length != 0) && (userRole === 'mentee' ? knowNextSteps != "" && knowNextSteps != 0 && !(knowNextSteps > 10) : workEnv.length != 0)) {
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
    const {errorLoadingRoles, rolesFromList, freeTextRoles, tabPressed, industries, editingInd, editingRole, editingWorkEnv, knowNextSteps, isSubmitting} = this.state;
    const {userRole} = this.props;
    const { step, currentStep, totalSteps, eetStatus } = this.props;

    const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div>
          <ProgressCircles
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            <form autoComplete="off" id="form-IndRoleShortSU">
              <div className="form-group">
                {userRole === 'mentee' && (
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectInd">Which <strong>industries</strong> are you interested in?</label>
                )}
                {userRole === 'mentor' && (
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectInd">Which <strong>industries</strong> do you have experience in / can talk about?</label>
                )}
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
                  iconToShow='iconFA'
                  showCheckbox
                  required
                />
              </div>
              {(industries.length > 0 || editingInd != '') && (
                <div className="form-group">
                  {userRole === 'mentee' && (
                    <label className="descriptor alignLeft reqAsterisk" htmlFor="selectRole">Which <strong>career or profession(s)</strong> do you want to work in?</label>
                  )}
                  {userRole === 'mentor' && (
                    <label className="descriptor alignLeft reqAsterisk" htmlFor="selectRole">Which <strong>roles(s)</strong> do you have experience in?</label>
                  )}
                  <div className="autocompleter">
                    <AutocompleteTagsMulti
                      multiple
                      openOnClick
                      showValues
                      showCheckbox
                //      finMultiOptions={userRole === 'mentor' ? this.handleMultiRoles : null}
                      handleDone={this.handleDoneClickRoles}
                      suggestions={roleOptions}
                      name='selectRole'
                      placeholder='Type Role(s)...'
                      placeholderOnClick="Type Role(s)..."
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
              {userRole === 'mentee' && ((rolesFromList.length != 0 || freeTextRoles.length != 0) || editingRole != '') && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="knowNextSteps">Out of 10, <strong>how confident</strong> are you in knowing what next steps to take to get there?</label>
                  <RatingItems
                    ratingOutOf={10}
                    handleRatingChange={this.handleRatingChange}
                    name='selectRating'
                    handleTabPress={this.handleTabPress}
                //    focusOnLoad={tabPressed ? false : true}
                    required
                  />
                </div>
              )}
              {userRole === 'mentor' && ((rolesFromList.length != 0 || freeTextRoles.length != 0) || editingRole != '') && (
                <div className="form-group">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="selectWorkEnv">To give students a sense of {eetStatus === 'uni' ? 'uni' : 'work'}-life reality, how would you describe <strong>your {eetStatus === 'uni' ? 'uni course & environment?' : 'work environment?'}</strong></label>
                  <SelectBox
                    multiple
                  //  finMultiOptions={this.handleMultiWorkEnv}
                    handleDone={this.handleDoneClickWorkEnv}
                    options={workEnvOptions}
                    name='selectWorkEnv'
                    placeholder='Select words:'
                    placeholderOnClick="Select as many as you like"
                    handleChange={this.handleWorkEnvChange}
                    handleTabPress={this.handleTabPress}
                  //  focusOnLoad
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  //  showIcon
                  //  iconToShow='iconFA'
                    showCheckbox
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
