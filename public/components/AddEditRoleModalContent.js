// Dex last merged this code on 21st june 2021

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

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    this.setState({ updateSuccess: true })
  }

  canBeSubmitted() {
    const {roletitle, roleco, startdate, enddate, roledesc, iscurrent} = this.state;
    const { roleTitle, roleCo, startDate, endDate, roleDesc } = this.props;

    return (
      roletitle != '' && roleco != '' && startdate != '' && (enddate != '' || iscurrent == true)
      && (roletitle != roleTitle || roleco != roleCo || startdate != startDate || enddate != endDate || roledesc != roleDesc) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, roletitle, roleco, startdate, enddate, roledesc } = this.state;
    const { roleTitle, roleCo, startDate, endDate, roleDesc, modalTitle } = this.props;
    const isEnabled = this.canBeSubmitted();
    const startDateMonth = new Date(startdate).getMonth()
    const startDateYr = new Date(startdate).getFullYear()
    const currYr = new Date().getFullYear()
    let startYr = currYr - 80;
    const years = []
    while (startYr <= currYr) {
      let yearToAdd = startYr++
      years.push({value: yearToAdd, label: yearToAdd})
    }

    const months = [
      {value: '0', label: 'January'},
      {value: '1', label: 'February'},
      {value: '2', label: 'March'},
      {value: '3', label: 'April'},
      {value: '4', label: 'May'},
      {value: '5', label: 'June'},
      {value: '6', label: 'July'},
      {value: '7', label: 'August'},
      {value: '8', label: 'September'},
      {value: '9', label: 'October'},
      {value: '10', label: 'November'},
      {value: '11', label: 'December'},
    ];

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
        {/*  <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-startdate">Start Date</label>
            <div className="inlineForm">
              <div className="form-group inlineLeft">
                <SelectBox
                  options={months}
                  name='startdate'
                  placeholder={(startDate != null && startdate != '') ? null : 'Month:'}
                  defaultChecked={startDate != null ? months.filter((mth) => mth.value == startDateMonth) : null}
                  handleChange={this.handleChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  required
                />
              </div>
              <div className="form-group inlineRight">
                <SelectBox
                  options={years}
                  name='enddate'
                  placeholder={startDate != null ? startDateYr : null}
                  handleChange={this.handleChange}
                  required
                />
              </div>
            </div>
          </div>*/}
{/*          startdate: this.props.startDate,
          enddate: this.props.endDate,
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
