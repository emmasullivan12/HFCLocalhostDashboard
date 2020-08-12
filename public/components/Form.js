// Dex last merged this code on 12th Aug 2020

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

  handleNonTextMultiChange = (values, formId, isValid, callback) => {
    const {questions, usedFor} = this.props;

    const formIdSplit = formId.split("-")
    var getIndex = formIdSplit[0];
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
    const {usedFor, questions} = this.props;
    const stateToChange = e.target.id;

    this.setState({
      [stateToChange]: e.target.checked
    });

    const stateToChangeSplit = stateToChange.split("-")
    var i = stateToChangeSplit[0];
    let checkboxesToCheck = [];

    if (e.target.checkValidity()) {
      this.setState({
        [stateToChange+"isValid"]: true
      }, () => {

        // Check that at least 1 of the checkbox options is checked (if this question was required)
        var options = questions[i]['options'];

        options.forEach((option, index) => {
          checkboxesToCheck.push(
            this.state[i+"-"+option['name']+"isValid"]
          );
        })

        if (checkboxesToCheck.includes(true)) {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: true
          })
        } else {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: false
          })
        }
      })
    } else {
      this.setState({
        [stateToChange+"isValid"]: false
      }, () => {
        var options = questions[i]['options'];

        options.forEach((option, index) => {
          checkboxesToCheck.push(
            this.state[i+"-"+option['name']+"isValid"]
          );
        })

        if (checkboxesToCheck.includes(true)) {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: true
          })
        } else {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: false
          })
        }
      })
    }
  }

  handleScrollUp = () => {
    const { focusedQ } = this.state;
    const { questions, usedFor } = this.props;

    if (focusedQ === 0) {
      return
    } else {
    /*  const parent = document.getElementById("fpModal-"+usedFor);
      const firstQ = document.getElementById("0-"+questions[0].name);
      const qHeight = firstQ.scrollHeight * (focusedQ - 1)
      parent.scrollTop = qHeight*/


  /*    if (focusedQ === 1) {
        parent.scrollTop = 0
      } else {
        const firstQ = document.getElementById("0-"+questions[0].name);
        const qHeight = firstQ.scrollHeight * (focusedQ - 1)
        parent.scrollTop = qHeight
      }*/

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

        console.log("this.state.focusedQ: "+this.state.focusedQ)
        if (this.state.focusedQ === 0) {
          console.log("about to set scrolltop to 0")
          parent.scrollTop = 0
        } else {
          const parent = document.getElementById("fpModal-"+usedFor);
          const currentQ = document.getElementById('formQ-'+usedFor+this.state.focusedQ)
          console.log(this.state.focusedQ)
          console.log(currentQ)
          console.log("currentQ.offsetTop: "+currentQ.offsetTop)
          parent.scrollTop = currentQ.offsetTop
        }
      })
    }
  }

  //handleScrollDown = (formId) => {
  handleScrollDown = () => {
    const { focusedQ } = this.state;
    const { questions, usedFor } = this.props;

    if (focusedQ === questions.length - 1) {
      return
    } else {
    /*  console.log("formId")
      console.log(formId)
      let i;

      if (formId) {
        const formIdSplit = formId.split("-")
        i = +formIdSplit[0];
      }
*/
    /*  const parent = document.getElementById("fpModal-"+usedFor);
      const firstQ = document.getElementById("0-"+questions[0].name);
      const qHeight = firstQ.scrollHeight * (focusedQ + 1)*/

    /*  console.log("i: "+i)
      console.log("focusedQ + 1: "+(focusedQ + 1))
      console.log("amount of items to scroll (formId ? i + 1 : focusedQ + 1): "+(formId ? i + 1 : focusedQ + 1))
      const qHeight = firstQ.scrollHeight * (formId ? i + 1 : focusedQ + 1)
      console.log("firstQ.scrollHeight: "+firstQ.scrollHeight)
      console.log("qHeight: "+qHeight)*/
    //  parent.scrollTop = qHeight

    //  document.getElementById("formQ-menteeFullSU2").scrollIntoView()

      this.setState(prevState => {
        let { focusedQ } = prevState

      /*  if (formId) {
          console.log("gets here")
          focusedQ = i + 1
        } else {*/
          focusedQ++
  //      }

        return {
          focusedQ
        }
      }, () => {

        const answers = document.getElementsByClassName("formA-"+usedFor)
        const idToFocusOn = answers[this.state.focusedQ].dataset.idforfocus
        const elToFocusOn = answers[this.state.focusedQ].dataset.elementforfocus;

        if (elToFocusOn != undefined) {
          if (elToFocusOn === 'firstElementChild') {
           document.getElementById(idToFocusOn).firstElementChild.focus();
          }
        } else {
          document.getElementById(idToFocusOn).focus()
        }

        const parent = document.getElementById("fpModal-"+usedFor);
        const currentQ = document.getElementById('formQ-'+usedFor+this.state.focusedQ)
        console.log(this.state.focusedQ)
        console.log(currentQ)
        console.log("currentQ.offsetTop: "+currentQ.offsetTop)
        parent.scrollTop = currentQ.offsetTop

      })
    }
  }

  handleSubmit = () => {
    this.toggleScrollLock();
    this.setState({
      isSubmitting: true
    }, () => {
      const {questions} = this.props;

      const statesToSave = []

      questions.forEach((question, i) => {
        const name = question['name'];

        if (question['aType'] === 'checkbox') {

          var options = question['options'];

          options.forEach((option, index) => {
            const optionName = option['name']
            statesToSave.push(
              {[optionName]: this.state[i+"-"+optionName]}
            );
          })
        } else {
          statesToSave.push(
            {[name]: this.state[i+"-"+name]}
          );
        }
      });

      console.log(statesToSave)
      // DEX TO SAVE DOWN ANSWERS WITHIN STATESTOSAVE

      // Once submitted or if error that user needs addressing
      if (this.state.isSubmitting === false) {
        this.toggleScrollLock();
      }
    })
  }

  handleDoneClickMulti = (formId) => {
    if (this.state[formId+"isValid"] === true) {
      this.handleScrollDown(formId)
    } else {
      return
      //const idToFocusOn = answers[this.state.focusedQ].dataset.idforfocus
    }
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
      const name = question['name'];

      if (!required) {
        return
      } else {
        statesToCheck.push(
        //  this.state["formA-"+usedFor+i+"isValid"],
          this.state[i+"-"+name+"isValid"]
        );
      }
    });

    if (statesToCheck.includes(false) || statesToCheck.includes(undefined)){
      return false
    } else {
      return true
    }

  }

  renderAType(question, required, usedFor, i, name) {

    // i.e. input box, rating box, select box, etc.
    const aType = question['aType'];

    switch (aType) {
      case 'text':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
          >
            <TextInput
              name={name}
              id={i+"-"+name}
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
            data-idforfocus={i+"-"+name}
          >
            <textarea
              name={name}
              id={i+"-"+name}
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
            data-idforfocus={i+"-"+name}
          >
            <NumberInput
              name={name}
              id={i+"-"+name}
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
            data-idforfocus={i+"-"+name}
          >
            <PhoneInput
              name={name}
              id={i+"-"+name}
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
              data-idforfocus={i+"-"+options[0]['name']}
          //    data-idforfocus={options[0]['id']}
            >
              {options.map((option, index) => {

                // const checkboxRequired = option['req'] === 1;

                return (
                <div className="notifToggleContainer" key={option['id']}>
                  <span className="notifToggleTxt">{option['label']}</span>
                  <Checkbox
                    labelClassName="switch"
                //    label={option['label']}
                    name={option['name']}
                  //  id={"formA-"+usedFor+i+"-"+index}
                    id={i+"-"+option['name']}
                  //  key={option['id']}
                  //  value={option['value']}
                    required={required}
                    defaultChecked={option['defaultChecked']}
                    disabled={option['disabled']}
                    spanClassName="slider round"
                    onChange={this.toggleCheckbox}
                  />
                </div>
                )

              })}
            </div>
          </React.Fragment>
        );
      case 'select':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"selectBox-"+name}
            data-idforstate={i+"-"+name}
          >
            <SelectBox
              options={question['options']}
              placeholder={question['placeholder']}
              name={name}
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
            data-idforfocus={"selectBox-"+name}
            data-idforstate={i+"-"+name}
          >
            <SelectBox
              multiple
            //  finMultiOptions={this.handleMultiOptions}
              options={question['options']}
              name={name}
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
            data-idforfocus={"autocompleteBox-"+name}
            data-idforstate={i+"-"+name}
          >
            <div className="autocompleter">
              <AutocompleteTagsMulti
                multiple
                openOnClick={question['openOnClick']}
                showValues={question['showValues']}
                showCheckbox={question['showCheckbox']}
                handleDone={this.handleDoneClickMulti}
                suggestions={question['options']}
                name={name}
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
            data-idforstate={i+"-"+name}
          >
            <RatingItems
              ratingOutOf={question['ratingOutOf']}
              handleRatingChange={this.handleNonTextChange}
              name={name}
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

            const name = question['name'];

            // i.e. any detail to support the understanding of the question
            const detail = question['detail'] == undefined ? '' :  question['detail'];

            return (
            //  <section className="form-QA" id={'formQ-'+usedFor+i} key={q}>
              <section className="form-QA" id={'formQ-'+usedFor+i} key={q}>
                <h2 className={"qTitle " + (required ? "reqAsterisk" : "")}>
                  <span className="qNum">{i + 1})</span>{q}
                </h2>
                <div className="qDetail">
                  {detail}
                </div>
                { this.renderAType(question, required, usedFor, i, name) }
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
