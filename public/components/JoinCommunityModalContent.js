// Dex last merged this code on 29th mar 2022

import React, { Component } from "react";
import Autocomplete from './Autocomplete.js';
import SelectBox from './Select.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import {getIndustryDeets} from './UserDetail.js';
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

  handleSkillChange = (userInput) => {
    const {startingArr} = this.props
    const {skillToJoin} = this.state

    this.setState({
      skill: userInput
    })
    const checkGroups = startingArr.find((skill) => skill == skillToJoin)
    const alreadyMember = startingArr.length == 0 ? false : (checkGroups != null)

    console.log(startingArr)
    console.log(userInput)

    if (alreadyMember) {
      this.setStatet({
        alreadyMember: true,
      })
    } else {
      this.setStatet({
        alreadyMember: false,
      })
    }
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
    const { indGroupArr, skill, alreadyMember } = this.state;
    const { type } = this.props

    if (type == 'industry') {
      return (
        indGroupArr && indGroupArr.length != 0 && !alreadyMember
      );
    } else {
      return (
        (skill != null || skill != '') && !alreadyMember
      )
    }
  }

  render() {
    const { indGroupArr, skill, messageFromServer, isSubmitting, startingArr, alreadyMember, defaultInds } = this.state;
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
            <span>Join an Industry huddle</span>
            <span className="emoji-icon sparkle-emoji titleRight" />
          </div>
          <form className="paddingR20 paddingL20">
            <div className="form-group">
              <label className="descriptor alignLeft reqAsterisk" htmlFor="roletitle">
                <span>Choose which <strong>{(type == 'industry') ? 'Industry' : 'Skills'} huddles</strong> you want to join</span>
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
              {type == 'skills' && (
                <div className="autocompleter">
                  <Autocomplete
                    suggestions={skillsOptions}
                    name='skillGroup'
                    placeholder='Search Skills huddles...'
                    handleChange={this.handleSkillChange}
                    idValue='value'
                    valueToShow='label'
                    focusOnLoad
                    required
                  />
                </div>
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
                <span>Update</span>
              )}
            </button>
          </form>
        </React.Fragment>
      );
    } else {
      const indGroupArrNoDuplicates = indGroupArr
        .filter(indID => !startingArr.includes(indID))

      const industryLabels = indGroupArrNoDuplicates.map((indID) => {
        let indName
        indName = getIndustryDeets(indID).label
        return indName
      })
      const industryText = industryLabels.slice(0, -1).join(', ') + ' and ' + industryLabels.slice(-1);
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon tada-emoji successBox" />
            It&#39;s official!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              You&#39;re now a new member of {type == 'industry' ? industryText : skill}.
            </div>
            <p className="landingCTADesc">
              You can access all of your communities / huddles from the main menu
            </p>
            <div className="showProgsPic"/>
          </div>
        </React.Fragment>
      )
    }
  }
}


export default JoinProgrammeModalContent;
