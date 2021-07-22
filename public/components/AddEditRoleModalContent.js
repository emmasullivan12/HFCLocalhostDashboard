// Dex last merged this code on 22nd july 2021

import React, { Component } from "react";
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class AddEditRoleContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      roletitle: this.props.roleTitle,
      roleco: this.props.roleCo,
      startdate: this.props.startDate,
      enddate: this.props.endDate,
      roledesc: this.props.roleDesc,
      startDateMth: this.props.startDate == '' ? null : new Date(this.props.startDate).getMonth(),
      startDateYr: this.props.startDate == '' ? null : new Date(this.props.startDate).getFullYear(),
      endDateMth: this.props.endDate == '' ? null : new Date(this.props.endDate).getMonth(),
      endDateYr: this.props.endDate == '' ? null : new Date(this.props.endDate).getFullYear(),
      iscurrent: false,
    };
  }

  componentDidMount(){
    document.getElementById("roleTitleInput").focus()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleStartDateChange = (userInput, e) => {
    const stateToSave = e.currentTarget.parentNode.id == 'options-startdateyr' ? 'startDateYr' : (e.currentTarget.parentNode.id == 'options-startdatemth' ? 'startDateMth' : null)

    this.setState({
      [stateToSave]: userInput
    });
  }

  handleEndDateChange = (userInput, e) => {
    const stateToSave = e.currentTarget.parentNode.id == 'options-enddateyr' ? 'endDateYr' : (e.currentTarget.parentNode.id == 'options-enddatemth' ? 'endDateMth' : null)

    this.setState({
      [stateToSave]: userInput
    });
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
      && (roletitle != roleTitle || roleco != roleCo || startDateMth != _startDateFormatted.getMonth() || startDateYr != _startDateFormatted.getFullYear() || endDateMth != _endDateFormatted.getMonth() || endDateYr != _endDateFormatted.getFullYear() || roledesc != roleDesc) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, roletitle, roleco, startdate, enddate, roledesc } = this.state;
    const { roleTitle, roleCo, startDate, endDate, roleDesc, modalTitle } = this.props;
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
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-startdate">Start Date</label>
            <div className="inlineForm">
              <div className="form-group inlineLeft width50pc">
                <SelectBox
                  options={months}
                  name='startdatemth'
                  placeholder={(startDate != null && startDate != '') ? startMonthTxt : 'Month:'}
                  handleChange={this.handleStartDateChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                  bringBackE
                />
              </div>
              <div className="form-group inlineRight width50pc">
                <SelectBox
                  options={years && years.sort(function(a, b){return a - b})}
                  name='startdateyr'
                  placeholder={(startDate != null && startDate != '') ? startDateYr : 'Year:'}
                  handleChange={this.handleStartDateChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                  bringBackE
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-startdate">End Date</label>
            <div className="inlineForm">
              <div className="form-group inlineLeft width50pc">
                <SelectBox
                  options={months}
                  name='enddatemth'
                  placeholder={(endDate != null && endDate != '') ? endMonthTxt : 'Month:'}
                  handleChange={this.handleEndDateChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                  bringBackE
                />
              </div>
              <div className="form-group inlineRight width50pc">
                <SelectBox
                  options={years && years.sort(function(a, b){return a - b})}
                  name='enddateyr'
                  placeholder={(endDate != null && endDate != '') ? endDateYr : 'Year:'}
                  handleChange={this.handleEndDateChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                  bringBackE
                />
              </div>
            </div>
          </div>
{/*       enddate: this.props.endDate,
          iscurrent: false,*/}
          <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-Edu">
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
