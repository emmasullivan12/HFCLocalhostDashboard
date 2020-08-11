// Dex last merged this code on 26th April 2020
import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

import {ChevronDown, ChevronUp, LoadingSpinner} from './GeneralFunctions.js';
import Checkbox from './Checkbox.js';
import TextInput from './TextInput.js';
import NumberInput from './NumberInput.js';
import PhoneInput from './PhoneInput.js';
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
    this.setState({
      [e.target.id]: e.target.value,
    })
    if (e.target.checkValidity()) {
      this.setState({
        [e.target.id+"isValid"]: true
      })
    } else {
      this.setState({
        [e.target.id+"isValid"]: false
      })
    }
  }

  handleNonTextChange = (values, formId, isValid, callback) => {
    this.setState({
      [formId]: values,
      [formId+"isValid"]: isValid
    }, () => {
      if (callback) {
        callback()
      }
    })
  }

//'selectMulti'
//'autocompleteMulti'

  handleNonTextMultiChange = (values, formId, isValid, callback) => {
    const {questions, usedFor} = this.props;
    const formIdSplit = formId.split(usedFor)
    var getIndex = formIdSplit[1];
    const getOptions = questions[getIndex]['options'];

    let newArray

    newArray = getOptions
      .filter(option => values.includes(option.label))
      .map(value => value.value)

    this.setState({
      [formId]: newArray,
      [formId+"isValid"]: isValid
    }, () => {
      if (callback) {
        callback()
      }
    })

  }

  toggleCheckbox = (e)  => {
    const stateToChange = e.target.id;
    this.setState({
      [stateToChange]: e.target.checked
    });
    if (e.target.checkValidity()) {
      this.setState({
        [stateToChange+"isValid"]: true
      })
    } else {
      this.setState({
        [stateToChange+"isValid"]: false
      })
    }
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
        const answers = document.getElementsByClassName("formA-"+usedFor)
        const idToFocusOn = answers[this.state.focusedQ].dataset.idforfocus
        const elToFocusOn = answers[this.state.focusedQ].dataset.elementforfocus;

        if (elToFocusOn != null) {
          if (elToFocusOn === 'firstElementChild') {
           document.getElementById(idToFocusOn).firstElementChild.focus();
          }
        } else {
          document.getElementById(idToFocusOn).focus()
        }
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
        const answers = document.getElementsByClassName("formA-"+usedFor)
        const idToFocusOn = answers[this.state.focusedQ].dataset.idforfocus
        const elToFocusOn = answers[this.state.focusedQ].dataset.elementforfocus;

        if (elToFocusOn != null) {
          if (elToFocusOn === 'firstElementChild') {
           document.getElementById(idToFocusOn).firstElementChild.focus();
          }
        } else {
          document.getElementById(idToFocusOn).focus()
        }

      })
    }
  }

  handleSubmit = () => {
    this.toggleScrollLock();
    this.setState({
      isSubmitting: true
    }, () => {

      // Once submitted or if error that user needs addressing
      if (this.state.isSubmitting === false) {
        this.toggleScrollLock();
      }
    })
  }

  toggleScrollLock = () => {
    const {usedFor} = this.props
    document.getElementById('fpModal-'+usedFor).classList.toggle('u-lock-scroll');
  }

  canBeSubmitted() {
    const {questions, usedFor} = this.props;

    const statesToCheck = [];

    questions.forEach((question, i) => {
      const required = question['req'] === 1;

      if (!required) {
        return
      } else {
        const aType = question['aType'];
        if (aType === 'checkbox') {

          // NEED TO CHECK LENGTH OF OPTIONS WITHIN CHECKBOX QUESTSIONS AND ITERATE HERE
    /*      statesToCheck.push(
            "formA-"+usedFor+i+"-"+index
          );*/
          return

        } else {

          statesToCheck.push(
            this.state["formA-"+usedFor+i+"isValid"]
          );
        }
      }

    });
    if (statesToCheck.includes(false) || statesToCheck.includes(undefined)){
      return false
    } else {
      return true
    }

  }

  renderAType(question, required, usedFor, i) {

    // i.e. input box, rating box, select box, etc.
    const aType = question['aType'];

    switch (aType) {
      case 'text':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"formA-"+usedFor+i}
          >
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
          </div>
        );
      case 'textLong':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"formA-"+usedFor+i}
          >
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
          </div>
        );
      case 'number':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"formA-"+usedFor+i}
          >
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
          </div>
        );
      case 'tel':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"formA-"+usedFor+i}
          >
            <PhoneInput
              name={question['name']}
              id={"formA-"+usedFor+i}
              placeholder={question['placeholder']}
              pattern={question['pattern']}
              required={required}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              focusOnLoad={(i === 0) ? true : false}
            />
          </div>
        );
      case 'checkbox':
        var options = question['options'];

        return (
          <React.Fragment>
            <div
              className={"formA-"+usedFor}
              data-idforfocus={options[0]['id']}
            >
              {options.map((option, index) => {

                return (
                //  <React.Fragment key={option['id']}>
                  <div className="notifToggleContainer" key={option['id']}>
                    <span className="notifToggleTxt">{option['label']}</span>
                    <Checkbox
                      labelClassName="switch"
                  //    label={option['label']}
                      name={option['name']}
                      id={"formA-"+usedFor+i+"-"+index}
                    //  key={option['id']}
                    //  value={option['value']}
                      required={required}
                      defaultChecked={option['defaultChecked']}
                      disabled={option['disabled']}
                      spanClassName="slider round"
                      onChange={this.toggleCheckbox}
                    />
                  </div>
                //  </React.Fragment>
                )

              })}
            </div>
          </React.Fragment>
        );
      case 'select':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"selectBox-"+question['name']}
            data-idforstate={"formA-"+usedFor+i}
          >
            <SelectBox
              options={question['options']}
              placeholder={question['placeholder']}
              name={question['name']}
              handleChange={this.handleNonTextChange}
              focusOnLoad={i === 0 ? true : false}
              valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
              isForForm
              required={required}
            />
          </div>
        );
      case 'selectMulti':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"selectBox-"+question['name']}
            data-idforstate={"formA-"+usedFor+i}
          >
            <SelectBox
              multiple
            //  finMultiOptions={this.handleMultiOptions}
              options={question['options']}
              name={question['name']}
              placeholder={question['placeholder']}
              placeholderOnClick={question['placeholderOnClick']}
              handleChange={this.handleNonTextMultiChange}
              focusOnLoad={(i === 0) ? true : false}
              valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
              showCheckbox={question['showCheckbox']}
              isForForm
              required={required}
            />
          </div>
        );
    //  case 'autocomplete': Not done yet as not needed so far
    //    return (
    //      <div type="button" className="picContainer">
    //      </div>
    //    );
      case 'autocompleteMulti':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"autocompleterTags-"+question['name']}
            data-idforstate={"formA-"+usedFor+i}
          >
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
                handleChange={this.handleNonTextMultiChange}
                idValue={question['idValue']}
                focusOnLoad={(i === 0) ? true : false}
                valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
                isForForm
                required={required}
              />
            </div>
          </div>
        );
      case 'rating':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus="ratingsContainer"
            data-elementforfocus="firstElementChild"
            data-idforstate={"formA-"+usedFor+i}
          >
            <RatingItems
              ratingOutOf={question['ratingOutOf']}
              handleRatingChange={this.handleNonTextChange}
              name={question['name']}
              usedFor={usedFor}
              focusOnLoad={(i === 0) ? true : false}
              isForForm
              required={required}
            />
          </div>
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

    const isEnabled = this.canBeSubmitted();

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
              <span>Submit</span>
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
