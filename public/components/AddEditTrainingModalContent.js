// Dex last merged this code on 18th aug 2021

import React, { Component } from "react";
import Autocomplete from './Autocomplete.js';
import Checkbox from './Checkbox.js';
import EditEduFreeText from './EditEduFreeText';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import {cdn} from './CDN.js';

const DeleteTrainModalProps = {
  ariaLabel: 'Delete training',
  triggerText: 'Delete Training',
  usedFor: 'deleteRole',
  changeInitFocus: true
}

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class AddEditTrainingContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isSubmittingDeleteTrain: false,
      updateSuccess: false,
      currtraining: this.props.currTraining,
      currtrainingprovider: this.props.currTrainingProvider,
      trainingdesc: this.props.trainingDesc,
      startDateMth: this.props.startDate == '' ? '' : new Date(this.props.startDate).getMonth(),
      startDateYr: this.props.startDate == '' ? '' : new Date(this.props.startDate).getFullYear(),
      endDateMth: this.props.endDate == '' ? '' : new Date(this.props.endDate).getMonth(),
      endDateYr: this.props.endDate == '' ? '' : new Date(this.props.endDate).getFullYear(),
      iscurrent: (this.props.endDate == '' || this.props.addOrEdit == 'add') ? true : false,
      invalidEndDate: false,
      triggerResetValues: false,
    };
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount(){
    const {idToFocusOnOpen, uniNameFreeText, uniName} = this.props
    if (idToFocusOnOpen) {
      document.getElementById(idToFocusOnOpen).focus()
    } else {
      document.getElementById("currTrainingProviderInput").focus()
    }
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
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

  handleSubmitDeleteTrain = (e) => {
    this.setState({ isSubmittingDeleteTrain: true });
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

  canBeSubmitted() {
    const {currtraining, currtrainingprovider, iscurrent, trainingdesc, startDateMth, startDateYr, endDateMth, endDateYr, invalidEndDate} = this.state;
    const { currTraining, currTrainingProvider, startDate, endDate, trainingDesc } = this.props;

    const _startDateFormatted = new Date(startDate)
    const _endDateFormatted = new Date(endDate)

    return (
      currtraining != '' && currtrainingprovider != '' && startDateMth !== '' && startDateYr != '' && ((endDateMth !== '' && endDateYr != '') || iscurrent == true) && invalidEndDate == false
      && (currtraining != currTraining || currtrainingprovider != currTrainingProvider || startDateMth != _startDateFormatted.getMonth() || startDateYr != _startDateFormatted.getFullYear()
      || (isNaN(_endDateFormatted.getMonth()) ? endDateMth !== '' : endDateMth != _endDateFormatted.getMonth()) || (isNaN(_endDateFormatted.getFullYear()) ? endDateYr != '' : endDateYr != _endDateFormatted.getFullYear())
      || trainingdesc != trainingDesc) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, isSubmittingDeleteTrain, updateSuccess, currtraining, currtrainingprovider, startdate, enddate, endDateMth, endDateYr, trainingdesc, iscurrent, triggerResetValues, invalidEndDate} = this.state;
    const { modalTitle, addOrEdit, currTraining, currTrainingProvider, startDate, endDate, trainingDesc } = this.props;
    const isEnabled = this.canBeSubmitted();

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

    if (startDate != '') {
      const startDateFormatted = new Date(startDate)
      const startDateMonth = startDateFormatted.getMonth()
      var startDateYr = startDateFormatted.getFullYear()
      var startMonthTxt = months[startDateMonth].label;
    }
    if (endDate != '') {
      const endDateFormatted = new Date(endDate)
      const endDateMonth = endDateFormatted.getMonth()
      var _endDateYr = endDateFormatted.getFullYear()
      var endMonthTxt = months[endDateMonth].label;
    }

    let currYr = new Date().getFullYear()
    let startYr = currYr - 60;
    let years = []
    while (startYr <= currYr) {
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
            <label className="descriptor alignLeft reqAsterisk" htmlFor="currtrainingprovider">Training provider:</label>
            <TextInput
              name="currtrainingprovider"
              id="currTrainingProviderInput"
              className="form-control-std"
              placeholder={(currtrainingprovider != null && currtrainingprovider != '') ? null : 'e.g. ICAS, BPP...'}
              required
              defaultValue={currTrainingProvider != null ? currTrainingProvider : null}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="50"
            />
          </div>
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="currtraining">Course name:</label>
            <TextInput
              name="currtraining"
              id="currTrainingInput"
              className="form-control-std"
              placeholder={(currtraining != null && currtraining != '') ? null : 'e.g. Chartered Accountant...'}
              required
              defaultValue={currTraining != null ? currTraining : null}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="50"
            />
          </div>
          <div className="form-group">
            <label className="descriptor alignLeft" htmlFor="trainingdesc">Description</label>
            <textarea
              name="trainingdesc"
              id="trainingDescInput"
              className="form-control-std textInputBox"
              placeholder={(trainingdesc != null && trainingdesc != '') ? null : 'Type a description of your training course...'}
              defaultValue={trainingDesc != null ? trainingDesc : null}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="1000"
              required={false}
            />
            <div className="descriptor-br form">
              {trainingdesc.length} / 1000
            </div>
          </div>
          <Checkbox
            labelId="isCurrentText"
            labelClassName="checkbox-container textLeft formatLeft"
            label="This is my current training"
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
                  placeholder={(startDate != null && startDate != '') ? startDateYr : 'Year:'}
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
          <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth">
            {isSubmitting == true && (
              <LoadingSpinner />
            )}
            {isSubmitting != true && (
              <span>Update</span>
            )}
          </button>
          {addOrEdit != 'add' && (
            <Modal {...DeleteTrainModalProps}>
              <div className="modal-preTitle">
                Are you sure?
              </div>
              <div className="modal-subtitle">
                You&#39;re about to permanently delete this Training
              </div>
              <div className="pass-btn-container">
                <button type="button" disabled={isSubmittingDeleteTrain == true ? true : false} onClick={this.handleSubmitDeleteTrain} className="Submit-btn">
                  {isSubmittingDeleteTrain === true && (
                    <LoadingSpinner />
                  )}
                  {isSubmittingDeleteTrain != true && (
                    <span>Yes, delete Degree</span>
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
            Training details updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default AddEditTrainingContent;
