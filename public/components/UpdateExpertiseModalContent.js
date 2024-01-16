// Dex last merged this code on 16th jan 2024

import React, { Component } from "react";
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import skillsOptions from './Skills.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class UpdateExpertiseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
    /*  startingExpertiseArr: this.props.expertiseArr ? this.props.expertiseArr : [],
      expertiseFromList: this.props.expertise != null ? this.props.expertise : [],
      freeTextExpertise: this.props.expertisefreetext != null ? this.props.expertisefreetext : [],
      endingExpertiseArr: this.props.expertiseArr ? this.props.expertiseArr : [], */
      errorLoadingSkills: '',
      expertiseNew: this.props.expertise ? this.props.expertise : '',
      learningNew: this.props.learning ? this.props.learning : ''
    };
  }

  componentDidMount(){
    const {expOrLearning} = this.props
    if (expOrLearning == 'learning') {
      document.getElementById("learningInput").focus()
    } else {
      document.getElementById("expertiseInput").focus()
    }
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
    const {expertiseNew, learningNew} = this.state;
    const { expertise, learning } = this.props;

    return (
      (expertise != '' ? (expertiseNew != '') : true)
      && (learning != '' ? (learningNew != '') : true)
      && (expertise != expertiseNew || learning != learningNew) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, expertiseNew, learningNew, errorLoadingSkills } = this.state;
    const { modalTitle, expertise, learning } = this.props;
    const isEnabled = this.canBeSubmitted();

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          {modalTitle}
        </div>
        <form className="paddingR20 paddingL20">
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="expertise">Your Key Skills</label>
            <div className="autocompleter">
              <AutocompleteTagsMulti
                multiple
                openOnClick
                showValues
                showCheckbox
                handleDone={this.handleDoneClick}
                suggestions={skillsOptions}
                name='expertiseNew'
                id="expertiseInput"
                placeholder={(expertise != '' && expertiseNew != '') ? null : 'Type skills e.g. C++/Python etc, 2D/3D Animation, etc'}
                placeholderOnClick="Type Skills..."
                handleChange={this.handleSkillsChange}
                idValue='value'
                valueToShow='label' // This is the attribute of the array/object to be displayed to user
                required
              />
              {errorLoadingSkills === true && (
                <div className="descriptor prompt error indRoleForm alignLeft">
                  Error loading Skills. Try reloading the page.
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="learning">Skills you&#39;re building</label>
            <textarea
              name="learningNew"
              id="learningInput"
              placeholder={(learning != '' && learningNew != '') ? null : 'Type skills you\'re learning / goals / projects here...'}
              className="form-control-std textInputBox"
              required
              defaultValue={learning ? learning : null}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="500"
            />
          </div>
          <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth">
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
            Expertise & Skills updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default UpdateExpertiseContent;
