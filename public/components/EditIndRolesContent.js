// Dex last merged this code on 25th jan 2024

import React, { Component } from "react";
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import Checkbox from './Checkbox.js';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import {getIndustryDeets} from './UserDetail.js';
import industryOptions from './Industries.js';
import roleOptions from './Roles.js';

const DeleteRoleModalProps = {
  ariaLabel: 'Delete role',
  triggerText: 'Delete Role',
  usedFor: 'deleteRole',
  changeInitFocus: true
}

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class EditIndRolesContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      //startingIndArr: this.props.industriesexp ? this.props.industriesexp : [],
      defaultInds: (this.props.industriesexp && this.props.industriesexp.length > 0) ? this.props.industriesexp.map(ind => getIndustryDeets(ind).label) : null,
      startingIndsArr: (this.props.industriesexp && this.props.industriesexp.length > 0) ? this.props.industriesexp : null,
      endingIndustriesArr: (this.props.industriesexp && this.props.industriesexp.length > 0) ? this.props.industriesexp : null,
      startingRolesArr: this.props.rolesArray ? this.props.rolesArray : [],
      rolesFromList: this.props.rolesexp != null ? this.props.rolesexp : [],
      freeTextRoles: this.props.rolesexpfreetext != null ? this.props.rolesexpfreetext : [],
      endingRolesArr: this.props.rolesArray ? this.props.rolesArray : [],
      errorLoadingRoles: '',
    };
    this.handleIndChange = this.handleIndChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleDoneClickRoles = this.handleDoneClickRoles.bind(this);
  }

/*  componentDidMount() {
    if (this.props.industriesexp != null) {
      this.convertStartingInd(this.props.industriesexp)
    }
  }*/

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    this.setState({ updateSuccess: true })
  }

/*  convertStartingInd = (startingInds) => {
    let indArr

    indArr = industryOptions
      .filter(industry => startingInds.includes(parseInt(industry.value)))
      .map(value => value.label)

    this.setState({
      startingIndArr: indArr,
    })
  }*/

  handleIndChange(userInput) {
    let newArray

    newArray = industryOptions
      .filter(industry => userInput.includes(industry.label))
      .map(value => value.value)

    this.setState({
      endingIndustriesArr: newArray,
    }, () => {
      // NEED TO WORK WITH DEX TO UPDATE STARTINGINDARR TOO IN CASE OPEN AGAIN
    })
  }

  handleRoleChange(userInput, callback) {
    const rolesFromList = roleOptions
      .filter(role => userInput.includes(role.label))

    const labels = rolesFromList.map(value => value.label)

    const freeTextRoles = userInput
      .filter(role => labels.indexOf(role) === -1)

    const values = rolesFromList.map(value => value.value)

    this.setState({
      rolesFromList: values,
      freeTextRoles: freeTextRoles,
      endingRolesArr: userInput
    }, () => {
      if(callback) {
        callback()
      }
    })
  }

  handleDoneClickRoles() {
    const {rolesFromList, freeTextRoles} = this.state
    if ((rolesFromList.length != 0 || freeTextRoles.length != 0)) {
      document.getElementById("Submit-btn-UpdateIndRoles").focus()
    } else {
      document.getElementById("autocompleteBox-selectRole").focus()
    }
  }

  canBeSubmitted() {
    const { startingIndsArr, endingIndustriesArr, rolesFromList, freeTextRoles, startingRolesArr, endingRolesArr } = this.state;
    return (
      (endingIndustriesArr.length != 0 || (startingIndsArr.length > 0 && (parseInt(startingIndsArr) == parseInt(endingIndustriesArr))))
      && (rolesFromList.length != 0 || freeTextRoles.length != 0 || (startingRolesArr.length > 0 && (JSON.stringify(startingRolesArr) == JSON.stringify(endingRolesArr))))
      && ((parseInt(startingIndsArr) != parseInt(endingIndustriesArr)) || (JSON.stringify(startingRolesArr) != JSON.stringify(endingRolesArr)))


    );
  }

  render() {
    const { isSubmitting, updateSuccess, errorLoadingRoles, rolesexp, rolesexpfreetext, startingRolesArr, startingIndsArr, endingIndustriesArr, defaultInds } = this.state;
    const { modalTitle, industriesexp, userRole } = this.props;
    const isEnabled = this.canBeSubmitted();
    const indWasAdded = parseInt(startingIndsArr) != parseInt(endingIndustriesArr)
    if(updateSuccess == false) {
      return (
        <React.Fragment>
          <div className="showSmallModalSize">
            <div className="modal-title">
              {modalTitle}
            </div>
            <form className="paddingR20 paddingL20">
              <div className="form-group">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="roletitle">
                  {userRole == 'mentee' ? (
                    <span>Choose which <strong>industries</strong> you are interested in?</span>
                  ) : (
                    <span>Which <strong>industries</strong> do you have experience in / can talk about?</span>
                  )}
                </label>
                <SelectBox
                  multiple
                  options={industryOptions}
                  name='selectInd'
                  placeholder='Select Industry(s):'
                  placeholderOnClick='You can edit these later'
                  handleChange={this.handleIndChange}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showIcon
                  iconToShow='iconFA'
                  showCheckbox
                  defaultChecked={defaultInds}
                />
              </div>
              <div className="form-group">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="roleco">
                {userRole == 'mentee' ? (
                  <span>Which <strong>career or profession(s)</strong> do you want to work in?</span>
                ) : (
                  <span>Which <strong>roles(s)</strong> do you have experience in?</span>
                )}
                </label>
                <div className="autocompleter">
                  <AutocompleteTagsMulti
                    multiple
                    openOnClick
                    showValues
                    showCheckbox
                    handleDone={this.handleDoneClickRoles}
                    suggestions={roleOptions}
                    name='selectRole'
                    placeholder='Type Role(s)...'
                    placeholderOnClick="Type Role(s)..."
                    handleChange={this.handleRoleChange}
                    idValue='value'
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                    defaultChecked={startingRolesArr}
                  />
                  {errorLoadingRoles === true && (
                    <div className="descriptor prompt error indRoleForm alignLeft">
                      Error loading Roles. Try reloading the page.
                    </div>
                  )}
                </div>
              </div>
              <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-UpdateIndRoles">
                {isSubmitting == true && (
                  <LoadingSpinner />
                )}
                {isSubmitting != true && (
                  <span>Update</span>
                )}
              </button>
            </form>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="showSmallModalSize">
            <div className="modal-title">
              <div className="ideas-icon-container">
                <span role="img" aria-label="ok emoji">👌</span>
              </div>
              Industry & Role details updated
            </div>
            {indWasAdded == true && (
              <div className="success-container">
                <div className="ideas-Title">
                  We&#39;ve auto-joined you to your new industry communities.
                </div>
                <p className="landingCTADesc">
                  You can access all of your communities / huddles from the main menu
                </p>
                <div className="showCommunitiesPic"/>
              </div>
            )}
          </div>
        </React.Fragment>
      )
    }
  }
}

export default EditIndRolesContent;
