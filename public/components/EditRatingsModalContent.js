// Dex last merged this code on 18th aug 2021

import React, { Component } from "react";
import RatingItems from './RatingItems.js';
import {LoadingSpinner} from './GeneralFunctions.js';


// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class EditRatingsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      certaintyNew: this.props.certainty,
      knownextsteps: this.props.knowNextSteps,
    };
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount(){
    const {idToFocusOnOpen} = this.props
    if (idToFocusOnOpen) {
      document.getElementById(idToFocusOnOpen).firstElementChild.focus()
    } else {
      document.getElementById("ratingsContainer-certaintyRating").firstElementChild.focus()
    }
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  handleCertaintyChange = (value) => {
    this.setState({
      certaintyNew: value
    });
  }

  handleKnowNextStepsChange = (value) => {
    this.setState({
      knownextsteps: value
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
    const {certaintyNew, knownextsteps} = this.state;
    const { certainty, knowNextSteps } = this.props;

    return (
      (certaintyNew != '' || knownextsteps == true)
      && (certaintyNew != certainty || knowNextSteps != knownextsteps) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, certaintyNew, knownextsteps} = this.state;
    const { modalTitle, addOrEdit, certainty, knowNextSteps } = this.props;
    const isEnabled = this.canBeSubmitted();

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          {modalTitle}
        </div>
        <form className="paddingR20 paddingL20">
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="knowNextSteps">How sure are you of what you want to do for your career</label>
            <RatingItems
              ratingOutOf={10}
              handleRatingChange={this.handleCertaintyChange}
              name='certaintyRating'
              defaultValue={certainty}
              required
            />
          </div>
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="knowNextSteps">Out of 10, <strong>how confident</strong> are you in knowing what next steps to take to get there?</label>
            <RatingItems
              ratingOutOf={10}
              handleRatingChange={this.handleKnowNextStepsChange}
              name='knowNextStepsRating'
              defaultValue={knowNextSteps}
              required
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
            Self-ratings updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default EditRatingsContent;
