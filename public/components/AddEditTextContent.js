// Dex last merged this code on 21st may 2024

import React, { Component } from "react";
import Checkbox from './Checkbox.js';
import Modal from './Modal.js';
import SelectBox from './Select.js';
import TextInput from './TextInput.js';
import {LoadingSpinner} from './GeneralFunctions.js';

const DeleteSectionModalProps = {
  ariaLabel: 'Delete section',
  triggerText: 'Delete section',
  usedFor: 'deleteRole',
  changeInitFocus: true
}

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class AddEditTextContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isSubmittingDeleteSection: false,
      updateSuccess: false,
      textLocal: this.props.text,
    };
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount(){
    const {idToFocusOnOpen, textInputId} = this.props
    if (idToFocusOnOpen) {
      document.getElementById(idToFocusOnOpen).focus()
    } else {
      document.getElementById(textInputId).focus()
    }
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
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
    const {textLocal} = this.state
    const textToSave = textLocal
    this.setState({ updateSuccess: true })
  }

  handleSubmitDeleteSection = (e) => {
    this.setState({ isSubmittingDeleteSection: true });
  }

  canBeSubmitted() {
    const {textLocal} = this.state;
    const { text } = this.props;

    return (
      textLocal != '' && text != textLocal
    );
  }

  render() {
    const { isSubmitting, isSubmittingDeleteSection, updateSuccess, textLocal } = this.state;
    const { required, text, textInputTitle, textInputId, textMaxCharacters, placeholderText, modalTitle, addOrEdit } = this.props;

    const isEnabled = this.canBeSubmitted();

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          {modalTitle}
        </div>
        <form className="paddingR20 paddingL20">
          <div className="form-group">
            <label className="descriptor alignLeft" htmlFor="roledesc">{textInputTitle}</label>
            <textarea
              name="textLocal"
              id={textInputId}
              className="form-control-std textInputBox"
              placeholder={(text != null && text != '') ? null : placeholderText}
              defaultValue={text != null ? text : null}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              maxLength="1000"
              required={required}
            />
            <div className="descriptor-br form">
              {text.length} / {textMaxCharacters}
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
            <Modal {...DeleteSectionModalProps}>
              <div className="modal-preTitle">
                Are you sure?
              </div>
              <div className="modal-subtitle">
                You&#39;re about to permanently delete this section
              </div>
              <div className="pass-btn-container">
                <button type="button" disabled={isSubmittingDeleteSection == true ? true : false} onClick={this.handleSubmitDeleteSection} className="Submit-btn">
                  {isSubmittingDeleteSection === true && (
                    <LoadingSpinner />
                  )}
                  {isSubmittingDeleteSection != true && (
                    <span>Yes, Delete Section</span>
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
            {textInputTitle} updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default AddEditTextContent;
