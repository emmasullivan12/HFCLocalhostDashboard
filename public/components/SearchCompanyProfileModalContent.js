// Dex last merged this code on 25th may 2024

import React, { Component } from "react";
import Autocomplete from './Autocomplete.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import companyList from './Companies.js';

class SearchCompanyProfileModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
    };
  }

  handleUserSearch = (userInput, isValid) => {
    if (!isValid) {
      this.setState({
        company: '',
        companyIsValid: '',
      });
    }
    this.setState({
      company: userInput,
      companyIsValid: isValid
    })
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    } else {
      // Dex to redirect to company profile
    }
  }


  canBeSubmitted() {
    const { company, companyIsValid } = this.state;

    return (
      company != '' && company != null && companyIsValid == true
    )
  }

  render() {
    const { isSubmitting} = this.state;
    const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div className="modal-title">
          <span>Search for a Company</span>
        </div>
        <form className="paddingR20 paddingL20">
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk">
              <span>Search for a <strong>Company</strong></span>
            </label>

            <div className="autocompleter">
              <Autocomplete
                suggestions={companyList}
                name='company'
                placeholder='Search all Companies by name'
                handleChange={this.handleUserSearch}
                idValue='value'
                valueToShow='label'
                focusOnLoad
                required
              />
            </div>
          </div>
          <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-UpdateSkills">
            {isSubmitting == true && (
              <LoadingSpinner />
            )}
            {isSubmitting != true && (
              <span>Go to Company Profile</span>
            )}
          </button>
        </form>
      </React.Fragment>
    );
  }
}


export default SearchCompanyProfileModalContent;
