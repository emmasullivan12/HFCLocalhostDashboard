// Dex last merged this code on 18th aug 2021

import React, { Component } from "react";
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class UpdateHeadlineContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      headlineNew: this.props.headline ? this.props.headline : '',
    };
  }

  componentDidMount(){
    document.getElementById("headlineInput").focus()
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
    const {headlineNew} = this.state;
    const { headline } = this.props;

    return (
      headline != headlineNew // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, headlineNew } = this.state;
    const { modalTitle, headline } = this.props;
    const isEnabled = this.canBeSubmitted();

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          {modalTitle}
        </div>
        <form className="paddingR20 paddingL20">
          <div className="form-group">
            <label className="descriptor alignLeft" htmlFor="expertise">Headline:</label>
            <TextInput
              name="headlineNew"
              id="headlineInput"
              placeholder={(headline != '' && headlineNew != '') ? null : 'Type your headline...'}
              className="form-control-std"
              required
              defaultValue={headline ? headline : null}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="75"
            />
          </div>
          <div className="descriptor-br form">
            {headlineNew.length} / 75
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
            You&#39;ve updated your headline
          </div>
        </React.Fragment>
      )
    }
  }
}

export default UpdateHeadlineContent;
