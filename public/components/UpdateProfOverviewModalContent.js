// Dex last merged this code on 22nd july 2021

import React, { Component } from "react";
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class UpdateProfileOverviewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      currrole: this.props.currRole,
      currco: this.props.currCo
    };
  }

  componentDidMount(){
    {this.props.currRole != null && (
      document.getElementById("currRoleInput").focus()
    )}
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
    const {currrole, currco} = this.state;
    const { currCo, currRole } = this.props;
    return (
      (currCo != null ? (currco != '') : true)
      && (currRole != null ? (currrole != '') : true)
      && (currco != currCo || currrole != currRole) // Checks user has actually changed something
    );
  }

  render() {
    const { isSubmitting, updateSuccess } = this.state;
    const { currCo, currRole } = this.props;
    const isEnabled = this.canBeSubmitted();

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          Edit Profile Overview
        </div>
        <form className="paddingR20 paddingL20">
          {currRole != null && (
            <div className="form-group">
              <label className="descriptor alignLeft reqAsterisk" htmlFor="currCo">Current Role</label>
              <TextInput
                name="currrole"
                id="currRoleInput"
              //  placeholder={currRole}
                className="form-control-std"
                required
                defaultValue={currRole}
                handleChange={this.handleChange}
                onBlur={this.onBlur}
                maxLength="50"
              />
            </div>
          )}
          {currCo != null && (
            <div className="form-group">
              <label className="descriptor alignLeft reqAsterisk" htmlFor="currCo">Current Employer</label>
              <TextInput
                name="currco"
                id="currCoInput"
              //  placeholder={currCo}
                className="form-control-std"
                required
                defaultValue={currCo}
                handleChange={this.handleChange}
                onBlur={this.onBlur}
                maxLength="50"
              />
            </div>
          )}
          <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-Edu">
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
            Profile Overview updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default UpdateProfileOverviewContent;
