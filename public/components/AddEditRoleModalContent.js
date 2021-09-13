// Dex last merged this code on 18th aug 2021

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
      isSubmittingDeleteRole: false,
      updateSuccess: false,
    /*  roletitle: this.props.roleTitle == '' ? null : this.props.roleTitle,
      roleco: this.props.roleCo == '' ? '' : this.props.roleCo,
      startdate: this.props.startDate == '' ? null : this.props.startDate,
      enddate: this.props.endDate == '' ? null : this.props.endDate,
      roledesc: this.props.roleDesc == '' ? '' : this.props.roleDesc,*/
      roletitle: this.props.roleTitle,
      roleco: this.props.roleCo,
      startdate: this.props.startDate,
  //    enddate: this.props.endDate,
      roledesc: this.props.roleDesc,
      startDateMth: this.props.startDate == '' ? '': new Date(this.props.startDate).getMonth(),
      startDateYr: this.props.startDate == '' ? '' : new Date(this.props.startDate).getFullYear(),
      endDateMth: this.props.endDate == '' ? '' : new Date(this.props.endDate).getMonth(),
      endDateYr: this.props.endDate == '' ? '' : new Date(this.props.endDate).getFullYear(),
      iscurrent: (this.props.endDate == '' || this.props.addOrEdit == 'add') ? true : false,
      ismain: this.props.isMain == true ? true : false,
      invalidEndDate: false,
      triggerResetValues: false,
    };
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount(){
    const {idToFocusOnOpen} = this.props
    if (idToFocusOnOpen) {
      document.getElementById(idToFocusOnOpen).focus()
    } else {
      document.getElementById("roleTitleInput").focus()
    }
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  otherValidityChecks = () => {
    const {startDateMth, startDateYr, endDateMth, endDateYr, iscurrent } = this.state;

    const _startDate = new Date(startDateYr, startDateMth, 1)
    const _endDate = new Date(endDateYr, endDateMth, 1)

    if (iscurrent == false && endDateMth !== '' && endDateYr != '') {
      if (_endDate < _startDate) {
        document.getElementById("selectBox-enddatemth").classList.add('error');
        document.getElementById("selectBox-enddateyr").classList.add('error');
        this.setState({
          invalidEndDate: true
        })
      } else {
        document.getElementById("selectBox-enddatemth").classList.remove('error');
        document.getElementById("selectBox-enddateyr").classList.remove('error');
        this.setState({
          invalidEndDate: false
        })
      }
    } else {
      document.getElementById("selectBox-enddatemth").classList.remove('error');
      document.getElementById("selectBox-enddateyr").classList.remove('error');
      this.setState({
        invalidEndDate: false
      })
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

    if (currentState == false || currentState == null) {
      this.setState({
        iscurrent: true,
        endDateMth: '',
        endDateYr: '',
        triggerResetValues: true,
        invalidEndDate: false,
      });

    } else {
      this.setState({
        iscurrent: false,
        endDateMth: '',
        endDateYr: '',
  //      triggerResetValues: true,
      });
    }
  }

  handleIsMainErrorMsg = (e) => {
    const {isMain} = this.props

    if (isMain == false || isMain == null) {
      document.getElementById('mainRoleError').style.visibility = 'hidden'
    } else {
      document.getElementById('mainRoleError').style.visibility = 'visible'
    }
  }

  toggleIsMainCheckbox = (userInput) => {
    const currentState = this.state.ismain;
    const {isMain} = this.props

    if (currentState == false || currentState == null) {
      this.setState({
        ismain: true,
      });

    } else if (isMain == false) {
      this.setState({
        ismain: false,
      });
    }
  }

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const {startDateYr, startDateMth, endDateYr, endDateMth} = this.state
    const startDateToSave = new Date(startDateYr, startDateMth, 1) // THIS FOR THE STARTDATE
    const endDateToSave = new Date(endDateYr, endDateMth, 1) // THIS FOR THE STARTDATE
    this.setState({ updateSuccess: true })
  }

  handleSubmitDeleteRole = (e) => {
    this.setState({ isSubmittingDeleteRole: true });
  }

  canBeSubmitted() {
    const {roletitle, roleco, startdate, enddate, roledesc, iscurrent, startDateMth, startDateYr, endDateMth, endDateYr, invalidEndDate, ismain} = this.state;
    const { roleTitle, roleCo, startDate, endDate, roleDesc, isMain } = this.props;

    const _startDateFormatted = new Date(startDate)
    const _endDateFormatted = new Date(endDate)

    return (
      roletitle != '' && roleco != '' && startDateMth !== '' && startDateYr != '' && ((endDateMth !== '' && endDateYr != '') || iscurrent == true) && invalidEndDate == false
      && (roletitle != roleTitle || roleco != roleCo || startDateMth != _startDateFormatted.getMonth() || startDateYr != _startDateFormatted.getFullYear()
      || (isNaN(_endDateFormatted.getMonth()) ? endDateMth !== '' : endDateMth != _endDateFormatted.getMonth()) || (isNaN(_endDateFormatted.getFullYear()) ? endDateYr != '' : endDateYr != _endDateFormatted.getFullYear())
      || roledesc != roleDesc || ismain != isMain) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, isSubmittingDeleteRole, updateSuccess, roletitle, roleco, startdate, enddate, endDateMth, endDateYr, roledesc, iscurrent, ismain, triggerResetValues, invalidEndDate } = this.state;
    const { roleTitle, roleCo, startDate, endDate, roleDesc, modalTitle, addOrEdit, isMain } = this.props;
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
    if (startDate != '') {
      const startDateFormatted = new Date(startDate)
      const startDateMonth = startDateFormatted.getMonth()
      var startDateYr = startDateFormatted.getFullYear()
      var startMonthTxt = months[startDateMonth].label;
    }
    if (endDate != '') {
      const endDateFormatted = new Date(endDate)
      const _endDateMonth = endDateFormatted.getMonth()
      var _endDateYr = endDateFormatted.getFullYear()
      var endMonthTxt = months[_endDateMonth].label;
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
            <label className="descriptor alignLeft reqAsterisk" htmlFor="roletitle">Role</label>
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
            <label className="descriptor alignLeft reqAsterisk" htmlFor="roleco">Employer</label>
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
          <div onClick={this.handleIsMainErrorMsg}>
            <Checkbox
              labelId="isMainText"
              labelClassName="checkbox-container textLeft formatLeft"
              label="Show this as my main role"
              id="isMainCheckbox"
              name="ismain"
              value="1"
              onChange={this.toggleIsMainCheckbox}
              defaultChecked={ismain == true}
              spanClassName="checkmark left"
              disabled={isMain == true}
            />
          </div>
          <div className="descriptor prompt error hidden" id="mainRoleError">
            At least one of your roles must be set as your main role
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
                  placeholder={startDate != '' ? startMonthTxt : 'Month:'}
                  placeholderIsDefaultValueIfNot='Month:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleStartDateMthChange}
                  otherValidityChecks={this.otherValidityChecks}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                />
              </div>
              <div className="form-group inlineRight textLeft width50pc">
                <SelectBox
                  //options={years && years.sort(function(a, b){return a - b})}
                  options={years}
                  name='startdateyr'
                  placeholder={startDate != '' ? startDateYr : 'Year:'}
                  placeholderIsDefaultValueIfNot='Year:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleStartDateYrChange}
                  otherValidityChecks={this.otherValidityChecks}
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
                  placeholder={(endDateMth !== '' && iscurrent != true) ? endMonthTxt : 'Month:'}
                  placeholderIsDefaultValueIfNot='Month:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleEndDateMthChange}
                  otherValidityChecks={this.otherValidityChecks}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                  disabled={iscurrent == true ? true : false}
                  resetValues={triggerResetValues == true}
                />
              </div>
              <div className="form-group inlineRight textLeft width50pc">
                <SelectBox
                  //options={years && years.sort(function(a, b){return a - b})}
                  options={years}
                  name='enddateyr'
                  placeholder={(endDateYr != '' && iscurrent != true) ? _endDateYr : 'Year:'}
                  placeholderIsDefaultValueIfNot='Year:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleEndDateYrChange}
                  otherValidityChecks={this.otherValidityChecks}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                  disabled={iscurrent == true ? true : false}
                  resetValues={triggerResetValues == true}
                />
              </div>
            </div>
            {invalidEndDate && iscurrent != true && (
              <div className="descriptor prompt error eduForm alignLeft">End Date can&#39;t be before Start Date</div>
            )}
          </div>
          <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-Edu">
            {isSubmitting == true && (
              <LoadingSpinner />
            )}
            {isSubmitting != true && (
              <span>Update</span>
            )}
          </button>
          {addOrEdit != 'add' && (
            <Modal {...DeleteRoleModalProps}>
              <div className="modal-preTitle">
                Are you sure?
              </div>
              <div className="modal-subtitle">
                You&#39;re about to permanently delete this role
              </div>
              <div className="pass-btn-container">
                <button type="button" disabled={isSubmittingDeleteRole == true ? true : false} onClick={this.handleSubmitDeleteRole} className="Submit-btn">
                  {isSubmittingDeleteRole === true && (
                    <LoadingSpinner />
                  )}
                  {isSubmittingDeleteRole != true && (
                    <span>Yes, Delete Role</span>
                  )}
                </button>
              </div>
            </Modal>
          )}
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
