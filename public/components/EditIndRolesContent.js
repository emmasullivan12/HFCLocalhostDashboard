// Dex last merged this code on 22nd july 2021

import React, { Component } from "react";
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import Checkbox from './Checkbox.js';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import industryOptions from './Industries.js';
import roleOptions from './Roles.js';

const DeleteRoleModalProps = {
  ariaLabel: 'Delete role',
  triggerText: 'Delete Role',
  usedFor: 'deleteRole',
  changeInitFocus: true
}

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class AddEditRoleContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      industries: this.props.industriesexp != null ? this.props.industriesexp : [],
      rolesFromList: this.props.rolesexp != null ? this.props.rolesexp :  [],
      freeTextRoles: this.props.rolesexpfreetext != null ? this.props.rolesexpfreetext : [],
      errorLoadingRoles: '',
    };
    this.handleIndChange = this.handleIndChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleDoneClickRoles = this.handleDoneClickRoles.bind(this);
  }

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    this.setState({ updateSuccess: true })
  }

  handleIndChange(userInput) {
    let newArray

    newArray = industryOptions
      .filter(industry => userInput.includes(industry.label))
      .map(value => value.value)

    this.setState({
      industries: newArray,
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
      freeTextRoles: freeTextRoles
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
    const { industries, rolesFromList, freeTextRoles } = this.state;

    return (
      industries.length != 0 && (rolesFromList.length != 0 || freeTextRoles.length != 0)
      && (industries != this.props.industries || rolesFromList != this.props.rolesFromList) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, errorLoadingRoles } = this.state;
    const { modalTitle, } = this.props;

    const isEnabled = this.canBeSubmitted();

    if(updateSuccess == false) {
      return (
        <React.Fragment>
          <div className="showSmallModalSize">
            <div className="modal-title">
              {modalTitle}
            </div>
            <form className="paddingR20 paddingL20">
              <div className="form-group">
                <label className="descriptor alignLeft" htmlFor="roletitle">Which <strong>industries</strong> do you have experience in / can talk about?</label>
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
                />
              </div>
              <div className="form-group">
                <label className="descriptor alignLeft" htmlFor="roleco">Which <strong>roles(s)</strong> do you have experience in?</label>
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
          </div>
        </React.Fragment>
      )
    }
  }
}

export default AddEditRoleContent;
