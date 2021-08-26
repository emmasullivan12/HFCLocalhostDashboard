// Dex last merged this code on 26th aug 2021

import React, { Component } from "react";
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class EditLifestyleContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      lifestyleNew: this.props.lifestyle ? this.props.lifestyle : '',
    };
  }

  componentDidMount(){
    document.getElementById("lifestyleInput").focus()
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
    const {lifestyleNew} = this.state;
    const { lifestyle } = this.props;

    return (
      (lifestyle != '' ? (lifestyleNew != '') : true)
      && lifestyle != lifestyleNew // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, lifestyleNew } = this.state;
    const { modalTitle, lifestyle } = this.props;
    const isEnabled = this.canBeSubmitted();

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          {modalTitle}
        </div>
        <form className="paddingR20 paddingL20">
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="expertise">When you think about work & careers, what kind of lifestyle do you want to have?</label>
            <textarea
              name="lifestyleNew"
              id="lifestyleInput"
              placeholder={(lifestyle != '' && lifestyleNew != '') ? null : 'e.g. think about working hours, social life, salary, being your own boss etc...'}
              className="form-control-std textInputBox"
              required
              defaultValue={lifestyle ? lifestyle : null}
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
            You&#39;ve updated your lifestyle ambitions!
          </div>
        </React.Fragment>
      )
    }
  }
}

export default EditLifestyleContent;
