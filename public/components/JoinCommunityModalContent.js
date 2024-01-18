// Dex last merged this code on 29th mar 2022

import React, { Component } from "react";
import Checkbox from './Checkbox.js';
import industryOptions from './Industries.js';
import skillsOptions from './Skills.js';
import "../css/Modal.css";
import "../css/Emoji.css";
import "../css/General.css";
import "../css/HomepageCTAContainer.css";

class JoinProgrammeModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFromServer: '',
      alreadyMemberSkills: false,
    };
  }

  handleIndChange = (userInput) => {
    let newArray

    newArray = industryOptions
      .filter(industry => userInput.includes(industry.label))
      .map(value => value.value)

    this.setState({
      industryGroups: newArray,
    }, () => {
      // NEED TO WORK WITH DEX TO UPDATE STARTINGINDARR TOO IN CASE OPEN AGAIN
    })
  }

  handleSkill = (userInput) => {
    const {startingArr} = this.props
    const {skillToJoin} = this.state
  /*  skillsGroups: [
      {skillid: '339', expert: 0, learning: 1},
      {skillid: '349', expert: 0, learning: 1},
      {skillid: '609', expert: 1, learning: 0},
      {skillid: '143', expert: 1, learning: 0},
    ]*/
    this.setState({
      skill: userInput
    })
    const checkGroups = startingArr.find((skill) => skill.skillid == skillToJoin)
    const alreadyMember = startingArr.length == 0 ? false : (checkGroups != null)

    if (alreadyMember) {
      this.setStatet({
        alreadyMemberSkills: true,
      })
    } else {
      this.setStatet({
        alreadyMemberSkills: false,
      })
    }
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    this.setState({ messageFromServer: 'Huddle joined' });
  }


  canBeSubmitted() {
    const { industries, skill } = this.state;
    const { type } = this.props

    if (type == 'industry') {
      return (
        industries.length != 0
        && (industries != this.props.startingArr) // Checks user has actually changed something
      );
    } else {
      return (
        (skill != null || skill != '') && alreadyMemberSkills != true
      )
    }
  }

  render() {
    const { progName, messageFromServer } = this.state;
    const isEnabled = this.canBeSubmitted();
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
                <span>Choose which <strong>{{type == 'industry' ? 'Industry' : 'Skills'} huddles</strong> you want to join</span>
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
                  defaultChecked={startingArr}
                />
              )}
              {type == 'skills' && (
                <div className="autocompleter">
                  <Autocomplete
                    suggestions={skillsOptions}
                    name='schName'
                    placeholder={(schName != null && schName != '') ? null : 'Type School...'}
                    handleChange={this.handleUKSchChange}
                    fileToRender={cdn+"/js/UKSchs"}
                    renderComponents={this.renderComponents}
                    componentUpdatesState="ukSchsList"
                    idValue='value'
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    showDetail
                    detailToShow='location'
                    focusOnLoad
                    required
                    noSuggestionsCTAclass="form-control-std uniNotOnList"
                  >
                </div>
              )}
            </div>
            {alreadyMemberSkills === true && (
              <div className="descriptor prompt error indRoleForm alignLeft">
                You're already a member of that skills huddle.
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
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon tada-emoji successBox" />
            It&#39;s official!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              You&#39;re now a member of {progName}.
            </div>
            {isClass != true && (
              <React.Fragment>
                <p className="landingCTADesc">
                  You can access all of your communities from the main menu;
                </p>
                <div className="showProgsPic"/>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )
    }
  }
}


export default JoinProgrammeModalContent;
