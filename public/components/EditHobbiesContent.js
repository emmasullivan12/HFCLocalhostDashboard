// Dex last merged this code on 8th aug 2021

import React, { Component } from "react";
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import Checkbox from './Checkbox.js';
import Modal from './Modal.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import hobbiesOptions from './Hobbies.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class EditHobbiesContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      startingHobbiesArr: this.props.hobbiesArr ? this.props.hobbiesArr : [],
      hobbiesFromList: this.props.hobbies != null ? this.props.hobbies : [],
      freeTextHobbies: this.props.hobbiesfreetext != null ? this.props.hobbiesfreetext : [],
      endingHobbiesArr: this.props.hobbiesArr ? this.props.hobbiesArr : [],
      errorLoadingHobbies: '',
    };
    this.handleHobbiesChange = this.handleHobbiesChange.bind(this);
    this.handleDoneClickHobbies = this.handleDoneClickHobbies.bind(this);
  }

  componentDidMount() {
    document.getElementById("autocompleteBox-selectHobby").focus()
  }

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    this.setState({ updateSuccess: true })
  }

  handleHobbiesChange(userInput, callback) {
    const hobbiesFromList = hobbiesOptions
      .filter(hobby => userInput.includes(hobby.label))

    const labels = hobbiesFromList.map(value => value.label)

    const freeTextHobbies = userInput
      .filter(hobby => labels.indexOf(hobby) === -1)

    const values = hobbiesFromList.map(value => value.value)

    this.setState({
      hobbiesFromList: values,
      freeTextHobbies: freeTextHobbies,
      endingHobbiesArr: userInput
    }, () => {
      if(callback) {
        callback()
      }
    })
  }

  handleDoneClickHobbies() {
    const {hobbiesFromList, freeTextHobbies} = this.state
    if ((hobbiesFromList.length != 0 || freeTextHobbies.length != 0)) {
      document.getElementById("Submit-btn-UpdateHobbies").focus()
    } else {
      document.getElementById("autocompleteBox-selectHobby").focus()
    }
  }

  canBeSubmitted() {
    const { hobbiesFromList, freeTextHobbies, startingHobbiesArr, endingHobbiesArr } = this.state;

    return (
      (hobbiesFromList.length != 0 || freeTextHobbies.length != 0)
      && (JSON.stringify(startingHobbiesArr) != JSON.stringify(endingHobbiesArr)) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, errorLoadingHobbies, hobbies, hobbiesfreetext, startingHobbiesArr } = this.state;
    const { modalTitle, hobbiesArr } = this.props;
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
                <label className="descriptor alignLeft reqAsterisk" htmlFor="roleco">What are some of your <strong>interests and hobbies</strong>?</label>
                <div className="autocompleter">
                  <AutocompleteTagsMulti
                    multiple
                    openOnClick
                    showValues
                    showCheckbox
                    handleDone={this.handleDoneClickHobbies}
                    suggestions={hobbiesOptions}
                    name='selectHobby'
                    placeholder='Type Hobbies...'
                    placeholderOnClick="Type Hobbies..."
                    handleChange={this.handleHobbiesChange}
                    idValue='value'
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                    defaultChecked={startingHobbiesArr}
                  />
                  {errorLoadingHobbies === true && (
                    <div className="descriptor prompt error indRoleForm alignLeft">
                      Error loading Hobbies. Try reloading the page.
                    </div>
                  )}
                </div>
              </div>
              <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-UpdateHobbies">
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
              Hobbies updated
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default EditHobbiesContent;
