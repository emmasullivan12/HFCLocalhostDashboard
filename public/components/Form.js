// Dex last merged this code on 26th April 2020
import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

import {ChevronDown, ChevronUp, LoadingSpinner} from './GeneralFunctions.js';
import TextInput from './TextInput.js';
import NumberInput from './NumberInput.js';
import RatingItems from './RatingItems.js';
//import Autocomplete from './Autocomplete.js';
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import SelectBox from './Select.js';
import {availabilityMsg, userFlagEmoji, eetStatus, eduName, eduSubjects, planningUni, timeSince, isNightDay, profileTimeZone, setSchGraduYr} from './UserDetail.js';

import "../css/General.css";
import "../css/Emoji.css";
import "../css/Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedQ: 0,
      isSubmitting: false,
      tabPressed: '',
    };
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleScrollUp = () => {
    const { focusedQ } = this.state;
    const { usedFor } = this.props;

    if (focusedQ === 0) {
      return
    } else {
      const parent = document.getElementById("fpModal-"+usedFor);
      const firstQ = document.getElementById("formQ-"+usedFor+"0");
      const qHeight = firstQ.scrollHeight * (focusedQ - 1)

      parent.scrollTop = qHeight

      this.setState(prevState => {
        let { focusedQ } = prevState

        focusedQ--

        return {
          focusedQ
        }

      }, () => {
        document.getElementById("formA-"+usedFor+this.state.focusedQ).focus();
      })
    }
  }

  handleScrollDown = () => {
    const { focusedQ } = this.state;
    const { questions, usedFor } = this.props;

    if (focusedQ === questions.length - 1) {
      return
    } else {

      const parent = document.getElementById("fpModal-"+usedFor);
      const firstQ = document.getElementById("formQ-"+usedFor+"0");
      const qHeight = firstQ.scrollHeight * (focusedQ + 1)

      parent.scrollTop = qHeight

      this.setState(prevState => {
        let { focusedQ } = prevState

        focusedQ++

        return {
          focusedQ
        }
      }, () => {
        document.getElementById("formA-"+usedFor+this.state.focusedQ).focus();
      })
    }
  }

  handleSubmit = () => {
    this.setState({
      isSubmitting: true
    })
  }

  renderAType(question, required, usedFor, i) {

    // i.e. input box, rating box, select box, etc.
    const aType = question['aType'];

    switch (aType) {
      case 'text':
        return (
          <TextInput
            name={question['name']}
            id={"formA-"+usedFor+i}
            placeholder={question['placeholder']}
            required={required}
            minLength={question['minLength']}
            maxLength={question['maxLength']}
            handleChange={this.handleChange}
            onBlur={this.onBlur}
            focusOnLoad={(i === 0) ? true : false}
          />
        );
      case 'textLong':
        return (
          <textarea
            name={question['name']}
            id={"formA-"+usedFor+i}
            className="form-control-std textInputBox"
        //    onChange={this.handleInput}
            onChange={this.handleChange}
            onBlur={this.onBlur}
            autoFocus={(i === 0) ? true : false}
            placeholder={question['placeholder']}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            minLength={question['minLength']}
            maxLength={question['maxLength']}
            required={required}
          />
        );
      case 'number':
        return (
          <NumberInput
            name={question['name']}
            id={"formA-"+usedFor+i}
            placeholder={question['placeholder']}
            required={required}
            min={question['min']}
            max={question['max']}
            handleChange={this.handleChange}
            onBlur={this.onBlur}
            focusOnLoad={(i === 0) ? true : false}
          />
        );
      case 'select':
        return (
          <SelectBox
            options={question['options']}
            placeholder={question['placeholder']}
            name={question['name']}
            id={"formA-"+usedFor+i}
        //    handleChange={this.handleSchYrChange}
            focusOnLoad={i === 0 ? true : false}
            valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
            required={required}
          />
        );
      case 'selectMulti':
        return (
          <SelectBox
            multiple
          //  finMultiOptions={this.handleMultiOptions}
            options={question['options']}
            name={question['name']}
            placeholder={question['placeholder']}
            placeholderOnClick={question['placeholderOnClick']}
        //    handleChange={this.handleIndChange}
            focusOnLoad={(i === 0) ? true : false}
            valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
            showCheckbox={question['showCheckbox']}
            required={required}
          />
        );
    //  case 'autocomplete':
    //    return (
    //      <div type="button" className="picContainer">
    //      </div>
    //    );
      case 'autocompleteMulti':
        return (
          <div className="autocompleter">
            <AutocompleteTagsMulti
              multiple
              openOnClick={question['openOnClick']}
              showValues={question['showValues']}
              showCheckbox={question['showCheckbox']}
        //      handleDone={this.handleDoneClickRoles}
              suggestions={question['options']}
              name={question['name']}
              placeholder={question['placeholder']}
              placeholderOnClick={question['placeholderOnClick']}
            //  handleChange={this.handleRoleChange}
              idValue={question['idValue']}
              focusOnLoad={(i === 0) ? true : false}
              valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
              required={required}
            />
          </div>
        );
      case 'rating':
        return (
          <RatingItems
            ratingOutOf={question['ratingOutOf']}
        //    handleRatingChange={this.handleRatingChange}
            name={question['name']}
            focusOnLoad={(i === 0) ? true : false}
            required={required}
          />
        );
    }
  }

  renderQuestions() {
    const {questions, usedFor} = this.props;

    return (
      <React.Fragment>
        <div className="col-6 col-s-12 formContainer">
          {questions.map((question, i) => {
            const q = question['q'];

            const required = question['req'] === 1;

            // i.e. any detail to support the understanding of the question
            const detail = question['detail'] == undefined ? '' :  question['detail'];

            return (
              <section className="form-QA" id={'formQ-'+usedFor+i} key={q}>
                <h2 className={"qTitle " + (required ? "reqAsterisk" : "")}>
                  <span className="qNum">{i + 1})</span>{q}
                </h2>
                <div className="qDetail">
                  {detail}
                </div>
                { this.renderAType(question, required, usedFor, i) }
              </section>
            )
          })}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const {focusedQ, isSubmitting, tabPressed} = this.state
    const {questions} = this.props

  //  const isEnabled = this.canBeSubmitted();
    const isEnabled = true

    return (
      <React.Fragment>
        <div className="prLogoContainer form">
          <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" />
        </div>
        <h1 className="form-header">
          <br/>
          <i className="emoji-icon typing-emoji"/> Complete your full sign up
        </h1>
        <div className="row">
          { this.renderQuestions() }
        </div>
        <div className="formCTAContainer submit">
          <button type="button" disabled={isSubmitting === true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-eth">
            {isSubmitting === true && (
              <LoadingSpinner />
            )}
            {isSubmitting != true && (
              <span>Next</span>
            )}
          </button>
        </div>
        <div className="formCTAContainer other">
          <button type="button" disabled={isSubmitting === true ? true : focusedQ === 0} className="qScrollBtn" onClick={this.handleScrollUp}>
            <ChevronUp />
          </button>
          <button type="button" disabled={isSubmitting === true ? true : focusedQ === (questions.length - 1)} className="qScrollBtn" onClick={this.handleScrollDown}>
            <ChevronDown />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Form;
