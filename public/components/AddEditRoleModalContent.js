// Dex last merged this code on 22nd july 2021

import React, { Component } from "react";
import Checkbox from './Checkbox.js';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';

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
    /*  roletitle: this.props.roleTitle == '' ? null : this.props.roleTitle,
      roleco: this.props.roleCo == '' ? '' : this.props.roleCo,
      startdate: this.props.startDate == '' ? null : this.props.startDate,
      enddate: this.props.endDate == '' ? null : this.props.endDate,
      roledesc: this.props.roleDesc == '' ? '' : this.props.roleDesc,*/
      roletitle: this.props.roleTitle,
      roleco: this.props.roleCo,
      startdate: this.props.startDate,
      enddate: this.props.endDate,
      roledesc: this.props.roleDesc,
      startDateMth: this.props.startDate == '' ? null : new Date(this.props.startDate).getMonth(),
      startDateYr: this.props.startDate == '' ? null : new Date(this.props.startDate).getFullYear(),
      endDateMth: this.props.endDate == '' ? null : new Date(this.props.endDate).getMonth(),
      endDateYr: this.props.endDate == '' ? null : new Date(this.props.endDate).getFullYear(),
      iscurrent: (this.props.endDate == '' || this.props.addOrEdit == 'add') ? true : false,
      triggerResetValues: false,
    };
  }

  componentDidMount(){
    const {idToFocusOnOpen} = this.props
    if (idToFocusOnOpen) {
      document.getElementById(idToFocusOnOpen).focus()
    } else {
      document.getElementById("roleTitleInput").focus()
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleStartDateYrChange = (userInput) => {
    this.setState({
      startDateYr: userInput,
      triggerResetValues: false,
    });
  }

  handleStartDateMthChange = (userInput) => {
    this.setState({
      startDateMth: userInput,
      triggerResetValues: false,
    });
  }

  handleEndDateYrChange = (userInput) => {
    this.setState({
      endDateYr: userInput,
      triggerResetValues: false,
    });
  }

  handleEndDateMthChange = (userInput) => {
    this.setState({
      endDateMth: userInput,
      triggerResetValues: false,
    });
  }

  toggleIsCurrentCheckbox = (userInput) => {
    const currentState = this.state.iscurrent;

    if (currentState === false || currentState == null) {
      this.setState({
        iscurrent: true,
        endDateMth: null,
        endDateYr: null,
        triggerResetValues: true,
      });

    } else {
      this.setState({
        iscurrent: false
      });
    }
  }

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const {startDateYr, startDateMth} = this.state
    const startDateToSave = new Date(startDateYr, startDateMth, 1) // THIS FOR THE STARTDATE
    this.setState({ updateSuccess: true })
  }

  canBeSubmitted() {
    const {roletitle, roleco, startdate, enddate, roledesc, iscurrent, startDateMth, startDateYr, endDateMth, endDateYr} = this.state;
    const { roleTitle, roleCo, startDate, endDate, roleDesc } = this.props;

    const _startDateFormatted = new Date(startDate)
    const _endDateFormatted = new Date(endDate)

    return (
      roletitle != '' && roleco != '' && startDateMth != null && startDateYr != null && ((endDateMth != null && endDateYr != null) || iscurrent == true)
      && (roletitle != roleTitle || roleco != roleCo || startDateMth != _startDateFormatted.getMonth() || startDateYr != _startDateFormatted.getFullYear() || endDateMth != (iscurrent == true ? null : _endDateFormatted.getMonth()) || endDateYr != (iscurrent == true ? null : _endDateFormatted.getFullYear()) || roledesc != roleDesc) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, roletitle, roleco, startdate, enddate, roledesc, iscurrent, triggerResetValues } = this.state;
    const { roleTitle, roleCo, startDate, endDate, roleDesc, modalTitle, addOrEdit } = this.props;
    const months = [
      {value: '0', label: 'Jan'},
      {value: '1', label: 'Feb'},
      {value: '2', label: 'Mar'},
      {value: '3', label: 'Apr'},
      {value: '4', label: 'May'},
      {value: '5', label: 'Jun'},
      {value: '6', label: 'Jul'},
      {value: '7', label: 'Aug'},
      {value: '8', label: 'Sep'},
      {value: '9', label: 'Oct'},
      {value: '10', label: 'Nov'},
      {value: '11', label: 'Dec'},
    ];
    const isEnabled = this.canBeSubmitted();
    if (startDate != '' && startDate != null) {
      const startDateFormatted = new Date(startDate)
      const startDateMonth = startDateFormatted.getMonth()
      var startDateYr = startDateFormatted.getFullYear()
      var startMonthTxt = months[startDateMonth].label;
    }
    if (endDate != '' && endDate != null) {
      const endDateFormatted = new Date(endDate)
      const endDateMonth = endDateFormatted.getMonth()
      var endDateYr = endDateFormatted.getFullYear()
      var endMonthTxt = months[endDateMonth].label;
    }
    let currYr = new Date().getFullYear()
    let startYr = currYr - 60;
    let years = []
    while (startYr <= currYr) {
    //  let yearToAdd = startYr++
      let yearToAdd = currYr--
      years.push({value: yearToAdd, label: yearToAdd})
    }

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          {modalTitle}
        </div>
        <form className="paddingR20 paddingL20">
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="roletitle">Current Role</label>
            <TextInput
              name="roletitle"
              id="roleTitleInput"
              className="form-control-std"
              placeholder={(roleTitle != null && roletitle != '') ? null : 'e.g. 3D Animator, Head of Finance...'}
              required
              defaultValue={roleTitle != null ? roleTitle : null}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="50"
            />
          </div>
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="roleco">Current Employer</label>
            <TextInput
              name="roleco"
              id="roleCoInput"
              className="form-control-std"
              placeholder={(roleCo != null && roleco != '') ? null : 'e.g. Framestore, EY...'}
              required
              defaultValue={roleCo != null ? roleCo : null}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="50"
            />
          </div>
          <div className="form-group">
            <label className="descriptor alignLeft" htmlFor="roledesc">Description</label>
            <textarea
              name="roledesc"
              id="roleDescInput"
              className="form-control-std textInputBox"
              placeholder={(roleDesc != null && roledesc != '') ? null : 'Type a description of your role...'}
              defaultValue={roleDesc != null ? roleDesc : null}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="1000"
              required={false}
            />
            <div className="descriptor-br form">
              {roledesc.length} / 1000
            </div>
          </div>
          <Checkbox
            labelId="isCurrentText"
            labelClassName="checkbox-container textLeft formatLeft"
            label="This is my current role"
            id="isCurrentCheckbox"
            name="iscurrent"
            value="1"
            onChange={this.toggleIsCurrentCheckbox}
            defaultChecked={addOrEdit == 'add' ? true : iscurrent == true}
            spanClassName="checkmark left"
          />
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-startdate">Start Date</label>
            <div className="inlineForm">
              <div className="form-group inlineLeft textLeft width50pc">
                <SelectBox
                  options={months}
                  name='startdatemth'
                  placeholder={(startDate != null && startDate != '') ? startMonthTxt : 'Month:'}
                  placeholderIsDefaultValueIfNot='Month:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleStartDateMthChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                />
              </div>
              <div className="form-group inlineRight textLeft width50pc">
                <SelectBox
                  //options={years && years.sort(function(a, b){return a - b})}
                  options={years}
                  name='startdateyr'
                  placeholder={(startDate != null && startDate != '') ? startDateYr : 'Year:'}
                  placeholderIsDefaultValueIfNot='Year:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleStartDateYrChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                />
              </div>
            </div>
          </div>
          <div className="form-group marginBottom20">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-startdate">End Date</label>
            <div className="inlineForm">
              <div className="form-group inlineLeft textLeft width50pc">
                <SelectBox
                  options={months}
                  name='enddatemth'
                  placeholder={(endDate != null && endDate != '' && iscurrent != true) ? endMonthTxt : 'Month:'}
                  placeholderIsDefaultValueIfNot='Month:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleEndDateMthChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                  disabled={addOrEdit == 'add' ? true : iscurrent == true}
                  resetValues={triggerResetValues == true}
                />
              </div>
              <div className="form-group inlineRight textLeft width50pc">
                <SelectBox
                  //options={years && years.sort(function(a, b){return a - b})}
                  options={years}
                  name='enddateyr'
                  placeholder={(endDate != null && endDate != '' && iscurrent != true) ? endDateYr : 'Year:'}
                  placeholderIsDefaultValueIfNot='Year:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleEndDateYrChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                  disabled={addOrEdit == 'add' ? true : iscurrent == true}
                  resetValues={triggerResetValues == true}
                />
              </div>
            </div>
          </div>
          <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-Edu">
            {isSubmitting == true && (
              <LoadingSpinner />
            )}
            {isSubmitting != true && (
              <span>Update</span>
            )}
          </button>
          <Modal {...DeleteRoleModalProps}>
            Are you sure?
          </Modal>
        </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="ideas-icon-container">
              <span role="img" aria-label="ok emoji">👌</span>
            </div>
            Role details updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default AddEditRoleContent;
