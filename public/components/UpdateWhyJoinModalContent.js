// Dex last merged this code on 26th aug 2021

import React, { Component } from "react";
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class UpdateWhyJoinContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      whyJoinNew: this.props.whyJoin ? this.props.whyJoin : '',
    };
  }

  componentDidMount(){
    document.getElementById("whyJoinInput").focus()
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
    const {whyJoinNew} = this.state;
    const { whyJoin} = this.props;

    return (
      (whyJoin != '' ? (whyJoinNew != '') : true)
      && whyJoin != whyJoinNew // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess, whyJoinNew } = this.state;
    const { modalTitle, whyJoin } = this.props;
    const isEnabled = this.canBeSubmitted();

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          {modalTitle}
        </div>
        <form className="paddingR20 paddingL20">
          <div className="form-group">
            <label className="descriptor alignLeft reqAsterisk" htmlFor="expertise">I&#39;m interested in getting a mentor because</label>
            <textarea
              name="whyJoinNew"
              id="whyJoinInput"
              placeholder={(whyJoin != '' && whyJoinNew != '') ? null : 'Type your answer...'}
              className="form-control-std textInputBox"
              required
              defaultValue={whyJoin ? whyJoin : null}
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
            You&#39;ve updated your motivations for mentoring
          </div>
        </React.Fragment>
      )
    }
  }
}

export default UpdateWhyJoinContent;
