// Dex last merged this code on 2nd aug 2021

import React, { Component } from "react";
import Autocomplete from './Autocomplete.js';
import Checkbox from './Checkbox.js';
import EditEduFreeText from './EditEduFreeText';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import {cdn} from './CDN.js';

const DeleteUniModalProps = {
  ariaLabel: 'Delete uni / degree',
  triggerText: 'Delete Uni / Degree',
  usedFor: 'deleteRole',
  changeInitFocus: true
}

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class AddEditUniContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isSubmittingDeleteUni: false,
      updateSuccess: false,
      errorLoadingEdu: false,
      editingUni: false,
      uniname: this.props.uniName,
      uninamefreetext: this.props.uniNameFreeText,
      uniNameIsValid: false,
      unistartyr: this.props.uniStartYr,
      unigraduyr: this.props.uniGraduYr,
      degreeNew: this.props.degree,
      ukUnisList: [],
    };
  }

  componentDidMount(){
    const {idToFocusOnOpen, uniNameFreeText} = this.props
    if (idToFocusOnOpen) {
      document.getElementById(idToFocusOnOpen).focus()
    } else {
      document.getElementById("editUniName-btn").focus()
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUKUniChange = (userInput, isValid) => {
    this.setState({
      uniname: userInput,
      uninamefreetext: '',
      uniNameIsValid: isValid,
    })
  }

  handleUniNotOnListChange = (e) => {
    this.setState({
      uniname: '',
      uninamefreetext: e.target.value
    });
  }

  handleStartYrChange = (userInput) => {
    this.setState({
      unistartyr: userInput,
    });
  }

  handleEndYrChange = (userInput) => {
    this.setState({
      unigraduyr: userInput,
    });
  }

  editUni = () => {
    this.setState({
      editingUni: true,
    })
  }

  saveUni = () => {
    this.setState({
      editingUni: false,
    })
  }

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    this.setState({ updateSuccess: true })
  }

  handleSubmitDeleteUni = (e) => {
    this.setState({ isSubmittingDeleteUni: true });
  }

  renderComponents = (fileToRender, componentUpdatesState, error) => {
    import(`./${fileToRender}.js`)
      .then(component => {
        if(this.mounted) {
          this.setState({
            [componentUpdatesState]: component.default,
            errorLoadingEdu: false
          })
        }
      })
      .catch(err => {
        if(this.mounted) {
          this.setState({
            errorLoadingEdu: true
          })
        }
      })
  }

  canBeSubmitted() {
    const {uniname, uninamefreetext, unistartyr, unigraduyr, degreeNew, uniNameIsValid} = this.state;
    const { uniName, uniNameFreeText, uniGraduYr, uniStartYr, degree } = this.props;

    return (
      ((uniname != '' && uniNameIsValid) || uninamefreetext != '') && unistartyr != '' && unigraduyr != '' && degreeNew != ''
      && (uniname != uniName || uninamefreetext != uniNameFreeText || unistartyr != uniStartYr || unigraduyr != uniGraduYr || degreeNew != degree) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, isSubmittingDeleteUni, updateSuccess, errorLoadingEdu, unistartyr, ukUnisList, uninamefreetext, uniname, editingUni} = this.state;
    const { modalTitle, addOrEdit, uniName, uniNameFreeText, uniGraduYr, uniStartYr, degree, country } = this.props;
    const isEnabled = this.canBeSubmitted();

  /*  const uniYrs = [
      {value: '1', label: 'Foundation Year / Diploma'},
      {value: '1', label: '1st Year'},
      {value: '2', label: '2nd Year'},
      {value: '3', label: '3rd Year'},
      {value: '4', label: '4th Year'},
      {value: '5', label: '5th Year'},
      {value: 'rcGrad', label: 'Recently Graduated'},
      {value: 'pg', label: 'Studying Post-grad'},
    ]*/

    let currYr = new Date().getFullYear()
    let startYr = currYr - 60;
    let endYr = currYr + 5
    let years = []
    let startYears = []
    while (startYr <= endYr) {
      let yearToAdd = endYr--
      years.push({value: yearToAdd, label: yearToAdd})
      if (yearToAdd <= currYr) {
        startYears.push({value: yearToAdd, label: yearToAdd})
      }
    }

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          {modalTitle}
        </div>
        <form className="paddingR20 paddingL20">
          {editingUni == false && (
            <div className="form-group eduName">
              <div className="descriptor alignLeft">
                University name: <strong>{uninamefreetext != '' ? uninamefreetext : uniname}</strong>
              </div>
              <button type="button" className="ModalOpenBtn ModalOpenBtn-eduFreeTextBtn" id="editUniName-btn" onClick={this.editUni}>Edit</button>
            </div>
          )}
          {editingUni == true && (
            <div className="form-group">
              <label className="descriptor alignLeft reqAsterisk" htmlFor="autocompleteBox-uniName">Search for your <strong>University:</strong></label>
              <div className="autocompleter">
                <Autocomplete
                  suggestions={ukUnisList ? ukUnisList : undefined}
                  name='uniName'
                  placeholder={(uniName != null && uniName != '') ? null : 'Type University...'}
                  handleChange={this.handleUKUniChange}
                  fileToRender={cdn+"/js/UKUnis"}
                  renderComponents={this.renderComponents}
                  componentUpdatesState="ukUnisList"
                  idValue='value'
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showDetail
                  detailToShow='location'
                  focusOnLoad
                  required
                  defaultValue={uniName != null ? uniName : null}
                  noSuggestionsCTAclass="form-control-std uniNotOnList"
                >
                  <div className="form-group">
                    <label className="descriptor alignLeft reqAsterisk" htmlFor="uniNameTextBox"><strong>University not on the list?</strong> Add it here:</label>
                    <div className="dispTable">
                      <TextInput
                        name="uninamefreetext"
                        id="uniNameTextBox"
                        placeholder="University"
                        className="form-control-std uniNotOnList"
                        required
                        maxLength="75"
                        handleChange={this.handleUniNotOnListChange}
                        defaultValue={uniNameFreeText}
                      />
                      <button type="button" className="Submit-btn backgroundCheck marginLeft" onClick={this.saveUni}>Add</button>
                    </div>
                  </div>
                </Autocomplete>
                {errorLoadingEdu == true && (
                  <div className="descriptor prompt error eduForm alignLeft">
                    Error loading education institutions. Try reloading the page.
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="currCo"><strong>Degree</strong> name:</label>
            <TextInput
              name="degreeNew"
              id="degreeInput"
              placeholder="Type Degree e.g. BSc (Hons) Business..."
              className="form-control-std"
              required
              defaultValue={degree}
              handleChange={this.handleChange}
              maxLength="50"
            />
          </div>
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-startdate">Start Date</label>
            <div className="inlineForm">
              <div className="form-group textLeft width50pc">
                <SelectBox
                  options={startYears}
                  name='unistartyr'
                  placeholder={(unistartyr != null && unistartyr != '') ? unistartyr : 'Year:'}
                  placeholderIsDefaultValueIfNot='Year:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleStartYrChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                />
              </div>
            </div>
          </div>
          <div className="form-group marginBottom20">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-startdate">Graduation Date</label>
            <div className="inlineForm">
              <div className="form-group textLeft width50pc">
                <SelectBox
                  options={years}
                  name='unigraduyr'
                  placeholder={(uniGraduYr != null && uniGraduYr != '') ? uniGraduYr : 'Year:'}
                  placeholderIsDefaultValueIfNot='Year:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleEndYrChange}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
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
          {addOrEdit != 'add' && (
            <Modal {...DeleteUniModalProps}>
              <div className="modal-preTitle">
                Are you sure?
              </div>
              <div className="modal-subtitle">
                You&#39;re about to permanently delete this Degree
              </div>
              <div className="pass-btn-container">
                <button type="button" disabled={isSubmittingDeleteUni == true ? true : false} onClick={this.handleSubmitDeleteUni} className="Submit-btn">
                  {isSubmittingDeleteUni === true && (
                    <LoadingSpinner />
                  )}
                  {isSubmittingDeleteUni != true && (
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
            University details updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default AddEditUniContent;
