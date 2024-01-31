// Dex last merged this code on 31st jan 2024

import React, { Component } from "react";
import Autocomplete from './Autocomplete.js';
import SelectBox from './Select.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import {getIndustryDeets, getSkillDeets} from './UserDetail.js';
import industryOptions from './Industries.js';
import skillsOptions from './Skills.js';

class JoinProgrammeModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingArr: this.props.startingArr ? this.props.startingArr : [],
      defaultInds: (this.props.startingArr && this.props.startingArr.length > 0 && this.props.type == 'industry') ? this.props.startingArr.map(ind => getIndustryDeets(ind).label) : null,
      messageFromServer: '',
      alreadyMember: false,
      isSubmitting: false,
      indGroupArr: [],
      skill: null,
      skillIsValid: false,
      expOrLearn: null
    };
  }

  handleIndChange = (userInput) => {
    const {startingArr} = this.state
    let newArray

    newArray = industryOptions
      .filter(industry => userInput.includes(industry.label))
      .map(value => value.value)

    this.setState({
      indGroupArr: newArray,
      alreadyMember: startingArr.length == 0 ? false : JSON.stringify(startingArr) == JSON.stringify(newArray)
    })
  }

  handleSkillChange = (userInput, isValid) => {
    const {startingArr} = this.props
    const {skillToJoin} = this.state

    this.setState({
      skill: userInput,
      skillIsValid: isValid,
    })
    const checkGroups = startingArr.find((skill) => skill == skillToJoin)
    const alreadyMember = startingArr.length == 0 ? false : (checkGroups != null)

    if (isValid) {
      if (alreadyMember) {
        this.setState({
          alreadyMember: true,
        })
      } else {
        this.setState({
          alreadyMember: false,
        })
      }
    }
  }

  handleStatusChange = (userInput) => {
    this.setState({
      expOrLearn: userInput,
    })
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    this.setState({ messageFromServer: 'Huddle joined' });
  }


  canBeSubmitted() {
    const { indGroupArr, skill, alreadyMember, expOrLearn, skillIsValid } = this.state;
    const { type } = this.props

    if (type == 'industry') {
      return (
        indGroupArr && indGroupArr.length != 0 && !alreadyMember
      );
    } else {
      return (
        (skill != null && skill != '' && skillIsValid == true) && !alreadyMember && expOrLearn != null && expOrLearn != ''
      )
    }
  }

  render() {
    const { indGroupArr, skill, messageFromServer, isSubmitting, startingArr, alreadyMember, defaultInds, skillIsValid } = this.state;
    const {type} = this.props
    const isEnabled = this.canBeSubmitted();
    /*if (type == 'industry' && startingArr && startingArr.length > 0) {
      defaultInds = startingArr.map(ind => getIndustryDeets(ind))
    }*/

    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            <span className="emoji-icon sparkle-emoji titleLeft" />
            <span>Join {(type == 'industry') ? 'an Industry' : 'a Skills'} huddle</span>
            <span className="emoji-icon sparkle-emoji titleRight" />
          </div>
          <form className="paddingR20 paddingL20">
            <div className="form-group">
              <label className="descriptor alignLeft reqAsterisk" htmlFor={type == 'industry' ? 'selectInd' : 'skillGroup'}>
                <span>{(type == 'industry') ? 'Choose which ' : 'Search for '}<strong>{(type == 'industry') ? 'Industry' : 'Skills'} huddles</strong> you want to join</span>
              </label>
              {type == 'industry' && (
                <SelectBox
                  multiple
                  options={industryOptions}
                  name='selectInd'
                  placeholder='Select Industry(s):'
                  placeholderOnClick='Select Industry(s):'
                  handleChange={this.handleIndChange}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showIcon
                  iconToShow='iconFA'
                  showCheckbox
                  defaultChecked={defaultInds}
                />
              )}
                {/*  {indGroupArr.length != 0 && !alreadyMember && (
                    <React.Fragment>
                      <label className="descriptor alignLeft reqAsterisk" htmlFor="selectExpOrLearn">
                        <span>Are you an <strong>expert or learner</strong> of this industry?</span>
                      </label>
                      <div className="autocompleter">
                        <SelectBox
                          options={[
                            {value: '1', label: 'Expert', detail: 'You currently work or have +2yrs experience in this industry', checkbox: true, isTitle: false, iconFA: 'fas fa-hashtag'},
                            {value: '2', label: 'Learner', detail: 'You\'re just starting out in this industry', checkbox: true, isTitle: false, iconFA: 'fas fa-hashtag'},
                          ]}
                          name='selectExpOrLearn'
                          placeholder='Select expert or learner:'
                          placeholderOnClick='Select Industry(s):'
                          handleChange={this.handleIndChange}
                          focusOnLoad
                          valueToShow='label' // This is the attribute of the array/object to be displayed to user
                          showDetail
                          detailToShow='detail'
                        />
                      </div>
                    </React.Fragment>
                  )} */}
              {type == 'skills' && (
                <React.Fragment>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={skillsOptions}
                      name='skillGroup'
                      placeholder='Search Skills huddles...'
                      handleChange={this.handleSkillChange}
                      idValue='value'
                      valueToShow='label'
                      showDetail
                      //detailToShow='289 users'
                      focusOnLoad
                      required
                    />
                  </div>
                  {(skill != null && skill != '') && skillIsValid == true && !alreadyMember && (
                    <React.Fragment>
                      <label className="descriptor alignLeft reqAsterisk" htmlFor="selectExpOrLearn">
                        <span>Are you an <strong>expert or learner</strong> of this skill?</span>
                      </label>
                      <div className="autocompleter">
                        <SelectBox
                          options={[
                            {value: '1', label: 'Expert', detail: 'You use this skill at work or have ~2yrs+ experience', checkbox: true, isTitle: false, iconFA: 'fas fa-hashtag'},
                            {value: '2', label: 'Learner', detail: 'You\'re just starting out with this skill', checkbox: true, isTitle: false, iconFA: 'fas fa-hashtag'},
                          ]}
                          name='selectExpOrLearn'
                          placeholder='Select your learning status:'
                          placeholderOnClick='Select your learning status:'
                          handleChange={this.handleStatusChange}
                          focusOnLoad
                          valueToShow='label' // This is the attribute of the array/object to be displayed to user
                          //showIcon
                          //iconToShow='iconFA'
                          showDetail
                          detailToShow='detail'
                        //  showCheckbox
                        //  defaultChecked={defaultInds}
                        />
                      </div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
            {alreadyMember === true && type == 'skills' && (
              <div className="descriptor prompt error indRoleForm alignLeft">
                You&#39;re already a member of that skills huddle.
              </div>
            )}
            <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-UpdateSkills">
              {isSubmitting == true && (
                <LoadingSpinner />
              )}
              {isSubmitting != true && (
                <span>Join community</span>
              )}
            </button>
          </form>
        </React.Fragment>
      );
    } else {
      let skillName, indName, industryText
      if (type == 'industry') {
        const indGroupArrNoDuplicates = indGroupArr
          .filter(indID => !startingArr.includes(indID))

        const industryLabels = indGroupArrNoDuplicates.map((indID) => {
          indName = getIndustryDeets(indID).label
          return indName
        })
        industryText = industryLabels.length < 2 ? industryLabels : (industryLabels.slice(0, -1).join(', ') + ' and ' + industryLabels.slice(-1))
      } else {
        skillName = getSkillDeets(skill).label
      }

      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon tada-emoji successBox" />
            It&#39;s official!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              You&#39;re now a new member of {type == 'industry' ? industryText : skillName}.
            </div>
            <p className="landingCTADesc">
              You can access all of your communities / huddles from the main menu
            </p>
            {type == 'industry' && (
              <div className="showCommunitiesPic"/>
            )}
            {type == 'skills' && (
              <div className="showSkillsCommunitiesPic"/>
            )}
          </div>
        </React.Fragment>
      )
    }
  }
}


export default JoinProgrammeModalContent;
