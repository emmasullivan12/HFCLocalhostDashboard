// Dex last merged this code on 20th aug 2021

import React, { Component } from "react";
import Autocomplete from './Autocomplete.js';
import Checkbox from './Checkbox.js';
import EditEduFreeText from './EditEduFreeText';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import {cdn} from './CDN.js';

const DeleteSchModalProps = {
  ariaLabel: 'Delete school',
  triggerText: 'Delete School',
  usedFor: 'deleteRole',
  changeInitFocus: true
}

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class AddEditSchContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isSubmittingDeleteSch: false,
      updateSuccess: false,
      errorLoadingEdu: false,
      editingSch: (this.props.schNameFreeText == '' && this.props.schName == '') ? true : false,
      schname: this.props.schName,
      schnamefreetext: this.props.schNameFreeText,
      schNameIsValid: false,
      schstartyr: this.props.schStartYr,
      schgraduyr: this.props.schGraduYr,
      schdesc: this.props.schDesc,
      ukSchsList: [],
    };
  }

  componentDidMount(){
    const {idToFocusOnOpen, schNameFreeText, schName} = this.props
    if (idToFocusOnOpen) {
      document.getElementById(idToFocusOnOpen).focus()
    } else if (schName != '' || schNameFreeText != '') {
      document.getElementById("editSchName-btn").focus()
//    } else {
  //    document.getElementById("autocompleteBox-uniName").focus()
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUKSchChange = (userInput, isValid) => {
    this.setState({
      schname: userInput,
      schnamefreetext: '',
      schNameIsValid: isValid,
    })
  }

  handleSchNotOnListChange = (e) => {
    this.setState({
      schname: '',
      schnamefreetext: e.target.value
    });
  }

  handleStartYrChange = (userInput) => {
    this.setState({
      schstartyr: userInput,
    });
  }

  handleEndYrChange = (userInput) => {
    this.setState({
      schgraduyr: userInput,
    });
  }

  editSch = () => {
    this.setState({
      editingSch: true,
    })
  }

  saveSch = () => {
    this.setState({
      editingSch: false,
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

  handleSubmitDeleteSch = (e) => {
    this.setState({ isSubmittingDeleteSch: true });
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

  otherValidityChecks = () => {
    const { schstartyr, schgraduyr } = this.state;
    if (schgraduyr < schstartyr) {
      document.getElementById("selectBox-schgraduyr").classList.add('error');
    } else {
      document.getElementById("selectBox-schgraduyr").classList.remove('error');
    }
  }

  canBeSubmitted() {
    const {schname, schnamefreetext, schstartyr, schgraduyr, schNameIsValid, editingSch, schdesc} = this.state;
    const { schName, schNameFreeText, schGraduYr, schStartYr, schDesc} = this.props;

    return (
      ((schname != '' && schNameIsValid) || schnamefreetext != '') && schstartyr != '' && schgraduyr != '' && schstartyr <= schgraduyr && editingSch == false
      && (schname != schName || (schnamefreetext != schNameFreeText) || schstartyr != schStartYr || schgraduyr != schGraduYr || schDesc != schdesc) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, isSubmittingDeleteSch, updateSuccess, errorLoadingEdu, schstartyr, ukSchsList, schNameIsValid, schnamefreetext, schname, editingSch, schgraduyr, schdesc} = this.state;
    const { modalTitle, addOrEdit, schName, schNameFreeText, schGraduYr, schStartYr, schDesc} = this.props;
    const isEnabled = this.canBeSubmitted();

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
          {editingSch == false && (
            <div className="form-group eduName marginTop20">
              <div className="descriptor alignLeft">
                School name: <strong>{schnamefreetext != '' ? schnamefreetext : (schName != '' ? schname : 'Add School...')}</strong>
              </div>
              <button type="button" className="ModalOpenBtn ModalOpenBtn-eduFreeTextBtn" id="editSchName-btn" onClick={this.editSch}>{(schName != '' || schNameFreeText != '') ? 'Edit' : 'Add'}</button>
            </div>
          )}
          {(editingSch == true) && (
            <div className="form-group">
              <label className="descriptor alignLeft reqAsterisk" htmlFor="autocompleteBox-uniName">Search for your <strong>School:</strong></label>
              <div className="autocompleter">
                <Autocomplete
                  suggestions={ukSchsList ? ukSchsList : undefined}
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
                  <div className="form-group">
                    <label className="descriptor reqAsterisk dispBlock" htmlFor="schNameTextBox"><strong>School not on the list?</strong> Add it here:</label>
                    <div className="chatItemFlexContainer">
                      <TextInput
                        name="schnamefreetext"
                        id="schNameTextBox"
                        placeholder="Type School..."
                        className="form-control-std uniNotOnList"
                        required
                        maxLength="75"
                        handleChange={this.handleSchNotOnListChange}
                      />
                      <button type="button" className="Submit-btn backgroundCheck marginLeft" onClick={this.saveSch}>Add</button>
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
            <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-startdate">Start Date</label>
            <div className="inlineForm">
              <div className="form-group textLeft width50pc">
                <SelectBox
                  options={startYears}
                  name='schstartyr'
                  placeholder={(schstartyr != null && schstartyr != '') ? schstartyr : 'Year:'}
                  placeholderIsDefaultValueIfNot='Year:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleStartYrChange}
                  otherValidityChecks={this.otherValidityChecks}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                />
              </div>
            </div>
          </div>
          <div className="form-group marginBottom20">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-startdate">Final Year</label>
            <div className="inlineForm">
              <div className="form-group textLeft width50pc">
                <SelectBox
                  options={years}
                  name='schgraduyr'
                  placeholder={(schGraduYr != null && schGraduYr != '') ? schGraduYr : 'Year:'}
                  placeholderIsDefaultValueIfNot='Year:' // Changes font from grey to purple if is actually a default value
                  handleChange={this.handleEndYrChange}
                  otherValidityChecks={this.otherValidityChecks}
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  showAbove
                />
              </div>
            </div>
            {schgraduyr < schstartyr && schstartyr != '' && (
              <div className="descriptor prompt error eduForm alignLeft">Final year can&#39;t be before Start Date</div>
            )}
          </div>
          <div className="form-group">
            <label className="descriptor alignLeft" htmlFor="schdesc">Description</label>
            <textarea
              name="schdesc"
              id="schDescInput"
              className="form-control-std textInputBox"
              placeholder={(schDesc != null && schdesc != '') ? null : 'Type a description e.g. grades, projects, extra-curricular activities...'}
              defaultValue={schDesc != null ? schDesc : null}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="1000"
              required={false}
            />
            <div className="descriptor-br form">
              {schdesc.length} / 1000
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
            <Modal {...DeleteSchModalProps}>
              <div className="modal-preTitle">
                Are you sure?
              </div>
              <div className="modal-subtitle">
                You&#39;re about to permanently delete this School
              </div>
              <div className="pass-btn-container">
                <button type="button" disabled={isSubmittingDeleteSch == true ? true : false} onClick={this.handleSubmitDeleteSch} className="Submit-btn">
                  {isSubmittingDeleteSch === true && (
                    <LoadingSpinner />
                  )}
                  {isSubmittingDeleteSch != true && (
                    <span>Yes, delete School</span>
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
            School details updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default AddEditSchContent;
