// Dex last merged this code on 13th sept 2021

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
class AddEditTextContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isSubmittingDeleteSection: false,
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
    this.setState({ isSubmittingDeleteSection: true });
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
    const { isSubmitting, isSubmittingDeleteSection, updateSuccess, roletitle, roleco, startdate, enddate, endDateMth, endDateYr, roledesc, iscurrent, ismain, triggerResetValues, invalidEndDate } = this.state;
    const { text, placeholderText, modalTitle, addOrEdit } = this.props;

    const isEnabled = this.canBeSubmitted();

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          {modalTitle}
        </div>
        <form className="paddingR20 paddingL20">
          <div className="form-group">
            <label className="descriptor alignLeft" htmlFor="roledesc">Description</label>
            <textarea
              name="roledesc"
              id="roleDescInput"
              className="form-control-std textInputBox"
              placeholder={(text != null && text != '') ? null : placeholderText}
              defaultValue={text != null ? text : null}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="1000"
              required={false}
            />
            <div className="descriptor-br form">
              {text.length} / 1000
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
          {addOrEdit != 'add' && (
            <Modal {...DeleteRoleModalProps}>
              <div className="modal-preTitle">
                Are you sure?
              </div>
              <div className="modal-subtitle">
                You&#39;re about to permanently delete this section
              </div>
              <div className="pass-btn-container">
                <button type="button" disabled={isSubmittingDeleteSection == true ? true : false} onClick={this.handleSubmitDeleteSection} className="Submit-btn">
                  {isSubmittingDeleteSection === true && (
                    <LoadingSpinner />
                  )}
                  {isSubmittingDeleteSection != true && (
                    <span>Yes, Delete Section</span>
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
            Details updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default AddEditTextContent;
